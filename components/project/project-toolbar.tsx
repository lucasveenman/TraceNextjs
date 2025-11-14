// components/project/project-toolbar.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, GitBranch, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ProjectVariant } from "@/lib/data/projects";

export function ProjectToolbar({
  projectSlug,
  variants,
  baseVariantId,
  pathChain,
}: {
  projectSlug: string;
  variants: ProjectVariant[];
  baseVariantId: string;
  pathChain: string[];
}) {
  const [selectedId, setSelectedId] = useState<string>(baseVariantId);
  const selected =
    variants.find((v) => v.id === selectedId) ?? variants[0];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <GitBranch className="h-4 w-4" />
              {selected?.label}
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {variants.map((v) => (
              <DropdownMenuItem
                key={v.id}
                onClick={() => setSelectedId(v.id)}
              >
                <div className="flex flex-col">
                  <span>{v.label}</span>
                  <span className="text-[10px] uppercase text-muted-foreground">
                    {v.kind}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
          {pathChain.map((seg, i) => (
            <span key={`${seg}-${i}`} className="flex items-center gap-1">
              {seg}
              {i < pathChain.length - 1 && <span>/</span>}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="gap-2">
          <Plus className="h-4 w-4" /> Add file
        </Button>
        <Button size="sm" className="gap-2">
          Share
        </Button>
      </div>
    </div>
  );
}
