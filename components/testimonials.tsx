"use client"

import { Star, QuoteIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechVision Inc",
    image: "/professional-woman-executive.png",
    quote:
      "Famim delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise made the entire process smooth and efficient. Highly recommended!",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Startup Founder",
    company: "DataFlow Systems",
    image: "/professional-executive-man.png",
    quote:
      "Working with Famim was a game-changer for our business. He understood our vision perfectly and built a product that our customers absolutely love. Professional and reliable!",
    rating: 5,
  },
  {
    name: "Emily Thompson",
    role: "CEO",
    company: "InnovateLabs",
    image: "/professional-woman-founder.png",
    quote:
      "Famim's level of professionalism and technical skill is outstanding. He took our complex requirements and turned them into an elegant, performant solution. Will definitely work with him again!",
    rating: 5,
  },
]

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.05),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">Client Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative h-full group">
                {/* Card */}
                <div className="relative h-full p-8 rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <QuoteIcon className="w-16 h-16 text-primary" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground/90 text-base mb-8 leading-relaxed italic">"{testimonial.quote}"</p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Verified Badge */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center ring-2 ring-background">
                        <svg
                          className="w-3 h-3 text-primary-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-primary font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div
          className={`text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-full bg-card/30 backdrop-blur-sm border border-border/50">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">4.9/5</span>
              <span className="text-sm text-muted-foreground">Average Rating</span>
            </div>
            <div className="w-px h-8 bg-border/50" />
            <div className="flex items-center gap-2">
              <span className="font-semibold">50+</span>
              <span className="text-sm text-muted-foreground">Happy Clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
