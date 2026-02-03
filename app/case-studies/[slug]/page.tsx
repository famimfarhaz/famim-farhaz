import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, LayoutDashboard, BrainCircuit, Bolt, LineChart, ServerCog, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CaseStudyThumbnailCarousel } from "@/components/ui/case-study-thumbnail-carousel"

const caseStudyDetails = {
  "smart-ops-hiring-platform": {
    title: "SmartOps Hiring Platform – Streamlining Tech Recruitment",
    category: "Process & Workflow Optimization",
    icon: Users,
    heroImage: "/case-studies/hiring-platform-hero.jpg",
    context:
      "A mid-sized tech company was scaling fast but still hiring through spreadsheets and disconnected tools. Recruiters were tracking candidates in Excel, engineers were filling feedback in Google Docs, and leaders had no reliable view of the pipeline.",
    problemPoints: [
      "No single source of truth for candidates, interview stages, and feedback",
      "Recruiters spending hours every week updating spreadsheets and nudging interviewers for feedback",
      "Engineering time wasted on unqualified interviews because screening signals were inconsistent",
      "Leaders unable to answer basic questions like: ‘Where are we losing candidates?’ or ‘How long does each stage take?’",
    ],
    solution:
      "I designed and implemented a dedicated hiring platform that centralised the entire funnel – from sourcing to offer – into one opinionated workflow. The goal was not just to digitise the process, but to enforce a consistent way of working across teams.",
    architecture: [
      "Next.js App Router front‑end with server components for fast initial loads and SEO‑friendly job pages",
      "Modular API layer for candidates, stages, feedback, and scorecards, exposing a clean domain model",
      "PostgreSQL schema optimised around candidate lifecycle events (applied, screened, interviewed, offered, hired)",
      "Role-based views for recruiters, hiring managers, and interviewers with tailored permissions",
      "Background jobs to send interview reminders, feedback nudges, and daily pipeline summaries",
    ],
    results: [
      "45% reduction in time‑to‑screen for new candidates after standardising intake and screening flows",
      "Recruiters reclaimed 5–7 hours per week previously spent on manual updates and chasing feedback",
      "Interviewers saw all context (CV, previous notes, scorecards) in a single screen, reducing context switching",
      "Leadership finally had a live view of conversion by stage, enabling data‑driven changes to the hiring process",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "REST APIs", "Background workers"],
  },
  "green-grid-energy-dashboard": {
    title: "GreenGrid Energy Dashboard – Real-time Energy Insights",
    category: "Niche Application Development",
    icon: Bolt,
    heroImage: "/case-studies/energy-dashboard-hero.jpg",
    context:
      "A portfolio of commercial buildings had smart meters installed, but the facilities team only received CSV exports once a month. By the time anomalies were spotted, the energy was already wasted.",
    problemPoints: [
      "Raw IoT data arriving as dense CSV files that non‑technical users found impossible to work with",
      "No unified visual layer combining consumption, peak demand, and historical baselines",
      "Inability to quickly compare buildings or floors to see which ones were under‑ or over‑performing",
      "Stakeholders struggled to understand impact of new energy‑saving initiatives because results were buried in spreadsheets",
    ],
    solution:
      "I designed and built GreenGrid: a responsive web dashboard that streams energy data into live cards, charts, and alerts. Instead of scrolling through spreadsheets, facility managers see the story of their buildings at a glance.",
    architecture: [
      "Ingestion API that normalises meter data from multiple vendors into a single time‑series format",
      "Aggregation layer that calculates daily, weekly, and monthly rollups plus building‑to‑building comparisons",
      "Dashboard UI built with card‑based tiles that surface key KPIs (current load, peak today, variance vs baseline)",
      "Interactive charts with timeframe filters (24h, 7d, 30d) and breakdowns by building, floor, or circuit",
      "Alerting module that flags abnormal spikes and sends notifications to the facilities team",
    ],
    results: [
      "Anomalies (e.g. equipment left running overnight) identified within hours instead of weeks",
      "Energy review meetings shifted from ‘digging through data’ to ‘deciding on actions’ using a shared dashboard",
      "Earlier detection of issues led to measurable savings on monthly utility bills",
      "Non‑technical stakeholders finally understood consumption trends through simple visuals and language",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Charting library", "REST APIs", "IoT data feeds"],
  },
  "ai-content-brief-assistant": {
    title: "AI Content Brief Assistant – Faster, Better Briefs for Teams",
    category: "AI/ML Tool Development",
    icon: BrainCircuit,
    heroImage: "/case-studies/ai-brief-assistant-hero.jpg",
    context:
      "A distributed content team was launching campaigns across multiple channels every week. Each campaign started with a blank document and a meeting, and every strategist wrote briefs in a slightly different way.",
    problemPoints: [
      "Inconsistent brief quality made it hard for writers and designers to know what ‘good’ looked like",
      "Strategists were spending 30–60 minutes per brief, often re‑typing similar sections (audience, tone, messaging pillars)",
      "Brand voice and legal guidelines were documented but rarely enforced inside the brief itself",
      "Leadership had no easy way to audit briefs or share best‑practice examples across regions",
    ],
    solution:
      "I created an AI‑powered brief assistant where strategists answer a small set of structured questions (goal, audience, offer, channel) and the system generates a full, on‑brand brief that can be tweaked and saved as a template.",
    architecture: [
      "Next.js front‑end with a step‑by‑step brief wizard optimised for both desktop and mobile screens",
      "API route that composes prompts from structured inputs, calls an LLM, and post‑processes the output into a consistent format",
      "Template engine that lets teams save and reuse successful brief structures per brand or region",
      "Permission model so admins can update brand rules (tone, do’s and don’ts, legal copy) that are automatically injected into every brief",
    ],
    results: [
      "Average brief creation time reduced from ~45 minutes to under 10, even for complex campaigns",
      "Higher consistency in structure and quality across teams, making hand‑offs to creative teams smoother",
      "Brand and legal requirements were followed more reliably because they were built into the brief itself",
      "New team members ramped faster by starting from guided templates instead of blank pages",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "AI API (LLM)", "PostgreSQL"],
  },
  "saas-analytics-hub": {
    title: "SaaS Analytics Hub – Product Analytics for Founders",
    category: "Industry-Specific Solution (SaaS)",
    icon: LineChart,
    heroImage: "/case-studies/saas-analytics-hero.jpg",
    context:
      "An early‑stage SaaS startup was stitching together Stripe exports, product event logs, and ad platform reports in Notion tables. Founders were spending Sunday nights creating dashboards manually.",
    problemPoints: [
      "Key metrics like MRR, activation rate, and retention were scattered across multiple tools and spreadsheets",
      "No single funnel view from marketing click → signup → activation → paid conversion",
      "Non‑technical founders found traditional BI tools too heavy for their stage and budget",
      "Investor updates took hours to prepare because data had to be re‑pulled and re‑cleaned each time",
    ],
    solution:
      "I designed a focused analytics hub specifically for early‑stage founders: opinionated about which metrics matter, lightweight to maintain, and simple enough to check every morning in under a minute.",
    architecture: [
      "Ingestion layer that syncs billing data (MRR, churn, upgrades) and product events on a schedule",
      "Metrics pipeline that pre‑aggregates daily and monthly cohorts for signups, activations, and revenue",
      "Founders dashboard with at‑a‑glance tiles, simple trend lines, and a single conversion funnel view",
      "Exports and snapshot URLs designed for quick sharing in investor updates and internal docs",
    ],
    results: [
      "Founders stopped maintaining manual spreadsheets and instead relied on a single, always‑up‑to‑date dashboard",
      "Experiment cycles (onboarding tweaks, pricing tests) shortened because impact could be seen quickly",
      "Investor updates were created in minutes by screenshotting or linking to pre‑built views",
      "The team aligned around a small set of core KPIs instead of arguing over conflicting numbers from different tools",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Background jobs"],
  },
} as const

type Slug = keyof typeof caseStudyDetails

interface PageProps {
  params: { slug: Slug }
}

export default function CaseStudyDetailPage({ params }: PageProps) {
  const data = caseStudyDetails[params.slug]

  if (!data) {
    notFound()
  }

  const Icon = data.icon

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background/95 py-14 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex justify-center">
        <article className="w-full max-w-3xl">
          {/* Top navigation + meta */}
          <div className="mb-8 flex items-center justify-between gap-3">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="gap-2 px-4 text-xs rounded-full bg-white text-black hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black shadow-sm transition-none"
            >
              <Link href="/case-studies">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to case studies
              </Link>
            </Button>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-[11px] font-medium text-muted-foreground">
              <Icon className="h-3.5 w-3.5 text-accent" />
              <span>{data.category}</span>
            </div>
          </div>

          {/* Hero title + summary */}
          <header className="mb-8 space-y-4">
            <p className="text-xs uppercase tracking-[0.18em] text-accent">Case study</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-balance">
              {data.title}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {data.context}
            </p>
          </header>

          {/* Hero image */}
          <div className="relative mb-10 overflow-hidden rounded-2xl border border-border/60 bg-card/60">
            <div className="relative h-48 sm:h-60 md:h-72 w-full">
              <Image
                src={data.heroImage}
                alt={data.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Article body sections */}
          <section className="mb-10 space-y-4">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">The problem</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              I was brought in to help turn a messy, fragmented process into a
              single, reliable product experience. Before this project, teams were
              working across spreadsheets, email threads, and scattered tools.
              Important context was easy to lose, and decisions were often made on
              out-of-date information.
            </p>
            <ul className="mt-3 space-y-2 text-sm md:text-base text-muted-foreground">
              {data.problemPoints.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10 space-y-4">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">Process & solution</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              I started with discovery sessions to map the real workflow end to
              end – not just the ideal process on paper, but how people were
              actually working. From there I defined the critical user journeys,
              designed flows and interfaces, and iterated with the team in short
              feedback cycles before committing to implementation.
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              The final solution was shaped around reducing context switching,
              making the most important information visible immediately, and
              enforcing a consistent way of working across roles.
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Concretely, this meant centralising data into a single source of
              truth, designing clear stage-based flows, and introducing small
              pieces of automation that removed repetitive manual work without
              over-complicating the stack.
            </p>
          </section>

          <section className="mb-10 space-y-4">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">Architecture & implementation</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Under the hood, the system is designed to be easy to reason about
              and extend. Rather than a single, tangled codebase, the work is
              split into small, focused layers:
            </p>
            <ul className="mt-3 space-y-2 text-sm md:text-base text-muted-foreground">
              {data.architecture.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-4 rounded-full bg-accent/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10 space-y-4">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">Impact & outcomes</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              After launch, the team quickly shifted from fighting the process to
              focusing on the work itself. Because the product captured the real
              workflow instead of forcing people into an abstract model, adoption
              was high from day one.
            </p>
            <ul className="mt-3 space-y-2 text-sm md:text-base text-muted-foreground">
              {data.results.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12 space-y-4 border-t border-border/60 pt-8">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">Project visuals</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              A quick visual look at the product experience. Swipe or drag through the gallery.
            </p>
            <CaseStudyThumbnailCarousel />
          </section>

          <section className="mb-12 space-y-4 border-t border-border/60 pt-8">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">Tech stack & my role</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              I owned the project end to end: from discovery and UX to system
              design and implementation. The stack was chosen to balance
              developer experience with long-term maintainability.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {data.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[11px] font-medium text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border/70 bg-background/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-medium text-foreground">Working on something similar?</p>
                <p className="text-[11px] text-muted-foreground">
                  I can help you design and build a focused version of this for
                  your product or team.
                </p>
              </div>
              <Button asChild size="sm" className="gap-1.5 text-xs mt-1 sm:mt-0 self-start">
                <Link href="/contact">
                  Let&apos;s talk
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </section>
        </article>
      </div>
    </main>
  )
}
