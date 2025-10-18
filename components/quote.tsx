"use client"

import { useEffect, useRef, useState } from "react"

export function Quote() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Large Opening Quote Mark */}
            <div
              className={`absolute -top-8 -left-4 md:-left-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <span className="text-[120px] md:text-[180px] font-serif leading-none text-primary/20 select-none">
                "
              </span>
            </div>

            {/* Quote Content Card */}
            <div className="relative border border-border/50 rounded-2xl bg-card/30 backdrop-blur-sm p-8 md:p-12 lg:p-16">
              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/30 rounded-br-2xl" />

              <blockquote
                className={`relative transition-all duration-1000 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <p className="text-3xl md:text-4xl lg:text-5xl font-serif text-balance leading-relaxed text-foreground/90 italic">
                  I don’t just build <span className="text-primary font-semibold not-italic">Websites</span>, I build digital{" "}
                  <span className="text-primary font-semibold not-italic">legacies.</span>
                </p>
              </blockquote>

              {/* Attribution Style Element */}
              <div
                className={`mt-8 flex items-center gap-4 transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
              >
                <div className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent" />
                <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
                  My Philosophy
                </span>
              </div>
            </div>

            {/* Large Closing Quote Mark */}
            <div
              className={`absolute -bottom-8 -right-4 md:-right-12 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <span className="text-[120px] md:text-[180px] font-serif leading-none text-primary/20 select-none">
                "
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
