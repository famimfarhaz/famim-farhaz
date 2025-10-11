import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, User, Code2, Zap, Shield, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AnimeWebsitePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-12 px-4 border-b border-border/50">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-green-400">Real Project</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                Anime Website <span className="text-primary">Platform</span>
              </h1>

              <p className="text-xl text-muted-foreground text-pretty">
                A comprehensive anime streaming platform with user authentication, watchlists, and detailed anime
                information powered by modern web technologies.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Completed: January 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Role: Full-Stack Developer</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Source
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Project Overview */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <div className="w-1 h-8 bg-primary rounded-full" />
                Project Overview
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Anime Website is a modern streaming platform designed to provide anime enthusiasts with a seamless
                  browsing and watching experience. Built with Next.js and TypeScript, the platform features a clean,
                  responsive interface that works flawlessly across all devices.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Users can explore a vast library of anime titles, create personalized watchlists, and track their
                  viewing progress. The platform integrates with anime databases to provide up-to-date information,
                  ratings, and recommendations.
                </p>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
              <Image
                src="https://i.postimg.cc/Df4Hckqq/image.jpg"
                alt="Anime Website Homepage"
                width={1200}
                height={675}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 text-sm text-muted-foreground">
                Homepage featuring trending anime and search functionality
              </p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <div className="w-1 h-8 bg-primary rounded-full" />
                Technology Stack
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Next.js 14", description: "React framework for production", icon: Code2 },
                  { name: "TypeScript", description: "Type-safe development", icon: Shield },
                  { name: "Tailwind CSS", description: "Utility-first styling", icon: Layers },
                  { name: "API Integration", description: "Real-time anime data", icon: Zap },
                ].map((tech, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <tech.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{tech.name}</h3>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <div className="w-1 h-8 bg-primary rounded-full" />
                Key Features
              </h2>
              <div className="grid gap-4">
                {[
                  {
                    title: "User Authentication",
                    description: "Secure login and registration system with session management",
                  },
                  {
                    title: "Personalized Watchlists",
                    description: "Create and manage custom anime watchlists with progress tracking",
                  },
                  { title: "Advanced Search", description: "Filter anime by genre, year, rating, and popularity" },
                  {
                    title: "Responsive Design",
                    description: "Optimized experience across desktop, tablet, and mobile devices",
                  },
                  { title: "Real-time Updates", description: "Latest anime releases and episode updates" },
                  { title: "Dark Mode", description: "Eye-friendly dark theme for comfortable viewing" },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors"
                  >
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Screenshots */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <div className="w-1 h-8 bg-primary rounded-full" />
                Interface Showcase
              </h2>
              <div className="space-y-8">
                <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                  <Image
                    src="https://i.postimg.cc/fySt7bBY/bgremover.png"
                    alt="Anime Details Page"
                    width={1200}
                    height={675}
                    className="w-full h-auto bg-muted"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 text-sm text-muted-foreground">
                    Detailed anime information page with synopsis and ratings
                  </p>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                  <Image
                    src="https://i.postimg.cc/d0rryxtZ/photo-2025-05-23-20-36-10.jpg"
                    alt="User Dashboard"
                    width={1200}
                    height={675}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 text-sm text-muted-foreground">
                    User dashboard with watchlist and viewing history
                  </p>
                </div>
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <div className="w-1 h-8 bg-primary rounded-full" />
                Challenges & Solutions
              </h2>
              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-primary">Challenge: API Rate Limiting</h3>
                  <p className="text-muted-foreground mb-3">
                    The anime database API had strict rate limits that could impact user experience during peak usage.
                  </p>
                  <h4 className="font-semibold mb-2">Solution:</h4>
                  <p className="text-muted-foreground">
                    Implemented intelligent caching strategies using Next.js ISR (Incremental Static Regeneration) and
                    client-side caching to minimize API calls while keeping data fresh.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-3 text-primary">Challenge: Performance Optimization</h3>
                  <p className="text-muted-foreground mb-3">
                    Loading large amounts of anime data and images could slow down the application.
                  </p>
                  <h4 className="font-semibold mb-2">Solution:</h4>
                  <p className="text-muted-foreground">
                    Utilized Next.js Image optimization, lazy loading, and pagination to ensure fast load times and
                    smooth scrolling even with extensive content.
                  </p>
                </div>
              </div>
            </div>

            {/* Results & Impact */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <div className="w-1 h-8 bg-primary rounded-full" />
                Results & Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/10 to-transparent text-center">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <p className="text-sm text-muted-foreground">Lighthouse Performance Score</p>
                </div>
                <div className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/10 to-transparent text-center">
                  <div className="text-4xl font-bold text-primary mb-2">1.2s</div>
                  <p className="text-sm text-muted-foreground">Average Page Load Time</p>
                </div>
                <div className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/10 to-transparent text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <p className="text-sm text-muted-foreground">Mobile Responsive</p>
                </div>
              </div>
            </div>

            {/* Learnings */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <div className="w-1 h-8 bg-primary rounded-full" />
                Key Learnings
              </h2>
              <div className="prose prose-invert max-w-none">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Mastered Next.js 14 App Router and server components for optimal performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Implemented advanced caching strategies to work within API limitations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Gained experience with TypeScript for building type-safe, maintainable applications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Learned to optimize images and assets for web performance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-transparent to-transparent text-center space-y-4">
              <h3 className="text-2xl font-bold">Interested in Similar Projects?</h3>
              <p className="text-muted-foreground">
                I'm available for freelance work and would love to help bring your ideas to life.
              </p>
              <div className="flex gap-3 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Get In Touch</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/#projects">View More Projects</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
