// app/(entities)/[owner]/page.tsx
import { notFound } from "next/navigation";
import { OrgHeader } from "@/components/org/org-header";
import { OrgNav } from "@/components/org/org-nav";
import { OrgOverview } from "@/components/org/org-overview";
import { getOrg } from "@/lib/data/orgs";

export default async function OrgPage({
  params,
}: {
  params: Promise<{ owner: string }>;
}) {
  const { owner } = await params;
  const org = getOrg(owner);

  if (!org) return notFound();

  return (
    <div className="w-full">
      <OrgHeader owner={org.handle} />
      <OrgNav
        owner={org.handle}
        active="Overview"
        counts={{ repos: org.pinnedRepos.length }}
      />
      <section className="mx-auto w-full max-w-7xl px-4 py-6">
        <OrgOverview org={org} />
      </section>
    </div>
  );
}
