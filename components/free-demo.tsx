"use client"

import { ArrowRight, CheckCircle2, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef } from "react"

export function FreeDemo() {
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

    const elements = sectionRef.current?.querySelectorAll(".fade-in")
    elements?.forEach((el) => observer.observe(el))

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
        <div className="text-center mb-12 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Book Your <span className="text-primary">Free Demo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Not sure about hiring? Let me prove my skills by building a free demo of your project. No strings attached,
            no upfront costs.
          </p>
        </div>

        <div
          className="bg-card border border-border rounded-xl p-6 md:p-8 mb-8 fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 text-center">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {steps.map((step, index) => (
                <div key={index} className="relative">
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
            <div>
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

            <div className="space-y-3">
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

          <div className="text-center pt-4 border-t border-border">
            <Link href="/contact">
              <Button size="lg" className="group">
                Hire Me
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-3">
              Ready to see what I can build for you? Let's get started!
            </p>
          </div>
        </div>

        <div className="text-center fade-in" style={{ animationDelay: "0.2s" }}>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">50+ clients</span> have already experienced this risk-free
            approach
          </p>
        </div>
      </div>
    </section>
  )
}
