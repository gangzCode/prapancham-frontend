"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FilterObituary, { FilterOptions } from "./FilterObituary";
import { useLanguage } from "@/components/ui/LanguageProvider";
import SignupModal from "../siginin/SignupModal ";

type LanguageKey = "en" | "ta" | "si";

interface OrbituaryNavbarProps {
    onSearch: (searchTerm: string) => void;
    onFilter: (filters: FilterOptions) => void;
    onReset: () => void;
    isLoading?: boolean;
}

const OrbituaryNavbar = ({ onSearch, onFilter, onReset, isLoading = false }: OrbituaryNavbarProps) => {
    const { language } = useLanguage();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | undefined>(undefined);
    
    let langKey: LanguageKey = "en";
    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";

    const translations: Record<LanguageKey, { [key: string]: string }> = {
        en: {
            searchByName: "Search by name",
            createMemorial: "Create Memorial"
        },
        ta: {
            searchByName: "பெயரால் தேடுங்கள்",
            createMemorial: "நினைவுச்சின்னம் உருவாக்கவும்"
        },
        si: {
            searchByName: "නමින් සොයන්න",
            createMemorial: "අනුස්මරණයක් සාදන්න"
        }
    };

    const t = translations[langKey];
    const [search, setSearch] = useState("");
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

    // Check authentication status
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
            setAuthLoading(false);
        };

        checkAuth();
        const interval = setInterval(checkAuth, 1000);
        return () => clearInterval(interval);
    }, [isModalOpen]);

    // Handle Create Memorial button click
    const handleCreateMemorialClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isAuthenticated) {
            router.push('/create-memorial');
        } else {
            setRedirectAfterLogin('/create-memorial');
            setIsModalOpen(true);
        }
    };

    // Handle search with debouncing
    const handleSearchChange = (value: string) => {
        setSearch(value);
        
        // Clear existing timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        // Set new timeout for debounced search
        const newTimeout = setTimeout(() => {
            onSearch(value.trim());
        }, 1000); // 1000ms debounce
        
        setSearchTimeout(newTimeout);
    };

    // Handle clear search
    const handleClearSearch = () => {
        setSearch("");
        onSearch("");
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchTimeout]);

    return (
        <div className="">
            <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                    <div className="flex md:w-96 items-center gap-2">
                        <FilterObituary onFilter={onFilter} onReset={onReset} isLoading={isLoading} />
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder={t.searchByName}
                                value={search}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                disabled={isLoading}
                                className="border border-gray-900 rounded py-3 px-4 pr-20 w-full focus:outline-none focus:ring-2 focus:ring-[#880002] disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                                {search && (
                                    <button
                                        onClick={handleClearSearch}
                                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                                        disabled={isLoading}
                                    >
                                        <X size={16} className="text-gray-500" />
                                    </button>
                                )}
                                {isLoading ? (
                                    <div className="p-1">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#880002]"></div>
                                    </div>
                                ) : (
                                    <div className="p-1">
                                        <Search
                                            className="text-black"
                                            strokeWidth={3}
                                            size={16}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        className="bg-[#880002] text-white py-4 px-6 rounded shadow w-full sm:w-auto"
                        onClick={handleCreateMemorialClick}
                        disabled={authLoading}
                    >
                        {t.createMemorial}
                    </button>
                </div>


            </div>
            
            {/* Signup Modal */}
            <SignupModal 
                isOpen={isModalOpen} 
                onClose={() => {
                    setIsModalOpen(false);
                    setRedirectAfterLogin(undefined);
                }} 
                redirectTo={redirectAfterLogin}
            />
        </div>
    );
};

export default OrbituaryNavbar;
