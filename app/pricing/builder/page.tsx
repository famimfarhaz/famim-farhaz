import React, { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import CustomPackageBuilder from "@/components/custom-package-builder"
import { Box, Sparkles, Loader2 } from "lucide-react"

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main className="relative pt-32 pb-20 overflow-hidden">
        {/* Cinematic Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 blur-[120px] -z-10 rounded-full" />
        <div className="absolute bottom-[20%] -left-[10%] w-[400px] h-[400px] bg-primary/10 blur-[100px] -z-10 rounded-full" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Select your path</h1>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Choose a single service or combine multiple to build your own strategic package.
              Get an instant estimate and start your journey today.
            </p>
          </div>

          <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-32 space-y-4 bg-zinc-900/30 border border-white/5 rounded-3xl backdrop-blur-xl">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-zinc-500 font-medium animate-pulse">Initializing Builder...</p>
            </div>
          }>
            <CustomPackageBuilder />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
