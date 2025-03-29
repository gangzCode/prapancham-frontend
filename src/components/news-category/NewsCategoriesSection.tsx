import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewsCategoryBlock from "./NewsCategoryBlock";
import AdvertisementSidebar from "./AdvertisementSidebar";
import { NewsCardProps } from "./NewsCard";

// Sample data for the news categories
const newsCategoriesData = [
  {
    title: "Category 1",
    news: [
      {
        title:
          "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
        image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b",
        category: "Category 1",
        timeAgo: "2 minutes ago",
      },
      {
        title:
          "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
        image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b",
        category: "Category 1",
        timeAgo: "2 minutes ago",
      },
      {
        title:
          "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
        image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b",
        category: "Category 1",
        timeAgo: "2 minutes ago",
      },
    ],
    adImage: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73",
  },
  {
    title: "Category 2",
    news: [
      {
        title:
          "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
        image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b",
        category: "Category 1",
        timeAgo: "2 minutes ago",
      },
      {
        title:
          "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
        image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b",
        category: "Category 1",
        timeAgo: "2 minutes ago",
      },
      {
        title:
          "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
        image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b",
        category: "Category 1",
        timeAgo: "2 minutes ago",
      },
    ],
    adImage: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73",
  },
  {
    title: "Category 3",
    news: [
      {
        title:
          "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
        image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b",
        category: "Category 1",
        timeAgo: "2 minutes ago",
      },
      {
        title:
          "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
        image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b",
        category: "Category 1",
        timeAgo: "2 minutes ago",
      },
      {
        title:
          "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldihteg convallis.",
        image: "https://images.unsplash.com/photo-1538688423619-a81d3f23454b",
        category: "Category 1",
        timeAgo: "2 minutes ago",
      },
    ],
    adImage: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73",
  },
];

const NewsCategoriesSection: React.FC = () => {
  return (
    <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16  py-6 max-md:px-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left side scrollable news section - 2/3 width on desktop */}
        <div className="md:col-span-2">
          <ScrollArea className="h-[1400px] lg:h-[1570px]  md:border-r-[10px] md:border-gray-200">
            {newsCategoriesData.map((category, index) => (
              <NewsCategoryBlock
                key={index}
                title={category.title}
                news={category.news}
                adImage={category.adImage}
              />
            ))}
          </ScrollArea>
        </div>

        {/* Right side advertisement section - 1/3 width on desktop */}
        <div className="md:col-span-1">
          <AdvertisementSidebar />
        </div>
      </div>
    </section>
  );
};

export default NewsCategoriesSection;