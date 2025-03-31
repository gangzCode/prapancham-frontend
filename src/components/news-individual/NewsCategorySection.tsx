import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import NewsCard from "./NewsCard";
import { TitleWithUnderline } from "../ui/title-with-underline";

interface NewsItem {
  id: number;
  title: string;
  image: string;
  category: string;
  duration: string;
  editorName: string;
}

interface NewsCategorySectionProps {
  title: string;
  news: NewsItem[];
  bannerImage: string;
  bannerAlt: string;
}

const NewsCategorySection: React.FC<NewsCategorySectionProps> = ({
  title,
  news,
  bannerImage,
  bannerAlt,
}) => {
  return (
    <section className="mb-12">
      {/* <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <h2 className="text-xl font-bold text-primary">{title}</h2>
          <div className="absolute -bottom-2 left-0 h-0.5 w-24 bg-accent"></div>
        </div>
        <Link
          href="/news/all"
          className="text-accent text-sm flex items-center gap-1 hover:underline"
        >
          View more <ChevronRight className="w-4 h-4" />
        </Link>
      </div> */}
      <div className="flex justify-between items-center mb-6 w-full">
        <div className="flex-shrink min-w-0">
          <TitleWithUnderline text={title} underlineWidth={64} />
        </div>
        <button className="flex-shrink-0 flex items-center gap-2 text-red-800 hover:text-red-700 transition-colors">
          <span className="text-sm sm:text-base md:text-heading-base">
            View more
          </span>
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            category={item.category}
            duration={item.duration}
            editorName={item.editorName}
          />
        ))}
      </div>

      <div className="w-full overflow-hidden rounded-sm">
        <img
          src={bannerImage}
          alt={bannerAlt}
          className="w-full h-[232px] object-cover"
        />
      </div>
    </section>
  );
};

export default NewsCategorySection;
