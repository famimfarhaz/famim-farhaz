"use client"

import React from "react"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

export function AboutContent() {
    return (
        <section className="relative py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* ─── Left Column: Bio ─── */}
                    <motion.div
                        className="lg:col-span-8 space-y-10"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                                Building the <span className="text-white">Digital Future</span> with Precision.
                            </h2>

                            <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed font-medium">
                                <p>
                                    Famim Farhaz Studio is a boutique development shop that believes technology isn't just about code —
                                    it's about creating possibilities, building trust, and driving growth.
                                    Our mission is to empower startups and businesses
                                    with powerful digital solutions that are simple, scalable, and impactful.
                                </p>
                                <p>
                                    We focus on delivering high-performing digital products that inspire results.
                                    We specialize in modern technologies like React, Next.js, and Node.js,
                                    ensuring every project is built with the highest standards of quality.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── Right Column: Quick Links / Contact ─── */}
                    <motion.div
                        className="lg:col-span-4 space-y-6"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="p-8 rounded-[2.5rem] border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl relative overflow-hidden group">
                            {/* Subtle accent glow inside card */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[40px] rounded-full -mr-16 -mt-16 group-hover:bg-accent/20 transition-colors duration-500" />

                            <h3 className="text-xl font-black text-white mb-6 tracking-tight">Let's Connect</h3>

                            <div className="space-y-4">
                                {[
                                    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "https://linkedin.com/in/famimfarhaz" },
                                    { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "https://github.com/famimfarhaz" },
                                    { icon: <Mail className="w-5 h-5" />, label: "Email", href: "mailto:hello@famim.dev" },
                                ].map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all group/item"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="text-white">{link.icon}</div>
                                            <span className="text-sm font-bold text-gray-300">{link.label}</span>
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover/item:text-accent group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
