// components/project/project-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Workspace", slug: "" },
  { label: "Issues", slug: "issues" },
  { label: "Experiments", slug: "experiments" },
  { label: "Links", slug: "links" },
  { label: "Wiki", slug: "wiki" },
  { label: "Settings", slug: "settings" },
];

export function ProjectNav({ owner, repo }: { owner: string; repo: string }) {
  const pathname = usePathname();
  const base = `/${owner}/project/${repo}`;

  return (
    <nav className="border-b">
      <div className="mx-auto w-full max-w-7xl px-4">
        <ul className="-mb-px flex flex-wrap gap-4">
          {items.map((it) => {
            const href =
              it.slug === "" ? base : `${base}/${it.slug}`;

            const isActive =
              it.slug === ""
                ? pathname === base
                : pathname === href;

            return (
              <li key={it.slug || "workspace"}>
                <Link
                  href={href}
                  className={`inline-block border-b-2 px-3 py-3 text-sm transition-colors ${
                    isActive
                      ? "border-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {it.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
