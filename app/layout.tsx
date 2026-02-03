import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { VisitorTracker } from '@/components/visitor-tracker'
import { ExpandableChatDemo } from '@/components/expandable-chat-demo'
import ClickSparkProvider from '@/components/click-spark-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Famim Farhaz - Full Stack Web Developer',
  description: 'Portfolio and blog of Famim Farhaz, a full-stack web developer specializing in modern, scalable Websites.',
  generator: 'Next.js',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

import { Toaster } from "sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ClickSparkProvider>
          <VisitorTracker />
          {children}
          <ExpandableChatDemo />
          <Analytics />
          <Toaster />
        </ClickSparkProvider>
      </body>
    </html>
  )
}
