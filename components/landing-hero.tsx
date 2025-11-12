// =====================
// components/landing-hero.tsx
// =====================
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  GitBranch,
  History,
  Factory,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ColorBends from "@/components/ColorBends";

export function LandingHero() {
  return (
    <section
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden"
      aria-label="Trace landing"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ColorBends
          rotation={-6}
          speed={0.35}
          scale={1}
          frequency={1}
          warpStrength={1}
          autoRotate={2}
          mouseInfluence={0.8}
          parallax={0.6}
          noise={0.02}
        />
        {/* readability veil */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_35%,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.72)_35%,rgba(255,255,255,0.55)_60%,rgba(255,255,255,0.15)_100%)] dark:bg-[radial-gradient(80%_60%_at_50%_35%,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.55)_35%,rgba(0,0,0,0.65)_60%,rgba(0,0,0,0.75)_100%)]" />
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        {/* Chip */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto w-fit"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-xs backdrop-blur-sm">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            Not a drive — a product repo
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
        >
          One truth from design to line.
          <span className="block bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50 bg-clip-text text-transparent">
            Models, BOMs, suppliers, and logs—versioned.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          Branch variants, link real suppliers, and release with confidence.
          Everything stays in sync and auditable.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button size="lg" className="h-11 px-6">
            Get started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="secondary" className="h-11 px-6" asChild>
            <a href="#part-example" aria-label="See demo">
              <Play className="mr-2 h-4 w-4" />
              See it in action
            </a>
          </Button>
        </motion.div>

        {/* Repo status strip — communicates: repo, release, production, suppliers, logs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mx-auto mt-8 max-w-4xl"
        >
          <div className="rounded-xl border border-foreground/10 bg-background/70 p-3 text-left backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-2 text-xs md:grid-cols-5 md:text-sm">
              <LabeledBadge
                label="Repo"
                icon={<GitBranch className="h-3.5 w-3.5" />}
                text="FUYU/FSK40-Linear-Stage"
                href="/FUYU/FSK40-Linear-Stage"
              />
              <LabeledBadge
                label="Release"
                text="v1.3.4 • main"
                href="/FUYU/FSK40-Linear-Stage/releases"
              />
              <LabeledBadge
                label="Production"
                icon={<Factory className="h-3.5 w-3.5" />}
                text="Line A • Cell 3"
                href="/FUYU/FSK40-Linear-Stage/line"
              />
              <LabeledBadge
                label="Suppliers"
                icon={<Link2 className="h-3.5 w-3.5" />}
                text="HIWIN • THK • Misumi"
                href="/FUYU/FSK40-Linear-Stage/suppliers"
              />
              <LabeledBadge
                label="Audit"
                icon={<History className="h-3.5 w-3.5" />}
                text="Immutable logs"
                href="/FUYU/FSK40-Linear-Stage/logs"
              />
            </div>
          </div>
        </motion.div>

        {/* Micro features row — links + hover */}
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4"
          aria-label="Key capabilities"
        >
          <MiniCard
            href="/features/production"
            title="Production transparency"
          />
          <MiniCard href="/features/linking" title="Company linking" />
          <MiniCard href="/features/versions" title="Versioned variants" />
          <MiniCard href="/features/logs" title="Signed change logs" />
        </motion.nav>
      </div>
    </section>
  );
}

/* Helpers */

function LabeledBadge({
  label,
  text,
  icon,
  href,
}: {
  label: string;
  text: string;
  icon?: React.ReactNode;
  href?: string;
}) {
  const Inner = (
    <div className="flex items-center gap-2 rounded-md border border-foreground/10 bg-white/60 px-2.5 py-2 text-foreground shadow-sm backdrop-blur-sm dark:bg-white/5">
      <div className="flex-1">
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
        <div className="truncate">{text}</div>
      </div>
      {icon}
    </div>
  );
  return href ? (
    <a
      href={href}
      className="transition hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
    >
      {Inner}
    </a>
  ) : (
    Inner
  );
}

function MiniCard({ title, href }: { title: string; href: string }) {
  return (
    <a
      href={href}
      className="group rounded-lg border border-foreground/10 bg-white/60 px-3 py-2 text-center text-xs text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-white/70 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-foreground/20 dark:bg-white/5 dark:hover:bg-white/10"
    >
      <span className="inline-block transition group-hover:scale-[1.02]">
        {title}
      </span>
    </a>
  );
}
