import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewsCard, { NewsCardProps } from "./NewsCard";
import AdvertisementSidebar from "../news-category/AdvertisementSidebar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

// Sample data for the news categories
const allNewsData = {
  General: [
    {
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
      image: "/images/breaking-news-image-1.png",
      category: "General",
      timeAgo: "2 minutes ago",
      date: new Date(2025, 1, 14), // Feb 14, 2025
    },
    {
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
      image: "/images/breaking-news-image-1.png",
      category: "General",
      timeAgo: "2 minutes ago",
      date: new Date(2025, 1, 14), // Feb 14, 2025
    },
    {
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
      image: "/images/breaking-news-image-1.png",
      category: "General",
      timeAgo: "2 minutes ago",
      date: new Date(2025, 1, 14), // Feb 14, 2025
    },
    {
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
      image: "/images/breaking-news-image-1.png",
      category: "General",
      timeAgo: "2 minutes ago",
      date: new Date(2025, 1, 14), // Feb 14, 2025
    },
    {
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
      image: "/images/breaking-news-image-1.png",
      category: "General",
      timeAgo: "2 minutes ago",
      date: new Date(2025, 1, 14), // Feb 14, 2025
    },
    {
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.",
      image: "/images/breaking-news-image-1.png",
      category: "General",
      timeAgo: "2 hours ago",
      date: new Date(2025, 1, 14), // Feb 14, 2025
    },
    {
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.",
      image: "/images/breaking-news-image-1.png",
      category: "General",
      timeAgo: "1 day ago",
      date: new Date(2025, 1, 14), // Feb 13, 2025
    },
    {
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
      image: "/images/breaking-news-image-1.png",
      category: "General",
      timeAgo: "2 minutes ago",
      date: new Date(2025, 1, 14), // Feb 14, 2025
    },
    {
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.",
      image: "/images/breaking-news-image-1.png",
      category: "General",
      timeAgo: "2 hours ago",
      date: new Date(2025, 1, 14), // Feb 14, 2025
    },
    {
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.",
      image: "/images/breaking-news-image-1.png",
      category: "General",
      timeAgo: "1 day ago",
      date: new Date(2025, 1, 14), // Feb 13, 2025
    },
  ],
  Sports: [
    {
      title: "Major Sports Event Announced for Summer 2025, Athletes Prepare",
      image: "https://images.unsplash.com/photo-1534885320675-b08336a5ef8d",
      category: "Sports",
      timeAgo: "3 hours ago",
      date: new Date(2025, 1, 14), // Feb 14, 2025
    },
    {
      title: "Local Team Wins Championship After Decade-Long Drought",
      image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b",
      category: "Sports",
      timeAgo: "1 day ago",
      date: new Date(2025, 1, 13), // Feb 13, 2025
    },
    {
      title: "New Training Techniques Revolutionizing Athletic Performance",
      image: "https://images.unsplash.com/photo-1534885320675-b08336a5ef8d",
      category: "Sports",
      timeAgo: "2 days ago",
      date: new Date(2025, 1, 12), // Feb 12, 2025
    },
  ],
  Politics: [
    {
      title: "Key Legislation Passes in Historic Vote",
      image: "https://images.unsplash.com/photo-1665931500523-5b316acd1f52",
      category: "Politics",
      timeAgo: "5 hours ago",
      date: new Date(2025, 1, 14), // Feb 14, 2025
    },
    {
      title: "International Summit Addresses Global Challenges",
      image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b",
      category: "Politics",
      timeAgo: "1 day ago",
      date: new Date(2025, 1, 13), // Feb 13, 2025
    },
    {
      title: "New Policy Framework Announced for Economic Recovery",
      image: "https://images.unsplash.com/photo-1534885320675-b08336a5ef8d",
      category: "Politics",
      timeAgo: "3 days ago",
      date: new Date(2025, 1, 11), // Feb 11, 2025
    },
  ],
};

// Menu categories
const menuCategories = [
  "General",
  "Sports",
  "Politics",
  "Page3",
  "Page4",
  "Page5",
  "More",
];

const NewsCategoriesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("General");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2025, 1, 14)
  ); // Feb 14, 2025
  const [filteredNews, setFilteredNews] = useState<any[]>([]);

  // Update filtered news when category or date changes
  useEffect(() => {
    if (selectedDate) {
      // Filter news data based on active category and selected date
      const categoryNews =
        allNewsData[activeCategory as keyof typeof allNewsData] || [];
      const filtered = categoryNews.filter((item) => {
        if (!selectedDate) return true;
        return item.date.toDateString() === selectedDate.toDateString();
      });
      setFilteredNews(filtered);
    } else {
      // If no date is selected, show all news from the active category
      setFilteredNews(
        allNewsData[activeCategory as keyof typeof allNewsData] || []
      );
    }
  }, [activeCategory, selectedDate]);

  return (
    <section className="px-4 md:px-8 lg:px-16 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Left side scrollable news section - 2/3 width on desktop */}
        <div className="lg:col-span-2 h-[600px] md:h-[800px] lg:h-[1600px] relative bg-white rounded-md shadow-sm overflow-hidden">
          {/* Category Menu Bar */}
          <div className="flex items-center bg-gray-50 p-2 border-b overflow-x-auto whitespace-nowrap">
            {menuCategories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className={`px-4 py-2 rounded-none border-b-2 ${
                  activeCategory === category
                    ? "border-red-600 text-red-600 font-medium"
                    : "border-transparent text-gray-700 hover:text-red-600"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Date and Calendar Bar */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="text-sm text-gray-600">
              {selectedDate
                ? format(selectedDate, "EEEE, do MMM yyyy")
                : "Select a date"}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1">
                  <CalendarIcon className="h-5 w-5 text-red-600" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Scrollable Content */}
          <ScrollArea className="h-[calc(100%-110px)]">
            {filteredNews.length > 0 ? (
              <div className="divide-y">
                {filteredNews.map((item, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50">
                    <div className="flex gap-4">
                      <div className="w-32 h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-3">
                          {item.title}
                        </p>
                        <div className="flex justify-between items-center mt-2 text-xs">
                          <span className="text-red-600">{item.category}</span>
                          <span className="text-gray-500">{item.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No news found for this category and date. Try selecting a
                different date or category.
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Right side advertisement section - 1/3 width on desktop */}
        <div className="lg:col-span-1 h-[600px] md:h-[800px] lg:h-[1600px] pr-4 border-r-[3px] border-gray-200 overflow-hidden">
          <AdvertisementSidebar className="h-full overflow-y-auto" />
        </div>
      </div>
    </section>
  );
};

export default NewsCategoriesSection;
