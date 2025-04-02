import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface NewsCardProps {
  title: string;
  image: string;
  category: string;
  timeAgo: string;
  editor: string;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  image,
  category,
  timeAgo,
  editor,
  className,
}) => {
  return (
    <div className={cn("flex gap-4 mb-4 shadow-md p-4 hover:shadow-lg", className)}>
      <div className="w-24 h-24 flex-shrink-0 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <p className="text-sm font-medium line-clamp-3">{title}</p>
        <div className="flex items-center mt-auto text-xs mr-2 justify-between">
          <span className="flex items-center text-gray-500">
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
            {editor}
          </span>
          <div className=" flex gap-2">
            <span className="text-red-600">{category}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
