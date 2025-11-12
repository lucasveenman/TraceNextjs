"use client";

import { Users, AtSign, Globe, MapPin } from "lucide-react";

export function OrgSidebar({
  org,
}: {
  org: {
    followers?: string;
    contact?: string;
    website?: string;
    location?: string;
    people: { name: string; avatar?: string; role?: string }[];
    sponsors: { name: string; avatar?: string }[];
    materials: { label: string; pct: number }[];
    tags: string[];
  };
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border">
        <div className="border-b px-4 py-3 text-sm font-semibold">Profile</div>
        <div className="space-y-2 px-4 py-3 text-sm text-muted-foreground">
          {org.followers && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {org.followers} followers
            </div>
          )}
          {org.website && (
            <a href={org.website} className="flex items-center gap-2 hover:underline">
              <Globe className="h-4 w-4" />
              {org.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          {org.contact && (
            <div className="flex items-center gap-2">
              <AtSign className="h-4 w-4" />
              {org.contact}
            </div>
          )}
          {org.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {org.location}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="border-b px-4 py-3 text-sm font-semibold">People</div>
        <div className="px-4 py-3">
          <div className="flex -space-x-2">
            {org.people.map((p) => (
              <div
                key={p.name}
                title={`${p.name}${p.role ? ` • ${p.role}` : ""}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border bg-muted text-xs font-semibold"
              >
                {initials(p.name)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="border-b px-4 py-3 text-sm font-semibold">Partners</div>
        <div className="px-4 py-3">
          <div className="flex -space-x-2">
            {org.sponsors.map((s) => (
              <div
                key={s.name}
                title={s.name}
                className="flex h-8 w-8 items-center justify-center rounded-full border bg-muted text-[10px] font-semibold"
              >
                {initials(s.name)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="border-b px-4 py-3 text-sm font-semibold">Top materials</div>
        <div className="space-y-2 px-4 py-3">
          {org.materials.map((m) => (
            <div key={m.label} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{m.label}</span>
              <span className="rounded-full border px-2 py-0.5 text-xs">{m.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border">
        <div className="border-b px-4 py-3 text-sm font-semibold">Tags</div>
        <div className="flex flex-wrap gap-2 px-4 py-3">
          {org.tags.map((t) => (
            <span key={t} className="rounded-full border px-2 py-0.5 text-xs">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((s) => s[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}
