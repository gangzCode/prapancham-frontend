"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Delete, Edit, Minus, Trash, Trash2 } from 'lucide-react';
import { useLanguage } from "@/components/ui/LanguageProvider";

type LanguageKey = "en" | "ta" | "si";

interface OrbituaryCardProps {
  condolencesCount: number;
  timeAgo: string;
  imageUrl: string;
  ceremonyTitle: string;
  eventName: string;
  date: string;
  onPostTribute?: () => void;
  onDonate?: () => void;
}

const OrbituaryCard: React.FC<OrbituaryCardProps> = ({
  condolencesCount,
  timeAgo,
  imageUrl,
  ceremonyTitle,
  eventName,
  date,
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
      donationReceived: "Donation received",
      postedDate: "Posted date",
      portrait: "Portrait"
    },
    ta: {
      condolences: "இரங்கல்கள்",
      donationReceived: "நன்கொடை பெறப்பட்டது",
      postedDate: "இடுகை தேதி",
      portrait: "உருவப்படம்"
    },
    si: {
      condolences: "අනුකම්පාව",
      donationReceived: "දානය ලැබුණි",
      postedDate: "පළ කළ දිනය",
      portrait: "ප්‍රතිමාව"
    }
  };

  const t = translations[langKey];
  return (
    <div className="w-full   bg-white  shadow-md overflow-hidden p-2">
      <div className="flex justify-end w-full items-center border-b gap-2">
        <Trash2 className="w-4 h-4 mb-2 text-[#880002]" />
        <Edit className="w-4 h-5 mb-1" />
      </div>

      <div className="flex">
        <div className="w-[40%] h-48 relative">
          <Image
            src={imageUrl}
            alt={t.portrait}
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
        <div className="w-[60%] bg-black text-white p-4 flex flex-col justify-center items-end">
          <p className="text-sm">{ceremonyTitle}</p>
          <p className="text-sm">{eventName}</p>
          <p className="text-sm">{date}</p>
        </div>
      </div>

      <div className="flex flex-wrap md:justify-between pt-2 border-t gap-2 break-words whitespace-normal">
        <div className="text-left w-full md:w-auto">
          <p className="text font-bold text-gray-500">
            04
          </p>
          <p className="text-sm text-gray-500">
            {t.condolences}
          </p>
        </div>
        <Minus className=" hidden md:block h-10 w-[1px] mt-1 bg-gray-300" />
        <div className="text-left w-full md:w-auto">
          <p className="text font-bold text-gray-500">
            20,000LKR
          </p>
          <p className="text-sm text-gray-500">
            {t.donationReceived}
          </p>
        </div>
        <Minus className=" hidden md:block h-10 w-[1px] mt-1 bg-gray-300" />
        <div className="text-left w-full md:w-auto">
          <p className="text font-bold text-gray-500">
            12/02/2025
          </p>
          <p className="text-sm text-gray-500">
            {t.postedDate}
          </p>
        </div>
      </div>

    </div>
  );
};

export default OrbituaryCard;
