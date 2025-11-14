// app/[owner]/project/[slug]/issues/page.tsx

import { RepoShell } from "@/components/project/project-shell";
import { TypeBadge } from "@/components/slug/type-badge";

export default async function ProjectIssuesPage({
  params,
}: {
  params: Promise<{ owner: string; slug: string }>;
}) {
  const { owner, slug } = await params;

  return (
    <RepoShell owner={owner} repo={slug}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">{slug} – Issues</h1>
          <TypeBadge t="project" />
        </div>
      </div>

      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        This is a placeholder for the project’s issue tracker. Later you can
        sync this with an internal task system or link to GitHub/Jira/etc.
      </div>
    </RepoShell>
  );
}
