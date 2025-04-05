"use client";

import type { ObituaryEntry } from "./types";

interface ObituaryCardProps {
  entry: ObituaryEntry;
}

const ObituaryCard: React.FC<ObituaryCardProps> = ({ entry }) => {
  return (
    <article className="flex flex-col justify-center p-2 w-full rounded-lg bg-stone-50">
      <h3 className="gap-3.5 self-stretch py-1 w-full text-heading-base text-[#0B4157] rounded">
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
        <p className="self-stretch my-auto text-body-xs text-secondary">
          {entry.condolences} Condolences
        </p>
        <div className="flex gap-2 items-center self-stretch my-auto">
          <button className="gap-2.5 self-stretch px-4 py-1.5 my-auto text-body-xs text-[#0B4157] rounded border border-teal-900 border-solid min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
            Post Tribute
          </button>
          <button className="gap-2.5 self-stretch px-4 py-1.5 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
            Donate
          </button>
        </div>
      </div>
    </article>
  );
};

export default ObituaryCard;
