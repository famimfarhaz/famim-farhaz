"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface CheckoutFormProps {
    packageName: string
    price: number
    packageDetails: string[]
}

export function CheckoutForm({ packageName, price, packageDetails }: CheckoutFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        couponCode: "",
        requirements: "",
    })

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
                    totalPrice: price,
                    orderType: 'fixed'
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Failed to submit order')
            }

            toast.success("Order placed successfully! Check your email for confirmation.")
            router.push("/") // Redirect to home page

        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong.")
        } finally {
            setIsLoading(false)
        }
    }

    const fieldClassName = (name: string) => cn(
        "bg-background/50 border-border/50 transition-all duration-300 h-12 focus:ring-2 focus:ring-primary/20",
        focusedField === name && "border-primary scale-[1.01] bg-background shadow-lg shadow-primary/5"
    )

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
                    <Input
                        id="couponCode"
                        name="couponCode"
                        placeholder="DISCOUNT20"
                        value={formData.couponCode}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("couponCode")}
                        onBlur={() => setFocusedField(null)}
                        className={cn(fieldClassName("couponCode"), "border-dashed focus:border-solid")}
                    />
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
                            "min-h-[120px] bg-background/50 border-border/50 transition-all duration-300 focus:ring-2 focus:ring-primary/20 p-4 resize-none",
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
                        <span>Place Order - ${price.toLocaleString()}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                )}
            </Button>
        </form>
    )
}
