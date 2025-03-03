import React from "react";
import { cn } from "@/lib/utils";

export interface NewsCardProps {
  title: string;
  image: string;
  category: string;
  timeAgo: string;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  image,
  category,
  timeAgo,
  className,
}) => {
  return (
    <div className={cn("flex gap-4 mb-4 bg-white p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md", className)}>
      <div className="w-24 h-24 flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <p className="text-heading-base line-clamp-3">{title}</p>
        <div className="flex gap-2 items-center mt-2 text-xs">
          <span className="text-secondary text-body-sm">{category}</span>
          <div className="w-1 h-1 rounded-full bg-black"></div>
          <span className="text-[#737373] text-body-sm">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
