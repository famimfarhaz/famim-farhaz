import { Card } from "@/components/ui/card"
import { Code2, Database, Cloud, Shield, Zap, Users } from "lucide-react"

const services = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "End-to-end web application development using modern frameworks and best practices.",
  },
  {
    icon: Cloud,
    title: "Frontend Development",
    description: "Responsive, performant user interfaces built with React, Next.js, and modern CSS.",
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "Robust server-side solutions with RESTful APIs and database integration.",
  },
  {
    icon: Shield,
    title: "Web Performance",
    description: "Optimization techniques ensuring fast load times and smooth user experiences.",
  },
  {
    icon: Zap,
    title: "API Integration",
    description: "Seamless third-party service integration and custom API development.",
  },
  {
    icon: Users,
    title: "UI/UX Implementation",
    description: "Pixel-perfect implementation of designs with attention to detail and accessibility.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">What I Offer</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Comprehensive web development services to bring your ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="relative p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 hover:bg-card/80 transition-all duration-500 group overflow-hidden hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300 border border-accent/20">
                  <service.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
