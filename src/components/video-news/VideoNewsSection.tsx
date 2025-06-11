"use client";

import React from "react";
import useSWR from "swr";
import { ArrowRight } from "lucide-react";
import { TitleWithUnderline } from "../ui/title-with-underline";
import VideoCard from "./VideoCard";
import { useLanguage } from "../ui/LanguageProvider";

type LanguageKey = "en" | "ta" | "si";

interface LocalizedField {
  name: string;
  value: string;
  _id: string;
}

interface YoutubeNewsItem {
  _id: string;
  title: Record<LanguageKey, LocalizedField[]>;
  description: Record<LanguageKey, LocalizedField[]>;
  image: string;
  featuredYoutubeImage: string;
  youtubeLink: string;
  youtubeRunTime: string;
  isFeatured: boolean;
}

// Simple fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const localizedUI: Record<
  LanguageKey,
  {
    videoNews: string;
    viewMore: string;
    editorName: string;
    category: string;
    loading: string;
    error: string;
  }
> = {
  en: {
    videoNews: "Video News",
    viewMore: "View more",
    editorName: "Editor's Name",
    category: "YouTube",
    loading: "Loading video news...",
    error: "Error loading videos.",
  },
  ta: {
    videoNews: "வீடியோ செய்திகள்",
    viewMore: "மேலும் பார்க்க",
    editorName: "தொகுப்பாளர்",
    category: "யூடியூப்",
    loading: "வீடியோ செய்திகள் ஏற்றப்படுகிறது...",
    error: "வீடியோக்களை ஏற்றுவதில் பிழை.",
  },
  si: {
    videoNews: "වීඩියෝ පුවත්",
    viewMore: "තවත් බලන්න",
    editorName: "සංස්කාරක නම",
    category: "යූටියුබ්",
    loading: "වීඩියෝ පුවත් ලෝඩ් වෙමින්...",
    error: "වීඩියෝ පූරණයේ දෝෂයක්.",
  },
};

const VideoNewsSection: React.FC = () => {
  const { language } = useLanguage();
  const langKey: LanguageKey =
    language === "tamil" ? "ta" : language === "sinhala" ? "si" : "en";

  const { data, error } = useSWR<YoutubeNewsItem[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/youtube-news/recent/10`,
    fetcher
  );

  const getLocalizedValue = (
    items: LocalizedField[],
    matchKeys: string[]
  ): string => {
    const lowerKeys = matchKeys.map((key) => key.toLowerCase());
    const found = items.find((item) =>
      lowerKeys.includes(item.name.toLowerCase())
    );
    return found?.value || items[0]?.value || "";
  };

  const featuredVideo = data?.find((item) => item.isFeatured);
  const smallVideos = data?.filter((item) => !item.isFeatured).slice(0, 3) || [];

  function getLocalizedDuration(duration: string, lang: "en" | "ta" | "si"): string {
    const map = {
      en: {
        minutes: "minutes",
        minute: "minute",
        hours: "hours",
        hour: "hour",
        video: "video",
      },
      ta: {
        minutes: "நிமிடங்கள்",
        minute: "நிமிடம்",
        hours: "மணிநேரங்கள்",
        hour: "மணிநேரம்",
        video: "வீடியோ",
      },
      si: {
        minutes: "මිනිත්තු",
        minute: "මිනිත්තුව",
        hours: "පැය",
        hour: "පැය",
        video: "වීඩියෝව",
      },
    };

    const dict = map[lang];

    return duration
      .replace(/\bminutes\b/g, dict.minutes)
      .replace(/\bminute\b/g, dict.minute)
      .replace(/\bhours\b/g, dict.hours)
      .replace(/\bhour\b/g, dict.hour)
      .replace(/\bvideo\b/g, dict.video);
  }



  // if (error)
  //   return <div className="text-red-600">{localizedUI[langKey].error}</div>;
  // if (!data)
  //   return <div className="text-gray-500">{localizedUI[langKey].loading}</div>;

  return (
    <section className="flex flex-wrap gap-6 justify-center px-4 md:px-8 lg:px-16 mt-6 w-full mx-auto max-md:px-5 mb-4">
      <div className="flex justify-between items-center mb-6 w-full">
        <div className="flex-shrink min-w-0">
          <TitleWithUnderline text={localizedUI[langKey].videoNews} underlineWidth={64} />
        </div>
        <button className="flex-shrink-0 flex items-center gap-2 text-red-800 hover:text-red-700 transition-colors">
          <span className="text-sm sm:text-base md:text-heading-base">
            {localizedUI[langKey].viewMore}
          </span>
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full">
        <div className="grid grid-cols-1 gap-6">
          {smallVideos.map((video) => (
            <VideoCard
              key={video._id}
              title={getLocalizedValue(video.title[langKey], [
                "title",
                "தலைப்பு",
                "සිරැස්තලය",
              ])}
              excerpt={getLocalizedValue(video.description[langKey], [
                "description",
                "விவரணம்",
                "විස්තරය",
              ])}
              image={video.image}
              // editorName={localizedUI[langKey].editorName}
              category={localizedUI[langKey].category}
              duration={getLocalizedDuration(video.youtubeRunTime, langKey)}
              youtubeLink={video.youtubeLink}
              variant="small"
            />
          ))}
        </div>

        {featuredVideo && (
          <div>
            <VideoCard
              title={getLocalizedValue(featuredVideo.title[langKey], [
                "title",
                "தலைப்பு",
                "සිරැස්තලය",
              ])}
              excerpt={getLocalizedValue(featuredVideo.description[langKey], [
                "description",
                "விவரணம்",
                "විස්තරය",
              ])}
              image={
                featuredVideo.featuredYoutubeImage || featuredVideo.image
              }
              // editorName={localizedUI[langKey].editorName}
              category={localizedUI[langKey].category}
              duration={getLocalizedDuration(featuredVideo.youtubeRunTime, langKey)}
              youtubeLink={featuredVideo.youtubeLink}
              variant="large"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoNewsSection;
