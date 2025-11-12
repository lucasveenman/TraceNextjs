// =====================
// components/site-footer.tsx
// =====================
import Link from "next/link";


export function SiteFooter() {
return (
<footer className="border-t">
<div className="mx-auto w-full max-w-7xl px-4 py-10">
<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
<div className="space-y-2">
<div className="font-medium">Product</div>
<FooterLink href="/explore" label="Explore" />
<FooterLink href="/templates" label="Templates" />
<FooterLink href="/pricing" label="Pricing" />
</div>
<div className="space-y-2">
<div className="font-medium">Company</div>
<FooterLink href="/about" label="About" />
<FooterLink href="/blog" label="Blog" />
<FooterLink href="/careers" label="Careers" />
</div>
<div className="space-y-2">
<div className="font-medium">Resources</div>
<FooterLink href="/docs" label="Docs" />
<FooterLink href="/changelog" label="Changelog" />
<FooterLink href="/status" label="Status" />
</div>
<div className="space-y-2">
<div className="font-medium">Legal</div>
<FooterLink href="/terms" label="Terms" />
<FooterLink href="/privacy" label="Privacy" />
<FooterLink href="/security" label="Security" />
</div>
<div className="space-y-2">
<div className="font-medium">Follow</div>
<FooterLink href="https://x.com" label="X" />
<FooterLink href="https://github.com" label="GitHub" />
<FooterLink href="https://linkedin.com" label="LinkedIn" />
</div>
</div>
<div className="mt-8 text-sm text-muted-foreground">© {new Date().getFullYear()} Trace Technologies</div>
</div>
</footer>
);
}


function FooterLink({ href, label }: { href: string; label: string }) {
return (
<Link href={href} className="block text-sm text-muted-foreground hover:text-foreground">
{label}
</Link>
);
}