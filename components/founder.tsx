"use client"

import { useEffect, useRef } from "react"
import { CheckCircle2, Award, Calendar, MapPin } from "lucide-react"

export function Founder() {
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
      element.style.transitionDelay = `${index * 150}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-8 scroll-animate">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-3">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Leadership</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Meet the Developer</h2>
          <p className="text-muted-foreground">
            Passionate web developer dedicated to creating exceptional digital experiences
          </p>
        </div>

        {/* ID Card */}
        <div className="max-w-4xl mx-auto scroll-animate">
          <div className="relative">
            {/* Card container with ID card styling */}
            <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-2xl border-2 border-primary/20 overflow-hidden shadow-2xl">
              {/* Header stripe */}
              <div className="h-3 bg-gradient-to-r from-primary via-primary/80 to-primary" />

              {/* Card content */}
              <div className="p-4 md:p-6">
                <div className="grid md:grid-cols-[240px,1fr] gap-4 items-start">
                  {/* Left side - Photo and basic info */}
                  <div className="space-y-3">
                    {/* Photo with ID badge styling */}
                    <div className="relative">
                      <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden border-4 border-primary/20 shadow-xl">
                        {/* Clean gradient background like About Me */}
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
                        
                        {/* Single floating blur orb */}
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                        
                        {/* Content overlay */}
                        <div className="relative h-full flex flex-col justify-center items-center p-3">
                          <div className="text-center space-y-1">
                            <div className="w-12 h-12 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center shadow-2xl mx-auto">
                              <Award className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-base font-bold tracking-tight">Famim Farhaz</h3>
                            <p className="text-muted-foreground text-xs leading-tight font-medium">
                              Full-Stack Developer
                            </p>
                            <div className="flex items-center justify-center">
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/5 backdrop-blur-sm border border-primary/20">
                                <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-primary text-xs">Available</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Verified badge */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-primary rounded-full shadow-lg">
                        <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                        <span className="text-sm font-semibold text-primary-foreground">Verified</span>
                      </div>
                    </div>


                    {/* Barcode aesthetic */}
                    <div className="flex gap-1 justify-center py-2">
                      {[16, 14, 18, 18, 12, 13, 15, 20, 14, 17, 14, 11].map((height, i) => (
                        <div
                          key={i}
                          className="w-0.5 bg-foreground/20 rounded-full"
                          style={{ height: `${height}px` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right side - Detailed information */}
                  <div className="space-y-3">
                    {/* Name and title */}
                    <div className="border-b border-border pb-3">
                      <h3 className="text-xl md:text-2xl font-bold mb-1">Famim Farhaz</h3>
                      <p className="text-base text-primary font-semibold mb-1">Full-Stack Web Developer</p>
                      <p className="text-xs text-muted-foreground">Freelance Developer</p>
                    </div>

                    {/* Credentials */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">Since 2023</div>
                          <div className="text-sm text-muted-foreground">2+ years of development experience</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">Remote Worldwide</div>
                          <div className="text-sm text-muted-foreground">Available for global projects</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">Specializations</div>
                          <div className="text-sm text-muted-foreground">
                            React, Next.js, TypeScript, Full-Stack Development
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="bg-muted/30 rounded-lg p-3 border border-border">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Passionate about creating beautiful, functional web applications with expertise in modern technologies.
                      </p>
                    </div>

                    {/* Signature */}
                    <div className="pt-2 border-t border-border">
                      <div className="text-xs text-muted-foreground mb-1">Authorized Signature</div>
                      <div className="font-serif italic text-lg text-primary">Famim Farhaz</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer stripe */}
              <div className="h-2 bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50" />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
