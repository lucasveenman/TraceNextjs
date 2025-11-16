// app/(entities)/[owner]/page.tsx
import { notFound } from "next/navigation";
import { EntityHeader } from "@/components/entity/entity-header";
import { EntityNav } from "@/components/entity/entity-nav";
import { EntityOverview } from "@/components/entity/entity-overview";
import { getEntity } from "@/lib/data/entities";
import { getTraceApiJson } from "@/lib/auth/trace-api";

// This is a placeholder for whatever shape the real trace-api
// "entity overview" endpoint will eventually return.
type EntityApiResponse = {
  // Adjust this later to match trace-api's real response.
  // For now we keep it very loose so we don't depend on it yet.
  handle: string;
  displayName: string;
  // ... more fields when we connect it to the real schema
};

export default async function EntityPage({
  params,
}: {
  params: Promise<{ owner: string }>;
}) {
  const { owner } = await params;

  // ---- CURRENT BEHAVIOR: in-memory demo data ----
  //
  // This is what powers the UI right now.
  // We keep this so you can continue iterating on components
  // while we build onboarding + entity creation + real API.
  const demoEntity = getEntity(owner);
  if (!demoEntity) return notFound();

  // ---- FUTURE BEHAVIOR: fetch from trace-api with JWT ----
  //
  // We *call* trace-api here already so the JWT wiring is live,
  // but we don't rely on the response yet. This means:
  // - If trace-api is running and has a matching route, you'll see real data.
  // - If it's not, this call will throw and we'll ignore it for now.
  //
  // Later, when entity creation + seeding exist, we can:
  // - Replace `demoEntity` usage with a mapping from `apiEntity`.
  // - Or merge both (fallback to demo if API misses).
  let apiEntity: EntityApiResponse | null = null;

  try {
    // Example endpoint shape — adjust once you define it in trace-api:
    // GET /entities/:owner/overview
    apiEntity = await getTraceApiJson<EntityApiResponse>(
      `/entities/${owner}/overview`,
    );
  } catch (err) {
    // For now, silently ignore failures (API not running / not implemented).
    // The page still renders using demoEntity.
    // You can add logging here if you want to debug:
    // console.error("Failed to load entity from trace-api", err);
  }

  // At this point:
  // - `demoEntity` is guaranteed to exist (in-memory mock).
  // - `apiEntity` is either null or some real data from the API.
  //
  // UI still renders from demoEntity only.
  // When we're ready, we can start mapping apiEntity → EntityData shape.

  return (
    <div className="w-full">
      <EntityHeader owner={demoEntity.handle} />
      <EntityNav
        owner={demoEntity.handle}
        active="Overview"
        counts={{ repos: demoEntity.pinnedRepos.length }}
      />
      <section className="mx-auto w-full max-w-7xl px-4 py-6">
        <EntityOverview org={demoEntity} />
      </section>
    </div>
  );
}
