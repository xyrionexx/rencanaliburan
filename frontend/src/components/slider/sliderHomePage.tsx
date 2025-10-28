"use client";
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

interface SliderItem {
  title: string;
  description: string;
}

export default function SliderHomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const sliderItems: SliderItem[] = [
    {
      title: "Destination Explorer",
      description:
        "Discover breathtaking locations around the world with our curated list of trending destinations.",
    },
    {
      title: "Smart Itinerary",
      description:
        "Plan your trip efficiently with AI-powered recommendations based on your preferences and budget.",
    },
    {
      title: "Travel Essentials",
      description:
        "Pack perfectly with our comprehensive checklist tailored to your destination and season.",
    },
    {
      title: "Budget Planner",
      description:
        "Track expenses and allocate funds wisely to make the most of your vacation without financial stress.",
    },
    {
      title: "Local Experiences",
      description:
        "Immerse yourself in authentic cultural activities recommended by local experts and seasoned travelers.",
    },
    {
      title: "Weather Insights",
      description:
        "Stay prepared with accurate weather forecasts to plan outdoor activities during your vacation.",
    },
    {
      title: "Travel Community",
      description:
        "Connect with fellow travelers, share experiences, and gather valuable insights for your journey.",
    },
    {
      title: "Instant Support",
      description:
        "Access 24/7 assistance for any travel emergencies or queries during your vacation adventures.",
    },
  ];

  const handleNext = () => {
    if (currentIndex < sliderItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(sliderItems.length - 1);
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="w-full overflow-hidden py-8">
      <div className="relative w-full">
        {/* Main slider */}
        <div className="w-full overflow-x-hidden">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {sliderItems.map((item, index) => (
              <div key={index} className="min-w-full px-4 text-center">
                <h3 className="text-lg font-medium text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-white max-w-2xl mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        {/* <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white"
        >
          <Icon icon="mdi:chevron-left" width="24" height="24" />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white"
        >
          <Icon icon="mdi:chevron-right" width="24" height="24" />
        </button> */}

        {/* Indicator dots */}
        <div className="flex justify-center mt-4 gap-2">
          {sliderItems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index
                  ? "w-8 bg-black dark:bg-blue-300"
                  : "w-2 bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Mini text slider below like in the image */}
      <div className="flex justify-between w-full mt-8 px-9 overflow-x-auto gap-4 text-sm scrollbar-hide">
        {sliderItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`whitespace-nowrap px-4 py-2 transition-all ${
              currentIndex === index
                ? "font-bold border-b-2 border-black dark:border-blue-300 text-[#6D94C5]"
                : "text-gray-500 dark:text-white"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}
