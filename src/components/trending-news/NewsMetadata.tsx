"use client";

interface NewsMetadataProps {
  editorName: string;
  category: string;
  duration: string;
  variant?: "light" | "dark";
  className?: string;
}

export const NewsMetadata: React.FC<NewsMetadataProps> = ({
  editorName,
  category,
  duration,
  variant = "dark",
  className = "",
}) => {
  const textColor = variant === "light" ? "text-white" : "text-neutral-500";

  return (
    <div className={`flex justify-between items-center text-sm ${className}`}>
      <div className="flex gap-2 items-center">
        <div className={`flex shrink-0 w-4 h-4 ${textColor}`} />
        <span className={textColor}>{editorName}</span>
      </div>
      <div className="flex gap-2">
        <span className="text-red-800">{category}</span>
        <span className="text-neutral-500">{duration}</span>
      </div>
    </div>
  );
};
