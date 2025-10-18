"use client"

import { Code2, Coffee, Lightbulb, Rocket } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useIsMobile } from "@/hooks/use-mobile"

export function AboutMe() {
  const sectionRef = useScrollAnimation()
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const isMobile = useIsMobile()
  
  // Prefetch routes
  useEffect(() => {
    router.prefetch('/contact')
    router.prefetch('/projects')
  }, [router])
  
  const handleHireMeClick = useCallback(() => {
    if (isNavigating) return
    setIsNavigating(true)
    router.push('/contact')
    setTimeout(() => setIsNavigating(false), 1000)
  }, [router, isNavigating])
  
  const handleViewProjectsClick = useCallback(() => {
    if (isNavigating) return
    setIsNavigating(true)
    router.push('/projects')
    setTimeout(() => setIsNavigating(false), 1000)
  }, [router, isNavigating])

  return (
    <section id="about-me" ref={sectionRef} className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 overflow-hidden border-b border-border/50">
      {/* Background Effects - Clean style like All Projects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className={isMobile ? "space-y-8" : "grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center"}>
          {/* Mobile-Optimized Profile Card */}
          {isMobile ? (
            <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700">
              <div className="relative bg-gradient-to-br from-primary/5 via-card/50 to-background rounded-2xl p-6 border border-border/50">
                {/* Mobile Profile Header */}
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center mx-auto shadow-lg">
                    <Code2 className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2">Famim Farhaz</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Full-Stack Web Developer specializing in modern, scalable applications
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 backdrop-blur-sm border border-primary/20">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-sm text-primary">Available for work</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <Code2 className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-xl font-bold">1</div>
                    <div className="text-xs text-muted-foreground">Project Built</div>
                  </div>
                  <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <Coffee className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-xl font-bold">2+</div>
                    <div className="text-xs text-muted-foreground">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Desktop Version - Left Side - Image & Stats */
            <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700">
              <div className="relative">
                {/* Clean Gradient Design Card */}
                <div className="relative overflow-hidden rounded-2xl">
                  {/* Main gradient background - Clean style like All Projects */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                    {/* Base gradient - Clean theme */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
                    
                    {/* Single floating blur orb - Clean and minimal */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                    
                    {/* Content overlay */}
                    <div className="relative h-full flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
                      <div className="text-center space-y-4 sm:space-y-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center mb-4 sm:mb-6 shadow-2xl mx-auto">
                          <Code2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary" />
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Famim Farhaz</h3>
                        <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto leading-relaxed font-medium">
                          Full-Stack Web Developer specializing in modern, scalable applications
                        </p>
                        <div className="flex items-center justify-center gap-4 text-xs sm:text-sm">
                          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-primary/5 backdrop-blur-sm border border-primary/20">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-primary">Available for work</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-card/90 backdrop-blur-md border border-border rounded-xl p-3 sm:p-4 shadow-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Code2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold">1</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Project Built</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 bg-card/90 backdrop-blur-md border border-border rounded-xl p-3 sm:p-4 shadow-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Coffee className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold">2+</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className={`space-y-6 ${isMobile ? 'order-first' : 'sm:space-y-8'}`}>
            <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-100">
              <div className={isMobile ? 'flex justify-center mb-4 sm:mb-6' : 'mb-4 sm:mb-6'}>
                <div className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-primary">About Me</span>
                </div>
              </div>

              <h2 className={`font-bold mb-4 sm:mb-6 text-balance ${
                isMobile ? 'text-2xl text-center' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
              }`}>
                Turning Ideas Into <span className="text-primary">Digital Reality</span>
              </h2>

              <div className={`space-y-3 sm:space-y-4 text-muted-foreground leading-relaxed ${
                isMobile ? 'text-sm text-left' : 'text-sm sm:text-base md:text-lg'
              }`}>
                <p>
                  Hey there! I'm <span className="text-foreground font-semibold">Famim Farhaz</span>, a passionate web
                  developer who loves crafting beautiful, functional, and user-centric digital experiences.
                </p>
                {!isMobile && (
                  <>
                    <p>
                      My journey into web development started with curiosity and evolved into a deep passion for creating
                      solutions that make a difference. I specialize in building modern web applications using cutting-edge
                      technologies like React, TypeScript, and Tailwind CSS.
                    </p>
                    <p>
                      When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
                      or sharing knowledge with the developer community. I believe in writing clean, maintainable code and
                      creating experiences that users love.
                    </p>
                  </>
                )}
                {isMobile && (
                  <p>
                    I specialize in building modern web applications with clean, maintainable code and creating
                    experiences that users love. Always exploring new technologies and sharing knowledge with the community.
                  </p>
                )}
              </div>
            </div>

            {/* Skills Highlights */}
            <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-200">
              <div className={`grid gap-3 sm:gap-4 ${
                isMobile ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-2'
              }`}>
                <div className="group p-3 sm:p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform ${
                    isMobile ? 'mx-auto' : ''
                  }`}>
                    <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <h3 className={`text-sm sm:text-base font-semibold mb-1 ${
                    isMobile ? 'text-center' : ''
                  }`}>Clean Code</h3>
                  <p className={`text-xs sm:text-sm text-muted-foreground ${
                    isMobile ? 'text-center' : ''
                  }`}>Writing maintainable & scalable solutions</p>
                </div>

                <div className="group p-3 sm:p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform ${
                    isMobile ? 'mx-auto' : ''
                  }`}>
                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <h3 className={`text-sm sm:text-base font-semibold mb-1 ${
                    isMobile ? 'text-center' : ''
                  }`}>Fast Delivery</h3>
                  <p className={`text-xs sm:text-sm text-muted-foreground ${
                    isMobile ? 'text-center' : ''
                  }`}>Efficient development with quality results</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-300">
              <div className={`flex gap-3 sm:gap-4 ${
                isMobile ? 'flex-col max-w-xs mx-auto' : 'flex-wrap'
              }`}>
                <button 
                  onClick={handleHireMeClick}
                  disabled={isNavigating}
                  className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
                    isMobile ? 'w-full justify-center' : ''
                  }`}
                >
                  Hire Me
                </button>
                <button 
                  onClick={handleViewProjectsClick}
                  disabled={isNavigating}
                  className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base border border-border rounded-lg font-medium hover:bg-card transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
                    isMobile ? 'w-full justify-center' : ''
                  }`}
                >
                  View Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
