// lib/search/types.ts
import type { ComponentType } from "react";
import { ScrollText, Layers, Puzzle, Package, Building2, Orbit, FolderGit2  } from "lucide-react";

export type Scope = "standards" | "materials" | "components" | "products" | "projects" | "processes" | "entities";
export type EntityKind = "company" | "organisation" | "user";
export type ItemKind = "standard" | "material" | "product" | "project" | "process" | "entity";

export type EntityHeader = {
  id: string;
  name: string;
  logoUrl?: string;
  verified?: boolean;
  type?: EntityKind;
  subtitle?: string;
  description?: string;
  socials?: {
    website?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  meta?: {
    hq?: string;
    founded?: number;
    size?: string;
    focus?: string;
  };
  stats?: {
    products?: number;
    repos?: number;
    followers?: number;
    stars?: number;
  };
};

export type SearchEntity = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  scope: Scope;
  entity?: EntityHeader;
  tags?: string[];
  updatedAt?: string;
  rawItem?: { type?: ItemKind; role?: string } // e.g. role: "component" ;
  stars?: number;
  specs?: { label: string; value: string }[];
  badges?: string[];

  /** New: gallery for non-profile cards (first image is the default) */
  images?: string[];
};

export const SCOPES_FOR_UI: Array<{
  key: Scope;
  label: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  { key: "standards", label: "Standards", icon: ScrollText },
  { key: "materials", label: "Materials", icon: Layers },
  { key: "components", label: "Components", icon: Puzzle },
  { key: "products", label: "Products", icon: Package },
  { key: "projects", label: "Projects", icon: FolderGit2 },
  { key: "processes", label: "Processes", icon: Orbit },
  { key: "entities", label: "Entity", icon: Building2 },
];
