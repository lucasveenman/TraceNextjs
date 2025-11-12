// components/site-header.tsx
"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Github } from "lucide-react";
import GlobalSearch from "@/components/search/global-search";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export default function SiteHeader() {
  // 1) Compute initial theme without an effect.
  //    On the server (no window), fall back to "dark" so SSR is stable.
  const initialTheme = useMemo<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    try {
      const saved = localStorage.getItem("trace-theme") as Theme | null;
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      // ignore storage access issues
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  const [theme, setTheme] = useState<Theme>(initialTheme);

  // 2) Mounted flag: avoid rendering theme-dependent classes on the server
  //    to prevent hydration mismatches.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // 3) Apply/remove the .dark class on the <html> element and persist.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("trace-theme", theme);
    } catch {
      // ignore storage issues
    }
  }, [theme]);

  // 4) Subscribe to OS theme changes (external source → setState in callback is OK).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handle = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light");
    // modern API
    mq.addEventListener?.("change", handle);
    // fallback
    // @ts-expect-error older Safari
    mq.addListener?.(handle);

    return () => {
      mq.removeEventListener?.("change", handle);
      // @ts-expect-error older Safari
      mq.removeListener?.(handle);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto grid h-14 w-full max-w-480 grid-cols-[1fr_minmax(600px,1.5fr)_1fr] items-center gap-3 px-3 md:h-16 md:px-6">
        {/* Left nav */}
        <div className="flex min-w-0 items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">
                  Why Trace
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-3">
                  <div className="grid min-w-[280px] gap-1 text-sm">
                    <NavLink
                      href="/features/versioning"
                      label="Versioned artifacts"
                      desc="Branches, releases, diffs."
                    />
                    <NavLink
                      href="/features/supplier-linking"
                      label="Supplier linking"
                      desc="Parts ↔ suppliers, pricing."
                    />
                    <NavLink
                      href="/features/production"
                      label="Production transparency"
                      desc="Cells, lines, approvals."
                    />
                    <NavLink
                      href="/features/audit"
                      label="Signed change logs"
                      desc="Immutable, auditable history."
                    />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">
                  Explore
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-3">
                  <div className="grid min-w-[280px] gap-1 text-sm">
                    <NavLink
                      href="/explore/repos"
                      label="Product repos"
                      desc="Assemblies and releases."
                    />
                    <NavLink
                      href="/explore/components"
                      label="Components"
                      desc="Parts, specs, drawings."
                    />
                    <NavLink
                      href="/explore/suppliers"
                      label="Suppliers"
                      desc="Vetted sources & catalogs."
                    />
                    <NavLink href="/docs" label="Docs" desc="Guides and API." />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/open-source"
                  className="rounded px-2 py-1 text-sm hover:bg-muted"
                >
                  Open Source
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/pricing"
                  className="rounded px-2 py-1 text-sm hover:bg-muted"
                >
                  Pricing
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Center search – slightly narrower */}
        <div className="flex min-w-0 items-center justify-center">
          <GlobalSearch className="w-full max-w-[860px]" />
        </div>

        {/* Right actions + theme toggle */}
        <div className="flex items-center justify-end gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/signin">
              <LogIn className="mr-1.5 h-4 w-4" />
              Sign in
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">
              <UserPlus className="mr-1.5 h-4 w-4" />
              Sign up
            </Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            // Hydration-safe: don't depend on `theme` until mounted.
            className={cn("transition", mounted && theme === "dark" ? "opacity-100" : "opacity-90")}
          >
            <Github className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  label,
  desc,
}: {
  href: string;
  label: string;
  desc: string;
}) {
  return (
    <Link href={href} className="rounded-md p-2 hover:bg-muted/80">
      <div className="text-foreground">{label}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </Link>
  );
}
