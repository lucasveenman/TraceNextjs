// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import SiteHeader from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const noFoucThemeScript = `
try {
  const key = 'trace-theme';
  const stored = localStorage.getItem(key);
  // Dark is default when no stored preference.
  const theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
  if (theme === 'dark') document.documentElement.classList.add('dark');
} catch {}
`;


export const metadata = {
  title: "Trace – Git for Physical Products",
  description: "Version, fork, and collaborate on physical product designs.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFoucThemeScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
