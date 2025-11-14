// app/orgs/[owner]/repositories/page.tsx
import { redirect } from "next/navigation";

export default async function LegacyOrgReposPage({
  params,
}: {
  params: Promise<{ owner: string }>;
}) {
  const { owner } = await params;
  redirect(`/${owner}/repositories`);
}
