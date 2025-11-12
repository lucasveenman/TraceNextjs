// app/search/page.tsx
import { Suspense } from "react";
import { SearchShell } from "@/components/search/search-shell";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const q = (sp?.q as string) || "";
  const scope = (sp?.scope as string) || "all";

  if (!q) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-14">
        <h1 className="text-2xl font-semibold tracking-tight">Search</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use the global search (press <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px]">/</kbd>) and hit Enter to see results here.
        </p>
      </div>
    );
  }

  return (
    <Suspense>
      <SearchShell initialQuery={q} initialScope={scope} />
    </Suspense>
  );
}
