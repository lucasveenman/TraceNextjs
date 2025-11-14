// components/product-example-hero.tsx
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroImage, { PartHoverInfo } from "@/components/HeroImage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { GitBranch, Store, ExternalLink } from "lucide-react";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildRepoPath = (orgOrUser: string, productTitleOrRepoName: string) =>
  `/${slug(orgOrUser)}/${slug(productTitleOrRepoName)}/`;

const PRODUCT = {
  title: "LPS-42",
  company: "FUYU Technology Co.",
  username: "fuyutechnology",
  description:
    "Explore a full, versioned assembly. Hover components to reveal specs. Click any component to jump straight to its detail page.",
  stats: {
    Version: "v0.3.1",
    Components: 132,
    Suppliers: 9,
  },
};

const SUPPLIER_BY_PART: Record<string, string> = {
  "57HS": "Transmotec",
  "MGNR15R110CM-Rail": "LinearX",
  BALLSCREW: "MotionParts",
  MOTORPLATE: "OmniParts Cloud",
  "ISO7380-M6-1.0X25-T30": "BoltCo Distributor",
  ENDPLATE: "FUYU Direct",
  "DIN-471-1": "BoltCo Distributor",
  M3X30: "BoltCo Distributor",
  M4X10: "BoltCo Distributor",
  "M4-0.7x10-S2.5-ISO7380": "BoltCo Distributor",
  TSlotNut_HammerHead_M5: "FastenAll",
  LINEAR_CARRIAGE: "FUYU Direct",
  MOTORRAIL: "FUYU Direct",
  BALLSCREWPLATE: "FUYU Direct",
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");

// Optional: pass supplier map into the hover dock (no network work, just richer info)
export function ProductExampleHero() {
  const [hoverPart, setHoverPart] = useState<PartHoverInfo>(null);

  const repoUrl = useMemo(
    () => buildRepoPath(PRODUCT.username, PRODUCT.title),
    []
  );
  const supplyUrl = useMemo(
    () => buildRepoPath(PRODUCT.username, PRODUCT.title) + "suppliers",
    []
  );

  return (
    <section className="w-full border-t">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <HeroImage onHoverPart={setHoverPart} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
          className="flex flex-col gap-6 lg:col-span-5"
        >
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{initials(PRODUCT.company)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <CardTitle className="truncate">{PRODUCT.title}</CardTitle>
                  <CardDescription className="truncate">
                    {PRODUCT.company}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{PRODUCT.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {Object.entries(PRODUCT.stats).map(([k, v]) => (
                  <span key={k} className="rounded-md border px-2 py-1 text-xs">
                    {k} <span className="ml-1 font-medium">{String(v)}</span>
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                    <GitBranch className="mr-2 h-4 w-4" />
                    View repository
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={supplyUrl} target="_blank" rel="noopener noreferrer">
                    <Store className="mr-2 h-4 w-4" />
                    Explore suppliers
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Hover dock */}
      <div className="pointer-events-none fixed bottom-4 right-4 z-40 w-[400px] max-w-[92vw]">
        <AnimatePresence mode="popLayout" initial={false}>
          {hoverPart ? (
            <motion.div
              key="part"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-auto"
            >
              <Card className="bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 shadow-lg">
                <CardHeader className="pb-1">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px]">
                        {initials(hoverPart.company || "CO")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <CardTitle className="text-base truncate">
                        {hoverPart.title}
                      </CardTitle>
                      <CardDescription className="truncate">
                        {hoverPart.company} • {hoverPart.partNumber}
                      </CardDescription>
                      <div className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
                        <Store className="h-3.5 w-3.5" />
                        Supplier:{" "}
                        {SUPPLIER_BY_PART[hoverPart.partNumber] ?? "—"}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-1">
                  <Separator className="mb-2" />

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    {hoverPart.specs &&
                      Object.entries(hoverPart.specs)
                        .slice(0, 6)
                        .map(([k, v]) => (
                          <div key={k} className="contents">
                            <div className="text-muted-foreground">{k}</div>
                            <div className="truncate">{String(v)}</div>
                          </div>
                        ))}
                  </div>

                  <div className="mt-3">
                    <a
                      href={hoverPart.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-between rounded-md border px-2 py-1 text-xs font-mono"
                      title={hoverPart.url}
                    >
                      {hoverPart.url}
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
