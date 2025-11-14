// components/search/global-search.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Search as SearchIcon,
  Box,
  ScrollText,
  Layers,
  Puzzle,
  Building2,
  Orbit,
  FolderGit2,
} from "lucide-react";
import { cn } from "@/lib/utils";

import type { Scope } from "@/lib/search/types";
import { MOCK_DATA } from "@/lib/search/mockData";

/* ---------------------------- Scope definitions --------------------------- */

const SCOPE_META: Record<Scope | "all", { label: string; icon: React.ReactNode }> = {
  all: { label: "All", icon: <SearchIcon className="h-3.5 w-3.5" /> },
  standards: { label: "Standards", icon: <ScrollText className="h-3.5 w-3.5" /> },
  materials: { label: "Materials", icon: <Layers className="h-3.5 w-3.5" /> },
  components: { label: "Components", icon: <Puzzle className="h-3.5 w-3.5" /> },
  products: { label: "Products", icon: <Box className="h-3.5 w-3.5" /> },
  projects: { label: "Projects", icon: <FolderGit2 className="h-3.5 w-3.5" /> },
  processes: { label: "Processes", icon: <Orbit className="h-3.5 w-3.5" /> },
  entities: { label: "Entities", icon: <Building2 className="h-3.5 w-3.5" /> },
};

/* ----------------------------- Suggestion model ---------------------------- */

type Suggestion = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  scope: Exclude<Scope, "all">;
};

// Build suggestions from MOCK_DATA, mapping products with role=component
// into the "components" scope for the command palette grouping.
const SUGGESTIONS: Suggestion[] = MOCK_DATA.map((item) => {
  const entityName = item.entity?.name?.trim();
  const itemSub = (item.subtitle || "").trim();

  const subtitle =
    entityName && itemSub
      ? `${entityName} • ${itemSub}`
      : entityName || (itemSub || undefined);

  const scope =
    (item.scope === "products" && item.rawItem?.role === "component"
      ? "components"
      : item.scope) as Exclude<Scope, "all">;

  return {
    id: item.id,
    title: item.title,
    subtitle,
    href: item.href,
    scope,
  };
});

/* ---------------------------- Simple ranker (fzy) ---------------------------- */

const norm = (s: string) => s.toLowerCase().normalize("NFKD");

function scoreSuggestion(q: string, s: Suggestion): number {
  if (!q) return 0;
  const t = norm(s.title);
  const sub = norm(s.subtitle || "");
  const n = norm(q);

  if (t === n) return 100;
  if (t.startsWith(n)) return 85;
  if (t.includes(n)) return 70;
  if (sub.startsWith(n)) return 55;
  if (sub.includes(n)) return 40;

  const tokens = n.split(/\s+/).filter(Boolean);
  let hits = 0;
  for (const tk of tokens) {
    if (t.includes(tk) || sub.includes(tk)) hits += 1;
  }
  return hits > 0 ? 30 + hits * 5 : 0;
}

/* -------------------------------- Component -------------------------------- */

export default function GlobalSearch({
  defaultQuery = "",
  className,
}: {
  defaultQuery?: string;
  className?: string;
}) {
  const router = useRouter();
  const [openScope, setOpenScope] = React.useState(false);
  const [openList, setOpenList] = React.useState(false);
  const [scope, setScope] = React.useState<Scope | "all">("all");
  const [value, setValue] = React.useState(defaultQuery);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  function go(href: string) {
    router.push(href);
    setOpenList(false);
  }

  function submit(q?: string, s?: Scope | "all") {
    const raw = q ?? value;
    if (!raw.trim()) return;
    const query = encodeURIComponent(raw);
    const sc = encodeURIComponent((s ?? scope) as string);
    router.push(`/search?q=${query}&scope=${sc}`);
    setOpenList(false);
  }

  // Global "/" to focus input (unless typing in an editable element)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditable =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          (target as HTMLElement).isContentEditable === true);

      if (!isEditable && e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
        if (value.trim()) setOpenList(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [value]);

  // Compute matches (none when query is empty)
  const matches = React.useMemo(() => {
    const q = value.trim();

    const emptyGroups: Record<Exclude<Scope, "all">, Suggestion[]> = {
      standards: [],
      materials: [],
      components: [],
      products: [],
      projects: [],
      processes: [],
      entities: [],
    };

    if (!q) return emptyGroups;

    const filtered =
      scope === "all"
        ? SUGGESTIONS
        : SUGGESTIONS.filter((s) => s.scope === scope);

    const withScores = filtered
      .map((s) => ({ s, score: scoreSuggestion(q, s) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ s }) => s);

    const groups: Record<Exclude<Scope, "all">, Suggestion[]> = {
      standards: [],
      materials: [],
      components: [],
      products: [],
      projects: [],
      processes: [],
      entities: [],
    };

    for (const item of withScores) groups[item.scope].push(item);
    return groups;
  }, [scope, value]);

  // Open the list when typing/focusing, close on blur if empty
  const onFocus = () => {
    if (value.trim()) setOpenList(true);
  };
  const onBlurContainer = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOpenList(false);
    }
  };

  const renderGroup = (
    label: string,
    items: Suggestion[],
    icon: React.ReactNode
  ) => {
    if (items.length === 0) return null;
    return (
      <>
        <CommandGroup
          heading={
            <div className="flex items-center gap-2">
              {icon}
              <span>{label}</span>
            </div>
          }
        >
          {items.map((it) => (
            <CommandItem
              key={it.id}
              value={`${it.title} ${it.subtitle ?? ""}`}
              onSelect={() => go(it.href)}
              className="flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="truncate">{it.title}</div>
                {it.subtitle ? (
                  <div className="truncate text-xs text-muted-foreground">
                    {it.subtitle}
                  </div>
                ) : null}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
      </>
    );
  };

  const hasQuery = value.trim().length > 0;

  return (
    <div
      className={cn("flex w-full items-center", className)}
      onBlur={onBlurContainer}
    >
      {/* Scope dropdown */}
      <Popover open={openScope} onOpenChange={setOpenScope}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-10 shrink-0 gap-2 rounded-r-none border-r-0 pl-2 pr-3"
            aria-label="Change search scope"
          >
            {SCOPE_META[scope].icon}
            <span className="text-sm">{SCOPE_META[scope].label}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="start">
          <Command>
            <CommandInput placeholder="Filter scope..." />
            <CommandList>
              <CommandEmpty>No scope found.</CommandEmpty>
              <CommandGroup>
                {(Object.keys(SCOPE_META) as Array<Scope | "all">).map((k) => (
                  <CommandItem
                    key={k}
                    onSelect={() => {
                      setScope(k as Scope | "all");
                      setOpenScope(false);
                      inputRef.current?.focus();
                      if (value.trim()) setOpenList(true);
                    }}
                    className="gap-2"
                  >
                    {SCOPE_META[k].icon}
                    {SCOPE_META[k].label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Input + Suggestions */}
      <div className="relative flex w-full items-center">
        <SearchIcon className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            setValue(v);
            setOpenList(Boolean(v.trim()));
          }}
          onFocus={onFocus}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
            if (e.key === "Escape") setOpenList(false);
          }}
          aria-label="Search Trace"
          placeholder="Search standards, materials, components, products, projects, processes, and entities..."
          className="h-10 w-full rounded-l-none rounded-r-md border bg-background pl-9 pr-20 text-sm outline-none ring-0 focus-visible:border-foreground/30"
        />
        <div className="pointer-events-none absolute right-3 hidden items-center md:flex">
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground shadow-sm">
            /
          </kbd>
        </div>

        {/* Floating results panel */}
        {openList && hasQuery && (
          <div className="absolute left-0 right-0 top-11 z-50 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
            <Command shouldFilter={false}>
              <CommandList className="overflow-hidden">
                {hasQuery &&
                Object.values(matches).every((arr) => arr.length === 0) ? (
                  <CommandEmpty>No matches.</CommandEmpty>
                ) : null}

                {renderGroup("Standards", matches.standards, SCOPE_META.standards.icon)}
                {renderGroup("Materials", matches.materials, SCOPE_META.materials.icon)}
                {renderGroup("Components", matches.components, SCOPE_META.components.icon)}
                {renderGroup("Products", matches.products, SCOPE_META.products.icon)}
                {renderGroup("Projects", matches.projects, SCOPE_META.projects.icon)}
                {renderGroup("Processes", matches.processes, SCOPE_META.processes.icon)}
                {renderGroup("Entities", matches.entities, SCOPE_META.entities.icon)}
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </div>
  );
}
