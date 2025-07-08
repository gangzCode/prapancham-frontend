"use client";

import AdvertisementBanner from "@/components/advertisement/AdvertisementBanner";
import React, { useState, useEffect } from "react";
import BreakingNewsHCard from "@/components/news/BreakingNewsHCard";
import CountryMenu from "@/components/contact/CountryMenu";
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

const NewsPage: React.FC = () => {
  const { language } = useLanguage();
  const [activeCountry, setActiveCountry] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dynamicAds, setDynamicAds] = useState<FeaturedAd[]>([]);
  const [adsLoading, setAdsLoading] = useState(true);

  // Fetch dynamic ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        setAdsLoading(true);
        
        // Get access token from localStorage
        const accessToken = localStorage.getItem('accessToken');
        
        // First, get the ad types to find the Sidebar Banner type
        const adTypesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/advertistment/ad-type/active?page=1&limit=10`,
          {
            headers: {
              ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!adTypesResponse.ok) {
          throw new Error('Failed to fetch ad types');
        }
        
        const adTypesData = await adTypesResponse.json();
        const billboardAdType = adTypesData.adTypes.find(
          (type: AdType) => type.type === 'Sidebar Banner'
        );
        
        if (!billboardAdType) {
          console.error('Sidebar Banner ad type not found');
          return;
        }
        
        // Now fetch the advertisements for home page and Sidebar Banner ad type
        const adsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/advertistment/by-ad-type-ad-page?adType=${billboardAdType._id}&adPageName=home`,
          {
            headers: {
              ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!adsResponse.ok) {
          throw new Error('Failed to fetch advertisements');
        }
        
        const adsData = await adsResponse.json();
        const fetchedAds = Array.isArray(adsData) ? adsData : [];
        
        // Format the ads to match FeaturedAd structure
        const formattedAds: FeaturedAd[] = fetchedAds.slice(0, 5).map((ad: AdData, index: number) => ({
          id: index + 1,
          title: `Advertisement ${index + 1}`,
          image: ad.image || "/images/Prapancham-logo.png",
          label: `Advertisement ${index + 1}`,
          link: ad.link
        }));
        
        setDynamicAds(formattedAds);
        
      } catch (error) {
        console.error('Error fetching advertisements:', error);
        setDynamicAds([]);
      } finally {
        setAdsLoading(false);
      }
    };

    fetchAds();
  }, []);

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
    setCurrentIndex((prev) => Math.min(breakingNewsItems.length - 1, prev + 1));
  };

  const currentNews = breakingNewsItems[currentIndex] || {
    title: "No title",
    summary: "No summary available",
    image: "/images/Prapancham-logo.png",
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
          ads={adsLoading ? [] : dynamicAds}
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
