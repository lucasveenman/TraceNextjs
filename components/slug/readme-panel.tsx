import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReadmePanel({ owner, repo }: { owner: string; repo: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>README.md</CardTitle>
      </CardHeader>
      <CardContent className="max-w-none text-sm">
        <h2 className="mb-1 mt-0 text-base font-semibold">{repo}</h2>
        <p className="mb-4 text-muted-foreground">by {owner}</p>
        <p className="mb-4">
          Trace treats product development like code—branches for variants, PRs for improvements, and a visual
          history of models, BOMs, and processes.
        </p>
        <h3 className="mb-2 mt-6 font-semibold">Repository structure</h3>
        <ul className="list-disc pl-5">
          <li><code>/docs</code> — specifications and manuals</li>
          <li><code>/models</code> — 3D models (STL/STEP)</li>
          <li><code>/bom</code> — bill of materials</li>
          <li><code>/materials</code> — datasheets, sourcing</li>
        </ul>
        <h3 className="mb-2 mt-6 font-semibold">Quick start</h3>
        <ol className="list-decimal pl-5">
          <li>Create a variant (branch) for your prototype.</li>
          <li>Upload models and update <code>bom.yaml</code>.</li>
          <li>Open a PR to merge changes.</li>
        </ol>
      </CardContent>
    </Card>
  );
}
