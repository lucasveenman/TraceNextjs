// lib/data/project-files.ts

export type FileKind = "folder" | "doc" | "code" | "other";

export type FileNode = {
  id: string;
  name: string;
  kind: FileKind;
  parentId?: string;
  latestCommit?: string;
  updatedAt?: string; // ISO string
};

type ProjectKey = string; // `${owner}/${slug}`

const demoProjectFiles: Record<ProjectKey, FileNode[]> = {
  "apple/iphone-15": [
    { id: "iphone-15", name: "iphone-15", kind: "folder" },
    {
      id: "docs",
      name: "docs",
      kind: "folder",
      parentId: "root",
      latestCommit: "Add hardware spec",
      updatedAt: "2025-10-02T12:00:00Z",
    },
    {
      id: "models",
      name: "models",
      kind: "folder",
      parentId: "root",
      latestCommit: "STL: frame rev B",
      updatedAt: "2025-10-10T09:00:00Z",
    },
    {
      id: "bom",
      name: "bom",
      kind: "folder",
      parentId: "root",
      latestCommit: "Add LDO regulator",
      updatedAt: "2025-10-12T08:30:00Z",
    },
    {
      id: "materials",
      name: "materials",
      kind: "folder",
      parentId: "root",
      latestCommit: "Update titanium spec",
      updatedAt: "2025-10-11T17:10:00Z",
    },
    {
      id: "readme",
      name: "README.md",
      kind: "doc",
      parentId: "root",
      latestCommit: "Add intro",
      updatedAt: "2025-10-01T08:00:00Z",
    },
    {
      id: "spec",
      name: "spec.pdf",
      kind: "doc",
      parentId: "docs",
      latestCommit: "v0.3",
      updatedAt: "2025-10-02T12:00:00Z",
    },
    {
      id: "case",
      name: "enclosure.step",
      kind: "other",
      parentId: "models",
      latestCommit: "wall 2.8mm",
      updatedAt: "2025-10-10T09:00:00Z",
    },
    {
      id: "bomfile",
      name: "bom.yaml",
      kind: "code",
      parentId: "bom",
      latestCommit: "Add bearings",
      updatedAt: "2025-10-12T08:30:00Z",
    },
  ],

};

export function getProjectFiles(owner: string, slug: string): FileNode[] {
  const key: ProjectKey = `${owner.toLowerCase()}/${slug.toLowerCase()}`;
  const files = demoProjectFiles[key];
  if (!files) {
    // default skeleton for unknown projects
    return [
      { id: "root", name: "repo-root", kind: "folder" },
      {
        id: "docs",
        name: "docs",
        kind: "folder",
        parentId: "root",
        latestCommit: "Initial docs",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "models",
        name: "models",
        kind: "folder",
        parentId: "root",
        latestCommit: "Initial models",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "bom",
        name: "bom",
        kind: "folder",
        parentId: "root",
        latestCommit: "Initial BOM",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "readme",
        name: "README.md",
        kind: "doc",
        parentId: "root",
        latestCommit: "Init README",
        updatedAt: new Date().toISOString(),
      },
    ];
  }
  return files;
}
