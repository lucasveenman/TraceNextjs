// app/[owner]/process/[repo]/page.tsx
import { RepoShell } from "@/components/repo/repo-shell";
import { TypeBadge } from "@/components/repo/type-badge";

export default async function ProcessRepoPage({
  params,
}: {
  params: Promise<{ owner: string; slug: string }>;
}) {
  const { owner, slug } = await params;

  return (
    <RepoShell owner={owner} repo={slug}>
      <div className="mb-4 flex items-center gap-2">
        <h1 className="text-lg font-semibold">{slug}</h1>
        <TypeBadge t="process" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border p-4 text-sm text-muted-foreground">
            SOPs, parameters, tooling, and QA checkpoints. Link this process to projects/products and track
            revisions.
          </div>
        </div>
        <aside className="lg:col-span-1">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-sm font-semibold">Linked assets</h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              <li>Machine profiles</li>
              <li>Safety docs</li>
              <li>Training videos</li>
            </ul>
          </div>
        </aside>
      </div>
    </RepoShell>
  );
}
