import React from "react";
import NewsCategorySection from "./NewsCategorySection";
import CountriesSection from "./CountriesSection";
import { useLanguage } from "@/components/ui/LanguageProvider";
import useSWR from "swr";

type NewsItem = {
  createdAt: any;
  _id: string;
  title: any;
  description: any;
  editorName: any;
  thumbnailImage: string;
  mainImage: string;
  duration?: string;
  newsCategory?: any;
};

interface RelevantNewsSectionProps {
  relatedNews: any;
  differentCategoryNews: any;
}

const getLocalizedValue = (obj: any, lang: string = "en") => {
  if (!obj || !obj[lang] || !Array.isArray(obj[lang]) || obj[lang].length === 0)
    return "";
  return obj[lang][0].value;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useCountries = () => {
  const { language } = useLanguage();
  const langKey = language === "tamil" ? "ta" : language === "sinhala" ? "si" : "en";
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/country/active`,
    fetcher);

  const countries =
    data?.countries?.map((country: any) => getLocalizedValue(country.name, langKey)) || [];

  return { countries, error, isLoading };
};

const RelevantNewsSection: React.FC<RelevantNewsSectionProps> = ({
  relatedNews,
  differentCategoryNews,
}) => {
  const { language } = useLanguage();
  const langKey = language === "tamil" ? "ta" : language === "sinhala" ? "si" : "en";
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
  const mapNewsData = (news: NewsItem[], lang: string = langKey) =>
    news.map((item) => ({
      id: item._id,
      title: getLocalizedValue(item.title, lang),
      image: item.thumbnailImage || item.mainImage,
      category: item.newsCategory
        ? getLocalizedValue(item.newsCategory.name, lang)
        : "",
      duration: getTimeAgo(item.createdAt),
      editorName: getLocalizedValue(item.editorName, lang),
    }));

  // console.log("Mapped Related News:", mapNewsData(relatedNews, langKey));

  const { countries, error, isLoading } = useCountries();

  return (
    <div className="bg-gray-50 py-8">
      <div className="px-4 md:px-8 lg:px-16">
        <NewsCategorySection
          title={localeText[langKey].relavantNews}
          news={mapNewsData(relatedNews)}
          bannerImage="https://images.unsplash.com/photo-1607082350899-7e105aa886ae"
          bannerAlt="Super Sale"
          language={langKey}
        />

        <NewsCategorySection
          title={
            mapNewsData(differentCategoryNews)[0]?.category ||
            ""
          }
          news={mapNewsData(differentCategoryNews)}
          bannerImage="https://images.unsplash.com/photo-1627384113743-6bd5a479fffd"
          bannerAlt="Black Friday Sale"
          language={langKey}
        />

        <CountriesSection
          countries={countries}
          language={langKey}
        />
      </div>
    </div>
  );
};

export default RelevantNewsSection;

const localeText = {
  en: {
    ReadMore: "Read more",
    relavantNews: "Relevant News",
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
    relavantNews: "தொடர்புடைய செய்திகள்",
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
    relavantNews: "අදාළ පුවත්",
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


