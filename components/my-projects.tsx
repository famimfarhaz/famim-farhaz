"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { ArrowRight, ArrowUpRight, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { projectsData } from "@/lib/projects-data"

const projects = projectsData.map((p, index) => ({
  id: index + 1,
  ...p,
  articleUrl: `/projects/${p.slug}`,
}))

export function MyProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const router = useRouter()

  const handleViewAllClick = useCallback(() => {
    router.push('/projects')
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
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".scroll-animate")
    elements?.forEach((el, index) => {
      const element = el as HTMLElement
      element.style.opacity = '0'
      element.style.transform = 'translateY(60px)'
      element.style.transition = `all 1s cubic-bezier(0.22, 1, 0.36, 1)`
      element.style.transitionDelay = `${index * 150}ms`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20 md:mb-28 scroll-animate">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-white/20" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">Selected Work</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
            Built to Prove a Point.
          </h2>
        </div>

        {/* Projects List */}
        <div className="space-y-16 md:space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="scroll-animate"
            >
              {/* Divider */}
              <div className="flex items-center gap-6 mb-10">
                <span className="text-sm font-mono text-zinc-600 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>

              <div className={`group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${index % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}>
                {/* Text Content */}
                <div className={`space-y-8 ${index % 2 !== 0 ? 'lg:[direction:ltr]' : ''}`}>
                  {/* Title */}
                  <div className="space-y-4">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] group-hover:text-zinc-100 transition-colors duration-500">
                      {project.title}
                    </h3>
                    <p className="text-base sm:text-lg text-zinc-500 leading-relaxed max-w-lg">
                      {project.description}
                    </p>
                  </div>

                  {/* Action Buttons - Desktop Only */}
                  <div className="hidden lg:flex flex-wrap gap-3 pt-2">
                    <Link href={project.articleUrl}>
                      <Button className="h-12 px-7 rounded-full bg-white text-black hover:bg-zinc-200 font-bold text-sm transition-all duration-300 active:scale-[0.97] group/btn">
                        View Project
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/pricing">
                      <Button variant="ghost" className="h-12 px-7 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.05] font-bold text-sm transition-all duration-300 border border-white/[0.06] hover:border-white/[0.12] group/btn2">
                        Want One Like This?
                        <Handshake className="w-4 h-4 ml-2 group-hover/btn2:scale-110 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Project Image */}
                <div className={`${index % 2 !== 0 ? 'lg:[direction:ltr]' : ''}`}>
                  <Link href={project.articleUrl} className="block">
                    <div className="relative aspect-[16/10] rounded-2xl lg:rounded-3xl overflow-hidden border border-white/[0.06] bg-zinc-900/50 cursor-pointer">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-[1.04]"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* Hover arrow */}
                      <div className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>

                  {/* Action Buttons - Mobile Only */}
                  <div className="flex lg:hidden flex-wrap gap-3 pt-6 md:pt-8">
                    <Link href={project.articleUrl}>
                      <Button className="h-11 px-6 rounded-full bg-white text-black hover:bg-zinc-200 font-bold text-xs transition-all duration-300 active:scale-[0.97] group/btn">
                        View Project
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/pricing">
                      <Button variant="ghost" className="h-11 px-6 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.05] font-bold text-xs transition-all duration-300 border border-white/[0.06] hover:border-white/[0.12] group/btn2">
                        Want One Like This?
                        <Handshake className="w-4 h-4 ml-2 group-hover/btn2:scale-110 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-20 md:mt-32 scroll-animate">
          <Button
            onClick={handleViewAllClick}
            size="lg"
            variant="outline"
            className="h-14 px-10 rounded-full group bg-transparent cursor-pointer text-sm font-bold tracking-wide border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
