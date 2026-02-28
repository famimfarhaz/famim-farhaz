"use client"

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"
import { packages } from "@/lib/constants"
import { Check, ShieldCheck, Lock, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function CheckoutContent() {
    const searchParams = useSearchParams()
    const [discountRate, setDiscountRate] = React.useState(0)
    const pkgKey = searchParams.get("pkg")
    const pkg = packages.find((p) => p.key === pkgKey)

    if (!pkg) {
        return (
            <div className="container mx-auto px-4 py-32 text-center space-y-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                    <ShieldCheck className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold">Package Not Found</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                    The package you are looking for does not exist or has been moved.
                </p>
                <Button asChild variant="outline" className="rounded-full">
                    <a href="/pricing">Return to Pricing</a>
                </Button>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen pt-32 pb-20 px-4 overflow-hidden">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full" />
            <div className="absolute top-[20%] -right-[10%] w-[400px] h-[400px] bg-primary/10 blur-[100px] -z-10 rounded-full" />

            <div className="container mx-auto max-w-6xl relative">
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Complete your order</h1>
                    <p className="text-muted-foreground text-lg">
                        You're ordering the <span className="text-foreground font-semibold">{pkg.name}</span>.
                        Fill in your details below to get started.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 items-start">
                    {/* Form Section */}
                    <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
                        <div className="backdrop-blur-xl bg-zinc-900/30 border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
                            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">1</span>
                                Contact Information
                            </h2>
                            <CheckoutForm
                                packageName={pkg.name}
                                price={pkg.price}
                                packageDetails={pkg.included}
                                onDiscountChange={setDiscountRate}
                            />
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5" />
                                <span className="text-sm font-medium">SSL Encrypted</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                <span className="text-sm font-medium">Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Lock className="w-5 h-5" />
                                <span className="text-sm font-medium">Privacy Protected</span>
                            </div>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-2 order-1 lg:order-2">
                        <div className="sticky top-28">
                            <Card className="border-white/5 shadow-2xl bg-zinc-900/30 backdrop-blur-xl rounded-2xl overflow-hidden">
                                <CardHeader className="bg-zinc-950/20 border-b border-white/5 pb-6">
                                    <CardTitle className="text-xl">Review & Order</CardTitle>
                                    <CardDescription>Confirm your package selection</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-8 space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-2xl tracking-tight">{pkg.name}</h3>
                                                <p className="text-sm text-muted-foreground mt-1">{pkg.subtitle}</p>
                                            </div>
                                            <div className="text-2xl font-bold text-primary tabular-nums">
                                                ${(pkg.price * (1 - discountRate)).toLocaleString()}
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-6">
                                            <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Included Features</p>
                                            {pkg.included.map((item, i) => (
                                                <div key={i} className="flex gap-3 text-sm group">
                                                    <div className="mt-1 flex-shrink-0">
                                                        <Check className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                                        <div className="font-bold text-lg">Total Amount</div>
                                        <div className="flex flex-col items-end">
                                            <div className="text-3xl font-black text-primary tabular-nums">
                                                ${(pkg.price * (1 - discountRate)).toLocaleString()}
                                            </div>
                                            {discountRate > 0 && (
                                                <div className="text-sm text-muted-foreground line-through font-bold">
                                                    ${pkg.price.toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-zinc-950/30 rounded-xl p-4 flex gap-4 items-start border border-white/5">
                                        <div className="p-2 bg-white/5 rounded-lg text-primary">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white uppercase tracking-tighter mb-1">Guaranteed Delivery</p>
                                            <p className="text-xs text-zinc-400 leading-relaxed">
                                                Every project comes with professional support and source code access.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
            <Header />
            <main>
                <Suspense fallback={
                    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <p className="text-sm font-medium text-muted-foreground animate-pulse">Initializing Checkout...</p>
                    </div>
                }>
                    <CheckoutContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    )
}
