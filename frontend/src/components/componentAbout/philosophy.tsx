import { Sparkles, Heart, Globe } from "lucide-react";

export function Philosophy() {
  const values = [
    {
      icon: Sparkles,
      title: "Excellence",
      description:
        "We are committed to providing the best travel experience with the highest quality standards in every aspect.",
    },
    {
      icon: Heart,
      title: "Personalization",
      description:
        "Every traveler is unique. We create travel plans tailored to your preferences and dreams.",
    },
    {
      icon: Globe,
      title: "Sustainability",
      description:
        "We believe in responsible travel, preserving the beauty of destinations for future generations.",
    },
  ];

  return (
    <section className="py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-6 text-balance">
            Our Philosophy
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            More than just a planning application, LumoTrip is your travel
            partner that understands the value of authentic and meaningful
            experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                  <Icon className="w-8 h-8 text-black dark:text-white" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-32 max-w-4xl mx-auto">
          <blockquote className="text-center">
            <p className="font-serif text-3xl md:text-4xl text-foreground mb-8 text-balance leading-relaxed">
              "The best journeys are those that transform us, open our eyes
              to the wonders of the world, and remind us of the beauty
              of life."
            </p>
            <footer className="text-muted-foreground">
              <cite className="not-italic">— LumoTrip Team</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
