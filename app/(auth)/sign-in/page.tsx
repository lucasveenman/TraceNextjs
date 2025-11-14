// app/(auth)/sign-in/page.tsx
"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import ColorBends from "@/components/ColorBends";
import { SignInForm } from "@/components/sign-in/SignIn-form";

export default function LoginPage() {
  return (
    <section
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
      aria-label="Sign in"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ColorBends
          rotation={-6}
          speed={0.35}
          scale={1}
          frequency={1}
          warpStrength={1}
          autoRotate={2}
          mouseInfluence={0.8}
          parallax={0.6}
          noise={0.02}
        />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_35%,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.72)_35%,rgba(255,255,255,0.55)_60%,rgba(255,255,255,0.15)_100%)] dark:bg-[radial-gradient(80%_60%_at_50%_35%,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.55)_35%,rgba(0,0,0,0.65)_60%,rgba(0,0,0,0.75)_100%)]" />
      </div>

      <div className="mx-auto w-full max-w-sm px-4 sm:px-0">
        <Link
          href="/"
          className="mb-6 flex items-center gap-2 self-center justify-center font-medium"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground shadow">
            <GalleryVerticalEnd className="size-4" />
          </div>
          TRACE
        </Link>

        <SignInForm />
      </div>
    </section>
  );
}
