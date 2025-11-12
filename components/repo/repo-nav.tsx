"use client";

import Link from "next/link";

const items = [
  { label: "Code", href: "code" },
  { label: "Issues", href: "issues" },
  { label: "Pull requests", href: "pulls" },
  { label: "Actions", href: "actions" },
  { label: "Projects", href: "projects" },
  { label: "Wiki", href: "wiki" },
  { label: "Security", href: "security" },
  { label: "Insights", href: "insights" },
];

export function RepoNav({ active }: { active: string }) {
  return (
    <nav className="border-b">
      <div className="mx-auto w-full max-w-7xl px-4">
        <ul className="-mb-px flex flex-wrap gap-4">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={`#${it.href}`}
                className={`inline-block border-b-2 px-3 py-3 text-sm transition-colors ${
                  active === it.label
                    ? "border-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
