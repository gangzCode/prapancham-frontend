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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type NewsItem = {
  id: number;
  backgroundImage: string;
  timestamp: string;
  title: string;
  description: string;
  date: string;
};

type LanguageKey = "en" | "ta" | "si";

const localeText = {
  en: {
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
    justNow: "දැන්ම",
    minute: "මිනිත්තුවකට පෙර",
    minutes: (n: number) => `${n} මිනිත්තුකට පෙර`,
    hour: "පැය එකකට පෙර",
    hours: (n: number) => `${n} පැයකට පෙර`,
    days: (n: number) => `${n} දිනකට පෙර`,
    date: (date: Date) =>
      date.toLocaleDateString("si", {
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
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/news/breaking-news/10`,
    fetcher
  );

  let langKey: LanguageKey = "en";
  if (language === "tamil") langKey = "ta";
  else if (language === "sinhala") langKey = "si";

  useEffect(() => {
    if (!data || error) return;

    const transformedData: NewsItem[] = data.map((item: any) => ({
      id: Number(item._id),
      backgroundImage:
        item.mainImage || "https://randomuser.me/api/portraits/men/95.jpg",
      timestamp: getTimeDifference(item.updatedAt, langKey),
      title: item.title?.[langKey]?.[0]?.value || "No title",
      description: item.description?.[langKey]?.[0]?.value || "No description",
      date: localeText[langKey].date(new Date(item.updatedAt)),
    }));

    setNewsDataList(transformedData);
  }, [data, error, langKey]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(newsDataList.length - 1, prev + 1));
  }, [newsDataList]);

  const currentNews = newsDataList[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < newsDataList.length - 1;

  const obituaryData: ObituaryEntry[] = [
    {
      title: "31st day ceremony after death",
      name: "Mr. Nadesh Rasathurai",
      date: "15/02/2025",
      address: "42, Jalan Tun Razak, Brickfields, Kuala Lumpur",
      imageUrl: "https://randomuser.me/api/portraits/men/75.jpg",
      condolences: 4,
    },
    {
      title: "31st day ceremony after death",
      name: "Mr. Nadesh Rasathurai",
      date: "18/02/2025",
      address: "15, Temple Road, Wellawatte, Colombo",
      imageUrl: "https://randomuser.me/api/portraits/men/82.jpg",
      condolences: 4,
    },
    {
      title: "31st day ceremony after death",
      name: "Mr. Nadesh Rasathurai",
      date: "20/02/2025",
      address: "28, Serangoon Road, Little India, Singapore",
      imageUrl: "https://randomuser.me/api/portraits/men/91.jpg",
      condolences: 4,
    },
    {
      title: "31st day ceremony after death",
      name: "Mr. Nadesh Rasathurai",
      date: "22/02/2025",
      address: "63, Lebuh Ampang, George Town, Penang",
      imageUrl: "https://randomuser.me/api/portraits/men/85.jpg",
      condolences: 4,
    },
    {
      title: "31st day ceremony after death",
      name: "Mr. Nadesh Rasathurai",
      date: "25/02/2025",
      address: "89, Jalan Masjid India, Kuala Lumpur",
      imageUrl: "https://randomuser.me/api/portraits/men/92.jpg",
      condolences: 4,
    },
    {
      title: "31st day ceremony after death",
      name: "Mr. Nadesh Rasathurai",
      date: "28/02/2025",
      address: "37, Race Course Road, Little India, Singapore",
      imageUrl: "https://randomuser.me/api/portraits/men/95.jpg",
      condolences: 4,
    },
  ];

  return (
    <section className="flex flex-wrap gap-6 justify-center items-center px-4 md:px-8 lg:px-16 mt-6 w-full max-md:px-5 max-md:max-w-full">
      {currentNews && (
        <article className="flex-1 shrink self-stretch my-auto basis-0 min-w-60 shadow-[0px_0px_12px_rgba(0,0,0,0.06)] max-md:max-w-full">
          <div className="flex relative flex-col justify-end w-full min-h-[516px] max-md:max-w-full">
            <Image
              src={currentNews.backgroundImage}
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
      )}

      <aside className="self-stretch rounded-2xl min-h-[516px] min-w-60 w-[375px]">
        <div className="flex-shrink min-w-0 max-w-full">
          <TitleWithUnderline text="Obituary Updates" underlineWidth={64} />
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
    </section>
  );
};

export default HeroSection;