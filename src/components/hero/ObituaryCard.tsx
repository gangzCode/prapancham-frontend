"use client";

import type { ObituaryEntry } from "./types";
import { useLanguage } from "@/components/ui/LanguageProvider";
import DonateModal from "../obituary/DonateModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TributeModal from "../obituary/TributeModal";

interface ObituaryCardProps {
  entry: ObituaryEntry;
}

const ObituaryCard: React.FC<ObituaryCardProps> = ({ entry }) => {
  const { language } = useLanguage();
  const langKey: "en" | "ta" | "si" = language === "tamil" ? "ta" : language === "sinhala" ? "si" : "en";
  const router = useRouter();
  const [isTributeModalOpen, setIsTributeModalOpen] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    router.push(`/obituary/${entry._id}`);
  };

  // Function to calculate time ago from createdAt
  const calculateTimeAgo = (createdAt: string): string => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMilliseconds = now.getTime() - created.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays > 1 ? 'days' : 'day'} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} ${diffInHours > 1 ? 'days' : 'day'} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} ${diffInMinutes > 1 ? 'minutes' : 'minute'} ago`;
    } else {
      return 'just now';
    }
  };

  useEffect(() => {
    console.log("ObituaryCard rendered with entry:", entry);
  }, [entry]);

  const localizedText = {
    condolences: {
      en: `Condolences`,
      ta: `இரங்கல்கள்`,
      si: `සංවේදීතා`,
    },

    postTribute: {
      en: "Post Tribute",
      ta: "குறிப்பு இடுகை",
      si: "සම්මානය පළ කරන්න",
    },
    donate: {
      en: "Donate",
      ta: "நன்கொடை",
      si: "දන්සැලැස්ම",
    },
  };
  return (
    <>
      <article
        className="flex flex-col justify-center p-2 w-full rounded-lg bg-stone-50 cursor-pointer hover:bg-stone-100 transition-colors duration-200"
        onClick={handleCardClick}
      >
        <h3 className="gap-3.5 self-stretch py-1 w-full text-heading-base text-[#0D1322] rounded">
          {entry.title}
        </h3>
        <hr className="mt-2 w-full min-h-0 border border-solid border-neutral-400" />

        <div className="flex gap-2 mt-2 w-full text-sm">
          <img
            src={entry.imageUrl}
            alt={entry.name}
            className="object-contain shrink-0 my-auto  aspect-square w-[100px]"
          />
          <div className="flex flex-col flex-1 shrink justify-center basis-0">
            <p className="text-body-sm text-secondary">{entry.name}</p>
            <time className="mt-1 text-neutral-500 text-body-sm">{entry.date}</time>
            <address className="mt-1 text-body-sm text-[#1A1D1F] not-italic">
              {entry.address}
            </address>
          </div>
        </div>

        <hr className="mt-2 w-full min-h-0 border border-solid border-neutral-400" />

        <div className="flex gap-4 justify-between items-center py-1 mt-2 w-full text-xs rounded">
          <p className="self-stretch shrink-0 my-auto text-body-xs text-secondary">
            {entry.condolences} {localizedText.condolences[langKey]}
          </p>
          <div className="flex gap-2 items-center self-stretch my-auto">
            <button className="gap-2.5 self-stretch shrink-0 px-4 py-1.5 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]" onClick={() =>
              setIsTributeModalOpen(true)
            }>
              🕯️ {localizedText.postTribute[langKey]}
            </button>
            <button
              onClick={openModal}
              className="gap-2.5 self-stretch px-4 py-1.5 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
              💝 {localizedText.donate[langKey]}
            </button>
          </div>
        </div>
      </article>
      {isModalOpen && (
        <DonateModal
          isOpen={true}
          onClose={closeModal}
          obituaryEntry={entry}
        />
      )}

      <TributeModal
        isOpen={isTributeModalOpen}
        onClose={() => setIsTributeModalOpen(false)}
        obituaryEntry={{
          _id: entry._id,
          title: entry.title,
          name: entry.title,
          date: entry.date ? new Date(entry.date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }) : '',
          address: entry.address,
          imageUrl: entry.imageUrl || "/images/tribute.jpg",
          condolences: entry.condolences ? entry.condolences : 0
        }}
        timeAgo={""}
        imageUrl={entry.imageUrl || "/images/tribute.jpg"}
        ceremonyTitle={entry.title}
        eventName={entry.title}
        date={entry.date ? new Date(entry.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }) : ''}
      />


    </>
  );
};

export default ObituaryCard;
