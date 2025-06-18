"use client";

import AdvertisementBanner from "@/components/advertisement/AdvertisementBanner";
import React, { useState } from "react";
import BreakingNewsHCard from "@/components/news/BreakingNewsHCard";
import CountryMenu from "@/components/contact/CountryMenu";
import NewsTabsSection from "@/components/news/NewsTabsSection";
import TrendingNewsSection from "@/components/trending-news/TrendingNewsSection";
import HAdCarousel from "@/components/advertisement/HAdCarousel";
import VideoNewsSection from "@/components/video-news/VideoNewsSection";
import { featuredAds } from "@/data/featured-ads";
import NewsCategoriesSection from "@/components/news-category/NewsCategoriesSection";
import { Separator } from "@/components/ui/separator";
import PoliticalNews from "@/components/category/PoliticalNews";
import PaginationSection from "@/components/category/PaginationSection";
import useSWR from 'swr';
import { useLanguage } from "@/components/ui/LanguageProvider";
import { getTimeDifference } from "@/lib/utils";


const fetcher = (url: string) => fetch(url).then(res => res.json());

const NewsPage: React.FC = () => {


  const { language } = useLanguage();

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/news/news-category/active?page=1&limit=10`,
    fetcher
  );

  const { data: breakingNewsData, error: breakingNewsError } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/news/breaking-news/10`,
    fetcher
  );

  const allLabels: Record<string, string> = {
    en: "All",
    ta: "அனைத்து",
    si: "සියල්ල",
  };

  let langKey: "en" | "ta" | "si" =
    language === "english"
      ? "en"
      : language === "tamil"
        ? "ta"
        : language === "sinhala"
          ? "si"
          : "en";



  const [activeCountry, setActiveCountry] = useState("all");

  const breakingNewsItems = breakingNewsData
    ? breakingNewsData.map((item: any) => ({
      title: item.title?.[langKey]?.[0]?.value || "No title",
      summary: item.description?.[langKey]?.[0]?.value || "No description",
      image: item.mainImage || "/images/default-news-image.png",
      category: "Breaking News",
      timeAgo: getTimeDifference(item.updatedAt, langKey),
      id: item._id,
    }))
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);


  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(breakingNewsItems.length - 1, prev + 1));
  };

  const currentNews = breakingNewsItems[currentIndex] || {
    title: "No title",
    summary: "No summary available",
    image: "/images/default-news-image.png",
    category: "Unknown",
    timeAgo: "N/A",
  };

  return (
    <div className="flex flex-col ">
      <main className="flex flex-col mt-0 w-full bg-white max-md:mt-0  gap-[24px]">

        {/* <AdvertisementBanner images={topAdImages} /> */}
        {/* Breaking News Banner */}
        <BreakingNewsHCard
          title={currentNews.title}
          summary={currentNews.summary}
          image={currentNews.image}
          category={currentNews.category}
          timeAgo={currentNews.timeAgo}
          id={currentNews.id}
          // className="my-4"
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < breakingNewsItems.length - 1}
        />
        <CountryMenu
          countries={[
            {
              id: "all",
              name: [
                { lang: "en", value: allLabels["en"] },
                { lang: "ta", value: allLabels["ta"] },
                { lang: "si", value: allLabels["si"] },
              ],
            },
            ...(data?.newsCategory?.map((cat: any) => ({
              id: cat._id,
              name: [
                { lang: "en", value: cat.name.en?.[0]?.name || "" },
                { lang: "ta", value: cat.name.ta?.[0]?.name || "" },
                { lang: "si", value: cat.name.si?.[0]?.name || "" },
              ],
            })) || []),
          ]}
          activeCountry={activeCountry}
          setActiveCountry={setActiveCountry}
        />

        {(activeCountry === "all") && <NewsTabsSection />}
        {(activeCountry !== "all") &&
          <PoliticalNews
           countries={[
            {
              id: "all",
              name: [
                { lang: "en", value: allLabels["en"] },
                { lang: "ta", value: allLabels["ta"] },
                { lang: "si", value: allLabels["si"] },
              ],
            },
            ...(data?.newsCategory?.map((cat: any) => ({
              id: cat._id,
              name: [
                { lang: "en", value: cat.name.en?.[0]?.name || "" },
                { lang: "ta", value: cat.name.ta?.[0]?.name || "" },
                { lang: "si", value: cat.name.si?.[0]?.name || "" },
              ],
            })) || []),
          ]}
            activeCountry={activeCountry}
          />
        }

        {/* <Separator /> */}
        {/* {(activeCountry !== "all") && <PaginationSection />} */}
        {(activeCountry === "all") && <TrendingNewsSection />}
        <Separator />
        <HAdCarousel
          ads={featuredAds}
          title="Advertisements"
          autoSlideInterval={6000}
          className="px-4 md:px-8 lg:px-16   max-md:px-5"
        />
        <Separator />
        {(activeCountry === "all") && <NewsCategoriesSection />}
        <Separator className="mb-8" />
        {(activeCountry !== "all") && <VideoNewsSection />}
      </main>
    </div>
  );
};

export default NewsPage;
