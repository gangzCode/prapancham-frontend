"use client";

import { User } from "lucide-react";

interface SmallNewsCardProps {
  imageUrl: string;
  title: string;
  editorName: string;
  category: string;
  duration: string;
}

export const SmallNewsCard: React.FC<SmallNewsCardProps> = ({
  imageUrl,
  title,
  editorName,
  category,
  duration,
}) => {
  return (
    <article className="relative p-2 w-full max-w-sm mx-auto bg-white shadow-[0px_0px_12px_rgba(0,0,0,0.06)]">
      <div
        className="relative w-full aspect-[4/3] bg-cover bg-center rounded-sm overflow-hidden"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]">
          <div className="absolute top-2 left-2 flex items-center gap-1">
            <User className="w-4 h-4 text-white" />
            <span className="text-body-sm text-white">{editorName}</span>
          </div>
          <h3 className="absolute bottom-4 left-2 right-2 text-heading-base text-white line-clamp-3">
            {title}
          </h3>
        </div>
      </div>
      <div className="flex mt-4 gap-2 items-center">
        <span className="text-secondary text-body-sm">{category}</span>
        <div className="w-1 h-1 rounded-full bg-black"></div>
        <span className="text-neutral-500 text-body-sm">{duration}</span>
      </div>
    </article>
  );
};
