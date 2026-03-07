"use client"

import React from "react"
import {
    Globe,
    ShoppingCart,
    LayoutDashboard,
    KanbanSquare,
    BarChart3,
    FileText,
} from "lucide-react"
import { servicePrices } from "@/lib/constants"
import { cn } from "@/lib/utils"

const categoryMeta: Record<
    string,
    { gradient: string; iconColor: string; borderColor: string }
> = {
    "Website Development": {
        gradient: "from-white/5 to-transparent",
        iconColor: "text-muted-foreground group-hover:text-foreground",
        borderColor: "border-white/5 hover:border-white/15",
    },
    "SaaS Solutions": {
        gradient: "from-white/5 to-transparent",
        iconColor: "text-muted-foreground group-hover:text-foreground",
        borderColor: "border-white/5 hover:border-white/15",
    },
}

const serviceIcons: Record<string, React.ReactNode> = {
    "Landing Page / Portfolio": <FileText className="w-6 h-6" />,
    "Business Website": <Globe className="w-6 h-6" />,
    "E-Commerce Website": <ShoppingCart className="w-6 h-6" />,
    "Admin Panel": <LayoutDashboard className="w-6 h-6" />,
    "Dashboard & Analytics": <BarChart3 className="w-6 h-6" />,
    "Project & Team Mgmt SaaS": <KanbanSquare className="w-6 h-6" />,
}

import { motion } from "framer-motion"

const categoryVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as any,
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut" as any,
        },
    },
}

export function SubServicesGrid() {
    const categories = Array.from(
        new Set(servicePrices.map((s) => s.category))
    )

    return (
        <section id="sub-services" className="py-20 md:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="max-w-2xl mb-14"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Individual Services
                    </h2>
                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                        Don't need a full package? Pick exactly what you need from my
                        à-la-carte menu of premium services.
                    </p>
                </motion.div>

                {/* Category Groups */}
                <div className="space-y-16">
                    {categories.map((category) => {
                        const meta = categoryMeta[category] || {
                            gradient: "from-white/5 to-transparent",
                            iconColor: "text-muted-foreground group-hover:text-foreground",
                            borderColor: "border-white/5 hover:border-white/15",
                        }
                        const items = servicePrices.filter((s) => s.category === category)

                        return (
                            <motion.div
                                key={category}
                                className="space-y-6"
                                variants={categoryVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                {/* Category Label */}
                                <div className="flex items-center gap-3">
                                    <div
                                        className={cn(
                                            "h-px flex-1 max-w-[60px] bg-border/80"
                                        )}
                                    />
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                                        {category}
                                    </span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-950/30 border border-white/5 font-bold text-zinc-500">
                                        {items.length}
                                    </span>
                                </div>

                                {/* Grid */}
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {items.map((service) => (
                                        <motion.div
                                            key={service.name}
                                            variants={itemVariants}
                                            className={cn(
                                                "group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden bg-zinc-900/40 backdrop-blur-xl",
                                                meta.borderColor
                                            )}
                                        >
                                            {/* Background glow */}
                                            <div
                                                className={cn(
                                                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl",
                                                    meta.gradient
                                                )}
                                            />

                                            <div className="relative z-10 space-y-4">
                                                {/* Icon */}
                                                <div
                                                    className={cn(
                                                        "w-12 h-12 rounded-xl bg-zinc-950/30 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300",
                                                        meta.iconColor
                                                    )}
                                                >
                                                    {serviceIcons[service.name] || (
                                                        <Globe className="w-6 h-6" />
                                                    )}
                                                </div>

                                                {/* Title & Description */}
                                                <div>
                                                    <h3 className="font-bold text-sm sm:text-base text-foreground mb-1.5 group-hover:text-white transition-colors">
                                                        {service.name}
                                                    </h3>
                                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                                        {service.description}
                                                    </p>
                                                </div>

                                                {/* Price & Action */}
                                                <div className="pt-3 border-t border-border/30 flex items-end justify-between relative">
                                                    <div>
                                                        <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-bold block">
                                                            Starting at
                                                        </span>
                                                        <span className="text-xl font-black tracking-tight text-foreground">
                                                            ${service.price.toLocaleString()}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        {service.comingSoon && (
                                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-950/30 border border-white/5 text-zinc-500 font-bold uppercase tracking-widest">
                                                                SOON
                                                            </span>
                                                        )}

                                                        {/* CTA - Appears on Hover */}
                                                        <a
                                                            href={`/contact?service=${encodeURIComponent(service.name)}`}
                                                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-all opacity-100 translate-x-0 lg:opacity-0 lg:translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 shadow-lg shadow-white/5 whitespace-nowrap"
                                                        >
                                                            Get in Touch
                                                            <span className="text-[11px]">→</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
