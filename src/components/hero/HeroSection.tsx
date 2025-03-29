"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { TitleWithUnderline } from "../ui/title-with-underline";
import { NewsItem, ObituaryEntry } from "./types";
import BreakingNewsCard from "./BreakingNewsCard";
import ObituaryCard from "./ObituaryCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// TODO: Fetch real obituary data from api
const obituaryData: ObituaryEntry[] = [
  {
    title: "31st day ceremony after death",
    name: "Mr. Nadesh Rasathurai",
    date: "15/02/2025",
    address: "42, Jalan Tun Razak, Brickfields, Kuala Lumpur",
    imageUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    condolences: 4,
  },
  {
    title: "31st day ceremony after death",
    name: "Mr. Nadesh Rasathurai",
    date: "18/02/2025",
    address: "15, Temple Road, Wellawatte, Colombo",
    imageUrl: "https://randomuser.me/api/portraits/men/82.jpg",
    condolences: 4,
  },
  {
    title: "31st day ceremony after death",
    name: "Mr. Nadesh Rasathurai",
    date: "20/02/2025",
    address: "28, Serangoon Road, Little India, Singapore",
    imageUrl: "https://randomuser.me/api/portraits/men/91.jpg",
    condolences: 4,
  },
  {
    title: "31st day ceremony after death",
    name: "Mr. Nadesh Rasathurai",
    date: "22/02/2025",
    address: "63, Lebuh Ampang, George Town, Penang",
    imageUrl: "https://randomuser.me/api/portraits/men/85.jpg",
    condolences: 4,
  },
  {
    title: "31st day ceremony after death",
    name: "Mr. Nadesh Rasathurai",
    date: "25/02/2025",
    address: "89, Jalan Masjid India, Kuala Lumpur",
    imageUrl: "https://randomuser.me/api/portraits/men/92.jpg",
    condolences: 4,
  },
  {
    title: "31st day ceremony after death",
    name: "Mr. Nadesh Rasathurai",
    date: "28/02/2025",
    address: "37, Race Course Road, Little India, Singapore",
    imageUrl: "https://randomuser.me/api/portraits/men/95.jpg",
    condolences: 4,
  },
];

// TODO: Fetch real news data from api and remove the images from public/images
const newsDataList: NewsItem[] = [
  {
    id: 1,
    backgroundImage: "/images/breaking-news-image-1.png",
    timestamp: "2 minutes ago",
    title:
      "Local Temple Announces Grand Deepavali Celebrations with Cultural Programs",
    description:
      "The Sri Krishna Temple announces week-long Deepavali celebrations featuring traditional dance performances, bhajans, and special pujas. Community members are invited to participate in various cultural events including classical dance recitals, devotional music sessions, and traditional lamp lighting ceremonies. The temple will also host special annadhanam (food offering) services throughout the festival week. Local artists and cultural groups will showcase Tamil heritage through performances.",
    date: "14th Feb 2025",
  },
  {
    id: 2,
    backgroundImage: "/images/breaking-news-image-2",
    timestamp: "5 minutes ago",
    title: "Tamil Cultural Association Hosts Annual Youth Festival",
    description:
      "The upcoming youth festival will showcase traditional arts, music competitions, and educational workshops celebrating Tamil heritage and culture. The three-day event features competitions in classical dance, instrumental music, and Tamil oratory. Educational workshops on traditional art forms like Kolam drawing and classical music will be conducted by renowned artists. The festival aims to connect young generations with their cultural roots through interactive sessions and performances.",
    date: "14th Feb 2025",
  },
  {
    id: 3,
    backgroundImage: "/images/breaking-news-image-3",
    timestamp: "10 minutes ago",
    title: "Community Health Camp Provides Free Medical Services",
    description:
      "Local doctors and healthcare workers organize a free medical camp offering health check-ups, consultations, and awareness programs for the community. The camp will provide comprehensive health screenings including diabetes testing, blood pressure monitoring, and general health assessments. Specialist doctors will offer consultations in cardiology, pediatrics, and general medicine. Health awareness sessions on diabetes management, nutrition, and preventive healthcare will be conducted in Tamil and English.",
    date: "14th Feb 2025",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(newsDataList.length - 1, prev + 1));
  }, []);

  const currentNews = newsDataList[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < newsDataList.length - 1;

  return (
    <section className="flex flex-wrap gap-6 justify-center items-center px-4 md:px-8 lg:px-16  mt-6 w-full max-md:px-5 max-md:max-w-full">
      <article className="flex-1 shrink self-stretch my-auto basis-0 min-w-60 shadow-[0px_0px_12px_rgba(0,0,0,0.06)] max-md:max-w-full">
        <div className="flex relative flex-col justify-end w-full min-h-[516px] max-md:max-w-full">
          <Image
            src={currentNews.backgroundImage}
            alt="News background"
            width={700}
            height={516}
            className="object-cover absolute inset-0 size-full"
          />
          <BreakingNewsCard
            {...currentNews}
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPrevious={hasPrevious}
            hasNext={hasNext}
          />
        </div>
      </article>

      <aside className="self-stretch my-auto rounded-2xl min-h-[516px] min-w-60 w-[375px]">
        <div className="flex-shrink min-w-0 max-w-full">
          <TitleWithUnderline text="Obituary Updates" underlineWidth={64} />
        </div>
        <div className="flex flex-1 gap-2 justify-center px-1 py-2 mt-4 h-full">
          <ScrollArea className="flex flex-1 gap-2 justify-center mt-4 size-full h-[456px]">
            <div className="overflow-hidden flex-1 shrink basis-0 min-w-60 pr-4">
              {obituaryData.map((entry, index) => (
                <div key={index} className={index > 0 ? "mt-2" : ""}>
                  <ObituaryCard entry={entry} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </aside>
    </section>
  );
};

export default HeroSection;
