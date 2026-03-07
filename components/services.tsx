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
    title: "AI Chatbots",
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
    title: "AI Agents",
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
            <div
              key={index}
              className="relative p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300 group scroll-animate"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-zinc-100 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 leading-relaxed text-sm group-hover:text-zinc-400 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
