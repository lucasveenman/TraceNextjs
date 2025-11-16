// components/entity/entity-overview.tsx
"use client";

import { EntityReadme } from "./entity-readme";
import { EntitySidebar } from "./entity-sidebar";
import type { EntityData } from "@/lib/data/entities";
import { buildRepoHref } from "@/lib/data/entities";

export function EntityOverview({ org }: { org: EntityData }) {
  const hasPinned = org.pinnedRepos.length > 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <EntityReadme org={org} />

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-muted-foreground">Pinned repositories</h2>
            {hasPinned && (
              <span className="text-xs text-muted-foreground">
                {org.pinnedRepos.length} public
              </span>
            )}
          </div>

          {hasPinned ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {org.pinnedRepos.map((r) => (
                <a
                  key={r.name}
                  href={buildRepoHref(org.handle, r)}
                  className="block rounded-xl border bg-card/40 p-4 transition hover:bg-muted/50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold truncate">
                      {org.handle} / {r.name}
                    </div>
                    <span className="rounded-full border px-2 py-0.5 text-[10px] leading-none capitalize text-muted-foreground">
                      {r.type}
                    </span>
                  </div>

                  {r.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {r.description}
                    </p>
                  )}

                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>★ {r.stars ?? 0}</span>
                    {r.updatedAt && <span>Updated {timeAgo(r.updatedAt)}</span>}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed px-4 py-6 text-sm text-muted-foreground">
              No pinned repositories yet. Pin a project, product, material, process or standard to
              feature it here.
            </div>
          )}
        </section>
      </div>

      <div className="lg:col-span-1">
        <EntitySidebar org={org} />
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
