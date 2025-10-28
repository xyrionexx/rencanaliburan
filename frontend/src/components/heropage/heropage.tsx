"use client";
import Image from "next/image";
import ilustration from "@/assets/ilustration.png";
import { Icon } from "@iconify/react";
import user from "@/assets/user.jpg";
import SliderHomePage from "../slider/sliderHomePage";
import company1 from "@/assets/company1.png";
import { useState } from "react";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
export default function HomePage() {
  const testimonial = [
    {
      id: 1,
      name: "Michael Johnson",
      location: "New York",
      rating: 5,
      date: "2024-09-15",
      photo: "https://i.pravatar.cc/150?img=12",
      testimonial:
        "This website really helped me plan my family vacation to Hawaii. All the information is comprehensive and easy to access. The itinerary created was very detailed and practical!",
    },
    {
      id: 2,
      name: "Sarah Williams",
      location: "Los Angeles",
      rating: 5,
      date: "2024-10-01",
      photo: "https://i.pravatar.cc/150?img=45",
      testimonial:
        "The destination recommendation feature is incredibly accurate! I discovered beautiful hidden gems in Colorado. Totally worth it and saves so much planning time.",
    },
    {
      id: 3,
      name: "David Chen",
      location: "San Francisco",
      rating: 4,
      date: "2024-09-28",
      photo: "https://i.pravatar.cc/150?img=33",
      testimonial:
        "The interface is user-friendly and easy to navigate. The budget estimate provided is quite accurate too. Very helpful for my backpacking trip to Thailand.",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      location: "Miami",
      rating: 5,
      date: "2024-10-05",
      photo: "https://i.pravatar.cc/150?img=23",
      testimonial:
        "Best app for travel planning! I can customize my itinerary according to my preferences and budget. Hotel and restaurant recommendations are also very helpful. Highly recommended!",
    },
    {
      id: 5,
      name: "James Anderson",
      location: "Chicago",
      rating: 4,
      date: "2024-10-03",
      photo: "https://i.pravatar.cc/150?img=68",
      testimonial:
        "Very practical for solo travel planning. The transportation and accommodation cost calculator is very accurate. I feel much more confident planning my own trips now.",
    },
  ];

  const [email, setEmail] = useState("");

  // State dan ref untuk Carousel
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const autoplayRef = React.useRef<NodeJS.Timeout | null>(null);
  const totalSlides = 5;

  // Fungsi untuk menggerakkan slide berikutnya
  const scrollNext = React.useCallback(() => {
    if (api) {
      api.scrollNext();
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }
  }, [api, totalSlides]);

  // Handler untuk mengatur API carousel
  React.useEffect(() => {
    if (!api) return;

    // Start autoplay
    autoplayRef.current = setInterval(scrollNext, 3000);

    // Cleanup
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [api, scrollNext]);

  // Handler untuk mouse events pada carousel
  const handleMouseEnter = React.useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    if (!autoplayRef.current && api) {
      autoplayRef.current = setInterval(scrollNext, 3000);
    }
  }, [api, scrollNext]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/message/sendemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("Failed to send email");
      }
      alert("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col lg:flex-row justify-between items-center px-5 sm:px-10 lg:px-20 py-10 lg:py-0 relative overflow-hidden">
        <div className="bg-linear-to-br from-[#6D94C5] via-[#8BA8CE] to-[#A9BED7] absolute top-0 left-0 w-[40vw] sm:w-[30vw] lg:w-[25vw] h-[40vw] sm:h-[30vw] lg:h-[25vw] rounded-full blur-3xl opacity-40 z-[-1] animate-pulse"></div>
        <div className="bg-linear-to-tl from-[#CBDCEB] via-[#B8D4E8] to-[#9CC4DD] absolute bottom-0 right-0 w-[45vw] sm:w-[35vw] lg:w-[30vw] h-[45vw] sm:h-[35vw] lg:h-[30vw] rounded-full blur-3xl opacity-30 z-[-1] dark:right-40 dark:bottom-14 animate-pulse delay-700"></div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-size-[40px_40px] z-[-1] opacity-50"></div>

        <div className="flex flex-col w-full lg:w-[50%] gap-6 sm:gap-7 mb-8 lg:mb-0 max-sm:mt-10">
          <div className="user flex relative h-10 mb-2">
            <div className="absolute w-8 h-8 sm:w-10 sm:h-10 lg:w-[45px] lg:h-[45px] rounded-full bg-linear-to-r from-blue-400 to-blue-600 blur-md opacity-60 z-[-1]"></div>
            <Image
              src={user}
              alt="User"
              width={45}
              height={45}
              className="rounded-full z-0 absolute w-8 h-8 sm:w-10 sm:h-10 lg:w-[45px] lg:h-[45px]  dark:border-gray-800 shadow-lg"
            />
            <Image
              src={user}
              alt="User"
              width={45}
              height={45}
              className="rounded-full z-1 absolute left-6 sm:left-8 lg:left-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-[45px] lg:h-[45px]  dark:border-gray-800 shadow-lg"
            />
            <Image
              src={user}
              alt="User"
              width={45}
              height={45}
              className="rounded-full z-2 absolute left-12 sm:left-16 lg:left-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-[45px] lg:h-[45px]  dark:border-gray-800 shadow-lg"
            />
            <div className="absolute left-20 sm:left-28 lg:left-36 top-1 sm:top-2 bg-blue-300 text-black dark:bg-gray-700 dark:text-white text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full shadow-lg font-medium">
              Trusted by 100K+
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold w-full lg:w-[95%] leading-tight bg-linear-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent">
            Craft Your Perfect Journey, Create Timeless Memories
          </h1>

          <p className="w-full sm:w-[85%] lg:w-[70%] text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Experience curated luxury travel planning with AI-powered
            recommendations. From hidden gems to iconic destinations, every
            journey is tailored to perfection.
          </p>

          <div className="buttonGetStarted mb-6 sm:mb-8 lg:mb-10">
            <button className="group relative flex items-center gap-3 py-3 px-6 sm:py-4 sm:px-8 rounded-full text-sm sm:text-base font-semibold dark:hover:text-black dark:bg-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="absolute inset-0 bg-blue-300 dark:bg-gray-700  group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">Start Your Journey</span>
              <Icon
                icon="material-symbols:arrow-right-alt"
                className="relative z-10 text-xl group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>

          <div className="forImformation flex flex-col gap-3 sm:gap-4">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
              Subscribe for exclusive travel insights and offers
            </p>
            <div className="parentInputEmail flex items-center gap-3">
              <div className="inputEmail backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 flex rounded-full w-full sm:w-[65%] lg:w-[55%] px-4 py-2.5 justify-start items-center gap-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Icon
                  icon="material-symbols:mail-outline"
                  className="text-xl sm:text-2xl dark:text-gray-700"
                />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="grow outline-none text-sm sm:text-base bg-transparent placeholder:text-gray-400"
                />
              </div>
              <button className="group bg-blue-300 dark:bg-gray-700 p-2.5 rounded-full shrink-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <Icon
                  icon="line-md:arrow-up"
                  width="30"
                  height="30"
                  className="rotate-40 w-6 h-6 sm:w-7 sm:h-7 lg:w-[30px] lg:h-[30px] text-white group-hover:rotate-50 transition-transform duration-300"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="ilustration-image w-full lg:w-[50%] flex justify-center mt-8 lg:mt-0 relative">
          <div className="absolute inset-0 bg-linear-to-br from-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl"></div>
          <Image
            src={ilustration}
            alt="Ilustration"
            className="w-full max-w-md lg:max-w-full relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      <div className="px-5 sm:px-8 lg:px-12 py-16 sm:py-24 bg-linear-to-b from-transparent via-gray-50/50 to-transparent dark:via-gray-900/50">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-linear-to-r  bg-clip-text ">
            Luxury Planning Features
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need for the perfect vacation experience
          </p>
        </div>
        <SliderHomePage />
      </div>

      <div className="px-5 sm:px-10 lg:px-20 flex items-center w-full min-h-screen py-16 lg:py-24">
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 w-full">
          <div className="headline flex flex-col gap-4 sm:gap-5 lg:gap-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl w-full lg:w-[90%] font-bold leading-tight bg-linear-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Explore World-Class Destinations with Confidence
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300">
              Join millions of discerning travelers who trust Lumotrip for
              unforgettable experiences.
            </p>
          </div>

          <div className="search w-full sm:w-[80%] lg:w-[60%] xl:w-[40vw] rounded-2xl flex border-2 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800 overflow-hidden">
            <input
              type="text"
              placeholder="Where would you like to go?"
              className="w-full px-5 sm:px-6 py-3.5 outline-none text-sm sm:text-base bg-transparent placeholder:text-gray-400"
            />
            <button className="w-14 sm:w-16 lg:w-[12%] dark:bg-blue-500 rotate-180 shrink-0 transition-all duration-300 group">
              <i className="flex items-center justify-center">
                <Icon
                  icon="proicons:arrow-reply"
                  width="40"
                  height="40"
                  className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10  group-hover:scale-110 transition-transform duration-300"
                />
              </i>
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 w-full mt-4">
            {[
              {
                label: "Active Users",
                value: "100K",
                icon: "mdi:account-group",
              },
              { label: "Trips Planned", value: "500K", icon: "mdi:airplane" },
              { label: "5-Star Reviews", value: "120K", icon: "mdi:star" },
              { label: "Happy Travelers", value: "200M", icon: "mdi:earth" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 to-purple-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon
                      icon={stat.icon}
                      className="text-3xl  dark:text-blue-400"
                    />
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </p>
                  </div>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold  bg-clip-text ">
                    {stat.value}
                    <span className="text-2xl">+</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-10 lg:px-20 min-h-screen w-full py-16 lg:py-24 gap-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6   bg-clip-text ">
            What Our Travelers Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real stories from real travelers who discovered their perfect
            journeys with us
          </p>
        </div>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            setApi={setApi}
          >
            <CarouselContent>
              {testimonial.map((testimoni, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="h-full">
                      <CardContent className="flex items-start p-6 h-full">
                        <figure className="flex flex-col h-full">
                          {/* accent bar */}
                          <div
                            className="mb-4 h-1.5 w-12 rounded-full bg-primary shrink-0"
                            aria-hidden="true"
                          />

                          {/* Testimonial text with proper spacing */}
                          <blockquote className="text-pretty text-sm sm:text-base leading-relaxed grow mb-4">
                            "{testimoni.testimonial}"
                          </blockquote>

                          {/* Author info at bottom */}
                          <figcaption className="mt-auto flex items-center gap-3 sm:gap-4 shrink-0">
                            <Avatar className="size-12 sm:size-14 ring-1 ring-ring/40 shrink-0">
                              <AvatarImage
                                src={testimoni.photo}
                                alt={`Photo of ${testimoni.name}`}
                              />
                              <AvatarFallback className="text-xs sm:text-sm">
                                {testimoni.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex min-w-0 flex-col">
                              <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                                {testimoni.name}
                              </span>
                              <span className="text-xs text-muted-foreground truncate">
                                {testimoni.location}
                              </span>
                              {/* Rating stars */}
                              <div
                                className="flex gap-0.5 mt-1"
                                aria-label={`Rating: ${testimoni.rating} out of 5`}
                              >
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`size-3 sm:size-4 ${
                                      i < testimoni.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-gray-300 text-gray-300"
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </figcaption>
                        </figure>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </>
  );
}
