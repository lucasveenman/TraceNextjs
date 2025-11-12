// app/[owner]/page.tsx
import { RepoHeader } from "@/components/repo/repo-header";
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
  if (!org) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-xl font-semibold">Organization not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The org “{owner}” does not exist in the data library.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <RepoHeader
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
