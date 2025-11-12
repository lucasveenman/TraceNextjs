// app/[owner]/process/[repo]/page.tsx
import Link from "next/link";
import { RepoHeader } from "@/components/repo/repo-header";
import { RepoNav } from "@/components/repo/repo-nav";
import { ReadmePanel } from "@/components/repo/readme-panel";

export default async function ProcessRepoPage({
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

      <RepoNav active="Process" />

      <section className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-2xl font-semibold capitalize">{repo}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Company process documentation. Preserve tribal knowledge with clear steps, inputs/outputs, and quality gates.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border p-4">
                  <h3 className="font-medium">Inputs</h3>
                  <ul className="mt-2 list-inside list-disc text-sm">
                    <li>Material: Al 6061-T6</li>
                    <li>Pre-treatment: Clean, de-oxidize</li>
                  </ul>
                </div>
                <div className="rounded-xl border p-4">
                  <h3 className="font-medium">Outputs</h3>
                  <ul className="mt-2 list-inside list-disc text-sm">
                    <li>Finish: Anodize Type II</li>
                    <li>Color variance ΔE &lt; 2.0</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-xl border p-4">
                <h3 className="font-medium">Steps</h3>
                <ol className="mt-2 list-inside list-decimal space-y-1 text-sm">
                  <li>Fixture and mask contact points</li>
                  <li>Etch and de-smut per recipe P-02</li>
                  <li>Anodize bath 20 min @ 20°C</li>
                  <li>Seal and QC visual per AQL 1.0</li>
                </ol>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <h3 className="text-lg font-semibold">Used By</h3>
              <ul className="mt-2 flex flex-wrap gap-3 text-sm">
                <li>
                  <Link href={`/${owner}/project/enclosure-001`} className="underline">
                    enclosure-001
                  </Link>
                </li>
                <li>
                  <Link href={`/${owner}/product/fastener-m6`} className="underline">
                    fastener-m6
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl border bg-card p-4">
              <h3 className="mb-2 text-lg font-semibold">Process Notes</h3>
              <ReadmePanel owner={owner} repo={repo} />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
