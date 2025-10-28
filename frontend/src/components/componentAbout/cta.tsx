import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 px-8 py-16 md:px-16 md:py-24">
          <div className="absolute inset-0 bg-[url('/abstract-travel-pattern.png')] opacity-10 mix-blend-overlay" />

          <div className="relative mx-auto max-w-3xl text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground text-balance md:text-4xl lg:text-5xl">
              Ready to Plan Your Dream Vacation?
            </h2>
            <p className="text-lg text-primary-foreground/90 text-pretty leading-relaxed">
              Join thousands of travelers who have trusted LumoTrip to plan their journeys.
              Start your adventure today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="font-semibold group">
                Start Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Contact Us
              </Button>
            </div>
          </div>

          <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-secondary/30 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
