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
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | undefined>(undefined);
  const pathname = usePathname();
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  type LanguageKey = 'en' | 'ta' | 'si';
  const translations: Record<LanguageKey, { [key: string]: string }> = {
    en: {
      home: "Home",
      createMemorial: "Create Memorial",
      events: "Events",
      advertisement: "Advertisement",
      setting: "Setting",
      logout: "Log Out",
      signIn: "Sign In",
      signUp: "Sign Up",

    },
    ta: {
      home: "முகப்பு",
      createMemorial: "நினைவு உருவாக்கு",
      events: "நிகழ்வுகள்",
      advertisement: "விளம்பரம்",
      setting: "அமைப்பு",
      logout: "வெளியேறு",
      signIn: "உள்நுழைய",
      signUp: "பதிவுசெய்ய",
    },
    si: {
      home: "මුල් පිටුව",
      createMemorial: "අනුස්මරණය නිර්මාණය",
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
        <nav className="flex flex-col xl:flex-row xl:flex-nowrap gap-4 xl:gap-10 justify-between items-center w-full px-2 sm:px-4 lg:px-8 py-2 mt-4 md:mt-6 bg-[#F8F8F8] rounded-lg">
          {/* First Row: Navigation Items */}
          <div className="flex flex-wrap xl:flex-nowrap gap-4 xl:gap-6 items-center w-full xl:w-auto">
            <button
              className="flex justify-center items-center p-2 hover:bg-stone-100 rounded-lg transition-colors"
              onClick={toggleDropMenu}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <div className="flex flex-wrap gap-2 items-center text-xs sm:text-sm md:text-base text-center whitespace-nowrap text-zinc-900 overflow-x-auto scrollbar-hide">
              {["Home", "Create Memorial", "Events", "Advertisement"].map(
                (page, index) => {
                  // Create proper translation key mapping
                  const getTranslationKey = (pageName: string) => {
                    switch(pageName) {
                      case "Home": return "home";
                      case "Create Memorial": return "createMemorial";
                      case "Events": return "events";
                      case "Advertisement": return "advertisement";
                      default: return pageName.toLowerCase();
                    }
                  };

                  const handleCreateMemorialClick = (e: React.MouseEvent) => {
                    e.preventDefault();
                    if (page === "Create Memorial") {
                      if (isAuthenticated) {
                        router.push('/create-memorial');
                      } else {
                        setRedirectAfterLogin('/create-memorial');
                        setIsModalOpen(true);
                      }
                    } else {
                      handlePageClick(page);
                    }
                  };

                  return (
                    <React.Fragment key={page}>
                      {index > 0 && (
                        <Minus className="hidden xl:block h-4 w-[1px] bg-black" />
                      )}
                      {page === "Create Memorial" ? (
                        <button
                          onClick={handleCreateMemorialClick}
                          className={`flex justify-center items-center px-2 py-1 rounded-md transition-colors duration-200 hover:text-link-hover font-poppins 
                            ${selectedPage === page.toLowerCase().replace(/\s+/g, '-') ? "text-link-hover font-bold" : "text-link"}`}
                        >
                          {t[getTranslationKey(page) as keyof typeof t]}
                        </button>
                      ) : (
                        <Link
                          href={page === "Home" ? "/" : `/${page.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => handlePageClick(page)}
                          className={`flex justify-center items-center px-2 py-1 rounded-md transition-colors duration-200 hover:text-link-hover font-poppins 
                            ${selectedPage === page.toLowerCase().replace(/\s+/g, '-') ? "text-link-hover font-bold" : "text-link"}`}
                        >
                          {t[getTranslationKey(page) as keyof typeof t]}
                        </Link>
                      )}
                    </React.Fragment>
                  );
                }
              )}
              {/* TODO: Remove commented code if not needed in future for usage */}
              {/* <button className="flex items-center gap-1 px-2 py-1 hover:bg-stone-100 rounded-md transition-colors">
                <span>More</span>
                <ChevronDown className="w-4 h-4" />
              </button> */}
            </div>
          </div>
          
          {/* Second Row: Search Bar and User Profile (visible on small screens as second row, inline on xl+ screens) */}
          <div className="flex flex-row justify-between items-center w-full xl:w-auto xl:gap-10 gap-4 mt-2 xl:mt-0">
            <div className="flex-1 xl:flex-none">
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
                              return user.image || "/icons/user.png";
                            } catch {
                              return "/icons/user.png";
                            }
                          })()
                        }
                      />
                      <ChevronDown className="w-6 h-6" />
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
                                  return user.image || "/icons/user.png";
                                } catch {
                                  return "/icons/user.png";
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
                  className="border border-primary text-primary xl:ml-8 px-4 py-2 rounded min-w-[8rem]"
                >
                  {t.signIn} / {t.signUp}
                </button>
              ))}
              <SignupModal 
                isOpen={isModalOpen} 
                onClose={() => {
                  setIsModalOpen(false);
                  setRedirectAfterLogin(undefined);
                }} 
                redirectTo={redirectAfterLogin}
              />
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
