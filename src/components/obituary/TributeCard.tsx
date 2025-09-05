"use client";
import React, { useState } from "react";
import Link from "next/link";
import DonateModal from "./DonateModal";
import TributeModal from "./TributeModal";
import { ObituaryEntry } from "../hero/types";
import { useLanguage } from "@/components/ui/LanguageProvider";

type LanguageKey = "en" | "ta" | "si";
interface TributeCardProps {
  condolencesCount: number;
  donationCount: number;
  timeAgo: string;
  imageUrl: string;
  ceremonyTitle: string;
  eventName: string;
  date: string;
  entry: ObituaryEntry;
  onPostTribute?: () => void;
  onDonate?: () => void;
}

const TributeCard: React.FC<TributeCardProps> = ({
  condolencesCount,
  donationCount,
  timeAgo,
  imageUrl,
  ceremonyTitle,
  eventName,
  date,
  entry,
  onPostTribute,
  onDonate,
}) => {
  const { language } = useLanguage();
  let langKey: LanguageKey = "en";
  if (language === "tamil") langKey = "ta";
  else if (language === "sinhala") langKey = "si";

  const translations: Record<LanguageKey, { [key: string]: string }> = {
    en: {
      condolences: "Condolences",
      donations: "Donations",
      postTribute: "Post Tribute",
      donate: "Donate",
      portrait: "Portrait"
    },
    ta: {
      condolences: "இரங்கல்கள்",
      donations: "நன்கொடை",
      postTribute: "அஞ்சலி அனுப்பு",
      donate: "நன்கொடை",
      portrait: "உருவப்படம்"
    },
    si: {
      condolences: "අනුකම්පාව",
      donations: "දායදීම",
      postTribute: "උපහාරය යවන්න",
      donate: "දානය",
      portrait: "ප්‍රතිමාව"
    }
  };

  const t = translations[langKey];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTributeModalOpen, setIsTributeModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  // Check if donations are enabled for this memorial
  const isDonationEnabled = () => {
    return entry.isDonationReceivable === true;
  };

  return (
    <div className="w-full  mx-auto bg-white  shadow-md overflow-hidden p-2">
      <div className="flex justify-between w-full items-center border-b">
        <div className="flex gap-8 items-center">
          <span className="text-[#880002] ">
            {condolencesCount} {t.condolences}
          </span>
          <div className="w-px h-4 bg-gray-300"></div>
          <span className="text-[#880002] ">
            {donationCount} {t.donations}
          </span>
        </div>
        <span className="text-gray-600 text-sm">{timeAgo}</span>
      </div>
      <Link href={`/obituary/${entry._id}`}>
        <div className="flex cursor-pointer hover:opacity-90 transition-opacity duration-200">
          <div className="w-[35%] h-40 relative overflow-hidden">
            <img
              src={imageUrl}
              alt={t.portrait}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[65%] bg-black text-white p-4 flex flex-col justify-center items-end">
            <p className="text-sm">{ceremonyTitle}</p>
            <p className="text-sm">{eventName}</p>
            <p className="text-sm">{date}</p>
          </div>
        </div>
      </Link>

      <div className="flex justify-between pt-2 border-t gap-2">
        <button
          onClick={() => setIsTributeModalOpen(true)}
          className={`bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-gray-400 px-4 py-3 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 font-semibold justify-center ${isDonationEnabled() ? 'flex-grow' : 'w-full'}`}
        >
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          {t.postTribute}
        </button>
        <TributeModal 
          isOpen={isTributeModalOpen} 
          onClose={() => setIsTributeModalOpen(false)}
          obituaryEntry={entry}
          timeAgo={timeAgo}
          imageUrl={imageUrl}
          ceremonyTitle={ceremonyTitle}
          eventName={eventName}
          date={date}
        />
        {isDonationEnabled() && (
          <>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-gray-400 px-4 py-3 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 font-semibold min-w-[120px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 013 18.546V19a1 1 0 001 1h16a1 1 0 001-1v-.454c0-.793-.644-1.546-1.5-1.546z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12.054l-2.5-2.5L8 11.054l4 4 4-4-1.5-1.5-2.5 2.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.054V12.054" />
              </svg>
              {t.donate}
            </button>
            <DonateModal
              isOpen={isModalOpen}
              onClose={closeModal}
              obituaryEntry={entry}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TributeCard;
