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
                            Recommended by{" "}
                            <strong className="text-foreground">Tech Leaders</strong>
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight sm:leading-[1.12] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
                        Build Scalable Tech
                        <br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>
                        for Your Business
                    </h1>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed px-2 sm:px-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                        From modern websites to SaaS platforms and AI-powered automation —
                        get the exact digital infrastructure your business needs to grow.
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
                        >
                            View Pricing
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="h-12 w-full sm:w-auto px-8 text-sm font-bold rounded-full border-border/80 hover:bg-card/80 hover:border-foreground/30 transition-all bg-card/30 backdrop-blur-sm"
                            asChild
                        >
                            <Link href="/contact">
                                Talk with Expert
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>

                    {/* Trust / Social Proof Row */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 sm:pt-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
                        {/* Stacked Avatars */}
                        <div className="flex -space-x-3">
                            {[
                                "https://i.pravatar.cc/100?img=11",
                                "https://i.pravatar.cc/100?img=12",
                                "https://i.pravatar.cc/100?img=13",
                                "https://i.pravatar.cc/100?img=14",
                                "https://i.pravatar.cc/100?img=15",
                            ].map((src, i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 rounded-full border-2 border-background overflow-hidden shadow-lg"
                                >
                                    <img
                                        src={src}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col items-center sm:items-start">
                            <div className="flex items-center gap-1 text-yellow-500 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-xs sm:text-sm text-muted-foreground">
                                Trusted by{" "}
                                <strong className="text-foreground">50+ Global Clients</strong>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
