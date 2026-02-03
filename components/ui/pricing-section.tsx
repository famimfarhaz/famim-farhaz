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

export function PricingSection({
    title,
    subtitle,
    tiers,
    frequencies,
}: PricingSectionProps) {
    const [selectedFrequency, setSelectedFrequency] = React.useState(frequencies[0])

    return (
        <section id="pricing" className="flex flex-col items-center gap-10 py-20 px-4">
            <div className="space-y-7 text-center">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl tracking-tight">{title}</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
                </div>
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
            </div>

            <div className="grid w-full max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tiers.map((tier) => (
                    <PricingCard
                        key={tier.name}
                        tier={tier}
                        paymentFrequency={selectedFrequency}
                    />
                ))}
            </div>
        </section>
    )
}
