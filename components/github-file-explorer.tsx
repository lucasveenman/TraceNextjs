//github-file-explorer.tsx
"use client";

import { useMemo, useState } from "react";
import { ChevronRight, FolderIcon, FileText, FileCode2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type FileKind = "folder" | "doc" | "code" | "other";

export type FileNode = {
  id: string;
  name: string;
  kind: FileKind;
  parentId?: string;
  latestCommit?: string;
  updatedAt?: string; // ISO string
};

const MOCK_FILES: FileNode[] = [
  { id: "root", name: "repo-root", kind: "folder" },
  { id: "docs", name: "docs", kind: "folder", parentId: "root", latestCommit: "Add spec", updatedAt: "2025-10-02T12:00:00Z" },
  { id: "models", name: "models", kind: "folder", parentId: "root", latestCommit: "STL: rev B", updatedAt: "2025-10-10T09:00:00Z" },
  { id: "bom", name: "bom", kind: "folder", parentId: "root", latestCommit: "Add LDO", updatedAt: "2025-10-12T08:30:00Z" },
  { id: "materials", name: "materials", kind: "folder", parentId: "root", latestCommit: "Al 6061", updatedAt: "2025-10-11T17:10:00Z" },
  { id: "readme", name: "README.md", kind: "doc", parentId: "root", latestCommit: "Intro", updatedAt: "2025-10-01T08:00:00Z" },
  { id: "spec", name: "spec.pdf", kind: "doc", parentId: "docs", latestCommit: "v0.3", updatedAt: "2025-10-02T12:00:00Z" },
  { id: "case", name: "enclosure.stl", kind: "other", parentId: "models", latestCommit: "wall 2.8mm", updatedAt: "2025-10-10T09:00:00Z" },
  { id: "bomfile", name: "bom.yaml", kind: "code", parentId: "bom", latestCommit: "add bearings", updatedAt: "2025-10-12T08:30:00Z" },
];

function formatTimeAgo(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function getIcon(kind: FileKind) {
  switch (kind) {
    case "folder":
      return <FolderIcon className="h-4 w-4" />;
    case "code":
      return <FileCode2 className="h-4 w-4" />;
    case "doc":
      return <FileText className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
}

export function GitHubFileExplorer() {
  const [currentFolderId, setCurrentFolderId] = useState<string>("root");

  const filesByParent = useMemo(() => {
    const map = new Map<string, FileNode[]>();
    for (const f of MOCK_FILES) {
      const parent = f.parentId ?? "root";
      if (!map.has(parent)) map.set(parent, []);
      map.get(parent)!.push(f);
    }
    return map;
  }, []);

  const byId = useMemo(() => {
    const m = new Map<string, FileNode>();
    for (const f of MOCK_FILES) m.set(f.id, f);
    return m;
  }, []);

  const breadcrumb = useMemo(() => {
    const chain: FileNode[] = [];
    let cursor = byId.get(currentFolderId);
    while (cursor) {
      chain.unshift(cursor);
      if (!cursor.parentId) break;
      cursor = byId.get(cursor.parentId);
    }
    if (chain[0]?.id !== "root") {
      const root = byId.get("root");
      if (root) chain.unshift(root);
    }
    return chain;
  }, [byId, currentFolderId]);

  const children = filesByParent.get(currentFolderId) ?? [];

  return (
    <div className="rounded-xl border">
      {/* Toolbar (GitHub-ish) */}
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Path</span>
          <nav className="flex flex-wrap items-center gap-1 text-sm">
            {breadcrumb.map((node, idx) => (
              <div key={node.id} className="flex items-center gap-1">
                <button
                  className={`rounded px-1.5 py-0.5 hover:bg-muted ${idx === breadcrumb.length - 1 ? "font-medium" : ""}`}
                  onClick={() => setCurrentFolderId(node.id)}
                >
                  {node.name}
                </button>
                {idx < breadcrumb.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" disabled>
            Add file
          </Button>
          <Button size="sm" disabled>
            Add folder
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
              <th className="sticky top-0 border-b px-4 py-2 font-medium">Name</th>
              <th className="sticky top-0 border-b px-4 py-2 font-medium">Latest commit</th>
              <th className="sticky top-0 border-b px-4 py-2 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {children
              .slice()
              .sort((a, b) => {
                // folders first, then alpha
                if (a.kind === "folder" && b.kind !== "folder") return -1;
                if (b.kind === "folder" && a.kind !== "folder") return 1;
                return a.name.localeCompare(b.name);
              })
              .map((f) => (
                <tr
                  key={f.id}
                  className="border-b hover:bg-muted/40"
                  onDoubleClick={() => {
                    if (f.kind === "folder") setCurrentFolderId(f.id);
                  }}
                >
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      {getIcon(f.kind)}
                      <button
                        className="font-medium hover:underline"
                        onClick={() => {
                          if (f.kind === "folder") setCurrentFolderId(f.id);
                        }}
                      >
                        {f.name}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-muted-foreground">
                    {f.latestCommit ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-sm text-muted-foreground">
                    {formatTimeAgo(f.updatedAt)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {children.length === 0 && (
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">
          This folder is empty.
        </div>
      )}
    </div>
  );
}
