"use client";

import React from "react";
import { useLanguage } from "@/components/ui/LanguageProvider";

interface ViewEventButtonProps {
  variant?: "teal" | "white";
  onClick?: () => void;
}

const ViewEventButton: React.FC<ViewEventButtonProps> = ({
  variant = "teal",
  onClick,
}) => {
  const { language } = useLanguage();

  // Localized button text
  const buttonText = React.useMemo(() => {
    switch (language) {
      case "tamil":
        return "நிகழ்வு விவரங்களைப் பார்க்கவும்";
      case "sinhala":
        return "සිදුවීම් විස්තර බලන්න";
      default:
        return "View Event Details";
    }
  }, [language]);

  const baseStyles =
    "gap-2.5 px-4 py-3.5 w-full text-body-xs rounded border border-solid min-h-10 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]";
  const variantStyles =
    variant === "teal"
      ? "text-teal-900 border-teal-900"
      : "text-white border-white";

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles}`}>
      {buttonText}
    </button>
  );
};

export default ViewEventButton;
