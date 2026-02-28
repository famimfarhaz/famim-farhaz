"use client"

import React from "react"

export function AboutMarquee() {
    const text = "Develop with Precision • Design for Impact • Build for Scale • "
    const repeatedText = Array(8).fill(text).join("")

    return (
        <div className="relative w-full overflow-hidden bg-background py-6 border-y border-white/[0.05]">
            <div className="flex whitespace-nowrap animate-marquee">
                <div className="flex items-center">
                    <span className="text-xl md:text-3xl font-black text-white/90 tracking-tighter uppercase px-4">
                        {repeatedText}
                    </span>
                    {/* Duplicate for seamless loop */}
                    <span className="text-xl md:text-3xl font-black text-white/90 tracking-tighter uppercase px-4">
                        {repeatedText}
                    </span>
                </div>
            </div>
        </div>
    )
}
