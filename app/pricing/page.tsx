"use client"

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicesHero } from "@/components/services-hero"
import { PricingSection } from "@/components/ui/pricing-section"
import { SubServicesGrid } from "@/components/sub-services-grid"
import { TrustSignals } from "@/components/trust-signals"

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        {/* Section 1: Hero */}
        <ServicesHero />

        {/* Section 2: Core Packages */}
        <div id="packages">
          <PricingSection
            title="Choose Your Package"
            subtitle="Fixed-scope packages designed for efficiency and quality. Pick one and get started fast."
            frequencies={["Standard", "Rush"]}
            tiers={[
              {
                id: "startup",
                name: "Startup Pack",
                price: {
                  Standard: 1200,
                  Rush: 1800,
                },
                description: "For solopreneurs & small businesses — starting at",
                features: [
                  "Basic website development",
                  "SEO optimization basics",
                  "Project management setup",
                  "Dashboard & basic analytics",
                ],
                cta: "Start Startup Pack",
                href: "/pricing/checkout?pkg=startup",
              },
              {
                id: "business",
                name: "Business Growth Pack",
                price: {
                  Standard: 4200,
                  Rush: 5600,
                },
                description: "For mid-sized businesses — starting at",
                features: [
                  "Advanced website development",
                  "SaaS development (simple features)",
                  "Priority support",
                  "Dashboard & analytics",
                ],
                cta: "Start Business Pack",
                href: "/pricing/checkout?pkg=business",
                popular: true,
              },
              {
                id: "ecommerce",
                name: "E-commerce Pack",
                price: {
                  Standard: 7200,
                  Rush: 9500,
                },
                description: "For online shops & stores — starting at",
                features: [
                  "Full e-commerce site (cart & payments)",
                  "Inventory management",
                  "Admin panel",
                  "CRM integration",
                ],
                cta: "Start E-commerce Pack",
                href: "/pricing/checkout?pkg=ecommerce",
              },
              {
                id: "agency",
                name: "Need More?",
                price: {
                  Standard: "Custom",
                  Rush: "Custom",
                },
                description:
                  "For large projects & agencies — build your own package.",
                features: [
                  "Advanced website + custom SaaS",
                  "Dedicated support (Monthly)",
                  "Project management software",
                  "100% Custom Scope",
                ],
                cta: "Build Your Own",
                href: "/pricing/builder",
                highlighted: true,
              },
            ]}
          />
        </div>

        {/* Section 3: Sub-services Grid */}
        <SubServicesGrid />

        {/* Section 4: Trust Signals */}
        <TrustSignals />
      </main>
      <Footer />
    </>
  )
}
