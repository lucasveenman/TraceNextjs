// app/[owner]/project/[slug]/page.tsx

import { notFound } from "next/navigation";
import { RepoShell } from "@/components/project/project-shell";
import { TypeBadge } from "@/components/slug/type-badge";
import { ReadmePanel } from "@/components/slug/readme-panel";
import { ProjectToolbar } from "@/components/project/project-toolbar";
import { FileExplorer } from "@/components/project/file-explorer";
import { getProject } from "@/lib/data/projects";

export default async function ProjectRepoPage({
  params,
}: {
  params: Promise<{ owner: string; slug: string }>;
}) {
  const { owner, slug } = await params;

  const project = getProject(owner, slug);

  if (!project) {
    return notFound();
  }

  return (
    <RepoShell owner={owner} repo={slug}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-lg font-semibold">{project.name}</h1>
            <p className="text-xs text-muted-foreground">
              {project.stage === "concept" && "Concept exploration"}
              {project.stage === "prototype" && "Prototype development"}
              {project.stage === "production" && "Production program"}
              {project.stage === "retired" && "Archived / retired"}
            </p>
          </div>
          <TypeBadge t="project" />
        </div>
        <p className="hidden max-w-md text-right text-xs text-muted-foreground sm:block">
          Last updated {new Date(project.updatedAt).toLocaleDateString()}
        </p>
      </div>

      <ProjectToolbar
        projectSlug={project.slug}
        variants={project.variants}
        baseVariantId={project.baseVariantId}
        pathChain={[project.slug]}
      />

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-4">
          <FileExplorer owner={owner} slug={project.slug} />

          <div className="rounded-lg border p-6 text-sm text-muted-foreground">
            {project.description}
          </div>

          <div className="rounded-lg border p-4">
            <h2 className="mb-2 text-sm font-semibold">Linked items</h2>
            <div className="grid grid-cols-1 gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide">
                  Products
                </h3>
                {project.links?.products?.length ? (
                  <ul className="mt-1 list-disc pl-4">
                    {project.links.products.map((p) => (
                      <li key={p}>
                        <a
                          href={`/${owner}/product/${p}`}
                          className="underline underline-offset-2"
                        >
                          {p}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground/80">
                    No linked products yet.
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide">
                  Materials
                </h3>
                {project.links?.materials?.length ? (
                  <ul className="mt-1 list-disc pl-4">
                    {project.links.materials.map((m) => (
                      <li key={m}>
                        <a
                          href={`/${owner}/material/${m}`}
                          className="underline underline-offset-2"
                        >
                          {m}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground/80">
                    No linked materials yet.
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide">
                  Processes
                </h3>
                {project.links?.processes?.length ? (
                  <ul className="mt-1 list-disc pl-4">
                    {project.links.processes.map((pr) => (
                      <li key={pr}>
                        <a
                          href={`/${owner}/process/${pr}`}
                          className="underline underline-offset-2"
                        >
                          {pr}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground/80">
                    No linked processes yet.
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide">
                  Standards
                </h3>
                {project.links?.standards?.length ? (
                  <ul className="mt-1 list-disc pl-4">
                    {project.links.standards.map((s) => (
                      <li key={s}>
                        <a
                          href={`/${owner}/standard/${s}`}
                          className="underline underline-offset-2"
                        >
                          {s}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground/80">
                    No linked standards yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <ReadmePanel owner={owner} repo={project.slug} />
        </div>
      </div>
    </RepoShell>
  );
}
