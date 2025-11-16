// components/entity/entity-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function EntityNav({
  owner,
  active,
  counts,
}: {
  owner: string;
  active?: "Overview" | "Repositories";
  counts?: { repos?: number };
}) {
  const pathname = usePathname();

  // Decide which tab is active:
  // 1) Prefer explicit `active` prop (from the page)
  // 2) Fallback to pathname-based detection
  const derivedActive: "Overview" | "Repositories" =
    active ??
    (pathname === `/${owner}/repositories` ? "Repositories" : "Overview");

  const isOverview = derivedActive === "Overview";
  const isRepos = derivedActive === "Repositories";

  return (
    <nav className="border-b">
      <div className="mx-auto w-full max-w-7xl px-4">
        <ul className="-mb-px flex flex-wrap gap-4">
          <li>
            <Link
              href={`/${owner}`}
              className={`inline-flex items-center gap-2 border-b-2 px-3 py-3 text-sm ${
                isOverview
                  ? "border-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              href={`/${owner}/repositories`}
              className={`inline-flex items-center gap-2 border-b-2 px-3 py-3 text-sm ${
                isRepos
                  ? "border-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Repositories
              {!!counts?.repos && (
                <span className="rounded-full border px-1.5 py-0.5 text-[10px] leading-none">
                  {counts.repos}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
