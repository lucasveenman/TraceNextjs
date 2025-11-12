// app/[owner]/material/[repo]/page.tsx
import Link from "next/link";
import { RepoHeader } from "@/components/repo/repo-header";
import { RepoNav } from "@/components/repo/repo-nav";
import { ReadmePanel } from "@/components/repo/readme-panel";

export default async function MaterialRepoPage({
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

      <RepoNav active="Specs" />

      <section className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-2xl font-semibold capitalize">{repo}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Material entry derived from a private or external project. Share high-level datasheet info
                and approved uses without exposing proprietary manufacturing steps.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border p-4">
                  <h3 className="font-medium">Mechanical</h3>
                  <ul className="mt-2 list-inside list-disc text-sm">
                    <li>Yield: 276 MPa</li>
                    <li>UTS: 310 MPa</li>
                    <li>Elongation: 12%</li>
                  </ul>
                </div>
                <div className="rounded-xl border p-4">
                  <h3 className="font-medium">Thermal</h3>
                  <ul className="mt-2 list-inside list-disc text-sm">
                    <li>CTE: 23.6 µm/m·°C</li>
                    <li>Tg / Melt: n/a</li>
                    <li>Max service: 120 °C</li>
                  </ul>
                </div>
                <div className="rounded-xl border p-4">
                  <h3 className="font-medium">Other</h3>
                  <ul className="mt-2 list-inside list-disc text-sm">
                    <li>Density: 2.70 g/cm³</li>
                    <li>Finish compatibility: Anodize, Powder</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-xl border p-4">
                <h3 className="font-medium">Supplier</h3>
                <ul className="mt-2 list-inside list-disc text-sm">
                  <li>Company: Company B</li>
                  <li>
                    Linked project:{" "}
                    <Link href={`/${owner}/project/company-b-materials`} className="underline">
                      Private repo (Company B)
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <h3 className="text-lg font-semibold">Used In</h3>
              <ul className="mt-2 flex flex-wrap gap-3 text-sm">
                <li>
                  <Link href={`/${owner}/product/fastener-m6`} className="underline">
                    fastener-m6
                  </Link>
                </li>
                <li>
                  <Link href={`/${owner}/project/enclosure-001`} className="underline">
                    enclosure-001
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl border bg-card p-4">
              <h3 className="mb-2 text-lg font-semibold">Datasheet & Notes</h3>
              <ReadmePanel owner={owner} repo={repo} />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
