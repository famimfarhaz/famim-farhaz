import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { AboutMe } from "@/components/about-me"
import { FreeDemo } from "@/components/free-demo"
import { Services } from "@/components/services"
import { Approach } from "@/components/approach"
import { CaseStudy } from "@/components/case-study"
import { MyProjects } from "@/components/my-projects"
import { Quote } from "@/components/quote"
import { Testimonials } from "@/components/testimonials"
import { TechStack } from "@/components/tech-stack"
import { Founder } from "@/components/founder"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { LoadingOverlay } from "@/components/loading-overlay"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LoadingOverlay />
      <div className="animate-fade-in">
        <Header />
        <main>
        <Hero />
        <AboutMe />
        <FreeDemo />
        <Services />
        <CaseStudy />
        <MyProjects />
        <Approach />
        <Quote />
        <TechStack />
        <Testimonials />
        <Founder />
        <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
