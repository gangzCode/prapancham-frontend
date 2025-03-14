import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewsCard, { NewsCardProps } from "./NewsCard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ObituaryCard from "../hero/ObituaryCard";

// Sample data for news items
const recentNews: NewsCardProps[] = [
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    category: "Category1",
    timeAgo: "15 minutes video",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    category: "Category1",
    timeAgo: "15 minutes video",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    category: "Category1",
    timeAgo: "15 minutes video",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    category: "Category1",
    timeAgo: "15 minutes video",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    category: "Category1",
    timeAgo: "15 minutes video",
  },
];

const importantNews: NewsCardProps[] = [
  {
    title:
      "Important: Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    category: "Category1",
    timeAgo: "15 minutes video",
  },
  {
    title:
      "Important: Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    category: "Category1",
    timeAgo: "15 minutes video",
  },
  {
    title:
      "Important: Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    category: "Category1",
    timeAgo: "15 minutes video",
  },
  {
    title:
      "Important: Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
    category: "Category1",
    timeAgo: "15 minutes video",
  },
];

// Sample data for obituaries
const obituaryUpdates = [
  {
    id: 1,
    title: "31st day ceremony after death",
    name: "Mr. Nadesh Rasathurai",
    date: "DD/MM/YYYY",
    address: "h2z, masufd, sddd,sddsdffd",
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    condolences: 4,
  },
  {
    id: 2,
    title: "31st day ceremony after death",
    name: "Mr. Nadesh Rasathurai",
    date: "DD/MM/YYYY",
    address: "h2z, masufd, sddd,sddsdffd",
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    condolences: 4,
  },
  {
    id: 3,
    title: "31st day ceremony after death",
    name: "Mr. Nadesh Rasathurai",
    date: "DD/MM/YYYY",
    address: "h2z, masufd, sddd,sddsdffd",
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    condolences: 4,
  },
  {
    id: 4,
    title: "31st day ceremony after death",
    name: "Mr. Nadesh Rasathurai",
    date: "DD/MM/YYYY",
    address: "h2z, masufd, sddd,sddsdffd",
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    condolences: 4,
  },
];

interface NewsTabsSectionProps {
  className?: string;
}

const NewsTabsSection: React.FC<NewsTabsSectionProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<"recent" | "important">("recent");

  return (
    <div className={cn("container mx-auto px-4 py-6", className)}>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - News Tabs */}
        <div className="md:col-span-2">
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={cn(
                "py-2 px-4 font-medium text-sm mr-4 border-b-2 -mb-px",
                activeTab === "recent"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-[#0B4157] hover:text-gray-900"
              )}
              onClick={() => setActiveTab("recent")}
            >
              Recent News
            </button>
            <button
              className={cn(
                "py-2 px-4 font-medium text-sm border-b-2 -mb-px",
                activeTab === "important"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-700 hover:text-gray-900"
              )}
              onClick={() => setActiveTab("important")}
            >
              Important News
            </button>
          </div>

          <ScrollArea className="h-[790px] pr-4">
            <div className="space-y-6">
              {(activeTab === "recent" ? recentNews : importantNews).map(
                (news, index) => (
                  <div
                    key={index}
                    className="relative group bg-white p-4 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="sm:w-1/3 w-full">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                      <div className="sm:w-2/3 w-full">
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

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center text-gray-500 text-xs">
                            <span className="mr-2">📝</span>
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
        <div className="md:col-span-1 border border-gray-200 rounded-lg p-4">
          <h2 className="text-2xl font-playfair font-bold mb-4 border-b border-gray-200 pb-2">
            <span className="relative">
              Obituary Updates
              <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-red-600"></span>
            </span>
          </h2>

          <ScrollArea className="h-[790px] pr-4">
            <div className="space-y-4">
              {obituaryUpdates.map((obituary) => (
                <ObituaryCard key={obituary.id} entry={obituary} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default NewsTabsSection;
