"use client"

import React from "react"
import { motion } from "framer-motion"

export function AboutHero() {
    return (
        <section className="relative min-h-[75vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-background">
            {/* ─── Background Layers ─── */}

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

            {/* Grid BG (Matching Homepage) */}
            <div
                className="absolute -z-10 inset-0 opacity-40 h-full w-full 
        bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]
        bg-[size:80px_80px] 
        [mask-image:radial-gradient(ellipse_60%_40%_at_50%_30%,#000_70%,transparent_110%)]"
            />

            {/* ─── Floating Decorative Elements ─── */}

            {/* Left Glow */}
            <motion.div
                className="absolute left-[10%] top-[30%] w-32 h-32 rounded-full hidden lg:block"
                style={{
                    background: "radial-gradient(circle, oklch(0.55 0.15 265 / 0.15) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Right Glow */}
            <motion.div
                className="absolute right-[10%] top-[40%] w-40 h-40 rounded-full hidden lg:block"
                style={{
                    background: "radial-gradient(circle, oklch(0.55 0.15 265 / 0.1) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* ─── Content ─── */}
            <div className="container relative z-10 mx-auto px-6 text-center">


                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-8 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    About Me
                </motion.h1>

                <motion.p
                    className="max-w-2xl mx-auto text-base md:text-xl text-muted-foreground leading-relaxed font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    I'm a passionate developer focused on building high-performance
                    digital experiences that matter. From concept to deployment,
                    I turn complex ideas into seamless web solutions.
                </motion.p>
            </div>
        </section>
    )
}
