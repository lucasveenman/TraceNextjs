// components/org/org-readme.tsx
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrgData } from "@/lib/data/orgs";

export function OrgReadme({ org }: { org: OrgData }) {
  const { readme } = org;

  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mt-2">{readme.title}</CardTitle>
      </CardHeader>
      <CardContent className="max-w-none text-sm">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center">
            {org.logoUrl ? (
              <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                <Image
                  src={org.logoUrl}
                  alt={org.displayName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full" />
            )}
          </div>
        </div>

        {readme.body.map((p, i) => (
          <p key={i} className="mb-3 text-muted-foreground">
            {p}
          </p>
        ))}

        {readme.badges && readme.badges.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {readme.badges.map((b) => (
              <span
                key={b}
                className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
              >
                {b}
              </span>
            ))}
          </div>
        )}

        {readme.links && readme.links.length > 0 && (
          <>
            <h3 className="mb-2 mt-6 text-sm font-semibold">Useful links</h3>
            <div className="flex flex-wrap gap-3">
              {readme.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm text-primary underline-offset-2 hover:underline"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
