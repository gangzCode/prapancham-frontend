'use client';

import React, { useState, useEffect, Suspense } from "react";
import Calendar from "@/components/events/calendar";
import EventSlider from "@/components/events/event-slider";
import EventList from "@/components/events/event-list";
import AdvertisementSidebar from "@/components/news-category/AdvertisementSidebar";
import useSWR from 'swr';
import { useLanguage } from "@/components/ui/LanguageProvider";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const LoadingSpinner = ({ language }: { language?: string }) => {
  const loadingText = {
    english: "Loading events...",
    tamil: "நிகழ்வுகள் ஏற்றப்படுகின்றன...",
    sinhala: "සිදුවීම් පූරණය වෙමින්...",
  };

  const text = loadingText[language as keyof typeof loadingText] || loadingText.english;

  return (
    <div className="flex flex-col justify-center items-center py-8 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
};

// Loading component for Suspense fallback
const EventsPageLoading = () => (
  <div className="flex flex-col">
    <main className="flex flex-col mt-0 w-full bg-white max-md:mt-0 gap-[24px]">
      {/* Loading Spinner at top */}
      <LoadingSpinner />

      <div className="animate-pulse">
        <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16 py-6 max-md:px-5">
          {/* Calendar Skeleton */}
          <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* Event Slider Skeleton */}
              <div className="mb-8">
                <div className="h-8 bg-gray-200 rounded mb-4 w-48"></div>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Event List Skeleton */}
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded mb-4 w-48"></div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-lg p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-200 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advertisement Sidebar Skeleton */}
            <div className="md:col-span-1">
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
);

const EventsContent: React.FC = () => {
    const [year, setYear] = useState<number | null>(2025);
    const [month, setMonth] = useState<number | null>(6);
    const [day, setDay] = useState<number | null>(15);
    const [pageLoading, setPageLoading] = useState(true);
    const { language } = useLanguage();

    // Fetch events data to check loading states
    const { data: eventsData, error: eventsError, isLoading: eventsLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/events/active`,
        fetcher
    );

    // Manage overall page loading state
    useEffect(() => {
        const allDataLoaded = !eventsLoading;
        
        if (allDataLoaded && pageLoading) {
            // Add a small delay for smooth transition
            setTimeout(() => {
                setPageLoading(false);
            }, 500);
        }
    }, [eventsLoading, pageLoading]);

    // Show loading state until all data is loaded
    if (pageLoading) {
        return (
            <div className="flex flex-col">
                <main className="flex flex-col mt-0 w-full bg-white max-md:mt-0 gap-[24px]">
                    <LoadingSpinner language={language} />
                    <div className="animate-pulse">
                        <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16 py-6 max-md:px-5">
                            {/* Calendar Skeleton */}
                            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2">
                                    {/* Event Slider Skeleton */}
                                    <div className="mb-8">
                                        <div className="h-8 bg-gray-200 rounded mb-4 w-48"></div>
                                        <div className="h-64 bg-gray-200 rounded-lg"></div>
                                    </div>

                                    {/* Event List Skeleton */}
                                    <div className="space-y-4">
                                        <div className="h-8 bg-gray-200 rounded mb-4 w-48"></div>
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="bg-gray-100 rounded-lg p-6">
                                                <div className="flex gap-4">
                                                    <div className="w-24 h-24 bg-gray-200 rounded"></div>
                                                    <div className="flex-1 space-y-2">
                                                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Advertisement Sidebar Skeleton */}
                                <div className="md:col-span-1">
                                    <div className="space-y-4">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        );
    }


    return (
        <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16 py-6 max-md:px-5">
            <Calendar
                year={year}
                month={month}
                day={day}
                setYear={setYear}
                setMonth={setMonth}
                setDay={setDay}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <EventSlider />
                    <EventList
                        year={year}
                        month={month}
                        day={day}
                    />
                </div>
                <div className="md:col-span-1">
                    <AdvertisementSidebar 
                    numberOfAds={4}
                    adPageName="events"
                     />
                </div>
            </div>
        </section>
    );
};

export default EventsContent;
