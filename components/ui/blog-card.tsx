"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { BlogPost } from "@/lib/blog-data"

interface BlogCardProps {
  post: BlogPost
  index: number
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="space-y-6 block">
        {/* Meta Header */}
        <div className="flex items-center gap-2 text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
          <Calendar className="w-4 h-4" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{post.date}</span>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-2xl font-black text-white tracking-tight leading-snug group-hover:text-zinc-100 transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        {/* Featured Image with Hover Overlay */}
        <div className="relative aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.08] bg-zinc-900">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
            <div className="bg-white text-black h-12 px-6 rounded-full flex items-center gap-2 font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              Read More
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Subtle bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
        </div>
      </Link>
    </motion.div>
  )
}
