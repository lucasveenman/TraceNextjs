// components/search/cards/entity-card.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { Card } from "@/components/ui/card";
import { Globe, Twitter, Instagram, Linkedin, MapPin, Calendar, Users, Star, ScrollText, Package } from "lucide-react";
import type { SearchEntity } from "@/lib/search/types";

function Kpi({ icon: Icon, label, value }: { icon: ComponentType<{ className?: string }>; label: string; value?: number }) {
  if (value === undefined) return null;
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-md border px-2 py-1">
      <Icon className="h-4 w-4 opacity-70" />
      <div className="min-w-0">
        <div className="text-sm font-medium leading-none tabular-nums">{value.toLocaleString()}</div>
        <div className="text-[11px] leading-none text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function slugifyName(name?: string) {
  return (name ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "").trim();
}
function profileHref(entity?: { id?: string; name?: string; type?: string }) {
  if (!entity) return "/";
  if (entity.id && entity.id.startsWith("@")) return `/${entity.id}`;
  return `/${slugifyName(entity.name)}`;
}

export function EntityCard({ item }: { item: SearchEntity }) {
  const e = item.entity;
  if (!e) return null;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-2 transition-shadow hover:shadow-md">
      <div className="mb-3 flex h-[56px] items-center justify-between rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
        <Link href={profileHref(e)} className="flex min-w-0 items-center gap-3" aria-label={`${e?.name} profile`}>
          <div className="relative h-9 w-9 overflow-hidden rounded-lg">
            {e?.logoUrl ? <Image src={e.logoUrl} alt={e?.name ?? ""} fill className="object-cover" /> : <div className="h-9 w-9 rounded-lg bg-muted" />}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium leading-none">{e?.name}</p>
            {e?.subtitle ? <p className="truncate text-xs text-muted-foreground">{e.subtitle}</p> : <div className="h-3" />}
          </div>
        </Link>
      </div>

      {e?.meta?.focus && (
        <div className="mb-2 px-2">
          <div className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
            <span className="opacity-70">Focus</span>
            <span className="font-medium text-foreground">{e.meta.focus}</span>
          </div>
        </div>
      )}

      {e?.description && (
        <div className="mb-2 min-h-[56px] px-2 text-sm leading-6 text-muted-foreground line-clamp-3">{e.description}</div>
      )}

      <div className="mb-2 flex flex-wrap gap-2 px-2">
        {e?.meta?.hq && (
          <div className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 opacity-70" />
            <span className="truncate">{e.meta.hq}</span>
          </div>
        )}
        {e?.meta?.founded !== undefined && (
          <div className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 opacity-70" />
            <span>Founded {e.meta.founded}</span>
          </div>
        )}
        {e?.meta?.size && (
          <div className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 opacity-70" />
            <span>{e.meta.size}</span>
          </div>
        )}
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2 px-2">
        <Kpi icon={Package} label="Products" value={e?.stats?.products} />
        <Kpi icon={ScrollText} label="Repos" value={e?.stats?.repos} />
        <Kpi icon={Users} label="Followers" value={e?.stats?.followers} />
        <Kpi icon={Star} label="Stars" value={e?.stats?.stars} />
      </div>

      <div className="mt-auto flex items-center gap-2 px-2 pb-1">
        {e?.socials?.website && (
          <a href={e.socials.website} target="_blank" rel="noreferrer" aria-label="Website" className="grid h-7 w-7 place-items-center rounded-md border text-muted-foreground hover:text-foreground">
            <Globe className="h-4 w-4" />
          </a>
        )}
        {e?.socials?.twitter && (
          <a href={e.socials.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="grid h-7 w-7 place-items-center rounded-md border text-muted-foreground hover:text-foreground">
            <Twitter className="h-4 w-4" />
          </a>
        )}
        {e?.socials?.instagram && (
          <a href={e.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-7 w-7 place-items-center rounded-md border text-muted-foreground hover:text-foreground">
            <Instagram className="h-4 w-4" />
          </a>
        )}
        {e?.socials?.linkedin && (
          <a href={e.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-7 w-7 place-items-center rounded-md border text-muted-foreground hover:text-foreground">
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>
    </Card>
  );
}

