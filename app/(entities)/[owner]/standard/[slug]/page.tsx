// app/[owner]/standard/[repo]/page.tsx
import { RepoShell } from "@/components/repo/repo-shell";
import { TypeBadge } from "@/components/repo/type-badge";

export default async function StandardRepoPage({
  params,
}: {
  params: Promise<{ owner: string; slug: string }>;
}) {
  const { owner, slug } = await params;

  return (
    <RepoShell owner={owner} repo={slug}>
      <div className="mb-4 flex items-center gap-2">
        <h1 className="text-lg font-semibold">{slug}</h1>
        <TypeBadge t="standard" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border p-4 text-sm text-muted-foreground">
            Metadata and linking hub for the standard. Do not mirror copyrighted text; link to the publisher and
            allow vendors to tag compliant products/components.
          </div>
        </div>
        <aside className="lg:col-span-1">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-sm font-semibold">Publisher</h3>
            <a className="text-sm underline" href="#">
              Official page
            </a>
          </div>
        </aside>
      </div>
    </RepoShell>
  );
}
