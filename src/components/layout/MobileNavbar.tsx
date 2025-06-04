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
import { Calendar, Menu, Minus, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SignupModal from "../siginin/SignupModal ";
import SearchBox from "./SearchBox";
import DropMenu from "./DropMenu";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { useCountry } from "@/components/ui/CountryProvider";
import useSWR from 'swr';

type CountryOption = {
    value: string;
    label: string;
    flag: string;
};



const MobileNavbar: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathname = usePathname();
    const { language, setLanguage } = useLanguage();
    const { country, setCountry } = useCountry();
    const [selectedMenu, setSelectedMenu] = useState("");
    const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
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
            obituary: "இறுதிக் குறிப்புகள்",
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

    const [selectedPage, setSelectedPage] = useState("");


    const handlePageClick = (page: string) => {
        setSelectedPage(page);
    };
    const toggleDropMenu = () => {
        setIsDropMenuOpen(!isDropMenuOpen);
    };

    useEffect(() => {
        const pathSegments = pathname.split("/").filter(Boolean);
        if (pathSegments.length > 0) {
            setSelectedMenu(
                pathSegments[0]
            );
            setSelectedPage(pathSegments[0]);
            if (pathSegments[0] == 'news-individual') {
                setSelectedMenu('news');
            }

        } else {
            setSelectedMenu("");
            setSelectedPage("home");
        }
    }, [pathname]);

    return (
        <>
            <div className="flex flex-col gap-4 sm:gap-6 md:gap-10 justify-between items-center px-4 md:px-8 lg:px-16  py-1 pb-4 w-full bg-primary shadow-[0px_4px_14px_rgba(0,0,0,0.25)]">
                <div className="flex  justify-between w-full items-center text-white">
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
                    <div className=" flex gap-1 justify-center items-left text-[#1A1D1F] whitespace-nowrap -mr-3">
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
                    </div>
                </div>

                <div className="flex gap-2 sm:gap-4 md:gap-6 justify-between items-center w-full text-white">
                    <div className="flex items-center">
                        <button
                            className="flex justify-center items-center p-2 -mt-3 hover:bg-stone-100 rounded-lg transition-colors"
                            onClick={toggleDropMenu}
                            aria-label="Toggle menu"
                        >
                            <Menu className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                        <div>
                            <h1 className="w-full sm:w-auto sm:min-w-[200px] md:min-w-[292px] order-1 flex items-center justify-center sm:justify-start ">
                                <Image
                                    src="/images/Prapancham-logo.png"
                                    alt="Prapancham Logo"
                                    width={56}
                                    height={56}
                                    priority
                                    className="max-w-[56px] sm:max-w-none items-center justify-center rounded-md"
                                />
                                <span className={`px-1 -mt-2 text-xs text-white bg-[#F65050] ${selectedMenu === "news" ? "block" : selectedMenu === "news-individual" ? "block" : "hidden"}`}>
                                    News
                                </span>
                                <span className={`px-1 -mt-2 text-xs text-white bg-black ${selectedMenu === "obituary" ? "block" : selectedMenu === "news-individual" ? "block" : "hidden"}`}>
                                    Samaathi
                                </span>
                            </h1>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="border border-white text-white rounded-full "
                    >
                        <User />
                    </button>
                    <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </div>


                <div>
                    <nav className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap gap-2 sm:gap-1 justify-center items-center text-center text-sm text-link order-3">
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
                {/* <div className="flex flex-wrap gap-2 items-center text-sm md:text-base text-center whitespace-nowrap text-white overflow-x-auto scrollbar-hide">
                    {["Home", "Youtube", "Podcast", "Events", "Advertisement"].map(
                        (page, index) => (
                            <React.Fragment key={page}>
                                <Link
                                    href={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                                    onClick={() => handlePageClick(page)}
                                    className={`flex justify-center items-center px-2 py-1 rounded-md transition-colors duration-200 hover:text-link-hover font-poppins 
                        ${selectedPage === page.toLowerCase() ? "text-link-hover font-bold" : "text-white"}`}
                                >
                                    {page}
                                </Link>
                            </React.Fragment>
                        )
                    )}
                </div> */}
                <div className="w-full">
                    <SearchBox />
                </div>
            </div>
            {isDropMenuOpen && (
                <div className="fixed inset-0 flex items-start md:pt-40 justify-center bg-black bg-opacity-50 z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow-lg w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] lg:w-[calc(100%-16rem)] max-w-[1400px] mt-16 md:mt-0">
                        <DropMenu onClose={toggleDropMenu} />
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileNavbar;
