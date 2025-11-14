// app/[owner]/product/[repo]/page.tsx
import { RepoShell } from "@/components/product/product-shell";
import { TypeBadge } from "@/components/slug/type-badge";

export default async function ProductRepoPage({
  params,
}: {
  params: Promise<{ owner: string; slug: string }>;
}) {
  const { owner, slug } = await params;

  const summary = {
    dimensions: "See drawings",
    weight: "—",
    materials: ["6061-T6", "PC-ABS"],
    standards: ["ISO 4017", "NEMA 23"],
  };

  return (
    <RepoShell owner={owner} repo={slug}>
      <div className="mb-4 flex items-center gap-2">
        <h1 className="text-lg font-semibold">{slug}</h1>
        <TypeBadge t="product" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border p-4">
            <h2 className="mb-2 text-sm font-semibold">Summary</h2>
            <ul className="text-sm text-muted-foreground">
              <li>
                <strong>Materials:</strong> {summary.materials.join(", ")}
              </li>
              <li>
                <strong>Standards:</strong> {summary.standards.join(", ")}
              </li>
              <li>
                <strong>Dimensions:</strong> {summary.dimensions}
              </li>
              <li>
                <strong>Weight:</strong> {summary.weight}
              </li>
            </ul>
          </div>

          <div className="rounded-lg border p-4 text-sm text-muted-foreground">
            This is the engineering-facing product page. Manufacturing processes and private docs live in the
            originating project.
          </div>
        </div>
        <aside className="lg:col-span-1">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 text-sm font-semibold">Linked project</h3>
            <a className="text-sm underline" href={`/${owner}/project/${slug}`}>
              /{owner}/project/{slug}
            </a>
          </div>
        </aside>
      </div>
    </RepoShell>
  );
}
