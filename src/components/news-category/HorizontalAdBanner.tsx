import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/ui/LanguageProvider";

interface HorizontalAdBannerProps {
  image: string;
  alt?: string;
  className?: string;
  height?: string;
  link?: string;
}

const HorizontalAdBanner: React.FC<HorizontalAdBannerProps> = ({
  image,
  alt = "Advertisement",
  className,
  height = "h-32",
  link,
}) => {
  const { language } = useLanguage();

  // Localization object
  const translations = {
    english: {
      advertiseHere: "Want to Advertise Here?",
      advertiseDescription: "Contact us to post your advertisements and reach thousands of viewers",
      whatsappMessage: "Click to message us on WhatsApp!",
      altText: "Advertisement"
    },
    tamil: {
      advertiseHere: "விளம்பரம் செய்ய விரும்புகிறீர்களா?",
      advertiseDescription: "உங்கள் விளம்பரங்களை இடுகையிட எங்களை தொடர்பு கொள்ளுங்கள்",
      whatsappMessage: "WhatsApp இல் செய்தி அனுப்ப கிளிக் செய்யவும்!",
      altText: "விளம்பரம்"
    },
    sinhala: {
      advertiseHere: "ප්‍රචාරණය කිරීමට අවශ්‍යද?",
      advertiseDescription: "ඔබේ දැන්වීම් පළ කිරීමට අප හා සම්බන්ධ වන්න",
      whatsappMessage: "WhatsApp මගින් පණිවිඩ යැවීමට ක්ලික් කරන්න!",
      altText: "ප්‍රචාරණය"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  const handleWhatsAppClick = () => {
    const phoneNumber = "94770023323";
    const message = encodeURIComponent("Hi! I'm interested in advertising on your platform. Could you please provide more information?");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // No image placeholder component
  const NoImagePlaceHolder = () => (
    <div
      className={cn(
        "w-full overflow-hidden mb-8 rounded relative cursor-pointer",
        height,
        className
      )}
      onClick={handleWhatsAppClick}
    >
      <div className="w-full h-full relative bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center hover:from-teal-700 hover:to-teal-900 transition-colors">
        <div className="text-center text-white p-4">
          <h3 className="text-lg md:text-xl font-bold mb-2">
            {t.advertiseHere}
          </h3>
          <p className="text-xs md:text-sm mb-2 opacity-90">
            {t.advertiseDescription}
          </p>
          <div className="space-y-1">
            <p className="text-xs md:text-sm font-medium flex items-center justify-center gap-1">
              <span className="text-green-300">💬</span>
              +94 77 002 33 23
            </p>
            <p className="text-xs opacity-80">
              {t.whatsappMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // If no image or empty string, show placeholder
  if (!image || image === "") {
    return <NoImagePlaceHolder />;
  }

  // Regular ad banner with image
  const content = (
    <div
      className={cn(
        "w-full overflow-hidden mb-8 rounded relative",
        height,
        className
      )}
    >
      <Image
        src={image}
        alt={alt || t.altText}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
      />
    </div>
  );

  // If there's a link, wrap in anchor tag
  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
};

export default HorizontalAdBanner;
