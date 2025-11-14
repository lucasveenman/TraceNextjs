// app/[owner]/page.tsx
import { OrgHeader } from "@/components/org/org-header";
import { OrgNav } from "@/components/org/org-nav";
import { OrgOverview } from "@/components/org/org-overview";
import type { OrgData } from "@/lib/data/orgs";
import { getOrg } from "@/lib/data/orgs";

export default async function OrgPage({
  params,
}: {
  params: Promise<{ owner: string }>;
}) {
  const { owner } = await params;

  const org = (getOrg(owner) ?? {
    handle: owner,
    displayName: owner,
    bio: "",
    readme: { title: owner, body: [] },
    pinnedRepos: [],
    people: [],
    sponsors: [],
    materials: [],
    tags: [],
  }) as OrgData;

  return (
    <div className="w-full">
      <OrgHeader
        owner={owner}
        socials={{
          website: org.website ?? "https://www.example.com",
          twitter: "https://x.com/omnitudedesign",
          instagram: "https://instagram.com/omnitudedesign",
          linkedin: "https://www.linkedin.com/company/omnitudedesign",
        }}
      />
      <OrgNav owner={owner} active="Overview" counts={{ repos: org.pinnedRepos.length }} />
      <section className="mx-auto w-full max-w-7xl px-4 py-6">
        <OrgOverview org={org} />
      </section>
    </div>
  );
}
