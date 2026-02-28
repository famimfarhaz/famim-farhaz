"use client"

import React, { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { servicePrices } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Check, Loader2, Minus, Plus, ShoppingCart, Info, ArrowRight, Sparkles, ShieldCheck } from "lucide-react"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { generateInvoice, InvoiceData } from "@/lib/invoice-generator";

interface OrderForm {
  name: string
  packageName: string
  email: string
  phone: string
  couponCode?: string
  notes: string
}

export function CustomPackageBuilder() {
  const searchParams = useSearchParams()
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isNegotiation, setIsNegotiation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("Website Development")
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const [formData, setFormData] = useState<OrderForm>({
    name: "",
    packageName: "",
    email: "",
    phone: "",
    couponCode: "",
    notes: "",
  })
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [couponError, setCouponError] = useState<string | null>(null)
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false)

  // Live Coupon Validation
  useEffect(() => {
    const validateCoupon = async () => {
      const code = formData.couponCode?.toUpperCase().trim()
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
          setCouponDiscount(data.discountPercent / 100)
        } else {
          setCouponDiscount(0)
          setCouponError(data.message || "Invalid voucher")
        }
      } catch (error) {
        console.error("Coupon validation error:", error)
        setCouponDiscount(0)
        setCouponError("Validation failed. Please try again.")
      } finally {
        setIsValidatingCoupon(false)
      }
    }

    const debounceTimer = setTimeout(validateCoupon, 500)
    return () => clearTimeout(debounceTimer)
  }, [formData.couponCode])

  // Define service categories
  const categories = ["Website Development", "SaaS Solutions"]

  const mobileCategoryLabels: Record<string, string> = {
    "Website Development": "Website",
    "SaaS Solutions": "SaaS",
  }

  // Convert servicePrices array to objects for easier handling
  const services = useMemo(() => {
    return servicePrices.map((service) => ({
      id: service.name.toLowerCase().replace(/\s+/g, '-'),
      name: service.name,
      price: service.price,
      category: service.category,
      description: service.description,
      comingSoon: service.comingSoon || false,
    }))
  }, [])

  // Handle pre-selected service from URL
  useEffect(() => {
    const preSelectedService = searchParams.get("service")
    if (preSelectedService && services.some((s: any) => s.id === preSelectedService)) {
      setSelectedItems(prev => prev.includes(preSelectedService) ? prev : [...prev, preSelectedService])

      // If it's a specific service, also switch to its category
      const service = services.find((s: any) => s.id === preSelectedService)
      if (service) {
        setActiveTab(service.category)
      }
    }
  }, [searchParams, services])

  // Filter services by active tab
  const filteredServices = useMemo(() => {
    return services.filter(s => s.category === activeTab)
  }, [services, activeTab])

  const toggleService = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const selectedServices = useMemo(() => {
    return services.filter(s => selectedItems.includes(s.id))
  }, [services, selectedItems])

  const total = useMemo(() => {
    return selectedServices.reduce((acc, cur) => acc + cur.price, 0)
  }, [selectedServices])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const bundleDiscount = useMemo(() => {
    return selectedServices.length >= 2 ? 0.15 : 0
  }, [selectedServices])

  const discountRate = couponDiscount + bundleDiscount

  const discountAmount = useMemo(() => {
    return total * discountRate
  }, [total, discountRate])

  const bundleDiscountAmount = useMemo(() => {
    return total * bundleDiscount
  }, [total, bundleDiscount])

  const couponDiscountAmount = useMemo(() => {
    return total * couponDiscount
  }, [total, couponDiscount])

  const discountedTotal = useMemo(() => {
    return total - discountAmount
  }, [total, discountAmount])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedItems.length === 0) {
      toast.error("Please select at least one service.")
      return
    }

    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formData.name,
          packageName: formData.packageName,
          email: formData.email,
          phone: formData.phone,
          requirements: formData.notes,
          packageDetails: selectedServices.map(s => ({ name: s.name, price: s.price })),
          totalPrice: discountedTotal,
          couponCode: formData.couponCode,
          orderType: isNegotiation ? 'negotiation' : 'fixed'
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to submit order')
      }

      // Generate and download invoice
      const newInvoiceData: InvoiceData = {
        clientName: formData.name,
        packageName: formData.packageName,
        email: formData.email,
        services: selectedServices.map(s => ({ name: s.name, price: s.price })),
        total: total,
        bundleDiscountAmount: bundleDiscountAmount,
        couponDiscountAmount: couponDiscountAmount,
        discountAmount: discountAmount,
        discountedTotal: discountedTotal,
        couponCode: formData.couponCode,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        orderId: data.id || Math.random().toString(36).substr(2, 9).toUpperCase()
      };
      generateInvoice(newInvoiceData)
      setInvoiceData(newInvoiceData)

      toast.success("Order received! Your invoice has been downloaded.")
      setSubmissionStatus('success')
      setCurrentStep(4)

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.")
      setSubmissionStatus('error')
      setCurrentStep(4)
    } finally {
      setIsLoading(false)
    }
  }

  const fieldClassName = (name: string) => cn(
    "bg-zinc-950/30 border-white/5 transition-all duration-300 h-12 focus:ring-2 focus:ring-primary/20",
    focusedField === name && "border-primary scale-[1.01] bg-background shadow-lg shadow-primary/5"
  )

  if (currentStep === 4) {
    const isSuccess = submissionStatus === 'success';
    return (
      <motion.div
        key="step4-fullscreen"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 py-12"
      >
        <div className="text-center mb-8">
          <div className={cn(
            "inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-2xl ring-1",
            isSuccess
              ? "bg-green-500/20 text-green-500 shadow-green-500/10 ring-green-500/20"
              : "bg-red-500/20 text-red-500 shadow-red-500/10 ring-red-500/20"
          )}>
            {isSuccess ? <Check className="w-10 h-10" /> : <Plus className="w-10 h-10 rotate-45" />}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {isSuccess ? "Order Confirmed" : "Submission Failed"}
          </h2>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto leading-relaxed">
            {isSuccess
              ? "Your project request has been received. Have a look at your digital pro-forma invoice which has been downloaded."
              : "Something went wrong while processing your request. Please try again or contact support."}
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => {
              if (isSuccess) {
                setSelectedItems([])
                setFormData({ name: "", packageName: "", email: "", phone: "", couponCode: "", notes: "" })
                setCurrentStep(1)
                setInvoiceData(null)
                setSubmissionStatus('idle')
              } else {
                setCurrentStep(3)
              }
              document.getElementById('package-builder')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="h-14 px-10 rounded-full font-bold text-sm uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-all shadow-xl shadow-white/5"
          >
            {isSuccess ? "Start New Project" : "Try Again"}
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start mb-20 relative">
      {/* Services List - Left Column */}
      <div className="lg:col-span-8 space-y-8 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">1. Select Services</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-1 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground transition-colors cursor-help">
                    <Info className="w-4 h-4" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-4 backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
                  <h4 className="font-bold mb-1 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    How it works
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Select the services you need. The total price updates in real-time. You can then refine details in the next step.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 p-1 rounded-xl bg-zinc-950/30 border border-white/5 backdrop-blur-sm shadow-inner overflow-x-auto">
          {categories.map((category) => {
            const count = services.filter(s => s.category === category).length
            const isActive = activeTab === category
            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={cn(
                  "relative px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap overflow-hidden flex items-center gap-2 group",
                  isActive
                    ? "text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-primary -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="md:hidden">{mobileCategoryLabels[category]}</span>
                <span className="hidden md:inline">{category}</span>
                <span className={cn(
                  "text-[10px] px-1.5 rounded-md bg-foreground/10",
                  isActive ? "bg-white/20" : "bg-muted-foreground/10"
                )}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const isSelected = selectedItems.includes(service.id)
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => !service.comingSoon && toggleService(service.id)}
                  className={cn(
                    "relative p-5 rounded-2xl border transition-all duration-300 select-none overflow-hidden group",
                    service.comingSoon
                      ? "border-white/5 bg-zinc-950/20 cursor-not-allowed opacity-60"
                      : isSelected
                        ? "border-primary bg-primary/5 shadow-2xl shadow-primary/5"
                        : "border-white/5 bg-zinc-900/40 backdrop-blur-xl hover:border-white/10 hover:bg-zinc-900/60 cursor-pointer"
                  )}
                >
                  {/* Decorative Background Glow */}
                  <div className={cn(
                    "absolute -top-10 -right-10 w-32 h-32 blur-3xl rounded-full transition-opacity duration-500",
                    isSelected ? "bg-primary/20 opacity-100" : "bg-primary/5 opacity-0 group-hover:opacity-100"
                  )} />

                  <div className="relative flex justify-between items-start mb-4">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className={cn(
                          "font-bold text-base md:text-lg tracking-tight leading-tight transition-colors",
                          isSelected ? "text-primary" : "text-foreground"
                        )}>
                          {service.name}
                        </h4>
                        {service.comingSoon && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border/50 text-muted-foreground font-bold tracking-tighter">
                            SOON
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    {!service.comingSoon && (
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0",
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20"
                          : "border-border bg-transparent group-hover:border-primary/50"
                      )}>
                        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                    )}
                  </div>

                  <div className="relative mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black block mb-0.5">Starting</span>
                      <span className="text-xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
                        ${service.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-[10px] text-right font-bold text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      {isSelected ? "SELECTED" : "ADD TO PLAN →"}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Selection Summary - Right Column */}
      <div id="package-summary" className="lg:col-span-4 sticky top-28 group">
        <Card className="relative border-white/5 bg-zinc-900/30 backdrop-blur-3xl shadow-none rounded-3xl overflow-hidden">
          <CardHeader className="bg-zinc-950/20 border-b border-white/5 pb-8 px-8">
            <CardTitle className="flex items-center gap-4 text-xl font-bold">
              <div className="p-3 bg-white text-black rounded-2xl transition-transform">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span>{selectedServices.length > 1 ? "Strategic Bundle" : "Selected Solution"}</span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mt-1">
                  {selectedServices.length > 1 ? "Customized Package" : "Individual Choice"}
                </span>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-8 px-8 pb-8 space-y-8">
            {/* Step Indicator */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-zinc-950/30 border border-white/5">
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all",
                  currentStep === 1 ? "bg-white text-black shadow-xl shadow-white/10 scale-110" : "bg-zinc-900 text-zinc-500"
                )}>1</div>
                <span className="text-[7px] font-bold uppercase tracking-widest text-zinc-500">Choice</span>
              </div>
              <div className="w-4 h-px bg-border/50 translate-y-[-6px]" />
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all",
                  currentStep === 2 ? "bg-white text-black shadow-xl shadow-white/10 scale-110" : "bg-zinc-900 text-zinc-500"
                )}>2</div>
                <span className="text-[7px] font-bold uppercase tracking-widest text-zinc-500">Details</span>
              </div>
              <div className="w-4 h-px bg-border/50 translate-y-[-6px]" />
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all",
                  currentStep === 3 ? "bg-white text-black shadow-xl shadow-white/10 scale-110" : "bg-zinc-900 text-zinc-500"
                )}>3</div>
                <span className="text-[7px] font-bold uppercase tracking-widest text-zinc-500">Review</span>
              </div>
              <div className="w-4 h-px bg-border/50 translate-y-[-6px]" />
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all",
                  (currentStep as number) === 4 ? "bg-white text-black shadow-xl shadow-white/10 scale-110" : "bg-zinc-900 text-zinc-500"
                )}>4</div>
                <span className="text-[7px] font-bold uppercase tracking-widest text-zinc-500">Result</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {currentStep === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {selectedServices.length === 0 ? (
                    <div className="text-center py-16 px-4 border border-dashed border-white/10 rounded-2xl bg-zinc-950/30">
                      <div className="bg-white/5 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 text-zinc-500">
                        <Plus className="w-8 h-8" />
                      </div>
                      <p className="text-sm text-zinc-500 font-medium leading-relaxed italic">
                        Select a service to<br />get started
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="max-h-[350px] overflow-y-auto pr-3 -mr-3 space-y-3 custom-scrollbar">
                        {selectedServices.map((item) => (
                          <motion.div
                            layout
                            key={item.id}
                            className="flex justify-between items-center text-sm p-5 rounded-2xl bg-zinc-900/40 border border-white/5 transition-all"
                          >
                            <div className="flex flex-col">
                              <span className="font-bold text-white text-xs uppercase tracking-widest">{item.name}</span>
                              <span className="text-[10px] text-zinc-500 font-bold mt-1 tracking-tighter uppercase">{item.category}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-bold text-white tracking-widest text-xs">${item.price.toLocaleString()}</span>
                              <button
                                onClick={() => toggleService(item.id)}
                                className="text-zinc-500 hover:text-white transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-border/50 space-y-6">
                        <div className="flex justify-between items-end">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Investment Est.</span>
                            <div className="flex items-baseline gap-3">
                              <span className="text-4xl font-bold text-white tracking-tighter tabular-nums">${discountedTotal.toLocaleString()}</span>
                              {discountRate > 0 && (
                                <span className="text-sm text-zinc-600 line-through font-bold tracking-widest">${total.toLocaleString()}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Bundle Notice - Minimal Style */}
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            "p-4 rounded-2xl border border-white/5 bg-zinc-950/30 transition-all duration-500",
                            selectedServices.length >= 2 && "border-white/10 bg-zinc-950/50"
                          )}
                        >
                          <div className="space-y-1">
                            <p className={cn(
                              "text-[10px] font-bold uppercase tracking-[0.2em] leading-none",
                              selectedServices.length >= 2 ? "text-white" : "text-zinc-500"
                            )}>
                              {selectedServices.length >= 2 ? "Congrats! You get 15% off" : "Strategic Bundle Perk"}
                            </p>
                            <p className="text-[10px] font-medium text-zinc-500 leading-relaxed italic">
                              {selectedServices.length >= 2
                                ? "A 15% Strategic Bundle discount has been automatically applied to your custom package."
                                : "Unlock a 15% automatic discount on your entire plan by adding 2 or more services together."}
                            </p>
                          </div>
                        </motion.div>

                        <Button
                          onClick={() => setCurrentStep(2)}
                          className="w-full h-14 rounded-full font-bold text-sm uppercase tracking-widest bg-white text-black hover:bg-zinc-200 shadow-xl shadow-white/5 transition-all"
                          size="lg"
                        >
                          Continue to Details <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : currentStep === 2 ? (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-6">
                    <div className="space-y-2.5 px-1">
                      <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 ml-1">Client Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="What should I call you?"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={fieldClassName("name")}
                      />
                    </div>

                    <div className="space-y-2.5 px-1">
                      <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 ml-1">Direct Connect</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={fieldClassName("email")}
                      />
                    </div>

                    <div className="space-y-2.5 px-1">
                      <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 ml-1">Contact Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Project contact number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={fieldClassName("phone")}
                      />
                    </div>

                    <div className="space-y-2.5 px-1">
                      <Label htmlFor="notes" className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 ml-1">Project Vision</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Tell me more about your requirements..."
                        value={formData.notes}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("notes")}
                        onBlur={() => setFocusedField(null)}
                        className={cn(
                          "min-h-[120px] bg-zinc-950/30 border border-white/5 transition-all duration-300 focus:ring-1 focus:ring-white/20 p-4 resize-none rounded-2xl text-sm placeholder:italic",
                          focusedField === "notes" && "border-white/30 bg-zinc-950/50"
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      variant="ghost"
                      className="h-14 rounded-full font-bold uppercase tracking-widest text-[10px] px-8 border border-white/5 hover:bg-white/5 transition-all"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => {
                        if (!formData.name || !formData.email || !formData.phone) {
                          toast.error("Please fill in all required fields.")
                          return
                        }
                        setCurrentStep(3)
                      }}
                      className="flex-1 h-14 rounded-full font-bold text-sm uppercase tracking-widest shadow-xl shadow-white/5 transition-all bg-white text-black hover:bg-zinc-200"
                    >
                      Process Plan <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ) : currentStep === 3 ? (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6">
                      {selectedServices.length > 1 && (
                        <div className="space-y-2.5 px-1">
                          <Label htmlFor="packageName" className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 ml-1">Strategy Name</Label>
                          <Input
                            id="packageName"
                            name="packageName"
                            placeholder="Bundle Name (Optional)"
                            value={formData.packageName}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField("packageName")}
                            onBlur={() => setFocusedField(null)}
                            className={fieldClassName("packageName")}
                          />
                        </div>
                      )}

                      <div className="space-y-2.5 px-1 pb-2">
                        <Label htmlFor="couponCode" className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 ml-1">Voucher</Label>
                        <div className="relative">
                          <Input
                            id="couponCode"
                            name="couponCode"
                            placeholder="Enter Voucher Code"
                            value={formData.couponCode}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField("couponCode")}
                            onBlur={() => setFocusedField(null)}
                            className={cn(
                              fieldClassName("couponCode"),
                              discountRate > 0 && "border-white/20 bg-white/[0.01]",
                              couponError && "border-red-500/50 bg-red-500/5 focus:border-red-500"
                            )}
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            {isValidatingCoupon ? (
                              <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
                            ) : discountRate > 0 ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="px-2 py-1 rounded-md bg-white text-[9px] font-bold text-black uppercase tracking-widest shadow-xl shadow-white/10"
                              >
                                {(discountRate * 100).toFixed(0)}% DISCOUNT
                              </motion.div>
                            ) : couponError ? (
                              <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {couponError && !isValidatingCoupon && (
                          <p className="text-[9px] font-bold text-red-400 uppercase tracking-widest ml-1 mt-1 animate-in fade-in slide-in-from-top-1">
                            {couponError}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between p-5 rounded-2xl bg-zinc-950/30 border border-white/5">
                        <Label htmlFor="negotiate-mode" className="text-xs font-bold cursor-pointer flex items-center gap-4 select-none text-zinc-400">
                          <Switch
                            id="negotiate-mode"
                            checked={isNegotiation}
                            onCheckedChange={setIsNegotiation}
                            className="data-[state=checked]:bg-white"
                          />
                          <span>Open for negotiation?</span>
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-3.5 h-3.5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-zinc-900 border-zinc-800 text-zinc-400 text-[10px] font-medium p-4 rounded-xl">
                              If enabled, we'll discuss flexible scope or payment plans based on your budget.
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="flex justify-between items-end pt-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Final Investment</span>
                          <div className="flex items-end gap-4">
                            <span className={cn(
                              "text-4xl font-bold tracking-tighter tabular-nums text-white"
                            )}>
                              ${discountedTotal.toLocaleString()}
                            </span>
                            {discountRate > 0 && (
                              <div className="flex flex-col leading-none pb-1">
                                <span className="text-xs text-zinc-600 line-through font-bold tracking-widest">${total.toLocaleString()}</span>
                                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">OFFER APPLIED</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Discount Notice - Minimal Style */}
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "mt-2 p-4 rounded-2xl border border-white/5 bg-zinc-950/30 transition-all duration-500",
                          selectedServices.length >= 2 && "border-white/10 bg-zinc-950/50"
                        )}
                      >
                        <div className="space-y-1">
                          <p className={cn(
                            "text-[10px] font-bold uppercase tracking-[0.2em] leading-none",
                            selectedServices.length >= 2 ? "text-white" : "text-zinc-500"
                          )}>
                            {selectedServices.length >= 2 ? "Congrats! You get 15% off" : "Strategic Bundle Perk"}
                          </p>
                          <p className="text-[10px] font-medium text-zinc-500 leading-relaxed italic">
                            {selectedServices.length >= 2
                              ? "A 15% Strategic Bundle discount has been automatically applied to your custom package."
                              : "Unlock a 15% automatic discount on your entire plan by adding 2 or more services together."}
                          </p>
                        </div>
                      </motion.div>

                      <div className="flex gap-4">
                        <Button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          variant="ghost"
                          className="h-14 rounded-full font-bold uppercase tracking-widest text-[10px] px-8 border border-border hover:bg-white/5 transition-all"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 h-14 rounded-full font-bold text-sm uppercase tracking-widest shadow-xl shadow-white/5 transition-all bg-white text-black hover:bg-zinc-200"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <span className="flex items-center gap-2">
                              {isNegotiation ? "Consult Project" : "Initiate Project"}
                              <ShieldCheck className="w-4 h-4 opacity-50" />
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 border-t border-white/5 z-50 lg:hidden transition-all duration-500 bg-black/80 backdrop-blur-3xl px-6 py-6",
        selectedServices.length > 0 ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}>
        <div className="flex items-center justify-between max-w-lg mx-auto gap-6">
          <div>
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Projectest.</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-white tracking-tighter leading-none">${discountedTotal.toLocaleString()}</p>
              {discountRate > 0 && (
                <span className="text-[9px] text-zinc-600 line-through font-bold tracking-widest">${total.toLocaleString()}</span>
              )}
            </div>
          </div>
          <Button
            onClick={() => {
              document.getElementById('package-summary')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="rounded-full h-12 px-8 font-bold text-xs uppercase tracking-widest bg-white text-black shadow-xl shadow-white/5"
          >
            Deploy Flow <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CustomPackageBuilder
