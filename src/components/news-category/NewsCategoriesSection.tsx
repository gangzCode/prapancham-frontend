"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewsCategoryBlock from "./NewsCategoryBlock";
import AdvertisementSidebar from "./AdvertisementSidebar";
import { NewsCardProps } from "./NewsCard";
import { useLanguage } from "../ui/LanguageProvider";
import useSWR from "swr";

type LanguageKey = "en" | "ta" | "si";

interface LocalizedField {
  name: string;
  value: string;
  _id: string;
}

interface NewsCategory {
  category: {
    name: Record<LanguageKey, LocalizedField[]>;
    _id: string;
    isDeleted: boolean;
    isActive: boolean;
  };
  news: NewsCardProperties[];
}

export interface NewsCardProperties {
  title: Record<LanguageKey, LocalizedField[]>;
  thumbnailImage: string;
  category: string;
  timeAgo: string;
  editorName: Record<LanguageKey, LocalizedField[]>;
  createdAt: string;
  newsCategory: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NewsCategoriesSection: React.FC = () => {
  const { language } = useLanguage();
  const langKey: LanguageKey =
    language === "tamil" ? "ta" : language === "sinhala" ? "si" : "en";

  const { data, error } = useSWR<NewsCategory[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/news/grouped-by-category`,
    fetcher
  );

  const getLocalizedValue = (
    items: LocalizedField[],
    matchKeys: string[]
  ): string => {
    const lowerKeys = matchKeys.map((key) => key.toLowerCase());
    const found = items.find((item) =>
      lowerKeys.includes(item.value.toLowerCase())
    );
    return found?.value || items[0]?.value || "";
  };

  const getTimeAgo = (dateString: string, lang: "en" | "ta" | "si"): string => {
    const map = {
      en: {
        minutes: "minutes",
        minute: "minute",
        hours: "hours",
        hour: "hour",
        days: "days",
        day: "day",
        ago: "ago",
        justNow: "Just now",
      },
      ta: {
        minutes: "நிமிடங்கள்",
        minute: "நிமிடம்",
        hours: "மணிநேரங்கள்",
        hour: "மணிநேரம்",
        days: "நாட்கள்",
        day: "நாள்",
        ago: "முன்பு",
        justNow: "இப்போது",
      },
      si: {
        minutes: "මිනිත්තු",
        minute: "මිනිත්තුව",
        hours: "පැය",
        hour: "පැය",
        days: "දින",
        day: "දින",
        ago: "කට පෙර",
        justNow: "දැන්ම",
      },
    };

    const dict = map[lang];

    const now = new Date();
    const created = new Date(dateString);
    const diffMs = now.getTime() - created.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0)
      return `${days} ${days > 1 ? dict.days : dict.day} ${dict.ago}`;
    if (hours > 0)
      return `${hours} ${hours > 1 ? dict.hours : dict.hour} ${dict.ago}`;
    if (minutes > 0)
      return `${minutes} ${minutes > 1 ? dict.minutes : dict.minute} ${dict.ago}`;
    return dict.justNow;
  };

  return (
    <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16  py-6 max-md:px-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left side scrollable news section - 2/3 width on desktop */}
        <div className="md:col-span-2">
          <ScrollArea className="h-[1400px] lg:h-[1570px]  md:border-r-[10px] md:border-gray-200">
            {data?.map((category, index) => (
              <NewsCategoryBlock
                key={index}
                title={getLocalizedValue(category.category.name[langKey], [
                  "Headline",
                  "தலைப்பு",
                  "මාතෘකාව",
                ])}
                news={category.news.map((newsItem) => ({
                  _id: (newsItem as any)._id,
                  title: getLocalizedValue(newsItem.title[langKey], [
                    "Headline",
                    "தலைப்பு",
                    "මාතෘකාව",
                  ]),
                  editor: getLocalizedValue(
                    newsItem.editorName?.[langKey] || [],
                    ["Editor", "ஆசிரியர்", "සම්පත්කරු"]
                  ),
                  image: newsItem.thumbnailImage || "",
                  category: getLocalizedValue(
                    category.category.name[langKey],
                    ["News", "செய்தி", "පුවත්"]
                  ),
                  timeAgo: getTimeAgo(newsItem.createdAt, langKey),
                  className: undefined,
                }))}
                adImage=""
              />
            ))}
          </ScrollArea>
        </div>

        {/* Right side advertisement section - 1/3 width on desktop */}
        <div className="md:col-span-1">
          <AdvertisementSidebar
            numberOfAds={4}
            adPageName="home"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsCategoriesSection;