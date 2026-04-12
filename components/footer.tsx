import Link from "next/link"
import Image from "next/image"
import { Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Main Footer Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/portfolio-logo.png"
                alt="Portfolio Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-foreground">Famim Farhaz Studio</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Custom websites for founders, coaches, and brands who refuse to blend in.
            </p>
            <p className="text-xs text-muted-foreground">
              Boutique Development Studio
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link href="/#about-me" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact & Availability */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Let's Connect</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:famimfarhaz@gmail.com" className="hover:text-foreground transition-colors">
                  famimfarhaz@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-foreground/80" />
                <span>Available for new projects & collaboration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © 2026 Famim Farhaz Studio — Designed & Developed with passion
          </p>
          <div className="text-xs text-muted-foreground">
            Crafting modern web experiences with precision and passion.
          </div>
        </div>
      </div>
    </footer>
  )
}
