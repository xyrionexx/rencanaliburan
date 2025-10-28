import { Button } from "@/components/ui/button"
import { Plane } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Plane className="h-4 w-4" />
              <span>Tentang LumoTrip</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
              Rencanakan Liburan Impian Anda dengan Mudah
            </h1>

            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              LumoTrip adalah aplikasi pembuat rencana liburan yang membantu Anda merencanakan perjalanan sempurna
              dengan mudah, cepat, dan personal. Dari destinasi hingga itinerary, kami siap membantu mewujudkan liburan
              impian Anda.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="font-semibold">
                Mulai Merencanakan
              </Button>
              <Button size="lg" variant="outline" className="font-semibold bg-transparent">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
              <img src="/tropical-beach-vacation-with-palm-trees-and-turquo.jpg" alt="Liburan tropis" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-2xl bg-accent/20 blur-3xl" />
            <div className="absolute -top-6 -right-6 h-32 w-32 rounded-2xl bg-primary/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
