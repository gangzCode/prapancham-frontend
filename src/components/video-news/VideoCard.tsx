import React from "react";
import Image from "next/image";
import { Play, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VideoCardProps {
  title: string;
  excerpt: string;
  image: string;
  editorName: string;
  category: string;
  duration: string;
  variant?: "small" | "large";
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  excerpt,
  image,
  editorName,
  category,
  duration,
  variant = "small",
}) => {
  return (
    <div
      className={cn(
        "group flex bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1",
        variant === "small" ? "sm:flex-row flex-col gap-4 p-3" : "flex-col p-4"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-sm",
          variant === "small"
            ? "sm:w-[120px] w-full sm:h-[90px] aspect-video sm:flex-shrink-0"
            : "w-full aspect-video mb-4"
        )}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/90 rounded-full p-2 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300 video-play-button">
            <Play className="w-4 h-4 text-primary fill-primary" />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col",
          variant === "large" ? "mt-2" : "flex-1 sm:mt-0 mt-2"
        )}
      >
        <h3
          className={cn(
            "font-bold text-primary text-heading-base leading-tight group-hover:text-secondary transition-colors",
            variant === "large" ? "text-2xl mb-2" : "text-base"
          )}
        >
          {title}
        </h3>

        <p className="text-body-sm text-gray-700 line-clamp-2 mb-2">
          {excerpt}
        </p>

        <a
          href="#"
          className="text-secondary font-medium text-sm hover:underline mb-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          Read more
          <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </a>

        <div className="flex items-center text-sm text-gray-500 gap-3 mt-auto">
          <div className="flex items-center gap-1">
            <span className="text-gray-400 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {editorName}
            </span>
          </div>
          <span className="font-medium text-secondary">{category}</span>
          <span className="text-gray-500">{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
