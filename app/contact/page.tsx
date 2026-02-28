"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  User,
  MessageSquare,
  Briefcase,
  Rocket,
  Clock,
  ExternalLink,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { StepTransition, StaggeredStep } from "@/components/ui/step-transition"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { submitContactForm } from "@/lib/contact-service"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function ContactPage() {
  const sectionRef = useScrollAnimation()
  const [currentStep, setCurrentStep] = useState(1)
  const [previousStep, setPreviousStep] = useState(1)
  const [isStepTransitioning, setIsStepTransitioning] = useState(false)
  const [selectedAction, setSelectedAction] = useState<'meeting' | 'hire' | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [dropdownStates, setDropdownStates] = useState({
    projectType: false,
    role: false,
    timeline: false,
    timezone: false,
    meetingPlatform: false,
    budget: false
  })
  const [formData, setFormData] = useState({
    // Basic Info (Step 1)
    name: "",
    email: "",
    company: "",
    phone: "",
    activateFreeDemo: false,
    // Meeting specific fields
    meetingTopic: "",
    preferredDate: "",
    preferredTime: "",
    timezone: "",
    customTimezone: "",
    meetingPlatform: "",
    meetingNotes: "",
    // Hire specific fields
    projectType: "",
    customProjectType: "",
    role: "",
    budget: "",
    timeline: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(null)

    try {
      // Prepare form data for submission
      const submissionData = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        activateFreeDemo: formData.activateFreeDemo,
        selectedAction: selectedAction,

        // Meeting specific fields
        meetingTopic: formData.meetingTopic,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        timezone: formData.timezone,
        customTimezone: formData.customTimezone,
        meetingPlatform: formData.meetingPlatform,
        meetingNotes: formData.meetingNotes,

        // Hire specific fields
        projectType: formData.projectType,
        customProjectType: formData.customProjectType,
        role: formData.role,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
      }

      console.log("Submitting form data:", submissionData)

      // Submit to Supabase
      const result = await submitContactForm(submissionData)

      if (result.success) {
        setSubmitSuccess(result.message)
        setIsSubmitted(true)
        console.log("Form submitted successfully:", result.data)
      } else {
        setSubmitError(result.message)
        console.error("Form submission failed:", result.message)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      setSubmitError(errorMessage)
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate basic info
    if (formData.name && formData.email) {
      setIsStepTransitioning(true)
      setPreviousStep(currentStep)

      setTimeout(() => {
        setCurrentStep(2)
        setTimeout(() => {
          setIsStepTransitioning(false)
        }, 100)
      }, 200)
    }
  }

  const handleActionSelect = (action: 'meeting' | 'hire') => {
    setSelectedAction(action)
    setIsStepTransitioning(true)
    setPreviousStep(currentStep)

    setTimeout(() => {
      setCurrentStep(3)
      setTimeout(() => {
        setIsStepTransitioning(false)
      }, 100)
    }, 200)
  }

  const goBack = () => {
    setIsStepTransitioning(true)
    setPreviousStep(currentStep)

    setTimeout(() => {
      if (currentStep === 3) {
        setCurrentStep(2)
        setSelectedAction(null)
      } else if (currentStep === 2) {
        setCurrentStep(1)
      }
      setTimeout(() => {
        setIsStepTransitioning(false)
      }, 100)
    }, 200)
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
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
  .custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
        
        .custom-scrollbar::-webkit-scrollbar-track {
  background: hsl(var(--background));
  border-radius: 4px;
}
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--border));
  border-radius: 4px;
  border: 1px solid hsl(var(--background));
}
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--accent));
}

        /* Firefox */
        .custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--border)) hsl(var(--background));
}

/* Step Transition Animations */
@keyframes slideInRight {
          from {
    opacity: 0;
    transform: translateX(100px);
  }
          to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
          from {
    opacity: 0;
    transform: translateX(-100px);
  }
          to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutLeft {
          from {
    opacity: 1;
    transform: translateX(0);
  }
          to {
    opacity: 0;
    transform: translateX(-100px);
  }
}

@keyframes slideOutRight {
          from {
    opacity: 1;
    transform: translateX(0);
  }
          to {
    opacity: 0;
    transform: translateX(100px);
  }
}

@keyframes progressFill {
          from {
    width: 0%;
  }
          to {
    width: 100%;
  }
}

@keyframes stepGlow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(var(--accent), 0.4);
}
50% {
  box-shadow: 0 0 0 8px rgba(var(--accent), 0);
          }
        }

/* Loading spinner */
@keyframes spin {
          to {
    transform: rotate(360deg);
  }
}
        
        .spinner {
  animation: spin 1s linear infinite;
}

        /* Step Animation Classes */
        .step-enter {
  animation: slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
        
        .step-enter-reverse {
  animation: slideInLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
        
        .step-exit {
  animation: slideOutLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
        
        .step-exit-reverse {
  animation: slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
        
        .progress-fill {
  animation: progressFill 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
        
        .step-glow {
  animation: stepGlow 1.5s ease-in-out;
}
        
        .form-field-focus {
  transform: scale(1.02);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
        
        
        .progress-indicator-step {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
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
                  {/* Subtle Background Glow */}
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
                          {currentStep === 2 && "Choose Intent"}
                          {currentStep === 3 && "Brief Details"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form Content Container */}
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
                            <Label htmlFor="name" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="e.g. John Doe"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white focus:ring-0 transition-all text-white placeholder:text-zinc-600 px-6 font-medium"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="email" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="e.g. john@company.com"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white focus:ring-0 transition-all text-white placeholder:text-zinc-600 px-6 font-medium"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <Label htmlFor="company" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">
                              Website / Company
                            </Label>
                            <Input
                              id="company"
                              name="company"
                              placeholder="e.g. yourwebsite.com"
                              value={formData.company}
                              onChange={handleChange}
                              className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white focus:ring-0 transition-all text-white placeholder:text-zinc-600 px-6 font-medium"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="phone" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">
                              Phone (Optional)
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              value={formData.phone}
                              onChange={handleChange}
                              className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white focus:ring-0 transition-all text-white placeholder:text-zinc-600 px-6 font-medium"
                            />
                          </div>
                        </div>


                        <Button
                          type="submit"
                          size="lg"
                          className="w-full h-16 bg-white text-black hover:bg-zinc-200 rounded-full font-black text-base uppercase tracking-widest transition-all active:scale-95 group"
                        >
                          Next Step
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </form>
                    </StaggeredStep>

                    {/* Step 2: Choose Action */}
                    <StaggeredStep stepNumber={2} currentStep={currentStep}>
                      <div className="mb-10" data-animate-child>
                        <button
                          onClick={goBack}
                          className="mb-6 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-black group"
                        >
                          <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                          Go Back
                        </button>
                        <h2 className="text-3xl font-bold text-white mb-2">
                          What's your intent?
                        </h2>
                        <p className="text-zinc-500 text-sm font-medium">
                          Select the option that best describes your needs
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6" data-animate-child>
                        <div
                          className="group relative p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:border-white/30 cursor-pointer transition-all duration-500 hover:-translate-y-1.5"
                          onClick={() => handleActionSelect('meeting')}
                        >
                          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                            <Calendar className="h-6 w-6" />
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2">Schedule a Call</h3>
                          <p className="text-xs text-zinc-500 leading-relaxed font-medium mb-5">
                            Let's hop on a 30-min discovery call to discuss your vision and goals.
                          </p>
                          <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors">
                            Select Option <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>

                        <div
                          className="group relative p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:border-white/30 cursor-pointer transition-all duration-500 hover:-translate-y-1.5"
                          onClick={() => handleActionSelect('hire')}
                        >
                          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                            <Rocket className="h-6 w-6" />
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2">Hire Me Now</h3>
                          <p className="text-xs text-zinc-500 leading-relaxed font-medium mb-5">
                            Ready to start? Give me a brief and let's get your project running.
                          </p>
                          <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors">
                            Select Option <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </StaggeredStep>

                    {/* Step 3: Meeting Form */}
                    {currentStep === 3 && selectedAction === 'meeting' && !isSubmitted && (
                      <StaggeredStep stepNumber={3} currentStep={currentStep}>
                        <div className="mb-10" data-animate-child>
                          <button
                            onClick={goBack}
                            className="mb-6 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-black group"
                          >
                            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                            Go Back
                          </button>
                          <h2 className="text-3xl font-bold text-white mb-2">
                            Meeting Details
                          </h2>
                          <p className="text-zinc-500 text-sm font-medium">
                            Let's find the perfect time to discuss your vision
                          </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8" data-animate-child>
                          <div className="space-y-3">
                            <Label htmlFor="meetingTopic" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Meeting Topic</Label>
                            <Input
                              id="meetingTopic"
                              name="meetingTopic"
                              placeholder="e.g. Discussing a new SaaS platform"
                              value={formData.meetingTopic}
                              onChange={handleChange}
                              required
                              className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white focus:ring-0 transition-all text-white placeholder:text-zinc-600 px-6 font-medium"
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                              <Label htmlFor="preferredDate" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Preferred Date</Label>
                              <Input
                                id="preferredDate"
                                name="preferredDate"
                                type="date"
                                value={formData.preferredDate}
                                onChange={handleChange}
                                required
                                className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white focus:ring-0 transition-all text-white px-6 font-medium invert brightness-90 contrast-150"
                                min={new Date().toISOString().split('T')[0]}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="preferredTime" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Preferred Time</Label>
                              <Input
                                id="preferredTime"
                                name="preferredTime"
                                type="time"
                                value={formData.preferredTime}
                                onChange={handleChange}
                                required
                                className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white focus:ring-0 transition-all text-white px-6 font-medium invert brightness-90 contrast-150"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3 relative group">
                              <Label className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Your Timezone</Label>
                              <div
                                className="h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between px-6 cursor-pointer hover:border-white/20 transition-all"
                                onClick={() => toggleDropdown('timezone')}
                              >
                                <span className={formData.timezone ? 'text-white' : 'text-zinc-600'}>
                                  {formData.timezone ? formData.timezone : 'Select timezone'}
                                </span>
                                <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${dropdownStates.timezone ? 'rotate-180' : ''}`} />
                              </div>
                              {dropdownStates.timezone && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                                  {["EST (UTC-5)", "CST (UTC-6)", "MST (UTC-7)", "PST (UTC-8)", "GMT (UTC+0)", "BST (UTC+6)", "Other"].map(opt => (
                                    <div
                                      key={opt}
                                      className="px-6 py-4 hover:bg-white/5 cursor-pointer text-sm text-zinc-400 hover:text-white transition-colors border-b border-white/5 last:border-0"
                                      onClick={() => selectOption('timezone', opt, 'timezone')}
                                    >
                                      {opt}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="space-y-3 relative group">
                              <Label className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Platform</Label>
                              <div
                                className="h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between px-6 cursor-pointer hover:border-white/20 transition-all"
                                onClick={() => toggleDropdown('meetingPlatform')}
                              >
                                <span className={formData.meetingPlatform ? 'text-white' : 'text-zinc-600'}>
                                  {formData.meetingPlatform ? formData.meetingPlatform : 'Select platform'}
                                </span>
                                <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${dropdownStates.meetingPlatform ? 'rotate-180' : ''}`} />
                              </div>
                              {dropdownStates.meetingPlatform && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                                  {["Zoom", "Google Meet", "Teams", "Phone Call", "Skype"].map(opt => (
                                    <div
                                      key={opt}
                                      className="px-6 py-4 hover:bg-white/5 cursor-pointer text-sm text-zinc-400 hover:text-white transition-colors border-b border-white/5 last:border-0"
                                      onClick={() => selectOption('meetingPlatform', opt, 'meetingPlatform')}
                                    >
                                      {opt}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="meetingNotes" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Additional Notes</Label>
                            <Textarea
                              id="meetingNotes"
                              name="meetingNotes"
                              placeholder="Anything else I should know?"
                              value={formData.meetingNotes}
                              onChange={handleChange}
                              rows={4}
                              className="bg-white/5 border-white/10 rounded-2xl focus:border-white focus:ring-0 transition-all text-white placeholder:text-zinc-600 p-6 font-medium resize-none min-h-[160px]"
                            />
                          </div>

                          {submitError && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider">
                              {submitError}
                            </div>
                          )}

                          <Button
                            type="submit"
                            size="lg"
                            className="w-full h-16 bg-white text-black hover:bg-zinc-200 rounded-full font-black text-base uppercase tracking-widest transition-all active:scale-95 group"
                          >
                            {isSubmitting ? "Processing..." : "Confirm Schedule"}
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </form>
                      </StaggeredStep>
                    )}

                    {/* Step 3: Project Form */}
                    {currentStep === 3 && selectedAction === 'hire' && !isSubmitted && (
                      <StaggeredStep stepNumber={3} currentStep={currentStep}>
                        <div className="mb-10" data-animate-child>
                          <button
                            onClick={goBack}
                            className="mb-6 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-black group"
                          >
                            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                            Go Back
                          </button>
                          <h2 className="text-3xl font-bold text-white mb-2">
                            Project Brief
                          </h2>
                          <p className="text-zinc-500 text-sm font-medium">
                            Tell me about the project you're building
                          </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6" data-animate-child>
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3 relative group">
                              <Label className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Project Type</Label>
                              <div
                                className="h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between px-6 cursor-pointer hover:border-white/20 transition-all font-medium text-white"
                                onClick={() => toggleDropdown('projectType')}
                              >
                                <span>{formData.projectType || 'Select type'}</span>
                                <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${dropdownStates.projectType ? 'rotate-180' : ''}`} />
                              </div>
                              {dropdownStates.projectType && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                                  {["Landing Page", "SaaS Platform", "E-commerce", "Mobile App", "Corporate Site", "Other"].map(opt => (
                                    <div
                                      key={opt}
                                      className="px-6 py-4 hover:bg-white/5 cursor-pointer text-sm text-zinc-400 hover:text-white transition-colors border-b border-white/5 last:border-0"
                                      onClick={() => selectOption('projectType', opt, 'projectType')}
                                    >
                                      {opt}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="space-y-3 relative group">
                              <Label className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Timeline</Label>
                              <div
                                className="h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between px-6 cursor-pointer hover:border-white/20 transition-all font-medium text-white"
                                onClick={() => toggleDropdown('timeline')}
                              >
                                <span>{formData.timeline || 'Select timeline'}</span>
                                <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${dropdownStates.timeline ? 'rotate-180' : ''}`} />
                              </div>
                              {dropdownStates.timeline && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                                  {["< 2 Weeks", "2-4 Weeks", "1-3 Months", "Long Term", "Flexible"].map(opt => (
                                    <div
                                      key={opt}
                                      className="px-6 py-4 hover:bg-white/5 cursor-pointer text-sm text-zinc-400 hover:text-white transition-colors border-b border-white/5 last:border-0"
                                      onClick={() => selectOption('timeline', opt, 'timeline')}
                                    >
                                      {opt}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3 relative group">
                              <Label className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Role Needed</Label>
                              <div
                                className="h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between px-6 cursor-pointer hover:border-white/20 transition-all font-medium text-white"
                                onClick={() => toggleDropdown('role')}
                              >
                                <span>{formData.role || 'Select role'}</span>
                                <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${dropdownStates.role ? 'rotate-180' : ''}`} />
                              </div>
                              {dropdownStates.role && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                                  {["Full-stack Dev", "Frontend Only", "Backend Only", "UI/UX Designer", "Consultant"].map(opt => (
                                    <div
                                      key={opt}
                                      className="px-6 py-4 hover:bg-white/5 cursor-pointer text-sm text-zinc-400 hover:text-white transition-colors border-b border-white/5 last:border-0"
                                      onClick={() => selectOption('role', opt, 'role')}
                                    >
                                      {opt}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="space-y-3 relative group">
                              <Label className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Estimated Budget</Label>
                              <div
                                className="h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between px-6 cursor-pointer hover:border-white/20 transition-all font-medium text-white"
                                onClick={() => toggleDropdown('budget')}
                              >
                                <span>{formData.budget || 'Select budget'}</span>
                                <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${dropdownStates.budget ? 'rotate-180' : ''}`} />
                              </div>
                              {dropdownStates.budget && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                                  {["$500 - $1k", "$1k - $3k", "$3k - $5k", "$5k - $10k", "$10k+"].map(opt => (
                                    <div
                                      key={opt}
                                      className="px-6 py-4 hover:bg-white/5 cursor-pointer text-sm text-zinc-400 hover:text-white transition-colors border-b border-white/5 last:border-0"
                                      onClick={() => selectOption('budget', opt, 'budget')}
                                    >
                                      {opt}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="message" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">Project Description</Label>
                            <Textarea
                              id="message"
                              name="message"
                              placeholder="Tell me more about your requirements..."
                              value={formData.message}
                              onChange={handleChange}
                              required
                              rows={6}
                              className="bg-white/5 border-white/10 rounded-2xl focus:border-white focus:ring-0 transition-all text-white placeholder:text-zinc-600 p-6 font-medium resize-none min-h-[200px]"
                            />
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
                                <p className={`text-sm font-bold uppercase tracking-tight ${formData.activateFreeDemo ? 'text-black' : 'text-white'} `}>
                                  YES! ACTIVATE MY FREE DEMO
                                </p>
                                <p className={`text-xs font-medium ${formData.activateFreeDemo ? 'text-black/60' : 'text-zinc-500'} `}>
                                  Get a custom walkthrough of how I can solve your specific problem.
                                </p>
                              </div>
                            </div>
                          </div>

                          {submitError && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider">
                              {submitError}
                            </div>
                          )}

                          <Button
                            type="submit"
                            size="lg"
                            className="w-full h-16 bg-white text-black hover:bg-zinc-200 rounded-full font-black text-base uppercase tracking-widest transition-all active:scale-95 group"
                          >
                            {isSubmitting ? "Processing..." : "Submit Project Inquiry"}
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </form>
                      </StaggeredStep>
                    )}

                    {/* Success State */}
                    {isSubmitted && (
                      <div className="py-12 flex flex-col items-center text-center max-w-lg mx-auto overflow-hidden">
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", damping: 12, stiffness: 200 }}
                          className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-8 shadow-2xl"
                        >
                          <CheckCircle2 className="h-12 w-12 text-black" />
                        </motion.div>
                        <motion.h2
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-5xl font-bold text-white mb-6 tracking-tight"
                        >
                          Message Received.
                        </motion.h2>
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-zinc-500 text-lg font-medium leading-relaxed mb-12 max-w-sm"
                        >
                          Thank you for reaching out, {formData.name}. I'll personally review your inquiry and get back to you within 24 hours.
                        </motion.p>
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.4 }}
                          className="w-full h-px bg-white/10 mb-12"
                        />
                        <div className="space-y-4 w-full">
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-6"
                          >
                            Next Steps
                          </motion.p>
                          <div className="grid gap-4">
                            {[
                              { id: "01", title: "Review", text: "Manual review of your requirements" },
                              { id: "02", title: "Connect", text: "Direct email follow-up within 24h" }
                            ].map((step, idx) => (
                              <motion.div
                                key={step.id}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.6 + (idx * 0.1) }}
                                className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 text-left flex items-center gap-6 group hover:bg-white transition-all duration-500"
                              >
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 font-black text-xs group-hover:bg-black group-hover:text-white transition-colors">{step.id}</div>
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 group-hover:text-black/50 transition-colors">{step.title}</p>
                                  <p className="text-sm font-bold text-white group-hover:text-black transition-colors">{step.text}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          <Button
                            onClick={() => window.location.reload()}
                            className="mt-12 h-14 px-10 bg-white text-black hover:bg-zinc-200 rounded-full font-black uppercase tracking-widest transition-all active:scale-95"
                          >
                            Back Home
                          </Button>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-8">
                {/* Contact Info Card */}
                <Card className="p-10 bg-zinc-950/50 backdrop-blur-xl border-white/10 rounded-[2rem] scroll-animate relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 blur-3xl rounded-full" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-8">Connect</h3>
                  <div className="space-y-8">
                    <div className="flex items-center gap-5 group/item">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/item:bg-white group-hover/item:text-black transition-all duration-500">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-0.5">Email</p>
                        <p className="text-sm font-bold text-white tracking-tight">famimfarhaz@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 group/item">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/item:bg-white group-hover/item:text-black transition-all duration-500">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-0.5">Direct</p>
                        <p className="text-sm font-bold text-white tracking-tight">+880 1843 728903</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 group/item">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/item:bg-white group-hover/item:text-black transition-all duration-500">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-0.5">Base</p>
                        <p className="text-sm font-bold text-white tracking-tight">Global / Remote</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Status Badge */}
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
