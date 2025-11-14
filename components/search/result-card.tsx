// components/search/result-card.tsx
"use client";
import type { SearchEntity } from "@/lib/search/types";
import { getCardForItem } from "@/components/search/card-registry";

export function ResultCard({ item }: { item: SearchEntity }) {
  // Hide standalone user profiles from search results (their items can still show).
  if (item.scope === "entities" && item.entity?.type === "user") return null;

  const { as: Card, props } = getCardForItem(item);
  return <Card item={item} {...(props || {})} />;
}
