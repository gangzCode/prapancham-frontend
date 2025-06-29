"use client";
import React, { useState, useEffect, useMemo } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/ui/LanguageProvider";
import useSWR from "swr";
import { TitleWithUnderline } from "../ui/title-with-underline";
import NewsCard, { NewsCardProps } from "./NewsCard";
import ObituaryCard from "../hero/ObituaryCard";
import { ObituaryEntry } from "../hero/types";

const tabNames = {
  en: { recent: "Recent News", important: "Important News" },
  ta: { recent: "சமீபத்திய செய்திகள்", important: "முக்கிய செய்திகள்" },
  si: { recent: "මෑත පුවත්", important: "වැදගත් පුවත්" },
};

type LanguageKey = "en" | "ta" | "si";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useLocalizedNews = (endpoint: string, langKey: LanguageKey) => {
  const { data, error } = useSWR(endpoint, fetcher);

  const getTimeAgo = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMins < 1) return localeText[langKey].justNow;
    if (diffMins === 1) return localeText[langKey].minute;
    if (diffMins < 60) return localeText[langKey].minutes(diffMins);
    if (diffHrs === 1) return localeText[langKey].hour;
    if (diffHrs < 24) return localeText[langKey].hours(diffHrs);
    return localeText[langKey].days(diffDays);
  };

  const news: NewsCardProps[] = useMemo(() => {
    if (!data || error) return [];

    return data.map((item: any) => ({
      id: item._id,
      title: item.title?.[langKey]?.[0]?.value || "",
      image: item.thumbnailImage || item.mainImage || "",
      category:
        item.newsCategory?.name?.[langKey]?.[0]?.value ||
        item.newsCategory?.name?.en?.[0]?.value ||
        "",
      timeAgo: getTimeAgo(item.createdAt),
      description: item.description?.[langKey]?.[0]?.value || "",
      editorName: item.editorName?.[langKey]?.[0]?.value || "",
    }));
  }, [data, error, langKey]);

  return { news, loading: !data && !error };
};


interface NewsTabsSectionProps {
  className?: string;
}

const NewsTabsSection: React.FC<NewsTabsSectionProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<"recent" | "important">("recent");
  const [obituaryData, setObituaryData] = useState<ObituaryEntry[]>([]);

  const { language } = useLanguage();

  let langKey: LanguageKey = "en";
  if (language === "tamil") langKey = "ta";
  else if (language === "sinhala") langKey = "si";

  const { data: obituaryDataResponse, error: obituaryError } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/order/priority`,
    fetcher
  );

  useEffect(() => {
    if (!obituaryDataResponse || obituaryError) return;

    const transformed = obituaryDataResponse.orders.map((order: any) => ({
      _id: order._id,
      title: order.information.shortDescription,
      name: order.information.title,
      date: localeText[langKey].date(new Date(order.information.dateofDeath)),
      address: order.information.address,
      imageUrl: order.thumbnailImage || order.primaryImage,
      condolences: order.selectedAddons?.length || 0,
    }));

    setObituaryData(transformed);
  }, [obituaryDataResponse, obituaryError, langKey]);

  const { news: recentNews } = useLocalizedNews(
    `${process.env.NEXT_PUBLIC_API_URL}/news/recent/5`,
    langKey
  );
  const { news: importantNews } = useLocalizedNews(
    `${process.env.NEXT_PUBLIC_API_URL}/news/important-news/10`,
    langKey
  );

  const displayedNews = activeTab === "recent" ? recentNews : importantNews;

  return (
    <div className={cn("px-4 md:px-8 lg:px-16 py-6", className)}>
      <div className="flex flex-col md:flex-row w-full gap-6">
        {/* Left Column - News Tabs */}
        <div className="min-w-60 w-full">
          <div className="flex border border-primary p-2 rounded-lg mb-4 w-[20rem] justify-center items-center mx-auto">
            <button
              className={cn(
                "py-2 w-full font-medium text-sm border-b-2 -mb-px",
                activeTab === "recent"
                  ? "bg-primary text-white font-bold"
                  : "border-transparent text-[#0D1322] hover:text-gray-900"
              )}
              onClick={() => setActiveTab("recent")}
            >
              {tabNames[langKey].recent}
            </button>
            <button
              className={cn(
                "py-2 w-full font-medium text-sm border-b-2 -mb-px",
                activeTab === "important"
                  ? "bg-primary text-white font-bold"
                  : "border-transparent text-gray-700 hover:text-gray-900"
              )}
              onClick={() => setActiveTab("important")}
            >
              {tabNames[langKey].important}
            </button>
          </div>

          <ScrollArea className="h-[790px] pr-0 md:pr-4">
            <div className="space-y-6">
              {displayedNews.map((news, id) => (
                <div
                  key={id}
                  className="relative group bg-white p-4 shadow-sm md:mr-5 hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full md:w-48">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full aspect-[1/1] object-cover"
                      />
                    </div>
                    <div className="w-full flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold">{news.title}</h3>
                        <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                          {news.description}
                          <a
                            href={`/news/${news.id}`}
                            className="text-red-600 ml-1 hover:underline"
                          >
                            {localeText[langKey].ReadMore}
                          </a>
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                        <span>{news.editorName}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-red-600">{news.category}</span>
                          <span>• {news.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Column - Obituary Updates */}
        <div>
          <aside className="self-stretch rounded-2xl min-h-[516px] min-w-60 w-[375px]">
            <div className="flex-shrink min-w-0 max-w-full">
              <TitleWithUnderline
                text={localeText[langKey].ObituaryUpdates}
                underlineWidth={64}
              />
            </div>
            <div className="flex flex-1 gap-2 justify-center px-1 py-2 mt-4 h-full">
              <ScrollArea className="flex flex-1 gap-2 justify-center mt-4 size-full h-[456px]">
                <div className="overflow-hidden flex-1 shrink basis-0 min-w-60 pr-0 md:pr-4">
                  {obituaryData.map((entry, index) => (
                    <div key={index} className={index > 0 ? "mt-2" : ""}>
                      <ObituaryCard entry={entry} />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsTabsSection;

const localeText = {
  en: {
    ReadMore: "Read more",
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
    ReadMore: "மேலும் வாசிக்க",
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
    ReadMore: "වැඩිදුර කියවන්න",
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
