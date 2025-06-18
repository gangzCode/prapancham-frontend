"use client";
import React from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { Clock } from "lucide-react";
import RelevantNewsSection from "@/components/news-individual/RelevantNewsSection";
import { Separator } from "@/components/ui/separator";
import AdvertisementSidebar from "@/components/news-category/AdvertisementSidebar";
import { useLanguage } from "@/components/ui/LanguageProvider";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";

type LanguageKey = "en" | "ta" | "si";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NewsIndividual: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const { language } = useLanguage();

  let langKey: LanguageKey = "en";
  if (language === "tamil") langKey = "ta";
  else if (language === "sinhala") langKey = "si";

  const { data, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/news/${id}` : null,
    fetcher
  );

  if (error) {
    <div className="text-red-500 p-4">
      {localeText[langKey]?.failedToLoad || "Failed to load news."}
    </div>;
  }

  if (!data || !data.news) {
    return <LoadingSpinner message={localeText[langKey]?.loading || "Loading..."} />;
  }

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

  const news = data.news;
  const localizedTitle = news.title[langKey]?.[0]?.value || news.title.en[0]?.value;
  const localizedDescription = news.description[langKey]?.[0]?.value || news.description.en[0]?.value;
  const localizedParagraphs = news.paragraphs.map(
    (para: { [key: string]: { value: any }[] }) =>
      (para[langKey]?.map((p: { value: any }) => p.value) ?? para.en.map((p: { value: any }) => p.value))
  ).flat();
  // console.log("Localized Paragraphs:", localizedParagraphs);

  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col justify-center px-4 md:px-8 lg:px-16 py-6 max-md:px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-6">
              <img
                src={news.mainImage}
                alt={localizedTitle}
                className="w-full h-auto max-h-[450px] object-cover"
              />
              <div className="flex items-center gap-2 mt-4 justify-between">
                <div className="flex items-center gap-2">
                  {news.isBreakingNews && (
                    <span className="text-red-600 font-semibold text-sm uppercase">
                      {langKey === "ta"
                        ? "அவசரச் செய்தி"
                        : langKey === "si"
                          ? "අවස්ථානුකූල පුවත්"
                          : "Breaking News"}
                    </span>
                  )}
                  {news.isImportantNews && (
                    <span className="text-yellow-600 font-semibold text-sm uppercase">
                      {langKey === "ta"
                        ? "முக்கிய செய்தி"
                        : langKey === "si"
                          ? "ප්‍රධාන පුවත්"
                          : "Important News"}
                    </span>
                  )}
                  <span className="text-gray-500 text-xs flex items-center">
                    • <Clock className="w-3 h-3 ml-1 mr-1" /> {getTimeAgo(news.createdAt)}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {localeText[langKey].date(new Date(news.createdAt))}
                </span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              {localizedTitle}
            </h1>

            <div className="prose max-w-none mb-6">
              <p className="mb-4">{localizedDescription}</p>
              {(() => {
                const total = localizedParagraphs.length;
                const aboveCount = Math.ceil(total / 2);
                const belowCount = total - aboveCount;
                return (
                  <>
                    {localizedParagraphs.slice(0, aboveCount).map((paragraph: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </>
                );
              })()}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              {news.otherImages.map((image: string | undefined, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-[320px] object-cover"
                />
              ))}
            </div>
            <div className="prose max-w-none mb-6">
              {/* <p className="mb-4">{localizedDescription}</p> */}
              {(() => {
                const total = localizedParagraphs.length;
                const aboveCount = Math.ceil(total / 2);
                const belowCount = total - aboveCount;
                return (
                  <>
                    {localizedParagraphs.slice(belowCount).map((paragraph: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </>
                );
              })()}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <img
                src="https://images.unsplash.com/photo-1607083206968-13611e3d76db"
                alt="Healthcare innovation"
                className="w-full h-[336px] object-cover "
              />
              <img
                src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae"
                alt="Medical technology"
                className="w-full h-[336px] object-cover "
              />
            </div>
          </div>


          <div className="md:col-span-1">
            <AdvertisementSidebar numberOfAds={6} />
          </div>
        </div>
      </div>

      <RelevantNewsSection
        relatedNews={data.relatedNews}
        differentCategoryNews={data.differentCategoryNews}
      />
      {/* <RelevantNewsSection /> */}
    </div>
  );
};

export default NewsIndividual;

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
    failedToLoad: "Failed to load news.",
    loading: "Loading...",
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
    failedToLoad: "செய்தியை ஏற்ற முடியவில்லை.",
    loading: "ஏற்றுகிறது...",
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
    failedToLoad: "පුවත් පූරණය කළ නොහැක.",
    loading: "පූරණය වෙමින් පවතී...",
  },
};
