// app/orgs/[owner]/repositories/page.tsx
import { RepoHeader } from "@/components/repo/repo-header";
import { OrgNav } from "@/components/org/org-nav";
import { OrgRepos } from "@/components/org/org-repos";
import { getOrg, getReposForOwner, TypedRepo } from "@/lib/data/orgs";

export default async function OrgReposPage({
  params,
}: {
  params: Promise<{ owner: string }>;
}) {
  const { owner } = await params;

  const org = getOrg(owner);
  const repos: TypedRepo[] = getReposForOwner(owner);

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
      <OrgNav owner={owner} active="Repositories" counts={{ repos: repos.length }} />
      <section className="mx-auto w-full max-w-7xl px-4 py-6">
        <OrgRepos owner={owner} repos={repos} />
      </section>
    </div>
  );
}
