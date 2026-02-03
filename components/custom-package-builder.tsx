"use client"

import React, { useState, useMemo } from "react"
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

interface OrderForm {
  name: string
  packageName: string
  email: string
  couponCode?: string
  notes: string
}

export function CustomPackageBuilder() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isNegotiation, setIsNegotiation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("Website Development")
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const [formData, setFormData] = useState<OrderForm>({
    name: "",
    packageName: "",
    email: "",
    couponCode: "",
    notes: "",
  })

  // Define service categories
  const categories = ["Website Development", "SaaS Solutions", "AI/RAG Solutions"]

  const mobileCategoryLabels: Record<string, string> = {
    "Website Development": "Website",
    "SaaS Solutions": "SaaS",
    "AI/RAG Solutions": "AI/RAG",
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
          couponCode: formData.couponCode,
          requirements: formData.notes,
          packageDetails: selectedServices.map(s => ({ name: s.name, price: s.price })),
          totalPrice: total,
          orderType: isNegotiation ? 'negotiation' : 'fixed'
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to submit order')
      }

      toast.success("Order received! We'll be in touch shortly.")
      setSelectedItems([])
      setFormData({ name: "", packageName: "", email: "", couponCode: "", notes: "" })
      setCurrentStep(1)

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fieldClassName = (name: string) => cn(
    "bg-background/50 border-border/50 transition-all duration-300 h-12 focus:ring-2 focus:ring-primary/20",
    focusedField === name && "border-primary scale-[1.01] bg-background shadow-lg shadow-primary/5"
  )

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
          <div className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold uppercase tracking-wider text-primary">
            {services.length} Premium Services Available
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 p-1 rounded-xl bg-muted/30 border border-border/50 backdrop-blur-sm shadow-inner overflow-x-auto">
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
                    "relative p-5 rounded-2xl border-2 transition-all duration-300 select-none overflow-hidden group",
                    service.comingSoon
                      ? "border-border/30 bg-card/20 cursor-not-allowed opacity-60"
                      : isSelected
                        ? "border-primary bg-primary/5 shadow-2xl shadow-primary/5"
                        : "border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/40 hover:bg-card/50 cursor-pointer"
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

      {/* Cart & Checkout - Right Column */}
      <div id="package-summary" className="lg:col-span-4 sticky top-28 group">
        <Card className="relative border-border/50 bg-card/60 backdrop-blur-2xl shadow-2xl rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50 pb-8 px-8">
            <CardTitle className="flex items-center gap-4 text-xl font-bold italic">
              <div className="p-3 bg-primary text-primary-foreground rounded-2xl shadow-lg shadow-primary/20 transform -rotate-3 group-hover:rotate-0 transition-transform">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span>Your Strategy</span>
                <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 italic mt-0.5">Tailored Solution</span>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-8 px-8 pb-8 space-y-8">
            {/* Step Indicator */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-muted/20 border border-border/50">
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-all",
                  currentStep === 1 ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110" : "bg-muted text-muted-foreground"
                )}>1</div>
                <span className="text-[9px] font-black uppercase tracking-tighter">Items</span>
              </div>
              <div className="w-12 h-px bg-border/50 translate-y-[-6px]" />
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-all",
                  currentStep === 2 ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110" : "bg-muted text-muted-foreground"
                )}>2</div>
                <span className="text-[9px] font-black uppercase tracking-tighter">Final</span>
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
                    <div className="text-center py-10 px-4 border-2 border-dashed border-border/50 rounded-[1.5rem] bg-muted/5 group/empty">
                      <div className="bg-muted/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 text-muted-foreground/50 group-hover/empty:scale-110 transition-transform">
                        <Plus className="w-8 h-8" />
                      </div>
                      <p className="text-sm text-muted-foreground font-bold leading-relaxed">
                        Pick a service to<br />begin your transformation
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="max-h-[350px] overflow-y-auto pr-3 -mr-3 space-y-3 custom-scrollbar">
                        {selectedServices.map((item) => (
                          <motion.div
                            layout
                            key={item.id}
                            className="flex justify-between items-center text-sm p-4 rounded-2xl bg-muted/20 border border-border/30 hover:border-primary/30 transition-all group/item"
                          >
                            <div className="flex flex-col">
                              <span className="font-bold text-foreground text-xs uppercase tracking-tighter">{item.name}</span>
                              <span className="text-[10px] text-muted-foreground font-medium">{item.category}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-black text-primary tracking-tighter">${item.price.toLocaleString()}</span>
                              <button
                                onClick={() => toggleService(item.id)}
                                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-1.5 rounded-xl transition-all"
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
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Estimated Value</span>
                            <span className="text-4xl font-black text-primary tracking-tighter tabular-nums">${total.toLocaleString()}</span>
                          </div>
                          <div className="flex flex-col items-end gap-1 pb-1">
                            <span className="text-[10px] text-muted-foreground">{selectedServices.length} Assets selected</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => setCurrentStep(2)}
                          className="w-full h-16 rounded-2xl font-black text-lg shadow-2xl shadow-primary/20 group/btn overflow-hidden relative"
                          size="lg"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Next Step <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </span>
                          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6">
                      <div className="space-y-2.5 px-1">
                        <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-1">Identity</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={fieldClassName("name")}
                        />
                      </div>

                      <div className="space-y-2.5 px-1">
                        <Label htmlFor="packageName" className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-1">Strategy Name</Label>
                        <Input
                          id="packageName"
                          name="packageName"
                          placeholder="Evolution Package"
                          value={formData.packageName}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("packageName")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={fieldClassName("packageName")}
                        />
                      </div>

                      <div className="space-y-2.5 px-1">
                        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-1">Communication</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={fieldClassName("email")}
                        />
                      </div>

                      <div className="space-y-2.5 px-1">
                        <Label htmlFor="notes" className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-1">Vision</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          placeholder="Explain your core goals..."
                          value={formData.notes}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("notes")}
                          onBlur={() => setFocusedField(null)}
                          className={cn(
                            "min-h-[100px] bg-background/50 border-border/50 transition-all duration-300 focus:ring-2 focus:ring-primary/20 p-4 resize-none rounded-xl",
                            focusedField === "notes" && "border-primary bg-background shadow-lg shadow-primary/5"
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-border/50">
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/10">
                        <Label htmlFor="negotiate-mode" className="text-xs font-bold cursor-pointer flex items-center gap-3 select-none">
                          <Switch
                            id="negotiate-mode"
                            checked={isNegotiation}
                            onCheckedChange={setIsNegotiation}
                            className="data-[state=checked]:bg-primary"
                          />
                          <span>Flexible on budget?</span>
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-3.5 h-3.5 text-primary opacity-50 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>If enabled, we'll discuss custom tiers based on your specific needs.</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Total Valuation</span>
                          <span className="text-4xl font-black text-primary tracking-tighter tabular-nums">${total.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          variant="outline"
                          className="h-14 rounded-xl font-bold uppercase tracking-widest text-xs px-6"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 h-14 rounded-xl font-black text-lg shadow-2xl shadow-primary/20 overflow-hidden relative group/submit"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <span className="flex items-center gap-2">
                              {isNegotiation ? "Request Quote" : "Deploy Order"}
                              <ShieldCheck className="w-5 h-5 opacity-50 group-hover/submit:opacity-100 transition-opacity" />
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 border-t border-border/50 z-50 lg:hidden transition-all duration-500 bg-background/80 backdrop-blur-2xl px-4 py-4",
        selectedServices.length > 0 ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}>
        <div className="flex items-center justify-between max-w-lg mx-auto gap-4">
          <div>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-0.5">Estimated Est.</p>
            <p className="text-2xl font-black text-primary tracking-tighter leading-none">${total.toLocaleString()}</p>
          </div>
          <Button
            onClick={() => {
              document.getElementById('package-summary')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="rounded-2xl h-12 px-6 font-black shadow-xl shadow-primary/20"
          >
            Review <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CustomPackageBuilder
