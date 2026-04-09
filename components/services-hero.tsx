"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ServicesHero() {
    return (
        <section className="relative min-h-[100dvh] flex flex-col justify-center pt-24 pb-16 overflow-hidden">
            {/* Subtle radial gradient background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(120, 119, 198, 0.08) 0%, transparent 70%)",
                    }}
                />
            </div>

            {/* ─── Bottom-Left Decorative Element ─── */}
            <div className="absolute bottom-0 left-0 pointer-events-none flex items-end">
                {/* Primary block */}
                <div
                    className="w-10 sm:w-20 h-32 sm:h-56 rounded-tr-[2rem] sm:rounded-tr-[2.5rem]"
                    style={{
                        background:
                            "linear-gradient(to top, oklch(0.55 0.15 265 / 0.4), oklch(0.55 0.15 265 / 0.1))",
                    }}
                />
                {/* Secondary block offset */}
                <div
                    className="w-16 sm:w-28 h-20 sm:h-32 rounded-tr-[2rem] sm:rounded-tr-[2.5rem] -ml-2 sm:-ml-4"
                    style={{
                        background:
                            "linear-gradient(to top, oklch(0.6 0.12 265 / 0.2), oklch(0.6 0.12 265 / 0.05))",
                    }}
                />
            </div>

            {/* ─── Bottom-Right Decorative Element ─── */}
            <div className="absolute bottom-0 right-0 pointer-events-none flex items-end">
                {/* Secondary block offset (mirrored) */}
                <div
                    className="w-16 sm:w-28 h-20 sm:h-32 rounded-tl-[2rem] sm:rounded-tl-[2.5rem] -mr-2 sm:-mr-4 relative z-10"
                    style={{
                        background:
                            "linear-gradient(to top, oklch(0.6 0.12 265 / 0.2), oklch(0.6 0.12 265 / 0.05))",
                    }}
                />
                {/* Primary block */}
                <div
                    className="w-10 sm:w-20 h-32 sm:h-56 rounded-tl-[2rem] sm:rounded-tl-[2.5rem]"
                    style={{
                        background:
                            "linear-gradient(to top, oklch(0.55 0.15 265 / 0.4), oklch(0.55 0.15 265 / 0.1))",
                    }}
                />
            </div>

            {/* ─── Content ─── */}
            <div className="container mx-auto px-6 sm:px-6 lg:px-8 relative z-20">
                <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm text-[11px] sm:text-xs md:text-sm text-muted-foreground font-medium animate-in fade-in slide-in-from-top-4 duration-1000">
                        <span className="text-accent">✦</span>
                        <span>
                            Boutique Development Studio
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight sm:leading-[1.12] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
                        Custom Websites.
                        <br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>
                        Built From Scratch.
                    </h1>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed px-2 sm:px-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                        No templates. No shortcuts. Every project is designed and developed
                        to your exact specifications — performance, aesthetics, and all.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 sm:pt-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                        <Button
                            variant="outline"
                            size="lg"
                            className="h-12 w-full sm:w-auto px-8 text-sm font-bold rounded-full border-border/80 hover:bg-card/80 hover:border-foreground/30 transition-all bg-card/30 backdrop-blur-sm"
                            onClick={() =>
                                document
                                    .getElementById("packages")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                            asChild={false}
                        >
                            Book a Discovery Call
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="h-12 w-full sm:w-auto px-8 text-sm font-bold rounded-full border-border/80 hover:bg-card/80 hover:border-foreground/30 transition-all bg-card/30 backdrop-blur-sm"
                            asChild
                        >
                            <Link href="/contact">
                                Get in Touch
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    )
}
