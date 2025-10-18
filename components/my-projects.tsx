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
  {
    id: 2,
    title: "Bistro",
    description:
      "Modern restaurant consulting agency website with advanced animations, multi-page navigation, and profit optimization strategies.",
    image: "https://i.postimg.cc/7PTLZWn9/Screenshot-2025-10-12-094950.png",
    tags: ["Practice Project"],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://bistro-portfolio.netlify.app/",
    githubUrl: "#",
    category: "practice",
    hasArticle: true,
    articleUrl: "/projects/bistro",
  },
  {
    id: 3,
    title: "IndieMVP",
    description:
      "Comprehensive platform for discovering real problems and building winning MVPs with pain point analysis, idea evaluation, and business tools.",
    image: "https://i.postimg.cc/QC1Djv55/Screenshot-2025-10-12-102242.png",
    tags: ["Practice Project"],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
    liveUrl: "https://indiemvp.netlify.app/",
    githubUrl: "#",
    category: "practice",
    hasArticle: true,
    articleUrl: "/projects/indiemvp",
  },
  {
    id: 4,
    title: "Billosity",
    description:
      "Premium invoice management SaaS platform with AI document extraction, business growth tracking, and comprehensive dashboard analytics.",
    image: "https://i.postimg.cc/W1SbZx36/Screenshot-2025-10-12-113610.png",
    tags: ["Practice Project"],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
    liveUrl: "https://billosity.netlify.app/",
    githubUrl: "#",
    category: "practice",
    hasArticle: true,
    articleUrl: "/projects/billosity",
  },
  {
    id: 5,
    title: "BG Remover",
    description:
      "AI-powered background removal tool with drag & drop interface, real-time processing, and mobile support.",
    image: "https://i.postimg.cc/13sry6w3/Screenshot-2025-10-12-092706.png",
    tags: ["Practice Project"],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Remove.bg API"],
    liveUrl: "https://bg-remover-hd.netlify.app/",
    githubUrl: "#",
    category: "practice",
    hasArticle: true,
    articleUrl: "/projects/bg-remover",
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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4 scroll-animate">
          <div className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
            <Code2 className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">My Projects</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
            Featured <span className="text-primary">Project</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            AnimeSphere - A full-featured anime streaming platform with advanced social features and AI moderation.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12 scroll-animate">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="rounded-full text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2"
          >
            All Projects
          </Button>
          <Button
            variant={filter === "real" ? "default" : "outline"}
            onClick={() => setFilter("real")}
            className="rounded-full text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2"
          >
            Real Projects
          </Button>
          <Button
            variant={filter === "practice" ? "default" : "outline"}
            onClick={() => setFilter("practice")}
            className="rounded-full text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2"
          >
            Practice
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 scroll-animate"
            >
              {/* Project Image */}
              <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-muted">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Category Tag */}
                <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        tag === "Real Project"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover Links */}
                <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={project.liveUrl}
                    className="p-1.5 sm:p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="View live project"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="p-1.5 sm:p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="View source code"
                  >
                    <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 sm:px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View More button for projects with articles */}
                {project.hasArticle && (
                  <Link href={project.articleUrl}>
                    <Button variant="outline" size="sm" className="w-full group/btn bg-transparent text-xs sm:text-sm py-1 sm:py-2">
                      View More
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                )}
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
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
