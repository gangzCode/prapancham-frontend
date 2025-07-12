import React from "react";
import NewsCard, { NewsCardProps } from "./NewsCard";
import HorizontalAdBanner from "./HorizontalAdBanner";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TitleWithUnderline } from "../ui/title-with-underline";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "../ui/LanguageProvider";

interface NewsCategoryBlockProps {
  title: string;
  news: NewsCardProps[];
  adImage: string;
  className?: string;
  categoryId?: string; // Add categoryId prop
}

const NewsCategoryBlock: React.FC<NewsCategoryBlockProps> = ({
  title,
  news,
  adImage,
  className,
  categoryId,
}) => {
  const { language } = useLanguage();
  
  const viewMoreText = {
    english: "View more",
    tamil: "மேலும் பார்க்க",
    sinhala: "තවත් බලන්න",
  };

  return (
    <div className={cn("mb-8 md:mr-8", className)}>
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
            editor={item.editor}
            _id={item._id}
          />
        ))}
      </div>

      <div className="flex justify-end mb-4 mt-2 mr-4"
        onClick={() => {
          const url = categoryId ? `/news?category=${categoryId}` : "/news";
          window.location.href = url;
        }
        }
      >
        <a
          href="#"
          className="text-sm font-medium text-red-600 flex items-center hover:underline"
        >
          <span className="text-sm sm:text-base md:text-heading-base">
            {viewMoreText[language as keyof typeof viewMoreText] || viewMoreText.english}
          </span>
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </a>
      </div>

      <HorizontalAdBanner image={adImage} />
      <Separator className="!w-full" />

    </div>
  );
};

export default NewsCategoryBlock;
