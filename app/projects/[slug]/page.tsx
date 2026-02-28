"use client"

import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
    ExternalLink,
    Github,
    ArrowLeft,
    BarChart3,
    Globe,
    Layout,
    Cpu,
    Smartphone,
    Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { projectsData } from "@/lib/projects-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function ProjectDetailsPage() {
    const params = useParams()
    const slug = params?.slug as string
    const project = projectsData.find(p => p.slug === slug)
    const containerRef = useScrollAnimation()

    if (!project) {
        notFound()
    }

    const whyChooseUs = [
        {
            title: "Impact-Driven",
            description: "Solutions built to solve real business problems and deliver measurable results.",
            icon: <BarChart3 className="w-5 h-5" />
        },
        {
            title: "Future-Proof",
            description: "Latest industry standards ensuring your project is fast, secure, and scalable.",
            icon: <Cpu className="w-5 h-5" />
        },
        {
            title: "Reliable",
            description: "Constant communication to ensure the final product exceeds expectations.",
            icon: <Check className="w-5 h-5" />
        }
    ]

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-primary selection:text-primary-foreground selection:bg-white selection:text-black">
            <Header />

            <main ref={containerRef} className="pt-32 pb-24 relative overflow-hidden">
                {/* Simple, single accent glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 lg:px-8">

                    {/* HEADER & HERO */}
                    <section className="space-y-16">
                        <Link href="/projects" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-widest">Back to Projects</span>
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <Badge variant="outline" className="h-6 px-3 rounded-full border-zinc-800 bg-zinc-900/50 text-zinc-500 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                                        {project.category === 'real' ? 'Real-World Case Study' : 'Development Practice'}
                                    </Badge>
                                    <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
                                        {project.title}
                                    </h1>
                                </div>

                                <p className="text-lg text-zinc-400 leading-relaxed max-w-lg">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-4 pt-2">
                                    <Button
                                        onClick={() => project.liveUrl !== '#' && window.open(project.liveUrl, '_blank')}
                                        disabled={project.liveUrl === '#'}
                                        className="h-12 px-8 rounded-full bg-white text-black hover:bg-zinc-200 font-bold transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        View Project Live
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </Button>
                                    {project.githubUrl !== '#' && (
                                        <Button
                                            onClick={() => window.open(project.githubUrl, '_blank')}
                                            variant="ghost"
                                            className="h-12 px-6 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 font-bold transition-all"
                                        >
                                            Source Code
                                            <Github className="w-4 h-4 ml-2" />
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 bg-zinc-900 group">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            </div>
                        </div>
                    </section>

                    {/* PROJECT INFO GRID */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 my-24 border-y border-white/5">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Year</span>
                            <p className="text-lg font-bold text-white">{project.timeline}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Role</span>
                            <p className="text-lg font-bold text-white">{project.role}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Category</span>
                            <p className="text-lg font-bold text-white capitalize">{project.category}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Client</span>
                            <p className="text-lg font-bold text-white">Confidential</p>
                        </div>
                    </section>

                    {/* THE STORY */}
                    <section className="max-w-3xl space-y-8">
                        <h2 className="text-3xl font-black text-white tracking-tight">Project Overview</h2>
                        <div className="prose prose-invert prose-zinc max-w-none">
                            {project.about.split('\n\n').map((para, i) => (
                                <p key={i} className="text-lg text-zinc-400 leading-relaxed mb-6 italic-none">
                                    {para}
                                </p>
                            ))}
                        </div>

                        <div className="pt-8 space-y-4">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, i) => (
                                    <Badge key={i} variant="secondary" className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* GALLERY */}
                    {project.gallery && project.gallery.length > 0 && (
                        <section className="space-y-12 mt-32">
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Showcase</span>
                                <h2 className="text-3xl font-black text-white tracking-tight">Interface Design</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {project.gallery.map((item, i) => (
                                    <div key={i} className="space-y-4 group">
                                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-zinc-900">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="px-2">
                                            <h4 className="font-bold text-white">{item.title}</h4>
                                            <p className="text-sm text-zinc-500">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* WHY HIRE - Minimalist Block */}
                    <section className="mt-40 p-12 md:p-16 rounded-[2rem] bg-zinc-900/50 border border-white/5 relative overflow-hidden">
                        <div className="max-w-4xl mx-auto space-y-16 relative z-10">
                            <div className="space-y-4 text-center">
                                <h2 className="text-4xl font-black text-white tracking-tight">Refined Solutions.</h2>
                                <p className="text-lg text-zinc-500 max-w-xl mx-auto">Focused on bringing value to every project through clean code and simple, effective design.</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-12">
                                {whyChooseUs.map((benefit, i) => (
                                    <div key={i} className="space-y-4 text-center md:text-left">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-primary mx-auto md:mx-0">
                                            {benefit.icon}
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-white text-lg">{benefit.title}</h4>
                                            <p className="text-sm text-zinc-500 leading-relaxed font-normal">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 text-center border-t border-white/5">
                                <Link href="/contact" className="inline-block group">
                                    <div className="flex items-center gap-4 text-white font-bold text-xl group-hover:text-primary transition-colors">
                                        Let's start your project
                                        <ArrowLeft className="w-6 h-6 rotate-180 transition-transform group-hover:translate-x-2" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>
            </main>

            <Footer />
        </div>
    )
}
