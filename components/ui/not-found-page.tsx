"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, Mail } from "lucide-react"

export function NotFoundPage() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-black overflow-hidden flex flex-col items-center justify-center font-sans text-white">
      {/* ─── Clean Background ─── */}
      <div className="absolute inset-0 z-0">
        {/* 80px Dark Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      {/* ─── Main Content ─── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Clean 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[120px] md:text-[180px] font-black leading-none select-none tracking-tighter text-white">
            404
          </h1>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-lg space-y-6 mt-2"
        >
          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              Page Not Found
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* CTAs - Removed Red Accents */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-zinc-200 text-black font-bold px-8 h-12 rounded-xl transition-all active:scale-95 group shadow-lg"
            >
              <Link href="/">
                <Home className="mr-2 w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                Return Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-white font-bold px-8 h-12 rounded-xl transition-all active:scale-95 group"
            >
              <Link href="/contact">
                <Mail className="mr-2 w-4 h-4 transition-transform group-hover:scale-110" />
                Contact Me
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.01] text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500"
        >
          HTTP Error 404 — Not Found
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundPage
