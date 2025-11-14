// lib/search/mockData.ts
import type { SearchEntity, EntityHeader } from "./types";
import { getOrg } from "@/lib/data/orgs";

function buildEntityFromOrg(
  id: string,
  handle: string,
  extra: Pick<
    EntityHeader,
    "type" | "verified" | "subtitle" | "logoUrl" | "description" | "socials" | "meta" | "stats"
  >,
): EntityHeader {
  const org = getOrg(handle);
  if (!org) {
    throw new Error(`Org "${handle}" not found for entity "${id}"`);
  }

  return {
    id,
    name: org.displayName,
    type: extra.type,
    verified: extra.verified,
    subtitle: extra.subtitle,
    logoUrl: extra.logoUrl,
    description: extra.description ?? org.bio,
    socials: extra.socials ?? {
      website: org.socials?.website ?? org.website,
      twitter: org.socials?.twitter,
      instagram: org.socials?.instagram,
      linkedin: org.socials?.linkedin,
    },
    meta: extra.meta,
    stats: extra.stats,
  };
}

export const ENTITIES: Record<string, EntityHeader> = {
  "ent-apple": buildEntityFromOrg("ent-apple", "apple", {
    type: "company",
    verified: true,
    subtitle: "apple.com",
    logoUrl: "/Apple_Icon_1.webp",
    description:
      "Apple Inc. is an American multinational corporation and technology company headquartered and incorporated in Cupertino, California, in Silicon Valley.",
    socials: {
      website: "https://apple.com",
      twitter: "https://twitter.com/Apple",
      instagram: "https://instagram.com/apple",
      linkedin: "https://www.linkedin.com/company/apple",
    },
    meta: { hq: "Cupertino, CA", founded: 1976, focus: "Consumer electronics", size: "160k+" },
    stats: { products: 120, repos: 38, followers: 20000000, stars: 120000 },
  }),

  "ent-omnitudedesign": buildEntityFromOrg("ent-omnitudedesign", "omnitudedesign", {
    type: "company",
    verified: true,
    subtitle: "omnitudedesign.com",
    logoUrl: "/omnitudedesign1.png",
    description:
      "OmnitudeDesign is a Dutch fashion and technology company headquartered in the Netherlands. It operates at the intersection of apparel, storytelling, and innovation, developing limited-edition garments, creator-driven collaborations, and long-term smart-wearable technologies that integrate seamlessly into its expanding digital ecosystem.",
    socials: {
      website: "https://omnitudedesign.com",
      twitter: "https://twitter.com/OmnitudeDesign",
      instagram: "https://instagram.com/omnnitudedesign",
      linkedin: "https://www.linkedin.com/company/omnitudedesign",
    },
    meta: { hq: "Roosendaal, NL", founded: 2025, focus: "Fashion & Design", size: "1-10" },
    stats: { products: 2, repos: 4, followers: 9000, stars: 1000 },
  }),

  "ent-raspberry": buildEntityFromOrg("ent-raspberry", "raspberrypi", {
    type: "company",
    verified: true,
    subtitle: "raspberrypi.com",
    logoUrl: "/Raspberry Pi Foundation_idwbF1-REU_0.jpeg",
    description:
      "Raspberry Pi Ltd. designs and sells low-cost, high-performance single-board computers for education, makers, and industry.",
    socials: {
      website: "https://raspberrypi.com",
      twitter: "https://twitter.com/raspberrypi",
      instagram: "https://instagram.com/raspberrypi",
      linkedin: "https://www.linkedin.com/company/raspberrypi",
    },
    meta: { hq: "Cambridge, UK", founded: 2012, focus: "SBCs & modules", size: "500+" },
    stats: { products: 25, repos: 60, followers: 1800000, stars: 64000 },
  }),

  "ent-iso": buildEntityFromOrg("ent-iso", "iso", {
    type: "organisation",
    verified: true,
    subtitle: "iso.org",
    logoUrl: "/images/logos/Icon.jpeg",
    description:
      "The International Organization for Standardization is an independent, non-governmental, international standard development organization composed of representatives from the national standards organizations of member countries.",
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
    stats: { products: 0, repos: 1800, followers: 20000, stars: 14000 },
  }),

  "ent-aluminum_association": buildEntityFromOrg(
    "ent-aluminum_association",
    "aluminumassociation",
    {
      type: "organisation",
      verified: true,
      subtitle: "aluminum.com",
      logoUrl: "/images/logos/AA.webp",
      description:
        "Through the work of our standards team and the Technical Committee on Product Standards (TCPS), the association serves as the major standard setting organization for the global aluminum industry. This includes registering new aluminum alloys and products, managing and updating publications, and more.",
      socials: {
        website: "https://aluminum.org",
        twitter: "https://twitter.com/AluminumNews",
        instagram: "http://www.instagram.com/aluminumnews",
        linkedin: "https://www.linkedin.com/company/the-aluminum-association",
      },
      meta: { hq: "Arlington, VA", founded: 1935, focus: "Aluminum", size: "10-30" },
      stats: { products: 0, repos: 12, followers: 2000, stars: 200 },
    },
  ),

  "@lucasveenman": {
    id: "@lucasveenman",
    name: "Lucas Veenman",
    type: "user",
    verified: false,
    subtitle: "@lucasveenman",
    logoUrl: "https://i.pravatar.cc/300",
    stats: { repos: 7, followers: 340, stars: 120 },
  },
};

export const MOCK_DATA: SearchEntity[] = [
  // Standards
  {
    id: "iso/iso-7380-1:2022",
    title: "ISO-7380-1:2022",
    subtitle: "Button Head Screws • Hexagon Socket",
    href: "/iso/iso-7380-1:2022",
    scope: "standards",
    entity: ENTITIES["ent-iso"],
    tags: ["bolts", "iso", "standards"],
    updatedAt: "2022-10-01T12:00:00Z",
    rawItem: { type: "standard" },
    stars: 21,
    images: [],
  },

  {
    id: "aluminumassociation/6061-t6",
    title: "Aluminum 6061-T6",
    subtitle: "Aluminum • 6061-T6 • Material",
    href: "/aluminumassociation/material/6061-t6",
    scope: "standards",
    entity: ENTITIES["ent-aluminum_association"],
    tags: ["aluminum", "material", "standards"],
    updatedAt: "2023-10-01T12:00:00Z",
    rawItem: { type: "standard" },
    stars: 22,
    images: [],
  },

  // Products
  {
    id: "prd-iphone15",
    title: "iPhone 15 Pro",
    subtitle: "phone by Apple",
    href: "/apple/product/iphone-15-pro",
    scope: "products",
    entity: ENTITIES["ent-apple"],
    tags: ["phone", "apple"],
    updatedAt: "2025-02-10T12:00:00Z",
    rawItem: { type: "product" },
    stars: 1864,
    images: ["/images/products/iphone-15-pro.png"],
  },
  {
    id: "prd-pi5",
    title: "Raspberry Pi 5",
    subtitle: "Raspberry Pi 5 8GB RAM",
    href: "/raspberrypi/product/pi-5-8gb",
    scope: "products",
    entity: ENTITIES["ent-raspberry"],
    tags: ["raspberry", "sbcs"],
    updatedAt: "2025-01-01T12:00:00Z",
    rawItem: { type: "product" },
    stars: 2210,
    images: ["/images/products/raspberrypi-5.png"],
  },

  // Projects
  {
    id: "opensource-glasess",
    title: "OS-Glasess",
    subtitle: "Open product repo",
    href: "/@lucasveenman/project/os-glasess",
    scope: "projects",
    entity: ENTITIES["@lucasveenman"],
    tags: ["open source", "eyewear", "repo"],
    updatedAt: "2025-10-01T12:00:00Z",
    rawItem: { type: "project" },
    stars: 58,
    images: ["/images/products/glasess.png"],
  },
];
