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


const fetcher = (url: string) => fetch(url).then(res => res.json());

const NewsPage: React.FC = () => {
  const topAdImages = [
    "/images/top-ad-1.png",
    "/images/top-ad-2.png",
    "/images/top-ad-3.png",
    "/images/top-ad-4.png",
  ];
  const breakingNewsItems = [
    {
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis",
      summary:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis",
      image: "/images/breaking-news-image-1.png",
      category: "Breaking News",
      timeAgo: "2 minutes ago",
    },
    {
      title:
        "Second breaking news item with important updates and developments",
      summary:
        "Detailed coverage of the second breaking news story with additional information",
      image: "/images/breaking-news-image-1.png",
      category: "Breaking News",
      timeAgo: "5 minutes ago",
    },
    {
      title: "Third major news story breaks with significant implications",
      summary:
        "Comprehensive report on the third breaking news event and its impact",
      image: "/images/breaking-news-image-1.png",
      category: "Breaking News",
      timeAgo: "10 minutes ago",
    },
  ];



  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();


  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/news/news-category/active?page=1&limit=10`,
    fetcher
  );

  const allLabels: Record<string, string> = {
    en: "All",
    ta: "அனைத்து",
    si: "සියල්ල",
  };



  let langKey = language;
  if (langKey === "english") langKey = "en";
  if (langKey === "tamil") langKey = "ta";
  if (langKey === "sinhala") langKey = "si";


  const categories: string[] = [
    allLabels[langKey] || allLabels["en"],
    ...(data?.newsCategory?.map((cat: any) => {
      const langObj = cat.name[langKey]?.[0] || cat.name["en"]?.[0];
      return langObj?.name || "";
    }) || []),
  ];
  const [activeCountry, setActiveCountry] = useState(categories[0]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(breakingNewsItems.length - 1, prev + 1));
  };

  const currentNews = breakingNewsItems[currentIndex];

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
          // className="my-4"
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < breakingNewsItems.length - 1}
        />
        <CountryMenu
          countries={categories}
          activeCountry={activeCountry}
          setActiveCountry={setActiveCountry}
        />
       
        {(activeCountry !== "Politics" && activeCountry !== "அரசியல்" && activeCountry !== "දේශපාලන") && <NewsTabsSection />}
        {(activeCountry === "Politics" || activeCountry === "அரசியல்" || activeCountry === "දේශපාලන") && <PoliticalNews />}

        <Separator />
        {(activeCountry === "Politics" || activeCountry === "அரசியல்" || activeCountry === "දේශපාලන") && <PaginationSection />}
        {(activeCountry !== "Politics" && activeCountry !== "அரசியல்" && activeCountry !== "දේශපාලන") && <TrendingNewsSection />}
        <Separator />
        <HAdCarousel
          ads={featuredAds}
          title="Advertisements"
          autoSlideInterval={6000}
          className="px-4 md:px-8 lg:px-16   max-md:px-5"
        />
        <Separator />
        {(activeCountry !== "Politics" && activeCountry !== "அரசியல்" && activeCountry !== "දේශපාලන") && <NewsCategoriesSection />}
        <Separator className="mb-8" />
        {(activeCountry === "Politics" || activeCountry === "அரசியல்" || activeCountry === "දේශපාලන") && <VideoNewsSection />}
      </main>
    </div>
  );
};

export default NewsPage;
