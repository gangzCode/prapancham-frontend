"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import DropMenu from "./DropMenu";
import { Menu, Minus, ChevronDown, User, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SearchBox from "./SearchBox";
import {
  Select as CountrySelect,
  SelectContent as CountrySelectContent,
  SelectItem as CountrySelectItem,
  SelectTrigger as CountrySelectTrigger,
  SelectValue as CountrySelectValue,
  SelectSeparator
} from "@/components/ui/country-select";
import SignupModal from "../siginin/SignupModal ";
import { useLanguage } from "@/components/ui/LanguageProvider";

const SecondNavbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  type LanguageKey = 'en' | 'ta' | 'si';
  const translations: Record<LanguageKey, { [key: string]: string }> = {
    en: {
      home: "Home",
      youtube: "Youtube",
      podcast: "Podcast",
      events: "Events",
      advertisement: "Advertisement",
      setting: "Setting",
      logout: "Log Out",
      signIn: "Sign In",
      signUp: "Sign Up",

    },
    ta: {
      home: "முகப்பு",
      youtube: "யூடியூப்",
      podcast: "பாட்காஸ்ட்",
      events: "நிகழ்வுகள்",
      advertisement: "விளம்பரம்",
      setting: "அமைப்பு",
      logout: "வெளியேறு",
      signIn: "உள்நுழைய",
      signUp: "பதிவுசெய்ய",
    },
    si: {
      home: "මුල් පිටුව",
      youtube: "යූටියුබ්",
      podcast: "පොඩ්කාස්ට්",
      events: "සිදුවීම්",
      advertisement: "ප්‍රචාරණය",
      setting: "සැකසීම",
      logout: "පිටවීම",
      signIn: "ඇතුල් වන්න",
      signUp: "ලියාපදිංචි වන්න",
    }
  };
  let langKey: LanguageKey;

  if (language === "tamil") langKey = "ta";
  else if (language === "sinhala") langKey = "si";
  else langKey = "en";

  const t = translations[langKey];


  const toggleDropMenu = () => {
    setIsDropMenuOpen(!isDropMenuOpen);
  };

  const handlePageClick = (page: string) => {
    setSelectedPage(page);
  };

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      setSelectedPage(pathSegments[0]);
    } else {
      setSelectedPage("home");
    }
  }, [pathname]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const token = localStorage.getItem("accessToken");
          if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp && decodedToken.exp > currentTime) {
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
            }
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, [router, isModalOpen]);

  return (
    <>
      <div className="relative flex flex-col px-4 md:px-8 lg:px-16 ">
        <nav className="flex flex-wrap md:flex-nowrap gap-4 md:gap-10 justify-between items-center w-full px-2 sm:px-4 lg:px-8 py-2 mt-4 md:mt-6 bg-[#F8F8F8] rounded-lg">
          <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 items-center w-full md:w-auto">
            <button
              className="flex justify-center items-center p-2 hover:bg-stone-100 rounded-lg transition-colors"
              onClick={toggleDropMenu}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <div className="flex flex-wrap gap-2 items-center text-sm md:text-base text-center whitespace-nowrap text-zinc-900 overflow-x-auto scrollbar-hide">
              {["Home", "Youtube", "Podcast", "Events", "Advertisement"].map(
                (page, index) => (
                  <React.Fragment key={page}>
                    {index > 0 && (
                      <Minus className="hidden md:block h-4 w-[1px] bg-black" />
                    )}
                    <Link
                      href={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                      onClick={() => handlePageClick(page)}
                      className={`flex justify-center items-center px-2 py-1 rounded-md transition-colors duration-200 hover:text-link-hover font-poppins 
                        ${selectedPage === page.toLowerCase() ? "text-link-hover font-bold" : "text-link"}`}
                    >
                      {t[page.toLowerCase() as keyof typeof t]}
                    </Link>
                  </React.Fragment>
                )
              )}
              {/* TODO: Remove commented code if not needed in future for usage */}
              {/* <button className="flex items-center gap-1 px-2 py-1 hover:bg-stone-100 rounded-md transition-colors">
                <span>More</span>
                <ChevronDown className="w-4 h-4" />
              </button> */}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-10 gap-6 w-full md:w-auto">
            <div className="w-full md:w-auto mt-2 md:mt-0">
              <SearchBox />
            </div>
            <div className="flex items-center justify-center">
              {!isLoading && (isAuthenticated ? (
                <div className="flex items-center justify-center ml-4">
                  {/* <User className="w-7 h-7 text-primary" />
                   */}
                  <div className="relative ml-4">
                    <div
                      onClick={() => setShowPopup(!showPopup)}
                      className="flex items-center justify-center cursor-pointer"
                    >
                      <img
                        alt="User avatar"
                        className="w-12 h-12 mb-1 rounded-full"
                        src={
                          (() => {
                            try {
                              const user = JSON.parse(localStorage.getItem("user") || "{}");
                              return user.image || "https://storage.googleapis.com/a1aa/image/6c204b4f-b493-4351-023d-ab911699cf97.jpg";
                            } catch {
                              return "https://storage.googleapis.com/a1aa/image/6c204b4f-b493-4351-023d-ab911699cf97.jpg";
                            }
                          })()
                        }
                      />
                    </div>

                    {showPopup && (
                      <div
                        ref={popupRef}
                        className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-64 p-6 z-50"
                      >
                        <div className="flex flex-col items-center mb-2">
                          <img
                            alt="User avatar"
                            className="w-12 h-12 mb-1 rounded-full"
                            src={
                              (() => {
                                try {
                                  const user = JSON.parse(localStorage.getItem("user") || "{}");
                                  return user.image || "https://storage.googleapis.com/a1aa/image/6c204b4f-b493-4351-023d-ab911699cf97.jpg";
                                } catch {
                                  return "https://storage.googleapis.com/a1aa/image/6c204b4f-b493-4351-023d-ab911699cf97.jpg";
                                }
                              })()
                            }
                          />
                          <h2 className="font-bold leading-tight text-black text-center">
                            {(() => {
                              try {
                                const user = JSON.parse(localStorage.getItem("user") || "{}");
                                return user.username || "Unknown User";
                              } catch {
                                return "Unknown User";
                              }
                            })()}
                          </h2>
                        </div>
                        <div
                          className="text-center text-black mb-4 mt-4 cursor-pointer hover:underline"
                          onClick={() => {
                            setShowPopup(false);
                            router.push("/profile");
                          }}
                        >
                          {t.setting}
                        </div>
                        <hr className="border-gray-300 mb-4" />
                        <button
                          type="button"
                          className="flex items-center space-x-2  text-black mx-auto"
                        >
                          <LogOut className="w-5 h-5" />
                          <span
                            onClick={() => {
                              localStorage.removeItem("accessToken");
                              localStorage.removeItem("user");
                              setShowPopup(false);
                              window.location.href = "/";
                            }}
                            className="cursor-pointer"
                          >
                            {t.logout}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="border border-primary text-primary  md:ml-8 px-4 py-2 rounded min-w-[8rem] "
                >
                  {t.signIn} / {t.signUp}
                </button>
              ))}
              <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        </nav>
      </div>
      {isDropMenuOpen && (
        <div>
          <div
            onClick={toggleDropMenu}
            className="fixed inset-0 z-30 bg-black bg-opacity-50"
          />

          <div className="absolute left-1/2 transform -translate-x-1/2 z-40 bg-white w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] lg:w-[calc(100%-16rem)] max-w-[1400px]">
            <DropMenu onClose={toggleDropMenu} />
          </div>

        </div>
      )}



    </>
  );
};

export default SecondNavbar;
