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
            frequencies={["Standard"]}
            tiers={[
              {
                id: "ignite",
                name: "🔥 Ignite",
                price: { Standard: 500 },
                description: "Get online. Look professional.",
                features: [
                  "Landing Page / Portfolio",
                  "Business Website (Advanced)",
                  "Mobile Responsive + SEO",
                  "AI Chatbot Integration",
                  "30-Day Post-Deploy Warranty",
                  "3 Revision Rounds",
                  "2–3 Weeks Timeline",
                  "24h Response Guaranteed",
                ],
                cta: "Start Ignite",
                href: "/contact?package=Ignite",
              },
              {
                id: "ascend",
                name: "⚡ Ascend",
                price: { Standard: 1200 },
                description: "A full business system.",
                features: [
                  "Business Website (Advanced)",
                  "Admin Panel",
                  "Dashboard & Analytics",
                  "AI Chatbot Integration",
                  "30-Day Post-Deploy Warranty",
                  "5 Revision Rounds",
                  "5–6 Weeks Timeline",
                  "24h Response Guaranteed",
                ],
                cta: "Start Ascend",
                href: "/contact?package=Ascend",
                popular: true,
              },
              {
                id: "dominate",
                name: "🚀 Dominate",
                price: { Standard: 2000 },
                description: "Sell online. Scale fast.",
                features: [
                  "E-Commerce Website",
                  "Admin Panel",
                  "Dashboard & Analytics",
                  "AI Chatbot Integration",
                  "30-Day Post-Deploy Warranty",
                  "Unlimited Revisions",
                  "8–10 Weeks Timeline",
                  "24h Response Guaranteed",
                ],
                cta: "Start Dominate",
                href: "/contact?package=Dominate",
              },
              {
                id: "custom",
                name: "✦ Custom",
                price: { Standard: "Let's Talk" },
                description: "Your vision, fully custom.",
                features: [
                  "Everything in Dominate",
                  "Project & Team Mgmt SaaS",
                  "AI Chatbot Integration",
                  "30-Day Post-Deploy Warranty",
                  "100% Custom Scope",
                ],
                cta: "Let's Talk",
                href: "/contact?package=Custom",
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
