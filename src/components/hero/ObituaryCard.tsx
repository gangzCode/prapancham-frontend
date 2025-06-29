"use client";

import type { ObituaryEntry } from "./types";
import { useLanguage } from "@/components/ui/LanguageProvider";
import DonateModal from "../obituary/DonateModal";
import { useEffect, useState } from "react";

interface ObituaryCardProps {
  entry: ObituaryEntry;
}

const ObituaryCard: React.FC<ObituaryCardProps> = ({ entry }) => {
  const { language } = useLanguage();
  const langKey: "en" | "ta" | "si" = language === "tamil" ? "ta" : language === "sinhala" ? "si" : "en";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log("ObituaryCard rendered with entry:", entry);
  }, [entry]);

  const localizedText = {
    condolences: {
      en: `${entry.condolences} Condolences`,
      ta: `${entry.condolences} இரங்கல்கள்`,
      si: `${entry.condolences} සංවේදීතා`,
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
      <article className="flex flex-col justify-center p-2 w-full rounded-lg bg-stone-50">
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

        <div className="flex gap-10 justify-between items-center py-1 mt-2 w-full text-xs rounded">
          <p className="self-stretch shrink-0 my-auto text-body-xs text-secondary">
            {entry.condolences} {localizedText.condolences[langKey]}
          </p>
          <div className="flex gap-2 items-center self-stretch my-auto">
            <button className="gap-2.5 self-stretch shrink-0 px-4 py-1.5 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
              {localizedText.postTribute[langKey]}
            </button>
            <button
              onClick={openModal}
              className="gap-2.5 self-stretch px-4 py-1.5 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
              {localizedText.donate[langKey]}
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


    </>
  );
};

export default ObituaryCard;
