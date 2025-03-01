"use client";

import * as React from "react";
import Image from "next/image";
import ViewEventButton from "./ViewEventButton";

interface EventCardProps {
  imageUrl: string;
  location: string;
  eventName: string;
  date: string;
}

const EventCard: React.FC<EventCardProps> = ({
  imageUrl,
  location,
  eventName,
  date,
}) => {
  return (
    <article className="flex relative flex-col gap-4 p-2 w-full bg-white min-h-[212px] shadow-[0px_0px_12px_rgba(0,0,0,0.06)] max-md:max-w-full">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={eventName}
          width={400}
          height={112}
          className="object-cover w-full aspect-[3.57] max-md:max-w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end px-4 py-3">
          <div className="text-[#F8F8F8] text-body-sm">
            <p className="text-[#F8F8F8] text-body-sm max-md:max-w-full">
              {location}
            </p>
            <div className="flex flex-wrap gap-4 justify-between items-start mt-1 w-full">
              <p className="text-[#F8F8F8] text-body-sm break-words max-w-[70%]">{eventName}</p>
              <time className="text-[#F8F8F8] text-body-sm">{date}</time>
            </div>
          </div>
        </div>
      </div>
      <ViewEventButton variant="teal" />
    </article>
  );
};

export default EventCard;
