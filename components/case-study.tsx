"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef } from "react"

export function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.style.opacity = '1'
            target.style.transform = 'translateY(0px)'
          }
        })
      },
      { threshold: 0.15 },
    )

    const elements = sectionRef.current?.querySelectorAll(".scroll-animate")
    elements?.forEach((el, index) => {
      const element = el as HTMLElement
      element.style.opacity = '0'
      element.style.transform = 'translateY(40px)'
      element.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1)`
      element.style.transitionDelay = `${index * 200}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="py-20 lg:py-32 bg-card/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16 scroll-animate">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">Featured Project</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A showcase of my recent work and the impact it delivered.
          </p>
        </div>

        <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-500 group hover:shadow-2xl hover:shadow-accent/10 scroll-animate">
          <div className="grid lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto bg-secondary overflow-hidden">
              <Image
                src="/modern-office-workspace-with-developers-collaborat.jpg"
                alt="Case study"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent lg:opacity-100 opacity-60" />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 mb-6 w-fit backdrop-blur-sm scroll-animate">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono text-accent font-medium">Full Stack Website</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-foreground text-balance scroll-animate">Anime Website</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed scroll-animate">
                Developed a comprehensive anime streaming platform with user authentication, personal watchlists, and 
                detailed anime information. The platform provides a seamless experience for anime enthusiasts with 
                modern UI/UX design and responsive layouts across all devices.
              </p>
              <div className="flex flex-wrap gap-2 mb-8 scroll-animate">
                {["Next.js", "TypeScript", "Tailwind CSS", "API"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs rounded-lg bg-secondary/80 text-secondary-foreground border border-border/50 hover:border-accent/50 hover:bg-secondary transition-all duration-300 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-fit group/btn border-accent/30 hover:bg-accent/10 bg-transparent hover:border-accent/50 transition-all duration-300 scroll-animate"
              >
                View Project
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
