'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useSWR from 'swr';
import { useLanguage } from "@/components/ui/LanguageProvider";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const EventSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/event/featured?page=1&limit=10`,
    fetcher
  );

  const events = data?.events || [];
  const totalItems = events.length;

  const currentEvent = events[currentIndex];
  let langKey: LanguageKey;

  if (language === "tamil") langKey = "ta";
  else if (language === "sinhala") langKey = "si";
  else langKey = "en";
  type LanguageKey = 'en' | 'ta' | 'si';
  const translations: Record<LanguageKey, { [key: string]: string }> = {
    en: {
      bookEvent: "Book Event",
      noEventsFound: "No events found",
      peopleHaveRegistered: "people have registered",
    },
    ta: {
      bookEvent: "நிகழ்வை பதிவு செய்",
      noEventsFound: "நிகழ்வுகள் எதுவும் கிடைக்கவில்லை",
      peopleHaveRegistered: "பதிவு செய்துள்ளவர்கள்",
    },
    si: {
      bookEvent: "සිදුවීමක් වෙන්කරන්න",
      noEventsFound: "නොමැති සිදුවීම්",
      peopleHaveRegistered: "පිළිගත් පුද්ගලයින්",
    },
  };
  const t = translations[langKey];


  const getTranslatedField = (field: any, key: string) => {
    return field?.[langKey]?.[0]?.[key] || '';
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [totalItems]);

  if (isLoading || !currentEvent) {
    return <div className="text-center p-4">Loading events...</div>;
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="relative w-full">
        <div className="relative w-full min-h-96 aspect-[2/1]">
          <Image
            src={currentEvent.featuredEventImage || currentEvent.image || "/images/Prapancham-logo.png"}
            alt={getTranslatedField(currentEvent.name, 'value')}
            fill
            className="object-cover filter brightness-50 rounded-lg"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            className="bg-white bg-opacity-50 rounded-full p-2 mb-16 md:mb-0"
            onClick={prevImage}
          >
            <ChevronLeft className="text-gray-700" />
          </button>
          <button
            className="bg-white bg-opacity-50 rounded-full p-2 mb-16 md:mb-0"
            onClick={nextImage}
          >
            <ChevronRight className="text-gray-700" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
          <div className="text-white flex justify-between items-center">
            <div>
              {/* <p className="text-sm">{currentEvent.eventLink}</p> */}
              <h2 className="text-lg font-bold">
                {getTranslatedField(currentEvent.name, 'value')}
              </h2>
            </div>
            <p className="text-sm">
              {new Date(currentEvent.eventDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row mt-4 w-full">
            <a
              href={currentEvent.eventLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border border-white text-white py-2 px-4 rounded-lg w-full sm:w-auto sm:flex-grow mr-0 sm:mr-2 mb-2 sm:mb-0 hover:bg-white hover:text-primary transition-colors text-center"
            >
              {t.bookEvent}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSlider;
