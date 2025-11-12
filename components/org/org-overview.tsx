// components/org/org-overview.tsx
"use client";

import { OrgReadme } from "./org-readme";
import { OrgSidebar } from "./org-sidebar";
import type { OrgData } from "@/lib/data/orgs";
import { buildRepoHref } from "@/lib/data/orgs";

export function OrgOverview({ org }: { org: OrgData }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <OrgReadme org={org} />
        <section>
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Pinned</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {org.pinnedRepos.map((r) => (
              <a
                key={r.name}
                href={buildRepoHref(org.handle, r)}
                className="block rounded-lg border p-4 hover:bg-muted/40"
              >
                <div className="text-sm font-semibold">{org.handle} / {r.name}</div>
                {r.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
                )}
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>★ {r.stars ?? 0}</span>
                  {r.updatedAt && <span>Updated {timeAgo(r.updatedAt)}</span>}
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="lg:col-span-1">
        <OrgSidebar org={org} />
      </div>
    </div>
  );
}

function timeAgo(iso: string) {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
