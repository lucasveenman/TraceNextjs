// lib/data/orgs.ts
export type TypedRepo = {
  name: string;
  type: "project" | "product" | "material" | "standard" | "process";
  description?: string;
  stars?: number;
  updatedAt?: string;
};

export type OrgSocials = {
  website?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
};

export type OrgMeta = {
  hq?: string;
  founded?: number;
  focus?: string;
  size?: string;
};

export type OrgStats = {
  products?: number;
  repos?: number;
  followers?: number;
  stars?: number;
};

export type OrgData = {
  handle: string;
  displayName: string;
  bio: string;
  website?: string;
  location?: string;
  followers?: string; // human readable (e.g. "12M")
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

  // Search / entity extras (from search/mockData.ts)
  entityType?: "company" | "organisation" | "user";
  verified?: boolean;
  logoUrl?: string;
  socials?: OrgSocials;
  meta?: OrgMeta;
  stats?: OrgStats;
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
    followers: "25k+",
    contact: "info@iso.org",
    readme: {
      title: "ISO Standards",
      body: [
        "Global standards for technology, manufacturing, and safety.",
        "Used as references for consistent quality and interoperability.",
      ],
      badges: ["standards", "global"],
    },
    pinnedRepos: [
      {
        name: "iso-4017",
        type: "standard",
        description: "Hex head bolts — Metric thread",
        stars: 150,
        updatedAt: "2025-01-05T12:00:00Z",
      },
      {
        name: "iso-26262",
        type: "standard",
        description: "Functional safety for automotive",
        stars: 97,
        updatedAt: "2025-02-10T12:00:00Z",
      },
    ],
    people: [{ name: "Standardization Team" }],
    sponsors: [],
    materials: [],
    tags: ["standards", "safety", "manufacturing"],

    entityType: "organisation",
    verified: true,
    logoUrl: "/images/logos/Icon.jpeg",
    socials: {
      website: "https://iso.org",
      twitter: "https://twitter.com/isostandards",
      instagram: "https://www.instagram.com/isostandards",
      linkedin: "https://www.linkedin.com/company/isostandards",
    },
    meta: {
      hq: "Geneva, CH",
      founded: 1947,
      focus: "International standards development",
      size: "150-200",
    },
    stats: {
      products: 0,
      repos: 1800,
      followers: 20000,
      stars: 14000,
    },
  },

  apple: {
    handle: "apple",
    displayName: "Apple Inc.",
    bio: "Apple Inc. is an American multinational corporation and technology company headquartered and incorporated in Cupertino, California, in Silicon Valley.",
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
    },
    pinnedRepos: [
      {
        name: "iphone-15-pro",
        type: "product",
        description: "Titanium iPhone with A17 Pro chip",
        stars: 900,
        updatedAt: "2025-02-01T12:00:00Z",
      },
      {
        name: "m3-chip",
        type: "product",
        description: "Apple Silicon M3",
        stars: 760,
        updatedAt: "2025-01-15T12:00:00Z",
      },
    ],
    people: [{ name: "J. Ive", role: "Design" }],
    sponsors: [],
    materials: [{ label: "Titanium", pct: 50 }],
    tags: ["consumer", "electronics", "design"],

    entityType: "company",
    verified: true,
    logoUrl: "/Apple_Icon_1.webp",
    socials: {
      website: "https://apple.com",
      twitter: "https://twitter.com/Apple",
      instagram: "https://instagram.com/apple",
      linkedin: "https://www.linkedin.com/company/apple",
    },
    meta: {
      hq: "Cupertino, CA",
      founded: 1976,
      focus: "Consumer electronics",
      size: "160k+",
    },
    stats: {
      products: 120,
      repos: 38,
      followers: 20000000,
      stars: 120000,
    },
  },

  raspberrypi: {
    handle: "raspberrypi",
    displayName: "Raspberry Pi Ltd.",
    bio: "Raspberry Pi Ltd. designs and sells low-cost, high-performance single-board computers for education, makers, and industry.",
    website: "https://www.raspberrypi.org",
    location: "Cambridge, UK",
    followers: "500k",
    contact: "info@raspberrypi.org",
    readme: {
      title: "Raspberry Pi Projects",
      body: [
        "Open hardware computing boards and educational kits.",
        "Driving open collaboration between hardware and software communities.",
      ],
      badges: ["open source", "education"],
    },
    pinnedRepos: [
      {
        name: "raspberrypi-5",
        type: "product",
        description: "Latest Raspberry Pi board with enhanced CPU",
        stars: 420,
        updatedAt: "2025-03-01T12:00:00Z",
      },
      {
        name: "camera-module-3",
        type: "product",
        description: "High-resolution camera module.",
        stars: 210,
        updatedAt: "2025-01-12T12:00:00Z",
      },
    ],
    people: [{ name: "Eben Upton", role: "Founder" }],
    sponsors: [],
    materials: [],
    tags: ["hardware", "education", "opensource"],

    entityType: "company",
    verified: true,
    logoUrl: "/Raspberry Pi Foundation_idwbF1-REU_0.jpeg",
    socials: {
      website: "https://raspberrypi.com",
      twitter: "https://twitter.com/raspberrypi",
      instagram: "https://instagram.com/raspberrypi",
      linkedin: "https://www.linkedin.com/company/raspberrypi",
    },
    meta: {
      hq: "Cambridge, UK",
      founded: 2012,
      focus: "SBCs & modules",
      size: "500+",
    },
    stats: {
      products: 25,
      repos: 60,
      followers: 1800000,
      stars: 64000,
    },
  },

   omnitudedesign: {
    handle: "omnitudedesign",
    displayName: "OmnitudeDesign",
    bio: "OmnitudeDesign is a Dutch fashion and technology company operating at the intersection of apparel, storytelling, and innovation.",
    website: "https://omnitudedesign.com",
    location: "Roosendaal, NL",
    followers: "9k",
    contact: "info@omnitudedesign.com",
    readme: {
      title: "OmnitudeDesign",
      body: [
        "Limited-edition garments, creator-driven collaborations, and long-term smart-wearable technologies.",
        "Part of an expanding digital ecosystem that blends fashion, narrative, and immersive technology.",
      ],
      badges: ["fashion", "technology", "storytelling"],
    },
    pinnedRepos: [
      {
        name: "clandestine-hoodie",
        type: "product",
        description: "Oversized streetwear hoodie from the Singularities line.",
        stars: 210,
        updatedAt: "2025-01-20T12:00:00Z",
      },
      {
        name: "omnitude-program",
        type: "project",
        description: "Creator submission and review pipeline.",
        stars: 120,
        updatedAt: "2025-02-15T12:00:00Z",
      },
    ],
    people: [{ name: "Lucas Veenman", role: "Founder" }],
    sponsors: [],
    materials: [],
    tags: ["fashion", "design", "wearables"],

    entityType: "company",
    verified: true,
    logoUrl: "/omnitudedesign1.png",
    socials: {
      website: "https://omnitudedesign.com",
      twitter: "https://twitter.com/OmnitudeDesign",
      instagram: "https://instagram.com/omnnitudedesign",
      linkedin: "https://www.linkedin.com/company/omnitudedesign",
    },
    meta: {
      hq: "Roosendaal, NL",
      founded: 2025,
      focus: "Fashion & Design",
      size: "1-10",
    },
    stats: {
      products: 2,
      repos: 4,
      followers: 9000,
      stars: 1000,
    },
  },

  aluminumassociation: {
    handle: "aluminumassociation",
    displayName: "Aluminum Association",
    bio: "The Aluminum Association serves as the major standard setting organization for the global aluminum industry.",
    website: "https://aluminum.org",
    location: "Arlington, VA",
    followers: "2k",
    contact: "info@aluminum.org",
    readme: {
      title: "Aluminum Association",
      body: [
        "Registers new aluminum alloys and products.",
        "Manages and updates aluminum standards and related publications.",
      ],
      badges: ["aluminum", "standards"],
    },
    pinnedRepos: [
      {
        name: "6061-t6",
        type: "material",
        description: "Aluminum 6061-T6 material definition.",
        stars: 22,
        updatedAt: "2023-10-01T12:00:00Z",
      },
    ],
    people: [],
    sponsors: [],
    materials: [],
    tags: ["aluminum", "materials", "standards"],

    entityType: "organisation",
    verified: true,
    logoUrl: "/images/logos/AA.webp",
    socials: {
      website: "https://aluminum.org",
      twitter: "https://twitter.com/AluminumNews",
      instagram: "http://www.instagram.com/aluminumnews",
      linkedin: "https://www.linkedin.com/company/the-aluminum-association",
    },
    meta: {
      hq: "Arlington, VA",
      founded: 1935,
      focus: "Aluminum",
      size: "10-30",
    },
    stats: {
      products: 0,
      repos: 12,
      followers: 2000,
      stars: 200,
    },
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
