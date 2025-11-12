// app/[owner]/project/[repo]/page.tsx
import Link from "next/link";
import { RepoHeader } from "@/components/repo/repo-header";
import { RepoNav } from "@/components/repo/repo-nav";
import { RepoToolbar } from "@/components/repo/repo-toolbar";
import { GitHubFileExplorer } from "@/components/github-file-explorer";
import { ReadmePanel } from "@/components/repo/readme-panel";

export default async function ProjectRepoPage({
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

      {/* For Project repos we keep a developer-oriented nav */}
      <RepoNav active="Code" />

      <section className="mx-auto w-full max-w-7xl px-4 py-6">
        <RepoToolbar branchName="main" pathChain={["repo-root"]} />

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Engineering repo explorer */}
          <div className="lg:col-span-2">
            <GitHubFileExplorer />
          </div>

          {/* Project graph + links to typed entities */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border bg-card p-4">
              <h3 className="mb-2 text-lg font-semibold">Linked Entities</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="font-medium">Materials: </span>
                  <Link href={`/${owner}/material/al-6061`} className="underline">
                    Al 6061
                  </Link>
                  ,{" "}
                  <Link href={`/${owner}/material/abs`} className="underline">
                    ABS
                  </Link>
                </li>
                <li>
                  <span className="font-medium">Standards: </span>
                  <Link href={`/${owner}/standard/iso-4014`} className="underline">
                    ISO 4014
                  </Link>
                </li>
                <li>
                  <span className="font-medium">Processes: </span>
                  <Link href={`/${owner}/process/anodize-type-ii`} className="underline">
                    Anodize Type II
                  </Link>
                </li>
                <li>
                  <span className="font-medium">Products: </span>
                  <Link href={`/${owner}/product/${repo}`} className="underline">
                    View product derived from this project
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border bg-card p-4">
              <h3 className="mb-2 text-lg font-semibold">Repository Readme</h3>
              <p className="text-sm text-muted-foreground">
                Technical overview, drawings, docs, and BOM live here. Use the explorer to browse.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-4">
              <h3 className="mb-2 text-lg font-semibold">Docs</h3>
              <ReadmePanel owner={owner} repo={repo} />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
