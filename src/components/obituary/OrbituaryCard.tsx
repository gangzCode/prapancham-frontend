"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DonateModal from "./DonateModal";
import TributeModal from "./TributeModal";
import { Delete, Edit, Minus, Trash, Trash2 } from 'lucide-react';

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
            alt="Portrait"
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
            Condolences
          </p>
        </div>
        <Minus className=" hidden md:block h-10 w-[1px] mt-1 bg-gray-300" />
        <div className="text-left w-full md:w-auto">
          <p className="text font-bold text-gray-500">
            20,000LKR
          </p>
          <p className="text-sm text-gray-500">
            Donation received
          </p>
        </div>
        <Minus className=" hidden md:block h-10 w-[1px] mt-1 bg-gray-300" />
        <div className="text-left w-full md:w-auto">
          <p className="text font-bold text-gray-500">
            12/02/2025
          </p>
          <p className="text-sm text-gray-500">
            Posted date
          </p>
        </div>
      </div>

    </div>
  );
};

export default OrbituaryCard;
