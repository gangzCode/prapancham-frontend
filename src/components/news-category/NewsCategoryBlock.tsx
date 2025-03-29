import React from "react";
import NewsCard, { NewsCardProps } from "./NewsCard";
import HorizontalAdBanner from "./HorizontalAdBanner";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TitleWithUnderline } from "../ui/title-with-underline";

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
        <div className="flex-shrink min-w-0">
          <TitleWithUnderline text={title} underlineWidth={64} />
        </div>
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
