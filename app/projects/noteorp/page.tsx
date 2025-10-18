"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowLeft, Calendar, User, Edit, CheckSquare, Timer, Target, Brain, Code, Music, Map, Mail, Calculator, Settings, Smartphone, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageModal } from "@/components/image-modal"

const projectData = {
  title: "Noteorp",
  description: "Revolutionary all-in-one productivity workspace that eliminates context switching by unifying notes, tasks, habits, focus tools, email, AI assistance, and collaboration into one intelligent platform.",
  longDescription: `Noteorp represents the future of productivity software - a comprehensive digital workspace that solves the modern problem of productivity fragmentation. Instead of juggling dozens of separate applications for notes, tasks, habits, emails, and focus management, Noteorp unifies everything into one intelligent, privacy-first environment.

Built from the ground up with cutting-edge technologies including React, TypeScript, and advanced AI integration, Noteorp transforms productivity from a constant struggle into a seamless, enjoyable experience. The platform features sophisticated Gallery views with aspect-ratio optimized cards, AI-generated image management with metadata preservation, advanced file operations with smart filtering and bulk actions, and a comprehensive gamification system that makes habit tracking engaging and motivating.

With offline-first architecture, end-to-end encryption using WebCrypto API, real-time collaboration powered by Yjs, and AI intelligence from Groq and Gemini models, Noteorp doesn't just organize your work - it amplifies your potential and adapts to how you actually think and work.`,
  image: "https://i.postimg.cc/VLhRLZ88/Screenshot-2025-10-18-003219.png",
  techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "TipTap", "Framer Motion", "Zustand", "Dexie", "Yjs", "Groq AI", "Gemini AI", "Tesseract.js", "Radix UI", "React Query", "WebCrypto API"],
  category: "Practice Project",
  timeline: "2024",
  role: "Full Stack Developer",
  liveUrl: "https://noteorp.netlify.app/",
  githubUrl: "#",
  features: [
    "Gallery View with Aspect-Ratio Optimized Cards (4:3 ratio)",
    "AI-Generated Image Gallery with Metadata Preservation",
    "Smart Visual Organization with Dynamic Color Themes",
    "Advanced File Management with Bulk Operations",
    "Rich Text Editor with Markdown & Code Block Support",
    "AI-Powered Content Analysis (Groq & Gemini Integration)",
    "Real-time Collaboration with Live Cursors & Presence",
    "Gamified Habit System with XP & Achievement Badges",
    "Advanced Pomodoro Timer with Background-Safe Operation",
    "Interactive Mind Mapping with Knowledge Graphs",
    "Gmail Sync with Email-to-Task Conversion",
    "Voice-to-Text with Real-time AI Transcription",
    "OCR Text Extraction with Tesseract.js",
    "Command Palette Navigation (Ctrl+K)",
    "Offline-First Architecture with IndexedDB",
    "End-to-End Encryption using WebCrypto API",
    "PWA Support with Native Installation",
    "Kanban Boards with Drag-and-Drop Management",
    "YouTube Integration with Focus Playlists",
    "Natural Language Task Creation",
    "Smart Filtering by File Types & Properties",
    "Multiple View Modes (Grid, List, Gallery)",
    "Drag & Drop File Upload with Auto-Detection",
    "ZIP Export with Organized Folder Structure",
  ],
  challenges: [
    "Implementing real-time collaboration with Yjs and WebRTC for seamless multi-user editing",
    "Building sophisticated AI integration with multiple models (Groq, Gemini) for content analysis",
    "Creating complex gamification system with XP, levels, achievements, and streak rewards",
    "Managing offline-first architecture with IndexedDB and sync capabilities",
    "Implementing end-to-end encryption using WebCrypto API for privacy-first design",
    "Building advanced TipTap rich text editor with custom extensions and markdown shortcuts",
    "Creating seamless Gmail integration with OAuth and email-to-task conversion",
    "Optimizing performance for large datasets with virtual scrolling and efficient queries",
  ],
  gallery: [
    {
      image: "https://i.postimg.cc/6qwJ85JD/Screenshot-2025-09-10-152638.png",
      title: "Dashboard Overview",
      description: "Modern productivity dashboard with unified access to all tools"
    },
    {
      image: "https://i.postimg.cc/bNfkvZCg/Screenshot-2025-10-18-003756.png",
      title: "Create Note",
      description: "Create rich notes with TipTap editor and AI assistance"
    },
    {
      image: "https://i.postimg.cc/gk2cs4QC/Screenshot-2025-10-18-002057.png",
      title: "Rich Text Editor",
      description: "TipTap-powered editor with markdown shortcuts and AI assistance"
    },
    {
      image: "https://i.postimg.cc/sDLcDHrj/Screenshot-2025-10-18-003146.png",
      title: "Task Management",
      description: "Intelligent task system with natural language processing"
    },
    {
      image: "https://i.postimg.cc/Nfn4fCc0/Screenshot-2025-10-18-003246.png",
      title: "Habit Tracking",
      description: "Gamified habit system with XP, levels, and achievement badges"
    },
    {
      image: "https://i.postimg.cc/VLhRLZ88/Screenshot-2025-10-18-003219.png",
      title: "Focus Mode",
      description: "Pomodoro timer with ambient sounds and distraction blocking"
    },
    {
      image: "https://i.postimg.cc/PJhsCrnn/Screenshot-2025-09-10-152726.png",
      title: "Mind Mapping",
      description: "Interactive node-based mind maps for visual brainstorming"
    },
    {
      image: "https://i.postimg.cc/GhfQhgCG/Screenshot-2025-10-18-003336.png",
      title: "Email Integration",
      description: "Gmail sync with email-to-task conversion and smart filtering"
    },
    {
      image: "https://i.postimg.cc/PJ4GYsdJ/Screenshot-2025-09-10-225101.png",
      title: "Kanban Board",
      description: "Drag-and-drop project management with visual workflow"
    },
    {
      image: "https://i.postimg.cc/nrk8Bbnj/Screenshot-2025-09-16-020458.png",
      title: "AI Assistant",
      description: "Groq & Gemini AI integration for content analysis and assistance"
    },
    {
      image: "https://i.postimg.cc/cJXmV1Lj/Screenshot-2025-09-10-152704.png",
      title: "Calendar View",
      description: "Integrated calendar with event tracking and scheduling"
    },
    {
      image: "https://i.postimg.cc/LsNTr4sM/Screenshot-2025-09-10-225017.png",
      title: "Voice Notes",
      description: "Real-time voice-to-text transcription with AI processing"
    },
    {
      image: "https://i.postimg.cc/ZqVc1Yqn/Screenshot-2025-09-16-021422.png",
      title: "Image Generation Results",
      description: "AI-driven image generation with customizable styles and parameters"
    },
    {
      image: "https://i.postimg.cc/GpqQZ3m7/Screenshot-2025-09-08-170036.png",
      title: "Image Generation",
      description: "Generate images from text prompts using Stable Diffusion"
    },
    {
      image: "https://i.postimg.cc/jd1Xd3bC/Screenshot_2025-10-18_003304.png",
      title: "Image Generation",
      description: "Create custom images with AI-powered generation tools"
    },
    {
      image: "https://i.postimg.cc/6QY0D6p1/Screenshot-2025-09-08-161214.png",
      title: "Your saved images",
      description: "Manage and view your AI-generated images in one place"
    }, 
    {
      image: "https://i.postimg.cc/dtfBtNYL/Screenshot-2025-10-18-003317.png",
      title: "AI Summarizer",
      description: "Intelligent summarization of notes and tasks using AI"
    },
    {
      image: "https://i.postimg.cc/3JqBJfT0/Screenshot_2025-10-18_003356.png",
      title: "Micro Tools",
      description: "Built in daily life tools for productivity"
    }
  ]
}

export default function NoteorpPage() {
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
                  <h2 className="text-2xl font-bold mb-4">About Noteorp</h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {projectData.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Gallery & Visual Management */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Edit className="w-5 h-5" />
                    Gallery & Visual Project Management
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🎨 Gallery View Mode</h4>
                      <p className="text-sm text-muted-foreground">Sophisticated visual layout with aspect-ratio optimized cards (4:3 ratio) for maximum visual appeal and instant project recognition.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🖼️ AI-Generated Image Gallery</h4>
                      <p className="text-sm text-muted-foreground">Dedicated gallery for AI-created images with full metadata preservation, generation prompts, model information, and smart aspect ratio detection.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📁 Advanced File Management</h4>
                      <p className="text-sm text-muted-foreground">Multiple view modes (Grid, List, Gallery), smart filtering by file types, bulk operations, and drag & drop uploads with automatic type detection.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🎯 Dynamic Visual Organization</h4>
                      <p className="text-sm text-muted-foreground">Customizable color themes, professional icons, cover images for instant visual identification, and organized ZIP export functionality.</p>
                    </div>
                  </div>
                </div>

                {/* Note-Taking & Writing Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Edit className="w-5 h-5" />
                    Advanced Note-Taking & Writing
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📝 Rich Text Editor</h4>
                      <p className="text-sm text-muted-foreground">TipTap-powered editor with markdown shortcuts, code blocks, task lists, and image support for seamless writing experience.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🗂️ Smart Organization</h4>
                      <p className="text-sm text-muted-foreground">Nested folders, dynamic tags, and full-text search with advanced filtering and organization capabilities.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🎤 Voice-to-Text</h4>
                      <p className="text-sm text-muted-foreground">Real-time voice transcription using Groq AI and Gemini integration for hands-free note taking.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📄 Document Support</h4>
                      <p className="text-sm text-muted-foreground">Import/export Word, PDF, Excel, CSV files with OCR processing for text extraction from images.</p>
                    </div>
                  </div>
                </div>

                {/* Project & Task Management */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <CheckSquare className="w-5 h-5" />
                    Intelligent Task Management
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📋 Kanban Boards</h4>
                      <p className="text-sm text-muted-foreground">Drag-and-drop project management with visual workflow tracking and customizable columns.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🧠 Smart Task Creation</h4>
                      <p className="text-sm text-muted-foreground">Natural language interpretation for tasks like "Meet John tomorrow at 2pm" with automatic scheduling.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🎯 Priority Detection</h4>
                      <p className="text-sm text-muted-foreground">AI-based importance marking with automated priority scoring and deadline suggestions.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🔄 Recurring Tasks</h4>
                      <p className="text-sm text-muted-foreground">Automatable and adaptive scheduling with intelligent recurring task management.</p>
                    </div>
                  </div>
                </div>

                {/* Focus & Time Management */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    Advanced Focus Tools
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">⏰ Pomodoro Timer</h4>
                      <p className="text-sm text-muted-foreground">Background-safe timers that work in inactive tabs with session history and deep work tracking.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🚫 Distraction Blocking</h4>
                      <p className="text-sm text-muted-foreground">Intelligent website and application blocking during focus sessions with smart break reminders.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🎵 Ambient Sounds</h4>
                      <p className="text-sm text-muted-foreground">Integrated focus music and nature sounds with YouTube integration and playlist control.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📊 Focus Analytics</h4>
                      <p className="text-sm text-muted-foreground">Detailed analytics on focus sessions with productivity insights and improvement suggestions.</p>
                    </div>
                  </div>
                </div>

                {/* Gamified Habit Tracking */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Gamified Habit System
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🎮 XP & Leveling</h4>
                      <p className="text-sm text-muted-foreground">Experience points with level progression from Beginner to Legend with celebration animations.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🔥 Streak Rewards</h4>
                      <p className="text-sm text-muted-foreground">Fire logos and multiplier rewards up to 5x for 365-day streaks with milestone celebrations.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🏆 Achievement Badges</h4>
                      <p className="text-sm text-muted-foreground">15+ badges with common, rare, epic, and legendary ranks for various accomplishments.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📈 Progress Visualization</h4>
                      <p className="text-sm text-muted-foreground">Weekly heatmaps and detailed statistics with habit category tracking and insights.</p>
                    </div>
                  </div>
                </div>

                {/* AI & Advanced Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI-Powered Intelligence
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🤖 Groq & Gemini Integration</h4>
                      <p className="text-sm text-muted-foreground">Top-tier language models (llama-3.1-70b, mixtral-8x7b) for content analysis and intelligent assistance.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📝 Writing Assistant</h4>
                      <p className="text-sm text-muted-foreground">Context-sensitive suggestions, content summarization, and keyword extraction with PII detection.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">🔍 Knowledge Graphs</h4>
                      <p className="text-sm text-muted-foreground">AI-detected connections between tasks and notes with interactive mind mapping visualization.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">📊 Task Intelligence</h4>
                      <p className="text-sm text-muted-foreground">Automated priority scoring, deadline suggestions, and intelligent task categorization.</p>
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
                      <span className="text-muted-foreground">Database</span>
                      <span>Dexie (IndexedDB)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">AI Models</span>
                      <span>Groq & Gemini</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Collaboration</span>
                      <span>Yjs + WebRTC</span>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50 space-y-4">
                  <h3 className="font-semibold">Core Features</h3>
                  <div className="space-y-2 text-sm">
                    {projectData.features.slice(0, 8).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Productivity Tools */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50 space-y-4">
                  <h3 className="font-semibold">Integrated Tools</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-blue-500" />
                      <span>YouTube Music Player</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Map className="w-4 h-4 text-green-500" />
                      <span>Interactive Mind Maps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-500" />
                      <span>Gmail Integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-orange-500" />
                      <span>Built-in Calculator</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-red-500" />
                      <span>Command Palette</span>
                    </div>
                  </div>
                </div>

                {/* Architecture Highlights */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50 space-y-4">
                  <h3 className="font-semibold">Architecture</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-blue-500" />
                      <span>PWA with Offline Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>End-to-End Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span>Real-time Collaboration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-500" />
                      <span>Privacy-First Design</span>
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
                  Deep dive into the sophisticated technical implementation of Noteorp's all-in-one productivity platform, with special focus on the Gallery system's advanced visual management capabilities.
                </p>
              </div>

              {/* Gallery System Architecture */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">Gallery System Architecture</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Aspect-Ratio Optimization</div>
                      <div className="text-muted-foreground">Dynamic aspect ratio detection (4:3, 16:9, 9:16, square) with smart CSS class generation for perfect visual layouts</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">AI Image Metadata</div>
                      <div className="text-muted-foreground">Sophisticated parsing system for AI-generated images with prompt preservation, model tracking, and generation timestamp storage</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Smart File Operations</div>
                      <div className="text-muted-foreground">Advanced bulk operations with ZIP export, organized folder structures, and intelligent file type detection</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Visual Thumbnails</div>
                      <div className="text-muted-foreground">Automatic thumbnail generation using Canvas API with configurable dimensions and optimization</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Architecture & Core Features */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Offline-First Architecture</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">IndexedDB with Dexie</div>
                      <div className="text-muted-foreground pl-2">Local-first data storage with optimistic UI and sync capabilities</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Zustand State Management</div>
                      <div className="text-muted-foreground pl-2">Reactive state management with persistence and middleware</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Progressive Web App</div>
                      <div className="text-muted-foreground pl-2">Native app experience with offline functionality</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Real-time Collaboration</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Yjs Collaborative Editing</div>
                      <div className="text-muted-foreground pl-2">Conflict-free replicated data types for real-time editing</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">WebRTC Connection</div>
                      <div className="text-muted-foreground pl-2">Peer-to-peer communication with live cursors and presence</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">TipTap Extensions</div>
                      <div className="text-muted-foreground pl-2">Custom editor extensions for collaborative features</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Integration */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">AI Integration & Processing</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Groq AI Integration</div>
                      <div className="text-muted-foreground">llama-3.1-70b and mixtral-8x7b for content analysis and summarization</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Gemini AI Models</div>
                      <div className="text-muted-foreground">Google's Gemini for voice transcription and intelligent assistance</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">OCR with Tesseract.js</div>
                      <div className="text-muted-foreground">Client-side text extraction from images and documents</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Natural Language Processing</div>
                      <div className="text-muted-foreground">Smart task creation from natural language input</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Privacy & Security</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">End-to-End Encryption</div>
                      <div className="text-muted-foreground pl-2">WebCrypto API for client-side encryption</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Zero Telemetry</div>
                      <div className="text-muted-foreground pl-2">No tracking without explicit user permission</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Local Data Storage</div>
                      <div className="text-muted-foreground pl-2">Data stays on user's device by default</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Performance Optimization</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Reactive Queries</div>
                      <div className="text-muted-foreground pl-2">React Query for efficient data fetching and caching</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Fast Search</div>
                      <div className="text-muted-foreground pl-2">Full-text search in &lt;300ms with MiniSearch</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Micro-interactions</div>
                      <div className="text-muted-foreground pl-2">Framer Motion for smooth 60fps animations</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Features */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">Advanced Feature Implementation</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Habit Gamification</h4>
                    <div className="space-y-2">
                      <div className="p-2 rounded bg-background/50">XP calculation algorithms</div>
                      <div className="p-2 rounded bg-background/50">Streak multiplier system</div>
                      <div className="p-2 rounded bg-background/50">Achievement badge engine</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Focus Timer System</h4>
                    <div className="space-y-2">
                      <div className="p-2 rounded bg-background/50">Background-safe timers</div>
                      <div className="p-2 rounded bg-background/50">Ambient sound integration</div>
                      <div className="p-2 rounded bg-background/50">Distraction blocking</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Email Integration</h4>
                    <div className="space-y-2">
                      <div className="p-2 rounded bg-background/50">Gmail API integration</div>
                      <div className="p-2 rounded bg-background/50">Email-to-task conversion</div>
                      <div className="p-2 rounded bg-background/50">Smart email filtering</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Development Tools */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">Development & Build Tools</h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-medium mb-3 text-primary">Frontend Stack</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 rounded bg-background/50">
                        <span>Build Tool</span>
                        <span className="text-muted-foreground">Vite</span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-background/50">
                        <span>Framework</span>
                        <span className="text-muted-foreground">React 18</span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-background/50">
                        <span>Language</span>
                        <span className="text-muted-foreground">TypeScript</span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-background/50">
                        <span>Styling</span>
                        <span className="text-muted-foreground">Tailwind CSS</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-primary">Key Libraries</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 rounded bg-background/50">
                        <span>UI Components</span>
                        <span className="text-muted-foreground">Radix UI</span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-background/50">
                        <span>Rich Text Editor</span>
                        <span className="text-muted-foreground">TipTap</span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-background/50">
                        <span>Animations</span>
                        <span className="text-muted-foreground">Framer Motion</span>
                      </div>
                      <div className="flex justify-between p-2 rounded bg-background/50">
                        <span>Charts</span>
                        <span className="text-muted-foreground">Recharts</span>
                      </div>
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
                  Visual showcase of Noteorp's comprehensive productivity platform features.
                </p>
                <p className="text-sm text-muted-foreground">
                  Gallery items count: {projectData.gallery.length}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectData.gallery.map((item, index) => {
                  console.log('Rendering gallery item:', index, item.title, item.image);
                  return (
                    <div
                      key={index}
                      className="group relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer"
                      onClick={() => {
                        setCurrentImageIndex(index)
                        setIsModalOpen(true)
                      }}
                    >
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          console.log('Image failed to load:', item.image);
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', item.image);
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                  );
                })}
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
