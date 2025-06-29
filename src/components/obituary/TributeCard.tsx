"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DonateModal from "./DonateModal";
import TributeModal from "./TributeModal";
import { ObituaryEntry } from "../hero/types";
interface TributeCardProps {
  condolencesCount: number;
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
  timeAgo,
  imageUrl,
  ceremonyTitle,
  eventName,
  date,
  entry,
  onPostTribute,
  onDonate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTributeModalOpen, setIsTributeModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full  mx-auto bg-white  shadow-md overflow-hidden p-2">
      <div className="flex justify-between w-full items-center border-b">
        <span className="text-[#880002] ">
          {condolencesCount} Condolences
        </span>
        <span className="text-gray-600 text-sm">{timeAgo}</span>
      </div>
      <Link href="/obituary/01">
        <div className="flex">
          <div className="w-[35%] h-40 relative overflow-hidden">
            <img
              src={imageUrl}
              alt="Portrait"
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
          className="w-4/5 py-2 border border-primary rounded text-primary "
        >
          Post Tribute
        </button>
        <TributeModal isOpen={isTributeModalOpen} onClose={() => setIsTributeModalOpen(false)} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-1/5 py-2 bg-primary text-white rounded"
        >
          Donate
        </button>
        <DonateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          obituaryEntry={entry}
        />
      </div>
    </div>
  );
};

export default TributeCard;
