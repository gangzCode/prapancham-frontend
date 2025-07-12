"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/ui/LanguageProvider";

interface Category {
  lang: string;
  value: string;
}

interface Categories {
  id: string;
  name: Category[];
}

interface NewsCategoryTabProps {
  categories: Categories[];
  activeCategory: string;
  setActiveCategory: (categoryId: string) => void;
}


const NewsCategoryTabs: React.FC<NewsCategoryTabProps> = ({ categories: categories, activeCategory: activeCategory, setActiveCategory: setActiveCategory }) => {
  const { language } = useLanguage();
  const langKey = language === "tamil" ? "ta" : language === "sinhala" ? "si" : "en";

  return (
    <div className="bg-primary p-4 overflow-x-auto h-[72px]">
      <div className="flex justify-start md:justify-center items-center min-w-max px-2">
        {categories.map((category, index) => {
          const localizedName =
            category.name.find((n) => n.lang === langKey)?.value ||
            category.name[0]?.value ||
            category.id;
          return (
            <React.Fragment key={category.id}>
              <Button
                variant="ghost"
                className={cn(
                  " border-none whitespace-nowrap text-white font-poppins text-base",
                  activeCategory === category.id ? "font-bold bg-white rounded-lg text-[#1D94C5]" : "font-normal"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                {localizedName}
              </Button>
              {index < categories.length - 1 && (
                <Separator orientation="vertical" className="h-6 mx-2 text-white" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default NewsCategoryTabs;
