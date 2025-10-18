"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Code2, Database, Smartphone, Globe, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState, useRef } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useStaggeredEntranceAnimation } from "@/hooks/use-entrance-animation"

export function Hero() {
  const sectionRef = useScrollAnimation()
  const { containerRef: heroContainerRef } = useStaggeredEntranceAnimation({
    delay: 800, // Start after header loads
    duration: 800,
    direction: 'up',
    stagger: 200
  })
  const router = useRouter()
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const nameRef = useRef<HTMLSpanElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  
  // Prefetch routes for faster navigation
  useEffect(() => {
    router.prefetch('/projects')
    router.prefetch('/contact')
  }, [router])
  
  const handleProjectsClick = useCallback(() => {
    if (isNavigating) return
    setIsNavigating(true)
    router.push('/projects')
    setTimeout(() => setIsNavigating(false), 1000)
  }, [router, isNavigating])
  
  const handleContactClick = useCallback(() => {
    if (isNavigating) return
    setIsNavigating(true)
    router.push('/contact')
    setTimeout(() => setIsNavigating(false), 1000)
  }, [router, isNavigating])

  // Typing animation for name - starts after entrance animation
  useEffect(() => {
    const name = "Famim Farhaz"
    let index = 0
    
    // Start typing after entrance animation completes (800ms delay + 200ms * 2 for stagger)
    const startDelay = 1400
    
    const startTimer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (index <= name.length) {
          setTypedText(name.slice(0, index))
          index++
        } else {
          clearInterval(typeInterval)
          // Keep cursor blinking for a bit longer, then hide
          setTimeout(() => setShowCursor(false), 2000)
        }
      }, 120)
    }, startDelay)

    return () => clearTimeout(startTimer)
  }, [])

  // Cursor blinking animation
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  // Floating particles animation
  useEffect(() => {
    const particles = particlesRef.current
    if (!particles) return

    const particleElements: HTMLDivElement[] = []
    const particleCount = 15

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full bg-accent/20 animate-float'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      particle.style.width = Math.random() * 8 + 4 + 'px'
      particle.style.height = particle.style.width
      particle.style.animationDelay = Math.random() * 3 + 's'
      particle.style.animationDuration = (Math.random() * 3 + 4) + 's'
      particles.appendChild(particle)
      particleElements.push(particle)
    }

    return () => {
      particleElements.forEach(p => p.remove())
    }
  }, [])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const xPos = (clientX / innerWidth - 0.5) * 20
      const yPos = (clientY / innerHeight - 0.5) * 20

      const parallaxElements = document.querySelectorAll('.parallax-element')
      parallaxElements.forEach((el, index) => {
        const element = el as HTMLElement
        const speed = 0.1 + (index * 0.05)
        element.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-background to-background animate-gradient-shift" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] animate-grid-flow" />
      
      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float parallax-element" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-delayed parallax-element" />

      <div className="container mx-auto px-6 lg:px-8 relative w-full" ref={heroContainerRef}>
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center w-full">
          <div className="max-w-4xl">
            <div
              className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-accent/10 border border-accent/30 mb-4 sm:mb-6 backdrop-blur-sm animate-bounce-slow hover:scale-105 transition-transform cursor-default"
              data-animate
            >
              <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 text-accent animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-accent">Available</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-balance mb-4 sm:mb-6 leading-[1.15]"
              data-animate
            >
              Hello I'm{' '}
              <span className="text-accent relative inline-block">
                <span 
                  ref={nameRef}
                  className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent animate-gradient-x"
                >
                  {typedText}
                </span>
                {showCursor && (
                  <span className="animate-pulse text-accent ml-1">|</span>
                )}
              </span>
              <br />
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-muted-foreground">and a Web Developer</span>
            </h1>

            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground/90 text-pretty mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-2xl"
              data-animate
            >
              Full-stack web developer specializing in modern, scalable Website's that deliver exceptional user
              experiences.
            </p>

            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
              data-animate
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  onClick={handleProjectsClick}
                  disabled={isNavigating}
                  size="lg"
                  className="bg-accent text-background hover:bg-accent/90 group h-10 sm:h-12 px-4 sm:px-7 text-sm sm:text-base font-semibold cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-accent/25 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  View My Work
                  <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  onClick={handleContactClick}
                  disabled={isNavigating}
                  size="lg"
                  variant="outline"
                  className="border-accent/30 hover:bg-white hover:text-black group h-10 sm:h-12 px-4 sm:px-7 text-sm sm:text-base font-semibold bg-transparent cursor-pointer transform hover:scale-105 transition-all duration-300 backdrop-blur-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Play className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Book Demo
                </Button>
              </div>
            </div>

            <div
              className="flex items-center gap-10 mt-10 pt-8 border-t border-border/50"
              data-animate
            >
              <div className="group cursor-default">
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">1</div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Project Completed</div>
              </div>
              <div className="group cursor-default">
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-500 to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">100%</div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Client Satisfaction</div>
              </div>
              <div className="group cursor-default">
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">2+</div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Years Experience</div>
              </div>
            </div>
          </div>

          <div
            className="hidden lg:block parallax-element"
            data-animate
          >
            <div className="relative w-[360px] group">
              <div className="absolute -inset-2 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

              <div className="relative">
                <div className="relative bg-gradient-to-br from-card/95 to-card/60 rounded-2xl border border-accent/30 backdrop-blur-xl p-6 shadow-2xl group-hover:shadow-accent/10 group-hover:scale-[1.02] transition-all duration-500">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-accent/5 transition-all duration-300 hover:scale-105 hover:shadow-sm">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                        <Globe className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-sm font-medium text-foreground mb-0.5">Full-Stack Development</div>
                        <div className="text-xs text-muted-foreground">Frontend & Backend solutions</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-accent/5 transition-all duration-300 hover:scale-105 hover:shadow-sm">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                        <Smartphone className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-sm font-medium text-foreground mb-0.5">Responsive Design</div>
                        <div className="text-xs text-muted-foreground">Mobile-first approach</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-accent/5 transition-all duration-300 hover:scale-105 hover:shadow-sm">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                        <Database className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-sm font-medium text-foreground mb-0.5">Database Integration</div>
                        <div className="text-xs text-muted-foreground">MongoDB, MySQL & more</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-accent/5 transition-all duration-300 hover:scale-105 hover:shadow-sm">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                        <Code2 className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-sm font-medium text-foreground mb-0.5">Modern Tech Stack</div>
                        <div className="text-xs text-muted-foreground">React, Next.js, Node.js</div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-5" />

                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 p-5 group-hover:from-accent/15 group-hover:to-accent/8 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/15 transition-colors duration-500" />

                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Current Status
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-green-500 font-medium animate-pulse">Available</span>
                        </div>
                      </div>

                      <div className="text-lg font-bold text-foreground mb-2">Ready for Projects</div>

                      <div className="flex items-center gap-2 text-accent">
                        <CheckCircle2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm font-medium">Open for new opportunities</span>
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
