"use client"

import Link from "next/link"
import { ArrowRight, LayoutDashboard, BrainCircuit, Bolt, LineChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const caseStudies = [
  {
    slug: "smart-ops-hiring-platform",
    title: "SmartOps Hiring Platform – Streamlining Tech Recruitment",
    category: "Process & Workflow Optimization",
    summary:
      "Designed and built a modern hiring platform that reduced candidate screening time by 45% through automated workflows and clear, UX-focused interfaces.",
    icon: LayoutDashboard,
  },
  {
    slug: "green-grid-energy-dashboard",
    title: "GreenGrid Energy Dashboard – Real-time Energy Insights",
    category: "Niche Application Development",
    summary:
      "Created a real-time web dashboard for tracking building energy usage, surfacing actionable insights for facility managers.",
    icon: Bolt,
  },
  {
    slug: "ai-content-brief-assistant",
    title: "AI Content Brief Assistant – Faster, Better Briefs for Teams",
    category: "AI/ML Tool Development",
    summary:
      "Built an AI-powered assistant that helps teams generate structured content briefs using custom prompts and domain-specific tone controls.",
    icon: BrainCircuit,
  },
  {
    slug: "saas-analytics-hub",
    title: "SaaS Analytics Hub – Product Analytics for Founders",
    category: "Industry-Specific Solution (SaaS)",
    summary:
      "Developed a lightweight analytics dashboard for early-stage SaaS founders to track conversions, churn indicators, and feature usage.",
    icon: LineChart,
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="animate-fade-in relative overflow-hidden">
        {/* Cinematic Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[400px] h-[400px] bg-primary/10 blur-[100px] -z-10 rounded-full" />
        <div className="absolute bottom-0 -left-[10%] w-[300px] h-[300px] bg-primary/5 blur-[80px] -z-10 rounded-full" />

        <main className="py-32 lg:py-48 relative z-10">
          <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
            <div className="mb-20 space-y-8 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary shadow-sm backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span>Case Studies</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none text-balance">
                Engineering <span className="text-primary italic">Solutions</span>
              </h1>
              <p className="max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed font-medium">
                A curated selection of deep-dives into modern web architecture,
                bridging the gap between complex engineering and elegant user outcomes.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {caseStudies.map((item) => {
                const Icon = item.icon
                return (
                  <Card
                    key={item.slug}
                    className="group relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-xl rounded-[2.5rem] transition-all duration-700 hover:-translate-y-3 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
                    </div>

                    <CardHeader className="p-8 pb-4 space-y-6">
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary border border-primary/10">
                        <Icon className="h-3.5 w-3.5" />
                        <span>{item.category}</span>
                      </div>
                      <CardTitle className="text-2xl md:text-3xl font-black tracking-tighter leading-tight group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm md:text-base leading-relaxed font-medium text-muted-foreground line-clamp-3">
                        {item.summary}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-8 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-border" /> Explore results & architecture
                      </div>
                      <Button
                        asChild
                        variant="ghost"
                        size="lg"
                        className="group/btn h-12 rounded-2xl bg-primary/5 border border-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-500 font-bold text-sm px-6"
                      >
                        <Link href={`/case-studies/${item.slug}`} className="flex items-center gap-2">
                          View Study
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>

                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  </Card>
                )
              })}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
