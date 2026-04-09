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
        -translate-x-1/2 rounded-[100%] border-[#B48CDE] bg-black 
        bg-[radial-gradient(closest-side,#000_85%,rgba(255,255,255,0.12))] 
        animate-fade-up"
      />

      {/* Eyebrow */}
      {eyebrow && (
        <a href="#" className="group">
          <span
            className="text-sm text-gray-400 font-geist mx-auto px-5 py-2 
            bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent  
            border-[2px] border-white/5 
            rounded-3xl w-fit tracking-tight uppercase flex items-center justify-center"
          >
            {eyebrow}
            <ChevronRight className="inline w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </a>
      )}

      {/* Title */}
      <h1
        className="animate-fade-in -translate-y-4 text-balance 
        bg-gradient-to-br from-white from-30% to-white/40 
        bg-clip-text py-6 text-5xl font-semibold leading-none tracking-tighter 
        text-transparent opacity-0 sm:text-6xl md:text-7xl lg:text-8xl"
      >
        {(() => {
          const roleRegex = /boutique development studio|development studio|web developer/i
          if (roleRegex.test(title)) {
            const parts = title.split(roleRegex)
            const before = (parts[0] || '')
            const after = parts[1] || ''

            // Force two lines: first is everything before the newline (usually "Hello I'm ..."),
            // second starts with "A " then the animated RoleFlip.
            const [line1Raw, line2Raw] = before.split(/\r?\n+/)
            // Remove trailing "A " from line1 if present
            const line1 = ((line1Raw || '').replace(/\s*and\s+a\s*$/i, '')).trim()
            // Ensure prefix "A " exists on line 2
            let prefix = (line2Raw || '').trim()
            if (!/^and\s+a\b/i.test(prefix)) {
              prefix = ''
            }

            return (
              <>
                <span className="block">{line1}</span>
                <span className="block">
                  {prefix}{' '}
                  <span className="align-middle">
                    <RoleFlip />
                  </span>
                </span>
                {after}
              </>
            )
          }
          // Fallback: if no marker, respect newlines
          return title.split(/\n+/).map((seg, i) => (
            <span key={i} className="block">{seg}</span>
          ))
        })()}
      </h1>

      {/* Subtitle */}
      <p
        className="animate-fade-in mb-12 -translate-y-4 text-balance 
        text-lg tracking-tight text-gray-400 
        opacity-0 md:text-xl"
      >
        {subtitle}
      </p>

      {/* CTA */}
      {ctaLabel && (
        <div className="flex justify-center">
          <Button
            asChild
            className="mt-[-20px] w-fit md:w-52 z-20 font-geist tracking-tighter text-center text-lg"
          >
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      )}

      {/* Bottom Fade */}
      <div
        className="animate-fade-up relative mt-32 opacity-0 [perspective:2000px] 
        after:absolute after:inset-0 after:z-50 
        after:[background:linear-gradient(to_top,hsl(var(--background))_10%,transparent)]"
      />
    </section>
  )
}
