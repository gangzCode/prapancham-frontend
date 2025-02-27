import Image from "next/image";
import {
  Select as LanguageSelect,
  SelectContent as LanguageSelectContent,
  SelectItem as LanguageSelectItem,
  SelectTrigger as LanguageSelectTrigger,
  SelectValue as LanguageSelectValue,
} from "@/components/ui/language-select";

const TopNav: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 justify-between items-center px-4 sm:px-6 md:px-12 lg:px-32 py-2 sm:py-3 w-full bg-primary shadow-[0px_4px_14px_rgba(0,0,0,0.25)]">
      <div className="flex gap-1 justify-center items-center text-sm sm:text-base text-white whitespace-nowrap">
        <LanguageSelect>
          <LanguageSelectTrigger className="w-[140px] sm:w-[180px] text-white bg-transparent border-none outline-none cursor-pointer">
            <LanguageSelectValue
              className="text-white placeholder:text-white"
              placeholder="Language"
            />
          </LanguageSelectTrigger>
          <LanguageSelectContent>
            <LanguageSelectItem value="english">English</LanguageSelectItem>
            <LanguageSelectItem value="tamil">Tamil</LanguageSelectItem>
            <LanguageSelectItem value="sinhala">Sinhala</LanguageSelectItem>
          </LanguageSelectContent>
        </LanguageSelect>
      </div>
      <div className="hidden sm:block text-sm sm:text-base text-center text-white font-poppins">
        prapancham@gmail.com
      </div>
      <div className="flex gap-2 sm:gap-3.5 justify-center items-center">
        <Image
          src="/icons/facebook-icon.svg"
          className="object-contain aspect-square w-5 sm:w-6"
          alt="Facebook icon"
          width={24}
          height={24}
          priority
        />
        <Image
          src="/icons/x-icon.svg"
          className="object-contain aspect-square w-5 sm:w-6"
          alt="X (Twitter) icon"
          width={24}
          height={24}
          priority
        />
        <Image
          src="/icons/instagram-icon.svg"
          className="object-contain aspect-square w-5 sm:w-6"
          alt="Instagram icon"
          width={24}
          height={24}
          priority
        />
        <Image
          src="/icons/youtube-icon.svg"
          className="object-contain aspect-square w-5 sm:w-6"
          alt="Youtube icon"
          width={24}
          height={24}
          priority
        />
      </div>
    </div>
  );
};

export default TopNav;
