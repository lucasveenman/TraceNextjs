// components/marketing/integrations-section.tsx
"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronRight,
  GitBranch,
  Gitlab,
  Boxes,
  Box,
  CircuitBoard,
  Cpu,
  Plug,
  Slack,
  MessageSquare,
  User,
} from "lucide-react";

type Integration = {
  key: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

type IntegrationGroup = {
  defaultKey: string; // which card shows first
  members: Integration[]; // first is the primary shown in the grid
};

const iconWrap = (node: React.ReactNode) => (
  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted/60">{node}</div>
);

// --- Groups (defaults first), realistic pairings ---
const GROUPS: IntegrationGroup[] = [
  {
    defaultKey: "github",
    members: [
      {
        key: "github",
        title: "GitHub",
        description: "Sync firmware/app repos with part releases and signed change logs.",
        href: "/integrations/github",
        icon: iconWrap(<GitBranch className="h-5 w-5" />),
      },
      {
        key: "gitlab",
        title: "GitLab",
        description: "Self-hosted or SaaS CI/CD with release webhooks into Trace.",
        href: "/integrations/gitlab",
        icon: iconWrap(<Gitlab className="h-5 w-5" />),
      },
      {
        key: "bitbucket",
        title: "Bitbucket",
        description: "Bitbucket Pipelines to publish builds and artifacts to Trace.",
        href: "/integrations/bitbucket",
        icon: iconWrap(<Box className="h-5 w-5" />), // placeholder
      },
    ],
  },
  {
    defaultKey: "solidworks",
    members: [
      {
        key: "solidworks",
        title: "SOLIDWORKS",
        description: "Push assemblies/BOMs, generate previews, and open PLM tasks from CAD.",
        href: "/integrations/solidworks",
        icon: iconWrap(<Boxes className="h-5 w-5" />),
      },
      {
        key: "onshape",
        title: "Onshape",
        description: "Cloud CAD sync: versions → releases, parts → component repos.",
        href: "/integrations/onshape",
        icon: iconWrap(<Box className="h-5 w-5" />),
      },
      {
        key: "fusion",
        title: "Fusion 360",
        description: "Add-in + Platform Services: export BOM, previews, and versions to Trace.",
        href: "/integrations/fusion-360",
        icon: iconWrap(<Boxes className="h-5 w-5" />),
      },
    ],
  },
  {
    defaultKey: "slack",
    members: [
      {
        key: "slack",
        title: "Slack",
        description: "Notify channels on approvals, supplier changes, and failed checks.",
        href: "/integrations/slack",
        icon: iconWrap(<Slack className="h-5 w-5" />),
      },
      {
        key: "teams",
        title: "Microsoft Teams",
        description: "Adaptive cards for approvals and status updates from Trace.",
        href: "/integrations/teams",
        icon: iconWrap(<MessageSquare className="h-5 w-5" />), // placeholder
      },
      {
        key: "discord",
        title: "Discord",
        description: "Webhook alerts for builds, QC, and release events.",
        href: "/integrations/discord",
        icon: iconWrap(<User className="h-5 w-5" />),
      },
    ],
  },
  {
    defaultKey: "octopart",
    members: [
      {
        key: "octopart",
        title: "Octopart",
        description: "Live sourcing, alternates, and availability baked into your BOMs.",
        href: "/integrations/octopart",
        icon: iconWrap(<CircuitBoard className="h-5 w-5" />),
      },
      {
        key: "mouser",
        title: "Mouser",
        description: "Pricing and stock sync to parts and approved alternates.",
        href: "/integrations/mouser",
        icon: iconWrap(<Cpu className="h-5 w-5" />), // placeholder
      },
      {
        key: "digikey",
        title: "Digi-Key",
        description: "Part metadata, lifecycle state, and order links from Trace.",
        href: "/integrations/digikey",
        icon: iconWrap(<Plug className="h-5 w-5" />), // placeholder
      },
    ],
  },
  {
    defaultKey: "onshape",
    members: [
      {
        key: "onshape2",
        title: "Onshape",
        description: "Cloud CAD: versions, drawings, and assemblies to Trace repos.",
        href: "/integrations/onshape",
        icon: iconWrap(<Box className="h-5 w-5" />),
      },
      {
        key: "freecad",
        title: "FreeCAD",
        description: "Scripted exports and BOMs via Python to Trace.",
        href: "/integrations/freecad",
        icon: iconWrap(<Boxes className="h-5 w-5" />), // placeholder
      },
      {
        key: "altium",
        title: "Altium",
        description: "Publish PCB BoMs, PDFs, and builds as signed releases.",
        href: "/integrations/altium",
        icon: iconWrap(<Cpu className="h-5 w-5" />), // placeholder
      },
    ],
  },
];

export default function IntegrationsSection() {
  return (
    <section>
      <div className="mx-6 border-l border-r md:mx-20 lg:mx-40">
        <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">Integrate with your favorite tools</h2>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              Connect design, firmware, sourcing, and comms so you only need to focus on product development.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GROUPS.slice(0, 5).map((group) => (
              <SwapCard key={group.defaultKey} group={group} />
            ))}

            <ViewAllCard href="/integrations" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SwapCard({ group }: { group: IntegrationGroup }) {
  const defaultIdx = Math.max(0, group.members.findIndex((m) => m.key === group.defaultKey));
  const [active, setActive] = React.useState<number>(defaultIdx);

  const current = group.members[active];
  const alternates = group.members.map((m, i) => ({ m, i })).filter(({ i }) => i !== active);

  return (
    <Card className="group relative overflow-hidden p-6 transition hover:shadow-md">
      {/* Icon row: current icon + alternates right next to it */}
      <div className="flex items-center gap-2">
        {/* Current icon (fixed size) */}
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted/60">
          {/* keep your 10x10 wrapper semantics */}
          <div className="*:h-5 *:w-5">{current.icon}</div>
        </div>

        {/* Alternates block; same size tiles that fade in on hover */}
        <div className="flex items-center gap-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          {alternates.map(({ m, i }) => (
            <button
              key={m.key}
              type="button"
              title={m.title}
              aria-label={`Show ${m.title}`}
              aria-pressed={active === i}
              onClick={(e) => {
                e.preventDefault();
                setActive(i);
              }}
              className="
                inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md
                bg-muted/60 ring-1 ring-transparent transition
                hover:bg-muted hover:ring-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20
              "
            >
              <div className="*:h-5 *:w-5">{m.icon}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Body driven by 'active' */}
      <div className="space-y-2 py-6">
        <h3 className="text-base font-medium">{current.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{current.description}</p>
      </div>

      <div className="flex gap-3 border-t border-dashed pt-6">
        <Button asChild variant="secondary" size="sm" className="gap-1 pr-2 shadow-none">
          <Link href={current.href}>
            Learn more
            <ChevronRight className="ml-0 !h-3.5 !w-3.5 opacity-60 transition group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>

      <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-transparent transition group-hover:ring-foreground/10" />
    </Card>
  );
}


function ViewAllCard({ href }: { href: string }) {
  return (
    <Card className="group relative flex flex-col items-center justify-center gap-4 p-10 text-center transition hover:shadow-md">
      <Link href={href} className="absolute inset-0" />
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted/60">
        <ChevronRight className="h-6 w-6 text-muted-foreground transition group-hover:translate-x-0.5" />
      </div>
      <h3 className="text-base font-medium">View all integrations</h3>
      <p className="text-sm text-muted-foreground">Browse available and upcoming connectors.</p>
      <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-transparent transition group-hover:ring-foreground/10" />
    </Card>
  );
}
