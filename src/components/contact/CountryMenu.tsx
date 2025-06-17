"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/ui/LanguageProvider";

interface CountryName {
  lang: string;
  value: string;
}

interface Country {
  id: string;
  name: CountryName[];
}

interface CountryMenuProps {
  countries: Country[];
  activeCountry: string;
  setActiveCountry: (countryId: string) => void;
}


const CountryMenu: React.FC<CountryMenuProps> = ({ countries, activeCountry, setActiveCountry }) => {
  const { language } = useLanguage();
  const langKey = language === "tamil" ? "ta" : language === "sinhala" ? "si" : "en";

  // const [activeCountry, setActiveCountry] = useState(countries[0]);

  return (
    <div className="bg-primary p-4 overflow-x-auto h-[72px]">
      <div className="flex justify-start md:justify-center items-center min-w-max px-2">
        {countries.map((country, index) => {
          const localizedName =
            country.name.find((n) => n.lang === langKey)?.value ||
            country.name[0]?.value ||
            country.id;
          return (
            <React.Fragment key={country.id}>
              <Button
                variant="ghost"
                className={cn(
                  " border-none whitespace-nowrap text-white font-poppins text-base",
                  activeCountry === country.id ? "font-bold bg-white rounded-lg text-[#1D94C5]" : "font-normal"
                )}
                onClick={() => setActiveCountry(country.id)}
              >
                {localizedName}
              </Button>
              {index < countries.length - 1 && (
                <Separator orientation="vertical" className="h-6 mx-2 text-white" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CountryMenu;
