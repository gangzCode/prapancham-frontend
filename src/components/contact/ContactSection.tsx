import React from "react";
import { cn } from "@/lib/utils";

interface ContactSectionProps {
  title: string;
  contacts: string[];
  containerClassName?: string;
  titleClassName?: string;
  buttonClassName?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title,
  contacts,
  containerClassName,
  titleClassName,
  buttonClassName,
}) => {
  return (
    <div className={containerClassName}>
      <h3 className={cn("text-heading-base text-[#880002] mb-6", titleClassName)}>
        {title}
      </h3>
      <div className="space-y-3">
        {contacts.map((contact, index) => (
          <button
            key={index}
            className={cn(
              "w-full bg-primary hover:bg-[#00506f] text-white text-sm font-medium py-3 rounded h-[48px] my-2",
              buttonClassName
            )}
          >
            {contact}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContactSection;
