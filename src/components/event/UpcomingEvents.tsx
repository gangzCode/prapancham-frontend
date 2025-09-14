"use client";

import EventCard from "./EventCard";
import FeaturedEvent from "./FeaturedEvent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TitleWithUnderline } from "@/components/ui/title-with-underline";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { useLanguage } from "@/components/ui/LanguageProvider";

type LanguageKey = "en" | "ta" | "si";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ApiEvent {
  _id: string;
  name: {
    en: { name: string; value: string; _id: string }[];
    ta: { name: string; value: string; _id: string }[];
    si: { name: string; value: string; _id: string }[];
  };
  description: {
    en: { name: string; value: string; _id: string }[];
    ta: { name: string; value: string; _id: string }[];
    si: { name: string; value: string; _id: string }[];
  };
  eventDate: string;
  isFeatured: boolean;
  image: string;
  eventLink?: string;
}

const UpcomingEvents: React.FC = () => {
  const { language } = useLanguage();

  const langKey: LanguageKey =
    language === "tamil" ? "ta" : language === "sinhala" ? "si" : "en";

  const { data, error } = useSWR<ApiEvent[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/event/recent/10`,
    fetcher
  );

  const featuredEvents = React.useMemo(
    () => data?.filter((event) => event.isFeatured) ?? [],
    [data]
  );

  const normalEvents = React.useMemo(
    () => data?.filter((event) => !event.isFeatured) ?? [],
    [data]
  );

  const [currentFeaturedIndex, setCurrentFeaturedIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && featuredEvents.length > 0) {
        setCurrentFeaturedIndex(
          (prev) => (prev + 1) % featuredEvents.length
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, featuredEvents]);

  const currentFeaturedEvent = featuredEvents[currentFeaturedIndex];

  function getLocalizedText(
    items: { name: string; value: string; _id: string }[],
    lang: LanguageKey
  ): string {
    const found = items.find((item) => item.name.toLowerCase() === "title" || item.name.toLowerCase() === "தலைப்பு" || item.name.toLowerCase() === "සිරස");
    return found ? found.value : items[0]?.value ?? "";
  }

  function getLocalizedDescription(
    items: { name: string; value: string; _id: string }[],
    lang: LanguageKey
  ): string {
    const found = items.find((item) => item.name.toLowerCase() === "details" || item.name.toLowerCase() === "விவரம்" || item.name.toLowerCase() === "විස්තරය");
    return found ? found.value : items[0]?.value ?? "";
  }

  // if (error) return <div>Error loading events.</div>;
  // if (!data) return <div>Loading...</div>;

  return (
    <section className="flex flex-wrap gap-6 justify-center px-4 md:px-8 lg:px-16 mt-6 w-full max-md:px-5 max-md:max-w-full">
      <header className="flex flex-row items-center justify-between w-full gap-4 sm:gap-6 md:gap-10 overflow-hidden">
        <div className="flex-shrink min-w-0">
          <TitleWithUnderline text={
            langKey === "ta"
              ? "நிகழ்வுகள்"
              : langKey === "si"
                ? "ඉදිරිපත් කිරීම"
                : "Upcoming Events"
          } underlineWidth={64} />
        </div>
        <Link 
          href="/events"
          className="flex-shrink-0 flex items-center gap-2 text-red-800 hover:text-red-700 transition-colors"
        >
          <span className="text-sm sm:text-base md:text-heading-base">
            {langKey === "ta"
              ? "மேலும் பார்க்க"
              : langKey === "si"
                ? "තවත් බලන්න"
                : "View more"}
          </span>
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Link>
      </header>

      <div className="flex-1 shrink rounded-2xl basis-4 min-w-60 max-md:max-w-full h-[600px]">
        <div className="flex flex-wrap flex-1 gap-2 justify-center mt-4 h-full max-md:max-w-full">
          <ScrollArea className="overflow-hidden flex-1 shrink basis-0 min-w-60 max-md:max-w-full h-[calc(100%-40px)]">
            <div className="flex flex-col gap-1">
              {normalEvents.map((event) => (
                <EventCard
                  key={event._id}
                  imageUrl={event.image}
                  location={getLocalizedText(currentFeaturedEvent.description[langKey], langKey)}
                  eventName={getLocalizedText(event.name[langKey], langKey)}
                  date={new Date(event.eventDate).toLocaleDateString()}
                  eventLink={event.eventLink}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {currentFeaturedEvent && (
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="transition-opacity duration-500"
        >
          <FeaturedEvent
            imageUrl={currentFeaturedEvent.image}
            location={getLocalizedText(currentFeaturedEvent.description[langKey], langKey)}
            eventName={getLocalizedText(currentFeaturedEvent.name[langKey], langKey)}
            date={new Date(currentFeaturedEvent.eventDate).toLocaleDateString()}
            eventLink={currentFeaturedEvent.eventLink}
          />
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;
