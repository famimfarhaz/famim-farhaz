"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowLeft, Calendar, User, Tag, ChefHat, Users, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageModal } from "@/components/image-modal"

const projectData = {
  title: "Bistro",
  description: "Modern restaurant consulting agency website with advanced animations, multi-page navigation, and profit optimization strategies.",
  longDescription: `Bistro is a sophisticated restaurant consulting agency website built with React, TypeScript, and Framer Motion. The project showcases modern web development practices with stunning animations, responsive design, and comprehensive multi-page navigation.

The website is designed to help restaurant owners "Transform Your Restaurant Into A Profit Powerhouse" through strategic consulting services. It features detailed service offerings, client testimonials, pricing plans, and comprehensive contact forms. Built with performance and user experience in mind, it demonstrates advanced animation techniques and modern UI/UX design principles.`,
  image: "https://i.postimg.cc/7PTLZWn9/Screenshot-2025-10-12-094950.png",
  techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "React Router", "Lucide React", "PostCSS"],
  category: "Practice Project",
  timeline: "2024",
  role: "Frontend Developer",
  liveUrl: "https://bistro-portfolio.netlify.app/",
  githubUrl: "#",
  features: [
    "Advanced Framer Motion Animations",
    "Multi-Page React Router Navigation",
    "Responsive Mobile-First Design",
    "Modern Gradient UI/UX Design",
    "Interactive Service Cards",
    "Client Testimonial System",
    "Contact Form Integration",
    "Floating Particle Effects",
    "Professional Typography",
    "SEO-Optimized Structure",
  ],
  challenges: [
    "Implementing complex Framer Motion animations with proper timing",
    "Creating smooth page transitions with React Router",
    "Building responsive layouts that work across all devices",
    "Managing component state across multiple pages",
    "Optimizing animation performance for mobile devices",
    "Integrating Tailwind CSS with custom gradient designs",
  ],
  gallery: [
    {
      image: "https://i.postimg.cc/7PTLZWn9/Screenshot-2025-10-12-094950.png",
      title: "Homepage Hero",
      description: "Stunning hero section with gradient background and animated typography"
    },
    {
      image: "https://i.postimg.cc/zDRfGcFx/Screenshot-2025-10-12-095009.png",
      title: "Pricing Section",
      description: "Interactive pricing cards with hover effects and call-to-action buttons"
    },
    {
      image: "https://i.postimg.cc/QdjNSxGg/Screenshot-2025-10-12-095029.png",
      title: "Blog Page",
      description: "Engaging blog posts with insights and tips for restaurant owners"
    }
  ]
}

export default function BistroPage() {
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
                  <h2 className="text-2xl font-bold mb-4">About Bistro</h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {projectData.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Animation & Design Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Advanced Animation System
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🎭 Framer Motion Integration</h4>
                      <p className="text-sm text-muted-foreground">Complex animations with staggered children, smooth page transitions, and optimized performance using Framer Motion's advanced features.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">✨ Interactive UI Elements</h4>
                      <p className="text-sm text-muted-foreground">Hover effects, floating particles, gradient backgrounds, and smooth scrolling animations that enhance user engagement.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📱 Responsive Animations</h4>
                      <p className="text-sm text-muted-foreground">Mobile-optimized animations that maintain performance across all devices with reduced motion support.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🎨 Custom Design System</h4>
                      <p className="text-sm text-muted-foreground">Consistent gradient themes, typography system, and reusable component architecture.</p>
                    </div>
                  </div>
                </div>

                {/* Restaurant Consulting Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <ChefHat className="w-5 h-5" />
                    Restaurant Business Content
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📊 Profit Optimization Services</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive consulting services including menu engineering, operations optimization, and profit analysis strategies.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🎯 Client Success Stories</h4>
                      <p className="text-sm text-muted-foreground">Real testimonials with measurable results, showcasing 487+ restaurants transformed with average 42% profit increases.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📈 Statistical Presentations</h4>
                      <p className="text-sm text-muted-foreground">Data-driven content presentation with impressive statistics and proven track record displays.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">💼 Professional Service Pages</h4>
                      <p className="text-sm text-muted-foreground">Detailed service descriptions, pricing plans, about pages, and comprehensive contact forms.</p>
                    </div>
                  </div>
                </div>

                {/* Navigation & User Experience */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Navigation & User Experience
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🧭 React Router Integration</h4>
                      <p className="text-sm text-muted-foreground">Multi-page application with smooth navigation, scroll restoration, and proper routing architecture.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🔄 Scroll Management</h4>
                      <p className="text-sm text-muted-foreground">Custom ScrollToTop component and smooth scrolling effects for enhanced navigation experience.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📋 Form Integration</h4>
                      <p className="text-sm text-muted-foreground">Professional contact forms with validation and user-friendly interface design.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🎪 Layout System</h4>
                      <p className="text-sm text-muted-foreground">Consistent layout components with navigation, footer, and floating particle effects.</p>
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
                      <span className="text-muted-foreground">Animation Library</span>
                      <span>Framer Motion</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Build Tool</span>
                      <span>Vite</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Routing</span>
                      <span>React Router</span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
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

                {/* Business Focus */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50 space-y-4">
                  <h3 className="font-semibold">Business Focus</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span>Restaurant Consulting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Profit Optimization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Business Strategy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span>Marketing Solutions</span>
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
                  Deep dive into the technical implementation and architecture of the Bistro restaurant consulting website.
                </p>
              </div>

              {/* Architecture & Tech Stack */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Frontend Architecture</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">React 18</div>
                      <div className="text-muted-foreground pl-2">Modern React with hooks and functional components</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">TypeScript</div>
                      <div className="text-muted-foreground pl-2">Type-safe development with strict configurations</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Vite</div>
                      <div className="text-muted-foreground pl-2">Fast build tool with HMR and optimized bundling</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">React Router</div>
                      <div className="text-muted-foreground pl-2">Multi-page navigation with smooth transitions</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Component Structure</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-blue-400">Layout</div>
                      <div className="text-muted-foreground">Main layout with navigation and footer</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-green-400">Pages</div>
                      <div className="text-muted-foreground">Home, About, Pricing, Contact, Blog</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-purple-400">Components</div>
                      <div className="text-muted-foreground">Reusable cards, buttons, forms</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-orange-400">Animations</div>
                      <div className="text-muted-foreground">Framer Motion effects and transitions</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animation Implementation */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">🎭 Animation Implementation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Framer Motion Setup</h4>
                      <div className="p-3 rounded-lg bg-background/50 text-sm font-mono text-muted-foreground">
                        const containerVariants = {`{`}<br/>
                        &nbsp;&nbsp;hidden: {`{`} opacity: 0 {`}`},<br/>
                        &nbsp;&nbsp;visible: {`{`} staggerChildren: 0.15 {`}`}<br/>
                        {`}`}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Animation Features</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span>Staggered children animations</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>Viewport-triggered animations</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          <span>Page transition effects</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          <span>Floating particle system</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Performance Optimization</h4>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 rounded bg-green-900/20 border border-green-500/20">
                          <strong>GPU Acceleration:</strong> Transform3d properties
                        </div>
                        <div className="p-2 rounded bg-blue-900/20 border border-blue-500/20">
                          <strong>Reduced Motion:</strong> Accessibility support
                        </div>
                        <div className="p-2 rounded bg-purple-900/20 border border-purple-500/20">
                          <strong>Lazy Loading:</strong> Viewport-based triggers
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsive Design & Performance */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">📱 Responsive Design</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-green-400">Tailwind CSS</div>
                      <div className="text-sm text-muted-foreground">Mobile-first responsive utility classes</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-blue-400">Grid Layouts</div>
                      <div className="text-sm text-muted-foreground">Flexible grid systems for all screen sizes</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-purple-400">Typography</div>
                      <div className="text-sm text-muted-foreground">Responsive font sizes and spacing</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">⚡ Performance Features</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-red-400">Vite Optimization</div>
                      <div className="text-sm text-muted-foreground">Fast builds and hot module replacement</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-orange-400">Code Splitting</div>
                      <div className="text-sm text-muted-foreground">Route-based code splitting with React Router</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-cyan-400">Asset Optimization</div>
                      <div className="text-sm text-muted-foreground">Optimized images and SVG icons</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Structure */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">📁 Project Structure</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="font-mono text-sm">
                    <div className="text-primary font-bold mb-2">Directory Structure:</div>
                    <div className="space-y-1 text-muted-foreground">
                      <div>📂 src/</div>
                      <div className="pl-4">📂 components/ - Reusable components</div>
                      <div className="pl-4">📂 pages/ - Route components</div>
                      <div className="pl-4">📄 App.tsx - Main app component</div>
                      <div className="pl-4">📄 main.tsx - Entry point</div>
                      <div className="pl-4">📄 App.css - Global styles</div>
                    </div>
                  </div>
                  <div className="font-mono text-sm">
                    <div className="text-primary font-bold mb-2">Key Components:</div>
                    <div className="space-y-1 text-muted-foreground">
                      <div>🧭 Navigation - Menu system</div>
                      <div>🎨 FloatingParticles - Background effects</div>
                      <div>📋 Card - Reusable card component</div>
                      <div>🔘 Button - Custom button variants</div>
                      <div>🎫 CouponCard - Special offer component</div>
                      <div>📄 Footer - Site footer</div>
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
                  Screenshots and visual highlights from the Bistro restaurant consulting website.
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
