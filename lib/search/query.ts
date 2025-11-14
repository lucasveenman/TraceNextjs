// lib/search/query.ts
import type { Scope, SearchEntity, EntityHeader } from "./types";
import { MOCK_DATA, ENTITIES } from "./mockData";

/* ----------------------------- string helpers ----------------------------- */

export function normalize(s: string) {
  return s.toLowerCase().normalize("NFKD");
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/* --------------------------------- scoring -------------------------------- */

function baseStringScore(n: string, t: string, sub: string) {
  if (!n) return 0;
  if (t === n) return 100;
  if (t.startsWith(n)) return 85;
  if (t.includes(n)) return 70;
  if (sub.startsWith(n)) return 55;
  if (sub.includes(n)) return 40;

  const tokens = n.split(/\s+/).filter(Boolean);
  let hits = 0;
  for (const tk of tokens) if (t.includes(tk) || sub.includes(tk)) hits++;
  return hits > 0 ? 30 + hits * 5 : 0;
}

/**
 * Score an item by its own title/subtitle, then (slightly lower weight) by
 * its entity header (entity.name / entity.subtitle). This lets queries for
 * "Apple" match both the Apple entity page and products owned by Apple.
 */
function score(q: string, e: SearchEntity) {
  const n = normalize(q);
  const t = normalize(e.title);
  const sub = normalize(e.subtitle || "");

  // Item text score
  const itemScore = baseStringScore(n, t, sub);

  // Entity header score (reduced a bit so exact item title still wins)
  const en = normalize(e.entity?.name || "");
  const esub = normalize(e.entity?.subtitle || "");
  let entityScore = 0;
  if (en || esub) {
    const raw = baseStringScore(n, en, esub);
    // Nudge down so an exact item title match remains king
    entityScore = Math.max(0, raw - 5);
  }

  return Math.max(itemScore, entityScore);
}

/* --------------------------- synthetic entities --------------------------- */
/**
 * Create discoverable "entity" items (companies/organisations/users) from ENTITIES
 * when they don't already exist in the index as entity-scoped items.
 */
function synthesizeEntitiesIndex(
  entities: Record<string, EntityHeader>,
  existing: SearchEntity[]
): SearchEntity[] {
  const existingEntityIds = new Set(
    existing
      .filter((e) => e.scope === "entities" && e.entity?.id)
      .map((e) => e.entity!.id!)
  );

  const out: SearchEntity[] = [];
  for (const eh of Object.values(entities)) {
    if (!eh.id || existingEntityIds.has(eh.id)) continue;

    out.push({
      id: `ent-${eh.id}`,
      title: eh.name,
      subtitle: eh.subtitle || "",
      href: `/${slugify(eh.name)}`,
      scope: "entities",
      entity: eh,
      tags: [eh.type || "entity"],
      // Put far in the past so "recent" sort favors real data
      updatedAt: "2000-01-01T00:00:00Z",
      rawItem: { type: "entity" },
    });
  }
  return out;
}

/* ----------------------------- unified index ------------------------------ */

const INDEX: SearchEntity[] = [
  ...MOCK_DATA,
  ...synthesizeEntitiesIndex(ENTITIES, MOCK_DATA),
];

/* --------------------------------- search --------------------------------- */

type ScoredEntity = SearchEntity & { _score: number };

export function searchLocal({
  q,
  scope,
  role,
  sort,
  page,
  pageSize,
}: {
  q: string;
  scope: Scope | "all";
  role?: string;
  sort?: "relevance" | "recent" | "a-z";
  page?: number;
  pageSize?: number;
}): {
  hits: SearchEntity[];
  total: number;
  totalPages: number;
  allHits: SearchEntity[];
} {
  const qn = q.trim();

  const filtered: ScoredEntity[] = INDEX
    .filter((e) => {
      if (scope !== "all") {
        // Special view: components are *products* with role === "component"
        if (scope === "components") {
          if (e.scope !== "products") return false;
          return e.rawItem?.role === "component";
        }
        if (e.scope !== scope) return false;
      }
      if (role && e.rawItem?.role && e.rawItem.role !== role) return false;
      return true;
    })
    .map((e) => ({ ...(e as SearchEntity), _score: score(qn, e) }));

  let hits: ScoredEntity[] = filtered;
  if (qn) hits = hits.filter((e) => e._score > 0);

  if (sort === "recent") {
    hits.sort(
      (a, b) =>
        new Date(b.updatedAt || 0).getTime() -
        new Date(a.updatedAt || 0).getTime()
    );
  } else if (sort === "a-z") {
    hits.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    hits.sort((a, b) => (b._score || 0) - (a._score || 0));
  }

  const total = hits.length;
  const ps = pageSize || 24;
  const totalPages = Math.max(1, Math.ceil(total / ps));
  const pageIndex = Math.min(Math.max(1, page || 1), totalPages) - 1;
  const start = pageIndex * ps;
  const end = start + ps;

  const stripScore = (e: ScoredEntity): SearchEntity => {
    const clone: Record<string, unknown> = { ...e };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (clone as any)._score;
    return clone as SearchEntity;
  };

  const pageHits = hits.slice(start, end).map(stripScore);
  const allHits = hits.map(stripScore);

  return { hits: pageHits, total, totalPages, allHits };
}

export function countByScope(all: SearchEntity[] = []) {
  const counts: Record<Scope | "all", number> = {
    all: all.length,
    standards: 0,
    materials: 0,
    components: 0, // derived from products w/ role === "component"
    products: 0,
    projects: 0,
    processes: 0,
    entities: 0,
  };

  for (const e of all) {
    if (e.scope === "products" && e.rawItem?.role === "component") {
      counts.components += 1;
      continue;
    }
    counts[e.scope] = (counts[e.scope] || 0) + 1;
  }

  return counts;
}
