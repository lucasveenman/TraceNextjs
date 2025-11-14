// lib/data/projects.ts

export type ProjectStage = "concept" | "prototype" | "production" | "retired";

export type ProjectLinkGroup = {
  products?: string[];
  materials?: string[];
  processes?: string[];
  standards?: string[];
};

export type ProjectVariantKind = "base" | "variant" | "prototype";

export type ProjectVariant = {
  id: string;      // internal id, e.g. "iphone-15-pro"
  label: string;   // human label, e.g. "iPhone 15 Pro"
  kind: ProjectVariantKind;
};

export type ProjectData = {
  owner: string;
  slug: string;           // URL slug, e.g. "iphone-15"
  name: string;           // human name, e.g. "iPhone 15"
  description: string;
  baseVariantId: string;  // id of the main/base variant
  variants: ProjectVariant[];
  stage: ProjectStage;
  updatedAt: string;
  links?: ProjectLinkGroup;
};

const demoProjects: ProjectData[] = [
  {
    owner: "apple",
    slug: "iphone-15",
    name: "iPhone 15",
    description:
      "End-to-end development workspace for the iPhone 15 series hardware: enclosure, PCB stack, optics, and mechanical integration.",
    baseVariantId: "iphone-15",
    variants: [
      { id: "iphone-15", label: "iPhone 15", kind: "base" },
      { id: "iphone-15-pro", label: "iPhone 15 Pro", kind: "variant" },
      { id: "iphone-15-pro-max", label: "iPhone 15 Pro Max", kind: "variant" },
      { id: "prototype-15231", label: "Prototype 15231", kind: "prototype" },
      { id: "prototype-15232", label: "Prototype 15232", kind: "prototype" },
    ],
    stage: "production",
    updatedAt: "2025-02-01T12:00:00Z",
    links: {
      products: ["A16 Bionic"],
      materials: ["titanium-ti-6al-4v"],
      processes: ["cnc-ti-frame-v1"],
      standards: ["iso-4017"],
    },
  },
  {
    owner: "raspberrypi",
    slug: "raspberrypi-5-mainboard",
    name: "Raspberry Pi 5 Mainboard",
    description:
      "Mainboard layout, mechanical stack-up, and assembly flow for the Raspberry Pi 5 platform.",
    baseVariantId: "rev-a",
    variants: [
      { id: "rev-a", label: "Rev A", kind: "base" },
      { id: "rev-b", label: "Rev B", kind: "variant" },
      { id: "proto-01", label: "Proto 01", kind: "prototype" },
    ],
    stage: "production",
    updatedAt: "2025-03-01T12:00:00Z",
    links: {
      products: ["raspberrypi-5"],
      materials: ["fr4-core-stackup-a"],
      processes: ["smt-line-std-profile"],
      standards: ["ipc-2221"],
    },
  },
];

export function getProject(owner: string, slug: string): ProjectData | null {
  const keyOwner = owner.toLowerCase();
  const keySlug = slug.toLowerCase();
  return (
    demoProjects.find(
      (p) => p.owner.toLowerCase() === keyOwner && p.slug.toLowerCase() === keySlug,
    ) ?? null
  );
}

export function getProjectsForOwner(owner: string): ProjectData[] {
  const keyOwner = owner.toLowerCase();
  return demoProjects.filter((p) => p.owner.toLowerCase() === keyOwner);
}
