"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/ui/LanguageProvider";
import HeroSection from "@/components/hero/HeroSection";
import AdvertisementBanner from "@/components/advertisement/AdvertisementBanner";
import { Separator } from "@/components/ui/separator";
import UpcomingEvents from "@/components/event/UpcomingEvents";
import TrendingNewsSection from "@/components/trending-news/TrendingNewsSection";
import HAdCarousel from "@/components/advertisement/HAdCarousel";
import NewsCategoriesSection from "@/components/news-category/NewsCategoriesSection";
import VideoNewsSection from "@/components/video-news/VideoNewsSection";
import HorizontalAdBanner from "@/components/news-category/HorizontalAdBanner";
import PodcastSection from "@/components/podcast/PodcastSection";
import QuoteSection from "@/components/quote/QuoteSection";
import useSWR from 'swr';

import { FeaturedAd } from "@/data/featured-ads";

// Define interfaces for Full Width advertisements
interface AdTypesResponse {
  adTypes: AdType[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

interface AdCategory {
  name: {
    en: Array<{ name: string; value: string; _id: string }>;
    ta: Array<{ name: string; value: string; _id: string }>;
    si: Array<{ name: string; value: string; _id: string }>;
  };
  _id: string;
  isDeleted: boolean;
  isActive: boolean;
  __v: number;
}

interface Advertisement {
  _id: string;
  image: string;
  isDeleted: boolean;
  adPageName: string;
  isActive: boolean;
  expiryDate: string;
  uploadedDate: string;
  __v: number;
  adCategory: AdCategory;
  adType: AdType;
  link: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

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

const HomePage: React.FC = () => {
  const [dynamicAds, setDynamicAds] = useState<FeaturedAd[]>([]);
  const [adsLoading, setAdsLoading] = useState(true);
  const { language } = useLanguage();
  type LanguageKey = 'en' | 'ta' | 'si';
  let langKey: LanguageKey;
  if (language === "tamil") langKey = "ta";
  else if (language === "sinhala") langKey = "si";
  else langKey = "en";
  const translations: Record<LanguageKey, { [key: string]: string }> = {
    en: {
      wantToAdvertise: "Want to Advertise Here?",
      contactToPost: "Contact us to post your advertisements and reach thousands of viewers",
      clickToWhatsApp: "Click to message us on WhatsApp!",
      advertisements: "Advertisements",
    },
    ta: {
      wantToAdvertise: "விளம்பரம் செய்ய விரும்புகிறீர்களா?",
      contactToPost: "உங்கள் விளம்பரங்களை இடுகையிட எங்களை தொடர்பு கொள்ளுங்கள்",
      clickToWhatsApp: "WhatsApp இல் செய்தி அனுப்ப கிளிக் செய்யவும்!",
      advertisements: "விளம்பரங்கள்",
    },
    si: {
      wantToAdvertise: "ප්‍රචාරණය කිරීමට අවශ්‍යද?",
      contactToPost: "ඔබේ දැන්වීම් පළ කිරීමට අප හා සම්බන්ධ වන්න",
      clickToWhatsApp: "WhatsApp මගින් පණිවිඩ යැවීමට ක්ලික් කරන්න!",
      advertisements: "දැන්වීම්",
    },
  };
  const t = translations[langKey];

  // Fetch ad types to get Full Width ad type ID for bottom advertisement
  const { data: adTypesData } = useSWR<AdTypesResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/advertistment/ad-type/active?page=1&limit=10`,
    fetcher
  );

  // Find Full Width ad type ID
  const fullWidthAdType = adTypesData?.adTypes?.find(type => type.type === 'Full Width');
  const fullWidthAdTypeId = fullWidthAdType?._id;

  // Fetch Full Width ads for home page
  const { data: homeAds } = useSWR<Advertisement[]>(
    fullWidthAdTypeId
      ? `${process.env.NEXT_PUBLIC_API_URL}/advertistment/by-ad-type-ad-page?adType=${fullWidthAdTypeId}&adPageName=home`
      : null,
    fetcher
  );

  // Fetch dynamic ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        setAdsLoading(true);

        // Get access token from localStorage
        const accessToken = localStorage.getItem('accessToken');

        // First, get the ad types to find the Billboard type
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
          (type: AdType) => type.type === 'Billboard'
        );

        if (!billboardAdType) {
          console.error('Billboard ad type not found');
          return;
        }

        // Now fetch the advertisements for home page and Billboard ad type
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

  const handleWhatsAppClick = () => {
    const phoneNumber = "94770023323";
    const message = encodeURIComponent("Hi! I'm interested in advertising on your platform. Could you please provide more information?");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }


  return (
    <div className="flex flex-col">
      <main className="flex flex-col mt-0 w-full bg-white max-md:mt-0 max-md:max-w-full gap-[24px]">
        {/* <AdvertisementBanner images={topAdImages} /> */}
        <HeroSection />
        <Separator />
        <UpcomingEvents />
        <Separator />
        <TrendingNewsSection className="px-16" />
        <Separator />
        <HAdCarousel
          ads={adsLoading ? [] : dynamicAds}
          title={t.advertisements}
          className="px-4 md:px-8 lg:px-16   max-md:px-5"
          autoSlideInterval={6000}
        />
        <Separator />
        <VideoNewsSection />

        {/* Dynamic Full Width Advertisement Section */}
        <div className="px-4 md:px-8 lg:px-16">
          {homeAds && homeAds.length > 0 ? (
            <a href={homeAds[0].link} target="_blank" rel="noopener noreferrer">
              <img
                src={homeAds[0].image}
                alt="Advertisement"
                className="w-full max-h-[232px] object-cover"
              />
            </a>
          ) : (
            <div
              className="mb-2 overflow-hidden cursor-pointer"
              onClick={handleWhatsAppClick}
            >
              <div className="w-full md:max-h-[232px] max-h-[116px] relative bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center hover:from-teal-700 hover:to-teal-900 transition-colors">
                <div className="text-center text-white p-6">
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    {t.wantToAdvertise}
                  </h3>
                  <p className="text-sm md:text-base mb-4 opacity-90">
                    {t.contactToPost}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
                      <span className="text-green-300">💬</span>
                      +94 77 002 33 23
                    </p>
                    <p className="text-xs md:text-sm opacity-80">
                      {t.clickToWhatsApp}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <PodcastSection />
        <QuoteSection />
        <NewsCategoriesSection />
      </main>
    </div>
  );
};

export default HomePage;
