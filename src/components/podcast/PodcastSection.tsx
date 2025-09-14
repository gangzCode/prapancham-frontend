"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Play, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { TitleWithUnderline } from "../ui/title-with-underline";
import useSWR from "swr";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { useSearchParams } from "next/navigation";

interface PodcastEpisode {
  id: number;
  title: string;
  host: string;
  episode: number;
  duration: string;
  image: string;
  category: string;
}

interface PodcastSectionProps {
  title?: string;
  showViewMore?: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PodcastSectionContent = ({
  title,
  showViewMore = true,
}: PodcastSectionProps) => {
  const { language } = useLanguage();
  const searchParams = useSearchParams();

  const langKey = language === "tamil" ? "ta" : language === "sinhala" ? "si" : "en";

  // Localization object
  type LanguageKey = 'en' | 'ta' | 'si';
  const translations: Record<LanguageKey, { [key: string]: string }> = {
    en: {
      ourPodcast: "Our Podcast",
      viewMore: "View more",
      loading: "Loading...",
      playPodcast: "Play podcast",
      all: "All",
    },
    ta: {
      ourPodcast: "எங்கள் போட்காஸ்ட்",
      viewMore: "மேலும் பார்க்க",
      loading: "ஏற்றுகிறது...",
      playPodcast: "போட்காஸ்ட் இயக்கு",
      all: "அனைத்தும்",
    },
    si: {
      ourPodcast: "අපගේ පොඩ්කාස්ට්",
      viewMore: "තවත් බලන්න",
      loading: "පූරණය වෙමින්...",
      playPodcast: "පොඩ්කාස්ට් වාදනය කරන්න",
      all: "සියල්ල",
    },
  };

  const t = translations[langKey];
  const [activeCategory, setActiveCategory] = useState(t.all);

  // Handle URL parameter for podcast category
  useEffect(() => {
    const podcastCategory = searchParams.get('podcastCategory');
    if (podcastCategory) {
      const decodedCategory = decodeURIComponent(podcastCategory);
      setActiveCategory(decodedCategory);
      
      // Scroll to this section when coming from dropdown navigation
      setTimeout(() => {
        const section = document.querySelector('#podcast-section');
        if (section) {
          section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
      
      // Remove the parameter from URL without triggering a navigation
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('podcastCategory');
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [searchParams]);

  const { data: categoryData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/podcast/categories`,
    fetcher
  );

  const categories = [
    { en: t.all, ta: t.all, si: t.all },
    ...(categoryData?.categories || []).map((category: any) => ({
      en: category.en[0]?.value,
      ta: category.ta[0]?.value,
      si: category.si[0]?.value,
    })),
  ];

  const sanitizeCategory = (category: string) =>
    category.replace(/\s+/g, "").toLowerCase();

  const { data: podcastData } = useSWR(
    activeCategory === t.all
      ? `${process.env.NEXT_PUBLIC_API_URL}/podcast`
      : `${process.env.NEXT_PUBLIC_API_URL}/podcast/${sanitizeCategory(categories.find((cat) => cat.en === activeCategory)?.en || "" )}`,
    fetcher
  );

 const podcasts = (podcastData?.podcasts || []).map((podcast: any) => ({

    id: podcast._id,
    title: podcast.title[langKey]?.[0]?.value || "",
    description: podcast.description[langKey]?.[0]?.value || "",
    host: podcast.creatorName[langKey]?.[0]?.value || "",
    duration: podcast.podcastRunTime,
    image: podcast.image,
    category: podcast.podcastCategory[langKey]?.[0]?.value || "",
    podcastLink: podcast.podcastLink || "",
  }));

  const handlePlayClick = (podcast: any) => {
    if (podcast.podcastLink) {
      // Clean the URL by removing any surrounding quotes and whitespace
      const cleanUrl = podcast.podcastLink.replace(/^["']|["']$/g, '').trim();
      
      // Open the cleaned URL in a new tab
      window.open(cleanUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const generateWaveform = () => {
    const bars = [];
    for (let i = 0; i < 30; i++) {
      const height = Math.random() * 20 + 5;
      bars.push(
        <div
          key={i}
          className="w-[3px] bg-gray-300 mx-[1px] rounded-sm"
          style={{ height: `${height}px` }}
        />
      );
    }
    return bars;
  };

  return (
    <section id="podcast-section" className=" px-4 md:px-8 lg:px-16  space-y-8 py-8" data-section="podcast">
      <div className="flex justify-between items-center">
        <div className="flex-shrink min-w-0">
          <TitleWithUnderline text={title || t.ourPodcast} underlineWidth={64} />
        </div>
        {showViewMore && (
          <button className="flex-shrink-0 flex items-center gap-2 text-red-800 hover:text-red-700 transition-colors">
            <span className="text-sm sm:text-base md:text-heading-base">
              {t.viewMore}
            </span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        )}
      </div>

      <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
        <div className="flex justify-start md:justify-center items-center min-w-max px-2">
          {categories.map((category, index) => (
            <React.Fragment key={category.en}>
              <Button
                variant="ghost"
                className={cn(
                  "rounded-none border-none whitespace-nowrap",
                  activeCategory === category.en
                    ? "text-secondary font-medium"
                    : "text-gray-600"
                )}
                onClick={() => setActiveCategory(category.en)}
              >
                {category[langKey]}
              </Button>
              {index < categories.length - 1 && (
                <Separator orientation="vertical" className="h-6 mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {podcasts.map((podcast: { id: React.Key | null | undefined; host: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; duration: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; image: string | undefined; }) => (
          <div
            key={podcast.id}
            className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-secondary font-medium">{podcast.host}</p>
                  <h3 className="text-xl font-bold">{podcast.title}</h3>
                </div>
                <span className="text-sm text-gray-500">
                  {podcast.duration}
                </span>
              </div>

              <div className="aspect-video rounded-md overflow-hidden mb-4">
                <img
                  src={podcast.image}
                  alt={typeof podcast.title === "string" ? podcast.title : ""}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center h-[30px] w-full justify-between">
                  {generateWaveform()}
                </div>

                <div className="flex justify-between items-center w-full">
                  <div className="text-sm text-gray-500">
                    00:00
                  </div>

                  <button
                    className="rounded-full bg-primary text-white p-2 hover:bg-primary/90 transition-colors"
                    onClick={() => handlePlayClick(podcast)}
                    aria-label={t.playPodcast}
                  >
                    <Play className="w-4 h-4" />
                  </button>

                  <div className="text-sm text-gray-500">
                    {typeof podcast.duration === "string"
                      ? podcast.duration.replace("hr", ":").replace("mins", "")
                      : podcast.duration ?? ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const PodcastSection = (props: PodcastSectionProps) => {
  const { language } = useLanguage();
  const langKey = language === "tamil" ? "ta" : language === "sinhala" ? "si" : "en";
  
  const translations: Record<'en' | 'ta' | 'si', { [key: string]: string }> = {
    en: { loading: "Loading..." },
    ta: { loading: "ஏற்றுகிறது..." },
    si: { loading: "පූරණය වෙමින්..." },
  };

  return (
    <Suspense fallback={<div>{translations[langKey].loading}</div>}>
      <PodcastSectionContent {...props} />
    </Suspense>
  );
};

export default PodcastSection;
