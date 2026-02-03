"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowLeft, Calendar, User, Award, MessageSquare, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageModal } from "@/components/image-modal"
import { AnimatedFileTree } from "@/components/animated-file-tree"
import { ProjectRating } from "@/components/project-rating"

const projectData = {
  title: "AnimeSphere Platform",
  description: "A comprehensive anime streaming platform with advanced user management, social features, and AI-powered content moderation.",
  longDescription: `AnimeSphere is a full-stack anime streaming platform built with React, TypeScript, and Supabase. This project represents a complete social anime platform with advanced features including user profiles, comment systems, badge systems, follower/following functionality, and AI-powered content moderation using Google's Gemini AI.

The platform showcases enterprise-level development practices with comprehensive user management, real-time interactions, custom URL systems, animated badge collections, and sophisticated content moderation systems. Built with modern web technologies and following best practices for scalability and user experience.`,
  image: "https://i.postimg.cc/P5CHscXT/Website-Home.png",
  techStack: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion", "Google Gemini AI", "Vite", "PostgreSQL"],
  category: "Real Project",
  timeline: "2024",
  role: "Full Stack Developer",
  liveUrl: "https://animespheree.netlify.app/",
  githubUrl: "#",
  features: [
    "Advanced User Profile System",
    "Social Features (Follow/Unfollow)",
    "Real-time Comment System",
    "AI-Powered Content Moderation",
    "Custom Badge System with Animations",
    "Custom URL for Developers",
    "Profile Editing with Media Upload",
    "Bookmark & Like System",
    "Activity Tracking",
    "Responsive Design",
  ],
  challenges: [
    "Implementing real-time social features with Supabase",
    "Building a scalable badge system with custom animations",
    "Integrating AI moderation with Google Gemini API",
    "Creating complex user profile systems with caching",
    "Managing state for social interactions and notifications",
    "Optimizing performance for real-time updates",
  ],
  gallery: [
    {
      image: "https://i.postimg.cc/P5CHscXT/Website-Home.png",
      title: "Homepage",
      description: "Modern anime streaming homepage with featured content"
    },
    {
      image: "https://i.postimg.cc/J44mK0SQ/Profile.png",
      title: "User Profile System",
      description: "Comprehensive user profiles with stats, badges, and social features"
    },
    {
      image: "https://i.postimg.cc/nccZTrN4/Comment-Section.png",
      title: "Comment System",
      description: "Real-time commenting with AI moderation and reactions"
    },
    {
      image: "https://i.postimg.cc/X773xqts/Animated-Badges.png",
      title: "Animated Badge System",
      description: "Custom animated badges with role-based permissions"
    }
  ]
}

export default function AnimeWebsitePage() {
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
                  <h2 className="text-2xl font-bold mb-4">About AnimeSphere Platform</h2>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {projectData.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Profile System */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Advanced Profile System
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Custom URL System</h4>
                      <p className="text-sm text-muted-foreground">Users can create custom URLs like '/user/developer-name' for easy profile sharing and professional branding.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Comprehensive Statistics</h4>
                      <p className="text-sm text-muted-foreground">Track user activity including comments count, likes received, bookmarks, days active, and engagement metrics.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Social Features</h4>
                      <p className="text-sm text-muted-foreground">Complete follow/unfollow system with follower counts, following lists, and social interaction tracking.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Profile Editing</h4>
                      <p className="text-sm text-muted-foreground">Rich profile editor with avatar upload, cover image, bio editing, social links, and preference management.</p>
                    </div>
                  </div>
                </div>

                {/* Badge System */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Custom Badge System
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Animated Badges</h4>
                      <p className="text-sm text-muted-foreground">Custom CSS animations for special badges including glow effects, pulse animations, and gradient backgrounds.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Badge Hierarchy</h4>
                      <p className="text-sm text-muted-foreground">Role-based badge system: Founder, Co-Founder, Staff, Developer, Voice Actor, Editor, Moderator, Supporter, and more.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Badge Distribution</h4>
                      <p className="text-sm text-muted-foreground">Automated badge assignment based on user activity, manual admin assignment, and achievement-based unlocking.</p>
                    </div>
                  </div>
                </div>

                {/* Comment & Moderation System */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Advanced Comment System
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">AI-Powered Moderation</h4>
                      <p className="text-sm text-muted-foreground">Integrated Google Gemini AI for automatic content moderation, detecting inappropriate content, spam, and toxic behavior.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Real-time Comments</h4>
                      <p className="text-sm text-muted-foreground">Live comment system with instant updates, reply threading, and reaction system (likes/dislikes).</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Restriction System</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive user restriction system with temporary bans, comment limitations, and escalating penalties.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Moderation Dashboard</h4>
                      <p className="text-sm text-muted-foreground">Admin tools for content review, user management, and automated action logs with manual override capabilities.</p>
                    </div>
                  </div>
                </div>

                {/* Backend & Architecture */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Backend Architecture
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Supabase Integration</h4>
                      <p className="text-sm text-muted-foreground">PostgreSQL database with real-time subscriptions, Row Level Security (RLS), and automatic API generation.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Authentication System</h4>
                      <p className="text-sm text-muted-foreground">Secure user authentication with email verification, password reset, and social login integration.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Database Design</h4>
                      <p className="text-sm text-muted-foreground">Optimized schema with user profiles, video metadata, comments, reactions, bookmarks, and activity tracking tables.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h4 className="font-medium mb-2">Performance Optimization</h4>
                      <p className="text-sm text-muted-foreground">Caching strategies, database indexing, lazy loading, and efficient state management for optimal user experience.</p>
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
                      <span>PostgreSQL (Supabase)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">AI Integration</span>
                      <span>Google Gemini API</span>
                    </div>
                  </div>
                </div>

                {/* Database Schema */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50 space-y-4">
                  <h3 className="font-semibold">Database Schema</h3>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="text-primary">Core Tables:</div>
                    <div className="pl-2 space-y-1 text-muted-foreground">
                      <div>• videos - Anime content</div>
                      <div>• user_profiles - Extended user info</div>
                      <div>• video_comments - Comment system</div>
                      <div>• comment_reactions - Like/dislike</div>
                      <div>• video_reactions - Video likes</div>
                      <div>• user_bookmarks - Saved content</div>
                      <div>• video_views - Analytics</div>
                    </div>
                  </div>
                </div>

                {/* Badge System Details */}
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50 space-y-4">
                  <h3 className="font-semibold">Badge Types</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Founder & Co-Founder</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Staff & Developer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Voice Actor & Editor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Moderator & Supporter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Verified & Special</span>
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
                  Deep dive into the technical implementation and architecture of AnimeSphere.
                </p>
              </div>

              {/* API & Database */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Database Schema</h3>
                  <div className="space-y-3 text-sm font-mono">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">users</div>
                      <div className="text-muted-foreground pl-2">id, email, created_at</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">user_profiles</div>
                      <div className="text-muted-foreground pl-2">id, full_name, avatar_url, bio, badges</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">video_comments</div>
                      <div className="text-muted-foreground pl-2">id, user_id, content, reactions</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="text-primary font-bold">user_followers</div>
                      <div className="text-muted-foreground pl-2">follower_id, following_id, created_at</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Badge System Architecture</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Badge Registry</div>
                      <div className="text-muted-foreground">Central system defining all badge types with visual properties</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Animation System</div>
                      <div className="text-muted-foreground">CSS-based animations for special badges (glow, pulse, gradient)</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Assignment Logic</div>
                      <div className="text-muted-foreground">Automated and manual badge distribution system</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Moderation Details */}
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                <h3 className="text-lg font-semibold mb-4">AI Moderation Implementation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Google Gemini Integration</h4>
                      <div className="p-3 rounded-lg bg-background/50 text-sm font-mono text-muted-foreground">
                        initializeGeminiModeration(apiKey)<br/>
                        → Content analysis<br/>
                        → Toxicity detection<br/>
                        → Automated action
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Moderation Pipeline</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Real-time comment scanning</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>AI content classification</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>Automated restrictions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Restriction System</h4>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">Level 1</div>
                          <div className="text-muted-foreground">Comment warning</div>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">Level 2</div>
                          <div className="text-muted-foreground">Temporary comment ban</div>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <div className="font-medium mb-1">Level 3</div>
                          <div className="text-muted-foreground">Account suspension</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance & Optimization */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Performance Optimizations</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Profile Caching</div>
                      <div className="text-sm text-muted-foreground">Smart caching system for user profiles with automatic invalidation</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Lazy Loading</div>
                      <div className="text-sm text-muted-foreground">Dynamic component loading for better initial page performance</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Real-time Updates</div>
                      <div className="text-sm text-muted-foreground">Supabase subscriptions for instant social interactions</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4">Security Features</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Row Level Security</div>
                      <div className="text-sm text-muted-foreground">Database-level security policies for data protection</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Input Sanitization</div>
                      <div className="text-sm text-muted-foreground">XSS protection and content filtering</div>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50">
                      <div className="font-medium text-foreground">Authentication</div>
                      <div className="text-sm text-muted-foreground">Secure JWT-based authentication with Supabase</div>
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
                                { name: "Header.tsx", type: "file" },
                                { name: "VideoCard.tsx", type: "file" },
                                { name: "CommentSection.tsx", type: "file" },
                                { name: "ProfileCard.tsx", type: "file" },
                                { name: "BadgeDisplay.tsx", type: "file" }
                              ]
                            },
                            {
                              name: "pages",
                              type: "folder",
                              children: [
                                { name: "Home.tsx", type: "file" },
                                { name: "Profile.tsx", type: "file" },
                                { name: "Video.tsx", type: "file" },
                                { name: "Settings.tsx", type: "file" }
                              ]
                            },
                            {
                              name: "lib",
                              type: "folder",
                              children: [
                                { name: "supabase.ts", type: "file", icon: "- DB client" },
                                { name: "gemini.ts", type: "file", icon: "- AI integration" }
                              ]
                            },
                            {
                              name: "contexts",
                              type: "folder",
                              children: [
                                { name: "AuthContext.tsx", type: "file" },
                                { name: "CommentContext.tsx", type: "file" }
                              ]
                            },
                            {
                              name: "hooks",
                              type: "folder",
                              children: [
                                { name: "useProfile.ts", type: "file" },
                                { name: "useFollower.ts", type: "file" }
                              ]
                            },
                            {
                              name: "types",
                              type: "folder",
                              children: [
                                { name: "user.ts", type: "file" },
                                { name: "comment.ts", type: "file" },
                                { name: "badge.ts", type: "file" }
                              ]
                            }
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
                          name: "User System",
                          type: "folder",
                          children: [
                            { name: "Profile Management", type: "file", icon: "- Custom URLs" },
                            { name: "Social Features", type: "file", icon: "- Follow system" },
                            { name: "Badge System", type: "file", icon: "- Animated badges" }
                          ]
                        },
                        {
                          name: "Content System",
                          type: "folder",
                          children: [
                            { name: "Comment System", type: "file", icon: "- Real-time" },
                            { name: "AI Moderation", type: "file", icon: "- Gemini AI" },
                            { name: "Reactions", type: "file", icon: "- Like/Dislike" }
                          ]
                        },
                        {
                          name: "Database",
                          type: "folder",
                          children: [
                            { name: "Supabase", type: "file", icon: "- PostgreSQL" },
                            { name: "Real-time", type: "file", icon: "- Subscriptions" },
                            { name: "RLS", type: "file", icon: "- Security" }
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
                  Screenshots and visual highlights from the AnimeSphere platform.
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

            <ProjectRating projectId="anime-website" />

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
