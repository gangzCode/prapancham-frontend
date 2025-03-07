import React from "react";
import NewsCard, { NewsCardProps } from "./NewsCard";
import HorizontalAdBanner from "./HorizontalAdBanner";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsCategoryBlockProps {
  title: string;
  news: NewsCardProps[];
  adImage: string;
  className?: string;
}

const NewsCategoryBlock: React.FC<NewsCategoryBlockProps> = ({
  title,
  news,
  adImage,
  className,
}) => {
  return (
    <div className={cn("mb-8", className)}>
      <h2 className="text-xl font-playfair font-bold mb-4 relative pb-2">
        {title}
        <div className="h-1 w-16 bg-red-600 absolute bottom-0 left-0"></div>
      </h2>

      <div className="space-y-4">
        {news.map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            image={item.image}
            category={item.category}
            timeAgo={item.timeAgo}
          />
        ))}
      </div>

      <div className="flex justify-end mb-4 mt-2">
        <a
          href="#"
          className="text-sm font-medium text-red-600 flex items-center hover:underline"
        >
          View more <ChevronRight className="h-4 w-4 ml-1" />
        </a>
      </div>

      <HorizontalAdBanner image={adImage} />
    </div>
  );
};

export default NewsCategoryBlock;
