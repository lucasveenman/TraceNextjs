"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check } from "lucide-react"
import { motion, type Variants } from "framer-motion"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const hoverLift: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.01,
    transition: { type: "spring" as const, stiffness: 260, damping: 18 },
  },
}

export default function Pricing() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Try the Trace platform
          </h1>
          <p className="mt-3 text-balance text-muted-foreground">
            Git for physical products — version CAD & docs, diff BOMs, track
            suppliers, and ship with auditable history and NFC-powered digital
            twins.
          </p>

          <motion.div className="mt-6" variants={fadeUp}>
            <Button asChild size="lg">
              <Link href="/trial">Start free for 30 days</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Plans */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -120px" }}
          className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3"
        >
          {/* Free */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div initial="rest" whileHover="hover" animate="rest" variants={hoverLift}>
              <Card className="flex flex-col">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Free</CardTitle>
                  <CardDescription>The basics for individuals</CardDescription>
                  <div className="mt-2 text-3xl font-semibold">
                    $0 <span className="text-base font-normal text-muted-foreground">USD</span>
                    <span className="text-sm font-normal text-muted-foreground"> per user/month</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/signup">Join for free</Link>
                  </Button>

                  <motion.ul
                    className="space-y-3 text-sm"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    {[
                      "Unlimited public repositories",
                      "1 private workspace",
                      "Part & file versioning (Git-backed)",
                      "Basic BOM table and CSV import",
                      "3D previews (GLB/STL)",
                      "Issues & Projects (basic)",
                      "500MB artifact storage",
                      "Email support",
                    ].map((f) => (
                      <motion.li key={f} className="flex items-start gap-2" variants={fadeUp}>
                        <Check className="mt-0.5 size-4" />
                        <span>{f}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Team (Recommended) */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div initial="rest" whileHover="hover" animate="rest" variants={hoverLift}>
              <Card className="relative flex flex-col border-2 border-blue-600 shadow-sm">
                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring" as const, stiffness: 380, damping: 20, delay: 0.15 }}
                  className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold tracking-wide text-white"
                >
                  RECOMMENDED
                </motion.div>

                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Team</CardTitle>
                  <CardDescription>
                    Advanced collaboration for organizations
                  </CardDescription>
                  <div className="mt-2 text-3xl font-semibold">
                    $19 <span className="text-base font-normal text-muted-foreground">USD</span>
                    <span className="text-sm font-normal text-muted-foreground"> per user/month</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button asChild className="w-full">
                      <Link href="/checkout?plan=team">Continue with Team</Link>
                    </Button>
                  </motion.div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Everything in Free, plus</p>
                    <motion.ul
                      className="space-y-3 text-sm"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                    >
                      {[
                        "Unlimited private repos & collaborators",
                        "Repository rules and protected branches",
                        "BOM revisions with diff & rollbacks",
                        "Supplier links, lead times, and cost fields",
                        "Multiple reviewers & approval checklists",
                        "Branch previews for CAD, docs, and renders",
                        "Webhooks and API access",
                        "5GB artifact storage",
                        "10,000 Digital Twin / NFC IDs",
                        "Standard security features",
                      ].map((f) => (
                        <motion.li key={f} className="flex items-start gap-2" variants={fadeUp}>
                          <Check className="mt-0.5 size-4" />
                          <span>{f}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Enterprise */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div initial="rest" whileHover="hover" animate="rest" variants={hoverLift}>
              <Card className="flex flex-col">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Enterprise</CardTitle>
                  <CardDescription>
                    Security, compliance, and flexible deployment
                  </CardDescription>
                  <div className="mt-2 text-3xl font-semibold">
                    $49 <span className="text-base font-normal text-muted-foreground">USD</span>
                    <span className="text-sm font-normal text-muted-foreground"> per user/month</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Button asChild className="w-full">
                        <Link href="/trial">Start a free trial</Link>
                      </Button>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/contact/sales">Contact Sales</Link>
                      </Button>
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Everything in Team, plus</p>
                    <motion.ul
                      className="space-y-3 text-sm"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                    >
                      {[
                        "Data residency & SSO/SAML",
                        "Enterprise Managed Users & SCIM",
                        "Role-based access & environments",
                        "Advanced traceability (lot/serial, COA uploads)",
                        "Quality flows & nonconformance records",
                        "Procurement exports (PO-ready BOM)",
                        "Audit logs & retention policies",
                        "NFC provisioning dashboard (unlimited IDs)",
                        "Priority support & onboarding",
                        "Optional on-prem mirrors",
                      ].map((f) => (
                        <motion.li key={f} className="flex items-start gap-2" variants={fadeUp}>
                          <Check className="mt-0.5 size-4" />
                          <span>{f}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-3xl text-center text-sm text-muted-foreground"
        >
          Need custom security reviews or air-gapped deployment?{" "}
          <Link href="/contact/enterprise" className="underline underline-offset-4">
            Talk to Enterprise
          </Link>
          .
        </motion.p>
      </div>
    </section>
  )
}
