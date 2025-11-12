// components/org/repo-card.tsx
"use client";

import Link from "next/link";

export function RepoCard({
  owner,
  repo,
}: {
  owner: string;
  repo: {
    name: string;
    type: "project" | "product" | "material" | "standard" | "process";
    description?: string;
    stars?: number;
    updatedAt?: string;
  };
}) {
  const href = `/${owner}/${repo.type}/${repo.name}`;
  const updated =
    repo.updatedAt ? new Date(repo.updatedAt).toLocaleDateString() : undefined;

  return (
    <div className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/40">
      <div className="col-span-12 md:col-span-8">
        <div className="flex items-center gap-2">
          <Link href={href} className="font-medium underline">
            {repo.name}
          </Link>
          <span className="rounded-full border px-1.5 py-0.5 text-[10px] leading-none capitalize">
            {repo.type}
          </span>
        </div>
        {!!repo.description && (
          <p className="mt-1 text-sm text-muted-foreground">{repo.description}</p>
        )}
      </div>
      <div className="col-span-12 md:col-span-4 flex items-center justify-start md:justify-end gap-3 text-xs text-muted-foreground">
        {typeof repo.stars === "number" && (
          <span>★ {repo.stars}</span>
        )}
        {updated && <span>Updated {updated}</span>}
      </div>
    </div>
  );
}
