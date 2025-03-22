import React from "react";
import Link from "next/link";

interface NewsCardProps {
  id: number;
  title: string;
  image: string;
  category: string;
  duration: string;
  editorName: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  image,
  category,
  duration,
  editorName,
}) => {
  return (
    <div className="group relative overflow-hidden bg-white rounded-sm shadow-sm hover:shadow transition-all duration-300">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-44 object-cover" />
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-sm">
          <span>{editorName}</span>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2 mb-1 group-hover:text-accent transition-colors">
          {title}
        </h3>

        <div className="flex justify-between items-center text-xs mt-2">
          <span className="text-accent">{category}</span>
          <span className="text-gray-500">{duration}</span>
        </div>

        <Link
          href={`/news/${id}`}
          className="text-xs text-primary hover:text-accent mt-1 block"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
