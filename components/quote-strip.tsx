// =====================
// components/quote-strip.tsx
// =====================
import { Quote } from "lucide-react";


export function QuoteStrip() {
return (
<section className="border-t bg-muted/30">
<div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-4 py-12">
<Quote className="h-8 w-8" />
<p className="text-balance text-lg text-muted-foreground">
“Trace brings Git’s superpowers to the physical world—fork a phone case, PR a material swap, and ship faster.”
</p>
</div>
</section>
);
}