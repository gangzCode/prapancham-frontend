import React from "react";
import { Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface ContactCardProps {
  title: string;
  phone: string;
}

interface AdBannerProps {
  image: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ title, phone }) => (
  <div className="mb-2 sm:mb-3 md:mb-4">
    <h3 className="text-center text-sm sm:text-base md:text-heading-base text-secondary mb-1 sm:mb-2">
      {title}
    </h3>
    <button className="w-full bg-[#0A3F51] text-white text-sm sm:text-body-base py-2 sm:py-3 px-2 sm:px-4 text-center rounded hover:bg-[#0c4c62] transition-colors">
      {phone}
    </button>
  </div>
);

const AdBanner: React.FC<AdBannerProps> = ({ image }) => (
  <div className="mb-2 overflow-hidden rounded">
    <div className="aspect-[21/9] sm:aspect-[16/9] md:aspect-[21/9] relative">
      <Image
        src={image}
        alt="Advertisement"
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
      />
    </div>
  </div>
);

interface AdvertisementSidebarProps {
  className?: string;
}

const AdvertisementSidebar: React.FC<AdvertisementSidebarProps> = ({
  className,
}) => {
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
          title="Contact Us For Advertisements"
          phone="+94 77 002 33 23"
        />

        <Separator className="hidden sm:block" />

        <ContactCard
          title="Contact Us For Obituary News"
          phone="+94 77 002 33 23"
        />
      </div>

      <div className="space-y-2 sm:space-y-3 md:space-y-4 mt-4 sm:mt-5 md:mt-6">
        <AdBanner image="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" />
        <AdBanner image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" />
        <AdBanner image="https://images.unsplash.com/photo-1518770660439-4636190af475" />
        <AdBanner image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" />
      </div>

      <div className="mt-4 sm:mt-5 md:mt-6">
        <h3 className="text-sm sm:text-base md:text-heading-base text-secondary mb-2">
          For More Details Contact Us
        </h3>
        <div className="space-y-1 sm:space-y-2">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <button
              key={index}
              className="w-full bg-[#0A3F51] text-white text-sm sm:text-body-base py-1.5 sm:py-2 px-2 sm:px-4 text-center rounded hover:bg-[#0c4c62] transition-colors"
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
          <span>Listen To Our Podcast Now</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-1 sm:gap-2 text-secondary text-sm sm:text-body-base hover:underline py-1.5 sm:py-2 px-2 sm:px-4 bg-white rounded shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200"
        >
          <Youtube className="h-6 w-6 sm:h-8 sm:w-8" />
          <span>Visit our YouTube Now</span>
        </a>
      </div>
    </div>
  );
};

export default AdvertisementSidebar;