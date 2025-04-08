import React from "react";
import Image from "next/image";

interface TributeCardProps {
  condolencesCount: number;
  timeAgo: string;
  imageUrl: string;
  ceremonyTitle: string;
  eventName: string;
  date: string;
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
  onPostTribute,
  onDonate,
}) => {
  return (
    <div className="w-full  mx-auto bg-white  shadow-md overflow-hidden p-2">
      <div className="flex justify-between w-full items-center border-b">
        <span className="text-[#880002] ">
          {condolencesCount} Condolences
        </span>
        <span className="text-gray-600 text-sm">{timeAgo}</span>
      </div>

      <div className="flex">
        <div className="w-[35%] h-40 relative">
          <Image
            src={imageUrl}
            alt="Portrait"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
        <div className="w-[65%] bg-black text-white p-4 flex flex-col justify-center items-end">
          <p className="text-sm">{ceremonyTitle}</p>
          <p className="text-sm">{eventName}</p>
          <p className="text-sm">{date}</p>
        </div>
      </div>

      <div className="flex justify-between pt-2 border-t gap-2">
        <button
          // onClick={onPostTribute}
          className="w-4/5 py-2 border border-primary rounded text-primary "
        >
          Post Tribute
        </button>
        <button
          // onClick={onDonate}
          className="w-1/5 py-2 bg-primary text-white rounded"
        >
          Donate
        </button>
      </div>
    </div>
  );
};

export default TributeCard;
