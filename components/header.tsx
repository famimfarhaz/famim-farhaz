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
      <header className="fixed top-4 left-0 right-0 z-50 md:hidden">
        <div className="flex flex-col items-center px-4 gap-2">
          {/* Main Pill */}
          <div className="flex items-center justify-between w-full h-14 px-5 rounded-full bg-zinc-950/90 backdrop-blur-xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/portfolio-logo.png"
                alt="Portfolio Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="flex items-center justify-center w-8 h-8 text-white"
            >
              {isMobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>

          {/* Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="w-full bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-top-4 duration-300">
              <nav className="flex flex-col items-center py-8 gap-6">
                <Link
                  href="/about"
                  className="text-base font-bold text-zinc-400 active:text-white transition-colors"
                  onClick={toggleMobileMenu}
                >
                  About
                </Link>
                <Link
                  href="/projects"
                  className="text-base font-bold text-zinc-400 active:text-white transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Projects
                </Link>
                <Link
                  href="/pricing"
                  className="text-base font-bold text-zinc-400 active:text-white transition-colors"
                  onClick={toggleMobileMenu}
                >
                  Pricing
                </Link>
                <Button
                  onClick={() => {
                    handleContactClick();
                    toggleMobileMenu();
                  }}
                  className="bg-white text-black h-11 px-8 text-sm font-black rounded-full active:scale-95 transition-all mt-2"
                >
                  Contact Us
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* DESKTOP HEADER */}
      <div className="fixed top-8 left-0 right-0 z-50 hidden md:block">
        <div className="flex justify-center">
          <header
            ref={containerRef}
            className="flex items-center h-[72px] px-12 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/20"
          >
            <div className="flex items-center gap-16">
              {/* Left Zone */}
              <nav className="flex items-center gap-10" data-animate>
                <Link
                  href="/about"
                  className="text-base font-semibold text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  About
                </Link>
                <Link
                  href="/projects"
                  className="text-base font-semibold text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  Projects
                </Link>
              </nav>

              {/* Center Zone: Logo */}
              <Link href="/" className="flex items-center shrink-0" data-animate>
                <div className="relative group">
                  <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                  <Image
                    src="/portfolio-logo.png"
                    alt="Portfolio Logo"
                    width={48}
                    height={48}
                    className="h-12 w-12 relative z-10"
                  />
                </div>
              </Link>

              {/* Right Zone */}
              <nav className="flex items-center gap-10" data-animate>
                <Link
                  href="/pricing"
                  className="text-base font-semibold text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  Pricing
                </Link>

                <Button
                  onClick={handleContactClick}
                  disabled={isNavigating}
                  className="bg-white text-black hover:bg-zinc-200 h-10 px-6 text-sm font-black rounded-full transition-all duration-200 disabled:opacity-70"
                >
                  Contact Us
                </Button>
              </nav>
            </div>
          </header>
        </div>
      </div>
    </>
  )
}
