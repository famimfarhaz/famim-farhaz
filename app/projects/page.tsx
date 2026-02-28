"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Code2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import ProfileCard from "@/components/ui/profile-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { projectsData } from "@/lib/projects-data"

const projects = projectsData.map((p, index) => ({
  id: index + 1,
  ...p,
  tags: [p.category],
  articleUrl: `/projects/${p.slug}`,
  hasArticle: true
}))

export default function AllProjectsPage() {
  const [filter, setFilter] = useState<"all" | "real" | "practice">("all")
  const sectionRef = useScrollAnimation()

  const filteredProjects = projects.filter((project) => (filter === "all" ? true : project.category === filter))

  const stats = {
    total: projects.length,
    real: projects.filter((p) => p.category === "real").length,
    practice: projects.filter((p) => p.category === "practice").length,
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Header />

      <main ref={sectionRef}>
        {/* Polished Atmospheric Hero Section */}
        <section className="pt-48 pb-16 px-6 relative overflow-hidden">
          {/* Architectural Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* Large Atmospheric Background Title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
            <span className="text-[clamp(10rem,30vw,25rem)] font-black text-white/[0.02] tracking-tighter uppercase leading-none block">
              Works
            </span>
          </div>

          {/* Enhanced Background Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-primary/10 blur-[150px] -z-10 rounded-full opacity-60" />
          <div className="absolute top-[10%] -right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="space-y-16 text-center md:text-left">
              <div className="space-y-8 scroll-animate">
                <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-none text-white">
                  Selected Works
                </h1>
                <p className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed font-normal">
                  A curation of digital experiences crafted with a focus on
                  functional elegance and performance.
                </p>
              </div>

              {/* Minimal Information Bar */}
              <div className="flex items-center gap-10 scroll-animate border-t border-white/5 w-fit pt-10 mx-auto md:mx-0">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-white tabular-nums">{stats.total}</span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Total Projects</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Project display header without filters */}
            <div className="flex justify-center mb-16 scroll-animate">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-500 border-b border-white/10 pb-4">
                Full Collection
              </h2>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-animate">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group relative bg-zinc-900/30 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden hover:border-white/15 transition-all duration-500 hover:-translate-y-1"
                  style={{
                    animation: `fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s both`,
                  }}
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
                      <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed">
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
          </div>
        </section>

        {/* Profile Card Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                Let's Work <span className="text-primary italic">Together</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Have a project in mind? Let's collaborate and bring your ideas to life
                with precision and modern digital craftsmanship.
              </p>
            </div>
            <div className="scroll-animate">
              <ProfileCard />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
