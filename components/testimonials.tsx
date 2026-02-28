"use client"

import { Star, QuoteIcon, Award, TrendingUp } from "lucide-react"
import { useEffect, useRef } from "react"

const testimonials = [
  {
    name: "Ajmain Eram",
    role: "Founder & CEO",
    company: "AnimeSphere",
    image: "https://i.postimg.cc/2yG6MnwX/548279607-764428009899677-7913298609794206195-n.png",
    quote:
      "Famim built our anime platform AnimeSphere beautifully. Great communication, delivered exactly what we wanted, and the site works perfectly. Highly recommend working with him!",
    rating: 5,
  },
]

export function Testimonials() {
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
      element.style.transitionDelay = `${index * 100}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12 scroll-animate">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Client <span className="text-yellow-400 font-bold border-b border-yellow-400/30 pb-0.5">Success Stories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real feedback from real clients who trusted me with their vision. See what they have to say about the experience.
          </p>
        </div>

        {/* Main Testimonial Card */}
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

          {/* Featured Badge */}
          <div className="mb-6 scroll-animate">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-medium">
              <Award className="w-4 h-4" />
              <span>Featured Client Review</span>
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="scroll-animate" style={{ transitionDelay: `${index * 100}ms` }}>
                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-center mb-8 leading-relaxed font-medium">
                  <QuoteIcon className="w-8 h-8 text-yellow-400/30 mx-auto mb-4" />
                  "{testimonial.quote}"
                </blockquote>

                {/* Author Section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6 border-t border-border">
                  {/* Author Image */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-yellow-400/20">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Verified Badge */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center ring-2 ring-background">
                      <svg
                        className="w-4 h-4 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="text-center md:text-left">
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-muted-foreground">{testimonial.role}</div>
                    <div className="text-yellow-400 font-semibold">{testimonial.company}</div>
                  </div>

                  {/* Success Metrics */}
                  <div className="hidden md:block w-px h-12 bg-border" />
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-yellow-400 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-bold">100%</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-yellow-400 mb-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold">5.0</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center scroll-animate">
          <p className="text-sm text-muted-foreground">
            <span className="text-yellow-400 font-semibold">1 satisfied client</span> and counting – ready to be the next success story?
          </p>
        </div>
      </div>
    </section>
  )
}