"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowLeft, Calendar, User, Lightbulb, BarChart3, Users, Tag, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageModal } from "@/components/image-modal"

const projectData = {
  title: "IndieMVP",
  description: "Comprehensive platform for discovering real problems and building winning MVPs with pain point analysis, idea evaluation, and business tools.",
  longDescription: `IndieMVP is a sophisticated web platform designed to help small business owners and SaaS developers discover real problems and build winning products. The platform provides comprehensive tools for pain point analysis, idea evaluation, problem-to-product pipelines, and investor connections.

Built with modern web technologies including React, TypeScript, and Supabase, IndieMVP features a comprehensive dashboard with multiple specialized tools, user authentication, data visualization with charts, and a community-driven approach to product development. The platform emphasizes finding genuine market needs before building solutions, helping entrepreneurs avoid common pitfalls of building products without validated demand.`,
  image: "https://i.postimg.cc/QC1Djv55/Screenshot-2025-10-12-102242.png",
  techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "React Router", "Recharts", "Google OAuth", "Nodemailer", "jsPDF"],
  category: "Practice Project",
  timeline: "2024",
  role: "Full Stack Developer",
  liveUrl: "https://indiemvp.netlify.app/",
  githubUrl: "#",
  features: [
    "Pain Point Discovery System",
    "Idea Evaluation Tools",
    "Problem-to-Product Pipeline",
    "Investor Connection Platform",
    "Interactive Data Visualization",
    "User Authentication & Profiles",
    "Community Features",
    "Bookmark & Save Functionality",
    "PDF Report Generation",
    "Multi-page Dashboard Interface",
  ],
  challenges: [
    "Building complex dashboard with multiple specialized tools",
    "Implementing secure user authentication with multiple providers",
    "Creating interactive data visualization with Recharts",
    "Managing complex application state across multiple pages",
    "Integrating third-party services (email, PDF generation)",
    "Designing scalable database schema with Supabase",
  ],
  gallery: [
    {
      image: "https://i.postimg.cc/QC1Djv55/Screenshot-2025-10-12-102242.png",
      title: "Landing Page",
      description: "Modern landing page with comprehensive feature showcase and call-to-action sections"
    },
    {
      image: "https://i.postimg.cc/tCGyBCGX/Screenshot-2025-10-12-102443.png",
      title: "Login Page",
      description: "Secure login page with user authentication"
    },
    {
      image: "https://i.postimg.cc/ZKzZwKz4/Screenshot-2025-10-12-102311.png",
      title: "Pain Points Analysis",
      description: "Pain point discovery and analysis tools with data visualization"
    },
    {
      image: "https://i.postimg.cc/W3QjLsDg/Screenshot-2025-10-12-102326.png",
      title: "Idea Evaluation",
      description: "Comprehensive idea evaluation system with scoring and analysis"
    },
    {
      image: "https://i.postimg.cc/0jDv9hmV/Screenshot-2025-10-12-102344.png",
      title: "Bookmark Page",
      description: "Organized bookmark system for saving research and opportunities"
    }
  ]
}

export default function IndieMVPPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "gallery" | "technical">("overview")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 px-4 relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="mb-8 group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                {projectData.category}
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold">
                {projectData.title}
              </h1>

              <p className="text-lg text-muted-foreground">
                {projectData.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{projectData.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{projectData.role}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => window.open(projectData.liveUrl, '_blank', 'noopener,noreferrer')}
                  className="cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={projectData.image}
                  alt={projectData.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 px-4 border-b border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              onClick={() => setActiveTab("overview")}
              className="rounded-full"
            >
              Overview
            </Button>
            <Button
              variant={activeTab === "technical" ? "default" : "ghost"}
              onClick={() => setActiveTab("technical")}
              className="rounded-full"
            >
              Technical Details
            </Button>
            <Button
              variant={activeTab === "gallery" ? "default" : "ghost"}
              onClick={() => setActiveTab("gallery")}
              className="rounded-full"
            >
              Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">About IndieMVP</h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {projectData.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Problem Discovery Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Problem Discovery & Analysis
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🔍 Pain Point Discovery System</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive tools for identifying and analyzing real market problems through systematic research and community insights.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📊 Market Research Tools</h4>
                      <p className="text-sm text-muted-foreground">Advanced research methodologies and frameworks for understanding market needs and customer pain points.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🎯 Problem Validation</h4>
                      <p className="text-sm text-muted-foreground">Systematic validation processes to ensure identified problems represent genuine market opportunities.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📈 Trend Analysis</h4>
                      <p className="text-sm text-muted-foreground">Market trend analysis and emerging opportunity identification for forward-thinking product development.</p>
                    </div>
                  </div>
                </div>

                {/* Business Development Tools */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Business Development Tools
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">💡 Idea Evaluation System</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive scoring system for evaluating product ideas based on market potential, feasibility, and competitive landscape.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🔄 Problem-to-Product Pipeline</h4>
                      <p className="text-sm text-muted-foreground">Structured methodology for transforming identified problems into viable product concepts and development roadmaps.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📋 MVP Planning Tools</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive planning tools for defining minimum viable products with clear success metrics and validation criteria.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">💰 Investor Connection Platform</h4>
                      <p className="text-sm text-muted-foreground">Platform for connecting with potential investors and presenting validated business opportunities.</p>
                    </div>
                  </div>
                </div>

                {/* Platform Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Platform Features
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🏠 Comprehensive Dashboard</h4>
                      <p className="text-sm text-muted-foreground">Multi-page dashboard interface with specialized tools for different aspects of product development and market analysis.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📊 Data Visualization</h4>
                      <p className="text-sm text-muted-foreground">Interactive charts and graphs using Recharts for visualizing market data, trends, and analysis results.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🔐 User Authentication</h4>
                      <p className="text-sm text-muted-foreground">Secure authentication system with Google OAuth integration and user profile management.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">💾 Save & Bookmark System</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive system for saving research, bookmarking opportunities, and organizing project workflows.</p>
                    </div>
                  </div>
                </div>

                {/* Community & Networking */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Community & Networking
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🌟 Community Platform</h4>
                      <p className="text-sm text-muted-foreground">Connect with other entrepreneurs, share insights, and collaborate on problem discovery and solution development.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📚 Documentation Hub</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive documentation and guides for using the platform and implementing best practices in product development.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🆘 Help Center</h4>
                      <p className="text-sm text-muted-foreground">Extensive help system with tutorials, FAQs, and support resources for platform users.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📄 Report Generation</h4>
                      <p className="text-sm text-muted-foreground">PDF report generation capabilities for sharing analysis results and business proposals with stakeholders.</p>
                    </div>
                  </div>
                </div>

                {/* Technical Challenges */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Technical Challenges
                  </h3>
                  <div className="space-y-3">
                    {projectData.challenges.map((challenge, index) => (
                      <div key={index} className="p-4 rounded-lg bg-card/50 border border-border/50">
                        <p className="text-sm text-muted-foreground">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Tech Stack */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {projectData.techStack.map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50 space-y-4">
                  <h3 className="font-semibold">Project Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timeline</span>
                      <span>{projectData.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role</span>
                      <span>{projectData.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span>{projectData.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Backend</span>
                      <span>Supabase</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Charts</span>
                      <span>Recharts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Authentication</span>
                      <span>Google OAuth</span>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50 space-y-4">
                  <h3 className="font-semibold">Key Features</h3>
                  <div className="space-y-2 text-sm">
                    {projectData.features.slice(0, 6).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Platform Sections */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50 space-y-4">
                  <h3 className="font-semibold">Platform Sections</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Dashboard & Analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Pain Points Discovery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span>Idea Evaluation Tools</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span>Problem-to-Product Pipeline</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Investor Connection Hub</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                      <span>Community & Resources</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "technical" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Technical Documentation</h2>
                <p className="text-muted-foreground">
                  Deep dive into the technical implementation and architecture of IndieMVP platform.
                </p>
              </div>

              {/* Architecture & Backend */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Full Stack Architecture</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">React + TypeScript</div>
                      <div className="text-muted-foreground pl-2">Modern React application with strict TypeScript configuration</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Supabase Backend</div>
                      <div className="text-muted-foreground pl-2">PostgreSQL database with real-time capabilities and authentication</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">React Router</div>
                      <div className="text-muted-foreground pl-2">Complex routing with protected routes and nested navigation</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Vite Build System</div>
                      <div className="text-muted-foreground pl-2">Fast development and optimized production builds</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Dashboard Architecture</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-blue-400">Multi-page Dashboard</div>
                      <div className="text-muted-foreground">Comprehensive dashboard with specialized tool sections</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-green-400">Protected Routes</div>
                      <div className="text-muted-foreground">Authentication-based route protection and user management</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-purple-400">Context Management</div>
                      <div className="text-muted-foreground">React Context for global state and authentication</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-orange-400">Component Library</div>
                      <div className="text-muted-foreground">Reusable components for consistent UI/UX</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Visualization & Features */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">📊 Data Visualization & Analytics</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Recharts Integration</h4>
                      <div className="p-3 rounded-lg bg-background/50 text-sm font-mono text-muted-foreground">
                        &lt;BarChart data={`{data}`}&gt;<br/>
                        &nbsp;&nbsp;&lt;XAxis dataKey="name" /&gt;<br/>
                        &nbsp;&nbsp;&lt;YAxis /&gt;<br/>
                        &nbsp;&nbsp;&lt;Bar dataKey="value" /&gt;<br/>
                        &lt;/BarChart&gt;
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Chart Types</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span>Radar charts for idea evaluation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>Bar charts for market analysis</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          <span>Line charts for trend tracking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          <span>Pie charts for market segmentation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Authentication System</h4>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 rounded bg-green-900/20 border border-green-500/20">
                          <strong>Google OAuth:</strong> Seamless social login
                        </div>
                        <div className="p-2 rounded bg-blue-900/20 border border-blue-500/20">
                          <strong>Supabase Auth:</strong> Secure session management
                        </div>
                        <div className="p-2 rounded bg-purple-900/20 border border-purple-500/20">
                          <strong>Route Protection:</strong> Authenticated access control
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Logic & Features */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">🛠️ Business Logic</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-green-400">Problem Analysis Engine</div>
                      <div className="text-sm text-muted-foreground">Systematic approach to identifying and validating market problems</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-blue-400">Idea Scoring System</div>
                      <div className="text-sm text-muted-foreground">Multi-criteria evaluation framework for product ideas</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-purple-400">Pipeline Management</div>
                      <div className="text-sm text-muted-foreground">Structured workflow from problem to product development</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">🔧 Additional Features</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-red-400">PDF Generation</div>
                      <div className="text-sm text-muted-foreground">jsPDF integration for business reports and analysis</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-orange-400">Email Integration</div>
                      <div className="text-sm text-muted-foreground">Nodemailer for communication and notifications</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-cyan-400">Screen Capture</div>
                      <div className="text-sm text-muted-foreground">html2canvas for generating visual reports</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Component Structure */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">📁 Application Structure</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="font-mono text-sm">
                    <div className="text-primary font-bold mb-2">Core Pages:</div>
                    <div className="space-y-1 text-muted-foreground">
                      <div>📂 pages/</div>
                      <div className="pl-4">🏠 LandingPage - Marketing site</div>
                      <div className="pl-4">📊 PainPointsPage - Problem discovery</div>
                      <div className="pl-4">💡 IdeaEvaluatorPage - Idea scoring</div>
                      <div className="pl-4">🔄 ProblemToProductPage - Pipeline</div>
                      <div className="pl-4">💰 InvestorsPage - Investor hub</div>
                      <div className="pl-4">👥 CommunityPage - Social features</div>
                    </div>
                  </div>
                  <div className="font-mono text-sm">
                    <div className="text-primary font-bold mb-2">Component Architecture:</div>
                    <div className="space-y-1 text-muted-foreground">
                      <div>📂 components/</div>
                      <div className="pl-4">🔐 auth/ - Authentication system</div>
                      <div className="pl-4">🏠 landing/ - Landing page sections</div>
                      <div className="pl-4">📊 Dashboard - Main app interface</div>
                      <div className="pl-4">📈 RadarChart - Data visualization</div>
                      <div className="pl-4">📝 NoteEditor - Content management</div>
                      <div className="pl-4">🔧 Header, Footer, Logo</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
                <p className="text-muted-foreground">
                  Screenshots and visual highlights from the IndieMVP platform showcasing the comprehensive business development tools.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectData.gallery.map((item, index) => (
                  <div 
                    key={index} 
                    className="group relative rounded-2xl overflow-hidden bg-card/50 border border-border/50 cursor-pointer"
                    onClick={() => {
                      setCurrentImageIndex(index)
                      setIsModalOpen(true)
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={projectData.gallery}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
      />
    </div>
  )
}
