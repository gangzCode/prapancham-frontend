"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TitleWithUnderline } from "../ui/title-with-underline";

interface AdItem {
  id: number;
  title: string;
  image: string;
  label: string;
}

interface ImageState {
  isLoading: boolean;
  error: boolean;
}

interface HAdCarouselProps {
  ads: AdItem[];
  title?: string;
  autoSlideInterval?: number;
  className?: string;
}

const HAdCarousel = ({
  ads,
  title = "Advertisements",
  autoSlideInterval = 5000,
  className,
}: HAdCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [imageStates, setImageStates] = useState<Record<number, ImageState>>(
    {}
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window?.innerWidth < 768);
    };

    checkMobile();
    window?.addEventListener("resize", checkMobile);

    return () => window?.removeEventListener("resize", checkMobile);
  }, []);

  const totalSlides = ads.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Reset autoplay timer when navigation happens
  const handleNavigation = (callback: () => void) => {
    // Clear existing interval
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    // Execute the navigation
    callback();

    // Set up new interval if autoplay is enabled
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, autoSlideInterval);
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, autoSlideInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  const [activeScaleIndex, setActiveScaleIndex] = useState(currentIndex);

  useEffect(() => {
    let scaleTimer: NodeJS.Timeout;
    if (isAutoPlaying) {
      scaleTimer = setInterval(() => {
        setActiveScaleIndex((prev) => {
          const nextIndex = prev + 1;
          return nextIndex < currentIndex + 3 ? nextIndex : currentIndex;
        });
      }, autoSlideInterval / 3);
    }
    return () => clearInterval(scaleTimer);
  }, [isAutoPlaying, currentIndex, autoSlideInterval]);

  return (
    <div className={cn("w-full my-10", className)}>
      <div className="max-w-full">
        <div className="flex justify-between items-center mb-12">

          <div className="flex-shrink min-w-0">
            <TitleWithUnderline text={title} underlineWidth={64} />
          </div>



          <div className="flex gap-2">
            <button
              onClick={() => handleNavigation(prevSlide)}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleNavigation(nextSlide)}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
          {ads.map((ad, index) => {
            const isVisible = index >= currentIndex && index < currentIndex + 3;
            if (!isVisible && !isMobile) return null;
            if (index !== currentIndex && isMobile) return null;

            return (
              <div
                key={ad.id}
                className={cn(
                  "relative overflow-hidden transition-all duration-500 ease-in-out group w-full h-full",
                  isVisible
                    ? `${index === activeScaleIndex ? "scale-110 z-10" : "scale-90 z-0"} ${index === currentIndex ? "" : index === currentIndex + 1 ? "delay-100" : "delay-200"} ${index === activeScaleIndex ? "" : index === activeScaleIndex - 1 ? "-translate-x-4 opacity-75" : index === activeScaleIndex + 1 ? "translate-x-4 opacity-75" : ""}`
                    : "scale-100"
                )}
                style={{
                  transformOrigin: "center center",
                  transition:
                    "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-in-out",
                }}
              >
                <div className="aspect-video w-full h-full relative">
                  <Image
                    src={ad.image}
                    alt={ad.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={cn(
                      "object-cover w-full h-full transition-transform duration-500 ease-in-out",
                      imageStates[ad.id]?.isLoading
                        ? "scale-110 blur-sm"
                        : "scale-100",
                      !imageStates[ad.id]?.error && "hover:scale-105"
                    )}
                    onLoad={() => {
                      setImageStates((prev) => ({
                        ...prev,
                        [ad.id]: { isLoading: false, error: false },
                      }));
                    }}
                    onError={() => {
                      setImageStates((prev) => ({
                        ...prev,
                        [ad.id]: { isLoading: false, error: true },
                      }));
                    }}
                    loading="eager"
                    priority={index < 3}
                  />
                  {imageStates[ad.id]?.error ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <AlertCircle className="w-8 h-8" />
                        <span className="text-sm">Failed to load image</span>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/40" />
                  )}
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-white text-sm font-medium">
                    Advertisement
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-4 gap-2">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(() => goToSlide(index))}
              className={`w-3 h-3 rounded-full transition-colors ${Math.floor(currentIndex / 3) * 3 <= index &&
                index < (Math.floor(currentIndex / 3) + 1) * 3
                ? "bg-teal-600"
                : "bg-gray-300"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HAdCarousel;
