"use client"

import { motion } from "framer-motion"
import { blogPosts } from "@/lib/blog-data"
import { BlogCard } from "@/components/ui/blog-card"

export function BlogFeed() {
  return (
    <section className="py-24 px-6 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto">
        {/* Split Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-20 items-end">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-bold uppercase tracking-[0.4em] text-zinc-600"
            >
              Our Blog
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight"
            >
              View All<br />Knowledge Posts
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border-l border-white/10 pl-8 lg:pl-12"
          >
            <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
              Dive into expert-written articles, tutorials, and insights designed to help you stay ahead in the fast-moving world of technology and innovation.
            </p>
          </motion.div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
