"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import ProfileCard from "@/components/ui/profile-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { projectsData } from "@/lib/projects-data"

const projects = projectsData.map((p, index) => ({
  id: index + 1,
  ...p,
  articleUrl: `/projects/${p.slug}`,
}))

export default function AllProjectsPage() {
  const sectionRef = useScrollAnimation()

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Header />

      <main ref={sectionRef}>
        {/* Hero Section */}
        <section className="pt-48 pb-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
            <span className="text-[clamp(10rem,30vw,25rem)] font-black text-white/[0.02] tracking-tighter uppercase leading-none block">
              Works
            </span>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-primary/10 blur-[150px] -z-10 rounded-full opacity-60" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="space-y-16 text-center md:text-left">
              <div className="space-y-8 scroll-animate">
                <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-none text-white">
                  Selected Works
                </h1>
                <p className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed font-normal">
                  A curation of digital experiences crafted with a focus on
                  functional elegance and performance.
                </p>
              </div>

              <div className="flex items-center gap-10 scroll-animate border-t border-white/5 w-fit pt-10 mx-auto md:mx-0">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-white tabular-nums">{projects.length}</span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Total Projects</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-4 sm:px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center mb-20 scroll-animate">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-500 border-b border-white/10 pb-4">
                Full Collection
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
                    <div className={`space-y-10 ${index % 2 !== 0 ? 'lg:[direction:ltr]' : ''}`}>
                      <div className="space-y-4">
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] group-hover:text-zinc-100 transition-colors duration-500">
                          {project.title}
                        </h3>
                        <p className="text-base sm:text-lg text-zinc-500 leading-relaxed max-w-lg">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
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
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </Link>
                    </div>
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
