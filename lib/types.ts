// lib/types.ts
export type TypedRepo = {
  name: string;
  type: "project" | "product" | "material" | "standard" | "process";
  description?: string;
  stars?: number;
  updatedAt?: string;
};

export type OrgOverviewReadme = {
  title: string;
  body: string[];
  badges: string[];
  links: { label: string; href: string }[];
};

export type OrgOverviewData = {
  handle: string;
  displayName: string;
  bio: string;
  website: string;
  location?: string;
  followers?: string;
  contact?: string;
  readme: OrgOverviewReadme;
  pinnedRepos: {
    name: string;
    description?: string;
    stars?: number;
    updatedAt?: string;
  }[];
  people?: { name: string; role: string }[];
  sponsors?: { name: string }[];
  materials?: { label: string; pct: number }[];
  tags?: string[];
};
