// components/search/card-registry.tsx
"use client";
import type { ComponentType } from "react";
import type { SearchEntity } from "@/lib/search/types";
import { EntityCard } from "@/components/search/cards/entity-card";
import { ItemCard } from "@/components/search/cards/item-card";
import { ScrollText, Layers, Puzzle, Package, FolderGit2, Orbit } from "lucide-react";

type IconLike = ComponentType<{ className?: string }>;

const TYPE_ICON: Record<string, IconLike> = {
  standard: ScrollText,
  material: Layers,
  component: Puzzle,
  product: Package,
  project: FolderGit2,
  process: Orbit,
};

export type RegisteredCard = {
  as: ComponentType<any>;
  props?: Record<string, unknown>;
};

/**
 * Decide which *existing* component to render.
 * IMPORTANT: Do not create component functions here to avoid ESLint complaint.
 */
export function getCardForItem(item: SearchEntity): RegisteredCard {
  // Only render profile-style EntityCard for true entity hits.
  // Products/materials/etc. that *reference* a company should still use ItemCard.
  if (item.scope === "entities" || item.rawItem?.type === "entity") {
    return { as: EntityCard };
  }

  // Everything else: render as an ItemCard with a suitable icon.
  const typeKey =
    item.rawItem?.role === "component"
      ? "component"
      : (item.rawItem?.type ?? "product");

  const TypeIcon = TYPE_ICON[typeKey] ?? Package;

  return {
    as: ItemCard,
    props: { TypeIcon },
  };
}
