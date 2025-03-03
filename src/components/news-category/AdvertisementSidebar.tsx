import React from "react";
import { Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
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
  <div className="mb-4">
    <h3 className="text-center text-heading-base text-secondary mb-2">
      {title}
    </h3>
    <button className="w-full bg-[#0A3F51] text-white text-body-base py-3 px-4 text-center rounded hover:bg-[#0c4c62] transition-colors">
      {phone}
    </button>
  </div>
);

const AdBanner: React.FC<AdBannerProps> = ({ image }) => (
  <div className="mb-2 overflow-hidden rounded">
    <div className="aspect-[21/9] relative">
      <Image
        src={image}
        alt="Advertisement"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
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
        "w-full bg-white p-6 rounded shadow-sm min-h-[800px] flex flex-col justify-between h-[1400px] border border-gray-200",
        className
      )}
    >
      <ContactCard
        title="Contact Us For Advertisements"
        phone="+94 77 002 33 23"
      />

      <Separator />

      <ContactCard
        title="Contact Us For Obituary News"
        phone="+94 77 002 33 23"
      />

      <div className="space-y-4 mt-6">
        <AdBanner image="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" />
        <AdBanner image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" />
        <AdBanner image="https://images.unsplash.com/photo-1518770660439-4636190af475" />
        <AdBanner image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" />
      </div>

      <div className="mt-6">
        <h3 className="text-heading-base text-secondary mb-2">
          For More Details Contact Us
        </h3>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <button
              key={index}
              className="w-full bg-[#0A3F51] text-white text-body-base py-2 px-4 text-center rounded hover:bg-[#0c4c62] transition-colors"
            >
              +94 77 002 33 23
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <a
          href="#"
          className="flex items-center gap-2 text-secondary text-body-base hover:underline py-2 px-4 bg-white rounded shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200"
        >
          <Image
            src="/icons/podcast.svg"
            alt="Podcast"
            width={32}
            height={32}
          />
          <span>Listen To Our Podcast Now</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-2 text-secondary text-body-base hover:underline py-2 px-4 bg-white rounded shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-200"
        >
          <Youtube className="h-8 w-8" />
          <span>Visit our YouTube Now</span>
        </a>
      </div>
    </div>
  );
};

export default AdvertisementSidebar;
