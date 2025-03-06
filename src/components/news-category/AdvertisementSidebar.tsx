import React from "react";
import Image from "next/image";
import { Headphones, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  title: string;
  phone: string;
}

interface AdBannerProps {
  image: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ title, phone }) => (
  <div className="mb-4">
    <h3 className="text-center font-medium text-red-600 mb-2">{title}</h3>
    <button className="w-full bg-[#0A3F51] text-white py-3 px-4 text-center rounded hover:bg-[#0c4c62] transition-colors">
      {phone}
    </button>
  </div>
);

const AdBanner: React.FC<AdBannerProps> = ({ image }) => (
  <div className="mb-4 overflow-hidden rounded relative aspect-[16/9]">
    <Image
      src={image}
      alt="Advertisement"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 300px"
    />
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
        "w-full bg-white p-4 rounded shadow-sm flex flex-col",
        className
      )}
    >
      <div className="flex flex-col">
        <ContactCard
          title="Contact Us For Advertisements"
          phone="+94 77 002 33 23"
        />

        <ContactCard
          title="Contact Us For Obituary News"
          phone="+94 77 002 33 23"
        />
      </div>

      <div className="space-y-4 mt-6 flex-1 overflow-hidden">
        <AdBanner image="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" />
        <AdBanner image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" />
        <AdBanner image="https://images.unsplash.com/photo-1518770660439-4636190af475" />
      </div>

      <div className="mt-6">
        <h3 className="text-center font-medium text-red-600 mb-2">
          For More Details Contact Us
        </h3>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((_, index) => (
            <button
              key={index}
              className="w-full bg-[#0A3F51] text-white py-2 px-4 text-center rounded hover:bg-[#0c4c62] transition-colors"
            >
              +94 77 002 33 23
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <a
          href="#"
          className="flex items-center gap-2 text-red-600 hover:underline py-2 px-4 bg-gray-50 rounded"
        >
          <Headphones className="h-5 w-5" />
          <span>Listen To Our Podcast Now</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-2 text-red-600 hover:underline py-2 px-4 bg-gray-50 rounded"
        >
          <Youtube className="h-5 w-5" />
          <span>Visit our YouTube Now</span>
        </a>
      </div>
    </div>
  );
};

export default AdvertisementSidebar;
