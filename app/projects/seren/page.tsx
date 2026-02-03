"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowLeft, Calendar, User, Tag, ShoppingBag, Sparkles, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageModal } from "@/components/image-modal"
import { AnimatedFileTree } from "@/components/animated-file-tree"
import { ProjectRating } from "@/components/project-rating"

const projectData = {
  title: "SEREN",
  description: "Premium luxury fashion e-commerce platform with sophisticated animations, advanced filtering, and modern UI/UX design.",
  longDescription: `SEREN is a sophisticated luxury fashion e-commerce platform built with Next.js 16, React 19, and TypeScript. The project showcases modern web development practices with elegant animations, responsive design, and comprehensive e-commerce functionality.

The website is designed to provide an unparalleled luxury shopping experience with features like advanced product filtering, shopping cart management, dynamic collections, and a beautiful newsletter subscription system. Built with performance and user experience in mind, it demonstrates cutting-edge React patterns, state management, and modern UI/UX design principles.`,
  image: "https://i.postimg.cc/SsDCKbKR/Hero_section.png",
  techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Radix UI", "Lucide Icons", "React Hook Form", "Zod", "Embla Carousel"],
  category: "Practice Project",
  timeline: "2025",
  role: "Full Stack Developer",
  liveUrl: "#",
  githubUrl: "#",
  features: [
    "Modern Hero Section with Animations",
    "Advanced Product Filtering System",
    "Shopping Cart with Context API",
    "Dynamic Product Collections",
    "Responsive Mobile-First Design",
    "Newsletter Subscription System",
    "Interactive Product Gallery",
    "About Page with Brand Story",
    "Contact Form Integration",
    "SEO-Optimized Structure",
    "Dark/Light Theme Support",
    "Smooth Scroll Animations",
  ],
  challenges: [
    "Implementing complex product filtering with multiple attributes",
    "Creating smooth animations with CSS and React state",
    "Building responsive layouts that work across all devices",
    "Managing shopping cart state across multiple pages",
    "Optimizing images and assets for performance",
    "Integrating Radix UI components with custom styling",
    "Creating reusable component architecture",
    "Implementing advanced TypeScript types for type safety",
  ],
  gallery: [
    {
      image: "https://i.postimg.cc/SsDCKbKR/Hero_section.png",
      title: "Hero Section",
      description: "Stunning hero section with animated typography and call-to-action buttons"
    },
    {
      image: "https://i.postimg.cc/D00sJpWX/About_page.png",
      title: "About Page",
      description: "Brand story page with elegant design and smooth animations"
    },
    {
      image: "https://i.postimg.cc/XJQdv6vn/contact_page.png",
      title: "Contact Page",
      description: "Professional contact form with validation and user-friendly interface"
    },
    {
      image: "https://i.postimg.cc/C1mkKpKM/footer_and_newsletter_page.png",
      title: "Footer & Newsletter",
      description: "Comprehensive footer with newsletter subscription system"
    },
    {
      image: "https://i.postimg.cc/vTT9g21P/Products_page.png",
      title: "Products Page",
      description: "Featured products section with interactive hover effects"
    },
    {
      image: "https://i.postimg.cc/mkkMzpcp/Store_page.png",
      title: "Store Page",
      description: "Shop page with advanced filtering, sorting, and search functionality"
    }
  ]
}

export default function SerenPage() {
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
                  disabled={projectData.liveUrl === "#"}
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
                  <h2 className="text-2xl font-bold mb-4">About SEREN</h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {projectData.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* E-commerce Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    E-commerce Features
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Shopping Cart System</h4>
                      <p className="text-sm text-muted-foreground">Complete shopping cart functionality with Context API for global state management, add/remove items, and quantity updates.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Advanced Product Filtering</h4>
                      <p className="text-sm text-muted-foreground">Multi-attribute filtering system including category, price range, color, material, and size with dynamic search functionality.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Product Collections</h4>
                      <p className="text-sm text-muted-foreground">Dynamic product collections with featured items, new arrivals, and sale sections with smooth animations.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Newsletter Integration</h4>
                      <p className="text-sm text-muted-foreground">Beautiful newsletter subscription system with form validation and user engagement features.</p>
                    </div>
                  </div>
                </div>

                {/* Design & Animation Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Design & Animation System
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Sophisticated Animations</h4>
                      <p className="text-sm text-muted-foreground">Smooth CSS animations and React state-based transitions for enhanced user experience with scroll-triggered effects.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Luxury Design System</h4>
                      <p className="text-sm text-muted-foreground">Minimalist and elegant design with custom Tailwind CSS configurations, consistent typography, and sophisticated color palette.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Responsive Excellence</h4>
                      <p className="text-sm text-muted-foreground">Mobile-first responsive design that works flawlessly across all devices with optimized touch interactions.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Theme Support</h4>
                      <p className="text-sm text-muted-foreground">Dark and light theme support with smooth transitions and consistent color schemes.</p>
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
                      <span className="text-muted-foreground">Framework</span>
                      <span>Next.js 16</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">UI Library</span>
                      <span>Radix UI</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Styling</span>
                      <span>Tailwind CSS</span>
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

                {/* Project Focus */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50 space-y-4">
                  <h3 className="font-semibold">Project Focus</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Luxury E-commerce</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Modern UI/UX</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Performance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Responsive Design</span>
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
                  Deep dive into the technical implementation and architecture of the SEREN luxury e-commerce platform.
                </p>
              </div>

              {/* Architecture & Tech Stack */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Frontend Architecture</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Next.js 16</div>
                      <div className="text-muted-foreground pl-2">App Router with server and client components</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">React 19</div>
                      <div className="text-muted-foreground pl-2">Latest React with new features and optimizations</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">TypeScript</div>
                      <div className="text-muted-foreground pl-2">Type-safe development with strict configurations</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Tailwind CSS</div>
                      <div className="text-muted-foreground pl-2">Utility-first CSS with custom configurations</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Component Structure</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Header & Navigation</div>
                      <div className="text-muted-foreground">Responsive header with cart icon and mobile menu</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Pages</div>
                      <div className="text-muted-foreground">Home, Shop, About, Contact, Collections</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Components</div>
                      <div className="text-muted-foreground">Reusable UI components and product cards</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Context</div>
                      <div className="text-muted-foreground">Cart context for global state management</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* State Management */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">State Management</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Context API Implementation</h4>
                      <div className="p-3 rounded-lg bg-background/50 text-sm font-mono text-muted-foreground">
                        const CartContext = createContext()<br/>
                        {`<CartProvider>`}<br/>
                        &nbsp;&nbsp;{`{children}`}<br/>
                        {`</CartProvider>`}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">State Features</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Global shopping cart state</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Product filtering and sorting</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Search functionality</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Modal and UI states</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Performance Optimization</h4>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">React 19</div>
                          <div className="text-muted-foreground">Latest optimizations</div>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">Next.js 16</div>
                          <div className="text-muted-foreground">App Router performance</div>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">Lazy Loading</div>
                          <div className="text-muted-foreground">Dynamic imports</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Responsive Design & Performance */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Responsive Design</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Mobile-First Approach</div>
                      <div className="text-sm text-muted-foreground">Designed for mobile and scaled up</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Flexible Layouts</div>
                      <div className="text-sm text-muted-foreground">Grid and flexbox for all screen sizes</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Touch Optimization</div>
                      <div className="text-sm text-muted-foreground">Optimized for touch interactions</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Performance Features</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Next.js Optimization</div>
                      <div className="text-sm text-muted-foreground">Automatic code splitting and optimization</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Image Optimization</div>
                      <div className="text-sm text-muted-foreground">Next.js Image component for optimal loading</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">SEO Ready</div>
                      <div className="text-sm text-muted-foreground">Optimized metadata and structure</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Structure */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">Project Structure</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-primary font-bold mb-3 text-sm">Directory Structure:</div>
                    <AnimatedFileTree
                      data={[
                        {
                          name: "app",
                          type: "folder",
                          children: [
                            { name: "page.tsx", type: "file", icon: "- Home page" },
                            { name: "layout.tsx", type: "file", icon: "- Root layout" },
                            { name: "globals.css", type: "file", icon: "- Global styles" },
                            {
                              name: "shop",
                              type: "folder",
                              children: [
                                { name: "page.tsx", type: "file", icon: "- Shop page" }
                              ]
                            },
                            {
                              name: "about",
                              type: "folder",
                              children: [
                                { name: "page.tsx", type: "file", icon: "- About page" }
                              ]
                            },
                            {
                              name: "contact",
                              type: "folder",
                              children: [
                                { name: "page.tsx", type: "file", icon: "- Contact page" }
                              ]
                            },
                            {
                              name: "collections",
                              type: "folder",
                              children: [
                                { name: "page.tsx", type: "file", icon: "- Collections" }
                              ]
                            }
                          ]
                        },
                        {
                          name: "components",
                          type: "folder",
                          children: [
                            { name: "header.tsx", type: "file" },
                            { name: "hero.tsx", type: "file" },
                            { name: "featured-products.tsx", type: "file" },
                            { name: "collection-showcase.tsx", type: "file" },
                            { name: "newsletter.tsx", type: "file" },
                            { name: "footer.tsx", type: "file" },
                            {
                              name: "ui",
                              type: "folder",
                              children: [
                                { name: "button.tsx", type: "file" },
                                { name: "card.tsx", type: "file" },
                                { name: "input.tsx", type: "file" }
                              ]
                            }
                          ]
                        },
                        {
                          name: "lib",
                          type: "folder",
                          children: [
                            { name: "cart-context.tsx", type: "file", icon: "- Cart state" },
                            { name: "utils.ts", type: "file", icon: "- Utilities" }
                          ]
                        }
                      ]}
                    />
                  </div>
                  <div>
                    <div className="text-primary font-bold mb-3 text-sm">Key Components:</div>
                    <AnimatedFileTree
                      data={[
                        {
                          name: "Layout Components",
                          type: "folder",
                          children: [
                            { name: "Header", type: "file", icon: "- Navigation system" },
                            { name: "Footer", type: "file", icon: "- Site footer" }
                          ]
                        },
                        {
                          name: "Home Components",
                          type: "folder",
                          children: [
                            { name: "Hero", type: "file", icon: "- Landing section" },
                            { name: "FeaturedProducts", type: "file", icon: "- Product showcase" },
                            { name: "CollectionShowcase", type: "file", icon: "- Collections" },
                            { name: "Newsletter", type: "file", icon: "- Subscription form" }
                          ]
                        },
                        {
                          name: "Shop Components",
                          type: "folder",
                          children: [
                            { name: "ProductFilters", type: "file", icon: "- Filter system" },
                            { name: "ProductGrid", type: "file", icon: "- Product display" },
                            { name: "AddToCartModal", type: "file", icon: "- Cart modal" }
                          ]
                        }
                      ]}
                    />
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
                  Screenshots and visual highlights from the SEREN luxury e-commerce platform.
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

      {/* Rating Section */}
      <section className="py-16 px-4 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Rate This Project</h2>
              <p className="text-muted-foreground">
                How would you rate this project? Your feedback helps improve future projects.
              </p>
            </div>

            <ProjectRating projectId="seren" />

            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>Poor 😞</span>
              <span>Excellent 🤩</span>
            </div>
          </div>
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
