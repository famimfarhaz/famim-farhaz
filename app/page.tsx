import { Header } from "@/components/header"
import { NewHero } from "@/components/new-hero"
import GalleryHoverCarousel from "@/components/ui/gallery-hover-carousel"

import { FreeDemo } from "@/components/free-demo"
import { Services } from "@/components/services"
import { MyProjects } from "@/components/my-projects"
import { Quote } from "@/components/quote"
import { Testimonials } from "@/components/testimonials"
import { TechStack } from "@/components/tech-stack"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { LoadingOverlay } from "@/components/loading-overlay"
import { FaqsSection } from "@/components/ui/faqs-1"
import { PricingSection } from "@/components/ui/pricing-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LoadingOverlay />
      <Header />
      <div className="animate-fade-in">
        <main>
          <NewHero />
          <GalleryHoverCarousel />
          <MyProjects />
          <Services />
          <FreeDemo />
          <Testimonials />
          <Quote />
          <TechStack />
          <FaqsSection />
          <PricingSection
            title="Choose Your Package"
            subtitle="Transparent pricing for every stage of your business. Choose a plan that fits your current needs."
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
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
