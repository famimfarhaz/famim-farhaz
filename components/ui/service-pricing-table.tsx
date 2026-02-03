"use client"

import React from "react"
import { Check, Shield, Zap, Brain, Rocket, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { servicePrices } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"

const categoryIcons: Record<string, React.ReactNode> = {
    "Website Development": <Code2 className="w-5 h-5 text-blue-500" />,
    "SaaS Solutions": <Zap className="w-5 h-5 text-yellow-500" />,
    "AI/RAG Solutions": <Brain className="w-5 h-5 text-purple-500" />,
}

export function ServicePricingTable() {
    // Group services by category
    const categories = Array.from(new Set(servicePrices.map((s) => s.category)))

    return (
        <div className="w-full max-w-5xl mx-auto space-y-12 py-10">
            {categories.map((category) => (
                <div key={category} className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                        {categoryIcons[category] || <Rocket className="w-5 h-5 text-primary" />}
                        <h2 className="text-2xl font-bold tracking-tight">{category}</h2>
                        <Badge variant="outline" className="ml-2">
                            {servicePrices.filter((s) => s.category === category).length} Services
                        </Badge>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-border bg-card/30 backdrop-blur-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/50 border-b border-border">
                                    <th className="px-6 py-4 text-sm font-semibold text-foreground uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-foreground uppercase tracking-wider hidden md:table-cell">Description</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-foreground uppercase tracking-wider text-right">Starting At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50 font-medium">
                                {servicePrices
                                    .filter((s) => s.category === category)
                                    .map((service) => (
                                        <tr key={service.name} className="hover:bg-muted/20 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                                                    <span className="text-foreground">{service.name}</span>
                                                    {service.comingSoon && (
                                                        <Badge variant="secondary" className="scale-75 origin-left">
                                                            Soon
                                                        </Badge>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm text-muted-foreground hidden md:table-cell">
                                                {service.description}
                                            </td>
                                            <td className="px-6 py-5 text-right font-bold text-primary tabular-nums text-lg">
                                                ${service.price.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}

            <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-xl font-bold flex items-center justify-center md:justify-start gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Transparent & Scalable
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-md">
                        All prices are base estimates. Final quotes depend on functional complexity, integrations, and performance requirements.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Badge variant="secondary" className="px-3 py-1">Standard Delivery</Badge>
                    <Badge variant="outline" className="px-3 py-1">Enterprise Support</Badge>
                </div>
            </div>
        </div>
    )
}
