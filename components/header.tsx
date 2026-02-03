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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { containerRef } = useStaggeredEntranceAnimation({
    delay: 200,
    duration: 600,
    direction: "down",
    stagger: 150,
  })

  useEffect(() => {
    router.prefetch("/contact")
  }, [router])

  const handleContactClick = useCallback(() => {
    if (isNavigating) return
    setIsNavigating(true)
    router.push("/contact")
    setTimeout(() => setIsNavigating(false), 1000)
  }, [router, isNavigating])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* MOBILE HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md md:hidden">
        <div className="container mx-auto px-4 sm:px-6 py-2">
          <div className="flex h-10 sm:h-12 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/portfolio-logo.png"
                alt="Portfolio Logo"
                width={40}
                height={40}
                className="h-8 w-8 sm:h-9 sm:w-9"
              />
            </Link>
            {/* 3-dot menu trigger */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Open navigation menu"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-card/80 text-muted-foreground shadow-sm active:scale-95 transition-transform"
            >
              <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground" />
              <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground mx-0.5" />
              <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM SHEET MENU */}
      {isMobileMenuOpen && (
        <>
          {/* overlay */}
          <button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 z-[100] bg-black/40 md:hidden"
            onClick={toggleMobileMenu}
          />
          {/* sheet */}
          <div className="fixed inset-x-0 bottom-0 z-[110] md:hidden max-h-[80vh]">
            <div className="h-[55vh] bg-card text-foreground border-t border-border/60 flex flex-col shadow-2xl rounded-t-2xl">
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Menu
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleContactClick}
                  disabled={isNavigating}
                  className="h-8 px-3 text-xs rounded-full"
                >
                  Hire Me
                </Button>
              </div>
              <div className="border-t border-border/60 px-2 py-2 flex flex-col flex-1 overflow-y-auto scrollbar-hide">
                <Link
                  href="/"
                  className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
                <Link
                  href="/#about-me"
                  className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                  onClick={toggleMobileMenu}
                >
                  About
                </Link>
                <Link
                  href="/#services"
                  className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Services
                </Link>
                <Link
                  href="/#work"
                  className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Portfolio
                </Link>
                <Link
                  href="/pricing"
                  className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Pricing
                </Link>
                <Link
                  href="/projects"
                  className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Projects
                </Link>
                <Link
                  href="/case-studies"
                  className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Case studies
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {/* DESKTOP HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50 hidden md:block">
        <div className="container mx-auto px-6 lg:px-8 pt-6">
          <header
            ref={containerRef}
            className="rounded-full bg-background/95 backdrop-blur-lg border border-border/60 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex h-16 items-center justify-between px-8">
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items=center" data-animate>
                  <Image
                    src="/portfolio-logo.png"
                    alt="Portfolio Logo"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                </Link>
                <nav className="flex items-center gap-8" data-animate>
                  <Link
                    href="/"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Home
                  </Link>
                  <Link
                    href="/#about-me"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    About
                  </Link>
                  <Link
                    href="/#services"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Service
                  </Link>
                  <Link
                    href="/#work"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Portfolio
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/projects"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/case-studies"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Case studies
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
