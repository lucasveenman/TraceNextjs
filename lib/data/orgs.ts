// lib/data/orgs.ts
export type TypedRepo = {
  name: string;
  type: "project" | "product" | "material" | "standard" | "process";
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
  readme: {
    title: string;
    body: string[];
    badges?: string[];
    links?: { label: string; href: string }[];
  };
  pinnedRepos: (TypedRepo & { stars?: number })[];
  people: { name: string; role?: string }[];
  sponsors: { name: string }[];
  materials: { label: string; pct: number }[];
  tags: string[];
};

export function buildRepoHref(owner: string, repo: TypedRepo) {
  return `/${owner}/${repo.type}/${repo.name}`;
}

// ---- In-memory demo data + helpers ----
const demoData: Record<string, OrgData> = {
  iso: {
    handle: "iso",
    displayName: "ISO",
    bio: "International Organization for Standardization.",
    website: "https://www.iso.org",
    location: "Global",
    followers: "250k",
    contact: "info@iso.org",
    readme: {
      title: "ISO Standards",
      body: [
        "Global standards for technology, manufacturing, and safety.",
        "Used as references for consistent quality and interoperability.",
      ],
      badges: ["standards", "global"],
      links: [
        { label: "Website", href: "https://www.iso.org" },
        { label: "Docs", href: "/orgs/iso/repositories" },
      ],
    },
    pinnedRepos: [
      { name: "iso-4017", type: "standard", description: "Hex head bolts — Metric thread", stars: 150, updatedAt: "2025-01-05T12:00:00Z" },
      { name: "iso-26262", type: "standard", description: "Functional safety for automotive", stars: 97, updatedAt: "2025-02-10T12:00:00Z" },
    ],
    people: [{ name: "Standardization Team" }],
    sponsors: [],
    materials: [],
    tags: ["standards", "safety", "manufacturing"],
  },
  apple: {
    handle: "apple",
    displayName: "Apple Inc.",
    bio: "Designing innovative consumer electronics and software.",
    website: "https://www.apple.com",
    location: "Cupertino, USA",
    followers: "12M",
    contact: "contact@apple.com",
    readme: {
      title: "Apple Engineering",
      body: [
        "Projects and component standards powering Apple products.",
        "Collaborations across suppliers and manufacturing partners.",
      ],
      badges: ["hardware", "design", "innovation"],
      links: [
        { label: "Website", href: "https://www.apple.com" },
        { label: "Docs", href: "/orgs/apple/repositories" },
      ],
    },
    pinnedRepos: [
      { name: "iphone-15-pro", type: "product", description: "Titanium iPhone with A17 Pro chip", stars: 900, updatedAt: "2025-02-01T12:00:00Z" },
      { name: "m3-chip", type: "product", description: "Apple Silicon M3", stars: 760, updatedAt: "2025-01-15T12:00:00Z" },
    ],
    people: [{ name: "J. Ive", role: "Design" }],
    sponsors: [],
    materials: [{ label: "Titanium", pct: 50 }],
    tags: ["consumer", "electronics", "design"],
  },
  raspberrypi: {
    handle: "raspberrypi",
    displayName: "Raspberry Pi Foundation",
    bio: "Accessible computing for everyone.",
    website: "https://www.raspberrypi.org",
    location: "UK",
    followers: "500k",
    contact: "info@raspberrypi.org",
    readme: {
      title: "Raspberry Pi Projects",
      body: [
        "Open hardware computing boards and educational kits.",
        "Driving open collaboration between hardware and software communities.",
      ],
      badges: ["open source", "education"],
      links: [
        { label: "Website", href: "https://www.raspberrypi.org" },
        { label: "Docs", href: "/orgs/raspberrypi/repositories" },
      ],
    },
    pinnedRepos: [
      { name: "raspberrypi-5", type: "product", description: "Latest Raspberry Pi board with enhanced CPU", stars: 420, updatedAt: "2025-03-01T12:00:00Z" },
      { name: "camera-module-3", type: "product", description: "High-resolution camera module.", stars: 210, updatedAt: "2025-01-12T12:00:00Z" },
    ],
    people: [{ name: "Eben Upton", role: "Founder" }],
    sponsors: [],
    materials: [],
    tags: ["hardware", "education", "opensource"],
  },
};

export function getOrg(handle: string): OrgData | null {
  const key = handle.toLowerCase();
  return demoData[key] ?? null;
}

export function getReposForOwner(handle: string): TypedRepo[] {
  const org = getOrg(handle);
  return org?.pinnedRepos ?? [];
}
