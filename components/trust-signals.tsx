"use client"

import {
    Shield,
    ShieldCheck,
    Clock,
    Wrench,
    CheckCircle2,
    Lock,
} from "lucide-react"
import { FaqsSection } from "@/components/ui/faqs-1"



const maintenanceFeatures = [
    { text: "Bug fixes (minor)", included: true },
    { text: "Security updates", included: true },
    { text: "Content updates (text/image, max 3/month)", included: true },
    { text: "Performance check", included: true },
    { text: "New features — charged separately", included: false },
]

const securityBadges = [
    {
        icon: <ShieldCheck className="w-5 h-5" />,
        label: "GDPR Compliant",
        description: "I respect and protect user data",
    },
    {
        icon: <Lock className="w-5 h-5" />,
        label: "Secure Data Handling",
        description: "End-to-end encrypted workflows",
    },
    {
        icon: <Shield className="w-5 h-5" />,
        label: "SSL Certified",
        description: "Industry-standard encryption",
    },
]

import { motion } from "framer-motion"

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1] as any,
        },
    },
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
}

export function TrustSignals() {
    return (
        <section className="py-20 md:py-28 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20">


                {/* ─── Maintenance & Care Plans ─── */}
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                    <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-10 rounded-[2.5rem] border border-border/50 bg-white/[0.02] backdrop-blur-sm">
                        <div className="space-y-5">

                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                                Keep Your Product <br />
                                Running Smoothly
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                After launch, I don't disappear. My monthly maintenance plans
                                ensure your application stays fast, secure, and up-to-date.
                            </p>
                            <div className="flex items-baseline gap-2 pt-2">
                                <span className="text-4xl font-black text-white tracking-tight">
                                    $100
                                </span>
                                <span className="text-muted-foreground font-medium">/month</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {maintenanceFeatures.map((feature) => (
                                <motion.div
                                    key={feature.text}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-border/30 hover:border-accent/40 transition-colors duration-300"
                                >
                                    {feature.included ? (
                                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                    ) : (
                                        <span className="w-4 h-4 shrink-0 text-red-400 text-xs font-bold flex items-center justify-center">✕</span>
                                    )}
                                    <span className={`text-sm font-medium ${feature.included ? 'text-gray-300' : 'text-gray-500'}`}>
                                        {feature.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ─── Security Badges ─── */}
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <div className="grid sm:grid-cols-3 gap-4">
                        {securityBadges.map((badge) => (
                            <motion.div
                                key={badge.label}
                                variants={fadeInUp}
                                className="flex items-center gap-4 p-5 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-accent/30 transition-all group shadow-sm hover:shadow-accent/5"
                            >
                                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                                    {badge.icon}
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-foreground">
                                        {badge.label}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {badge.description}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ─── FAQ ─── */}
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <FaqsSection />
                </motion.div>
            </div>
        </section>
    )
}
