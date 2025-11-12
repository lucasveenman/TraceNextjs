"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OrgReadme({
  org,
}: {
  org: {
    readme: {
      title: string;
      body: string[];
      badges?: string[];
      links?: { label: string; href: string }[];
    };
  };
}) {
  const { readme } = org;

  return (
    <Card>
      <CardHeader>
        <div className="text-xs text-muted-foreground">README.md</div>
        <CardTitle className="mt-2">{readme.title}</CardTitle>
      </CardHeader>
      <CardContent className="max-w-none text-sm">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-muted">
            {/* logo placeholder */}
            <div className="h-8 w-8 rounded-full border" />
          </div>
        </div>

        {readme.body.map((p, i) => (
          <p key={i} className="mb-3">
            {p}
          </p>
        ))}

        {readme.badges && readme.badges.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {readme.badges.map((b) => (
              <span key={b} className="rounded border px-2 py-0.5 text-xs">{b}</span>
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
