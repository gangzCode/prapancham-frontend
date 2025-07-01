"use client";

import * as React from "react";
import Image from "next/image";
import ViewEventButton from "./ViewEventButton";

interface FeaturedEventProps {
  imageUrl: string;
  location: string;
  eventName: string;
  date: string;
}

const FeaturedEvent: React.FC<FeaturedEventProps> = ({
  imageUrl,
  location,
  eventName,
  date,
}) => {
  return (
    <article className="flex relative flex-col justify-center p-2 my-auto bg-white min-w-60 shadow-[0px_0px_12px_rgba(0,0,0,0.06)] w-full md:w-[573px] h-[560px] max-w-full mt-4">
      <Image
        src={imageUrl || "/images/Prapancham-logo.png"}
        alt={eventName}
        fill
        className="object-cover absolute inset-0 z-0 w-full h-full max-md:max-w-full"
      />
      <div className="flex relative z-10 flex-col items-center p-4 w-full h-full bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <div className="flex flex-col justify-end flex-1 px-2 py-4 w-full text-sm max-md:max-w-full">
          <div className="text-[#F8F8F8] text-body-sm">
            <p className="text-[#F8F8F8] text-body-sm max-md:max-w-full">
              {location}
            </p>
            <div className="flex flex-wrap gap-4 justify-between items-start mt-1 w-full">
              <p className="text-[#F8F8F8] text-body-sm break-words max-w-[70%]">
                {eventName}
              </p>
              <time className="text-[#F8F8F8] text-body-sm">{date}</time>
            </div>
          </div>
        </div>
        <ViewEventButton variant="white" />
      </div>
    </article>
  );
};

export default FeaturedEvent;
