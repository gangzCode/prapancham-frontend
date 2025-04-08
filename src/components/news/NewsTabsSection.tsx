import React, { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import NewsCard, { NewsCardProps } from "./NewsCard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ObituaryCard from "../hero/ObituaryCard";
import { TitleWithUnderline } from "../ui/title-with-underline";
import { ObituaryEntry } from "../hero/types";

// Sample data for news items
const recentNews: NewsCardProps[] = [
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    category: "Category1",
    timeAgo: "15 minutes ago",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    category: "Category1",
    timeAgo: "15 minutes ago",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    category: "Category1",
    timeAgo: "15 minutes ago",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    category: "Category1",
    timeAgo: "15 minutes ago",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    category: "Category1",
    timeAgo: "15 minutes ago",
  },
];

const importantNews: NewsCardProps[] = [
  {
    title:
      "Important: Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    category: "Category1",
    timeAgo: "15 minutes ago",
  },
  {
    title:
      "Important: Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    category: "Category1",
    timeAgo: "15 minutes ago",
  },
  {
    title:
      "Important: Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    category: "Category1",
    timeAgo: "15 minutes ago",
  },
  {
    title:
      "Important: Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    category: "Category1",
    timeAgo: "15 minutes ago",
  },
];

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

interface NewsTabsSectionProps {
  className?: string;
}

const NewsTabsSection: React.FC<NewsTabsSectionProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<"recent" | "important">("recent");

  return (
    <div className={cn("px-4 md:px-8 lg:px-16 py-6 ", className)}>
      <div className="flex flex-col md:flex-row w-full gap-6">
        {/* Left Column - News Tabs */}
        <div className="min-w-60 w-full">
          <div className="flex border border-primary p-2 rounded-lg mb-4 w-[20rem] justify-center items-center mx-auto">
            <button
              className={cn(
                "py-2 w-full font-medium text-sm border-b-2 -mb-px",
                activeTab === "recent"
                  ? "bg-primary text-white font-bold"
                  : "border-transparent text-[#0B4157] hover:text-gray-900"
              )}
              onClick={() => setActiveTab("recent")}
            >
              Recent News
            </button>
            <button
              className={cn(
                "py-2 w-full font-medium text-sm border-b-2 -mb-px",
                activeTab === "important"
                  ? "bg-primary text-white font-bold"
                  : "border-transparent text-gray-700 hover:text-gray-900"
              )}
              onClick={() => setActiveTab("important")}
            >
              Important News
            </button>
          </div>

          <ScrollArea className="h-[790px] pr-0 md:pr-4">
            <div className="space-y-6">
              {(activeTab === "recent" ? recentNews : importantNews).map(
                (news, index) => (
                  <div
                    key={index}
                    className="relative group bg-white p-4 shadow-sm md:mr-5 hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full md:w-48">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full aspect-[1/1] object-cover"
                        />
                      </div>
                      <div className="w-full flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold">{news.title}</h3>
                          <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                            Lorem ipsum dolor sit amet consectetur. Tellus nisi
                            risus tellus ac hendrerit nisldhgteg...
                            <a
                              href="#"
                              className="text-red-600 ml-1 hover:underline"
                            >
                              Read more
                            </a>
                          </p>
                        </div>


                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center text-gray-500 text-xs">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 16a4 4 0 0 1 4 4H8a4 4 0 0 1 4-4z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>Editor's name</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-red-600 text-xs mr-3">
                              {news.category}
                            </span>
                            <span className="text-gray-500 text-xs">
                              • {news.timeAgo}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Right Column - Obituary Updates */}
        <div>
          <aside className=" self-stretch  rounded-2xl min-h-[516px] min-w-60 w-[355px] md:w-[375px]">
            <div className="flex-shrink min-w-0 max-w-full">
              <TitleWithUnderline text="Obituary Updates" underlineWidth={64} />
            </div>
            <div className="flex flex-1 gap-2 justify-center px-1 py-2 mt-4 h-full">
              <ScrollArea className="flex flex-1 gap-2 justify-center mt-4 size-full h-[800px]">
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
        </div>
      </div>
    </div>
  );
};

export default NewsTabsSection;
