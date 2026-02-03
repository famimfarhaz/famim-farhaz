"use client"

import { Card } from "@/components/ui/card"
import { Code2, Database, Smartphone, Globe, Settings, Paintbrush } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Complete website development from design to deployment using modern technologies like React and Next.js.",
  },
  {
    icon: Code2,
    title: "SaaS Development",
    description: "Building scalable Software as a Service (SaaS) applications tailored to your business needs.",
  },
  {
    icon: Database,
    title: "AI Chatbot's",
    description: "Designing and implementing AI-powered chatbots to enhance customer engagement and support.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Mobile-first, cross-device compatible websites that work perfectly on all screen sizes.",
  },
  {
    icon: Settings,
    title: "API Integration",
    description: "Seamless integration of third-party APIs to enhance functionality and connect services efficiently.",
  },
  {
    icon: Paintbrush,
    title: "AI-AGENT's",
    description: "Creating intelligent AI agents to automate tasks and improve operational efficiency.",
  },
]

export function Services() {
  const sectionRef = useScrollAnimation()

  return (
    <section ref={sectionRef} id="services" className="py-12 sm:py-16 md:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-12 md:mb-16 scroll-animate">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4 text-balance">What I Offer</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Comprehensive web development services to bring your ideas to life.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="relative p-4 sm:p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 hover:bg-card/80 transition-all duration-500 group overflow-hidden hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 scroll-animate"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300 border border-accent/20">
                  <service.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-accent" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
