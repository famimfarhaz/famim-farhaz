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

const projects = [
  // ... (projects array kept exactly as it was)
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
    title: "BG Remover",
    description:
      "AI-powered background removal tool with drag & drop interface, real-time processing, and mobile support.",
    image: "https://i.postimg.cc/13sry6w3/Screenshot-2025-10-12-092706.png",
    tags: ["Practice Project"],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Remove.bg API", "Capacitor"],
    liveUrl: "https://bg-remover-hd.netlify.app/",
    githubUrl: "#",
    category: "practice",
    hasArticle: true,
    articleUrl: "/projects/bg-remover",
  },
  {
    id: 3,
    title: "Bistro",
    description:
      "Modern restaurant consulting agency website with advanced animations, multi-page navigation, and profit optimization strategies.",
    image: "https://i.postimg.cc/7PTLZWn9/Screenshot-2025-10-12-094950.png",
    tags: ["Practice Project"],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "React Router"],
    liveUrl: "https://bistro-portfolio.netlify.app/",
    githubUrl: "#",
    category: "practice",
    hasArticle: true,
    articleUrl: "/projects/bistro",
  },
  {
    id: 4,
    title: "File Organizer Pro",
    description:
      "Smart file management system with automatic organization, custom animations, and ZIP generation with progress tracking.",
    image: "https://i.postimg.cc/zXQZHzDJ/Screenshot-2025-10-12-100455.png",
    tags: ["Practice Project"],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "JSZip", "React Router"],
    liveUrl: "#",
    githubUrl: "#",
    category: "practice",
    hasArticle: true,
    articleUrl: "/projects/file-organizer",
  },
  {
    id: 5,
    title: "IndieMVP",
    description:
      "Comprehensive platform for discovering real problems and building winning MVPs with pain point analysis, idea evaluation, and business tools.",
    image: "https://i.postimg.cc/QC1Djv55/Screenshot-2025-10-12-102242.png",
    tags: ["Practice Project"],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "React Router", "Recharts"],
    liveUrl: "https://indiemvp.netlify.app/",
    githubUrl: "#",
    category: "practice",
    hasArticle: true,
    articleUrl: "/projects/indiemvp",
  },
  {
    id: 6,
    title: "Billosity",
    description:
      "Premium invoice management SaaS platform with AI document extraction, business growth tracking, and comprehensive dashboard analytics.",
    image: "https://i.postimg.cc/W1SbZx36/Screenshot-2025-10-12-113610.png",
    tags: ["Practice Project"],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Framer Motion", "React Hook Form", "Recharts", "Tesseract.js"],
    liveUrl: "https://billosity.netlify.app/",
    githubUrl: "#",
    category: "practice",
    hasArticle: true,
    articleUrl: "/projects/billosity",
  },
  {
    id: 7,
    title: "Noteorp",
    description:
      "All-in-one productivity platform unifying notes, tasks, habits, focus tools, email, AI assistance, and collaboration in one intelligent workspace.",
    image: "https://i.postimg.cc/VLhRLZ88/Screenshot-2025-10-18-003219.png",
    tags: ["Practice Project"],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "TipTap", "Framer Motion", "Zustand", "Dexie", "Yjs", "Groq AI", "Gemini AI", "Tesseract.js"],
    liveUrl: "https://noteorp.netlify.app/",
    githubUrl: "#",
    category: "practice",
    hasArticle: true,
    articleUrl: "/projects/noteorp",
  },
  {
    id: 8,
    title: "SEREN",
    description:
      "Luxury fashion e-commerce platform with advanced filtering, cart, and premium UI/UX.",
    image: "https://i.postimg.cc/SsDCKbKR/Hero_section.png",
    tags: ["Practice Project"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI"],
    liveUrl: "#",
    githubUrl: "#",
    category: "practice",
    hasArticle: true,
    articleUrl: "/projects/seren",
  },
  {
    id: 9,
    title: "Vector AI",
    description:
      "Advanced AI assistant with Google Gemini, web search, image generation, and text-to-speech capabilities.",
    image: "https://i.postimg.cc/FKnXgQDW/Chat.png",
    tags: ["Practice Project"],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Google Gemini AI", "Radix UI", "Three.js"],
    liveUrl: "#",
    githubUrl: "#",
    category: "practice",
    hasArticle: true,
    articleUrl: "/projects/vector-ai",
  },
]

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
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-4 relative overflow-hidden">
          {/* Subtle Background Effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full" />
          <div className="absolute top-[20%] -right-[10%] w-[400px] h-[400px] bg-primary/10 blur-[100px] -z-10 rounded-full" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="space-y-8 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm scroll-animate mx-auto md:mx-0">
                <Code2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold uppercase tracking-widest text-primary">Portfolio Showcase</span>
              </div>

              <div className="space-y-4 scroll-animate">
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
                  My <span className="text-primary italic">Projects</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  A curated collection of my real-world applications and experimental
                  builds showcasing my evolution in digital craftsmanship.
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12 pt-4 scroll-animate">
                <div className="flex flex-col gap-1">
                  <span className="text-4xl font-black text-primary tracking-tighter tabular-nums">{stats.total}</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total Projects</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-4xl font-black text-green-400 tracking-tighter tabular-nums">{stats.real}</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Real World</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-4xl font-black text-blue-400 tracking-tighter tabular-nums">{stats.practice}</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Practice Labs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-16 scroll-animate">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className="rounded-full px-6 font-bold uppercase text-xs tracking-widest"
              >
                All Projects ({stats.total})
              </Button>
              <Button
                variant={filter === "real" ? "default" : "outline"}
                onClick={() => setFilter("real")}
                className="rounded-full px-6 font-bold uppercase text-xs tracking-widest"
              >
                Real Projects ({stats.real})
              </Button>
              <Button
                variant={filter === "practice" ? "default" : "outline"}
                onClick={() => setFilter("practice")}
                className="rounded-full px-6 font-bold uppercase text-xs tracking-widest"
              >
                Practice ({stats.practice})
              </Button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-animate">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group relative bg-card/30 backdrop-blur-xl rounded-[2rem] border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-3"
                  style={{
                    animation: `fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s both`,
                  }}
                >
                  {/* Project Image */}
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Category Tag */}
                    <div className="absolute top-6 left-6">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md ${tag === "Real Project"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Hover Links */}
                    <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-2xl bg-background/80 backdrop-blur-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-xl"
                        aria-label="View live project"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="p-3 rounded-2xl bg-background/80 backdrop-blur-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-xl"
                        aria-label="View source code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-[10px] font-bold rounded-full bg-primary/5 text-primary border border-primary/10 uppercase tracking-tighter"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* View More button for projects with articles */}
                    {project.hasArticle && (
                      <Link href={project.articleUrl}>
                        <Button variant="outline" size="lg" className="w-full rounded-2xl group/btn bg-transparent border-border/50 font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-500">
                          View Case Study
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Profile Card Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 scroll-animate">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                Collaboration
              </div>
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
