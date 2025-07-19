import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useLanguage } from "@/components/ui/LanguageProvider";

interface ContactCardProps {
  title: string;
  phone: string;
}

interface AdBannerProps {
  image: string;
  link?: string;
}

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

const ContactCard: React.FC<ContactCardProps> = ({ title, phone }) => (
  <div className="mb-2 sm:mb-3 md:mb-4">
    <h3 className="text-center text-sm sm:text-base md:text-heading-base text-secondary mb-1 sm:mb-2">
      {title}
    </h3>
    <button className="w-full bg-[#0D1322] text-white text-sm sm:text-body-base py-2 sm:py-3 px-2 sm:px-4 text-center rounded hover:bg-[#0c4c62] transition-colors">
      {phone}
    </button>
  </div>
);

const AdBanner: React.FC<AdBannerProps> = ({ image, link }) => {
  const content = (
    <div className="mb-2 overflow-hidden cursor-pointer">
      <div className="aspect-[21/9] sm:aspect-[16/9] md:aspect-[21/9] relative">
        <Image
          src={image || "/images/Prapancham-logo.png"}
          alt="Advertisement"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
};

interface AdvertisementSidebarProps {
  className?: string;
  numberOfAds?: number;
  adPageName?: string;
}

const AdvertisementSidebar: React.FC<AdvertisementSidebarProps> = ({
  className,
  numberOfAds,
  adPageName = 'home'
}) => {
  const [adData, setAdData] = useState<AdData[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  type LanguageKey = 'en' | 'ta' | 'si';
  let langKey: LanguageKey;
  if (language === "tamil") langKey = "ta";
  else if (language === "sinhala") langKey = "si";
  else langKey = "en";
  const translations: Record<LanguageKey, { [key: string]: string }> = {
    en: {
      wantToAdvertise: "Want to Advertise Here?",
      contactToPost: "Contact us to post your advertisements",
      clickToMessage: "Click to message us!",
      contactAds: "Contact Us For Advertisements",
      contactObituary: "Contact Us For Obituary News",
      forMoreDetails: "For More Details Contact Us",
      listenPodcast: "Listen To Our Podcast Now",
      visitYouTube: "Visit our YouTube Now",
    },
    ta: {
      wantToAdvertise: "விளம்பரம் செய்ய விரும்புகிறீர்களா?",
      contactToPost: "உங்கள் விளம்பரங்களை இடுகையிட எங்களை தொடர்பு கொள்ளுங்கள்",
      clickToMessage: "செய்தி அனுப்ப கிளிக் செய்யவும்!",
      contactAds: "விளம்பரங்களுக்கு எங்களை தொடர்பு கொள்ளுங்கள்",
      contactObituary: "மரண அறிவிப்புகளுக்கு எங்களை தொடர்பு கொள்ளுங்கள்",
      forMoreDetails: "மேலும் விவரங்களுக்கு எங்களை தொடர்பு கொள்ளுங்கள்",
      listenPodcast: "எங்கள் பாட்காஸ்டை இப்போது கேளுங்கள்",
      visitYouTube: "எங்கள் YouTube இப்போது பார்வையிடுங்கள்",
    },
    si: {
      wantToAdvertise: "ප්‍රචාරණය කිරීමට අවශ්‍යද?",
      contactToPost: "ඔබේ දැන්වීම් පළ කිරීමට අප හා සම්බන්ධ වන්න",
      clickToMessage: "පණිවිඩ යැවීමට ක්ලික් කරන්න!",
      contactAds: "ප්‍රචාරණ සඳහා අපව අමතන්න",
      contactObituary: "මරණ දැන්වීම් සඳහා අපව අමතන්න",
      forMoreDetails: "වැඩි විස්තර සඳහා අපව අමතන්න",
      listenPodcast: "අපගේ පොඩ්කාස්ට් දැන් අහන්න",
      visitYouTube: "අපගේ YouTube දැන් බලන්න",
    },
  };
  const t = translations[langKey];

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);

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
        const sidebarAdType = adTypesData.adTypes.find(
          (type: AdType) => type.type === 'Sidebar Banner'
        );

        if (!sidebarAdType) {
          console.error('Sidebar Banner ad type not found');
          return;
        }

        // Now fetch the advertisements for this page and ad type
        const adsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/advertistment/by-ad-type-ad-page?adType=${sidebarAdType._id}&adPageName=${adPageName}`,
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
        setAdData(Array.isArray(adsData) ? adsData : []);

      } catch (error) {
        console.error('Error fetching advertisements:', error);
        setAdData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [adPageName]);

  const handleWhatsAppClick = () => {
    const phoneNumber = "94770023323";
    const message = encodeURIComponent("Hi! I'm interested in advertising on your platform. Could you please provide more information?");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
  return (
    <div
      className={cn(
        "w-full bg-white p-3 sm:p-4 md:p-6 lg:p-4 rounded shadow-sm border border-gray-200",
        "min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[1570px]",
        "h-auto sm:h-[1200px] md:h-[1400px] lg:h-auto",
        "flex flex-col justify-between",
        className
      )}
    >
      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        <ContactCard
          title={t.contactAds}
          phone="+94 77 002 33 23"
        />

        <Separator className="hidden sm:block" />

        <ContactCard
          title={t.contactObituary}
          phone="+94 77 002 33 23"
        />
      </div>

      <div className="space-y-2 sm:space-y-3 md:space-y-4 mt-4 sm:mt-5 md:mt-6">
        {loading ? (
          // Show loading placeholder
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="mb-2 overflow-hidden animate-pulse"
            >
              <div className="aspect-[21/9] sm:aspect-[16/9] md:aspect-[21/9] relative bg-gray-300 rounded"></div>
            </div>
          ))
        ) : (
          // Always show exactly 4 items
          Array.from({ length: 4 }).map((_, index) => {
            const ad = adData[index];
            
            if (ad) {
              // Show actual ad
              return (
                <AdBanner
                  key={ad._id || index}
                  image={ad.image}
                  link={ad.link}
                />
              );
            } else {
              // Show "Want to Advertise Here?" message
              return (
                <div
                  key={`placeholder-${index}`}
                  className="mb-2 overflow-hidden cursor-pointer"
                  onClick={handleWhatsAppClick}
                >
                  <div className="aspect-[21/9] sm:aspect-[16/9] md:aspect-[21/9] relative bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center hover:from-teal-700 hover:to-teal-900 transition-colors">
                    <div className="text-center text-white p-2 sm:p-3">
                      <h3 className="text-xs sm:text-sm font-bold mb-1 sm:mb-2">
                        {t.wantToAdvertise}
                      </h3>
                      <p className="text-xs mb-1 opacity-90 hidden sm:block">
                        {t.contactToPost}
                      </p>
                      <div className="space-y-1">
                        <p className="text-xs font-medium flex items-center justify-center gap-1">
                          <span className="text-green-300">💬</span>
                          +94 77 002 33 23
                        </p>
                        <p className="text-xs opacity-80 hidden sm:block">
                          {t.clickToMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })
        )}
      </div>

      <div className="mt-4 sm:mt-4 md:mt-4">
        <h3 className="text-sm sm:text-base md:text-heading-base text-secondary mb-2">
          {t.forMoreDetails}
        </h3>
        <div className="space-y-1 sm:space-y-2">
          {[1, 2, 3, 4].map((_, index) => (
            <button
              key={index}
              className="w-full bg-[#0D1322] text-white text-sm sm:text-body-base py-1.5 sm:py-2 px-2 sm:px-4 text-center rounded hover:bg-[#0c4c62] transition-colors"
            >
              +94 77 002 33 23
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 sm:mt-5 md:mt-6 space-y-1 sm:space-y-2">
        <a
          href="#"
          className="flex items-center gap-1 sm:gap-2 text-secondary text-sm sm:text-body-base hover:underline py-1.5 sm:py-2 px-2 sm:px-4 bg-white rounded shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200"
        >
          <Image
            src="/icons/podcast.svg"
            alt="Podcast"
            width={24}
            height={24}
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
          <span>{t.listenPodcast}</span>
        </a>
        
        <a
          href="#"
          className="flex items-center gap-1 sm:gap-2 text-secondary text-sm sm:text-body-base hover:underline py-1.5 sm:py-2 px-2 sm:px-4 bg-white rounded shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200"
        >
          <Image
            src="/icons/youtube-icon.svg"
            alt="YouTube"
            width={24}
            height={24}
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
          <span>{t.visitYouTube}</span>
        </a>
      </div>
    </div>
  );
};

export default AdvertisementSidebar;