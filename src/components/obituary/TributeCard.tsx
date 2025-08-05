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

  // Check if account details are valid for donations
  const hasValidAccountDetails = () => {
    if (!entry.accountDetails) return false;
    
    const { bankName, branchName, accountNumber, accountHolderName } = entry.accountDetails;
    
    // Check if all required fields are filled and not empty
    return (
      bankName && bankName.trim() !== '' &&
      branchName && branchName.trim() !== '' &&
      accountNumber && accountNumber.toString().trim() !== '' &&
      accountHolderName && accountHolderName.trim() !== ''
    );
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
          className={`py-2 border border-primary rounded text-primary ${hasValidAccountDetails() ? 'w-4/5' : 'w-full'}`}
        >
          🕯️ {t.postTribute}
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
        {hasValidAccountDetails() && (
          <>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-1/5 py-2 bg-primary text-white rounded"
            >
              💝 {t.donate}
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
