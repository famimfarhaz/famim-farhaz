"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useStaggeredEntranceAnimation } from "@/hooks/use-entrance-animation"

export function Header() {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const { containerRef } = useStaggeredEntranceAnimation({
    delay: 200,
    duration: 600,
    direction: 'down',
    stagger: 150
  })
  
  // Prefetch contact route
  useEffect(() => {
    router.prefetch('/contact')
  }, [router])
  
  const handleContactClick = useCallback(() => {
    if (isNavigating) return
    setIsNavigating(true)
    router.push('/contact')
    setTimeout(() => setIsNavigating(false), 1000)
  }, [router, isNavigating])
  return (
    <>
      {/* Mobile Header - Original Design */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm md:hidden"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-12 sm:h-16 items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/portfolio-logo.png" 
                  alt="Portfolio Logo" 
                  width={40} 
                  height={40} 
                  className="h-8 w-8 sm:h-10 sm:w-10"
                />
              </Link>
            </div>
            <Button 
              onClick={handleContactClick}
              disabled={isNavigating}
              className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer h-8 sm:h-10 px-3 sm:px-4 text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Hire Me
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop Header - Rounded Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 hidden md:block">
        <div className="container mx-auto px-6 lg:px-8 pt-6">
          <header 
            ref={containerRef}
            className="rounded-full bg-background/95 backdrop-blur-lg border border-border/60 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex h-16 items-center justify-between px-8">
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center" data-animate>
                  <Image 
                    src="/portfolio-logo.png" 
                    alt="Portfolio Logo" 
                    width={40} 
                    height={40} 
                    className="h-10 w-10"
                  />
                </Link>
                <nav className="flex items-center gap-8" data-animate>
                  <Link href="/#about-me" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                    About
                  </Link>
                  <Link href="/#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Service
                  </Link>
                  <Link href="/#work" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Portfolio
                  </Link>
                  <Link href="/projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Projects
                  </Link>
                </nav>
              </div>
              <Button 
                onClick={handleContactClick}
                disabled={isNavigating}
                className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer h-10 px-6 text-sm font-medium rounded-full transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                data-animate
              >
                Hire Me
              </Button>
            </div>
          </header>
        </div>
      </div>
    </>
  )
}
