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
    adImage: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
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
    adImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
];

const NewsCategoriesSection: React.FC = () => {
  return (
    <section className="flex flex-wrap gap-6 justify-center px-32 py-6 my-6 mt-6 w-full mx-auto max-md:px-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Left side scrollable news section - 2/3 width on desktop */}
        <div className="lg:col-span-2 h-[600px] md:h-[800px] lg:h-[1200px] relative">
          <ScrollArea className="h-full pr-4 overflow-auto">
            <div className="space-y-8">
              {newsCategoriesData.map((category, index) => (
                <NewsCategoryBlock
                  key={index}
                  title={category.title}
                  news={category.news}
                  adImage={category.adImage}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right side advertisement section - 1/3 width on desktop */}
        <div className="lg:col-span-1 h-[600px] md:h-[800px] lg:h-[1200px] overflow-hidden">
          <AdvertisementSidebar className="h-full overflow-y-auto" />
        </div>
      </div>
    </section>
  );
};

export default NewsCategoriesSection;
