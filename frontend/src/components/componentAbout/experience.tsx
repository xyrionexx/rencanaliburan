import { Plane, MapPin, Calendar, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

import Image from "next/image";
import luxury from "@/assets/luxury-tropical-resort-infinity-pool-sunset.jpg";

export function Experience() {
  const stats = [
    { icon: Users, value: "50K+", label: "Satisfied Travelers" },
    { icon: MapPin, value: "200+", label: "Premium Destinations" },
    { icon: Calendar, value: "100K+", label: "Planned Journeys" },
    { icon: Plane, value: "150+", label: "Countries Covered" },
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-6 text-balance">
            Unforgettable Experiences
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every journey is a unique story. We help you create
            precious moments that will be remembered forever.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="p-8 text-center border-border/50 bg-card/50 backdrop-blur"
              >
                <Icon className="w-8 h-8 mx-auto mb-4 text-black dark:text-white" />
                <div className="font-serif text-4xl text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-32 grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src={luxury}
              alt="Luxury Resort Experience"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-serif text-4xl text-foreground mb-6 text-balance">
              Designed for Perfection
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Every detail of your journey is carefully planned. From
              luxury accommodations to exclusive culinary experiences, we
              ensure every moment reflects the highest standards.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our expert team works tirelessly to deliver experiences
              that exceed expectations, creating memories that will last
              a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
