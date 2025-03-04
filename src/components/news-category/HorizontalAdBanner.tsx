import React from 'react';
import { cn } from '@/lib/utils';

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
  height = "h-32"
}) => {
  return (
    <div className={cn("w-full overflow-hidden mb-8 rounded", height, className)}>
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default HorizontalAdBanner;