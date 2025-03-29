"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface CountryMenuProps {
  countries: string[];
}

const CountryMenu: React.FC<CountryMenuProps> = ({ countries }) => {
  const [activeCountry, setActiveCountry] = useState(countries[0]);

  return (
    <div className="bg-primary p-4 overflow-x-auto h-[72px]">
      <div className="flex justify-start md:justify-center items-center min-w-max px-2">
        {countries.map((country, index) => (
          <React.Fragment key={country}>
            <Button
              variant="ghost"
              className={cn(
                " border-none whitespace-nowrap text-white font-poppins text-base",
                activeCountry === country ? "font-bold bg-white rounded-lg text-[#1D94C5]" : "font-normal"
              )}
              onClick={() => setActiveCountry(country)}
            >
              {country}
            </Button>
            {index < countries.length - 1 && (
              <Separator orientation="vertical" className="h-6 mx-2 text-white" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CountryMenu;
