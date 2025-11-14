//components/project/project-toolbar.tsx
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

export function ProjectToolbar({ branchName, pathChain }: { branchName: string; pathChain: string[] }) {
  const [branch, setBranch] = useState(branchName);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <GitBranch className="h-4 w-4" /> {branch}
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {["iphone-15", "iphone-15-pro", "iphone-15-pro-max", "prototype-15231", "prototype-15232" ].map((b) => (
              <DropdownMenuItem key={b} onClick={() => setBranch(b)}>
                {b}
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
        <Button size="sm" className="gap-2">Share</Button>
      </div>
    </div>
  );
}
