import my from "@/assets/my.jpg";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const team = [
  {
    name: "Adit Rahmat Hidayat",
    role: "Full-stack Developer",
    image: my,
  },
];

export function Team() {
  return (
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center space-y-6 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Our Team
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Meet the people dedicated to making your journey easier
          </p>
        </div>

        <div className="flex justify-center items-center max-w-5xl mx-auto">
          {team.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6 text-center space-y-2">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
