"use client";

import React, { useState } from "react";
import BreakingNewsHCard from "@/components/news/BreakingNewsHCard";
import CountryMenu from "@/components/contact/CountryMenu";
import NewsTabsSection from "@/components/news/NewsTabsSection";
import TrendingNewsSection from "@/components/trending-news/TrendingNewsSection";
import HAdCarousel from "@/components/advertisement/HAdCarousel";

import { featuredAds } from "@/data/featured-ads";
import NewsCategoriesSection from "@/components/news/NewsCategoriesSection";
import { Separator } from "@/components/ui/separator";

const NewsPage: React.FC = () => {
  // Sample breaking news data array
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

  const countries = [
    "Sri Lanka",
    "India",
    "USA",
    "China",
    "Australia",
    "Canada",
    "UK",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(breakingNewsItems.length - 1, prev + 1));
  };

  const currentNews = breakingNewsItems[currentIndex];

  return (
    <div className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-32">
      <main className="flex flex-col mt-0 w-full bg-white max-md:mt-0 max-md:max-w-full gap-[24px]">
        {/* Breaking News Banner */}
        <BreakingNewsHCard
          title={currentNews.title}
          summary={currentNews.summary}
          image={currentNews.image}
          category={currentNews.category}
          timeAgo={currentNews.timeAgo}
          className="my-4"
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < breakingNewsItems.length - 1}
        />
        <CountryMenu countries={countries} />
        {/* News Tabs and Obituary Updates Section */}
        <NewsTabsSection />
        <Separator />
        <TrendingNewsSection />
        <Separator />
        <HAdCarousel
          ads={featuredAds}
          title="Advertisements"
          autoSlideInterval={6000}
        />
        <Separator />
        <NewsCategoriesSection />
      </main>
    </div>
  );
};

export default NewsPage;
