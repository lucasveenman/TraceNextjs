// components/search/search-shell.tsx
"use client";
import * as React from "react";
import { Search } from "lucide-react";
import { useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchFilters } from "@/components/search/search-filters";
import { ResultCard } from "@/components/search/result-card";
import {
  type Scope,
  type SearchEntity,
  SCOPES_FOR_UI,
} from "@/lib/search/types";
import { searchLocal, countByScope } from "@/lib/search/query";

export function SearchShell({
  initialQuery,
  initialScope,
}: {
  initialQuery: string;
  initialScope: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const qParam = params.get("q") ?? initialQuery;
  const scopeParam = (params.get("scope") ?? initialScope) as Scope | "all";
  const roleParam = params.get("role") ?? "";
  const sortParam = (params.get("sort") ?? "relevance") as
    | "relevance"
    | "recent"
    | "a-z";
  const pageParam = Math.max(1, parseInt(params.get("page") ?? "1", 10));

  const scoped = useMemo(
    () =>
      searchLocal({
        q: qParam,
        scope: scopeParam,
        role: roleParam,
        sort: sortParam,
        page: pageParam,
        pageSize: 24,
      }),
    [qParam, scopeParam, roleParam, sortParam, pageParam]
  );

  const allForCounts = useMemo(
    () =>
      searchLocal({
        q: qParam,
        scope: "all",
        role: roleParam,
        sort: "relevance",
        page: 1,
        pageSize: 9999,
      }),
    [qParam, roleParam]
  );

  const counts = useMemo(
    () => countByScope(allForCounts.allHits),
    [allForCounts.allHits]
  );

  function updateParam(next: Record<string, string | number | undefined>) {
    const usp = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([k, v]) => {
      if (v === undefined || v === "") usp.delete(k);
      else usp.set(k, String(v));
    });
    startTransition(() => router.push(`/search?${usp.toString()}`));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <Tabs
        value={scopeParam}
        onValueChange={(v) => updateParam({ scope: v, page: 1 })}
        className="mt-2"
      >
        <TabsList className="w-full overflow-x-auto">
          <TabsTrigger value="all" className="gap-2">
            <span className="inline-flex items-center gap-1">
              <Search className="h-3.5 w-3.5" />
              All
            </span>
            <Badge variant="secondary" className="ml-1">
              {counts.all ?? 0}
            </Badge>
          </TabsTrigger>

          {SCOPES_FOR_UI.map((s) => (
            <TabsTrigger key={s.key} value={s.key} className="gap-2">
              <span className="inline-flex items-center gap-1">
                <s.icon className="h-3.5 w-3.5" />
                {s.label}
              </span>
              <Badge variant="secondary" className="ml-1">
                {counts[s.key] ?? 0}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-auto">
          <SearchFilters
            role={roleParam}
            sort={sortParam}
            onChange={(patch) => updateParam({ ...patch, page: 1 })}
          />
        </aside>

        <section>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{scoped.hits.length}</span>{" "}
              of {scoped.total} results for{" "}
              <span className="font-medium">“{qParam}”</span>
            </p>
            {isPending && (
              <span className="text-xs text-muted-foreground">Updating…</span>
            )}
          </div>

          {scoped.hits.length === 0 ? (
            <div className="mt-10 rounded-md border p-8 text-center text-sm text-muted-foreground">
              No results. Try another query or clear filters.
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
              {scoped.hits.map((item: SearchEntity) => (
                <ResultCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {scoped.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  updateParam({ page: Math.max(1, pageParam - 1) })
                }
                disabled={pageParam <= 1}
              >
                Prev
              </Button>
              <span className="text-sm">
                Page {pageParam} / {scoped.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  updateParam({
                    page: Math.min(scoped.totalPages, pageParam + 1),
                  })
                }
                disabled={pageParam >= scoped.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
