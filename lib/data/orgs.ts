// lib/orgs.ts

export type RepoType = "project" | "product" | "material" | "standard" | "process";

export type TypedRepo = {
  name: string;
  type: RepoType;
  description?: string;
  stars?: number;
  updatedAt?: string;
};

export type OrgData = {
  handle: string;
  displayName: string;
  bio: string;
  website?: string;
  location?: string;
  followers?: string;
  contact?: string;
  tags: string[];
  readme: {
    title: string;
    body: string[];
    badges?: string[];
    links?: { label: string; href: string }[];
  };
  pinnedRepos: TypedRepo[];
  people: { name: string; avatar?: string; role?: string }[];
  sponsors: { name: string; avatar?: string }[];
  materials: { label: string; pct: number }[];
};

// Helper: build correct link based on repo type
export function buildRepoHref(owner: string, repo: Pick<TypedRepo, "name" | "type">) {
  return `/${owner}/${repo.type}/${repo.name}`;
}

// --- In-memory data store (could be replaced by DB/fetch later) ---

const ORGS: Record<string, OrgData> = {
  omnitudedesign: {
    handle: "omnitudedesign",
    displayName: "OmnitudeDesign",
    bio: "Building physical-git: versioned models, BOMs, and transparent sourcing.",
    website: "https://www.omnitudedesign.com",
    location: "NL • EU",
    followers: "1.5k",
    contact: "hello@omnitudedesign.com",
    readme: {
      title: "Omnitude",
      body: [
        "Omnitude provides modularized hardware versioning for real-world products.",
        "Version models, keep BOMs auditable, and connect sourcing with digital twins.",
      ],
      badges: ["open source", "PRs welcome", "discord"],
      links: [
        { label: "www", href: "https://www.omnitudedesign.com" },
        { label: "X", href: "https://x.com" },
        { label: "Docs", href: `/omnitudedesign/repositories` },
        { label: "Discord", href: "#" },
      ],
    },
    pinnedRepos: [
      { name: "phystrack", type: "project", description: "Trace MVP – Git for hardware repos.", stars: 42, updatedAt: "2025-01-12T12:00:00Z" },
      { name: "enclosure-001", type: "product", description: "3D printed enclosure with BOM.", stars: 18, updatedAt: "2025-02-02T09:10:00Z" },
      { name: "materials-db", type: "material", description: "Community-curated materials references.", stars: 7, updatedAt: "2025-03-04T15:30:00Z" },
      { name: "trace-docs", type: "standard", description: "Public docs for Trace platform.", stars: 5, updatedAt: "2025-03-11T11:11:00Z" },
    ],
    people: [
      { name: "Lucas V.", role: "Founder" },
      { name: "A. Designer", role: "Design" },
      { name: "M. Engineer", role: "Manufacturing" },
    ],
    sponsors: [{ name: "Alpha" }, { name: "Beta" }, { name: "Gamma" }],
    materials: [
      { label: "Al 6061", pct: 48 },
      { label: "ABS", pct: 32 },
      { label: "PETG", pct: 12 },
      { label: "Other", pct: 8 },
    ],
    tags: ["hardware", "bom", "3d-printing", "supply-chain", "traceability"],
  },

  // Example: ISO
  iso: {
    handle: "iso",
    displayName: "International Organization for Standardization",
    bio: "Global standards that power products, services, and systems.",
    website: "https://www.iso.org",
    location: "Geneva, CH",
    followers: "120k",
    contact: "info@iso.org",
    readme: {
      title: "ISO",
      body: [
        "Centralized index of commonly referenced ISO standards for engineering.",
        "Link standards to products/projects for traceability.",
      ],
      badges: ["standards", "docs"],
      links: [{ label: "Website", href: "https://www.iso.org" }],
    },
    pinnedRepos: [
      { name: "iso-261", type: "standard", description: "ISO 261 – ISO general purpose metric screw threads — General plan", stars: 320, updatedAt: "2025-03-05T09:00:00Z" },
      { name: "iso-965-1", type: "standard", description: "ISO 965-1 – Tolerances for screw threads", stars: 210, updatedAt: "2025-02-10T10:00:00Z" },
    ],
    people: [{ name: "Standards Secretariat" }],
    sponsors: [],
    materials: [],
    tags: ["standard", "documentation", "conformance"],
  },

  // Example: Apple
  apple: {
    handle: "apple",
    displayName: "Apple",
    bio: "Designing hardware, software, and services.",
    website: "https://www.apple.com",
    location: "Cupertino, CA",
    followers: "2.1M",
    contact: "contact@apple.com",
    readme: {
      title: "Apple Engineering",
      body: ["Publicly linkable components and standards references used across products."],
      links: [{ label: "Website", href: "https://www.apple.com" }],
    },
    pinnedRepos: [
      { name: "usb-c-connector", type: "product", description: "Type-C connector interface spec (public subset).", stars: 900, updatedAt: "2025-01-22T12:00:00Z" },
      { name: "anodize-type-ii", type: "process", description: "Finishing process guidance for aluminum parts.", stars: 370, updatedAt: "2025-03-02T08:00:00Z" },
    ],
    people: [{ name: "Hardware Ops" }],
    sponsors: [],
    materials: [{ label: "Al 7000", pct: 60 }, { label: "Glass", pct: 30 }, { label: "Other", pct: 10 }],
    tags: ["product", "process", "materials"],
  },

  // Example: Tesla
  tesla: {
    handle: "tesla",
    displayName: "Tesla",
    bio: "Electric vehicles, energy storage and generation.",
    website: "https://www.tesla.com",
    location: "Austin, TX",
    followers: "1.3M",
    contact: "info@tesla.com",
    readme: {
      title: "Tesla Engineering",
      body: ["Selected components, materials, and standards used in EV programs."],
      links: [{ label: "Website", href: "https://www.tesla.com" }],
    },
    pinnedRepos: [
      { name: "battery-module-fastener-m6", type: "product", description: "M6 fastener for module assembly.", stars: 120, updatedAt: "2025-02-12T14:00:00Z" },
      { name: "al-6061-t6", type: "material", description: "Material card for Al 6061-T6.", stars: 88, updatedAt: "2025-03-09T09:30:00Z" },
      { name: "welding-sp-17", type: "process", description: "Spot welding process SP-17.", stars: 64, updatedAt: "2025-03-20T07:30:00Z" },
    ],
    people: [{ name: "Manufacturing Eng" }],
    sponsors: [],
    materials: [{ label: "Al 6061-T6", pct: 40 }, { label: "Steel", pct: 35 }, { label: "Other", pct: 25 }],
    tags: ["ev", "battery", "manufacturing"],
  },
};

// Flatten repos when you need the full list page
const ORG_REPOS: Record<string, TypedRepo[]> = {
  omnitudedesign: [
    { name: "phystrack", type: "project", description: "Trace MVP – Git for hardware repos.", stars: 42, updatedAt: "2025-01-12T12:00:00Z" },
    { name: "enclosure-001", type: "product", description: "3D printed enclosure with BOM.", stars: 18, updatedAt: "2025-02-02T09:10:00Z" },
    { name: "bom-templates", type: "process", description: "Starter BOMs & material presets.", stars: 9, updatedAt: "2025-02-18T18:05:00Z" },
    { name: "materials-db", type: "material", description: "Community-curated materials references.", stars: 7, updatedAt: "2025-03-04T15:30:00Z" },
    { name: "trace-docs", type: "standard", description: "Public docs for Trace platform.", stars: 5, updatedAt: "2025-03-11T11:11:00Z" },
  ],
  iso: [
    { name: "iso-261", type: "standard", description: "ISO 261 – ISO general purpose metric screw threads — General plan", stars: 320, updatedAt: "2025-03-05T09:00:00Z" },
    { name: "iso-965-1", type: "standard", description: "ISO 965-1 – Tolerances for screw threads", stars: 210, updatedAt: "2025-02-10T10:00:00Z" },
  ],
  apple: [
    { name: "usb-c-connector", type: "product", description: "Type-C connector interface spec (public subset).", stars: 900, updatedAt: "2025-01-22T12:00:00Z" },
    { name: "anodize-type-ii", type: "process", description: "Finishing process guidance for aluminum parts.", stars: 370, updatedAt: "2025-03-02T08:00:00Z" },
  ],
  tesla: [
    { name: "battery-module-fastener-m6", type: "product", description: "M6 fastener for module assembly.", stars: 120, updatedAt: "2025-02-12T14:00:00Z" },
    { name: "al-6061-t6", type: "material", description: "Material card for Al 6061-T6.", stars: 88, updatedAt: "2025-03-09T09:30:00Z" },
    { name: "welding-sp-17", type: "process", description: "Spot welding process SP-17.", stars: 64, updatedAt: "2025-03-20T07:30:00Z" },
  ],
};

export function getOrg(handle: string): OrgData | null {
  return ORGS[handle.toLowerCase()] ?? null;
}

export function getReposForOwner(handle: string): TypedRepo[] {
  return ORG_REPOS[handle.toLowerCase()] ?? [];
}

export function getOrgSlugs(): string[] {
  return Object.keys(ORGS);
}
