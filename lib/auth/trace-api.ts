// lib/auth/trace-api.ts
//
// This file handles calls from trace-nextjs → trace-api.
//
// Concept:
// - Browser authenticates with NextAuth via cookies.
// - Server components / routes in trace-nextjs call trace-api.
// - If a user is logged in, we mint a SHORT-LIVED API JWT that says:
//     "this request is on behalf of user <id>"
//   and send it as Authorization: Bearer <token>.
//
// Security design:
// - HS256 (HMAC) with a SEPARATE secret from NextAuth's.
// - Supports key rotation via TRACE_API_JWT_KEYS (JSON) + TRACE_API_JWT_ACTIVE_KID.
// - Token lifetime is short (5 minutes) and only carries identity + minimal metadata.
// - Authorization decisions STILL happen in trace-api via DB access, not via claims alone.

import jwt, { type JwtHeader } from "jsonwebtoken";
import { auth } from "@/auth";

const API_URL = process.env.TRACE_API_URL;

// TRACE_API_JWT_KEYS='{"api-v1":"secret1","api-v2":"secret2"}'
const RAW_KEYS = process.env.TRACE_API_JWT_KEYS;
// TRACE_API_JWT_ACTIVE_KID='api-v1'
const ACTIVE_KID = process.env.TRACE_API_JWT_ACTIVE_KID;

// Parse key map once at module load.
// If this is missing/misconfigured, we simply skip adding Authorization;
// calls to trace-api still work for public endpoints.
let KEY_MAP: Record<string, string> | null = null;

if (RAW_KEYS) {
  try {
    const parsed = JSON.parse(RAW_KEYS) as Record<string, string>;
    KEY_MAP = parsed;
  } catch {
    // If parsing fails, we fall back to no auth header.
    KEY_MAP = null;
  }
}

function getActiveKey() {
  if (!KEY_MAP || !ACTIVE_KID) return null;
  const secret = KEY_MAP[ACTIVE_KID];
  if (!secret) return null;
  return {
    kid: ACTIVE_KID,
    secret,
  };
}

// Small helper to sign a short-lived API JWT for the current user.
// This is ONLY used from the server (no client-side usage).
async function signApiJwtForCurrentUser() {
  const session = await auth();
  const userId = session?.user?.id;

  // If no logged-in user, we don't sign anything and caller can
  // just hit trace-api as anonymous (public-only access).
  if (!userId) return null;

  const activeKey = getActiveKey();
  if (!activeKey) {
    // Key rotation/env not set up yet → behave as anonymous for now.
    return null;
  }

  const now = Math.floor(Date.now() / 1000);

  // Safely pick up the handle from the session user.
  // At runtime we add this in NextAuth callbacks, but the base `User`
  // type doesn't know about it, so we cast to a shape that *may* have it.
  const handle =
    (session?.user as { handle?: string | null } | undefined)?.handle ?? null;

  const payload: {
    sub: string;
    handle: string | null;
    iss: "trace-nextjs";
    aud: "trace-api";
    iat: number;
    exp: number;
    ver: number;
  } = {
    sub: userId,
    handle,
    iss: "trace-nextjs",
    aud: "trace-api",
    iat: now,
    exp: now + 5 * 60, // 5 minutes
    ver: 1,
  };

  // Header must match JwtHeader type; "alg" is required there.
  const header: JwtHeader = {
    alg: "HS256",
    kid: activeKey.kid,
    typ: "JWT",
  };

  const token = jwt.sign(payload, activeKey.secret, {
    algorithm: "HS256",
    header,
  });

  return token;
}

export type TraceApiOptions = RequestInit & {
  // If true, we'll throw if no user is logged in instead of silently
  // hitting the API as anonymous.
  authRequired?: boolean;
};

// Low-level helper: performs a fetch to trace-api, adds Authorization
// if we have a logged-in user + configured key, and throws on non-2xx.
export async function callTraceApi(
  path: string,
  options: TraceApiOptions = {},
) {
  if (!API_URL) {
    throw new Error("TRACE_API_URL is not set");
  }

  const { authRequired, ...init } = options;

  // Attach user context via short-lived JWT if we can.
  // If not logged in, token will be null and the call
  // becomes an anonymous/public call.
  const token = await signApiJwtForCurrentUser();

  const headers = new Headers(init.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  } else if (authRequired) {
    // For internal-only routes that MUST have auth, we can
    // enforce that here. For catalog-style routes, just skip this.
    throw new Error("User must be authenticated to call this endpoint");
  }

  const url = `${API_URL}${path}`;
  const res = await fetch(url, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Trace API error ${res.status} ${res.statusText}: ${
        text || "No body"
      }`,
    );
  }

  return res;
}

// Convenience helper for JSON responses.
export async function getTraceApiJson<T>(
  path: string,
  options?: TraceApiOptions,
): Promise<T> {
  const res = await callTraceApi(path, options);
  return (await res.json()) as T;
}
