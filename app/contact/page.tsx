"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

function ContactContent() {
  const sectionRef = useScrollAnimation()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const userAgent = typeof window !== "undefined" ? navigator.userAgent : "unknown"
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || undefined,
          phone: formData.phone || undefined,
          message: formData.message,
          userAgent,
        }),
      })

      const data = await response.json()
      if (response.ok && data.success) {
        setIsSubmitted(true)
      } else {
        setSubmitError(data.message || "Something went wrong. Please try again.")
      }
    } catch {
      setSubmitError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div ref={sectionRef} className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-6 lg:px-8">
            {/* Hero Section */}
            <div className="max-w-2xl mx-auto text-center mb-16 scroll-animate">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-4 text-balance text-white">
                Get In <span className="text-zinc-500">Touch</span>
              </h1>
              <p className="text-base text-zinc-500 leading-relaxed max-w-lg mx-auto font-medium">
                Have a question, an idea, or simply want to connect? I read every message and respond within 24 hours.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="lg:col-span-2 scroll-animate">
                <Card className="p-8 lg:p-12 bg-zinc-950/50 backdrop-blur-xl border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">Send a Message</h2>
                        <p className="text-sm text-zinc-500 font-medium">All fields marked * are required.</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">
                            Full Name <span className="text-white/40">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="e.g. Sarah Johnson"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white/40 focus:ring-0 transition-all text-white placeholder:text-zinc-600 px-5 font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">
                            Email Address <span className="text-white/40">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="e.g. sarah@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white/40 focus:ring-0 transition-all text-white placeholder:text-zinc-600 px-5 font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">
                            Company / Organisation
                          </Label>
                          <Input
                            id="company"
                            name="company"
                            placeholder="e.g. Acme Inc. (optional)"
                            value={formData.company}
                            onChange={handleChange}
                            className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white/40 focus:ring-0 transition-all text-white placeholder:text-zinc-600 px-5 font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000 (optional)"
                            value={formData.phone}
                            onChange={handleChange}
                            className="h-12 bg-white/5 border-white/10 rounded-2xl focus:border-white/40 focus:ring-0 transition-all text-white placeholder:text-zinc-600 px-5 font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-zinc-400 text-xs font-black uppercase tracking-widest pl-1">
                          Message <span className="text-white/40">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Share what's on your mind — a project idea, a question, or just a hello."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="bg-white/5 border-white/10 rounded-2xl focus:border-white/40 focus:ring-0 transition-all text-white placeholder:text-zinc-600 p-5 font-medium resize-none min-h-[180px]"
                        />
                      </div>

                      {submitError && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                          {submitError}
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-white text-black hover:bg-zinc-200 rounded-full font-black text-sm uppercase tracking-widest transition-all active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Sending…" : "Send Message"}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </form>
                  ) : (
                    <div className="py-12 flex flex-col items-center text-center max-w-lg mx-auto">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-8 shadow-2xl"
                      >
                        <CheckCircle2 className="h-10 w-10 text-black" />
                      </motion.div>
                      <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold text-white mb-4 tracking-tight"
                      >
                        Message Received.
                      </motion.h2>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-500 text-base font-medium leading-relaxed mb-10 max-w-sm"
                      >
                        Thank you, {formData.name}. I will review your message and respond within 24 hours.
                      </motion.p>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Button
                          onClick={() => window.location.reload()}
                          className="h-12 px-8 bg-white text-black hover:bg-zinc-200 rounded-full font-black uppercase tracking-widest transition-all active:scale-95 text-sm"
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <Card className="p-8 bg-zinc-950/50 backdrop-blur-xl border-white/10 rounded-[2rem] scroll-animate relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 blur-3xl rounded-full" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-8">Contact</h3>
                  <div className="space-y-7">
                    <div className="flex items-center gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-0.5">Email</p>
                        <p className="text-sm font-semibold text-white">famimfarhaz@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-0.5">Phone</p>
                        <p className="text-sm font-semibold text-white">+880 1843 728903</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-0.5">Location</p>
                        <p className="text-sm font-semibold text-white">Global / Remote</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="p-8 rounded-[2rem] bg-white text-black scroll-animate relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-black/[0.04] rounded-bl-[4rem]" />
                  <div className="flex items-center gap-2 mb-3 relative z-10">
                    <div className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
                    <p className="text-[9px] font-black uppercase tracking-[0.2em]">Currently Active</p>
                  </div>
                  <h4 className="text-lg font-bold leading-snug mb-2 tracking-tight relative z-10">
                    Accepting new projects for Q2 2026
                  </h4>
                  <p className="text-xs font-medium opacity-50 relative z-10">Response guaranteed within 24 hours.</p>
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
