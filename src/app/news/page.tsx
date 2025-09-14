"use client";

import AdvertisementBanner from "@/components/advertisement/AdvertisementBanner";
import React, { useState, useEffect, Suspense } from "react";
import BreakingNewsHCard from "@/components/news/BreakingNewsHCard";
import NewsCategoryTabs from "@/components/contact/NewsCategoryTabs";
import NewsTabsSection from "@/components/news/NewsTabsSection";
import TrendingNewsSection from "@/components/trending-news/TrendingNewsSection";
import HAdCarousel from "@/components/advertisement/HAdCarousel";
import VideoNewsSection from "@/components/video-news/VideoNewsSection";
import { FeaturedAd } from "@/data/featured-ads";
import NewsCategoriesSection from "@/components/news-category/NewsCategoriesSection";
import { Separator } from "@/components/ui/separator";
import PoliticalNews from "@/components/category/PoliticalNews";
import PaginationSection from "@/components/category/PaginationSection";
import useSWR from 'swr';
import { useLanguage } from "@/components/ui/LanguageProvider";
import { getTimeDifference } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";

interface AdType {
  _id: string;
  imageSize: string;
  isDeleted: boolean;
  type: string;
  isActive: boolean;
  __v: number;
}

interface AdData {
  _id: string;
  image: string;
  isDeleted: boolean;
  adPageName: string;
  isActive: boolean;
  expiryDate: string;
  uploadedDate: string;
  __v: number;
  adCategory: any;
  adType: AdType;
  link?: string;
}


const fetcher = (url: string) => fetch(url).then(res => res.json());

const LoadingSpinner = ({ language }: { language?: string }) => {
  const loadingText = {
    english: "Loading latest news...",
    tamil: "சமீபத்திய செய்திகள் ஏற்றப்படுகின்றன...",
    sinhala: "නවතම පුවත් පූරණය වේ...",
  };

  const text = loadingText[language as keyof typeof loadingText] || loadingText.english;

  return (
    <div className="flex flex-col justify-center items-center py-8 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
};

// Loading component for Suspense fallback
const NewsPageLoading = () => (
  <div className="flex flex-col">
    <main className="flex flex-col mt-0 w-full bg-white max-md:mt-0 gap-[24px]">
      {/* Loading Spinner at top */}
      <LoadingSpinner />

      <div className="animate-pulse">
        {/* Breaking News Banner Skeleton */}
        <div className="h-64 bg-gray-200 rounded-lg mb-6 mx-4 md:mx-8 lg:mx-16"></div>

        {/* Category Tabs Skeleton */}
        <div className="h-16 bg-gray-200 rounded-lg mb-6 mx-4 md:mx-8 lg:mx-16"></div>

        {/* News Tabs Section Skeleton */}
        <div className="mx-4 md:mx-8 lg:mx-16 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - News */}
            <div className="flex-1">
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-gray-100 rounded">
                    <div className="w-32 h-24 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Obituary */}
            <div className="w-full md:w-80">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trending News Skeleton */}
        <div className="mx-4 md:mx-8 lg:mx-16 mb-6">
          <div className="h-8 bg-gray-200 rounded mb-4 w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 h-96 bg-gray-200 rounded"></div>
            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

const NewsPageContent: React.FC = () => {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFromUrl = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl || "all");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Custom handler for category changes that updates URL
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);

    // Update URL without page reload
    const url = new URL(window.location.href);
    if (categoryId === "all") {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', categoryId);
    }
    router.push(url.pathname + url.search, { scroll: false });
  };

  // SWR fetcher with auth headers
  const fetcherWithAuth = async (url: string) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(url, {
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return response.json();
  };

  // Fetch ad types to get Sidebar Banner type ID
  const { data: adTypesData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/advertistment/ad-type/active?page=1&limit=10`,
    fetcherWithAuth,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Get the Sidebar Banner ad type ID
  const sidebarAdType = adTypesData?.adTypes?.find(
    (type: AdType) => type.type === 'Sidebar Banner'
  );

  // Fetch advertisements using SWR
  const { data: adsData, isLoading: adsLoading } = useSWR(
    sidebarAdType?._id 
      ? `${process.env.NEXT_PUBLIC_API_URL}/advertistment/by-ad-type-ad-page?adType=${sidebarAdType._id}&adPageName=home`
      : null,
    fetcherWithAuth,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Format the ads data
  const dynamicAds: FeaturedAd[] = adsData 
    ? (Array.isArray(adsData) ? adsData : []).slice(0, 5).map((ad: AdData, index: number) => ({
        id: index + 1,
        title: `Advertisement ${index + 1}`,
        image: ad.image || "/images/Prapancham-logo.png",
        label: `Advertisement ${index + 1}`,
        link: ad.link
      }))
    : [];

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/news/news-category/active?page=1&limit=10`,
    fetcher,
    {
      keepPreviousData: true, // Show previous data while loading new data
      revalidateOnFocus: false, // Don't revalidate when window gets focus
      revalidateOnReconnect: false, // Don't revalidate on reconnect
    }
  );

  const { data: breakingNewsData, error: breakingNewsError, isLoading: breakingNewsLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/news/breaking-news/10`,
    fetcher,
    {
      keepPreviousData: true, // Show previous data while loading new data
      revalidateOnFocus: false, // Don't revalidate when window gets focus
      revalidateOnReconnect: false, // Don't revalidate on reconnect
    }
  );

  // Remove the pageLoading logic - let SWR handle caching naturally

  // Update active category when URL parameter changes or data loads
  useEffect(() => {
    if (categoryFromUrl && data?.newsCategory) {
      // Validate that the category exists in the data
      const categoryExists = data.newsCategory.some((cat: any) => cat._id === categoryFromUrl);
      if (categoryExists) {
        setActiveCategory(categoryFromUrl);
      } else {
        // Invalid category ID, redirect to "all"
        setActiveCategory("all");
        const url = new URL(window.location.href);
        url.searchParams.delete('category');
        router.replace(url.pathname + url.search, { scroll: false });
      }
    } else if (categoryFromUrl) {
      // Category parameter exists but data not loaded yet, set it anyway
      setActiveCategory(categoryFromUrl);
    }
  }, [categoryFromUrl, data, router]);

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

  const breakingNewsItems = breakingNewsData
    ? breakingNewsData.map((item: any) => ({
      title: item.title?.[langKey]?.[0]?.value || "No title",
      summary: item.description?.[langKey]?.[0]?.value || "No description",
      image: item.mainImage || "/images/Prapancham-logo.png",
      category: "Breaking News",
      timeAgo: getTimeDifference(item.updatedAt, langKey),
      id: item._id,
    }))
    : [];

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= breakingNewsItems.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [breakingNewsItems.length]);

  const currentNews = breakingNewsItems[currentIndex] || {
    title: "No title",
    summary: "No summary available",
    image: "/images/Prapancham-logo.png",
    category: "Unknown",
    timeAgo: "N/A",
  };

  // Show loading state only on initial load (when there's no cached data)
  const showInitialLoading = (isLoading && !data) || (breakingNewsLoading && !breakingNewsData);

  if (showInitialLoading) {
    return (
      <div className="flex flex-col">
        <main className="flex flex-col mt-0 w-full bg-white max-md:mt-0 gap-[24px]">
          <LoadingSpinner language={language} />
          <div className="animate-pulse mx-4 md:mx-8 lg:mx-16">
            {/* Breaking News Banner Skeleton */}
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>

            {/* Category Tabs Skeleton */}
            <div className="h-16 bg-gray-200 rounded-lg mb-6"></div>

            {/* News Tabs Section Skeleton */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Column - News */}
                <div className="flex-1">
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-gray-100 rounded">
                        <div className="w-32 h-24 bg-gray-200 rounded"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-full"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Obituary */}
                <div className="w-full md:w-80">
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-24 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col transition-opacity duration-500 ease-in-out opacity-100">
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
        <NewsCategoryTabs
          categories={[
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
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
        />

        {(activeCategory === "all") && <NewsTabsSection />}
        {/* {(activeCategory !== "all") && <NewsTabsSection categoryId={activeCategory} />} */}

        {(activeCategory !== "all") &&
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
            activeCountry={activeCategory}
          />
        }

        {/* <Separator /> */}
        {/* {(activeCountry !== "all") && <PaginationSection />} */}
        {(activeCategory === "all") && <TrendingNewsSection />}
        <Separator />
        <HAdCarousel
          ads={adsLoading ? [] : dynamicAds}
          title="Advertisements"
          autoSlideInterval={6000}
          className="px-4 md:px-8 lg:px-16   max-md:px-5"
        />
        <Separator />
        {(activeCategory === "all") && <NewsCategoriesSection />}
        <Separator className="mb-8" />
        {(activeCategory !== "all") && <VideoNewsSection />}
      </main>
    </div>
  );
};

// Main component wrapped in Suspense
const NewsPage: React.FC = () => {
  return (
    <Suspense fallback={<NewsPageLoading />}>
      <NewsPageContent />
    </Suspense>
  );
};

export default NewsPage;
