"use client"

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingSection } from "@/components/ui/pricing-section"

import { ServicePricingTable } from "@/components/ui/service-pricing-table"

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="pt-20 container mx-auto px-4 pb-20 space-y-20">
        <PricingSection
          title="Pre-defined Packages"
          subtitle="Fixed-scope packages designed for efficiency and quality."
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
                "RAG model integration",
                "Project management setup",
                "Dashboard & basic analytics",
              ],
              cta: "Start Startup Pack",
              href: "/pricing/checkout?pkg=startup",
            },
            {
              id: "business",
              name: "Business Pack",
              price: {
                Standard: 4200,
                Rush: 5600,
              },
              description: "For mid-sized businesses — starting at",
              features: [
                "Advanced website development",
                "Simple SaaS features",
                "Mid-range RAG model",
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
                "RAG for e-commerce",
                "Admin panel",
                "CRM integration",
              ],
              cta: "Start E-commerce Pack",
              href: "/pricing/checkout?pkg=ecommerce",
            },
            {
              id: "agency",
              name: "Need More ?",
              price: {
                Standard: "Custom",
                Rush: "Custom",
              },
              description: "For large projects & agencies — build your own package.",
              features: [
                "Advanced website + custom SaaS",
                "Custom enterprise RAG (monthly)",
                "Project management software",
                "Dedicated support",
                "100% Custom Scope",
              ],
              cta: "Build Your Own",
              href: "/pricing/builder",
              highlighted: true,
            },
          ]}
        />

        <div className="space-y-10">
          <div className="text-center space-y-4 pt-20 border-t border-border/50">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Our Service Pricing</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A detailed breakdown of individual service costs to help you build your perfect project.
            </p>
          </div>
          <ServicePricingTable />
        </div>
      </main>
      <Footer />
    </>
  )
}
