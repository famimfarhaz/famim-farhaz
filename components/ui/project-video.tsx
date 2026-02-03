"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ProjectVideoProps {
    src: string
    className?: string
}

export function ProjectVideo({ src, className }: ProjectVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play().catch(() => {
                            // Autoplay blocked - user needs to interact
                        })
                    } else {
                        video.pause()
                    }
                })
            },
            { threshold: 0.1 }
        )

        observer.observe(video)

        return () => observer.disconnect()
    }, [])

    return (
        <div className={cn("relative w-full h-full overflow-hidden bg-black", className)}>
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
            >
                <source src={src} type="video/webm" />
                <source src={src.replace(".webm", ".mp4")} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
