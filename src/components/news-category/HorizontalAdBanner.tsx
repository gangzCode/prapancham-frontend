import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HorizontalAdBannerProps {
  image: string;
  alt?: string;
  className?: string;
  height?: string;
}

const HorizontalAdBanner: React.FC<HorizontalAdBannerProps> = ({
  image,
  alt = "Advertisement",
  className,
  height = "h-32",
}) => {
  return (
    <div
      className={cn(
        "w-full overflow-hidden mb-8 rounded relative",
        height,
        className
      )}
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
      />
    </div>
  );
};

export default HorizontalAdBanner;
