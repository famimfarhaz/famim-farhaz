import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    slug: "smart-ops-hiring-platform",
    title: "SmartOps Hiring Platform",
    category: "Hiring workflow optimisation",
    description:
      "A modern hiring platform that reduced candidate screening time with a clean, opinionated workflow.",
  },
  {
    slug: "green-grid-energy-dashboard",
    title: "GreenGrid Energy Dashboard",
    category: "Real-time energy insights",
    description:
      "An analytics dashboard turning raw meter data into clear, decision-focused visuals.",
  },
  {
    slug: "ai-content-brief-assistant",
    title: "AI Content Brief Assistant",
    category: "AI-powered content tooling",
    description:
      "A brief generator that helps teams produce structured content briefs in minutes instead of hours.",
  },
  {
    slug: "saas-analytics-hub",
    title: "SaaS Analytics Hub",
    category: "Product analytics for founders",
    description:
      "A focused analytics hub surfacing just the metrics early-stage SaaS teams care about.",
  },
];

const Blog = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto flex flex-col gap-14">
      <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
        <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
          Case studies
        </h4>
        <Button asChild className="gap-4">
          <Link href="/case-studies">
            View all case studies <MoveRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {caseStudies.map((item) => (
          <Link
            key={item.slug}
            href={`/case-studies/${item.slug}`}
            className="flex flex-col gap-2 hover:opacity-90 hover:translate-y-[-2px] cursor-pointer transition-all duration-200"
          >
            <div className="bg-muted rounded-md aspect-video mb-4 border border-border/60" />
            <div className="text-xs font-medium text-accent uppercase tracking-[0.16em]">
              {item.category}
            </div>
            <h3 className="text-xl tracking-tight">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export { Blog };
