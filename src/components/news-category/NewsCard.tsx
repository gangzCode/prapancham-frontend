import React from "react";
import Image from "next/image";
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
    <div className={cn("flex gap-4 mb-4", className)}>
      <div className="w-24 h-24 flex-shrink-0 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium line-clamp-3">{title}</p>
        <div className="flex items-center mt-2 text-xs">
          <span className="text-red-600">{category}</span>
          <span className="text-gray-500 mx-1">•</span>
          <span className="text-gray-500">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
