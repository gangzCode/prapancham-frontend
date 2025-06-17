import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeDifference = (
  updatedAt: string,
  langKey: "en" | "ta" | "si"
): string => {
  const updatedTime = new Date(updatedAt).getTime();
  const currentTime = new Date().getTime();
  const diffInMs = currentTime - updatedTime;
  const diffInMins = Math.floor(diffInMs / 60000);

  const localeText = {
    en: {
      justNow: "just now",
      minute: "1 minute ago",
      minutes: (n: number) => `${n} minutes ago`,
      hour: "1 hour ago",
      hours: (n: number) => `${n} hours ago`,
      days: (n: number) => `${n} day(s) ago`,
    },
    ta: {
      justNow: "இப்போது",
      minute: "1 நிமிடம் முன்பு",
      minutes: (n: number) => `${n} நிமிடங்கள் முன்பு`,
      hour: "1 மணி நேரம் முன்பு",
      hours: (n: number) => `${n} மணி நேரங்கள் முன்பு`,
      days: (n: number) => `${n} நாட்களுக்கு முன்பு`,
    },
    si: {
      justNow: "දැන්ම",
      minute: "මිනිත්තුවකට පෙර",
      minutes: (n: number) => `${n} මිනිත්තුකට පෙර`,
      hour: "පැය එකකට පෙර",
      hours: (n: number) => `${n} පැයකට පෙර`,
      days: (n: number) => `${n} දිනකට පෙර`,
    },
  };

  const t = localeText[langKey];

  if (diffInMins < 1) return t.justNow;
  if (diffInMins === 1) return t.minute;
  if (diffInMins < 60) return t.minutes(diffInMins);

  const diffInHours = Math.floor(diffInMins / 60);
  if (diffInHours === 1) return t.hour;
  if (diffInHours < 24) return t.hours(diffInHours);

  const diffInDays = Math.floor(diffInHours / 24);
  return t.days(diffInDays);
};
