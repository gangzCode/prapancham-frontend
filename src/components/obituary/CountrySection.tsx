"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageProvider";

type LanguageKey = "en" | "ta" | "si";

interface CountryData {
    _id: string;
    name: {
        en: Array<{
            name: string;
            value: string;
            _id: string;
        }>;
        ta: Array<{
            name: string;
            value: string;
            _id: string;
        }>;
        si: Array<{
            name: string;
            value: string;
            _id: string;
        }>;
    };
    currencyCode: string;
    image: string;
    orderCount: number;
}

interface CountrySectionProps {
    onCountrySelect?: (countryId: string, countryName: string) => void;
    selectedCountryId?: string | null;
}

const CountrySection = ({ onCountrySelect, selectedCountryId }: CountrySectionProps) => {
    const { language } = useLanguage();
    let langKey: LanguageKey = "en";
    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";

    const translations: Record<LanguageKey, { [key: string]: string }> = {
        en: {
            all: "All",
            posts: "Posts",
            post: "Post",
            loadingCountries: "Loading countries...",
            noCountryData: "No country data available.",
            failedToFetchCountry: "Failed to fetch country data:",
            errorFetchingCountry: "An error occurred while fetching country data",
            flagAlt: "flag"
        },
        ta: {
            all: "அனைத்தும்",
            posts: "இடுகைகள்",
            post: "இடுகை",
            loadingCountries: "நாடுகளை ஏற்றுகிறது...",
            noCountryData: "நாட்டு தரவு எதுவும் கிடைக்கவில்லை.",
            failedToFetchCountry: "நாட்டு தரவைப் பெறுவதில் தோல்வி:",
            errorFetchingCountry: "நாட்டு தரவைப் பெறுவதில் பிழை ஏற்பட்டது",
            flagAlt: "கொடி"
        },
        si: {
            all: "සියල්ල",
            posts: "පළ කිරීම්",
            post: "පළ කිරීම",
            loadingCountries: "රටවල් පූරණය වෙමින්...",
            noCountryData: "රට දත්ත කිසිවක් නොමැත.",
            failedToFetchCountry: "රට දත්ත ලබා ගැනීමට අසමත්:",
            errorFetchingCountry: "රට දත්ත ලබා ගැනීමේදී දෝෂයක් ඇතිවිය",
            flagAlt: "කොඩිය"
        }
    };

    const t = translations[langKey];
    const [countries, setCountries] = useState<CountryData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    // Function to fetch country order counts from API
    const fetchCountryOrderCounts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/country-order-count`);

            if (!response.ok) {
                throw new Error(`${t.failedToFetchCountry} ${response.status}`);
            }

            const data: CountryData[] = await response.json();
            setCountries(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : t.errorFetchingCountry);
            console.error('Error fetching country data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchCountryOrderCounts();
    }, []);

    useEffect(() => {
        const updateItemsPerPage = () => {
            setItemsPerPage(window.innerWidth <= 768 ? 1 : 6);
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    // Create "All" country option
    const allCountryOption: CountryData = {
        _id: "all",
        name: {
            en: [{ name: t.all, value: t.all, _id: "all-en" }],
            ta: [{ name: t.all, value: t.all, _id: "all-ta" }],
            si: [{ name: t.all, value: t.all, _id: "all-si" }]
        },
        currencyCode: "",
        image: "/globe.svg",
        orderCount: countries.reduce((total, country) => total + country.orderCount, 0)
    };

    // Combine "All" option with countries
    const allCountries = [allCountryOption, ...countries];

    // Calculate visible countries for carousel
    let visibleCountries: CountryData[] = [];

    if (allCountries.length > 0) {
        if (currentIndex + itemsPerPage > allCountries.length) {
            visibleCountries = [
                ...allCountries.slice(currentIndex),
                ...allCountries.slice(0, (currentIndex + itemsPerPage) % allCountries.length),
            ];
        } else {
            visibleCountries = allCountries.slice(currentIndex, currentIndex + itemsPerPage);
        }
    }

    const handlePrev = () => {
        if (allCountries.length > 0) {
            setCurrentIndex((prev) => (allCountries.length + prev - 1) % allCountries.length);
        }
    };

    const handleNext = () => {
        if (allCountries.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % allCountries.length);
        }
    };

    // Helper function to get country name based on current language
    const getCountryName = (country: CountryData): string => {
        if (country._id === "all") {
            return country.name[langKey][0]?.value || t.all;
        }
        return country.name[langKey][0]?.value || country.name.en[0]?.value || 'Unknown Country';
    };

    // Handle country click
    const handleCountryClick = (country: CountryData) => {
        if (onCountrySelect) {
            const countryName = getCountryName(country);
            if (country._id === "all") {
                // Special handling for "All" - pass null to trigger fetchOrders
                onCountrySelect("", countryName);
            } else {
                onCountrySelect(country._id, countryName);
            }
        }
    };


    return (
        <div className="">
            <div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="bg-white p-6 shadow flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#880002]"></div>
                        <span className="ml-2 text-gray-600">{t.loadingCountries}</span>
                    </div>
                ) : allCountries.length > 1 ? (
                    <div className="bg-white p-6 shadow flex items-center gap-4">
                        <button 
                            className="text-gray-500 hover:text-gray-700 disabled:opacity-50" 
                            onClick={handlePrev}
                            disabled={allCountries.length <= itemsPerPage}
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-6 flex-1">
                            {visibleCountries.map((country, idx) => (
                                <div 
                                    key={country._id} 
                                    className={`flex items-center gap-3 relative cursor-pointer p-2 rounded-lg transition-colors hover:bg-gray-50 ${
                                        (selectedCountryId === country._id) || (country._id === "all" && (selectedCountryId === null || selectedCountryId === "")) ? 'bg-blue-50 border-2 border-blue-300' : ''
                                    }`}
                                    onClick={() => handleCountryClick(country)}
                                >
                                    <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                                        <img
                                            src={country.image}
                                            alt={`${getCountryName(country)} ${t.flagAlt}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                // Fallback to a default image if the API image fails
                                                e.currentTarget.src = '/globe.svg';
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{getCountryName(country)}</p>
                                        <p className="text-red-700">
                                            {country.orderCount} {country.orderCount === 1 ? t.post : t.posts}
                                        </p>
                                    </div>
                                    {(idx % 2 === 1 && idx !== visibleCountries.length - 1) && (
                                        <div className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 h-12 border-r border-gray-300 block md:hidden" />
                                    )}
                                    {(idx !== visibleCountries.length - 1) && (
                                        <div className="absolute right-[15px] top-1/2 transform -translate-y-1/2 h-12 border-r border-gray-300 hidden md:block" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <button 
                            className="text-gray-500 hover:text-gray-700 disabled:opacity-50" 
                            onClick={handleNext}
                            disabled={allCountries.length <= itemsPerPage}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                ) : (
                    <div className="bg-white p-6 shadow flex items-center justify-center">
                        <p className="text-gray-500">{t.noCountryData}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountrySection;
