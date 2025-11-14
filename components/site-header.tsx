// components/site-header.tsx
"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { LogIn, Github, Menu } from "lucide-react";
import GlobalSearch from "@/components/search/global-search";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type Theme = "light" | "dark";

export default function SiteHeader() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const initialTheme = useMemo<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    try {
      const saved = localStorage.getItem("trace-theme") as Theme | null;
      if (saved === "light" || saved === "dark") return saved;
    } catch {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("trace-theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handle = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? "dark" : "light");

    if ("addEventListener" in mq) mq.addEventListener("change", handle);
    else if ("addListener" in mq)
      (mq as unknown as {
        addListener: (cb: (e: MediaQueryListEvent) => void) => void;
      }).addListener(handle);

    return () => {
      if ("removeEventListener" in mq) mq.removeEventListener("change", handle);
      else if ("removeListener" in mq)
        (mq as unknown as {
          removeListener: (cb: (e: MediaQueryListEvent) => void) => void;
        }).removeListener(handle);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const handleLogout = () => {
    void signOut({ callbackUrl: "/" });
  };

  const userLabel =
    // @ts-expect-error handle added in session callback
    session?.user?.handle ||
    session?.user?.name ||
    session?.user?.email ||
    "Account";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-480 items-center justify-between gap-2 px-3 md:h-16 md:grid md:grid-cols-[1fr_minmax(600px,1.5fr)_1fr] md:gap-3 md:px-6">
        {/* Left: Mobile burger + Desktop nav */}
        <div className="flex min-w-0 items-center gap-2">
          {/* Mobile: menu (md:hidden) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="z-[60] w-[320px] sm:w-[380px]"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Site navigation</SheetTitle>
              </SheetHeader>

              <div className="mt-8 flex flex-col gap-4">
                <MobileGroup title="Why Trace">
                  <MobileNavLink
                    href="/features/versioning"
                    label="Versioned artifacts"
                    desc="Branches, releases, diffs."
                  />
                  <MobileNavLink
                    href="/features/supplier-linking"
                    label="Supplier linking"
                    desc="Parts ↔ suppliers, pricing."
                  />
                  <MobileNavLink
                    href="/features/production"
                    label="Production transparency"
                    desc="Cells, lines, approvals."
                  />
                  <MobileNavLink
                    href="/features/audit"
                    label="Signed change logs"
                    desc="Immutable, auditable history."
                  />
                </MobileGroup>

                <MobileGroup title="Explore">
                  <MobileNavLink
                    href="/explore/repos"
                    label="Product repos"
                    desc="Assemblies and releases."
                  />
                  <MobileNavLink
                    href="/explore/components"
                    label="Components"
                    desc="Parts, specs, drawings."
                  />
                  <MobileNavLink
                    href="/explore/suppliers"
                    label="Suppliers"
                    desc="Vetted sources & catalogs."
                  />
                  <MobileNavLink
                    href="/docs"
                    label="Docs"
                    desc="Guides and API."
                  />
                </MobileGroup>

                <div className="h-px w-full bg-border" />

                <div className="grid gap-2">
                  <Link
                    className="rounded px-2 py-1 text-sm hover:bg-muted"
                    href="/open-source"
                  >
                    Open Source
                  </Link>
                  <Link
                    className="rounded px-2 py-1 text-sm hover:bg-muted"
                    href="/pricing"
                  >
                    Pricing
                  </Link>
                </div>

                {/* Auth controls in mobile sheet */}
                <div className="mt-2 mx-2">
                  {status === "loading" ? (
                    <div className="text-xs text-muted-foreground">
                      Checking session...
                    </div>
                  ) : isAuthenticated ? (
                    <div className="grid gap-2">
                      <div className="text-xs text-muted-foreground">
                        Signed in as{" "}
                        <span className="font-medium">{userLabel}</span>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleLogout}
                      >
                        Log out
                      </Button>
                    </div>
                  ) : (
                    <Button asChild className="w-full">
                      <Link href="/sign-in">
                        <LogIn className="mx-1.5 h-4 w-4" />
                        Sign in
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop: nav (hidden on mobile) */}
          <div className="hidden md:block">
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
                      <NavLink
                        href="/docs"
                        label="Docs"
                        desc="Guides and API."
                      />
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
        </div>

        {/* Center search */}
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <GlobalSearch className="w-full max-w-full md:max-w-[860px]" />
        </div>

        {/* Right actions */}
        <div className="ml-2 flex shrink-0 items-center justify-end gap-2">
          {status === "loading" ? (
            <span className="hidden text-xs text-muted-foreground md:inline-block">
              Checking session...
            </span>
          ) : isAuthenticated ? (
            <>
              <span className="hidden max-w-[160px] truncate text-xs text-muted-foreground md:inline-block">
                {userLabel}
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </>
          ) : (
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href="/sign-in">
                <LogIn className="mr-1.5 h-4 w-4" />
                Sign in
              </Link>
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className={cn(
              "transition",
              theme === "dark" ? "opacity-100" : "opacity-90",
            )}
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

function MobileGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 px-1 text-xs font-medium uppercase text-muted-foreground">
        {title}
      </div>
      <div className="grid gap-1">{children}</div>
    </div>
  );
}

function MobileNavLink({
  href,
  label,
  desc,
}: {
  href: string;
  label: string;
  desc?: string;
}) {
  return (
    <Link href={href} className="block rounded-md p-2 hover:bg-muted/80">
      <div className="text-sm">{label}</div>
      {desc ? (
        <div className="text-xs text-muted-foreground">{desc}</div>
      ) : null}
    </Link>
  );
}
