import React from "react";
import Link from "next/link";
import { ArrowRight, UserRound, ChevronRight } from "lucide-react";

interface NewsCardProps {
  id: String;
  title: string;
  image: string;
  category: string;
  duration: string;
  editorName: string;
  language?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  image,
  category,
  duration,
  editorName,
  language 
  
}) => {
  return (
    <div className="group relative overflow-hidden bg-white  shadow-sm hover:shadow transition-all duration-300">
      {/* <div className="relative">
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
      </div> */}
      <div className="bg-white overflow-hidden">
        <div className="relative">
          <img alt={title} className="w-full h-64 object-cover filter " height="500" src={image || undefined} width="600" />
          <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-between">
            <div className="flex items-center text-white text-sm mb-2">
              <UserRound />
              <span>{editorName}</span>
            </div>
            <p className="text-white mb-4">
              {title.length > 50 ? `${title.slice(0, 50)}...` : title}
              <Link
                href={`/news/${id}`}
              ><span className=" font-semibold">{language==="en" ? " Read more" : language==="ta" ? " மேலும் படிக்க" : language==="si" ? " තවත් කියවන්න" : " Read more"}</span>
              </Link>
            </p>
          </div>
        </div>
        <div className="p-4 flex items-center text-gray-500 text-sm">
          <span className="text-red-500">{category}</span>
          <span className="mx-2">•</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
