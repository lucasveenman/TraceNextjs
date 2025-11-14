// components/project/project-shell.tsx
"use client";


import { ReactNode } from "react";
import { OrgHeader } from "@/components/org/org-header";


export function RepoShell({
owner,
repo,
children,
socials,
}: {
owner: string;
repo: string;
socials?: { website?: string; twitter?: string; instagram?: string; linkedin?: string };
children: ReactNode;
}) {
return (
<div className="w-full">
<OrgHeader owner={owner} repo={repo} socials={socials} />
<section className="mx-auto w-full max-w-7xl px-4 py-6">{children}</section>
</div>
);
}