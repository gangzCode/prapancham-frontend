import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { NewsItem } from "./types";

interface BreakingNewsCardProps extends NewsItem {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const BreakingNewsCard: React.FC<BreakingNewsCardProps> = ({
  timestamp,
  title,
  description,
  date,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxLength, setMaxLength] = useState(150);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setMaxLength(150);
      } else if (window.innerWidth >= 768) { // md breakpoint
        setMaxLength(100);
      } else { // sm and below
        setMaxLength(80);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shouldTruncate = description.length > maxLength;
  const displayText = shouldTruncate && !isExpanded
    ? `${description.slice(0, maxLength)}...`
    : description;

  return (
    <div className="relative p-4 w-full bg-white max-md:max-w-full">
      <div className="flex flex-wrap gap-3.5 items-center w-full text-sm max-md:max-w-full">
        <span className="self-stretch my-auto text-center text-secondary text-body-sm">
          Breaking News
        </span>
        <time className="self-stretch my-auto text-neutral-500 text-body-sm">
          {timestamp}
        </time>
      </div>
      <div className="mt-4 w-full max-md:max-w-full">
        <h2 className="text-heading-lg font-bold text-[#1A1D1F] max-md:max-w-full">
          {title}
        </h2>
        <p className="mt-2 text-body-base text-[#1A1D1F] max-md:max-w-full">
          {displayText}
          {shouldTruncate && (
            <button
              className="font-sans font-bold text-secondary ml-1"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </p>
      </div>
      <div className="flex flex-wrap gap-10 justify-between items-center mt-4 w-full max-md:max-w-full">
        <time className="self-stretch my-auto text-body-sm text-neutral-500">
          {date}
        </time>
        <div className="flex gap-3 items-center self-stretch my-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsExpanded(false);
              onPrevious();
            }}
            disabled={!hasPrevious}
            className="text-[#880002]"
            aria-label="Previous news"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsExpanded(false);
              onNext();
            }}
            disabled={!hasNext}
            className="text-[#880002]"
            aria-label="Next news"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsCard;
