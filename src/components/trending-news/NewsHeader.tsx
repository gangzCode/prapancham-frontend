import { TitleWithUnderline } from "../ui/title-with-underline";
import { ArrowRight } from "lucide-react";

export const NewsHeader = () => {
  return (
    <header className="flex flex-row items-center justify-between w-full gap-4 sm:gap-6 md:gap-10 overflow-x-hidden">
      <div className="flex-shrink min-w-0">
        <TitleWithUnderline text="Trending News" />
      </div>
      <button className="flex-shrink-0 flex items-center gap-2 text-red-800 hover:text-red-700 transition-colors">
        <span className="text-sm sm:text-base md:text-heading-base">
          View more
        </span>
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </header>
  );
};
