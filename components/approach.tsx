import { Card } from "@/components/ui/card"
import Image from "next/image"

const approaches = [
  {
    number: "01",
    title: "Understanding & Planning",
    description:
      "I start by understanding your requirements, goals, and target audience to create a detailed project roadmap.",
    image: "/business-strategy-meeting-with-team-collaboration.jpg",
  },
  {
    number: "02",
    title: "Design & Development",
    description:
      "Building responsive, accessible interfaces with clean code architecture and modern development practices.",
    image: "/software-architecture-diagram-on-screen.jpg",
  },
  {
    number: "03",
    title: "Testing & Deployment",
    description: "Thorough testing across devices and browsers, followed by smooth deployment and ongoing support.",
    image: "/developers-coding-on-multiple-monitors.jpg",
  },
]

export function Approach() {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">My Process</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A streamlined workflow that ensures quality, efficiency, and client satisfaction.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {approaches.map((approach, index) => (
            <Card
              key={index}
              className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-500 group hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-2"
            >
              <div className="relative h-56 bg-secondary overflow-hidden">
                <Image
                  src={approach.image || "/placeholder.svg"}
                  alt={approach.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center border-2 border-background/20 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-sm font-bold text-background">{approach.number}</span>
                </div>
              </div>
              <div className="p-8 relative">
                <div className="h-1 w-12 bg-accent/30 rounded-full mb-4 group-hover:w-20 transition-all duration-500" />
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                  {approach.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{approach.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
