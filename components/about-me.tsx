"use client"

import { useEffect, useRef } from "react"
import { Code2, Coffee, Lightbulb, Rocket } from "lucide-react"
import Image from "next/image"

export function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".scroll-animate")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden border-b border-border/50">
      {/* Background Effects - Clean style like All Projects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Image & Stats */}
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
                  <div className="relative h-full flex flex-col justify-center items-center p-8">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center mb-6 shadow-2xl mx-auto">
                        <Code2 className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-3xl font-bold tracking-tight">Famim Farhaz</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed font-medium">
                        Full-Stack Web Developer specializing in modern, scalable applications
                      </p>
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 backdrop-blur-sm border border-primary/20">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-primary">Available for work</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -right-6 bg-card/90 backdrop-blur-md border border-border rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-muted-foreground">Projects Built</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -left-6 bg-card/90 backdrop-blur-md border border-border rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Coffee className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">3+</div>
                    <div className="text-sm text-muted-foreground">Years Coding</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-100">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">About Me</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Turning Ideas Into <span className="text-primary">Digital Reality</span>
              </h2>

              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Hey there! I'm <span className="text-foreground font-semibold">Famim Farhaz</span>, a passionate web
                  developer who loves crafting beautiful, functional, and user-centric digital experiences.
                </p>
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
              </div>
            </div>

            {/* Skills Highlights */}
            <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="group p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Code2 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Clean Code</h3>
                  <p className="text-sm text-muted-foreground">Writing maintainable & scalable solutions</p>
                </div>

                <div className="group p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Rocket className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">Efficient development with quality results</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-300">
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Download Resume
                </button>
                <button className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-card transition-colors">
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
