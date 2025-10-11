import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <Card className="corner-glow relative overflow-hidden bg-gradient-to-br from-accent/10 via-card to-card border-accent/30 p-12 lg:p-16 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/30 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

          <div className="relative max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance text-foreground">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Let's discuss how I can help bring your ideas to life. Get in touch to schedule a consultation.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all group"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  )
}
