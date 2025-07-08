"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TitleWithUnderline } from "../ui/title-with-underline";

interface AdItem {
  id: number;
  title: string;
  image: string;
  label: string;
  link?: string;
}

interface ContactSlide {
  id: string;
  title: string;
  image: string;
  label: string;
  isContactSlide: true;
}

type SlideItem = AdItem | ContactSlide;

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
  const [imageStates, setImageStates] = useState<Record<string | number, ImageState>>(
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

  const totalSlides = ads.length + 1; // +1 for the contact us slide
  
  // Create an extended slides array that repeats to ensure we always have 3 slides visible
  const extendedSlides = useMemo((): SlideItem[] => {
    const contactSlide: ContactSlide = { 
      id: 'contact-us', 
      title: 'Contact Us', 
      image: '', 
      label: 'Contact Us', 
      isContactSlide: true 
    };
    
    const allSlides: SlideItem[] = [...ads, contactSlide];
    
    if (allSlides.length >= 3) {
      return allSlides;
    }
    
    // If we have fewer than 3 slides, repeat them to fill at least 3 positions
    const repeated: SlideItem[] = [];
    while (repeated.length < 3) {
      repeated.push(...allSlides);
    }
    return repeated;
  }, [ads]);

  const nextSlide = () => {
    if (totalSlides > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }
  };

  const prevSlide = () => {
    if (totalSlides > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
      );
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Reset autoplay timer when navigation happens
  const handleNavigation = (callback: () => void) => {
    if (totalSlides === 0) return;
    
    // Clear existing interval
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    // Execute the navigation
    callback();

    // Set up new interval if autoplay is enabled
    if (isAutoPlaying && totalSlides > 0) {
      autoPlayRef.current = setInterval(nextSlide, autoSlideInterval);
    }
  };

  useEffect(() => {
    if (isAutoPlaying && totalSlides > 0) {
      autoPlayRef.current = setInterval(nextSlide, autoSlideInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, totalSlides]);

  const [activeScaleIndex, setActiveScaleIndex] = useState(currentIndex);

  useEffect(() => {
    let scaleTimer: NodeJS.Timeout;
    if (isAutoPlaying && totalSlides > 0) {
      scaleTimer = setInterval(() => {
        setActiveScaleIndex((prev) => {
          const nextIndex = prev + 1;
          return nextIndex < currentIndex + 3 ? nextIndex : currentIndex;
        });
      }, autoSlideInterval / 3);
    }
    return () => clearInterval(scaleTimer);
  }, [isAutoPlaying, currentIndex, autoSlideInterval, totalSlides]);

  return (
    <div className={cn("w-full my-10", className)}>
      <div className="max-w-full ">
        <div className="flex justify-between items-center mb-12">

          <div className="flex-shrink min-w-0">
            <TitleWithUnderline text={title} underlineWidth={64} />
          </div>

          {totalSlides > 1 && ( // Show navigation when there's more than just the contact slide
            <div className="flex gap-2">
              <button
                onClick={() => handleNavigation(prevSlide)}
                className="p-2 hover:bg-gray-100 transition-colors"
                aria-label="Previous slide"
                disabled={totalSlides <= 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleNavigation(nextSlide)}
                className="p-2 hover:bg-gray-100 transition-colors"
                aria-label="Next slide"
                disabled={totalSlides <= 1}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {totalSlides === 1 ? ( // Only contact slide (no ads)
          <div className="text-center p-8 bg-gray-50 rounded">
            <p className="text-gray-500">No advertisements available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
              {/* Always render exactly 3 slides */}
              {[0, 1, 2].map((offset) => {
                const slideIndex = (currentIndex + offset) % extendedSlides.length;
                const slide = extendedSlides[slideIndex];
                
                if (!slide) return null;

                // Type guard function
                const isContactSlide = (slide: SlideItem): slide is ContactSlide => {
                  return 'isContactSlide' in slide && slide.isContactSlide === true;
                };

                // Handle contact us slide
                if (isContactSlide(slide)) {
                  const handleWhatsAppClick = () => {
                    const phoneNumber = "94770023323";
                    const message = encodeURIComponent("Hi! I'm interested in advertising on your platform. Could you please provide more information?");
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                    window.open(whatsappUrl, '_blank');
                  };

                  return (
                    <div
                      key={`contact-${slideIndex}`}
                      className={cn(
                        "relative overflow-hidden transition-all duration-500 ease-in-out group w-full h-full cursor-pointer",
                        offset === activeScaleIndex - currentIndex ? "scale-110 z-10" : "scale-90 z-0",
                        offset === 0 ? "" : offset === 1 ? "delay-100" : "delay-200",
                        offset === activeScaleIndex - currentIndex ? "" : 
                          offset === activeScaleIndex - currentIndex - 1 ? "-translate-x-4 opacity-75" : 
                          offset === activeScaleIndex - currentIndex + 1 ? "translate-x-4 opacity-75" : ""
                      )}
                      style={{
                        transformOrigin: "center center",
                        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-in-out",
                      }}
                      onClick={handleWhatsAppClick}
                    >
                      <div className="aspect-video w-full h-full relative bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center hover:from-teal-700 hover:to-teal-900 transition-colors">
                        <div className="text-center text-white p-6">
                          <h3 className="text-xl md:text-2xl font-bold mb-4">
                            Want to Advertise Here?
                          </h3>
                          <p className="text-sm md:text-base mb-4 opacity-90">
                            Contact us to post your advertisements and reach thousands of viewers
                          </p>
                          <div className="space-y-2">
                            <p className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
                              <span className="text-green-300">💬</span>
                              +94 77 002 33 23
                            </p>
                            <p className="text-xs md:text-sm opacity-80">
                              Click to message us on WhatsApp!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Handle regular ad slide
                const ad = slide as AdItem; // We know it's an AdItem since it's not a contact slide
                const adContent = (
                  <div
                    key={`ad-${slideIndex}-${ad.id}`}
                    className={cn(
                      "relative overflow-hidden transition-all duration-500 ease-in-out group w-full h-full",
                      ad.link && "cursor-pointer",
                      offset === activeScaleIndex - currentIndex ? "scale-110 z-10" : "scale-90 z-0",
                      offset === 0 ? "" : offset === 1 ? "delay-100" : "delay-200",
                      offset === activeScaleIndex - currentIndex ? "" : 
                        offset === activeScaleIndex - currentIndex - 1 ? "-translate-x-4 opacity-75" : 
                        offset === activeScaleIndex - currentIndex + 1 ? "translate-x-4 opacity-75" : ""
                    )}
                    style={{
                      transformOrigin: "center center",
                      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-in-out",
                    }}
                  >
                    <div className="aspect-video w-full h-full relative">
                      <Image
                        src={ad.image || "/images/Prapancham-logo.png"}
                        alt={ad.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={cn(
                          "object-cover w-full h-full transition-transform duration-500 ease-in-out",
                          imageStates[ad.id]?.isLoading ? "scale-110 blur-sm" : "scale-100",
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
                        priority={offset < 3}
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

                if (ad.link) {
                  return (
                    <a
                      key={`ad-link-${slideIndex}-${ad.id}`}
                      href={ad.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {adContent}
                    </a>
                  );
                }

                return adContent;
              })}
            </div>

            <div className="flex justify-center mt-4 gap-2">
              {/* Dots for ads + contact slide */}
              {Array.from({ length: totalSlides }).map((_, index) => (
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
          </>
        )}
      </div>
    </div>
  );
};

export default HAdCarousel;
