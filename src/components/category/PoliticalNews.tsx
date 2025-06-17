import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import PhotoCard from "../video-news/PhotoCard";
import { TitleWithUnderline } from "../ui/title-with-underline";
import { useLanguage } from "@/components/ui/LanguageProvider";
import useSWR from "swr";
import { Separator } from "@radix-ui/react-select";
import AdvertisementSidebar from "../news-category/AdvertisementSidebar";
import PaginationBar from "./PaginationBar";

interface VideoNewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  editorName: string;
  category: string;
  duration: string;
}
interface CountryName {
  lang: string;
  value: string;
}
interface Country {
  id: string;
  name: CountryName[];
}
interface PoliticalNewsSectionProps {
  activeCountry: string;
  countries: Country[];

}
type LanguageKey = "en" | "ta" | "si";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const formatToYYYYMMDD = (date: Date) => date.toISOString().split("T")[0];

const formatDateReadable = (date: Date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const ordinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${days[date.getDay()]}, ${ordinal(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const PoliticalNewsSection: React.FC<PoliticalNewsSectionProps> = ({ activeCountry, countries }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  let langKey: LanguageKey = "en";
  if (language === "tamil") langKey = "ta";
  else if (language === "sinhala") langKey = "si";

  useEffect(() => {
    const selectedCategory = countries.find((c) => c.id === activeCountry);
    if (selectedCategory) {
      const nameObj = selectedCategory.name.find((n) => n.lang === langKey);
      setCategory(nameObj ? nameObj.value : "");
    } else {
      setCategory("");
    }
  }, [activeCountry, countries, langKey]);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }
    if (showCalendar) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar]);

  const translations: Record<LanguageKey, { [key: string]: string }> = {
    en: {
      noPoliticalNewsFound: "No political news found for selected date",
      selectDate: "Select date",
      cancel: "Cancel",
      ok: "OK",
      News: "News",
      readmore: "Read more",
      loading: "Loading...",
      failedtoLoad: "Failed to load news.",
    },
    ta: {
      noPoliticalNewsFound: "தேர்ந்தெடுக்கப்பட்ட தேதிக்கு அரசியல் செய்திகள் எதுவும் கிடைக்கவில்லை",
      selectDate: "தேதியைத் தேர்ந்தெடுக்கவும்",
      cancel: "ரத்து செய்",
      ok: "சரி",
      News: "செய்திகள்",
      readmore: "மேலும் வாசிக்க",
      loading: "ஏற்றுகிறது...",
      failedtoLoad: "செய்திகளை ஏற்றுவதில் தோல்வி.",
    },
    si: {
      noPoliticalNewsFound: "තෝරාගත් දිනය සඳහා දේශපාලන පුවත් නොමැත",
      selectDate: "දිනය තෝරන්න",
      cancel: "අවලංගු කරන්න",
      ok: "හරි",
      News: "පුවත්",
      readmore: "තවත් කියවන්න",
      loading: "ඉදිරියට යමින්...",
      failedtoLoad: "පුවත් පූරණය කිරීමට අසමත්"
    },
  };
  const t = translations[langKey];


  const { data, error, isLoading } = useSWR(
    // `/news/by-category/681f263fc1f11e707f819966?createdAt=${formatToYYYYMMDD(date)}&page=1&limit=10`,
    `${process.env.NEXT_PUBLIC_API_URL}/news/by-category/${activeCountry}?createdAt=${(date)}&page=${currentPage}&limit=${itemsPerPage}`,
    fetcher
  );
  const totalPages = data?.totalPages || 1;
  const totalItems = data?.totalItems || 0;

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

  const newsItems: VideoNewsItem[] = data?.data?.map((item: any) => ({
    id: item._id,
    title: item.title?.[langKey]?.[0]?.value || "",
    excerpt: item.description?.[langKey]?.[0]?.value || "",
    image: item.thumbnailImage || item.mainImage,
    editorName: item.editorName?.[langKey]?.[0]?.value || "",
    category: item.newsCategory?.name?.[langKey]?.[0]?.value || item.newsCategory?.name?.en?.[0]?.value || "",
    duration: getTimeAgo(item.createdAt),
  })) || [];

  const featuredVideo = newsItems.length > 0 ? newsItems[0] : null;
  const smallVideos = newsItems.length > 1 ? newsItems.slice(1, 4) : [];
  const largeVideos = newsItems.length > 4 ? newsItems.slice(4, 7) : [];
  const xlargeVideos = newsItems.length > 7 ? newsItems.slice(7, 8) : [];
  const doubleVideos = newsItems.length > 8 ? newsItems.slice(8, 10) : [];


  return (
    <div>
      <section className="flex flex-col justify-center mx-auto py-8 px-16 max-md:px-5">
        <div className="flex-row md:flex justify-between items-center mb-6">
          <div className="relative">
            <div className="flex-shrink min-w-0 max-w-full">
              <TitleWithUnderline text={`${category} ${t.News}`} underlineWidth={64} />
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3.5 justify-center items-center">
            <time className="text-center text-primary text-sm sm:text-base font-poppins">
              {date.toLocaleDateString(
                language === "english" ? "en" : language === "tamil" ? "ta" : "si",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </time>
            <div className="bg-[#880002] rounded p-2 cursor-pointer" onClick={() => setShowCalendar(!showCalendar)}>
              <CalendarIcon className="text-white h-4" />
            </div>
            {showCalendar && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div ref={calendarRef} className="bg-white rounded-lg shadow-lg p-4 w-80 relative">
                  <div className="text-gray-600 text-sm mb-2">{t.selectDate}</div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-semibold">
                      {date.toLocaleDateString(language === "english" ? "en" : language === "tamil" ? "ta" : "si", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <Pencil className="text-gray-600" />
                  </div>
                  <div className="border-t border-b py-2 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-gray-600">
                        {date.toLocaleString("default", { month: "long", year: "numeric" })}
                      </div>
                      <div className="flex items-center space-x-2">
                        <ChevronLeft
                          className="text-gray-600 cursor-pointer"
                          onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()))}
                        />
                        <ChevronRight
                          className="text-gray-600 cursor-pointer"
                          onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()))}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 text-center text-gray-600 mb-2">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d) => <div key={d}>{d}</div>)}
                  </div>
                  <div className="grid grid-cols-7 text-center text-gray-800">
                    {[...Array(31)].map((_, i) => (
                      <div
                        key={i}
                        className={`py-2 cursor-pointer ${date.getDate() === i + 1 ? "bg-primary text-white rounded-full" : ""}`}
                        onClick={() => setDate(new Date(date.getFullYear(), date.getMonth(), i + 1))}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end space-x-4 mt-4">
                    <button className="text-gray-600" onClick={() => setShowCalendar(false)}>{t.cancel}</button>
                    <button className="text-primary" onClick={() => setShowCalendar(false)}>{t.ok}</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <p>{t.loading}</p>
        ) : error ? (
          <p className="text-red-500">{t.failedtoLoad}</p>
        ) : newsItems.length === 0 ? (
          <p className="text-gray-600">{t.noPoliticalNewsFound}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {featuredVideo && (
              <PhotoCard
                title={featuredVideo.title}
                excerpt={featuredVideo.excerpt}
                image={featuredVideo.image}
                editorName={featuredVideo.editorName}
                category={featuredVideo.category}
                duration={featuredVideo.duration}
                variant="large"
              />
            )}
            <div className="grid grid-cols-1 gap-6">
              {smallVideos.map((video) => (
                <PhotoCard
                  key={video.id}
                  title={video.title}
                  excerpt={video.excerpt}
                  image={video.image}
                  editorName={video.editorName}
                  category={video.category}
                  duration={video.duration}
                  variant="small"
                />
              ))}
            </div>
          </div>
        )}
      </section>
      <section className="px-4 md:px-8 lg:px-16  py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Left side scrollable news section - 2/3 width on desktop */}
          <div className="lg:col-span-2 h-auto relative bg-white rounded-md shadow-sm overflow-hidden">
            {/* Small vdieo card section */}
            <div className="grid grid-cols-1 gap-6">
              {largeVideos.map((video) => (
                <PhotoCard
                  key={video.id}
                  title={video.title}
                  excerpt={video.excerpt}
                  image={video.image}
                  editorName={video.editorName}
                  category={video.category}
                  duration={video.duration}
                  variant="small"
                />
              ))}
            </div>
            {/* Large video card section */}
            <div>
              {xlargeVideos.map((video) => (
                <PhotoCard
                  key={video.id}
                  title={video.title}
                  excerpt={video.excerpt}
                  image={video.image}
                  editorName={video.editorName}
                  category={video.category}
                  duration={video.duration}
                  variant="large"
                />
              ))}
              {/* <PhotoCard
                title={featuredVideo.title}
                excerpt={featuredVideo.excerpt}
                image={featuredVideo.image}
                editorName={featuredVideo.editorName}
                category={featuredVideo.category}
                duration={featuredVideo.duration}
                variant="large"
              /> */}

              {/* 2 video card in a row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {doubleVideos.map((video) => (
                  <PhotoCard
                    key={video.id}
                    title={video.title}
                    excerpt={video.excerpt}
                    image={video.image}
                    editorName={video.editorName}
                    category={video.category}
                    duration={video.duration}
                    variant="large"
                  />
                ))}
              </div>
            </div>
            {/* <Separator className="!w-full" /> */}
            <PaginationBar
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
          {/* Right side advertisement section - 1/3 width on desktop */}
          <div className="lg:col-span-1 h-auto pr-4 border-r-[3px] border-gray-200 overflow-hidden">
            <AdvertisementSidebar className="h-full overflow-y-auto" numberOfAds={6} />
          </div>
        </div>

      </section>
    </div>
  );
};

export default PoliticalNewsSection;


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