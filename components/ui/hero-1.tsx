"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RoleFlip } from "@/components/ui/flip-words"

interface HeroProps {
  eyebrow?: string
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
}

export function Hero({
  eyebrow = "Innovate Without Limits",
  title,
  subtitle,
  ctaLabel = "Explore Now",
  ctaHref = "#",
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full px-6 text-center md:px-8 
      min-h-screen overflow-hidden 
      bg-[linear-gradient(to_bottom,#000,#000_40%,rgba(137,142,142,0.15)_85%,rgba(255,255,255,0.08)_100%)] 
      rounded-b-xl flex flex-col items-center justify-center"
    >
      {/* Grid BG */}
      <div
        className="absolute -z-10 inset-0 opacity-80 h-[600px] w-full 
        bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)]
        bg-[size:6rem_5rem] 
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      {/* Radial Accent */}
      <div
        className="absolute left-1/2 top-[calc(100%-90px)] lg:top-[calc(100%-150px)] 
        h-[500px] w-[700px] md:h-[500px] md:w-[1100px] lg:h-[750px] lg:w-[140%] 
        -translate-x-1/2 rounded-[100%] border-white/20 bg-black 
        bg-[radial-gradient(closest-side,#000_85%,rgba(255,255,255,0.12))] 
        animate-fade-up"
      />

      {/* Eyebrow / Pill */}
      {eyebrow && (
        <div className="flex justify-center mb-3 sm:mb-6 animate-fade-in">
          <span
            className="text-[10px] sm:text-xs text-gray-400 font-geist px-4 py-1.5 
            border border-white/10 rounded-full tracking-widest uppercase 
            bg-white/[0.02] backdrop-blur-sm scale-[0.85] sm:scale-100"
          >
            {eyebrow}
          </span>
        </div>
      )}

      {/* Title */}
      <h1
        className="animate-fade-in text-balance 
        bg-gradient-to-br from-white from-30% to-white/60 
        bg-clip-text text-[2.25rem] sm:text-6xl md:text-7xl lg:text-8xl 
        font-bold leading-[1.1] sm:leading-[1.05] tracking-[-0.02em] sm:tracking-[-0.04em] 
        text-transparent opacity-0 mb-4 sm:mb-6"
      >
        {(() => {
          const roleRegex = /boutique development studio|development studio|web developer/i
          if (roleRegex.test(title)) {
            const parts = title.split(roleRegex)
            const before = (parts[0] || '')
            const after = parts[1] || ''

            const [line1Raw, line2Raw] = before.split(/\r?\n+/)
            const line1 = ((line1Raw || '').replace(/\s*and\s+a\s*$/i, '')).trim()
            let prefix = (line2Raw || '').trim()
            if (!/^and\s+a\b/i.test(prefix)) {
              prefix = ''
            }

            return (
              <>
                <span className="sm:block inline">{line1}</span>
                <span className="sm:block inline">
                  {prefix}{' '}
                  <span className="align-middle">
                    <RoleFlip />
                  </span>
                </span>
                {after}
              </>
            )
          }
          return title.split(/\n+/).map((seg, i) => (
            <span key={i} className="sm:block inline">{seg} </span>
          ))
        })()}
      </h1>

      {/* Subtitle */}
      <p
        className="animate-fade-in mb-8 sm:mb-14 text-balance 
        text-base sm:text-lg lg:text-xl leading-[1.5] sm:leading-relaxed 
        tracking-tight text-zinc-400 opacity-0 
        max-w-[90%] sm:max-w-2xl mx-auto px-4 sm:px-0"
      >
        {subtitle}
      </p>

      {/* CTA */}
      {ctaLabel && (
        <div className="flex justify-center animate-fade-in">
          <Button
            asChild
            className="w-full sm:w-[52%] md:w-52 z-20 font-geist tracking-tighter text-center text-lg py-[14px] sm:py-6 h-auto"
          >
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      )}

      {/* Bottom Fade */}
      <div
        className="animate-fade-up relative mt-24 sm:mt-32 opacity-0 [perspective:2000px] 
        after:absolute after:inset-0 after:z-50 
        after:[background:linear-gradient(to_top,hsl(var(--background))_10%,transparent)]"
      />
    </section>
  )
}
