"use client"
import Image from "next/image";
import {
  Select as LanguageSelect,
  SelectContent as LanguageSelectContent,
  SelectItem as LanguageSelectItem,
  SelectTrigger as LanguageSelectTrigger,
  SelectValue as LanguageSelectValue,
} from "@/components/ui/language-select";
import {
  Select as CountrySelect,
  SelectContent as CountrySelectContent,
  SelectItem as CountrySelectItem,
  SelectTrigger as CountrySelectTrigger,
  SelectValue as CountrySelectValue,
  SelectSeparator
} from "@/components/ui/country-select";
import { Calendar, Minus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { useCountry } from "@/components/ui/CountryProvider";

const navItems = [
  { id: "news", label: "News", href: "/news" },
  { id: "obituary", label: "Obituary", href: "/obituary" },
  { id: "about", label: "About Us", href: "/about" },
  { id: "contact", label: "Contact Us", href: "/contact" },
];

const countries = [
  { value: "srilanka", label: "Sri Lanka", flag: "/svg/srilanka.svg" },
  { value: "canada", label: "Canada", flag: "/svg/canada.svg" },
  { value: "australia", label: "Australia", flag: "/svg/australia.svg" },
  { value: "germany", label: "Germany", flag: "/svg/german.svg" },
  { value: "switzerland", label: "Switzerland", flag: "/svg/Switzerland.svg" },
  { value: "sweden", label: "Sweden", flag: "/svg/Sweden.svg" },
  { value: "uk", label: "UK", flag: "/svg/uk.svg" },
  { value: "denmark", label: "Denmark", flag: "/svg/denmark.svg" },
  { value: "india", label: "India", flag: "/svg/india.svg" },
  { value: "newzeland", label: "New Zealand", flag: "/svg/newzealand.svg" },
  { value: "france", label: "France", flag: "/svg/france.svg" },
  { value: "malaysia", label: "Malaysia", flag: "/svg/malaysia.svg" },
  { value: "singapore", label: "Singapore", flag: "/svg/singapore.svg" },
  { value: "usa", label: "USA", flag: "/svg/usa.svg" },
];


const TopBar: React.FC = () => {

  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { country, setCountry } = useCountry();
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedCountry, setSelectedCountry] = React.useState(
    countries.find((c) => c.value === (country || "srilanka"))
  );
  const [languageSelectValue, setLanguageSelectValue] = useState("english");
  const [countrySelectValue, setCountrySelectValue] = useState(country || "srilanka");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("language");
      if (!storedLang) {
        localStorage.setItem("language", "english");
        setLanguage("english");
        setLanguageSelectValue("english");
      } else {
        setLanguageSelectValue(storedLang);
        setLanguage(storedLang);
      }
    }
  }, []);

  useEffect(() => {
    setLanguageSelectValue(language);
  }, [language]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCountry = localStorage.getItem("country");
      if (!storedCountry) {
        localStorage.setItem("country", "srilanka");
        setCountry("srilanka");
        setCountrySelectValue("srilanka");
        setSelectedCountry(countries.find((c) => c.value === "srilanka"));
      } else {
        setCountrySelectValue(storedCountry);
        setCountry(storedCountry);
        setSelectedCountry(countries.find((c) => c.value === storedCountry));
      }
    }
  }, []);

  useEffect(() => {
    setCountrySelectValue(country);
    setSelectedCountry(countries.find((c) => c.value === country));
  }, [country]);

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      setSelectedMenu(
        pathSegments[0]
      );
      if (pathSegments[0] == 'news-individual') {
        setSelectedMenu('news');
      }

    } else {
      setSelectedMenu("");
    }
  }, [pathname]);
  // const formatDate = () => {
  //   const date = new Date();
  //   const days = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];
  //   const months = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];

  //   const day = days[date.getDay()];
  //   const dateNum = date.getDate();
  //   const month = months[date.getMonth()];
  //   const year = date.getFullYear();

  //   const ordinal = (n: number) => {
  //     const s = ["th", "st", "nd", "rd"];
  //     const v = n % 100;
  //     return n + (s[(v - 20) % 10] || s[v] || s[0]);
  //   };

  //   return `${day}, ${ordinal(dateNum)} ${month} ${year}`;
  // };
  return (
    <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-10 justify-between items-center px-4 md:px-8 lg:px-16  py-1 w-full bg-primary shadow-[0px_4px_14px_rgba(0,0,0,0.25)]">
      {/* <div className="flex gap-2 sm:gap-3.5 justify-center items-center">
        <div className="bg-[#880002] rounded-full p-2">
          <Calendar className="text-white h-4" />
        </div>
        <time className="w-full sm:w-auto text-center text-white text-link order-2 sm:order-2 text-sm sm:text-base font-poppins">
          {formatDate()}
        </time>
      </div>
      <div className="hidden sm:block text-sm sm:text-base text-center text-white font-poppins">
        prapancham@gmail.com
      </div> */}
      <div>
        <h1 className="w-full sm:w-auto sm:min-w-[200px] md:min-w-[292px] order-1 flex items-center justify-center sm:justify-start ">
          <Image
            src="/images/Prapancham-logo-white.svg"
            alt="Prapancham Logo"
            width={292}
            height={56}
            priority
            className="max-w-[200px] sm:max-w-none"
          />
          <span className={`px-1 -mt-2 text-xs text-white bg-[#F65050] ${selectedMenu === "news" ? "block" : selectedMenu === "news-individual" ? "block" : "hidden"}`}>
            News
          </span>
          <span className={`px-1 -mt-2 text-xs text-white bg-black ${selectedMenu === "obituary" ? "block" : selectedMenu === "news-individual" ? "block" : "hidden"}`}>
            Samaathi
          </span>
        </h1>
      </div>


      <div>
        <nav className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap gap-2 sm:gap-1 justify-center items-center text-center text-link order-3 mt-4 sm:mt-0">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex justify-center items-center  rounded-md transition-all text-white   hover:scale-110 hover:bg-white hover:text-link-hover
              ${selectedMenu === item.id ? "bg-primary text-white font-bold " : ""}
              `}
            >
              <span className="px-3 sm:px-4 py-2 sm:py-1">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex  justify-center items-center text-white">
        <div className="flex gap-1 justify-center items-center text-white whitespace-nowrap">
          <LanguageSelect
            value={languageSelectValue}
            onValueChange={(value) => {
              setLanguage(value);
              setLanguageSelectValue(value);
            }}
          >
            <LanguageSelectTrigger className="md:w-[7rem] text-white bg-transparent border-none outline-none cursor-pointer text-sm sm:text-base">
              <LanguageSelectValue
                className="text-white placeholder:text-white text-sm sm:text-base"
                placeholder="Language"
              />
            </LanguageSelectTrigger>
            <LanguageSelectContent>
              <LanguageSelectItem value="english" className="text-sm sm:text-base">
                English
              </LanguageSelectItem>
              <LanguageSelectItem value="tamil" className="text-sm sm:text-base">
                Tamil
              </LanguageSelectItem>
              <LanguageSelectItem value="sinhala" className="text-sm sm:text-base">
                Sinhala
              </LanguageSelectItem>
            </LanguageSelectContent>
          </LanguageSelect>
        </div>
        <Minus className="h-5 w-[1px] bg-white" />
        <div className=" flex gap-1 justify-center items-left text-[#1A1D1F] whitespace-nowrap">
          <CountrySelect
            value={countrySelectValue}
            onValueChange={(value) => {
              setCountry(value);
              setCountrySelectValue(value);
              setSelectedCountry(countries.find((c) => c.value === value));
            }}
          >
            <CountrySelectTrigger className="md:w-[12rem] text-white bg-transparent border-none outline-none cursor-pointer text-sm sm:text-base">
              {selectedCountry && (
                <img
                  src={selectedCountry.flag}
                  alt={selectedCountry.label}
                  className="w-6 h-6"
                />
              )}
            </CountrySelectTrigger>
            <CountrySelectContent>
              {countries.map((country, idx) => (
                <React.Fragment key={country.value}>
                  <CountrySelectItem value={country.value} className="text-sm sm:text-base">
                    <div className="flex justify-between w-36">
                      <span>{country.label}</span>
                      <img
                        src={country.flag}
                        alt={country.label}
                        className="ml-4 w-7 h-7 inline-block"
                      />
                    </div>
                  </CountrySelectItem>
                  {idx !== countries.length - 1 && <SelectSeparator />}
                </React.Fragment>
              ))}
            </CountrySelectContent>
          </CountrySelect>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
