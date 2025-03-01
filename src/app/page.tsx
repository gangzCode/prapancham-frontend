import React from "react";

import TopBar from "@/components/layout/TopBar";
import FirstNavbar from "@/components/layout/FirstNavbar";
import SecondNavbar from "@/components/layout/SecondNavbar";
import HeroSection from "@/components/hero/HeroSection";
import AdvertisementBanner from "@/components/advertisement/AdvertisementBanner";
import { Separator } from "@/components/ui/separator";
import UpcomingEvents from "@/components/event/UpcomingEvents";

const HomePage: React.FC = () => {
  const adImages = [
    "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg",
    "https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg",
    "https://images.pexels.com/photos/3944377/pexels-photo-3944377.jpeg",
    "https://images.pexels.com/photos/4668537/pexels-photo-4668537.jpeg",
  ];

  // TODO: Replace with images from api and delete the iamge files
  const topAdImages = [
    "/images/top-ad-1.png",
    "/images/top-ad-2.png",
    "/images/top-ad-3.png",
    "/images/top-ad-4.png",
  ];

  return (
    <div className="flex flex-col">
      <main className="flex flex-col mt-0 w-full bg-white min-h-[5543px] max-md:mt-0 max-md:max-w-full gap-[24px]">
        <TopBar />
        <FirstNavbar />
        <SecondNavbar />
        <AdvertisementBanner images={topAdImages} />
        <HeroSection />
        <Separator />
        <UpcomingEvents />
      </main>
    </div>
  );
};

export default HomePage;
