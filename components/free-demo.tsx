"use client"

import { ArrowRight, CheckCircle2, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useCallback } from "react"

export function FreeDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const router = useRouter()

  const handleHireMeClick = useCallback(() => {
    // Add a small delay to ensure animations complete
    setTimeout(() => {
      router.push('/contact')
    }, 150)
  }, [router])

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
      element.style.transitionDelay = `${index * 100}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      number: "01",
      title: "Share Your Idea",
      description: "Tell me about your project vision and requirements",
    },
    {
      number: "02",
      title: "Get Free Demo",
      description: "I'll create a working demo at no cost to you",
    },
    {
      number: "03",
      title: "Love It? Hire Me",
      description: "If satisfied, we proceed with the full project",
    },
  ]

  const benefits = [
    "No upfront payment required",
    "See my work quality firsthand",
    "Risk-free evaluation",
    "Quick turnaround time",
  ]

  return (
    <section ref={sectionRef} className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 scroll-animate">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Book Your <span className="text-yellow-400 font-bold border-b border-yellow-400/30 pb-0.5">Free Demo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Not sure about hiring? Let me prove my skills by building a free demo of your project. No strings attached,
            no upfront costs.
          </p>
        </div>

        <div className="relative bg-card border border-border rounded-xl p-6 md:p-8 mb-8 scroll-animate">
          {/* VIP corner accent - top-left */}
          <div className="absolute top-0 left-0 w-20 h-20 rounded-tl-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-transparent animate-pulse"></div>
            <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-yellow-400 via-amber-500 to-transparent animate-pulse"></div>
            {/* Moving border animation */}
            <div className="absolute top-0 left-0 w-6 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent opacity-80" style={{ animation: 'corner-sweep-horizontal 3s ease-in-out infinite' }}></div>
            <div className="absolute top-0 left-0 w-0.5 h-6 bg-gradient-to-b from-yellow-400 to-transparent opacity-80" style={{ animation: 'corner-sweep-vertical 3s ease-in-out infinite 0.5s' }}></div>
            {/* Glow effect from top-left corner */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-radial from-yellow-400/8 via-amber-500/4 via-transparent to-transparent" style={{ background: 'radial-gradient(circle at top left, rgba(251, 191, 36, 0.08) 0%, rgba(245, 158, 11, 0.04) 30%, transparent 60%)' }}></div>
          </div>

          {/* VIP corner accent - bottom-right */}
          <div className="absolute bottom-0 right-0 w-20 h-20 rounded-br-xl overflow-hidden">
            <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-yellow-400 via-amber-500 to-transparent animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-yellow-400 via-amber-500 to-transparent animate-pulse"></div>
            {/* Moving border animation */}
            <div className="absolute bottom-0 right-0 w-6 h-0.5 bg-gradient-to-l from-yellow-400 to-transparent opacity-80" style={{ animation: 'corner-sweep-horizontal-reverse 3s ease-in-out infinite' }}></div>
            <div className="absolute bottom-0 right-0 w-0.5 h-6 bg-gradient-to-t from-yellow-400 to-transparent opacity-80" style={{ animation: 'corner-sweep-vertical-reverse 3s ease-in-out infinite 0.5s' }}></div>
            {/* Glow effect from bottom-right corner */}
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-radial from-yellow-400/8 via-amber-500/4 via-transparent to-transparent" style={{ background: 'radial-gradient(circle at bottom right, rgba(251, 191, 36, 0.08) 0%, rgba(245, 158, 11, 0.04) 30%, transparent 60%)' }}></div>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 text-center">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {steps.map((step, index) => (
                <div key={index} className="relative scroll-animate" style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="bg-background border border-border rounded-lg p-4 h-full">
                    <div className="text-4xl font-bold text-primary/30 mb-3">{step.number}</div>
                    <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="scroll-animate">
              <h3 className="text-lg font-bold mb-3">Why This Offer?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                I believe in earning your trust through results. This free demo lets you experience my development
                skills before making any commitment.
              </p>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 scroll-animate">
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1 text-sm">Quick Turnaround</h4>
                    <p className="text-xs text-muted-foreground">Get your demo within 3-5 business days</p>
                  </div>
                </div>
              </div>
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1 text-sm">Zero Risk</h4>
                    <p className="text-xs text-muted-foreground">No payment required until you're satisfied</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-border scroll-animate">
            <Button
              onClick={handleHireMeClick}
              size="lg"
              className="group relative bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black font-semibold transition-all duration-300 border-0 cursor-pointer overflow-hidden"
            >
              {/* Shiny effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative z-10">Hire Me</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 relative z-10" />
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Ready to see what I can build for you? Let's get started!
            </p>
          </div>
        </div>

        <div className="text-center scroll-animate">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">1 client</span> has already experienced this risk-free
            approach
          </p>
        </div>
      </div>
    </section>
  )
}
