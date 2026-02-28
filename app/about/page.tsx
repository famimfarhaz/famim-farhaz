import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about-hero"
import { AboutMarquee } from "@/components/about-marquee"
import { AboutContent } from "@/components/about-content"

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <AboutHero />
            <AboutMarquee />
            <AboutContent />
            <Footer />
        </main>
    )
}
