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
import useSWR from 'swr';
import router from "next/router";

type CountryOption = {
  value: string;
  label: string;
  flag: string;
};

const TopBar: React.FC = () => {

  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { country, setCountry } = useCountry();
  const [selectedMenu, setSelectedMenu] = useState("");
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR(
    typeof window !== "undefined" && process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/country/active?page=1&limit=10`
      : null,
    fetcher
  );
  let langKey: LanguageKey;

  if (language === "tamil") langKey = "ta";
  else if (language === "sinhala") langKey = "si";
  else langKey = "en";


  const countries = (data?.countries || []).map((country: any) => ({
    value: country.name?.en?.[0]?.value || "Unknown",
    label:
      country.name?.[langKey]?.[0]?.value ||
      country.name?.en?.[0]?.value ||
      "Unknown",
    flag: country.image || "",
  }));
  const [selectedCountry, setSelectedCountry] = React.useState(
    countries.find((c: { value: string; }) => c.value === (country || "Sri Lanka"))
  );
  const [languageSelectValue, setLanguageSelectValue] = useState("english");
  const [countrySelectValue, setCountrySelectValue] = useState(country || "Sri Lanka");

  type LanguageKey = 'en' | 'ta' | 'si';
  const translations: Record<LanguageKey, { [key: string]: string }> = {
    en: {
      newsNav: "News",
      obituary: "Obituary",
      aboutUs: "About Us",
      contactUs: "Contact Us",
      Samaathi: "Samaathi",
    },
    ta: {
      newsNav: "செய்திகள்",
      obituary: "மரண அறிவிப்பு செய்தி",
      aboutUs: "எங்களை பற்றி",
      contactUs: "தொடர்பு கொள்ள",
      Samaathi: "சமாதி",
    },
    si: {
      newsNav: "ප්‍රවෘත්ති",
      obituary: "නිවන් සන්සුන්",
      aboutUs: "අපි ගැන",
      contactUs: "අපව අමතන්න",
      Samaathi: "සමාති",
    },
  };
  const t = translations[langKey];

  const navItems = [
    { id: "news", label: t.newsNav, href: "/news" },
    { id: "obituary", label: t.obituary, href: "/obituary" },
    { id: "about", label: t.aboutUs, href: "/about" },
    { id: "contact", label: t.contactUs, href: "/contact" },
  ];


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
        localStorage.setItem("country", "Sri Lanka");
        setCountry("Sri Lanka");
        setCountrySelectValue("Sri Lanka");
        setSelectedCountry(countries.find((c: { value: string; }) => c.value === "Sri Lanka"));
      } else {
        setCountrySelectValue(storedCountry);
        setCountry(storedCountry);
        setSelectedCountry(countries.find((c: { value: string; }) => c.value === storedCountry));
      }
    }
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      const storedCountry = localStorage.getItem("country") || "Sri Lanka";
      const match = countries.find((c: { value: string; }) => c.value === storedCountry);
      setSelectedCountry(match || countries[0]);
      setCountrySelectValue(match?.value || countries[0].value);
      setCountry(match?.value || countries[0].value);
    }
  }, [data]);

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
  return (
    <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-10 justify-between items-center px-4 md:px-8 lg:px-16  py-1 w-full bg-primary shadow-[0px_4px_14px_rgba(0,0,0,0.25)]">

      <div>
        <h1 className="w-full sm:w-auto sm:min-w-[200px] md:min-w-[292px] order-1 flex items-center justify-center sm:justify-start ">
          <Link href="/">
            <Image
              src="/images/Prapancham-logo.png"
              alt="Prapancham Logo"
              width={56}
              height={56}
              priority
              className="max-w-[56px] sm:max-w-none items-center justify-center rounded-md"

            />
          </Link>
          <span className={`px-1 -mt-2 text-xs text-white bg-[#F65050] ${selectedMenu === "news" ? "block" : selectedMenu === "news-individual" ? "block" : "hidden"}`}>
            {t.newsNav}
          </span>
          <span className={`px-1 -mt-2 text-xs text-white bg-black ${selectedMenu === "obituary" ? "block" : selectedMenu === "news-individual" ? "block" : "hidden"}`}>
            {t.Samaathi}
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
                தமிழ்
              </LanguageSelectItem>
              <LanguageSelectItem value="sinhala" className="text-sm sm:text-base">
                සිංහල
              </LanguageSelectItem>
            </LanguageSelectContent>
          </LanguageSelect>
        </div>
        {/* <Minus className="h-5 w-[1px] bg-white" /> */}
        {/* <div className=" flex gap-1 justify-center items-left text-[#1A1D1F] whitespace-nowrap">
          <CountrySelect
            value={countrySelectValue}
            onValueChange={(value) => {
              const selected = countries.find((c: { value: string; }) => c.value === value);
              setCountry(value);
              setCountrySelectValue(value);
              setSelectedCountry(selected || null);
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
              {countries.map((country: CountryOption, idx: number) => (
                <React.Fragment key={country.value}>
                  <CountrySelectItem value={country.value} className="text-sm sm:text-base">
                    <div className="flex justify-between w-36 items-center">
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
        </div> */}
      </div>
    </div>
  );
};

export default TopBar;
