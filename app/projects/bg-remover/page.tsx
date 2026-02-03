"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowLeft, Calendar, User, Scissors, Tag, Smartphone, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageModal } from "@/components/image-modal"
import { AnimatedFileTree } from "@/components/animated-file-tree"
import { ProjectRating } from "@/components/project-rating"

const projectData = {
  title: "BG Remover",
  description: "AI-powered background removal tool with drag & drop interface, real-time processing, and mobile support.",
  longDescription: `BG Remover is a modern web application built with React, TypeScript, and Vite that provides instant background removal using AI technology. The app features an intuitive drag & drop interface, real-time image processing, and comprehensive mobile support through Capacitor for Android deployment.

The application leverages the Remove.bg API to deliver professional-quality background removal results in seconds. Built with performance and user experience in mind, it includes features like processing history, instant downloads, and responsive design that works seamlessly across all devices.`,
  image: "https://i.postimg.cc/13sry6w3/Screenshot-2025-10-12-092706.png",
  techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Remove.bg API", "Capacitor", "Lucide React", "PostCSS"],
  category: "Practice Project",
  timeline: "2024",
  role: "Full Stack Developer",
  liveUrl: "https://bg-remover-hd.netlify.app/",
  githubUrl: "#",
  features: [
    "Drag & Drop Image Upload",
    "AI-Powered Background Removal",
    "Real-time Image Processing",
    "Instant Download Functionality",
    "Processing History Management",
    "Mobile App Support (Android)",
    "Responsive Design",
    "Modern UI/UX with Animations",
    "File Name Auto-Generation",
    "Error Handling & Loading States",
  ],
  challenges: [
    "Integrating Remove.bg API for reliable background removal",
    "Implementing smooth drag & drop functionality",
    "Managing image processing states and error handling",
    "Creating responsive design for mobile and desktop",
    "Building cross-platform app with Capacitor",
    "Optimizing performance for large image files",
  ],
  gallery: [
    {
      image: "https://i.postimg.cc/13sry6w3/Screenshot-2025-10-12-092706.png",
      title: "Main Interface",
      description: "Clean and modern drag & drop interface with gradient background"
    },
    {
      image: "https://i.postimg.cc/x15y8C3q/Screenshot-2025-10-12-092743.png",
      title: "Processing View",
      description: "Real-time image processing with before/after comparison"
    }
  ]
}

export default function BgRemoverPage() {
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
                  <h2 className="text-2xl font-bold mb-4">About BG Remover</h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {projectData.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Core Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Scissors className="w-5 h-5" />
                    AI-Powered Background Removal
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Remove.bg API Integration</h4>
                      <p className="text-sm text-muted-foreground">Professional-quality background removal using advanced AI algorithms for precise edge detection and seamless cutouts.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Real-time Processing</h4>
                      <p className="text-sm text-muted-foreground">Instant background removal with live processing feedback and smooth loading animations.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Drag & Drop Interface</h4>
                      <p className="text-sm text-muted-foreground">Intuitive file upload with drag & drop support, hover effects, and visual feedback.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Instant Download</h4>
                      <p className="text-sm text-muted-foreground">One-click download functionality with automatic file naming and format preservation.</p>
                    </div>
                  </div>
                </div>

                {/* User Experience Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    User Experience Features
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Responsive Design</h4>
                      <p className="text-sm text-muted-foreground">Fully responsive interface that works perfectly on desktop, tablet, and mobile devices.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Processing History</h4>
                      <p className="text-sm text-muted-foreground">Keep track of previously processed images with easy re-download functionality.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Modern Animations</h4>
                      <p className="text-sm text-muted-foreground">Smooth CSS animations and loading states for enhanced user experience.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Auto File Naming</h4>
                      <p className="text-sm text-muted-foreground">Intelligent file naming system that appends "BG-REMOVED" to processed images.</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Support */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Mobile App Development
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Capacitor Integration</h4>
                      <p className="text-sm text-muted-foreground">Cross-platform mobile app development with Capacitor for native Android functionality.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Android Build</h4>
                      <p className="text-sm text-muted-foreground">Complete Android project setup with Gradle build system and native mobile features.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Native Features</h4>
                      <p className="text-sm text-muted-foreground">Access to device camera, photo library, and file system for enhanced mobile experience.</p>
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
                      <span className="text-muted-foreground">API Service</span>
                      <span>Remove.bg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Build Tool</span>
                      <span>Vite</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mobile Framework</span>
                      <span>Capacitor</span>
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

                {/* API Integration */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50 space-y-4">
                  <h3 className="font-semibold">API Integration</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Remove.bg API v1.0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>FormData Upload</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Blob Response Handling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Error Management</span>
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
                  Deep dive into the technical implementation and architecture of BG Remover.
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
                      <div className="text-primary font-bold">Tailwind CSS</div>
                      <div className="text-muted-foreground pl-2">Utility-first styling with custom animations</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Component Structure</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">App.tsx</div>
                      <div className="text-muted-foreground">Main application component with state management</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">ImageUpload</div>
                      <div className="text-muted-foreground">Drag & drop file upload component</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">ImagePreview</div>
                      <div className="text-muted-foreground">Before/after image comparison view</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">History</div>
                      <div className="text-muted-foreground">Processing history management</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Integration Details */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">API Integration Implementation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Remove.bg API Call</h4>
                      <div className="p-3 rounded-lg bg-background/50 text-sm font-mono text-muted-foreground">
                        fetch('/v1.0/removebg', {`{`}<br/>
                        &nbsp;&nbsp;method: 'POST',<br/>
                        &nbsp;&nbsp;headers: {`{`} 'X-Api-Key': key {`}`},<br/>
                        &nbsp;&nbsp;body: formData<br/>
                        {`}`})
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Image Processing Pipeline</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>File validation & upload</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>API request with FormData</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Blob response processing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>URL creation & display</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Error Handling</h4>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">API Errors</div>
                          <div className="text-muted-foreground">Network & rate limiting</div>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">File Errors</div>
                          <div className="text-muted-foreground">Invalid format & size</div>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">Processing</div>
                          <div className="text-muted-foreground">Loading states & feedback</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Development & Performance */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Mobile Development</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Capacitor Integration</div>
                      <div className="text-sm text-muted-foreground">Cross-platform mobile app with native capabilities</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Android Build</div>
                      <div className="text-sm text-muted-foreground">Complete Android project with Gradle configuration</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Responsive UI</div>
                      <div className="text-sm text-muted-foreground">Tailwind breakpoints for all screen sizes</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Performance Optimizations</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Image Handling</div>
                      <div className="text-sm text-muted-foreground">Efficient blob processing and URL management</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">State Management</div>
                      <div className="text-sm text-muted-foreground">React hooks for optimal re-rendering</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Vite Optimization</div>
                      <div className="text-sm text-muted-foreground">Fast builds and hot module replacement</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Architecture */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">Project Structure</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-primary font-bold mb-3 text-sm">Frontend Structure:</div>
                    <AnimatedFileTree
                      data={[
                        {
                          name: "src",
                          type: "folder",
                          children: [
                            {
                              name: "components",
                              type: "folder",
                              children: [
                                { name: "ImageUpload.tsx", type: "file", icon: "- Drag & drop" },
                                { name: "ImagePreview.tsx", type: "file", icon: "- Before/after" },
                                { name: "History.tsx", type: "file", icon: "- Processing history" }
                              ]
                            },
                            {
                              name: "hooks",
                              type: "folder",
                              children: [
                                { name: "useImageProcessor.ts", type: "file" },
                                { name: "useLocalStorage.ts", type: "file" }
                              ]
                            },
                            {
                              name: "utils",
                              type: "folder",
                              children: [
                                { name: "api.ts", type: "file", icon: "- Remove.bg API" },
                                { name: "fileUtils.ts", type: "file", icon: "- File handling" }
                              ]
                            },
                            { name: "App.tsx", type: "file", icon: "- Main component" },
                            { name: "main.tsx", type: "file", icon: "- Entry point" },
                            { name: "index.css", type: "file", icon: "- Global styles" }
                          ]
                        }
                      ]}
                    />
                  </div>
                  <div>
                    <div className="text-primary font-bold mb-3 text-sm">Key Features:</div>
                    <AnimatedFileTree
                      data={[
                        {
                          name: "Image Processing",
                          type: "folder",
                          children: [
                            { name: "Remove.bg API", type: "file", icon: "- AI removal" },
                            { name: "FormData Upload", type: "file", icon: "- File handling" },
                            { name: "Blob Response", type: "file", icon: "- Download" }
                          ]
                        },
                        {
                          name: "Mobile Support",
                          type: "folder",
                          children: [
                            { name: "Capacitor", type: "file", icon: "- Cross-platform" },
                            { name: "Android Build", type: "file", icon: "- Native app" },
                            { name: "Responsive UI", type: "file", icon: "- All devices" }
                          ]
                        },
                        {
                          name: "User Experience",
                          type: "folder",
                          children: [
                            { name: "Drag & Drop", type: "file", icon: "- Intuitive upload" },
                            { name: "Real-time Preview", type: "file", icon: "- Live feedback" },
                            { name: "History", type: "file", icon: "- Track processed" }
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
                  Screenshots and visual highlights from the BG Remover application.
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

            <ProjectRating projectId="bg-remover" />

            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>Poor ??</span>
              <span>Excellent ??</span>
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
