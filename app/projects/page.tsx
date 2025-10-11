"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Code2, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: 7,
    title: "Anime Website",
    description:
      "A comprehensive anime streaming platform with user authentication, watchlists, and detailed anime information.",
    image: "https://i.postimg.cc/Df4Hckqq/image.jpg",
    tags: ["Real Project"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "API"],
    liveUrl: "#",
    githubUrl: "#",
    category: "real",
    hasArticle: true,
    articleUrl: "/projects/anime-website",
  },
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    image: "/modern-ecommerce-dashboard.png",
    tags: ["Real Project"],
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    category: "real",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates, team collaboration, and progress tracking.",
    image: "/task-management-app.png",
    tags: ["Real Project"],
    techStack: ["Next.js", "TypeScript", "Supabase"],
    liveUrl: "#",
    githubUrl: "#",
    category: "real",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Interactive weather dashboard with real-time data, forecasts, and beautiful visualizations.",
    image: "/weather-dashboard-interface.png",
    tags: ["Practice"],
    techStack: ["React", "API Integration", "Chart.js"],
    liveUrl: "#",
    githubUrl: "#",
    category: "practice",
  },
  {
    id: 4,
    title: "Portfolio CMS",
    description: "Content management system for portfolio websites with drag-and-drop builder and SEO optimization.",
    image: "/cms-dashboard-interface.jpg",
    tags: ["Real Project"],
    techStack: ["Next.js", "Tailwind", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    category: "real",
  },
  {
    id: 5,
    title: "Chat Application",
    description: "Real-time chat application with group messaging, file sharing, and emoji reactions.",
    image: "/chat-application-interface.png",
    tags: ["Practice"],
    techStack: ["React", "Socket.io", "Express"],
    liveUrl: "#",
    githubUrl: "#",
    category: "practice",
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description: "Personal fitness tracking app with workout plans, progress charts, and nutrition logging.",
    image: "/fitness-tracker-app.png",
    tags: ["Real Project"],
    techStack: ["React Native", "Firebase", "Redux"],
    liveUrl: "#",
    githubUrl: "#",
    category: "real",
  },
]

export default function AllProjectsPage() {
  const [filter, setFilter] = useState<"all" | "real" | "practice">("all")

  const filteredProjects = projects.filter((project) => (filter === "all" ? true : project.category === filter))

  const stats = {
    total: projects.length,
    real: projects.filter((p) => p.category === "real").length,
    practice: projects.filter((p) => p.category === "practice").length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 px-4 relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-8 group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Portfolio</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              All <span className="text-primary">Projects</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl text-pretty">
              Explore my complete portfolio of web development projects, from client work to personal experiments and
              practice builds.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{stats.total}</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-400">{stats.real}</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Real Projects</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-400">{stats.practice}</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Practice Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 mb-12">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="rounded-full"
            >
              All Projects ({stats.total})
            </Button>
            <Button
              variant={filter === "real" ? "default" : "outline"}
              onClick={() => setFilter("real")}
              className="rounded-full"
            >
              Real Projects ({stats.real})
            </Button>
            <Button
              variant={filter === "practice" ? "default" : "outline"}
              onClick={() => setFilter("practice")}
              className="rounded-full"
            >
              Practice ({stats.practice})
            </Button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Category Tag */}
                  <div className="absolute top-4 left-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
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
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={project.liveUrl}
                      className="p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="View live project"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="View source code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View More button for projects with articles */}
                  {project.hasArticle && (
                    <Link href={project.articleUrl}>
                      <Button variant="outline" size="sm" className="w-full group/btn bg-transparent">
                        View More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
