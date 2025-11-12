"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { Suspense } from "react";

export function PartExampleHero() {
  return (
    <section className="border-b border-t to-muted/30">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <span>Early access</span>
            <span>•</span>
            <span>Designer-first Git for hardware</span>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Version, fork & ship <span className="text-primary">physical products</span>
          </h1>
          <p className="max-w-prose text-lg text-muted-foreground">
            Trace treats product development like code—branches for variants, PRs for improvements, and a visual history
            of models, BOMs, and processes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg">Get started</Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/omnitude/phystrack">View demo repo</Link>
            </Button>
          </div>
        </div>
        <div className="h-[360px] w-full overflow-hidden rounded-2xl">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Loading preview…
              </div>
            }
          >
            <Canvas camera={{ position: [2.5, 2, 3.5], fov: 45 }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
              <Float speed={1.5} rotationIntensity={1.2} floatIntensity={0.6}>
                <mesh castShadow receiveShadow>
                  <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                  <meshStandardMaterial metalness={0.6} roughness={0.35} />
                </mesh>
              </Float>
              <OrbitControls enablePan={false} enableZoom={false} />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
