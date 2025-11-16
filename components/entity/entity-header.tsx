// components/entity/entity-header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  Twitter,
  Instagram,
  Linkedin,
  Boxes,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getEntity } from "@/lib/data/entities";

type Socials = {
  website?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
};

type HeaderType = "project" | "product" | "material" | "standard" | "process";

export function EntityHeader({
  owner,
  repo,
  type,
  socials,
}: {
  owner: string;
  repo?: string;
  type?: HeaderType;
  socials?: Socials;
}) {
  const org = getEntity(owner);
  const showRepo = Boolean(repo);

  const displayName = org?.displayName ?? owner;

  // Prefer explicit socials prop, then org.socials, then fall back to org.website
  const resolvedSocials: Socials = socials ?? {
    website: org?.socials?.website ?? org?.website,
    twitter: org?.socials?.twitter,
    instagram: org?.socials?.instagram,
    linkedin: org?.socials?.linkedin,
  };

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
        {/* Left: logo + brand crumb */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Logo (same style as EntityCard) */}
          <Link
            href={`/${owner}`}
            aria-label={`${displayName} profile`}
            className="flex items-center gap-2"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-lg">
              {org?.logoUrl ? (
                <Image
                  src={org.logoUrl}
                  alt={displayName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-muted">
                  <Boxes className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          </Link>

          {/* Crumb: org / type / repo */}
          <div className="flex min-w-0 items-center gap-2 text-sm">
            <Link
              href={`/${owner}`}
              className="truncate font-semibold hover:underline"
            >
              {displayName}
            </Link>
            {showRepo && (
              <>
                <span className="text-muted-foreground">/</span>
                {type && (
                  <>
                    <span className="truncate text-xs uppercase tracking-wide text-muted-foreground">
                      {type}
                    </span>
                    <span className="text-muted-foreground">/</span>
                  </>
                )}
                <Link
                  href={
                    type ? `/${owner}/${type}/${repo}` : `/${owner}/${repo}`
                  }
                  className="truncate font-semibold hover:underline"
                >
                  {repo}
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right: socials + follow */}
        <div className="flex items-center gap-2">
          {resolvedSocials.website && (
            <a
              href={resolvedSocials.website}
              target="_blank"
              rel="noreferrer"
              aria-label="Website"
              className="grid h-9 w-9 place-items-center rounded-md border text-muted-foreground hover:text-foreground"
              title={cleanHost(resolvedSocials.website)}
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
          {resolvedSocials.twitter && (
            <a
              href={resolvedSocials.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="grid h-9 w-9 place-items-center rounded-md border text-muted-foreground hover:text-foreground"
              title="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          )}
          {resolvedSocials.instagram && (
            <a
              href={resolvedSocials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-md border text-muted-foreground hover:text-foreground"
              title="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          )}
          {resolvedSocials.linkedin && (
            <a
              href={resolvedSocials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-md border text-muted-foreground hover:text-foreground"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}

          <Button size="sm" variant="outline">
            Follow
          </Button>
        </div>
      </div>
    </header>
  );
}

function cleanHost(url: string) {
  try {
    const u = new URL(url);
    return u.host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
