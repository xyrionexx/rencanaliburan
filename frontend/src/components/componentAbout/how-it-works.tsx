import { Card } from "@/components/ui/card";
import { Search, Wand2, Map, Luggage } from "lucide-react";
import Image from "next/image";
import travelPlanningStep1 from "@/assets/travel-planning-step-1.jpg";
import travelPlanningStep2 from "@/assets/travel-planning-step-2.jpg";
import travelPlanningStep3 from "@/assets/travel-planning-step-3.jpg";
import travelPlanningStep4 from "@/assets/travel-planning-step-4.jpg";

const steps = [
  {
    icon: Search,
    img: travelPlanningStep1,
    title: "Choose Destination",
    description:
      "Search and select your dream destination from thousands of options worldwide.",
  },
  {
    icon: Wand2,
    img: travelPlanningStep2,
    title: "Personalize",
    description:
      "Customize your travel preferences, budget, and vacation duration.",
  },
  {
    icon: Map,
    img: travelPlanningStep3,
    title: "Get Itinerary",
    description:
      "Receive a complete travel plan with daily activity recommendations.",
  },
  {
    icon: Luggage,
    img: travelPlanningStep4,
    title: "Start Your Adventure",
    description:
      "Enjoy your vacation with a complete guide in the palm of your hand.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center space-y-6 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Four simple steps to plan your perfect vacation
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border hidden lg:block" />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative grid gap-8 lg:grid-cols-2 lg:gap-16 ${
                    isEven ? "" : "lg:text-right"
                  }`}
                >
                  <div className={isEven ? "" : "lg:order-2"}>
                    <Card className="p-8 space-y-4">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground ${
                          isEven ? "" : "lg:ml-auto"
                        }`}
                      >
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-primary">
                          Step {index + 1}
                        </div>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </Card>
                  </div>

                  <div
                    className={`hidden lg:block ${isEven ? "lg:order-2" : ""}`}
                  >
                    <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                      <Image
                        src={step.img}
                        alt={step.title}
                        className="h-full w-full object-cover"
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>

                  <div className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary lg:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
