"use client";

import AdvertisementBanner from "@/components/advertisement/AdvertisementBanner";
import HAdCarousel from "@/components/advertisement/HAdCarousel";
import PaginationSection from "@/components/category/PaginationSection";
import PoliticalNews from "@/components/category/PoliticalNews";
import CountryMenu from "@/components/contact/CountryMenu";
import BreakingNewsHCard from "@/components/news/BreakingNewsHCard";
import PodcastSection from "@/components/podcast/PodcastSection";
import VideoNewsSection from "@/components/video-news/VideoNewsSection";
import { featuredAds } from "@/data/featured-ads";
import React, { useState, useEffect } from "react";

const CategoryPage = () => {
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(breakingNewsItems.length - 1, prev + 1));
  };

  const currentNews = breakingNewsItems[currentIndex];

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white min-h-screen">
      <AdvertisementBanner images={topAdImages} />
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
      <PoliticalNews />

      <HAdCarousel
        ads={featuredAds}
        title="Advertisements"
        className="px-16 max-md:px-5"
        autoSlideInterval={6000}
      />
      <VideoNewsSection />
      <PodcastSection />
      <PaginationSection />
    </div>
  );
};

export default CategoryPage;
