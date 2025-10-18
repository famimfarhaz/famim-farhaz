"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, ArrowLeft, Mail, Phone, MapPin, CheckCircle2, Clock, DollarSign, Briefcase, Calendar, Rocket, User, Building, Info, ChevronDown } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { StaggeredStep } from "@/components/ui/step-transition"
import { submitContactForm } from "@/lib/contact-service"

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
    meetingPlatform: false
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

  // Custom dropdown component
  const CustomDropdown = ({ 
    label, 
    value, 
    placeholder, 
    options, 
    field, 
    dropdownName, 
    required = false 
  }: {
    label: string
    value: string
    placeholder: string
    options: { value: string, label: string }[]
    field: string
    dropdownName: keyof typeof dropdownStates
    required?: boolean
  }) => (
    <div className="space-y-2 relative">
      <Label>{label} {required && '*'}</Label>
      <div className="relative">
        <div
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer flex items-center justify-between transition-all hover:border-accent/50"
          onClick={() => toggleDropdown(dropdownName)}
        >
          <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
            {value ? options.find(opt => opt.value === value)?.label : placeholder}
          </span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            dropdownStates[dropdownName] ? 'rotate-180' : ''
          }`} />
        </div>
        
        {dropdownStates[dropdownName] && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((option) => (
              <div
                key={option.value}
                className="px-3 py-2 hover:bg-accent/10 cursor-pointer text-sm transition-colors border-b border-border/50 last:border-b-0"
                onClick={() => selectOption(field, option.value, dropdownName)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

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
        
        /* Success Animation */
        @keyframes successBounce {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
          100% { transform: scale(1) rotate(360deg); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .success-icon {
          animation: successBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
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

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16 scroll-animate">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6">
              <CheckCircle2 className="h-4 w-4" />
              Available for New Projects
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Let's Build Something <span className="text-accent">Amazing</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to bring your project to life? Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2 scroll-animate">
              <Card className="p-8 lg:p-10 bg-card border-border shadow-xl">
                {/* Progress Indicator */}
                <div className="flex items-center mb-8">
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300 ${
                      currentStep >= 1 ? 'bg-accent text-accent-foreground step-glow' : 'bg-muted text-muted-foreground'
                    }`}>
                      {currentStep >= 1 ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        '1'
                      )}
                    </div>
                    <div className={`h-px w-16 transition-all duration-500 relative overflow-hidden ${
                      currentStep >= 2 ? 'bg-accent' : 'bg-border'
                    }`}>
                      {currentStep >= 2 && (
                        <div className="absolute top-0 left-0 h-full bg-accent progress-fill" />
                      )}
                    </div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300 ${
                      currentStep >= 2 ? 'bg-accent text-accent-foreground step-glow' : 'bg-muted text-muted-foreground'
                    } ${currentStep === 2 ? 'animate-pulse' : ''}`}>
                      {currentStep >= 2 ? (
                        currentStep > 2 ? <CheckCircle2 className="h-4 w-4" /> : '2'
                      ) : (
                        '2'
                      )}
                    </div>
                    <div className={`h-px w-16 transition-all duration-500 relative overflow-hidden ${
                      currentStep >= 3 ? 'bg-accent' : 'bg-border'
                    }`}>
                      {currentStep >= 3 && (
                        <div className="absolute top-0 left-0 h-full bg-accent progress-fill" />
                      )}
                    </div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300 ${
                      currentStep >= 3 ? 'bg-accent text-accent-foreground step-glow' : 'bg-muted text-muted-foreground'
                    } ${currentStep === 3 ? 'animate-pulse' : ''}`}>
                      {currentStep >= 3 ? (
                        '3'
                      ) : (
                        '3'
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">
                      Step {currentStep} of 3
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {currentStep === 1 && "Basic Information"}
                      {currentStep === 2 && "Choose Action"}
                      {currentStep === 3 && "Project Details"}
                    </p>
                  </div>
                </div>

                {/* Form Content Container */}
                <div className="relative min-h-[500px]">
                  {/* Step 1: Basic Information */}
                  <StaggeredStep stepNumber={1} currentStep={currentStep} className={isStepTransitioning && previousStep < currentStep ? 'step-exit' : isStepTransitioning && previousStep > currentStep ? 'step-exit-reverse' : !isStepTransitioning && currentStep === 1 ? currentStep > previousStep ? 'step-enter' : 'step-enter-reverse' : ''}>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" data-animate-child>
                      <User className="h-6 w-6 text-accent" />
                      Tell Me About Yourself
                    </h2>
                    <form onSubmit={handleBasicInfoSubmit} className="space-y-6" data-animate-child>
                      <div className="grid md:grid-cols-2 gap-6" data-animate-child>
                        <div className="space-y-2">
                          <Label htmlFor="name" className="flex items-center gap-2">
                            Full Name *
                            <Info className="h-3 w-3 text-muted-foreground" />
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-background border-border transition-all focus:border-accent hover:form-field-focus"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            Email Address *
                            <Info className="h-3 w-3 text-muted-foreground" />
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-background border-border transition-all focus:border-accent hover:form-field-focus"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6" data-animate-child>
                        <div className="space-y-2">
                          <Label htmlFor="company" className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Company / Organization
                          </Label>
                          <Input
                            id="company"
                            name="company"
                            placeholder="Your Company"
                            value={formData.company}
                            onChange={handleChange}
                            className="bg-background border-border transition-all focus:border-accent hover:form-field-focus"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={handleChange}
                            className="bg-background border-border transition-all focus:border-accent hover:form-field-focus"
                          />
                        </div>
                      </div>

                      {/* FREE Demo Offer */}
                      <div className="p-4 rounded-lg bg-card/50 border border-accent/30 relative" data-animate-child>
                        <div className="flex items-start gap-3">
                          {/* Custom Checkbox */}
                          <div 
                            className={`w-5 h-5 rounded-md border-2 transition-all duration-200 cursor-pointer mt-0.5 flex items-center justify-center hover:scale-110 ${
                              formData.activateFreeDemo 
                                ? 'bg-accent border-accent shadow-lg shadow-accent/25' 
                                : 'border-border hover:border-accent/50 bg-background'
                            }`}
                            onClick={() => setFormData({...formData, activateFreeDemo: !formData.activateFreeDemo})}
                          >
                            {formData.activateFreeDemo && (
                              <CheckCircle2 className="w-3 h-3 text-accent-foreground" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <label 
                              className="cursor-pointer" 
                              onClick={() => setFormData({...formData, activateFreeDemo: !formData.activateFreeDemo})}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-foreground">
                                  Activate Your FREE Demo
                                </span>
                                <span className="px-2 py-0.5 text-xs font-medium bg-accent/20 text-accent rounded-md animate-pulse">
                                  Limited Offer
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                Get exclusive access to a personalized demo showcasing how I can transform your project ideas into reality.
                              </p>
                            </label>
                            
                            {formData.activateFreeDemo && (
                              <div className="mt-2 p-2 rounded-md bg-accent/5 border border-accent/20 fade-in-up">
                                <p className="text-xs text-accent font-medium">
                                  Perfect! You'll receive priority access to our exclusive demo session.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 transition-all group" data-animate-child
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </form>
                  </StaggeredStep>

                  {/* Step 2: Choose Action */}
                  <StaggeredStep stepNumber={2} currentStep={currentStep}>
                    <div className="mb-6" data-animate-child>
                      <Button
                        variant="ghost"
                        onClick={goBack}
                        className="mb-4 text-muted-foreground hover:text-black hover:bg-white hover:scale-105 transition-all"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <h2 className="text-2xl font-bold mb-2">
                        How would you like to proceed?
                      </h2>
                      <p className="text-muted-foreground">
                        Choose the option that best fits your needs
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6" data-animate-child>
                      <Card 
                        className="p-6 cursor-pointer border-2 border-border hover:border-accent/50 hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group"
                        onClick={() => handleActionSelect('meeting')}
                      >
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                            <Calendar className="h-8 w-8 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">Schedule a Discovery Call</h3>
                            <p className="text-sm text-muted-foreground">
                              Let's discuss your project and explore the best approach together.
                            </p>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>• Free 30-minute consultation</p>
                            <p>• Flexible scheduling</p>
                            <p>• No commitment required</p>
                          </div>
                        </div>
                      </Card>

                      <Card 
                        className="p-6 cursor-pointer border-2 border-border hover:border-accent/50 hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group"
                        onClick={() => handleActionSelect('hire')}
                      >
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 group-hover:scale-110 transition-all duration-300">
                            <Rocket className="h-8 w-8 text-green-500" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">Start My Project</h3>
                            <p className="text-sm text-muted-foreground">
                              Ready to begin? Let's get your project started with a detailed plan.
                            </p>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>• Fast project kickoff</p>
                            <p>• Detailed proposal</p>
                            <p>• Priority support</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </StaggeredStep>

                  {/* Step 3: Meeting Form */}
                  {currentStep === 3 && selectedAction === 'meeting' && !isSubmitted && (
                    <StaggeredStep stepNumber={3} currentStep={currentStep}>
                      <div className="mb-6" data-animate-child>
                        <Button
                          variant="ghost"
                          onClick={goBack}
                          className="mb-4 text-muted-foreground hover:text-black hover:bg-white hover:scale-105 transition-all"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                          <Calendar className="h-6 w-6 text-accent" />
                          Schedule Your Discovery Call
                        </h2>
                        <p className="text-muted-foreground">
                          Let's find the perfect time to discuss your project
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6" data-animate-child>
                        <div className="space-y-2" data-animate-child>
                          <Label htmlFor="meetingTopic">Meeting Topic *</Label>
                          <Input
                            id="meetingTopic"
                            name="meetingTopic"
                            placeholder="Brief description of what you'd like to discuss"
                            value={formData.meetingTopic}
                            onChange={handleChange}
                            required
                            className="bg-background border-border hover:form-field-focus transition-all focus:border-accent"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6" data-animate-child>
                          <div className="space-y-2">
                            <Label htmlFor="preferredDate">Preferred Date *</Label>
                            <Input
                              id="preferredDate"
                              name="preferredDate"
                              type="date"
                              value={formData.preferredDate}
                              onChange={handleChange}
                              required
                              className="bg-background border-border hover:form-field-focus transition-all focus:border-accent"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="preferredTime">Preferred Time *</Label>
                            <Input
                              id="preferredTime"
                              name="preferredTime"
                              type="time"
                              value={formData.preferredTime}
                              onChange={handleChange}
                              required
                              className="bg-background border-border hover:form-field-focus transition-all focus:border-accent"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6" data-animate-child>
                          <CustomDropdown
                            label="Your Timezone"
                            value={formData.timezone}
                            placeholder="Select your timezone"
                            options={[
                              { value: "UTC-5", label: "EST (UTC-5)" },
                              { value: "UTC-6", label: "CST (UTC-6)" },
                              { value: "UTC-7", label: "MST (UTC-7)" },
                              { value: "UTC-8", label: "PST (UTC-8)" },
                              { value: "UTC+0", label: "GMT (UTC+0)" },
                              { value: "UTC+6", label: "BST (UTC+6)" },
                              { value: "other", label: "Other" }
                            ]}
                            field="timezone"
                            dropdownName="timezone"
                            required
                          />
                          <CustomDropdown
                            label="Meeting Platform"
                            value={formData.meetingPlatform}
                            placeholder="Select platform"
                            options={[
                              { value: "zoom", label: "Zoom" },
                              { value: "google-meet", label: "Google Meet" },
                              { value: "teams", label: "Microsoft Teams" },
                              { value: "phone", label: "Phone Call" },
                              { value: "skype", label: "Skype" }
                            ]}
                            field="meetingPlatform"
                            dropdownName="meetingPlatform"
                            required
                          />
                        </div>

                        {/* Custom Timezone Input - Only show when "Other" is selected */}
                        {formData.timezone === 'other' && (
                          <div className="space-y-2 fade-in-up" data-animate-child>
                            <Label htmlFor="customTimezone">Please specify your timezone *</Label>
                            <Input
                              id="customTimezone"
                              name="customTimezone"
                              placeholder="e.g., IST (UTC+5:30), JST (UTC+9), etc."
                              value={formData.customTimezone}
                              onChange={handleChange}
                              required
                              className="bg-background border-border hover:form-field-focus transition-all focus:border-accent"
                            />
                            <p className="text-xs text-muted-foreground">
                              Please include your timezone abbreviation and UTC offset (e.g., PST UTC-8)
                            </p>
                          </div>
                        )}

                        <div className="space-y-2" data-animate-child>
                          <Label htmlFor="meetingNotes">Additional Notes</Label>
                          <Textarea
                            id="meetingNotes"
                            name="meetingNotes"
                            placeholder="Any specific topics you'd like to cover or questions you have..."
                            value={formData.meetingNotes}
                            onChange={handleChange}
                            rows={4}
                            className="bg-background border-border hover:form-field-focus resize-none transition-all focus:border-accent"
                          />
                        </div>

                        {/* Error Message */}
                        {submitError && (
                          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm" data-animate-child>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                              </div>
                              {submitError}
                            </div>
                          </div>
                        )}

                        {/* Success Message */}
                        {submitSuccess && (
                          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm" data-animate-child>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              {submitSuccess}
                            </div>
                          </div>
                        )}

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
                          data-animate-child
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full spinner mr-2" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Discovery Call
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </Button>
                      </form>
                    </StaggeredStep>
                  )}

                {/* Success Confirmation */}
                {isSubmitted && (
                  <>
                    <div className="text-center py-12 fade-in-up">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                        <CheckCircle2 className="h-12 w-12 text-green-500 success-icon" />
                      </div>
                      <h2 className="text-3xl font-bold mb-4 text-green-500">
                        Thank you, {formData.name}!
                      </h2>
                      <p className="text-lg text-muted-foreground mb-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
                        I have received your inquiry. You will hear from me within 24 hours.
                      </p>
                      <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20 max-w-md mx-auto fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="flex items-center gap-3 justify-center">
                          <div className="h-3 w-3 rounded-full bg-green-500 pulse-animation" />
                          <p className="text-sm font-medium text-green-600">
                            {selectedAction === 'meeting' ? 'Meeting request received' : 'Project inquiry received'}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          You'll receive a confirmation email shortly
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          setIsSubmitted(false)
                          setCurrentStep(1)
                          setSelectedAction(null)
                          setSubmitError(null)
                          setSubmitSuccess(null)
                          setFormData({
                            name: "",
                            email: "",
                            company: "",
                            phone: "",
                            activateFreeDemo: false,
                            meetingTopic: "",
                            preferredDate: "",
                            preferredTime: "",
                            timezone: "",
                            customTimezone: "",
                            meetingPlatform: "",
                            meetingNotes: "",
                            projectType: "",
                            customProjectType: "",
                            role: "",
                            budget: "",
                            timeline: "",
                            message: "",
                          })
                        }}
                        variant="outline"
                        className="mt-6 fade-in-up"
                        style={{ animationDelay: '0.6s' }}
                      >
                        Submit Another Inquiry
                      </Button>
                    </div>
                  </>
                )}

                  {/* Step 3: Hire Form */}
                  {currentStep === 3 && selectedAction === 'hire' && !isSubmitted && (
                    <StaggeredStep stepNumber={3} currentStep={currentStep}>
                      <div className="mb-6" data-animate-child>
                        <Button
                          variant="ghost"
                          onClick={goBack}
                          className="mb-4 text-muted-foreground hover:text-black hover:bg-white hover:scale-105 transition-all"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                          <Rocket className="h-6 w-6 text-accent" />
                          Let's Start Your Project
                        </h2>
                        <p className="text-muted-foreground">
                          Tell me about your project requirements and timeline
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6" data-animate-child>
                        <div className="grid md:grid-cols-2 gap-6" data-animate-child>
                          <CustomDropdown
                            label="Project Type"
                            value={formData.projectType}
                            placeholder="Select project type"
                            options={[
                              { value: "landing-page", label: "Landing Page" },
                              { value: "portfolio", label: "Portfolio Website" },
                              { value: "ecommerce", label: "E-commerce Store" },
                              { value: "web-app", label: "Web Application" },
                              { value: "agency-website", label: "Agency Website" },
                              { value: "blog", label: "Blog/Content Site" },
                              { value: "other", label: "Other" }
                            ]}
                            field="projectType"
                            dropdownName="projectType"
                            required
                          />
                          <CustomDropdown
                            label="My Role"
                            value={formData.role}
                            placeholder="Select role needed"
                            options={[
                              { value: "frontend", label: "Frontend Developer" },
                              { value: "backend", label: "Backend Developer" },
                              { value: "fullstack", label: "Full Stack Developer" },
                              { value: "consultant", label: "Technical Consultant" }
                            ]}
                            field="role"
                            dropdownName="role"
                            required
                          />
                        </div>

                        {/* Custom Project Type Input - Only show when "Other" is selected */}
                        {formData.projectType === 'other' && (
                          <div className="space-y-2 fade-in-up" data-animate-child>
                            <Label htmlFor="customProjectType">Please specify your project type *</Label>
                            <Input
                              id="customProjectType"
                              name="customProjectType"
                              placeholder="e.g., Dashboard, API Integration, Mobile App, etc."
                              value={formData.customProjectType}
                              onChange={handleChange}
                              required
                              className="bg-background border-border hover:form-field-focus transition-all focus:border-accent"
                            />
                            <p className="text-xs text-muted-foreground">
                              Please describe the type of project you have in mind
                            </p>
                          </div>
                        )}

                        <div className="space-y-2" data-animate-child>
                          <Label htmlFor="message">Project Description *</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Describe your project scope, goals, features needed, target audience, and any specific requirements..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="bg-background border-border hover:form-field-focus resize-none transition-all focus:border-accent"
                          />
                        </div>

                        <div data-animate-child>
                          <CustomDropdown
                            label="Timeline"
                            value={formData.timeline}
                            placeholder="Select timeline"
                            options={[
                              { value: "1-week", label: "1 Week" },
                              { value: "2-weeks", label: "2 Weeks" },
                              { value: "1-month", label: "1 Month" },
                              { value: "2-months", label: "2 Months" },
                              { value: "3-months", label: "3+ Months" },
                              { value: "flexible", label: "Flexible" }
                            ]}
                            field="timeline"
                            dropdownName="timeline"
                            required
                          />
                        </div>

                        {/* Error Message */}
                        {submitError && (
                          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm" data-animate-child>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                              </div>
                              {submitError}
                            </div>
                          </div>
                        )}

                        {/* Success Message */}
                        {submitSuccess && (
                          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm" data-animate-child>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              {submitSuccess}
                            </div>
                          </div>
                        )}

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
                          data-animate-child
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full spinner mr-2" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Rocket className="mr-2 h-4 w-4" />
                              Start My Project
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </Button>
                      </form>
                    </StaggeredStep>
                  )}
                </div>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Contact Info Card */}
              <Card className="p-6 bg-card border-border scroll-animate">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">famimfarhaz@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium">+8801843728903</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">Available Worldwide</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* What to Expect Card */}
              <Card className="p-6 bg-card border-border scroll-animate">
                <h3 className="text-lg font-semibold mb-4">What to Expect</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Quick Response</p>
                      <p className="text-xs text-muted-foreground">Reply within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Free Consultation</p>
                      <p className="text-xs text-muted-foreground">30-min discovery call</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Custom Proposal</p>
                      <p className="text-xs text-muted-foreground">Detailed quote & timeline</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Flexible Schedule</p>
                      <p className="text-xs text-muted-foreground">Work with your timezone</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Availability Badge */}
              <Card className="p-6 bg-gradient-to-br from-accent/10 to-card border-accent/30 scroll-animate">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-sm font-semibold text-accent">Currently Available</p>
                </div>
                <p className="text-xs text-muted-foreground">Accepting new projects for Q2 2025</p>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      </div>
    </>
  )
}
