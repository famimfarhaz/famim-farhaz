import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
                <span className="text-xl font-semibold tracking-tight text-foreground">Famim Farhaz</span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
              <Link href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Hire Me</Button>
        </div>
      </div>
    </header>
  )
}
