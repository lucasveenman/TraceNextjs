//components/org/org-header.tsx
"use client";

import Link from "next/link";
import {
  Globe,
  Twitter,
  Instagram,
  Linkedin,
  Boxes,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Socials = {
  website?: string;
  twitter?: string;   // X/Twitter
  instagram?: string;
  linkedin?: string;
};

export function OrgHeader({
  owner,
  repo,
  socials,
}: {
  owner: string;
  repo?: string;          // when present, shows owner / repo
  socials?: Socials;      // optional links for company-facing header
}) {
  const showRepo = Boolean(repo);

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
        {/* Left: brand crumb + repo badge */}
        <div className="flex min-w-0 items-center gap-3">
          <Boxes className="h-5 w-5 text-muted-foreground" />
          <div className="flex min-w-0 items-center gap-2 text-sm">
            <Link href={`/${owner}`} className="truncate font-semibold hover:underline">
              {owner}
            </Link>
            {showRepo && (
              <>
                <span className="text-muted-foreground">/</span>
                <Link
                  href={`/${owner}/${repo}`}
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
          {socials?.website && (
            <a
              href={socials.website}
              target="_blank"
              rel="noreferrer"
              aria-label="Website"
              className="grid h-9 w-9 place-items-center rounded-md border text-muted-foreground hover:text-foreground"
              title={cleanHost(socials.website)}
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
          {socials?.twitter && (
            <a
              href={socials.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="grid h-9 w-9 place-items-center rounded-md border text-muted-foreground hover:text-foreground"
              title="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          )}
          {socials?.instagram && (
            <a
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-md border text-muted-foreground hover:text-foreground"
              title="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          )}
          {socials?.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-md border text-muted-foreground hover:text-foreground"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}

          <Button size="sm" variant="outline">Follow</Button>
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
