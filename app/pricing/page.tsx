// app/pricing/page.tsx
import type { Metadata } from "next"
import Pricing from "@/components/pricing"

export const metadata: Metadata = {
  title: "Pricing | Trace",
  description:
    "Choose a plan for Trace — Git-native collaboration for physical products with 3D previews, BOM versioning, and supplier linking.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing | Trace",
    description:
      "Plans that scale from solo makers to teams: public repos, private collaboration, NFC twins, and API access.",
    url: "/pricing",
    siteName: "Trace",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Trace",
    description:
      "Plans that scale from solo makers to teams: public repos, private collaboration, NFC twins, and API access.",
  },
}

export default function Page() {
  return (
    <main className="min-h-dvh">
      <Pricing />
    </main>
  )
}
