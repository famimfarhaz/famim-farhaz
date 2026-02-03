"use client"

import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import CustomPackageBuilder from "@/components/custom-package-builder"
import { Box, Sparkles } from "lucide-react"

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3" />
              Custom Package
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Build your perfect scope</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Mix and match services to create a package that fits your exact business needs.
              Get an instant estimate and start your project journey.
            </p>
          </div>

          <CustomPackageBuilder />
        </div>
      </main>
      <Footer />
    </div>
  )
}
