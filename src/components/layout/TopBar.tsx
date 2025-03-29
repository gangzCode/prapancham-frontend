import Image from "next/image";
import {
  Select as LanguageSelect,
  SelectContent as LanguageSelectContent,
  SelectItem as LanguageSelectItem,
  SelectTrigger as LanguageSelectTrigger,
  SelectValue as LanguageSelectValue,
} from "@/components/ui/language-select";

const TopBar: React.FC = () => {
  const formatDate = () => {
    const date = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = days[date.getDay()];
    const dateNum = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const ordinal = (n: number) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${day}, ${ordinal(dateNum)} ${month} ${year}`;
  };
  return (
    <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 justify-between items-center px-4 md:px-8 lg:px-16  py-2 sm:py-3 w-full bg-primary shadow-[0px_4px_14px_rgba(0,0,0,0.25)]">
      <div className="flex gap-2 sm:gap-3.5 justify-center items-center">
        <time className="w-full sm:w-auto text-center text-white text-link order-2 sm:order-2 text-sm sm:text-base font-poppins">
          {formatDate()}
        </time>
      </div>
      <div className="hidden sm:block text-sm sm:text-base text-center text-white font-poppins">
        prapancham@gmail.com
      </div>
      <div className="flex gap-1 justify-center items-center text-white whitespace-nowrap">
        <LanguageSelect defaultValue="english">
          <LanguageSelectTrigger className="md:w-[7rem] text-white bg-transparent border-none outline-none cursor-pointer text-sm sm:text-base">
            <LanguageSelectValue
              className="text-white placeholder:text-white text-sm sm:text-base"
              placeholder="Language"
            />
          </LanguageSelectTrigger>
          <LanguageSelectContent>
            <LanguageSelectItem
              value="english"
              className="text-sm sm:text-base"
            >
              English
            </LanguageSelectItem>
            <LanguageSelectItem value="tamil" className="text-sm sm:text-base">
              Tamil
            </LanguageSelectItem>
            <LanguageSelectItem
              value="sinhala"
              className="text-sm sm:text-base"
            >
              Sinhala
            </LanguageSelectItem>
          </LanguageSelectContent>
        </LanguageSelect>
      </div>
    </div>
  );
};

export default TopBar;
