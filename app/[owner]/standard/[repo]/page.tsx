// app/[owner]/standard/[repo]/page.tsx
import Link from "next/link";
import { RepoHeader } from "@/components/repo/repo-header";
import { RepoNav } from "@/components/repo/repo-nav";
import { ReadmePanel } from "@/components/repo/readme-panel";

export default async function StandardRepoPage({
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

      <RepoNav active="Standard" />

      <section className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-2xl font-semibold uppercase">{repo}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Standard documentation entry. Capture requirements, verification methods, and applicable scope.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border p-4">
                  <h3 className="font-medium">Scope</h3>
                  <p className="mt-2 text-sm">
                    Threads and tolerances for metric fasteners…
                  </p>
                </div>
                <div className="rounded-xl border p-4">
                  <h3 className="font-medium">Conformance</h3>
                  <ul className="mt-2 list-inside list-disc text-sm">
                    <li>Inspection per section 8</li>
                    <li>Go/No-Go gauges</li>
                    <li>Sampling AQL 1.5</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <h3 className="text-lg font-semibold">Referenced By</h3>
              <ul className="mt-2 flex flex-wrap gap-3 text-sm">
                <li>
                  <Link href={`/${owner}/product/fastener-m6`} className="underline">
                    fastener-m6
                  </Link>
                </li>
                <li>
                  <Link href={`/${owner}/project/phystrack`} className="underline">
                    phystrack
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl border bg-card p-4">
              <h3 className="mb-2 text-lg font-semibold">Standard Text & Notes</h3>
              <ReadmePanel owner={owner} repo={repo} />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
