import { Header } from "@/components/header"
import { NewHero } from "@/components/new-hero"
import GalleryHoverCarousel from "@/components/ui/gallery-hover-carousel"

// import { FreeDemo } from "@/components/free-demo"
import { Services } from "@/components/services"
import { MyProjects } from "@/components/my-projects"
import { Quote } from "@/components/quote"

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
          {/* <FreeDemo /> */}

          <Quote />
          <FaqsSection />
          <PricingSection
            title="One Service. Done Right."
            subtitle="Custom websites built from scratch — no templates, no shortcuts."
            frequencies={["Standard"]}
            tiers={[
              {
                id: "studio",
                name: "Custom Website",
                price: { Standard: 500 },
                description: "Custom websites built from scratch starting at $500.",
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
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
