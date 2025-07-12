"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import { useLanguage } from "@/components/ui/LanguageProvider";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const localizedText = {
  loading: {
    en: "Loading...",
    ta: "ஏற்றப்படுகிறது...",
    si: "පූරණය වෙමින් පවතියි...",
  },
  error: {
    en: "Failed to load quotes.",
    ta: "மேற்கோள்களை ஏற்ற முடியவில்லை.",
    si: "මූලපද ලබාගැනීම අසාර්ථකයි.",
  },
};

interface QuoteSectionProps {
  className?: string;
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ className }) => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState<number | null>(null);

  const { language } = useLanguage();
  const langKey: "en" | "ta" | "si" =
    language === "tamil" ? "ta" : language === "sinhala" ? "si" : "en";

  const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/quotes/active?page=1&limit=${limit}`;
  const { data, error, isLoading } = useSWR(apiURL, fetcher);

  useEffect(() => {
    if (data?.quotes) {
      setQuotes(data.quotes);
      setTotalItems(data.pagination?.totalItems || null);
    }
  }, [data]);

  const handlePrev = () => {
    if (quotes.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };

  const handleNext = async () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex < quotes.length) {
      setCurrentIndex(nextIndex);
    } else if (totalItems !== null && quotes.length < totalItems) {
      const newLimit = limit + 5;
      const newApiURL = `${process.env.NEXT_PUBLIC_API_URL}/quotes/active?page=1&limit=${newLimit}`;

      try {
        const res = await fetch(newApiURL);
        const newData = await res.json();

        if (newData?.quotes?.length > quotes.length) {
          setQuotes(newData.quotes);
          setLimit(newLimit);
          setCurrentIndex(nextIndex);
          setTotalItems(newData.pagination?.totalItems || newData.quotes.length);
          mutate(apiURL, newData, false);
        }
      } catch (err) {
        console.error("Failed to fetch more quotes", err);
      }
    } else {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, quotes.length, totalItems]);

  if (error)
    return <div className="text-red-500 px-4">{localizedText.error[langKey]}</div>;
  if (isLoading || !data)
    return <div className="text-white px-4">{localizedText.loading[langKey]}</div>;

  const currentQuote = quotes[currentIndex];
  const quoteText = currentQuote?.quote?.[langKey]?.[0]?.value || "";
  const personName = currentQuote?.name?.[langKey]?.[0]?.value || "";
  const jobTitle = currentQuote?.posistion?.[langKey]?.[0]?.value || "";
  const image = currentQuote?.image || "";

  return (
    <section className={cn("py-8 md:py-12 bg-[#0D1322] text-white px-4 md:px-0", className)}>
      <div className="px-4 md:px-16 lg:px-16 pb-6">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="w-full md:w-1/3 relative h-[250px] md:h-[300px]">
            {image && (
              <Image
                src={image || "/images/Prapancham-logo.png"}
                alt={personName}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            )}
          </div>

          <div className="w-full md:w-2/3 flex flex-col justify-between md:h-[300px] pl-0 md:pl-6">
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-poppins italic font-medium leading-[2.5rem] md:leading-[3rem] lg:leading-[3.5rem] mb-6">
              "{quoteText}"
            </blockquote>

            <div className="border-t border-[#737373] mb-6"></div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <span className="text-base md:text-lg font-semibold">{personName}</span>
                <span className="text-sm md:text-base text-gray-300">{jobTitle}</span>
              </div>

              <div className="flex gap-3 md:gap-4">
                <button
                  onClick={handlePrev}
                  className="hover:bg-white/10 transition-colors rounded-full p-2"
                  aria-label="Previous quote"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button
                  onClick={handleNext}
                  className="hover:bg-white/10 transition-colors rounded-full p-2"
                  aria-label="Next quote"
                  disabled={totalItems !== null && quotes.length >= totalItems && currentIndex + 1 >= totalItems}
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
