// components/search/cards/item-card.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, type ComponentType, type MouseEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import type { SearchEntity } from "@/lib/search/types";

const PLACEHOLDER = "https://dummyimage.com/1200x800/1f2937/ffffff.png&text=No+image";

type IconType = ComponentType<{ className?: string }>;

function slugifyName(name?: string) {
  return (name ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "").trim();
}
function profileHref(entity?: { id?: string; name?: string; type?: string }) {
  if (!entity) return "/";
  if (entity.id && entity.id.startsWith("@")) return `/${entity.id}`;
  return `/${slugifyName(entity.name)}`;
}

function StarPill({ count = 0, onClick }: { count?: number; onClick?: (e: MouseEvent) => void }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-7 gap-1 px-2"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick?.(e);
      }}
      aria-label="Star"
    >
      <Star className="h-4 w-4" />
      <span className="text-xs tabular-nums">{count}</span>
    </Button>
  );
}

function Header({ entity }: { entity?: SearchEntity["entity"] }) {
  if (!entity) return null;
  return (
    <div className="mb-3 flex h-[56px] items-center justify-between rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
      <Link href={profileHref(entity)} className="flex min-w-0 items-center gap-3" aria-label={`${entity?.name} profile`}>
        <div className="relative h-9 w-9 overflow-hidden rounded-lg">
          {entity?.logoUrl ? (
            <Image src={entity.logoUrl} alt={entity?.name ?? ""} fill className="object-cover" />
          ) : (
            <div className="h-9 w-9 rounded-lg bg-muted" />
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <p className="truncate font-medium leading-none">{entity?.name}</p>
            {entity?.verified && <BadgeCheck aria-label="Verified" className="h-4 w-4 text-sky-400" />}
          </div>
          {entity?.subtitle ? <p className="truncate text-xs text-muted-foreground">{entity.subtitle}</p> : <div className="h-3" />}
        </div>
      </Link>
    </div>
  );
}

export function ItemCard({ item, TypeIcon }: { item: SearchEntity; TypeIcon: IconType }) {
  const entity = item.entity;
  const images = item.images && item.images.length > 0 ? item.images : [PLACEHOLDER];
  const [idx, setIdx] = useState(0);
  const hasMany = images.length > 1;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-2 transition-shadow hover:shadow-md">
      <Header entity={entity} />

      <div className="relative mb-3 h-[140px] overflow-hidden rounded-xl bg-transparent group/image">
        <Link href={item.href} className="absolute inset-0 block" aria-label={item.title} />
        <Image src={images[idx]} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain" />

        {hasMany && (
          <>
            <div className="absolute inset-y-0 left-0 flex items-center pl-1 opacity-0 transition-opacity duration-150 group-hover/image:opacity-100">
              <Button size="icon" variant="secondary" className="h-7 w-7 rounded-full" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIdx((n) => (n - 1 + images.length) % images.length); }} aria-label="Previous image">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-1 opacity-0 transition-opacity duration-150 group-hover/image:opacity-100">
              <Button size="icon" variant="secondary" className="h-7 w-7 rounded-full" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIdx((n) => (n + 1) % images.length); }} aria-label="Next image">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="flex items-start justify-between gap-2 px-2 min-h-[28px]">
        <p className="line-clamp-2 text-lg font-semibold leading-tight">{item.title}</p>
        <StarPill count={item.stars ?? 0} />
      </div>

      <div className="mb-2 flex items-start gap-2 px-2 min-h-[20px]">
        {TypeIcon && <TypeIcon className="mt-0.5 h-5 w-5 shrink-0 opacity-70" />}
        <div className="min-w-0">
          {item.subtitle ? (
            <p className="line-clamp-1 text-sm text-muted-foreground">{item.subtitle}</p>
          ) : (
            <div className="h-4" />
          )}
        </div>
      </div>

      {item.specs && item.specs.length > 0 ? (
        <div className="mt-1 flex flex-wrap gap-1.5 px-2 min-h-[24px]">
          {item.specs.slice(0, 3).map((kv) => (
            <Badge key={kv.label} variant="secondary" className="px-2 py-0.5 text-[11px]">
              <span className="font-medium">{kv.label}:</span>&nbsp;{kv.value}
            </Badge>
          ))}
        </div>
      ) : (
        <div className="px-2 min-h-[24px]" />
      )}

      {item.badges && item.badges.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1.5 px-2 min-h-[24px]">
          {item.badges.slice(0, 2).map((b) => (
            <Badge key={b} className="px-2 py-0.5 text-[11px]">{b}</Badge>
          ))}
        </div>
      )}
    </Card>
  );
}