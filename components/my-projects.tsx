"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { ExternalLink, Github, Code2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: 1,
    title: "Anime Website",
    description:
      "A comprehensive anime streaming platform with user authentication, watchlists, and detailed anime information.",
    image: "https://i.postimg.cc/Df4Hckqq/image.jpg",
    tags: ["Real Project"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "API"],
    liveUrl: "https://animespheree.netlify.app/",
    githubUrl: "#",
    category: "real",
    hasArticle: true,
    articleUrl: "/projects/anime-website",
  },
]

export function MyProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const [filter, setFilter] = useState<"all" | "real" | "practice">("all")

  const handleViewAllClick = useCallback(() => {
    router.push('/projects')
  }, [router])

  const filteredProjects = projects.filter((project) => (filter === "all" ? true : project.category === filter))

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
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 relative overflow-hidden">
      {/* Background Effects */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}

        {/* Projects Header (Optional, could just be whitespace now) */}
        <div className="mb-12" />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-zinc-900/30 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden hover:border-white/15 transition-all duration-500 hover:-translate-y-1 scroll-animate"
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden bg-zinc-950">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

                {/* Minimal Category Tag */}
                <div className="absolute top-5 left-5">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-block px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] backdrop-blur-md bg-zinc-950/70 text-zinc-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Monochrome Hover Links */}
                <div className="absolute top-5 right-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors duration-300"
                    aria-label="View live project"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-7 space-y-5">
                <div className="space-y-2.5">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Grayscale Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[9px] font-semibold rounded-md bg-zinc-900 text-zinc-500 border border-white/5 uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Minimalist Action */}
                {project.hasArticle && (
                  <Link href={project.articleUrl} className="block">
                    <Button variant="outline" size="lg" className="w-full h-12 rounded-lg group/btn bg-transparent border-white/10 text-zinc-300 font-semibold text-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                      View Project
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12 scroll-animate">
          <Button
            onClick={handleViewAllClick}
            size="lg"
            variant="outline"
            className="rounded-full group bg-transparent cursor-pointer text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
          >
            View All Projects
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
