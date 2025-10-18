"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Image from "next/image"

const technologies = [
  {
    name: "TypeScript",
    description: "Type-safe development",
    color: "from-blue-500 to-blue-600",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    description: "Dynamic functionality",
    color: "from-yellow-400 to-yellow-500",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "React 18",
    description: "Modern UI framework",
    color: "from-cyan-400 to-cyan-500",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first styling",
    color: "from-teal-400 to-cyan-500",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Next.js",
    description: "React framework for production",
    color: "from-gray-800 to-gray-900",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Python",
    description: "Versatile backend language",
    color: "from-blue-400 to-yellow-400",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    name: "PHP",
    description: "Server-side scripting",
    color: "from-purple-600 to-indigo-600",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  },
  {
    name: "PostgreSQL",
    description: "Advanced open source database",
    color: "from-blue-600 to-blue-800",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  },
]

export function TechStack() {
  const sectionRef = useScrollAnimation()

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 scroll-animate">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">My Technology Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built with <span className="text-primary">Modern Tools</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I leverage cutting-edge technologies to deliver high-performance, scalable solutions
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {technologies.map((tech, index) => (
            <div key={tech.name} className="scroll-animate group relative">
              <div className="relative h-full p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                />

                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tech.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-full h-full rounded-xl bg-background flex items-center justify-center p-3">
                      <Image
                        src={tech.logo || "/placeholder.svg"}
                        alt={`${tech.name} logo`}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{tech.name}</h3>
                <p className="text-muted-foreground text-sm">{tech.description}</p>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="scroll-animate grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">8+</div>
            <div className="text-sm text-muted-foreground">Core Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Type Safety</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">Fast</div>
            <div className="text-sm text-muted-foreground">Build Times</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">Modern</div>
            <div className="text-sm text-muted-foreground">Best Practices</div>
          </div>
        </div>
      </div>
    </section>
  )
}
