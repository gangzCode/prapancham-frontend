import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from "@/components/ui/LanguageProvider";

interface BreakingNewsCardProps {
  title: string;
  summary: string;
  image: string;
  category: string;
  timeAgo: string;
  className?: string;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  id: string;
}

const BreakingNewsHCard: React.FC<BreakingNewsCardProps> = ({
  id,
  title,
  summary,
  image,
  category,
  timeAgo,
  className,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext
}) => {
  const { language } = useLanguage();

  const localizedText = {
    en: {
      readMore: "Read more",
      breakingNews: "Breaking News",
    },
    ta: {
      readMore: "மேலும் படிக்க",
      breakingNews: "பிரேக்கிங் நியூஸ்",
    },
    si: {
      readMore: "වැඩිදුර කියවන්න",
      breakingNews: "බ්‍රේකින් නියුස්",
    },
  };

  const langKey =
    language === "tamil" ? "ta" : language === "sinhala" ? "si" : "en";

  return (
    <div className={cn("relative bg-white shadow-sm", className)}>
      <div className="px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between mb-2 pt-4">
          <div className="flex items-center">
            <span className="text-red-600 font-medium mr-2">{localizedText[langKey].breakingNews}</span>
            <span className="text-gray-500 text-2xl leading-none mx-2">•</span>
            <span className="text-gray-500 text-sm">{timeAgo}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              className={cn(
                "p-1 bg-white rounded-full shadow-md",
                hasPrevious ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"
              )}
              onClick={onPrevious}
              disabled={!hasPrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              className={cn(
                "p-1 bg-white rounded-full shadow-md",
                hasNext ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"
              )}
              onClick={onNext}
              disabled={!hasNext}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 pb-4">
          {/* Image */}
          <div className="md:w-1/4 w-full">
            <img 
              src={image} 
              alt={title}
              className="w-full h-[150px] object-cover" 
            />
          </div>
          
          {/* Content */}
          <div className="md:w-3/4 w-full">
            <h2 className="text-xl md:text-2xl font-bold leading-tight mb-2">{title}</h2>
            <p className="text-gray-700 mb-2">{summary}...</p>
            
            <a href={`/news/${id}`} className="text-red-600 font-medium hover:underline">
              {localizedText[langKey].readMore}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsHCard;
