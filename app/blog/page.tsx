import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogFeed } from "@/components/blog-feed"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Insights, Ideas & Innovation",
  description: "Explore expert articles, tech trends, and practical tips to keep your business ahead of the curve.",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-zinc-950 selection:bg-white selection:text-black">
      <Header />

      <main className="pt-32">
        <BlogFeed />
      </main>

      <Footer />
    </div>
  )
}
