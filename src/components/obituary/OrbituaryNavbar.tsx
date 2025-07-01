"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import FilterObituary, { FilterOptions } from "./FilterObituary";
import { useLanguage } from "@/components/ui/LanguageProvider";

type LanguageKey = "en" | "ta" | "si";

interface OrbituaryNavbarProps {
    onSearch: (searchTerm: string) => void;
    onFilter: (filters: FilterOptions) => void;
    onReset: () => void;
    isLoading?: boolean;
}

const OrbituaryNavbar = ({ onSearch, onFilter, onReset, isLoading = false }: OrbituaryNavbarProps) => {
    const { language } = useLanguage();
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
                    >
                        <Link
                            href={"/create-memorial"}>
                            {t.createMemorial}
                        </Link>
                    </button>
                </div>


            </div>
        </div>
    );
};

export default OrbituaryNavbar;
