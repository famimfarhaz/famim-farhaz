"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowLeft, Calendar, User, Tag, Brain, Sparkles, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageModal } from "@/components/image-modal"
import { AnimatedFileTree } from "@/components/animated-file-tree"
import { ProjectRating } from "@/components/project-rating"

const projectData = {
  title: "Vector AI",
  description: "Advanced AI-powered conversational assistant with web search, image generation, and text-to-speech capabilities using Google Gemini API.",
  longDescription: `Vector AI is a sophisticated AI assistant platform built with Next.js 16, React 19, and TypeScript that showcases cutting-edge artificial intelligence capabilities. The project demonstrates modern RAG (Retrieval-Augmented Generation) patterns with real-time web search integration, AI-powered image generation, and text-to-speech conversion.

The platform leverages Google's Gemini 1.5 Flash AI model to provide intelligent conversational responses with context awareness. It features a beautiful dark-themed UI with smooth animations, real-time streaming responses, and an intuitive multi-tool system that allows users to seamlessly switch between chat, web search, image generation, and voice synthesis modes.`,
  image: "https://i.postimg.cc/FKnXgQDW/Chat.png",
  techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Google Gemini AI", "Radix UI", "Three.js", "Framer Motion", "React Markdown", "Serper API"],
  category: "AI Project",
  timeline: "2025",
  role: "Full Stack Developer",
  liveUrl: "#",
  githubUrl: "#",
  features: [
    "AI Chat with Google Gemini 1.5 Flash",
    "Real-time Web Search Integration",
    "AI Image Generation",
    "Text-to-Speech Conversion",
    "Image Upload & Analysis",
    "Markdown Response Formatting",
    "Source Citation System",
    "Beautiful Dark Theme UI",
    "Smooth Animations with Framer Motion",
    "3D Shader Loading Effects",
    "Multi-tool System",
    "Responsive Mobile Design",
  ],
  challenges: [
    "Implementing RAG pattern with Google Gemini API",
    "Integrating real-time web search with Serper API",
    "Building multi-modal AI system (text, image, voice)",
    "Creating smooth streaming responses with retry logic",
    "Designing intuitive multi-tool interface",
    "Implementing image upload and analysis features",
    "Building custom audio player component",
    "Creating 3D shader-based loading animations",
    "Handling API rate limits and fallback strategies",
    "Optimizing response generation with model fallbacks",
  ],
  gallery: [
    {
      image: "https://i.postimg.cc/FKnXgQDW/Chat.png",
      title: "AI Chat Interface",
      description: "Clean conversational interface with markdown support and smooth animations"
    },
    {
      image: "https://i.postimg.cc/zBcDBgsv/Web-Search.png",
      title: "Web Search Mode",
      description: "Real-time web search integration with source citations and image results"
    },
    {
      image: "https://i.postimg.cc/8CngBVt2/image_generation.png",
      title: "Image Generation",
      description: "AI-powered image generation with loading animations and quality enhancements"
    },
    {
      image: "https://i.postimg.cc/TPHvqXCZ/image_generated.png",
      title: "Generated Images",
      description: "High-quality AI-generated images with download functionality"
    },
    {
      image: "https://i.postimg.cc/TwLMtH4t/Source_pop_up.png",
      title: "Source Citations",
      description: "Comprehensive source popup with links, snippets, and metadata"
    },
    {
      image: "https://i.postimg.cc/wvy8wbG0/Text_to_Voice_generation.png",
      title: "Text-to-Speech",
      description: "Voice synthesis with custom audio player and download options"
    },
    {
      image: "https://i.postimg.cc/VNHPBcDg/All_tools.png",
      title: "Multi-Tool System",
      description: "Intuitive tool selection interface for all AI capabilities"
    }
  ]
}

export default function VectorAIPage() {
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
                  <h2 className="text-2xl font-bold mb-4">About Vector AI</h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {projectData.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* AI Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Capabilities
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Conversational AI with Gemini</h4>
                      <p className="text-sm text-muted-foreground">Powered by Google's Gemini 1.5 Flash model with intelligent context awareness, multi-turn conversations, and advanced reasoning capabilities. Supports markdown formatting and code syntax highlighting.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Real-time Web Search</h4>
                      <p className="text-sm text-muted-foreground">Integration with Serper API for live web search results. Provides up-to-date information with source citations, web links, and image results directly in the conversation.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">AI Image Generation</h4>
                      <p className="text-sm text-muted-foreground">Generate high-quality images from text prompts using Pollinations AI with flux-realism model. Includes automatic prompt enhancement for photorealistic results.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Text-to-Speech Synthesis</h4>
                      <p className="text-sm text-muted-foreground">Convert any text to natural-sounding voice using StreamElements TTS API. Features custom audio player with playback controls and download functionality.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Image Upload & Analysis</h4>
                      <p className="text-sm text-muted-foreground">Upload images for AI analysis and description. Combines vision AI with web search for comprehensive image understanding and context.</p>
                    </div>
                  </div>
                </div>

                {/* UI/UX Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    User Experience & Design
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Dark Theme with Animations</h4>
                      <p className="text-sm text-muted-foreground">Beautiful dark theme with minimalist design, smooth animations, and elegant transitions. Features text shimmer effects and 3D shader-based loading animations.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Multi-Tool Interface</h4>
                      <p className="text-sm text-muted-foreground">Intuitive tool selection system with popover menu. Easily switch between chat, web search, image generation, and voice synthesis modes.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Source Citation System</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive source popup showing all web search results with titles, snippets, favicons, and direct links. Supports batch opening and link copying.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Responsive Design</h4>
                      <p className="text-sm text-muted-foreground">Fully responsive interface optimized for desktop and mobile devices with touch-friendly interactions and adaptive layouts.</p>
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
                      <span className="text-muted-foreground">AI Model</span>
                      <span>Gemini 1.5 Flash</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">UI Library</span>
                      <span>Radix UI</span>
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
                      <span>Artificial Intelligence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>RAG Implementation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Modern UI/UX</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Multi-modal AI</span>
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
                  Deep dive into the technical implementation and architecture of Vector AI platform.
                </p>
              </div>

              {/* Architecture & Tech Stack */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Frontend Architecture</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Next.js 16 App Router</div>
                      <div className="text-muted-foreground pl-2">Server and client components with React 19</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">TypeScript</div>
                      <div className="text-muted-foreground pl-2">Full type safety with strict mode enabled</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Tailwind CSS v4</div>
                      <div className="text-muted-foreground pl-2">Modern utility-first styling with custom theme</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Radix UI</div>
                      <div className="text-muted-foreground pl-2">Accessible component primitives</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">AI Integration</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Google Gemini API</div>
                      <div className="text-muted-foreground pl-2">Gemini 1.5 Flash with model fallback system</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Serper API</div>
                      <div className="text-muted-foreground pl-2">Real-time web search and image results</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">Pollinations AI</div>
                      <div className="text-muted-foreground pl-2">Flux-realism model for image generation</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">StreamElements TTS</div>
                      <div className="text-muted-foreground pl-2">Natural voice synthesis with multiple voices</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RAG Implementation */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">RAG Pattern Implementation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Retrieval Phase</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Web search with Serper API</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Image keyword extraction</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Context building from results</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Source aggregation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Generation Phase</h4>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">Context Injection</div>
                          <div className="text-muted-foreground">Web results added to prompt</div>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">Model Generation</div>
                          <div className="text-muted-foreground">Gemini processes with citations</div>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">Response Formatting</div>
                          <div className="text-muted-foreground">Markdown with source links</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Routes */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">API Routes</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">/api/vector</div>
                      <div className="text-sm text-muted-foreground">Main AI endpoint with RAG</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">/api/tts</div>
                      <div className="text-sm text-muted-foreground">Text-to-speech generation</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Error Handling</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Retry Logic</div>
                      <div className="text-sm text-muted-foreground">3 attempts with exponential backoff</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Model Fallback</div>
                      <div className="text-sm text-muted-foreground">Automatic switch to backup models</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Rate Limiting</div>
                      <div className="text-sm text-muted-foreground">Graceful 429/503 handling</div>
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
                            { name: "page.tsx", type: "file", icon: "- Main chat UI" },
                            { name: "layout.tsx", type: "file", icon: "- Root layout" },
                            { name: "globals.css", type: "file", icon: "- Global styles" },
                            {
                              name: "api",
                              type: "folder",
                              children: [
                                {
                                  name: "vector",
                                  type: "folder",
                                  children: [
                                    { name: "route.ts", type: "file", icon: "- AI endpoint" }
                                  ]
                                },
                                {
                                  name: "tts",
                                  type: "folder",
                                  children: [
                                    { name: "route.ts", type: "file", icon: "- TTS endpoint" }
                                  ]
                                }
                              ]
                            },
                            {
                              name: "components",
                              type: "folder",
                              children: [
                                { name: "PromptBox.tsx", type: "file", icon: "- Input system" },
                                {
                                  name: "ui",
                                  type: "folder",
                                  children: [
                                    { name: "audio-player.tsx", type: "file" },
                                    { name: "ImageWithLoader.tsx", type: "file" },
                                    { name: "paper-shader-loader.tsx", type: "file" },
                                    { name: "star-button.tsx", type: "file" },
                                    { name: "text-shimmer-wave.tsx", type: "file" }
                                  ]
                                }
                              ]
                            }
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
                          name: "Chat System",
                          type: "folder",
                          children: [
                            { name: "Message List", type: "file", icon: "- Conversation display" },
                            { name: "PromptBox", type: "file", icon: "- Input interface" },
                            { name: "SourcesButton", type: "file", icon: "- Citation popup" }
                          ]
                        },
                        {
                          name: "AI Tools",
                          type: "folder",
                          children: [
                            { name: "Web Search", type: "file", icon: "- Real-time search" },
                            { name: "Image Generation", type: "file", icon: "- AI image gen" },
                            { name: "Text-to-Speech", type: "file", icon: "- Voice synthesis" },
                            { name: "Image Upload", type: "file", icon: "- Vision analysis" }
                          ]
                        },
                        {
                          name: "UI Components",
                          type: "folder",
                          children: [
                            { name: "AudioPlayer", type: "file", icon: "- Audio playback" },
                            { name: "ImageWithLoader", type: "file", icon: "- Lazy loading" },
                            { name: "ShaderLoader", type: "file", icon: "- 3D animations" },
                            { name: "StarButton", type: "file", icon: "- Interactive btn" }
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
                  Screenshots and visual highlights from the Vector AI platform showcasing all features and capabilities.
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

            <ProjectRating projectId="vector-ai" />

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
