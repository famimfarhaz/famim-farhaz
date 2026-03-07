"use client"

import { useEffect, useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectRatingProps {
    projectId: string
}

function getUserFingerprint(): string {
    if (typeof window === 'undefined') return ''
    let fingerprint = localStorage.getItem('user_fingerprint')
    if (!fingerprint) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        let canvasFingerprint = ''
        if (ctx) {
            ctx.textBaseline = 'top'
            ctx.font = '14px Arial'
            ctx.fillText('Browser fingerprint', 2, 2)
            canvasFingerprint = canvas.toDataURL()
        }
        const components = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            screen.colorDepth,
            new Date().getTimezoneOffset(),
            navigator.hardwareConcurrency || 'unknown',
            navigator.platform,
            canvasFingerprint.substring(0, 50),
        ].join('|')
        fingerprint = btoa(components).substring(0, 64)
        localStorage.setItem('user_fingerprint', fingerprint)
    }
    return fingerprint
}

const ratingLabels: Record<number, string> = {
    1: "Poor", 2: "Weak", 3: "Below Avg", 4: "Fair",
    5: "Average", 6: "Good", 7: "Great", 8: "Excellent",
    9: "Outstanding", 10: "Masterpiece"
}

export function ProjectRating({ projectId }: ProjectRatingProps) {
    const [selectedRating, setSelectedRating] = useState<number | null>(null)
    const [hoveredRating, setHoveredRating] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [averageRating, setAverageRating] = useState<number | null>(null)
    const [ratingCount, setRatingCount] = useState<number>(0)
    const [hasRated, setHasRated] = useState(false)

    const fetchStats = async () => {
        try {
            const res = await fetch(`/api/ratings?projectId=${projectId}`)
            if (res.ok) {
                const data = await res.json()
                setAverageRating(data.average ?? null)
                setRatingCount(data.count ?? 0)
            }
        } catch { }
    }

    useEffect(() => {
        const alreadyRated = localStorage.getItem(`rated_${projectId}`) === 'true'

        // If user has rated before, fetch their saved rating from backend
        const loadUserRating = async () => {
            if (!alreadyRated) return
            try {
                const fp = getUserFingerprint()
                const res = await fetch(`/api/ratings?projectId=${projectId}&userFingerprint=${fp}`)
                if (res.ok) {
                    const data = await res.json()
                    if (data.rating) {
                        setSelectedRating(data.rating)
                        setHasRated(true)
                    } else {
                        // Backend has no record — clear stale flag
                        localStorage.removeItem(`rated_${projectId}`)
                    }
                }
            } catch { }
        }
        loadUserRating()
        fetchStats()
    }, [projectId])

    const handleSelect = async (value: number) => {
        setSelectedRating(value)
        setIsLoading(true)
        setIsSaved(false)
        try {
            const fp = getUserFingerprint()
            // Mark this project as rated in localStorage
            localStorage.setItem(`rated_${projectId}`, 'true')
            const res = await fetch('/api/ratings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, rating: value, userFingerprint: fp }),
            })
            if (!res.ok) throw new Error()
            setIsSaved(true)
            setHasRated(true)
            await fetchStats()
            setTimeout(() => setIsSaved(false), 4000)
        } catch {
            // silent fail — local state still reflects pick
        } finally {
            setIsLoading(false)
        }
    }

    const activeValue = hoveredRating ?? selectedRating

    return (
        <section className="mt-32 relative">
            {/* Top divider */}
            <div className="flex items-center gap-6 mb-16">
                <div className="h-px flex-1 bg-white/[0.06]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">Your Verdict</span>
                <div className="h-px flex-1 bg-white/[0.06]" />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left — heading + label */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Rate This Project</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
                            How would you<br />
                            rate this work?
                        </h2>
                    </div>

                    <p className="text-zinc-500 leading-relaxed max-w-sm">
                        Your feedback helps shape the quality of future work. One honest rating goes a long way.
                    </p>

                    {/* Average stats */}
                    {ratingCount > 0 && averageRating !== null && (
                        <div className="flex items-end gap-4 pt-2">
                            <span className="text-6xl font-black text-white tabular-nums leading-none">
                                {averageRating.toFixed(1)}
                            </span>
                            <div className="pb-1 space-y-1">
                                <div className="flex gap-1">
                                    {Array.from({ length: 10 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "h-1 rounded-full transition-all duration-300",
                                                i < Math.round(averageRating)
                                                    ? "bg-white w-4"
                                                    : "bg-white/10 w-2"
                                            )}
                                        />
                                    ))}
                                </div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                                    {ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'} &nbsp;·&nbsp; out of 10
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right — rating selector */}
                <div className="space-y-8">
                    {/* Active label */}
                    <div className="h-8 flex items-center">
                        {activeValue ? (
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-black text-white tabular-nums">{activeValue}</span>
                                <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                                    — {ratingLabels[activeValue]}
                                </span>
                            </div>
                        ) : (
                            <span className="text-sm font-bold text-zinc-600 uppercase tracking-widest">
                                Pick a number
                            </span>
                        )}
                    </div>

                    {/* Rating buttons 1–10 */}
                    <div className="grid grid-cols-5 gap-2 sm:gap-3">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
                            const isSelected = selectedRating === num
                            const isHovered = hoveredRating !== null && num <= hoveredRating
                            const isFilled = hoveredRating !== null ? num <= hoveredRating : num <= (selectedRating ?? 0)

                            return (
                                <button
                                    key={num}
                                    disabled={isLoading}
                                    onClick={() => handleSelect(num)}
                                    onMouseEnter={() => setHoveredRating(num)}
                                    onMouseLeave={() => setHoveredRating(null)}
                                    className={cn(
                                        "relative h-14 sm:h-16 rounded-2xl border font-black text-lg tabular-nums transition-all duration-200 select-none",
                                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                                        isFilled
                                            ? "bg-white text-black border-white scale-[1.06] shadow-lg shadow-white/10"
                                            : "bg-zinc-900/50 text-zinc-600 border-white/[0.06] hover:border-white/20 hover:text-zinc-300",
                                        isLoading && "cursor-not-allowed opacity-60"
                                    )}
                                >
                                    {isSelected && !isLoading && isSaved ? (
                                        <Check className="w-5 h-5 mx-auto stroke-[3]" />
                                    ) : (
                                        num
                                    )}
                                </button>
                            )
                        })}
                    </div>

                    {/* Scale labels */}
                    <div className="flex justify-between px-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Poor</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Masterpiece</span>
                    </div>

                    {/* Status */}
                    <div className="h-5 flex items-center">
                        {isLoading && (
                            <div className="flex items-center gap-2 text-zinc-500">
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span className="text-[11px] font-bold uppercase tracking-widest">Saving...</span>
                            </div>
                        )}
                        {isSaved && !isLoading && (
                            <div className="flex items-center gap-2 text-white">
                                <Check className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-bold uppercase tracking-widest">
                                    {hasRated ? "Rating updated" : "Rating saved"}
                                </span>
                            </div>
                        )}
                        {!isLoading && !isSaved && hasRated && selectedRating && (
                            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-600">
                                You rated {selectedRating}/10 — tap to change
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
