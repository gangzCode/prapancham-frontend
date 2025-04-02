"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { TitleWithUnderline } from "../ui/title-with-underline";
interface TrendingNewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  editorName: string;
  category: string;
  duration: string;
  featured?: boolean;
}

interface TrendingNewsSectionProps {
  className?: string;
}

const TrendingNewsSection: React.FC<TrendingNewsSectionProps> = ({
  className,
}) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isExpanded = (id: number) => expandedItems.includes(id);

  const trendingNews: TrendingNewsItem[] = [
    {
      id: 1,
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis...",
      image: "https://images.unsplash.com/photo-1516731415730-0c607149933a",
      editorName: "Editor's name",
      category: "Category1",
      duration: "15 minutes ago",
      featured: true,
    },
    {
      id: 2,
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac...",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac...",
      image: "https://images.unsplash.com/photo-1540479859555-17af45c78602",
      editorName: "Editor's name",
      category: "Category1",
      duration: "15 minutes ago",
    },
    {
      id: 3,
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac...",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac...",
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6",
      editorName: "Editor's name",
      category: "Category1",
      duration: "15 minutes ago",
    },
    {
      id: 4,
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac...",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac...",
      image: "https://images.unsplash.com/photo-1520869309377-88c9961a0a2b",
      editorName: "Editor's name",
      category: "Category1",
      duration: "15 minutes ago",
    },
    {
      id: 5,
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac...",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac...",
      image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0",
      editorName: "Editor's name",
      category: "Category1",
      duration: "15 minutes ago",
    },
  ];

  const featuredNews = trendingNews.find((item) => item.featured);
  const regularNews = trendingNews.filter((item) => !item.featured).slice(0, 4);

  return (
    <section
      className={cn(
        "flex flex-wrap gap-6 justify-center px-4 md:px-8 lg:px-16  mt-6 w-full mx-auto max-md:px-5",
        className
      )}
    >
      <div className="flex justify-between items-center mb-6 w-full">

        <div className="flex-shrink min-w-0">
          <TitleWithUnderline text="Trending News" underlineWidth={64} />
        </div>
        <button className="flex-shrink-0 flex items-center gap-2 text-red-800 hover:text-red-700 transition-colors">
          <span className="text-sm sm:text-base md:text-heading-base">
            View more
          </span>
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
        {featuredNews && (
          <div className="md:col-span-6 relative group overflow-hidden p-2 shadow-md">
            <div className="relative h-[420px] overflow-hidden">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-full object-cover "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-xl hover:text-[#ea384c] md:text-2xl font-bold leading-tight mb-2">
                    {featuredNews.title}
                  </h3>
                  <p className="text-sm text-gray-200 mb-2">
                    {isExpanded(featuredNews.id)
                      ? featuredNews.excerpt
                      : featuredNews.excerpt.substring(0, 70)}
                    {!isExpanded(featuredNews.id) && (
                      <button
                        onClick={() => toggleExpand(featuredNews.id)}
                        className="text-[#ea384c] font-medium ml-1 hover:underline focus:outline-none"
                      >
                        Read more
                      </button>
                    )}
                  </p>

                </div>
              </div>
            </div>
            <div className="flex items-center text-sm mt-2 justify-between">
              <span className="flex items-center text-[#737373]">
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
                {featuredNews.editorName}
              </span>
              <div className="flex item-center gap-4">
                <span className="text-[#ea384c]">
                  {featuredNews.category}
                </span>
                <span>•</span>
                <span className="text-[#737373]">
                  {featuredNews.duration}
                </span>
              </div>

            </div>
          </div>
        )}

        <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {regularNews.map((news) => (
            <div
              key={news.id}
              className="relative group overflow-hidden bg-white shadow-sm flex flex-col p-2"
            >
              <div className="relative h-full overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover absolute inset-0 z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-10">
                  <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded-sm">
                    <span className="text-white text-xs flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
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
                      {news.editorName}
                    </span>
                  </div>

                  <div className="p-3 absolute bottom-0 left-0 right-0 text-white z-20">
                    <h3 className="text-sm font-bold line-clamp-2 mb-2 group-hover:text-[#ea384c] transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-200 mb-1">
                      {isExpanded(news.id)
                        ? news.excerpt
                        : news.title.substring(0, 35)}
                      ...
                      <button
                        onClick={() => toggleExpand(news.id)}
                        className="text-[#ea384c] font-medium ml-1 hover:underline focus:outline-none"
                      >
                        Read more
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#ea384c]">{news.category}</span>
                  <span className="text-[#737373]">•</span>
                  <span className="text-[#737373]">{news.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNewsSection;
