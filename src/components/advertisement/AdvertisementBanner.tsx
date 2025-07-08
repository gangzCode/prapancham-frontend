import Image from "next/image";
import React, { useEffect, useState } from "react";

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

interface AdvertisementBannerProps {
  className?: string;
  adPageName?: string;
}

const AdvertisementBanner: React.FC<AdvertisementBannerProps> = ({
  className = "",
  adPageName = 'home'
}) => {
  const [adData, setAdData] = useState<AdData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        
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
        
        // Now fetch the advertisements for this page and ad type
        const adsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/advertistment/by-ad-type-ad-page?adType=${billboardAdType._id}&adPageName=${adPageName}`,
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

  return (
    <section
      className={`flex flex-col justify-center px-4 md:px-8 lg:px-16 py-6 w-full rounded-lg max-md:px-5 max-md:max-w-full ${className}`}
    >
      <div className="flex flex-wrap gap-3 justify-center items-center w-full max-md:max-w-full">
        {loading ? (
          // Show loading placeholder
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="object-contain flex-1 shrink self-stretch my-auto aspect-[1.98] basis-0 min-w-60 w-[284px] bg-gray-300 rounded animate-pulse"
              style={{ height: '143px' }}
            />
          ))
        ) : adData.length > 0 ? (
          // Show actual ads
          adData.map((ad, index) => {
            const content = (
              <Image
                key={ad._id || index}
                src={ad.image || "/images/Prapancham-logo.png"}
                alt={`Advertisement ${index + 1}`}
                width={284}
                height={143}
                className="object-contain flex-1 shrink self-stretch my-auto aspect-[1.98] basis-0 min-w-60 w-[284px] cursor-pointer"
              />
            );

            if (ad.link) {
              return (
                <a
                  key={ad._id || index}
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              );
            }

            return content;
          })
        ) : (
          // Show no ads message
          <div className="text-center p-6 bg-red-600 rounded w-full">
            <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed">
              Billboard AD-Space Available for purchase.
              <br />
              Contact us for more information.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdvertisementBanner;
