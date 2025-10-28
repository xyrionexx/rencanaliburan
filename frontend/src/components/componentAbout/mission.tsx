import { Card } from "@/components/ui/card";

export function Mission() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            We believe that everyone deserves a perfect vacation without having
            to spend hours planning. LumoTrip is here to simplify the vacation
            planning process, provide personal recommendations, and ensure every
            moment of your journey is memorable.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <Card className="p-8 space-y-4 border-2 hover:border-primary/50 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold">Easy & Fast</h3>
            <p className="text-muted-foreground leading-relaxed">
              Create a complete vacation plan in just minutes with an intuitive
              and easy-to-use interface.
            </p>
          </Card>

          <Card className="p-8 space-y-4 border-2 hover:border-primary/50 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold">Personal & Relevant</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get destination and activity recommendations tailored to your
              preferences and budget.
            </p>
          </Card>

          <Card className="p-8 space-y-4 border-2 hover:border-primary/50 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold">Complete & Organized</h3>
            <p className="text-muted-foreground leading-relaxed">
              All your travel details neatly stored in one place, from tickets
              to daily itineraries.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
