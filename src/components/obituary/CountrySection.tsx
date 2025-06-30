"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
                throw new Error(`Failed to fetch country data: ${response.status}`);
            }

            const data: CountryData[] = await response.json();
            setCountries(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while fetching country data');
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

    // Calculate visible countries for carousel
    let visibleCountries: CountryData[] = [];

    if (countries.length > 0) {
        if (currentIndex + itemsPerPage > countries.length) {
            visibleCountries = [
                ...countries.slice(currentIndex),
                ...countries.slice(0, (currentIndex + itemsPerPage) % countries.length),
            ];
        } else {
            visibleCountries = countries.slice(currentIndex, currentIndex + itemsPerPage);
        }
    }

    const handlePrev = () => {
        if (countries.length > 0) {
            setCurrentIndex((prev) => (countries.length + prev - 1) % countries.length);
        }
    };

    const handleNext = () => {
        if (countries.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % countries.length);
        }
    };

    // Helper function to get country name in English
    const getCountryName = (country: CountryData): string => {
        return country.name.en[0]?.value || 'Unknown Country';
    };

    // Handle country click
    const handleCountryClick = (country: CountryData) => {
        if (onCountrySelect) {
            const countryName = getCountryName(country);
            onCountrySelect(country._id, countryName);
        }
    };


    return (
        <div className="">
            <div className="container mx-auto p-4">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="bg-white p-6 shadow flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#880002]"></div>
                        <span className="ml-2 text-gray-600">Loading countries...</span>
                    </div>
                ) : countries.length > 0 ? (
                    <div className="bg-white p-6 shadow flex items-center gap-4">
                        <button 
                            className="text-gray-500 hover:text-gray-700 disabled:opacity-50" 
                            onClick={handlePrev}
                            disabled={countries.length <= itemsPerPage}
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-6 flex-1">
                            {visibleCountries.map((country, idx) => (
                                <div 
                                    key={country._id} 
                                    className={`flex items-center gap-3 relative cursor-pointer p-2 rounded-lg transition-colors hover:bg-gray-50 ${
                                        selectedCountryId === country._id ? 'bg-blue-50 border-2 border-blue-300' : ''
                                    }`}
                                    onClick={() => handleCountryClick(country)}
                                >
                                    <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                                        <img
                                            src={country.image}
                                            alt={`${getCountryName(country)} flag`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                // Fallback to a default image if the API image fails
                                                e.currentTarget.src = '/images/default-flag.png';
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{getCountryName(country)}</p>
                                        <p className="text-red-700">
                                            {country.orderCount} {country.orderCount === 1 ? 'Post' : 'Posts'}
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
                            disabled={countries.length <= itemsPerPage}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                ) : (
                    <div className="bg-white p-6 shadow flex items-center justify-center">
                        <p className="text-gray-500">No country data available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountrySection;
