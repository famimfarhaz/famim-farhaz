"use client"

import * as React from "react"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { Tab } from "@/components/ui/pricing-tab"

interface PricingSectionProps {
    title: string
    subtitle: string
    tiers: PricingTier[]
    frequencies: string[]
}

import { motion } from "framer-motion"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut" as any,
        },
    },
}

export function PricingSection({
    title,
    subtitle,
    tiers,
    frequencies,
}: PricingSectionProps) {
    const [selectedFrequency, setSelectedFrequency] = React.useState(frequencies[0])

    return (
        <section id="pricing" className="flex flex-col items-center gap-10 py-20 px-4">
            <motion.div
                className="space-y-7 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl tracking-tight">{title}</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
                </div>
                {frequencies.length > 1 && (
                    <div className="mx-auto flex w-fit rounded-full bg-muted/50 p-1 backdrop-blur-sm border border-border/50">
                        {frequencies.map((freq) => (
                            <Tab
                                key={freq}
                                text={freq}
                                selected={selectedFrequency === freq}
                                setSelected={setSelectedFrequency}
                                discount={freq === "yearly"}
                            />
                        ))}
                    </div>
                )}
            </motion.div>

            <motion.div
                className={`grid w-full gap-6 items-stretch ${tiers.length === 1
                        ? "max-w-lg mx-auto"
                        : tiers.length === 2
                            ? "max-w-3xl sm:grid-cols-2"
                            : tiers.length === 3
                                ? "max-w-5xl sm:grid-cols-2 lg:grid-cols-3"
                                : "max-w-7xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    }`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {tiers.map((tier) => (
                    <motion.div key={tier.name} variants={itemVariants} className="h-full">
                        <PricingCard
                            tier={tier}
                            paymentFrequency={selectedFrequency}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}
