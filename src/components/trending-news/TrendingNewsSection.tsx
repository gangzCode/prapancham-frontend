"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { TitleWithUnderline } from "../ui/title-with-underline";
import useSWR from "swr";
import { useLanguage } from "@/components/ui/LanguageProvider";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface NewsItem {
  _id: string;
  title: Record<string, { value: string }[]>;
  description: Record<string, { value: string }[]>;
  thumbnailImage: string;
  editorName: Record<string, { value: string }[]>;
  newsCategory: {
    name: Record<string, { name: string }[]>;
  };
  createdAt: string;
  isBreakingNews: boolean;
}

interface TrendingNewsSectionProps {
  className?: string;
}

const TrendingNewsSection: React.FC<TrendingNewsSectionProps> = ({
  className,
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isNewsPage, setIsNewsPage] = useState(false);
  const { language } = useLanguage();

  const langKey = language === "tamil" ? "ta" : language === "sinhala" ? "si" : "en";

  // Check if current URL contains 'news'
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsNewsPage(window.location.pathname.includes('news'));
    }
  }, []);

  const { data, error, isLoading } = useSWR<NewsItem[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/news/recent/5`,
    fetcher
  );

  const localeText = {
    en: {
      ObituaryUpdates: "Obituary Updates",
      justNow: "just now",
      minute: "1 minute ago",
      minutes: (n: number) => `${n} minutes ago`,
      hour: "1 hour ago",
      hours: (n: number) => `${n} hours ago`,
      days: (n: number) => `${n} day(s) ago`,
      date: (date: Date) =>
        date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    ta: {
      ObituaryUpdates: "மரண அறிவித்தல் புதுப்பிப்புகள்",
      justNow: "இப்போது",
      minute: "1 நிமிடம் முன்பு",
      minutes: (n: number) => `${n} நிமிடங்கள் முன்பு`,
      hour: "1 மணி நேரம் முன்பு",
      hours: (n: number) => `${n} மணி நேரங்கள் முன்பு`,
      days: (n: number) => `${n} நாட்களுக்கு முன்பு`,
      date: (date: Date) =>
        date.toLocaleDateString("ta", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
    },
    si: {
      ObituaryUpdates: "මරණ දැනුම්දීම යාවත්කාලීන",
      justNow: "දැන්ම",
      minute: "මිනිත්තුවකට පෙර",
      minutes: (n: number) => `${n} මිනිත්තුකට පෙර`,
      hour: "පැය එකකට පෙර",
      hours: (n: number) => `${n} පැයකට පෙර`,
      days: (n: number) => `${n} දිනකට පෙර`,
      date: (date: Date) =>
        date.toLocaleDateString("si-LK", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
    },
  };

  function getTimeAgo(dateString: string, lang: keyof typeof localeText) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return localeText[lang].justNow;
    if (diff < 3600) {
      const mins = Math.floor(diff / 60);
      if (mins === 1) return localeText[lang].minute;
      return localeText[lang].minutes(mins);
    }
    if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      if (hours === 1) return localeText[lang].hour;
      return localeText[lang].hours(hours);
    }
    if (diff < 604800) {
      const days = Math.floor(diff / 86400);
      return localeText[lang].days(days);
    }
    return localeText[lang].date(date);
  }

  const trendingNews = data?.map((newsItem) => ({
    id: newsItem._id,
    title: newsItem.title[langKey]?.[0]?.value || "",
    excerpt: newsItem.description[langKey]?.[0]?.value || "",
    image: newsItem.thumbnailImage,
    editorName: newsItem.editorName[langKey]?.[0]?.value || "",
    category: newsItem.newsCategory.name[langKey]?.[0]?.name || "",
    duration: (() => {
      const now = new Date();
      const date = new Date(newsItem.createdAt);
      const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diff < 60) return localeText[langKey as keyof typeof localeText].justNow;
      if (diff < 3600) {
        const mins = Math.floor(diff / 60);
        if (mins === 1) return localeText[langKey as keyof typeof localeText].minute;
        return localeText[langKey as keyof typeof localeText].minutes(mins);
      }
      if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        if (hours === 1) return localeText[langKey as keyof typeof localeText].hour;
        return localeText[langKey as keyof typeof localeText].hours(hours);
      }
      const days = Math.floor(diff / 86400);
      return localeText[langKey as keyof typeof localeText].days(days);
    })(),
    featured: newsItem.isBreakingNews,
  })) || [];

  const featuredNews = trendingNews.slice(0, 1)[0] || null;
  const regularNews = trendingNews.slice(1, 4);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isExpanded = (id: string) => expandedItems.includes(id);

  return (
    <section
      className={cn(
        "flex flex-wrap gap-6 justify-center px-4 md:px-8 lg:px-16 mt-6 w-full mx-auto max-md:px-5",
        className
      )}
    >
      <div className="flex justify-between items-center mb-6 w-full">
        <div className="flex-shrink min-w-0">
          <TitleWithUnderline
            text={langKey === "ta" ? "பிரபலமான செய்திகள்" : langKey === "si" ? "නවතම පුවත්" : "Trending News"}
            underlineWidth={64}
          />
        </div>
        {!isNewsPage && (
          <Link 
            href="/news"
            className="flex-shrink-0 flex items-center gap-2 text-red-800 hover:text-red-700 transition-colors"
          >
            <span className="text-sm sm:text-base md:text-heading-base">
              {langKey === "ta" ? "மேலும் பார்க்க" : langKey === "si" ? "තවත් බලන්න" : "View more"}
            </span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
        {featuredNews && (
          <Link href={`/news/${featuredNews.id}`} className="md:col-span-6 relative group overflow-hidden p-2 shadow-md block">
            <div className="relative h-[420px] overflow-hidden">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-xl hover:text-[#ea384c] md:text-2xl font-bold leading-tight mb-2">
                    {featuredNews.title}
                  </h3>
                  <p className="text-sm text-gray-200 mb-2">
                    <span className="text-[#ea384c] font-medium ml-1 hover:underline focus:outline-none">
                      {langKey === "ta" ? "மேலும் படிக்க" : langKey === "si" ? "තවත් කියවන්න" : "Read more"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center text-xs md:text-sm mt-2 justify-between">
              <span className="flex items-center text-[#737373]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16a4 4 0 0 1 4 4H8a4 4 0 0 1 4-4z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {featuredNews.editorName}
              </span>
              <div className="flex item-center gap-4">
                <span className="text-[#ea384c]">
                  {featuredNews.category}
                </span>
                <span>•</span>
                <span className="text-[#737373]">
                  {featuredNews.duration}
                </span>
              </div>
            </div>
          </Link>
        )}

        <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {regularNews.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="relative group overflow-hidden shadow-sm flex flex-col p-2 block"
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <div className="absolute bottom-0 p-3 text-white">
                    <h3 className="text-sm font-bold line-clamp-2 mb-1 group-hover:text-[#ea384c] transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-200">
                      <span className="text-[#ea384c] font-medium hover:underline focus:outline-none">
                        {langKey === "ta" ? "மேலும் படிக்க" : langKey === "si" ? "තවත් කියවන්න" : "Read more"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center text-xs mt-2 justify-between">
                <span className="flex items-center text-[#737373]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16a4 4 0 0 1 4 4H8a4 4 0 0 1 4-4z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {news.editorName}
                </span>
                <div className="flex item-center gap-2">
                  <span className="text-[#ea384c]">{news.category}</span>
                  <span>•</span>
                  <span className="text-[#737373]">{news.duration}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNewsSection;
