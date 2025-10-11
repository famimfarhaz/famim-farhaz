"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Zap, Brain, Shield, Cloud, CheckCircle2 } from "lucide-react"
import { useEffect, useRef } from "react"
import Link from "next/link"

export function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = [
      { ref: badgeRef, delay: 200 },
      { ref: headingRef, delay: 400 },
      { ref: descriptionRef, delay: 600 },
      { ref: buttonsRef, delay: 800 },
      { ref: statsRef, delay: 1000 },
      { ref: sidebarRef, delay: 500 },
    ]

    // Start animations after component mount with staggered delays
    elements.forEach(({ ref, delay }) => {
      if (ref.current) {
        setTimeout(() => {
          if (ref.current) {
            ref.current.classList.add("fade-in-visible")
          }
        }, delay)
      }
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-background to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-6 lg:px-8 relative w-full">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center w-full">
          <div className="max-w-4xl">
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6 backdrop-blur-sm fade-in-element"
            >
              <Sparkles className="h-3 w-3 text-accent" />
              <span className="text-sm font-medium text-accent">Available</span>
            </div>

            <h1
              ref={headingRef}
              className="text-5xl lg:text-7xl font-bold tracking-tight text-balance mb-6 leading-[1.15] fade-in-element fade-in-up"
            >
              Hello I'm <span className="text-accent">Famim Farhaz</span> and a Web Developer
            </h1>

            <p
              ref={descriptionRef}
              className="text-lg lg:text-xl text-muted-foreground/90 text-pretty mb-10 leading-relaxed max-w-2xl fade-in-element fade-in-up"
            >
              Full-stack web developer specializing in modern, scalable Website's that deliver exceptional user
              experiences.
            </p>

            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 fade-in-element fade-in-up"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/projects">
                  <Button
                    size="lg"
                    className="bg-accent text-background hover:bg-accent/90 group h-12 px-7 text-base font-semibold"
                  >
                    View My Work
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-accent/30 hover:bg-accent/10 group h-12 px-7 text-base font-semibold bg-transparent"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Book Demo
                  </Button>
                </Link>
              </div>
            </div>

            <div
              ref={statsRef}
              className="flex items-center gap-10 mt-10 pt-8 border-t border-border/50 fade-in-element fade-in-up"
            >
              <div>
                <div className="text-2xl lg:text-3xl font-bold">50+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold">100%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold">3+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          <div
            ref={sidebarRef}
            className="hidden lg:block fade-in-element fade-in-right"
          >
            <div className="relative w-[360px]">
              <div className="absolute -inset-2 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent rounded-3xl blur-2xl opacity-50" />

              <div className="relative">
                <div className="relative bg-gradient-to-br from-card/95 to-card/60 rounded-2xl border border-accent/30 backdrop-blur-xl p-6 shadow-2xl">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-accent/5 transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-sm font-medium text-foreground mb-0.5">Real-time Collaboration</div>
                        <div className="text-xs text-muted-foreground">Work together seamlessly</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-accent/5 transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Brain className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-sm font-medium text-foreground mb-0.5">AI-Powered Insights</div>
                        <div className="text-xs text-muted-foreground">Smart analytics & predictions</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-accent/5 transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-sm font-medium text-foreground mb-0.5">Enterprise Security</div>
                        <div className="text-xs text-muted-foreground">Bank-grade protection</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-accent/5 transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Cloud className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-sm font-medium text-foreground mb-0.5">Cloud Infrastructure</div>
                        <div className="text-xs text-muted-foreground">Scalable & reliable</div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-5" />

                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 p-5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />

                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Latest Deployment
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-green-500 font-medium">Live</span>
                        </div>
                      </div>

                      <div className="text-lg font-bold text-foreground mb-2">Production v2.4.1</div>

                      <div className="flex items-center gap-2 text-accent">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm font-medium">All systems operational</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
