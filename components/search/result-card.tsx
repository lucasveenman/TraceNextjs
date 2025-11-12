// components/ResultCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type ComponentType, type MouseEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  ScrollText,
  Layers,
  Puzzle,
  Package,
  Building2,
  Store,
  Globe,
  Twitter,
  Instagram,
  Linkedin,
  Star,
  MapPin,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { SearchEntity } from "@/lib/search/types";

type IconType = ComponentType<{ className?: string }>;

const ITEM_TYPE_ICON: Record<string, IconType> = {
  standards: ScrollText,
  material: Layers,
  component: Puzzle,
  product: Package,
  company: Building2,
  supplier: Store,
};

const PLACEHOLDER =
  "https://dummyimage.com/1200x800/1f2937/ffffff.png&text=No+image";

function slugifyName(name?: string) {
  return (name ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "").trim();
}

function profileHref(entity?: { id?: string; name?: string; type?: string }) {
  if (!entity) return "/";
  if (entity.id && entity.id.startsWith("@")) return `/${entity.id}`;
  return `/${slugifyName(entity.name)}`;
}

function StarPill({
  count = 0,
  onClick,
}: {
  count?: number;
  onClick?: (e: MouseEvent) => void;
}) {
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

function InfoPill({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  if (!value && value !== 0) return null;
  return (
    <div className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
      <span className="opacity-70">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
}: {
  icon: IconType;
  label: string;
  value?: number;
}) {
  if (value === undefined) return null;
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-md border px-2 py-1">
      <Icon className="h-4 w-4 opacity-70" />
      <div className="min-w-0">
        <div className="text-sm font-medium leading-none tabular-nums">
          {value.toLocaleString()}
        </div>
        <div className="text-[11px] leading-none text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function TinySpecs({ specs }: { specs?: { label: string; value: string }[] }) {
  if (!specs?.length) return <div className="px-2 min-h-[24px]" />;
  return (
    <div className="mt-1 flex flex-wrap gap-1.5 px-2 min-h-[24px]">
      {specs.slice(0, 3).map((kv) => (
        <Badge key={kv.label} variant="secondary" className="px-2 py-0.5 text-[11px]">
          <span className="font-medium">{kv.label}:</span>&nbsp;{kv.value}
        </Badge>
      ))}
    </div>
  );
}

export function ResultCard({ item }: { item: SearchEntity }) {
  const entity = item.entity;
  const rawType = item.rawItem?.type ?? "";
  const TypeIcon = rawType ? ITEM_TYPE_ICON[rawType] ?? Package : null;

  const isEntityProfile = rawType === "company" || rawType === "supplier";
  const headerLink = profileHref(entity);
  const showFollow = entity?.type === "company" || entity?.type === "user";

  // Always define images + index so hooks run in the same order every render
  const images =
    !isEntityProfile && item.images && item.images.length > 0
      ? item.images
      : [PLACEHOLDER];
  const [idx, setIdx] = useState(0);
  const hasMany = images.length > 1;

  const Header = (
    <div className="mb-3 flex h-[56px] items-center justify-between rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
      <Link
        href={headerLink}
        className="flex min-w-0 items-center gap-3"
        aria-label={`${entity?.name} profile`}
      >
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
          {entity?.subtitle ? (
            <p className="truncate text-xs text-muted-foreground">{entity.subtitle}</p>
          ) : (
            <div className="h-3" />
          )}
        </div>
      </Link>

      {showFollow && (
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          aria-label="Follow"
        >
          Follow
        </Button>
      )}
    </div>
  );

  // ===== NON-PROFILE CARDS =====
  if (!isEntityProfile) {
    return (
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-2 transition-shadow hover:shadow-md">
        {entity && Header}

        {/* Image area (contain) */}
        <div className="relative mb-3 h-[140px] overflow-hidden rounded-xl bg-transparent group/image">
          {/* Click-through link */}
          <Link href={item.href} className="absolute inset-0 block" aria-label={item.title} />

          {/* Actual image (contain so the whole image fits) */}
          <Image
            src={images[idx]}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain"
            priority={false}
          />

          {/* Hover-only controls */}
          {hasMany && (
            <>
              <div className="absolute inset-y-0 left-0 flex items-center pl-1 opacity-0 transition-opacity duration-150 group-hover/image:opacity-100">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-7 w-7 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIdx((n) => (n - 1 + images.length) % images.length);
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-1 opacity-0 transition-opacity duration-150 group-hover/image:opacity-100">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-7 w-7 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIdx((n) => (n + 1) % images.length);
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 transition-opacity duration-150 group-hover/image:opacity-100">
                {images.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to image ${i + 1}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIdx(i);
                    }}
                    className={`h-1.5 w-1.5 rounded-full ${i === idx ? "bg-white" : "bg-white/60 hover:bg-white/90"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Title row */}
        <div className="flex items-start justify-between gap-2 px-2 min-h-[28px]">
          <p className="line-clamp-2 text-lg font-semibold leading-tight">{item.title}</p>
          <StarPill count={item.stars ?? 0} />
        </div>

        {/* Type + Subtitle */}
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

        {/* Specs & badges */}
        <TinySpecs specs={item.specs} />
        <div className="mt-1 flex flex-wrap gap-1.5 px-2 min-h-[24px]">
          {item.badges?.slice(0, 2).map((b) => (
            <Badge key={b} className="px-2 py-0.5 text-[11px]">
              {b}
            </Badge>
          ))}
        </div>
      </Card>
    );
  }

  // ===== COMPANY / SUPPLIER PROFILE CARDS =====
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-2 transition-shadow hover:shadow-md">
      {Header}

      {entity?.meta?.focus && (
        <div className="mb-2 px-2">
          <InfoPill label="Focus" value={entity.meta.focus} />
        </div>
      )}

      {entity?.description && (
        <div className="mb-2 min-h-[56px] px-2 text-sm leading-6 text-muted-foreground line-clamp-3">
          {entity.description}
        </div>
      )}

      <div className="mb-2 flex flex-wrap gap-2 px-2">
        {entity?.meta?.hq && (
          <div className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 opacity-70" />
            <span className="truncate">{entity.meta.hq}</span>
          </div>
        )}
        {entity?.meta?.founded !== undefined && (
          <div className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 opacity-70" />
            <span>Founded {entity.meta.founded}</span>
          </div>
        )}
        {entity?.meta?.size && (
          <div className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 opacity-70" />
            <span>{entity.meta.size}</span>
          </div>
        )}
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2 px-2">
        <Kpi icon={Package} label="Products" value={entity?.stats?.products} />
        <Kpi icon={ScrollText} label="Standards" value={entity?.stats?.standards} />
        <Kpi icon={Users} label="Followers" value={entity?.stats?.followers} />
        <Kpi icon={Star} label="Stars" value={entity?.stats?.stars} />
      </div>

      <div className="mt-auto flex items-center gap-2 px-2 pb-1">
        {entity?.socials?.website && (
          <a
            href={entity.socials.website}
            target="_blank"
            rel="noreferrer"
            aria-label="Website"
            className="grid h-7 w-7 place-items-center rounded-md border text-muted-foreground hover:text-foreground"
          >
            <Globe className="h-4 w-4" />
          </a>
        )}
        {entity?.socials?.twitter && (
          <a
            href={entity.socials.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="grid h-7 w-7 place-items-center rounded-md border text-muted-foreground hover:text-foreground"
          >
            <Twitter className="h-4 w-4" />
          </a>
        )}
        {entity?.socials?.instagram && (
          <a
            href={entity.socials.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="grid h-7 w-7 place-items-center rounded-md border text-muted-foreground hover:text-foreground"
          >
            <Instagram className="h-4 w-4" />
          </a>
        )}
        {entity?.socials?.linkedin && (
          <a
            href={entity.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-7 w-7 place-items-center rounded-md border text-muted-foreground hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>
    </Card>
  );
}
