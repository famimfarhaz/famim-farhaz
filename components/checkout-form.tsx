"use client"

import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, ArrowRight, Check, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { generateInvoice, InvoiceData } from "@/lib/invoice-generator"

interface CheckoutFormProps {
    packageName: string
    price: number
    packageDetails: string[]
    onDiscountChange?: (discount: number) => void
}

export function CheckoutForm({ packageName, price, packageDetails, onDiscountChange }: CheckoutFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        couponCode: "",
        requirements: "",
    })
    const [couponDiscount, setCouponDiscount] = useState(0)
    const [couponError, setCouponError] = useState<string | null>(null)
    const [isValidatingCoupon, setIsValidatingCoupon] = useState(false)

    // Live Coupon Validation
    React.useEffect(() => {
        const validateCoupon = async () => {
            const code = formData.couponCode.toUpperCase().trim()
            if (!code) {
                setCouponDiscount(0)
                return
            }

            setIsValidatingCoupon(true)
            setCouponError(null)
            try {
                const response = await fetch(`/api/coupons/validate?code=${code}`)
                const data = await response.json()
                if (data.valid) {
                    const discount = data.discountPercent / 100
                    setCouponDiscount(discount)
                    onDiscountChange?.(discount)
                } else {
                    setCouponDiscount(0)
                    setCouponError(data.message || "Invalid coupon")
                    onDiscountChange?.(0)
                }
            } catch (error) {
                console.error("Coupon validation error:", error)
                setCouponDiscount(0)
                setCouponError("Could not validate coupon. Please try again.")
                onDiscountChange?.(0)
            } finally {
                setIsValidatingCoupon(false)
            }
        }

        const debounceTimer = setTimeout(validateCoupon, 500)
        return () => clearTimeout(debounceTimer)
    }, [formData.couponCode])

    const discountRate = couponDiscount

    const discountAmount = useMemo(() => {
        return price * discountRate
    }, [price, discountRate])

    const discountedTotal = useMemo(() => {
        return price - discountAmount
    }, [price, discountAmount])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clientName: formData.name,
                    packageName: packageName,
                    email: formData.email,
                    phone: formData.phone,
                    couponCode: formData.couponCode,
                    requirements: formData.requirements,
                    packageDetails: [{ name: packageName, price, features: packageDetails }],
                    totalPrice: discountedTotal,
                    orderType: 'fixed'
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Failed to submit order')
            }

            // Generate and download invoice
            const newInvoiceData: InvoiceData = {
                clientName: formData.name,
                email: formData.email,
                packageName: packageName,
                services: [{ name: packageName, price }],
                total: price,
                couponDiscountAmount: discountAmount,
                discountAmount: discountAmount,
                discountedTotal: discountedTotal,
                couponCode: formData.couponCode,
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                orderId: data.id || `INV-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            };
            generateInvoice(newInvoiceData)
            setInvoiceData(newInvoiceData)

            toast.success("Order placed successfully! Your invoice is downloading.")

        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong.")
        } finally {
            setIsLoading(false)
        }
    }

    const fieldClassName = (name: string) => cn(
        "bg-zinc-950/30 border-white/5 transition-all duration-300 h-12 focus:ring-2 focus:ring-primary/20",
        focusedField === name && "border-primary scale-[1.01] bg-background shadow-lg shadow-primary/5"
    )

    if (invoiceData) {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto mt-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4">
                        <Check className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Order Confirmed</h2>
                    <p className="text-muted-foreground">Your project request has been received. Your digital pro-forma invoice has been downloaded.</p>
                </div>
                <div className="mt-8 flex justify-center">
                    <Button onClick={() => router.push("/")} className="gap-2">
                        Return to Home <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className={fieldClassName("name")}
                    />
                </div>
                <div className="space-y-2.5">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className={fieldClassName("email")}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                    <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Phone Number</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        className={fieldClassName("phone")}
                    />
                </div>
                <div className="space-y-2.5">
                    <Label htmlFor="couponCode" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Coupon Code (Optional)</Label>
                    <div className="relative">
                        <Input
                            id="couponCode"
                            name="couponCode"
                            placeholder="DISCOUNT20"
                            value={formData.couponCode}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("couponCode")}
                            onBlur={() => setFocusedField(null)}
                            className={cn(
                                fieldClassName("couponCode"),
                                "border-dashed focus:border-solid pr-10",
                                discountRate > 0 && "border-white/20 bg-zinc-950/50",
                                couponError && "border-red-500/50 bg-red-500/5 focus:border-red-500"
                            )}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {isValidatingCoupon ? (
                                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                            ) : discountRate > 0 ? (
                                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                            ) : couponError ? (
                                <div className="w-4 h-4 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <div className="w-1 h-1 rounded-full bg-red-500" />
                                </div>
                            ) : null}
                        </div>
                    </div>
                    {discountRate > 0 && !isValidatingCoupon && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-2 flex items-center gap-2 p-2.5 rounded-xl bg-zinc-950/50 border border-white/10 shadow-sm shadow-primary/5"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                            <p className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">
                                Offer Applied: {(discountRate * 100).toFixed(0)}% Discount
                            </p>
                        </motion.div>
                    )}
                    {couponError && !isValidatingCoupon && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-2 flex items-center gap-2 p-2.5 rounded-xl bg-red-500/5 border border-red-500/10"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest leading-none">
                                {couponError}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="space-y-2.5">
                <Label htmlFor="requirements" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Additional Requirements</Label>
                <div className="relative group">
                    <Textarea
                        id="requirements"
                        name="requirements"
                        placeholder="What are your goals for this project?"
                        className={cn(
                            "min-h-[120px] bg-zinc-950/30 border-white/5 transition-all duration-300 focus:ring-2 focus:ring-primary/20 p-4 resize-none rounded-xl",
                            focusedField === "requirements" && "border-primary bg-background shadow-lg shadow-primary/5"
                        )}
                        value={formData.requirements}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("requirements")}
                        onBlur={() => setFocusedField(null)}
                    />
                    <div className="absolute bottom-3 right-3 text-[10px] text-muted-foreground uppercase font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                        Optional but helpful
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                className="w-full text-lg h-14 rounded-xl font-bold shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all group overflow-hidden"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <div className="flex items-center justify-center gap-2">
                        <span>Place Order - ${discountedTotal.toLocaleString()}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                )}
            </Button>
        </form>
    )
}
