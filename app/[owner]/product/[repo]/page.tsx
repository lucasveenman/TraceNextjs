// app/[owner]/product/[repo]/page.tsx
import Link from "next/link";
import { RepoHeader } from "@/components/repo/repo-header";
import { RepoNav } from "@/components/repo/repo-nav";
import { ReadmePanel } from "@/components/repo/readme-panel";

export default async function ProductRepoPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const { owner, repo } = await params;

  return (
    <div className="w-full">
      <RepoHeader
        owner={owner}
        repo={repo}
        socials={{
          website: "https://www.omnitudedesign.com",
          twitter: "https://x.com/omnitudedesign",
          instagram: "https://instagram.com/omnitudedesign",
          linkedin: "https://www.linkedin.com/company/omnitudedesign",
        }}
      />

      {/* Product pages are consumer-of-engineering: emphasize Overview */}
      <RepoNav active="Overview" />

      <section className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Product summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-2xl font-semibold capitalize">{repo}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                This is the engineering-facing product view derived from a project.
                It omits manufacturing minutiae and focuses on specs, interfaces, and constraints.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border p-4">
                  <h3 className="font-medium">Key Specifications</h3>
                  <ul className="mt-2 list-inside list-disc text-sm">
                    <li>Dimensions: 8 × 16 × 4 mm</li>
                    <li>Material: Al 6061-T6</li>
                    <li>Finish: Anodize Type II</li>
                    <li>Mass: 3.2 g</li>
                    <li>Design loads: 6 kN tensile, 2 kN shear</li>
                  </ul>
                </div>
                <div className="rounded-xl border p-4">
                  <h3 className="font-medium">Interfaces</h3>
                  <ul className="mt-2 list-inside list-disc text-sm">
                    <li>Thread: M6 × 1.0 (ISO 261)</li>
                    <li>Tolerance class: 6g (ISO 965-1)</li>
                    <li>Surface roughness: Ra 1.6 μm</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-xl border p-4">
                <h3 className="font-medium">Linked Materials</h3>
                <ul className="mt-2 flex flex-wrap gap-3 text-sm">
                  <li>
                    <Link href={`/${owner}/material/al-6061`} className="underline">
                      Al 6061
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${owner}/material/anodize-type-ii`} className="underline">
                      Anodize Type II (finish)
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="mt-6 rounded-xl border p-4">
                <h3 className="font-medium">Standards</h3>
                <ul className="mt-2 flex flex-wrap gap-3 text-sm">
                  <li>
                    <Link href={`/${owner}/standard/iso-261`} className="underline">
                      ISO 261
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${owner}/standard/iso-965-1`} className="underline">
                      ISO 965-1
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <h3 className="text-lg font-semibold">Root Project</h3>
              <p className="mt-2 text-sm">
                View the full engineering repository (drawings, processes, BOM, source):
              </p>
              <Link
                href={`/${owner}/project/${repo}`}
                className="mt-2 inline-block underline"
              >
                Go to project root
              </Link>
            </div>
          </div>

          {/* Lightweight docs / marketing-leaning tech notes */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border bg-card p-4">
              <h3 className="mb-2 text-lg font-semibold">Notes & Docs</h3>
              <ReadmePanel owner={owner} repo={repo} />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
