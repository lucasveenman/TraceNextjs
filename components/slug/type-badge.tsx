// components/repo/type-badge.tsx
"use client";


export function TypeBadge({ t }: { t: "project" | "product" | "material" | "standard" | "process" }) {
const label = t[0].toUpperCase() + t.slice(1);
return (
<span className="rounded-full border px-2 py-0.5 text-[10px] leading-none capitalize">{label}</span>
);
}