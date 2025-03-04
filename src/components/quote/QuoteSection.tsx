"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface QuoteData {
  id: number;
  quote: string;
  personName: string;
  jobTitle: string;
  image: string;
}

interface QuoteSectionProps {
  className?: string;
}

const quotes: QuoteData[] = [
  {
    id: 1,
    quote:
      "Lorem ipsum dolor sit amet consectetur. Telluslgy nisi risus tellus acdd fsgsgsggd hendrerit nisldhdgteg convallis",
    personName: "Name of the person",
    jobTitle: "Job title",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
  },
  {
    id: 2,
    quote:
      "Podcasting has given me a platform to share stories that might otherwise go unheard. It's about creating authentic connections through conversation.",
    personName: "Sarah Johnson",
    jobTitle: "Host & Producer",
    image: "https://images.unsplash.com/photo-1590086783191-a0694c7d1e6e",
  },
  {
    id: 3,
    quote:
      "The intimate nature of audio allows listeners to feel like they're part of the conversation. It's a powerful medium for storytelling and sharing ideas.",
    personName: "Michael Rodriguez",
    jobTitle: "Podcast Network Director",
    image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc",
  },
];

const QuoteSection: React.FC<QuoteSectionProps> = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  return (
    <section
      className={cn(
        "py-8 md:py-12 bg-[#0A3F51] text-white px-4 md:px-0",
        className
      )}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="w-full md:w-1/3 relative h-[250px] md:h-[300px]">
            <Image
              src={quotes[currentIndex].image}
              alt={quotes[currentIndex].personName}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>

          <div className="w-full md:w-2/3">
            <div className="relative">
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-playfair italic font-medium mb-4 md:mb-6">
                "{quotes[currentIndex].quote}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1">
                  <span className="text-base md:text-lg font-semibold">
                    {quotes[currentIndex].personName}
                  </span>
                  <span className="text-sm md:text-base text-gray-300">
                    {quotes[currentIndex].jobTitle}
                  </span>
                </div>

                <div className="flex gap-3 md:gap-4">
                  <button
                    onClick={handlePrev}
                    className="hover:bg-white/10 transition-colors"
                    aria-label="Previous quote"
                  >
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="hover:bg-white/10 transition-colors"
                    aria-label="Next quote"
                  >
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
