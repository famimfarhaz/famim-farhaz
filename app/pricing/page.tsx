import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicesHero } from "@/components/services-hero"
import { PricingSection } from "@/components/ui/pricing-section"
import { TrustSignals } from "@/components/trust-signals"

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <ServicesHero />

        {/* Single Offer */}
        <div id="packages">
          <PricingSection
            title="One Service. Done Right."
            subtitle="Custom websites built from scratch — no templates, no shortcuts."
            frequencies={["Standard"]}
            tiers={[
              {
                id: "studio",
                name: "Custom Website",
                price: { Standard: 1200 },
                description: "Custom websites built from scratch starting at $1,200.",
                features: [
                  "Fully custom design + development",
                  "Mobile responsive + SEO basics",
                  "Complimentary AI Chatbot",
                  "30-day post-deploy warranty",
                  "5 revision rounds + 24h response",
                ],
                cta: "Book a Discovery Call",
                href: "/contact",
                highlighted: true,
              },
            ]}
          />
        </div>

        {/* Maintenance + Trust Signals */}
        <TrustSignals />
      </main>
      <Footer />
    </>
  )
}

