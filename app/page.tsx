import { Header } from "@/components/header"
import { NewHero } from "@/components/new-hero"
import GalleryHoverCarousel from "@/components/ui/gallery-hover-carousel"

import { FreeDemo } from "@/components/free-demo"
import { Services } from "@/components/services"
import { MyProjects } from "@/components/my-projects"
import { Quote } from "@/components/quote"

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

          <Quote />
          <TechStack />
          <FaqsSection />
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
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
