"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowLeft, Calendar, User, FolderTree, Zap, Tag, History, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageModal } from "@/components/image-modal"
import { AnimatedFileTree } from "@/components/animated-file-tree"
import { ProjectRating } from "@/components/project-rating"

const projectData = {
  title: "File Organizer Pro",
  description: "Smart file management system with automatic organization, custom animations, and ZIP generation with progress tracking.",
  longDescription: `File Organizer Pro is an advanced file management application built with React, TypeScript, and modern web technologies. The application provides intelligent file organization with automatic folder creation based on file types or naming patterns, complete with ZIP generation and download functionality.

The project features a sophisticated user interface with custom animations, drag & drop functionality, file previews with thumbnails, and a comprehensive history tracking system. Built with performance and user experience in mind, it includes custom cursor effects, parallax animations, and a terminal-inspired design system that makes file organization both efficient and visually appealing.`,
  image: "https://i.postimg.cc/zXQZHzDJ/Screenshot-2025-10-12-100455.png",
  techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "JSZip", "React Router", "Lucide React", "Custom Hooks"],
  category: "Practice Project",
  timeline: "2024",
  role: "Frontend Developer",
  liveUrl: "#",
  githubUrl: "#",
  features: [
    "Smart File Organization by Type/Pattern",
    "Drag & Drop File Upload Interface",
    "ZIP Generation with Progress Tracking",
    "File Preview with Thumbnail Generation",
    "Custom Animations & Effects",
    "History Tracking System",
    "Multi-Page Navigation",
    "Custom Cursor & Parallax Effects",
    "Terminal-Inspired UI Design",
    "Real-time File Processing",
  ],
  challenges: [
    "Implementing intelligent file grouping algorithms",
    "Creating smooth drag & drop with visual feedback",
    "Building ZIP generation with real-time progress tracking",
    "Developing thumbnail generation for multiple file types",
    "Managing complex state across multiple components",
    "Optimizing performance for large file uploads",
  ],
  gallery: [
    {
      image: "https://i.postimg.cc/zXQZHzDJ/Screenshot-2025-10-12-100455.png",
      title: "Main Interface",
      description: "Drag & drop interface with animated background and file organization features"
    },
    {
      image: "https://i.postimg.cc/pXSb5WVR/Screenshot-2025-10-12-100729.png",
      title: "File Processing",
      description: "Progress tracking and file preview system with terminal-inspired design"
    }
  ]
}

export default function FileOrganizerPage() {
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
                  <h2 className="text-2xl font-bold mb-4">About File Organizer Pro</h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {projectData.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Smart Organization Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FolderTree className="w-5 h-5" />
                    Smart File Organization
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Intelligent Grouping Algorithm</h4>
                      <p className="text-sm text-muted-foreground">Advanced file analysis that automatically groups files by naming patterns or file types, optimizing folder structure for maximum organization efficiency.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Automatic Folder Creation</h4>
                      <p className="text-sm text-muted-foreground">Dynamic folder generation based on detected file categories including Images, Videos, Documents, Code files, and more with customizable naming.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Pattern Recognition</h4>
                      <p className="text-sm text-muted-foreground">Smart detection of file naming patterns (e.g., "Photo 1", "Photo 2") to group related files together automatically.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">ZIP Generation</h4>
                      <p className="text-sm text-muted-foreground">Seamless ZIP archive creation with organized folder structure and real-time progress tracking.</p>
                    </div>
                  </div>
                </div>

                {/* User Interface Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Advanced User Interface
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Custom Cursor Effects</h4>
                      <p className="text-sm text-muted-foreground">Interactive custom cursor with smooth animations and context-aware behavior that enhances user engagement.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Drag & Drop Interface</h4>
                      <p className="text-sm text-muted-foreground">Intuitive file upload system with visual feedback, hover effects, and multi-file selection support.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">File Preview System</h4>
                      <p className="text-sm text-muted-foreground">Real-time thumbnail generation for images and preview cards for all file types with size and type information.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Progress Tracking</h4>
                      <p className="text-sm text-muted-foreground">Real-time progress bars with percentage indicators and smooth animations during file processing.</p>
                    </div>
                  </div>
                </div>

                {/* Animation & Design System */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Animation & Design System
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Animated Background</h4>
                      <p className="text-sm text-muted-foreground">Dynamic gradient background with particle effects and smooth color transitions for immersive user experience.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Scroll Reveal Effects</h4>
                      <p className="text-sm text-muted-foreground">Smooth scroll-triggered animations with staggered reveals and directional slide effects.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Parallax Containers</h4>
                      <p className="text-sm text-muted-foreground">Subtle parallax scrolling effects that add depth and visual interest to the interface.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Ripple Buttons</h4>
                      <p className="text-sm text-muted-foreground">Interactive button components with ripple effects and micro-animations for enhanced feedback.</p>
                    </div>
                  </div>
                </div>

                {/* History & Tracking */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <History className="w-5 h-5" />
                    History & Analytics
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Download Statistics</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive tracking of processed files with statistics including total files, folders created, and file sizes.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Session History</h4>
                      <p className="text-sm text-muted-foreground">Persistent local storage of organization history with timestamps and detailed breakdowns of each session.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Usage Analytics</h4>
                      <p className="text-sm text-muted-foreground">File type analysis and organizational pattern tracking to optimize future processing workflows.</p>
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
                      <span className="text-muted-foreground">ZIP Library</span>
                      <span>JSZip</span>
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

                {/* File Type Support */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50 space-y-4">
                  <h3 className="font-semibold">File Type Support</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Images (JPG, PNG, GIF, SVG)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Videos (MP4, AVI, MOV)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Documents (PDF, DOC, PPT)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Archives (ZIP, RAR, 7Z)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Audio (MP3, WAV, FLAC)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Code (JS, TS, HTML, CSS)</span>
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
                  Deep dive into the technical implementation and architecture of File Organizer Pro.
                </p>
              </div>

              {/* Architecture & File Processing */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">File Processing Engine</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Smart Grouping Algorithm</div>
                      <div className="text-muted-foreground pl-2">Pattern recognition and file type analysis for intelligent organization</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">JSZip Integration</div>
                      <div className="text-muted-foreground pl-2">Client-side ZIP generation with progress tracking</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">File Type Detection</div>
                      <div className="text-muted-foreground pl-2">Extension-based categorization with color coding</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Thumbnail Generation</div>
                      <div className="text-muted-foreground pl-2">Canvas-based image thumbnail creation</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">UI/UX Architecture</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Custom Cursor System</div>
                      <div className="text-muted-foreground">Context-aware cursor with smooth tracking</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Drag & Drop Engine</div>
                      <div className="text-muted-foreground">Advanced file handling with visual feedback</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Animation Framework</div>
                      <div className="text-muted-foreground">Scroll reveal and parallax effect system</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">History Management</div>
                      <div className="text-muted-foreground">Local storage-based session tracking</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Organization Algorithm */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">File Organization Algorithm</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Pattern Recognition Logic</h4>
                      <div className="p-3 rounded-lg bg-background/50 text-sm font-mono text-muted-foreground">
                        shouldGroupByName(files) {`{`}<br/>
                        &nbsp;&nbsp;const baseNames = files.map(parseFileName)<br/>
                        &nbsp;&nbsp;return uniqueNames.size &lt; files.length<br/>
                        {`}`}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Organization Strategy</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Analyze file naming patterns</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Group by name or file type</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Create organized folder structure</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Generate ZIP with progress</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">File Categories</h4>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">Images</div>
                          <div className="text-muted-foreground">JPG, PNG, GIF, SVG, WebP</div>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">Videos</div>
                          <div className="text-muted-foreground">MP4, AVI, MOV, WebM</div>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">Documents</div>
                          <div className="text-muted-foreground">PDF, DOC, PPT, XLS</div>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">Archives</div>
                          <div className="text-muted-foreground">ZIP, RAR, 7Z, TAR</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animation & Performance */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Animation System</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Scroll Reveal</div>
                      <div className="text-sm text-muted-foreground">Intersection Observer-based reveals with timing control</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Custom Cursor</div>
                      <div className="text-sm text-muted-foreground">Mouse tracking with smooth follow animations</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Ripple Effects</div>
                      <div className="text-sm text-muted-foreground">Click-triggered ripple animations for interactive feedback</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Performance Features</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">File Processing</div>
                      <div className="text-sm text-muted-foreground">Efficient file handling with streaming and chunking</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Memory Management</div>
                      <div className="text-sm text-muted-foreground">Optimized image thumbnail generation with canvas</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">State Management</div>
                      <div className="text-sm text-muted-foreground">React hooks for efficient re-rendering</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Structure */}
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
                                { name: "AnimatedBackground.tsx", type: "file" },
                                { name: "CustomCursor.tsx", type: "file" },
                                { name: "DragDropZone.tsx", type: "file", icon: "- Upload" },
                                { name: "FilePreview.tsx", type: "file", icon: "- Display" },
                                { name: "HistoryModal.tsx", type: "file", icon: "- Track" },
                                { name: "ScrollReveal.tsx", type: "file" },
                                { name: "RippleButton.tsx", type: "file" }
                              ]
                            },
                            {
                              name: "utils",
                              type: "folder",
                              children: [
                                { name: "fileUtils.ts", type: "file", icon: "- Type detection" },
                                { name: "historyUtils.ts", type: "file", icon: "- Tracking" },
                                { name: "thumbnailGenerator.ts", type: "file" },
                                { name: "patternRecognition.ts", type: "file" },
                                { name: "zipProcessor.ts", type: "file", icon: "- JSZip" }
                              ]
                            },
                            { name: "App.tsx", type: "file", icon: "- Main component" },
                            { name: "main.tsx", type: "file", icon: "- Entry point" }
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
                          name: "File Organization",
                          type: "folder",
                          children: [
                            { name: "Smart Grouping", type: "file", icon: "- Pattern based" },
                            { name: "Type Detection", type: "file", icon: "- Extensions" },
                            { name: "ZIP Generation", type: "file", icon: "- JSZip" }
                          ]
                        },
                        {
                          name: "UI/UX System",
                          type: "folder",
                          children: [
                            { name: "Drag & Drop", type: "file", icon: "- File upload" },
                            { name: "Custom Cursor", type: "file", icon: "- Smooth tracking" },
                            { name: "Animations", type: "file", icon: "- Scroll reveal" },
                            { name: "History", type: "file", icon: "- Track processed" }
                          ]
                        },
                        {
                          name: "Processing",
                          type: "folder",
                          children: [
                            { name: "Thumbnails", type: "file", icon: "- Canvas API" },
                            { name: "Pattern Match", type: "file", icon: "- Smart grouping" },
                            { name: "Progress", type: "file", icon: "- Real-time" }
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
                  Screenshots and visual highlights from the File Organizer Pro application.
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

            <ProjectRating projectId="file-organizer" />

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

