"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowLeft, Calendar, User, Tag, Code, Receipt, BarChart3, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageModal } from "@/components/image-modal"

const projectData = {
  title: "Billosity",
  description: "Premium invoice management SaaS platform with AI document extraction, business growth tracking, and comprehensive dashboard analytics.",
  longDescription: `Billosity is a sophisticated SaaS platform designed for premium invoice management and business growth tracking. Built with React, TypeScript, and Supabase, it offers comprehensive solutions for businesses to manage their invoicing workflow, track financial performance, and gain insights into their growth patterns.

The platform features AI-powered document extraction using Tesseract.js, advanced analytics with interactive charts, automated business health scoring, and a complete dashboard ecosystem. With features like client management, product catalogs, coupon systems, and forecasting tools, Billosity represents a full-featured business management solution with modern web technologies and premium user experience.`,
  image: "https://i.postimg.cc/W1SbZx36/Screenshot-2025-10-12-113610.png",
  techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Framer Motion", "React Hook Form", "Recharts", "Tesseract.js", "jsPDF"],
  category: "Practice Project",
  timeline: "2024",
  role: "Full Stack Developer",
  liveUrl: "https://billosity.netlify.app/",
  githubUrl: "#",
  features: [
    "AI Document Extraction & OCR",
    "Advanced Invoice Management",
    "Business Growth Analytics",
    "Client & Product Management",
    "Automated Business Health Scoring",
    "Interactive Dashboard with Charts",
    "PDF Generation & Printing",
    "Coupon & Discount System",
    "Sales Goal Tracking",
    "Financial Forecasting Tools",
  ],
  challenges: [
    "Implementing AI-powered OCR document extraction with Tesseract.js",
    "Building complex dashboard analytics with real-time data updates",
    "Creating sophisticated business health scoring algorithms",
    "Managing complex form validation and data relationships",
    "Integrating multiple third-party services and APIs",
    "Designing scalable SaaS architecture with Supabase",
  ],
  gallery: [
    {
      image: "https://i.postimg.cc/W1SbZx36/Screenshot-2025-10-12-113610.png",
      title: "Hero Section",
      description: "Modern landing page with key features and call-to-action"
    },
    {
      image: "https://i.postimg.cc/c18HzD90/Screenshot-2025-10-12-113646.png",
      title: "Product Hunt Section",
      description: "Showcasing the power of Billosity for businesses"
    },
    {
      image: "https://i.postimg.cc/Dw5yGRZv/Screenshot-2025-10-12-113709.png",
      title: "Footer Section",
      description: "Clean and informative footer with links"
    },
    {
      image: "https://i.postimg.cc/6pz5ZF34/Screenshot-2025-10-12-113727.png",
      title: "Pricing Page",
      description: "Transparent pricing plans for all business sizes"
    },
    {
      image: "https://i.postimg.cc/cJH1BTgn/Screenshot-2025-10-12-114732.png",
      title: "Dashboard Analytics",
      description: "In-depth analytics and insights for business growth"
    },
    {
      image: "https://i.postimg.cc/ZqRYxjBG/Screenshot-2025-10-12-114743.png",
      title: "Invoice Management",
      description: "Streamlined invoice creation and tracking"
    },
    {
      image: "https://i.postimg.cc/QMy845cN/Screenshot-2025-10-12-114755.png",
      title: "Create Invoice",
      description: "Intuitive form for creating and managing invoices"
    },
    {
      image: "https://i.postimg.cc/vmNYq95Z/Screenshot-2025-10-12-114807.png",
      title: "Cupon Management",
      description: "Efficient system for managing coupons and discounts"
    },
    {
      image: "https://i.postimg.cc/N0zsJTRF/Screenshot-2025-10-12-114822.png",
      title: "Product Management",
      description: "Comprehensive tools for managing products and inventory"
    },
    {
      image: "https://i.postimg.cc/xCN0WCPm/Screenshot-2025-10-12-114834.png",
      title: "Client Management",
      description: "Robust tools for managing client relationships and communications"
    },
    {
      image: "https://i.postimg.cc/50QxZ0mX/Screenshot-2025-10-12-114847.png",
      title: "Testimonials Management",
      description: "Tools for collecting and saving client testimonials"
    },
    {
      image: "https://i.postimg.cc/wMK6HpWP/Screenshot-2025-10-12-114858.png",
      title: "AI Business Report Generator",
      description: "Automated report generation using AI insights"
    },
    {
      image: "https://i.postimg.cc/MHkWxSsN/Screenshot-2025-10-12-114909.png",
      title: "AI Forecasting Tool",
      description: "Predictive analytics for business growth"
    },
    {
      image: "https://i.postimg.cc/MHyzpF4C/Screenshot-2025-10-12-114919.png",
      title: "Product Hunt Page",
      description: "Showcasing Billosity's AI features on Product Hunt"
    },
    {
      image: "https://i.postimg.cc/Y01tCsZk/Screenshot-2025-10-12-115005.png",
      title: "Product Hunt Results",
      description: "Showcasing the results and impact of Billosity on Product Hunt"
    },
  ]
}

export default function BillosityPage() {
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
                  <h2 className="text-2xl font-bold mb-4">About Billosity</h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {projectData.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Invoice Management Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    Advanced Invoice Management
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📄 Smart Invoice Creation</h4>
                      <p className="text-sm text-muted-foreground">Intuitive invoice builder with customizable templates, automated calculations, and professional PDF generation.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">👥 Client Management System</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive client database with contact information, billing history, and relationship tracking.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📦 Product & Service Catalog</h4>
                      <p className="text-sm text-muted-foreground">Organized catalog of products and services with pricing, descriptions, and quick invoice integration.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🎫 Coupon & Discount System</h4>
                      <p className="text-sm text-muted-foreground">Flexible coupon system with percentage and fixed amount discounts, expiration dates, and usage tracking.</p>
                    </div>
                  </div>
                </div>

                {/* AI & Analytics Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI-Powered Features
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🤖 OCR Document Extraction</h4>
                      <p className="text-sm text-muted-foreground">AI-powered document scanning using Tesseract.js for automated data extraction from receipts and invoices.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📊 Business Health Scoring</h4>
                      <p className="text-sm text-muted-foreground">Automated algorithms that calculate business health scores based on payment patterns and invoice metrics.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📈 Predictive Analytics</h4>
                      <p className="text-sm text-muted-foreground">AI-generated reports and forecasting tools for business growth prediction and trend analysis.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🎯 Smart Insights</h4>
                      <p className="text-sm text-muted-foreground">Automated business insights and recommendations based on invoice patterns and client behavior.</p>
                    </div>
                  </div>
                </div>

                {/* Analytics & Reporting */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Analytics & Business Intelligence
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📊 Interactive Dashboards</h4>
                      <p className="text-sm text-muted-foreground">Real-time dashboards with interactive charts using Recharts for comprehensive business metrics visualization.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">💰 Revenue Tracking</h4>
                      <p className="text-sm text-muted-foreground">Detailed revenue analytics with monthly comparisons, growth percentages, and performance indicators.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🎯 Goal Management</h4>
                      <p className="text-sm text-muted-foreground">Sales goal setting and tracking with progress visualization and achievement notifications.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📋 Custom Reports</h4>
                      <p className="text-sm text-muted-foreground">Generate detailed PDF reports with business analytics, client summaries, and financial insights.</p>
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
                      <span className="text-muted-foreground">AI/OCR</span>
                      <span>Tesseract.js</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Charts</span>
                      <span>Recharts</span>
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

                {/* SaaS Features */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50 space-y-4">
                  <h3 className="font-semibold">SaaS Platform</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Premium Invoice Management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Business Analytics Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span>AI Document Processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span>Growth Tracking Tools</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Client Relationship Management</span>
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
                  Deep dive into the technical implementation of Billosity SaaS platform.
                </p>
              </div>

              {/* Architecture & SaaS Features */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">SaaS Architecture</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Multi-tenant Design</div>
                      <div className="text-muted-foreground pl-2">Scalable SaaS architecture with user isolation and data security</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Supabase Backend</div>
                      <div className="text-muted-foreground pl-2">PostgreSQL with real-time subscriptions and RLS policies</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Authentication</div>
                      <div className="text-muted-foreground pl-2">Secure user management with session handling</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">AI & OCR Implementation</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-blue-400">Tesseract.js OCR</div>
                      <div className="text-muted-foreground">Client-side optical character recognition</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-green-400">Document Processing</div>
                      <div className="text-muted-foreground">Automated data extraction from receipts and invoices</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-purple-400">Business Intelligence</div>
                      <div className="text-muted-foreground">AI-powered analytics and health scoring</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Component Architecture */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">📁 Component Architecture</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="font-mono text-sm">
                    <div className="text-primary font-bold mb-2">Dashboard Components:</div>
                    <div className="space-y-1 text-muted-foreground">
                      <div>📊 StatsCards - Business metrics</div>
                      <div>📈 GrowthInsights - Analytics charts</div>
                      <div>👤 UserProfile - Account management</div>
                      <div>🏢 BusinessForm - Company setup</div>
                      <div>❤️ BusinessStatus - Health scoring</div>
                    </div>
                  </div>
                  <div className="font-mono text-sm">
                    <div className="text-primary font-bold mb-2">Invoice System:</div>
                    <div className="space-y-1 text-muted-foreground">
                      <div>📄 InvoiceTemplate - PDF generation</div>
                      <div>👥 ClientSelector - Customer picker</div>
                      <div>📦 ProductSelector - Item selection</div>
                      <div>💳 PaymentTermsManager - Terms</div>
                      <div>🤖 AIDocumentExtractor - OCR</div>
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
                  Screenshots showcasing the comprehensive features of Billosity SaaS platform.
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
