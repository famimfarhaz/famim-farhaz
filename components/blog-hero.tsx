"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { Home, Zap, Command, Circle } from "lucide-react"
import Image from "next/image"

const images = [
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    size: "w-56 h-80",
    x: "5%",
    y: "15%",
    rotate: -15,
    blur: "blur-subtle",
    depth: 1.4,
    zIndex: 30,
    radius: "rounded-tl-[6rem] rounded-br-[3rem]"
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    size: "w-72 h-96",
    x: "45%",
    y: "-5%",
    rotate: 10,
    blur: "none",
    depth: 0.6,
    zIndex: 10,
    radius: "rounded-[4rem]"
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    size: "w-64 h-[28rem]",
    x: "75%",
    y: "25%",
    rotate: -8,
    blur: "blur-subtle",
    depth: 1.8,
    zIndex: 40,
    radius: "rounded-tr-[5rem] rounded-bl-[2rem]"
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    size: "w-48 h-64",
    x: "15%",
    y: "60%",
    rotate: 20,
    blur: "blur-medium",
    depth: 0.9,
    zIndex: 5,
    radius: "rounded-full"
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    size: "w-80 h-56",
    x: "55%",
    y: "65%",
    rotate: -5,
    blur: "none",
    depth: 0.4,
    zIndex: 15,
    radius: "rounded-3xl"
  }
]

export function BlogHero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Heavier, elastic spring for a more "physical" feel
  const springConfig = { damping: 40, stiffness: 100 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    const x = (clientX / window.innerWidth - 0.5) * 60
    const y = (clientY / window.innerHeight - 0.5) * 60
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="pt-48 pb-40 px-6 relative overflow-hidden bg-zinc-950 min-h-screen flex flex-col justify-center noise-bg"
    >
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Asymmetrical Gradient Overlays */}
      <div className="absolute -top-[10%] -left-[10%] w-[800px] h-[800px] bg-white/[0.02] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[-5%] w-[600px] h-[600px] bg-white/[0.015] blur-[120px] rounded-full pointer-events-none" />

      {/* Floating Side Label (Vertical) */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 h-full py-20 pointer-events-none hidden xl:flex flex-col justify-between items-center opacity-20">
        <span className="text-[9px] font-black uppercase tracking-[0.8em] [writing-mode:vertical-lr] rotate-180 text-white">Public Archive</span>
        <div className="w-[1px] h-32 bg-white/20" />
        <span className="text-[9px] font-black uppercase tracking-[0.8em] [writing-mode:vertical-lr] text-white">Edition // 01</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Editorial Headline Content */}
          <div className="lg:col-span-12 space-y-16">
            
            {/* Hand-crafted Label Row */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <Circle className="w-2 h-2 fill-white animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Live Perspectives</span>
              </div>
              <div className="text-[10px] font-mono text-zinc-600 tracking-wider">
                [ LAT // 40.7128 ] [ LON // -74.0060 ]
              </div>
            </motion.div>

            <div className="relative">
              {/* Main Headline with Staggered Verticality */}
              <div className="flex flex-col gap-2">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.8] mb-2">
                    Insights,
                  </h1>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-8 self-end lg:mr-20"
                >
                  <div className="h-px w-20 md:w-40 bg-white/20 hidden md:block" />
                  <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.8]">
                    Ideas &
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="text-7xl md:text-9xl font-thin tracking-tighter text-zinc-500 italic leading-[0.8] mt-2">
                    Innovation
                  </h1>
                </motion.div>
              </div>

              {/* Editorial Description Text Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="absolute -bottom-24 left-0 lg:left-1/3 max-w-sm hidden md:block border-l border-white/20 pl-8"
              >
                <p className="text-sm font-medium leading-relaxed text-zinc-400">
                  Transcending the ordinary through a meticulous convergence of code, culture, and creative foresight. Our blog is a curated record of this ongoing technical evolution.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bokeh Composite Image Gallery */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block overflow-visible scale-110">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7, rotate: img.rotate }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: img.rotate,
                x: useTransform(springX, (v) => v * img.depth),
                y: useTransform(springY, (v) => v * img.depth)
              }}
              transition={{ 
                duration: 2, 
                delay: 0.5 + (i * 0.1),
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                top: img.y,
                left: img.x,
                zIndex: img.zIndex
              }}
              className={`absolute ${img.size} ${img.radius} overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] transition-all duration-700`}
            >
              <div className={`absolute inset-0 ${img.blur} bg-zinc-950/10 z-10`} />
              <Image
                src={img.src}
                alt={`Studio Image ${i}`}
                fill
                className="object-cover opacity-80"
              />
              
              {/* Technical Ornament on sharp images */}
              {img.blur === "none" && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">SRC // {i}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Hand-crafted Footer UI Labels */}
      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-8 pointer-events-none">
        <div className="space-y-1">
          <div className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Status</div>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
             <span className="text-[10px] font-bold text-white uppercase tracking-wider">System Operational</span>
          </div>
        </div>
        
        <div className="flex gap-12">
          <div className="text-right">
            <div className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Coordinates</div>
            <div className="text-[10px] font-bold text-white uppercase tracking-widest tabular-nums">NW // 40-74</div>
          </div>
          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-[1px] h-10 bg-gradient-to-b from-white/20 to-transparent" />
            <Command className="w-4 h-4 text-white/20" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
