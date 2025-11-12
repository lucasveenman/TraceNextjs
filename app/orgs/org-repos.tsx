// components/org/org-repos.tsx
"use client";

import { RepoCard } from "./repo-card";
import type { TypedRepo } from "@/lib/orgs";

type Buckets = {
  project: TypedRepo[];
  product: TypedRepo[];
  material: TypedRepo[];
  standard: TypedRepo[];
  process: TypedRepo[];
};

const LABELS: Record<keyof Buckets, string> = {
  project: "Projects",
  product: "Products",
  material: "Materials",
  standard: "Standards",
  process: "Processes",
};

export function OrgRepos({
  owner,
  repos,
}: {
  owner: string;
  repos: TypedRepo[];
}) {
  const buckets: Buckets = {
    project: [],
    product: [],
    material: [],
    standard: [],
    process: [],
  };

  for (const r of repos) {
    buckets[r.type].push(r);
  }

  const order: (keyof Buckets)[] = ["project", "product", "material", "standard", "process"];
  const total = repos.length;

  return (
    <div id="repositories" className="space-y-10">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-muted-foreground">Repositories</h2>
        <div className="text-xs text-muted-foreground">{total} public</div>
      </div>

      {order.map((key) => {
        const list = buckets[key];
        if (!list.length) return null;

        return (
          <section key={key}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">{LABELS[key]}</h3>
              <div className="text-xs text-muted-foreground">{list.length}</div>
            </div>
            <div className="divide-y rounded-lg border">
              {list.map((r) => (
                <RepoCard key={`${key}:${r.name}`} owner={owner} repo={r} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
