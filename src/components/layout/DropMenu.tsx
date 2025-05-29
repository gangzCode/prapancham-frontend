"use client";
import * as React from "react";
import { CircleX } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DropMenuProps {
  onClose?: () => void;
}

const DropMenu: React.FC<DropMenuProps> = ({ onClose }) => {
  const [openItem, setOpenItem] = React.useState<string | undefined>(undefined);

  const menuItems = [
    {
      title: "Prapancham News",
      value: "news",
      subItems: [
        "Sri Lankan News",
        "World News",
        "Political News",
        "Business News",
        "Sports News",
        "Entertainment",
        "Entertainment",
        "Entertainment",
        "Entertainment",
        "Entertainment",
      ],
    },
    {
      title: "Prapancham Podcast",
      value: "podcast",
      subItems: [
        "Latest Episodes",
        "Featured Podcasts",
        "Categories",
        "Archives",
      ],
    },
    {
      title: "Prapancham Obituary",
      value: "obituary",
      subItems: ["Recent Obituaries", "Submit Obituary", "Search Archives"],
    },
    {
      title: "Prapancham Youtube",
      value: "youtube",
      subItems: [
        "Latest Videos",
        "Popular Videos",
        "Live Streams",
        "Playlists",
      ],
    },
    {
      title: "Prapancham FM",
      value: "fm",
      subItems: ["Live Radio", "Show Schedule", "Past Shows", "Request Song"],
    },
  ];

  return (
    <div className="flex flex-col py-4 bg-primary shadow-[0px_4px_16px_rgba(0,0,0,0.25)] relative   overflow-hidden font-poppins">
      <div className="flex justify-between items-center px-4 w-full mb-4">
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
          aria-label="Close menu"
        >
          <CircleX className="h-6 w-6 text-white" />
        </button>
      </div>

      <section className="px-4 md:px-6 space-y-4">
        <Accordion
          type="single"
          collapsible
          className="space-y-4"
          onValueChange={(value) => setOpenItem(value)}
        >
          {menuItems.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className={` overflow-hidden border-none ${
                openItem === item.value ? "bg-black-300" : "bg-[#F8F8F8]"
              }`}
            >
              <AccordionTrigger className="flex justify-between items-center p-3 transition-colors no-underline data-[state=open]:bg-stone-400 data-[state=open]:text-white">
                <span className="text-base ">{item.title}</span>
              </AccordionTrigger>
              <AccordionContent className="bg-primary">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3">
                  {item.subItems.map((subItem, index) => (
                    <button
                      key={index}
                      className="text-base py-2 px-3 text-white  transition-colors text-left hover:bg-white rounded-lg hover:text-primary"
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default DropMenu;
