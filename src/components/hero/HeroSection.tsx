"use client";

import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { TitleWithUnderline } from "../ui/title-with-underline";
import { ObituaryEntry } from "./types";
import BreakingNewsCard from "./BreakingNewsCard";
import ObituaryCard from "./ObituaryCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useSWR from "swr";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { ArrowRight } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Skeleton Loader Components
const BreakingNewsSkeleton = () => (
  <article className="flex-1 shrink self-stretch my-auto basis-0 min-w-60 shadow-[0px_0px_12px_rgba(0,0,0,0.06)] max-md:max-w-full">
    <div className="flex relative flex-col justify-end w-full min-h-[516px] max-md:max-w-full animate-pulse">
      <div className="absolute inset-0 bg-gray-200"></div>
      <div className="relative z-10 p-6 bg-gradient-to-t from-black/60 to-transparent">
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
);

const ObituarySkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex gap-3">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="flex justify-between items-center">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const HeroSectionSkeleton = () => (
  <section className="flex flex-wrap gap-6 justify-center items-center px-4 md:px-8 lg:px-16 mt-6 w-full max-md:px-5 max-md:max-w-full">
    <BreakingNewsSkeleton />
    <aside className="self-stretch rounded-2xl min-h-[516px] min-w-60 w-[375px]">
      <div className="flex-shrink min-w-0 max-w-full">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-1 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      <div className="flex flex-1 gap-2 justify-center px-1 py-2 mt-4 h-full">
        <div className="flex flex-1 justify-center items-start h-[456px]">
          <ObituarySkeleton />
        </div>
      </div>
    </aside>
  </section>
);

type NewsItem = {
  id: string;
  backgroundImage: string;
  timestamp: string;
  title: string;
  description: string;
  date: string;
};

type LanguageKey = "en" | "ta" | "si";

const localeText = {
  en: {
    ObituaryUpdates: "Obituary Updates",
    noObituaries: "No obituaries available",
    checkBackLater: "Check back later for updates",
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
    noObituaries: "மரண அறிவித்தல்கள் இல்லை",
    checkBackLater: "புதுப்பிப்புகளுக்கு பின்னர் சரிபார்க்கவும்",
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
    noObituaries: "මරණ දැනුම්දීම් නොමැත",
    checkBackLater: "යාවත්කාලීන කිරීම් සඳහා පසුව පරීක්ෂා කරන්න",
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

const getTimeDifference = (updatedAt: string, langKey: LanguageKey): string => {
  const updatedTime = new Date(updatedAt).getTime();
  const currentTime = new Date().getTime();
  const diffInMs = currentTime - updatedTime;
  const diffInMins = Math.floor(diffInMs / 60000);
  const t = localeText[langKey];

  if (diffInMins < 1) return t.justNow;
  if (diffInMins === 1) return t.minute;
  if (diffInMins < 60) return t.minutes(diffInMins);

  const diffInHours = Math.floor(diffInMins / 60);
  if (diffInHours === 1) return t.hour;
  if (diffInHours < 24) return t.hours(diffInHours);

  const diffInDays = Math.floor(diffInHours / 24);
  return t.days(diffInDays);
};

const HeroSection = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsDataList, setNewsDataList] = useState<NewsItem[]>([]);
  const [obituaryData, setObituaryData] = useState<ObituaryEntry[]>([]);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/news/breaking-news/10`,
    fetcher
  );
  const { data: obituaryDataResponse, error: obituaryError, isLoading: obituaryLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/order/priority`,
    fetcher
  );

  let langKey: LanguageKey = "en";
  if (language === "tamil") langKey = "ta";
  else if (language === "sinhala") langKey = "si";

  useEffect(() => {
    if (!data || error) return;

    const transformedData: NewsItem[] = data.map((item: any) => ({
      id: item._id,
      backgroundImage:
        item.mainImage || "/images/Prapancham-logo.png",
      timestamp: getTimeDifference(item.updatedAt, langKey),
      title: item.title?.[langKey]?.[0]?.value || "No title",
      description: item.description?.[langKey]?.[0]?.value || "No description",
      date: localeText[langKey].date(new Date(item.updatedAt)),
    }));

    setNewsDataList(transformedData);
  }, [data, error, langKey]);

  useEffect(() => {
    if (!obituaryDataResponse || obituaryError) return;

    const transformedObituaryData: ObituaryEntry[] = obituaryDataResponse.orders.map(
      (order: any) => ({
        _id: order._id,
        title: order.information.shortDescription,
        name: order.information.title
          || ((order.information.firstName && order.information.lastName && order.information.preferredName)
            ? `${order.information.firstName} ${order.information.lastName} (${order.information.preferredName})`
            : (order.information.firstName && order.information.lastName)
              ? `${order.information.firstName} ${order.information.lastName}`
              : order.information.preferredName
          ),
        date: localeText[langKey].date(new Date(order.information.dateofDeath)),
        address: order.information.address,
        imageUrl: order.thumbnailImage || order.primaryImage,
        condolences: order.tributeItems ? order.tributeItems.length : 0,
      })
    );

    setObituaryData(transformedObituaryData);
  }, [obituaryDataResponse, obituaryError, langKey]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % newsDataList.length);
  }, [newsDataList.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [handleNext]);

  const currentNews = newsDataList[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < newsDataList.length - 1;

  return (
    <section className="flex flex-wrap gap-6 justify-center items-center px-4 md:px-8 lg:px-16 mt-6 w-full max-md:px-5 max-md:max-w-full">
      {isLoading ? (
        <BreakingNewsSkeleton />
      ) : currentNews ? (
        <article className="flex-1 shrink self-stretch my-auto basis-0 min-w-60 shadow-[0px_0px_12px_rgba(0,0,0,0.06)] max-md:max-w-full">
          <div className="flex relative flex-col justify-end w-full min-h-[516px] max-md:max-w-full">
            <Image
              src={currentNews.backgroundImage || "/images/Prapancham-logo.png"}
              alt="News background"
              width={700}
              height={516}
              className="object-cover absolute inset-0 size-full"
            />
            <BreakingNewsCard
              {...currentNews}
              onPrevious={handlePrevious}
              onNext={handleNext}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
            />
          </div>
        </article>
      ) : null}

      <aside className="self-stretch rounded-2xl min-h-[516px] min-w-60 w-[375px]">
        <div className="flex-shrink min-w-0 max-w-full">
          <TitleWithUnderline
            text={localeText[langKey].ObituaryUpdates}
            underlineWidth={64}
          />
        </div>
        <div className="flex flex-1 gap-2 justify-center px-1 py-2 mt-4 h-full">
          {obituaryLoading ? (
            <div className="flex flex-1 justify-center items-start h-[456px] w-full">
              <ObituarySkeleton />
            </div>
          ) : obituaryData.length === 0 ? (
            <div className="flex flex-1 justify-center items-center h-[456px]">
              <div className="text-center text-gray-500">
                <p className="text-lg font-medium mb-2">{localeText[langKey].noObituaries}</p>
                <p className="text-sm">{localeText[langKey].checkBackLater}</p>
              </div>
            </div>
          ) : (
            <ScrollArea className="flex flex-1 gap-2 justify-center mt-4 size-full h-[456px] pr-6 md:pr-4">
              <div className="overflow-hidden flex-1 shrink basis-0 min-w-60">
                {obituaryData.map((entry, index) => (
                  <div key={index} className={index > 0 ? "mt-2" : ""}>
                    <ObituaryCard entry={entry} />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex float-right mr-4">
                <button
                  className="flex-shrink-0 flex items-center gap-2 text-red-800 hover:text-red-700 transition-colors"
                  onClick={() => {
                    window.location.href = "/obituary";
                  }
                  }
                >
                  <span className="text-sm sm:text-base md:text-heading-base">
                    {langKey === "ta"
                      ? "மேலும் பார்க்க"
                      : langKey === "si"
                        ? "தවत් බලන්න"
                        : "View more"}
                  </span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          )}
        </div>
      </aside>
    </section>
  );
};

export default HeroSection;