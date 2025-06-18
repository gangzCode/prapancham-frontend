import React from "react";
import Link from "next/link";
import { TitleWithUnderline } from "../ui/title-with-underline";

interface CountriesSectionProps {
  countries: string[];
  language: string;
}

const CountriesSection: React.FC<CountriesSectionProps> = ({ countries, language }) => {
  return (
    <section className="mb-12">
      {/* <div className="relative mb-4">
        <h2 className="text-xl font-bold text-primary">Countries</h2>
        <div className="absolute -bottom-2 left-0 h-0.5 w-24 bg-accent"></div>
      </div> */}
      <div className="flex-shrink min-w-0 mb-2">
        <TitleWithUnderline text={
          language === "ta"
            ? "நாடுகள்"
            : language === "si"
              ? "රටවල්"
              : "Countries"
        } underlineWidth={64} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {countries.map((country, index) => (
          <Link
            key={index}
            href={`/news/country/${country.toLowerCase()}`}
            className="block bg-[#0D1322] text-white p-4 text-center rounded-sm hover:bg-[#0D1322]/90 transition-colors"
          >
            {country}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CountriesSection;
