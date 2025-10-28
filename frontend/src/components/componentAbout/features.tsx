import { MapPin, Calendar, Users, Sparkles, Globe, Heart } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Destination Recommendations",
    description:
      "Discover the best destinations based on your interests, budget, and travel time.",
  },
  {
    icon: Calendar,
    title: "Automatic Itinerary",
    description:
      "Create a complete travel schedule with activity recommendations for each day.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Plan vacations with friends or family using real-time collaboration features.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description:
      "AI technology helps provide the best recommendations for your journey.",
  },
  {
    icon: Globe,
    title: "Global Destinations",
    description:
      "Access information about thousands of destinations worldwide in one application.",
  },
  {
    icon: Heart,
    title: "Save Favorites",
    description:
      "Save favorite destinations and activities for future reference.",
  },
];

export function Features() {
  return (
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center space-y-6 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Key Features
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Everything you need to plan the perfect vacation in
            one application
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-7 w-7 color-[#E8DFCA]" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
