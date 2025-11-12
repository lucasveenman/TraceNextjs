// app/page.tsx
import { PartExampleHero } from "@/components/part-example-hero";
import { GitHubFileExplorer } from "@/components/github-file-explorer";
import { TemplateCards } from "@/components/template-cards";
import { QuoteStrip } from "@/components/quote-strip";
import { LandingHero } from "@/components/landing-hero";
import { ProductExampleHero } from "@/components/product-example-hero";
import IntegrationsSection from "@/components/integrations-1";

export default function HomePage() {
  return (
    <div className="w-full">
      <LandingHero />

      {/* Your existing “part example” hero, now below the fold */}
      <div id="part-example">
        <PartExampleHero />
      </div>

      {/* Big front-page product example that uses the HeroImage scene */}
      <div id="product-example">
        <ProductExampleHero />
      </div>

      {/* Intergrations, connect apps */}
      <section className="border-t">
        <div id="integrations">
          <IntegrationsSection />
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-16 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold">Familiar file workflows</h3>
            <p className="mt-2 text-muted-foreground">
              Drag &amp; drop uploads, folders, and previews—just like a native
              file browser. Branch for variants, propose changes, and keep a
              full history of every artifact.
            </p>
          </div>
          <GitHubFileExplorer />
        </div>
      </section>

      <QuoteStrip />
      {/* CTA section here */}
    </div>
  );
}
