// components/search/search-filters.tsx
"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RefreshCcw, Info } from "lucide-react";
import clsx from "clsx";

export function SearchFilters({
  role,
  sort,
  onChange,
}: {
  role: string;
  sort: string;
  onChange: (patch: Record<string, string | number | undefined>) => void;
}) {
  const [localRole, setLocalRole] = React.useState(role);
  const [localSort, setLocalSort] = React.useState(sort);
  const [hoveredRole, setHoveredRole] = React.useState<string | null>(null);

  React.useEffect(() => setLocalRole(role), [role]);
  React.useEffect(() => setLocalSort(sort), [sort]);

  const isDirty = localRole !== role || localSort !== sort;

  function apply() {
    onChange({ role: localRole || undefined, sort: localSort || undefined });
  }

  function clear() {
    setLocalRole("");
    setLocalSort("relevance");
    onChange({ role: undefined, sort: "relevance" });
  }

  const roles = ["", "manufacturer", "distributor", "retailer"] as const;

  const roleDescriptions: Record<string, string> = {
    "": "Show results from any supplier type.",
    manufacturer:
      "Creates goods directly. Best for custom orders, MOQs, and raw production.",
    distributor:
      "Buys from manufacturers and resells in bulk. Good for scale and logistics.",
    retailer:
      "Sells to end-customers. Helpful for market references and smaller quantities.",
  };

  // Determine the longest description to reserve height and prevent layout shift
  const longestKey = React.useMemo(() => {
    return Object.entries(roleDescriptions).reduce((acc, [k, v]) => {
      return v.length > (roleDescriptions[acc]?.length ?? 0) ? k : acc;
    }, "" as string);
  }, []);

  const activeKey = hoveredRole ?? (localRole || "");

  return (
    <TooltipProvider delayDuration={150}>
      <div
        className={clsx(
          "rounded-xl border bg-card/60 p-4",
          "transition-shadow hover:shadow-sm",
          "backdrop-blur supports-[backdrop-filter]:bg-card/70"
        )}
        role="region"
        aria-label="Search filters"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-tight">Filters</h3>
          <Button variant="ghost" size="sm" onClick={clear} className="gap-1">
            <RefreshCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        <Separator className="my-4" />

        {/* Sort */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="text-xs text-muted-foreground">Sort by</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center text-muted-foreground/70 transition-opacity hover:opacity-100 focus:outline-none"
                  aria-label="About sorting"
                >
                  <Info className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                Choose how results are ordered in the list.
              </TooltipContent>
            </Tooltip>
          </div>

          <Select value={localSort} onValueChange={setLocalSort}>
            <SelectTrigger className="transition-shadow hover:shadow-[inset_0_0_0_1px_var(--border)] focus:shadow-[inset_0_0_0_2px_hsl(var(--primary))]">
              <SelectValue placeholder="Select order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="recent">Most recent</SelectItem>
              <SelectItem value="a-z">A → Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-4" />

        {/* Supplier role */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="text-xs text-muted-foreground">
              Supplier role
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center text-muted-foreground/70 transition-opacity hover:opacity-100 focus:outline-none"
                  aria-label="About supplier roles"
                >
                  <Info className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                Filter results by the supplier’s position in the chain.
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="space-y-1.5">
            {roles.map((r) => {
              const label = r ? r[0].toUpperCase() + r.slice(1) : "Any";
              const isChecked = (localRole || "") === r;
              const isHovered = hoveredRole === r;

              return (
                <label
                  key={r || "any"}
                  className={clsx(
                    "group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors cursor-pointer",
                    isChecked
                      ? "bg-primary/10 ring-1 ring-primary/30"
                      : "hover:bg-muted/60"
                  )}
                  // Use pointer + keyboard focus to set preview; clears correctly on leave/blur
                  onPointerEnter={() => setHoveredRole(r)}
                  onPointerLeave={() =>
                    setHoveredRole((prev) => (prev === r ? null : prev))
                  }
                  onFocus={() => setHoveredRole(r)}
                  onBlur={() =>
                    setHoveredRole((prev) => (prev === r ? null : prev))
                  }
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => setLocalRole(r)}
                    className={clsx(
                      "transition-transform duration-150",
                      (isHovered || isChecked) && "scale-[1.06]"
                    )}
                    aria-label={label}
                    aria-describedby="role-helper-text"
                  />

                  <span
                    className={clsx("select-none", isChecked && "font-medium")}
                  >
                    {label}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Helper text (no layout shift) */}
          <div
            className="relative"
            aria-live="polite"
            aria-atomic="true"
            id="role-helper-text"
          >
            {/* Invisible paragraph reserves the max needed height */}
            <p className="invisible text-xs">
              {roleDescriptions[longestKey]}
            </p>

            {/* Absolutely positioned live text fades without affecting layout */}
            <p className="pointer-events-none absolute inset-0 text-xs text-muted-foreground transition-opacity duration-150">
              {roleDescriptions[activeKey]}
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Availability (stubs) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="text-xs text-muted-foreground">
              Availability
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center text-muted-foreground/70 transition-opacity hover:opacity-100 focus:outline-none"
                  aria-label="About availability filters"
                >
                  <Info className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                Coming soon. These filters will refine stock and verification.
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted/40">
              <Checkbox disabled /> In stock (stub)
            </label>
            <label className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted/40">
              <Checkbox disabled /> Verified supplier (stub)
            </label>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex gap-2">
          <Button
            className="w-full"
            onClick={apply}
            disabled={!isDirty}
            title={isDirty ? "Apply filters" : "No changes to apply"}
          >
            Apply
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}
