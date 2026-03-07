"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  Briefcase,
  ChevronDown,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { StaggeredStep } from "@/components/ui/step-transition"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { submitContactForm } from "@/lib/contact-service"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

function ContactContent() {
  const sectionRef = useScrollAnimation()
  const searchParams = useSearchParams()
  const preSelectedService = searchParams.get('service')
  const preSelectedPackage = searchParams.get('package')
  const [currentStep, setCurrentStep] = useState(1)
  const [previousStep, setPreviousStep] = useState(1)
  const [isStepTransitioning, setIsStepTransitioning] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [dropdownStates, setDropdownStates] = useState({
    role: false,
    timeline: false,
    budget: false
  })
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: "",
    email: "",
    company: "",
    phone: "",
    // Step 2: Services & Packages
    selectedServices: preSelectedService ? [preSelectedService] : [] as string[],
    selectedPackage: preSelectedPackage || "",
    // Step 3: Project Brief
    role: "",
    budget: "",
    timeline: "",
    message: preSelectedService
      ? `I'm interested in ${preSelectedService}.`
      : preSelectedPackage
        ? `I'm interested in the ${preSelectedPackage} package.`
        : "",
    activateFreeDemo: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const projectType = formData.selectedPackage
        ? `Package: ${formData.selectedPackage}`
        : formData.selectedServices.length > 0
          ? `Services: ${formData.selectedServices.join(', ')}`
          : ''

      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        activateFreeDemo: formData.activateFreeDemo,
        projectType,
        role: formData.role,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
      })

      if (result.success) {
        setIsSubmitted(true)
      } else {
        setSubmitError(result.message)
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const goToStep = (step: number) => {
    setIsStepTransitioning(true)
    setPreviousStep(currentStep)
    setTimeout(() => {
      setCurrentStep(step)
      setTimeout(() => setIsStepTransitioning(false), 100)
    }, 200)
  }

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      goToStep(2)
    }
  }

  const handleServicesSubmit = () => {
    if (formData.selectedServices.length > 0 || formData.selectedPackage) {
      goToStep(3)
    }
  }

  const goBack = () => {
    goToStep(currentStep - 1)
  }

  const toggleService = (service: string) => {
    const services = formData.selectedServices.includes(service)
      ? formData.selectedServices.filter(s => s !== service)
      : [...formData.selectedServices, service]
    setFormData({ ...formData, selectedServices: services, selectedPackage: "" })
  }

  const toggleDropdown = (dropdownName: keyof typeof dropdownStates) => {
    setDropdownStates(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {} as typeof prev),
      [dropdownName]: !prev[dropdownName]
    }))
  }

  const selectOption = (field: string, value: string, dropdownName: keyof typeof dropdownStates) => {
    setFormData({ ...formData, [field]: value })
    setDropdownStates(prev => ({ ...prev, [dropdownName]: false }))
  }

  return (
    <>
      <style jsx global>{`
  .custom-scrollbar::-webkit-scrollbar { width: 8px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: hsl(var(--background)); border-radius: 4px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 4px; border: 1px solid hsl(var(--background)); }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: hsl(var(--accent)); }
  .custom-scrollbar { scrollbar-width: thin; scrollbar-color: hsl(var(--border)) hsl(var(--background)); }
  @keyframes slideInRight { from { opacity: 0; transform: translateX(100px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slideInLeft { from { opacity: 0; transform: translateX(-100px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slideOutLeft { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(-100px); } }
  @keyframes slideOutRight { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(100px); } }
  .step-enter { animation: slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .step-enter-reverse { animation: slideInLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .step-exit { animation: slideOutLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .step-exit-reverse { animation: slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .progress-indicator-step { transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
`}</style>
      <div ref={sectionRef} className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
            {/* Hero Section */}
            <div className="max-w-2xl mx-auto text-center mb-12 scroll-animate">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-4 text-balance text-white">
                Let's Build Something <span className="text-zinc-600">Amazing</span>
              </h1>
              <p className="text-base text-zinc-500 leading-relaxed max-w-lg mx-auto font-medium">
                Ready to bring your project to life? Fill out the form below and I'll get back to you within 24 hours.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="lg:col-span-2 scroll-animate">
                <Card className="p-8 lg:p-12 bg-zinc-950/50 backdrop-blur-xl border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between mb-10 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        {[1, 2, 3].map((step) => (
                          <div
                            key={step}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all duration-500 ${currentStep >= step ? 'bg-white border-white text-black' : 'bg-transparent border-white/10 text-white/30'}`}
                          >
                            {currentStep > step ? <CheckCircle2 className="h-4 w-4" /> : step}
                          </div>
                        ))}
                      </div>
                      <div className="h-px w-12 bg-white/10 hidden sm:block" />
                      <div>
                        <p className="text-xs uppercase tracking-widest font-black text-white/40 mb-0.5">Step {currentStep}/3</p>
                        <p className="text-sm font-bold text-white uppercase tracking-tight">
                          {currentStep === 1 && "Basic Info"}
                          {currentStep === 2 && "Services"}
                          {currentStep === 3 && "Project Brief"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form Content */}
                  <div className="relative min-h-[500px]">
                    {/* Step 1: Basic Information */}
                    <StaggeredStep stepNumber={1} currentStep={currentStep} className={isStepTransitioning && previousStep < currentStep ? 'step-exit' : isStepTransitioning && previousStep > currentStep ? 'step-exit-reverse' : !isStepTransitioning && currentStep === 1 ? currentStep > previousStep ? 'step-enter' : 'step-enter-reverse' : ''}>
                      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-white" data-animate-child>
                        <User className="h-7 w-7 text-white/50" />
                        Basic Information
                      </h2>
                      <form onSubmit={handleBasicInfoSubmit} className="space-y-6" data-animate-child>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <Label htmlFor="name" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Full Name</Label>
                            <Input id="name" name="name" placeholder="e.g. John Doe" value={formData.name} onChange={handleChange} required className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white focus:ring-0 transition-all text-white placeholder:text-zinc-600 px-6 font-medium" />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="email" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Email Address</Label>
                            <Input id="email" name="email" type="email" placeholder="e.g. john@company.com" value={formData.email} onChange={handleChange} required className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white focus:ring-0 transition-all text-white placeholder:text-zinc-600 px-6 font-medium" />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <Label htmlFor="company" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Website / Company</Label>
                            <Input id="company" name="company" placeholder="e.g. yourwebsite.com" value={formData.company} onChange={handleChange} className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white focus:ring-0 transition-all text-white placeholder:text-zinc-600 px-6 font-medium" />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="phone" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Phone (Optional)</Label>
                            <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white focus:ring-0 transition-all text-white placeholder:text-zinc-600 px-6 font-medium" />
                          </div>
                        </div>
                        <Button type="submit" size="lg" className="w-full h-16 bg-white text-black hover:bg-zinc-200 rounded-full font-black text-base uppercase tracking-widest transition-all active:scale-95 group">
                          Next Step
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </form>
                    </StaggeredStep>

                    {/* Step 2: Services & Packages */}
                    {currentStep === 2 && !isSubmitted && (
                      <StaggeredStep stepNumber={2} currentStep={currentStep}>
                        <div className="mb-10" data-animate-child>
                          <button onClick={goBack} className="mb-6 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-black group">
                            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                            Go Back
                          </button>
                          <h2 className="text-4xl font-black text-white mb-1 tracking-tight">
                            What Do You Need?
                          </h2>
                          <p className="text-zinc-600 text-sm">Pick services or a package below</p>
                        </div>

                        <div className="space-y-10" data-animate-child>
                          {/* Individual Services */}
                          <div className="flex flex-wrap gap-2.5">
                            {["Landing Page / Portfolio", "Business Website", "E-Commerce Website", "Admin Panel", "Dashboard & Analytics", "Project & Team Mgmt SaaS"].map((service) => (
                              <button
                                key={service}
                                type="button"
                                onClick={() => toggleService(service)}
                                className={`h-11 px-5 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                                  formData.selectedServices.includes(service)
                                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] ring-1 ring-white/[0.06] hover:ring-white/20"
                                }`}
                              >
                                {service}
                              </button>
                            ))}
                          </div>

                          {/* OR Divider */}
                          <div className="flex items-center gap-5">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/15">or pick a package</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                          </div>

                          {/* Packages */}
                          <div className="grid gap-3">
                            {[
                              {
                                name: "Ignite",
                                emoji: "\uD83D\uDD25",
                                tagline: "Get online. Look professional.",
                                features: ["Landing Page / Portfolio", "Business Website (Advanced)", "Mobile Responsive + SEO", "AI Chatbot Integration", "30-Day Warranty"],
                                price: "$500"
                              },
                              {
                                name: "Ascend",
                                emoji: "\u26A1",
                                tagline: "A full business system.",
                                features: ["Business Website (Advanced)", "Admin Panel", "Dashboard & Analytics", "AI Chatbot Integration", "30-Day Warranty"],
                                price: "$1,200"
                              },
                              {
                                name: "Dominate",
                                emoji: "\uD83D\uDE80",
                                tagline: "Sell online. Scale fast.",
                                features: ["E-Commerce Website", "Admin Panel", "Dashboard & Analytics", "AI Chatbot Integration", "30-Day Warranty"],
                                price: "$2,000"
                              },
                              {
                                name: "Custom",
                                emoji: "\u2726",
                                tagline: "Your vision, fully custom.",
                                features: ["Everything in Dominate", "Project & Team Mgmt SaaS", "AI Chatbot Integration", "30-Day Warranty"],
                                price: "Let's Talk"
                              }
                            ].map((pkg) => (
                              <div
                                key={pkg.name}
                                onClick={() => setFormData({ ...formData, selectedPackage: formData.selectedPackage === pkg.name ? "" : pkg.name, selectedServices: [] })}
                                className={`group relative w-full rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${
                                  formData.selectedPackage === pkg.name
                                    ? "ring-2 ring-white shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                                    : "ring-1 ring-white/[0.06] hover:ring-white/15"
                                }`}
                              >
                                <div className={`absolute inset-0 transition-opacity duration-300 ${
                                  formData.selectedPackage === pkg.name ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                                }`} style={{ background: 'radial-gradient(ellipse at top left, rgba(255,255,255,0.04), transparent 70%)' }} />
                                <div className="relative px-6 py-5">
                                  <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 min-w-0">
                                      <span className="text-2xl shrink-0">{pkg.emoji}</span>
                                      <div className="min-w-0">
                                        <h3 className="text-[15px] font-black tracking-tight text-white">{pkg.name}</h3>
                                        <p className="text-[12px] text-zinc-600 truncate">{pkg.tagline}</p>
                                      </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                      <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">From</p>
                                      <p className="text-xl font-black text-white tracking-tight">{pkg.price}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5 mt-4">
                                    {pkg.features.map((f) => (
                                      <span key={f} className={`text-[10px] font-semibold px-2.5 py-1 rounded-md transition-colors duration-300 ${
                                        formData.selectedPackage === pkg.name
                                          ? "bg-white/10 text-white/70"
                                          : "bg-white/[0.03] text-zinc-600"
                                      }`}>
                                        {f}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <Button
                            type="button"
                            size="lg"
                            onClick={handleServicesSubmit}
                            disabled={formData.selectedServices.length === 0 && !formData.selectedPackage}
                            className="w-full h-16 bg-white text-black hover:bg-zinc-200 rounded-full font-black text-base uppercase tracking-widest transition-all active:scale-95 group disabled:opacity-20 disabled:cursor-not-allowed disabled:active:scale-100"
                          >
                            Next Step
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </StaggeredStep>
                    )}

                    {/* Step 3: Project Brief */}
                    {currentStep === 3 && !isSubmitted && (
                      <StaggeredStep stepNumber={3} currentStep={currentStep}>
                        <div className="mb-10" data-animate-child>
                          <button onClick={goBack} className="mb-6 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-black group">
                            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                            Go Back
                          </button>
                          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <Briefcase className="h-7 w-7 text-white/50" />
                            Project Brief
                          </h2>
                          <p className="text-zinc-500 text-sm font-medium">Almost done — tell me about your timeline and requirements</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6" data-animate-child>
                          <div className="space-y-3">
                            <Label htmlFor="message" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Project Description</Label>
                            <Textarea id="message" name="message" placeholder="Tell me more about your requirements..." value={formData.message} onChange={handleChange} required rows={6} className="bg-white/5 border-white/10 rounded-2xl focus:border-white focus:ring-0 transition-all text-white placeholder:text-zinc-600 p-6 font-medium resize-none min-h-[200px]" />
                          </div>

                          {/* FREE Demo Offer */}
                          <div
                            className={`p-6 rounded-[2rem] transition-all duration-500 cursor-pointer overflow-hidden relative group ${formData.activateFreeDemo ? 'bg-white border-white' : 'bg-white/5 border border-white/10 hover:border-white/20'}`}
                            onClick={() => setFormData({ ...formData, activateFreeDemo: !formData.activateFreeDemo })}
                          >
                            <div className="flex items-center gap-5 relative z-10 text-balance sm:text-nowrap">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${formData.activateFreeDemo ? 'bg-black border-black' : 'border-white/20'}`}>
                                {formData.activateFreeDemo && <CheckCircle2 className="h-4 w-4 text-white" />}
                              </div>
                              <div>
                                <p className={`text-sm font-bold uppercase tracking-tight ${formData.activateFreeDemo ? 'text-black' : 'text-white'}`}>YES! ACTIVATE MY FREE DEMO</p>
                                <p className={`text-xs font-medium ${formData.activateFreeDemo ? 'text-black/60' : 'text-zinc-500'}`}>Get a custom walkthrough of how I can solve your specific problem.</p>
                              </div>
                            </div>
                          </div>

                          {submitError && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider">{submitError}</div>
                          )}

                          <Button type="submit" size="lg" className="w-full h-16 bg-white text-black hover:bg-zinc-200 rounded-full font-black text-base uppercase tracking-widest transition-all active:scale-95 group">
                            {isSubmitting ? "Processing..." : "Submit Project Inquiry"}
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </form>
                      </StaggeredStep>
                    )}

                    {/* Success State */}
                    {isSubmitted && (
                      <div className="py-12 flex flex-col items-center text-center max-w-lg mx-auto overflow-hidden">
                        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 12, stiffness: 200 }} className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-8 shadow-2xl">
                          <CheckCircle2 className="h-12 w-12 text-black" />
                        </motion.div>
                        <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-5xl font-bold text-white mb-6 tracking-tight">
                          Message Received.
                        </motion.h2>
                        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-zinc-500 text-lg font-medium leading-relaxed mb-12 max-w-sm">
                          Thank you for reaching out, {formData.name}. I'll personally review your inquiry and get back to you within 24 hours.
                        </motion.p>
                        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 }} className="w-full h-px bg-white/10 mb-12" />
                        <div className="space-y-4 w-full">
                          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-6">Next Steps</motion.p>
                          <div className="grid gap-4">
                            {[
                              { id: "01", title: "Review", text: "Manual review of your requirements" },
                              { id: "02", title: "Connect", text: "Direct email follow-up within 24h" }
                            ].map((step, idx) => (
                              <motion.div key={step.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 + (idx * 0.1) }} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 text-left flex items-center gap-6 group hover:bg-white transition-all duration-500">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 font-black text-xs group-hover:bg-black group-hover:text-white transition-colors">{step.id}</div>
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 group-hover:text-black/50 transition-colors">{step.title}</p>
                                  <p className="text-sm font-bold text-white group-hover:text-black transition-colors">{step.text}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
                          <Button onClick={() => window.location.reload()} className="mt-12 h-14 px-10 bg-white text-black hover:bg-zinc-200 rounded-full font-black uppercase tracking-widest transition-all active:scale-95">Back Home</Button>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-8">
                <Card className="p-10 bg-zinc-950/50 backdrop-blur-xl border-white/10 rounded-[2rem] scroll-animate relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 blur-3xl rounded-full" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-8">Connect</h3>
                  <div className="space-y-8">
                    <div className="flex items-center gap-5 group/item">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/item:bg-white group-hover/item:text-black transition-all duration-500"><Mail className="h-5 w-5" /></div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-0.5">Email</p>
                        <p className="text-sm font-bold text-white tracking-tight">famimfarhaz@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 group/item">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/item:bg-white group-hover/item:text-black transition-all duration-500"><Phone className="h-5 w-5" /></div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-0.5">Direct</p>
                        <p className="text-sm font-bold text-white tracking-tight">+880 1843 728903</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 group/item">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/item:bg-white group-hover/item:text-black transition-all duration-500"><MapPin className="h-5 w-5" /></div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-0.5">Base</p>
                        <p className="text-sm font-bold text-white tracking-tight">Global / Remote</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="p-8 rounded-[2rem] bg-white border border-white text-black scroll-animate relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-black/[0.03] rounded-bl-[4rem]" />
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <div className="h-1.5 w-1.5 rounded-full bg-black animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.1)]" />
                    <p className="text-[9px] font-black uppercase tracking-[0.2em]">Currently Active</p>
                  </div>
                  <h4 className="text-xl font-bold leading-[1.2] mb-3 tracking-tighter relative z-10">Accepting projects for Q2 2025</h4>
                  <p className="text-xs font-medium opacity-50 relative z-10">Ready for kickoff.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactContent />
    </Suspense>
  )
}
