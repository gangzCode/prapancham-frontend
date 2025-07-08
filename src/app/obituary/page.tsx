"use client"
import React, { useState, useEffect } from "react";
import AdvertisementSidebar from "@/components/news-category/AdvertisementSidebar";
import { Separator } from "@/components/ui/separator";
import CountrySection from "@/components/obituary/CountrySection";
import TributeCard from "../../components/obituary/TributeCard";
import { Pagination } from "@/components/ui/pagination";
import PaginationBar from "@/components/category/PaginationBar";
import OrbituaryNavbar from "@/components/obituary/OrbituaryNavbar";
import { FilterOptions } from "@/components/obituary/FilterObituary";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { set } from "date-fns";

type LanguageKey = "en" | "ta" | "si";

interface ApiOrder {
    _id: string;
    information: {
        title: string;
        address: string;
        dateofBirth: string;
        dateofDeath: string;
        description: string;
        tributeVideo: string;
        shortDescription: string;
    };
    primaryImage: string;
    thumbnailImage: string;
    tributeItems: string[];
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    orders: ApiOrder[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}

const Obituary: React.FC = () => {
    const { language } = useLanguage();
    let langKey: LanguageKey = "en";
    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";

    const translations: Record<LanguageKey, { [key: string]: string }> = {
        en: {
            days: "days",
            day: "day",
            hours: "hours", 
            hour: "hour",
            minutes: "minutes",
            minute: "minute",
            justNow: "Just now",
            ago: "ago",
            noObituariesFound: "No obituaries found",
            noObituariesForSearch: "No obituaries found for",
            noObituariesForCountry: "No obituaries found for",
            noObituariesForFilters: "No obituaries found matching the selected filters.",
            adjustSearchSuggestion: "Try adjusting your search terms, filters, or country selection, or browse all obituaries.",
            errorOccurred: "An error occurred while fetching data",
            errorSearching: "An error occurred while searching",
            errorFiltering: "An error occurred while filtering",
            errorCountryFetch: "An error occurred while fetching orders by country",
            failedToFetch: "Failed to fetch orders:",
            failedToFilter: "Failed to filter orders:",
            failedToFetchCountry: "Failed to fetch orders by country:"
        },
        ta: {
            days: "நாட்கள்",
            day: "நாள்",
            hours: "மணி நேரங்கள்",
            hour: "மணி நேரம்",
            minutes: "நிமிடங்கள்",
            minute: "நிமிடம்",
            justNow: "இப்போதே",
            ago: "முன்பு",
            noObituariesFound: "இரங்கல் அறிவிப்புகள் எதுவும் கிடைக்கவில்லை",
            noObituariesForSearch: "இதற்கான இரங்கல் அறிவிப்புகள் எதுவும் கிடைக்கவில்லை",
            noObituariesForCountry: "இதற்கான இரங்கல் அறிவிப்புகள் எதுவும் கிடைக்கவில்லை",
            noObituariesForFilters: "தேர்ந்தெடுக்கப்பட்ட வடிகட்டிகளுக்குப் பொருந்தும் இரங்கல் அறிவிப்புகள் எதுவும் கிடைக்கவில்லை.",
            adjustSearchSuggestion: "உங்கள் தேடல் வார்த்தைகள், வடிகட்டிகள் அல்லது நாட்டுத் தேர்வை சரிசெய்ய முயற்சிக்கவும், அல்லது அனைத்து இரங்கல் அறிவிப்புகளையும் பார்க்கவும்.",
            errorOccurred: "தரவைப் பெறுவதில் பிழை ஏற்பட்டது",
            errorSearching: "தேடுவதில் பிழை ஏற்பட்டது",
            errorFiltering: "வடிகட்டுவதில் பிழை ஏற்பட்டது",
            errorCountryFetch: "நாட்டின் அடிப்படையில் ஆர்டர்களைப் பெறுவதில் பிழை ஏற்பட்டது",
            failedToFetch: "ஆர்டர்களைப் பெறுவதில் தோல்வி:",
            failedToFilter: "ஆர்டர்களை வடிகட்டுவதில் தோல்வி:",
            failedToFetchCountry: "நாட்டின் அடிப்படையில் ஆர்டர்களைப் பெறுவதில் தோல்வி:"
        },
        si: {
            days: "දින",
            day: "දිනය",
            hours: "පැය",
            hour: "පැයක්",
            minutes: "මිනිත්තු",
            minute: "මිනිත්තුව",
            justNow: "දැන්",
            ago: "කලින්",
            noObituariesFound: "මරණ දැන්වීම් හමු නොවීය",
            noObituariesForSearch: "මෙම සඳහා මරණ දැන්වීම් හමු නොවීය",
            noObituariesForCountry: "මෙම සඳහා මරණ දැන්වීම් හමු නොවීය",
            noObituariesForFilters: "තෝරාගත් පෙරහන්වලට ගැලපෙන මරණ දැන්වීම් හමු නොවීය.",
            adjustSearchSuggestion: "ඔබේ සෙවුම් වචන, පෙරහන් හෝ රට තේරීම සකස් කිරීමට උත්සාහ කරන්න, නැතහොත් සියලුම මරණ දැන්වීම් බලන්න.",
            errorOccurred: "දත්ත ලබා ගැනීමේදී දෝෂයක් ඇතිවිය",
            errorSearching: "සෙවීමේදී දෝෂයක් ඇතිවිය",
            errorFiltering: "පෙරහන් කිරීමේදී දෝෂයක් ඇතිවිය",
            errorCountryFetch: "රට අනුව ඇණවුම් ලබා ගැනීමේදී දෝෂයක් ඇතිවිය",
            failedToFetch: "ඇණවුම් ලබා ගැනීමට අසමත්:",
            failedToFilter: "ඇණවුම් පෙරහන් කිරීමට අසමත්:",
            failedToFetchCountry: "රට අනුව ඇණවුම් ලබා ගැනීමට අසමත්:"
        }
    };

    const t = translations[langKey];
    const [orders, setOrders] = useState<ApiOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [error, setError] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [activeFilters, setActiveFilters] = useState<FilterOptions | null>(null);
    const [isFiltering, setIsFiltering] = useState<boolean>(false);
    const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
    const [selectedCountryName, setSelectedCountryName] = useState<string>("");
    const [isFilteringByCountry, setIsFilteringByCountry] = useState<boolean>(false);

    // Function to calculate time ago from createdAt
    const calculateTimeAgo = (createdAt: string): string => {
        const now = new Date();
        const created = new Date(createdAt);
        const diffInMilliseconds = now.getTime() - created.getTime();
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays > 0) {
            return `${diffInDays} ${diffInDays > 1 ? t.days : t.day} ${t.ago}`;
        } else if (diffInHours > 0) {
            return `${diffInHours} ${diffInHours > 1 ? t.hours : t.hour} ${t.ago}`;
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes} ${diffInMinutes > 1 ? t.minutes : t.minute} ${t.ago}`;
        } else {
            return t.justNow;
        }
    };

    // Function to fetch orders from API
    const fetchOrders = async (page: number = 1, limit: number = 10) => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/active-sorted?page=${page}&limit=${limit}`);

            if (!response.ok) {
                throw new Error(`${t.failedToFetch} ${response.status}`);
            }

            const data: ApiResponse = await response.json();

            setOrders(data.orders);
            setCurrentPage(data.pagination.currentPage);
            setTotalPages(data.pagination.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : t.errorOccurred);
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    // Function to search orders from API
    const searchOrders = async (title: string) => {
        try {
            setIsSearching(true);
            setError("");

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) {
                setIsSearching(false);
                setOrders([]);
                setCurrentPage(1);
                setTotalPages(1);
                return; // Exit if the response is not ok
            }

            const data = await response.json();

            // data is only an array of orders, not an object with pagination
            // create a new object to match ApiResponse structure

            const transformedData: ApiResponse = {
                orders: data,
                pagination: {
                    currentPage: 1, // Since search results are not paginated, we set currentPage to 1
                    totalPages: 1, // Also set totalPages to 1 for simplicity
                    totalItems: data.length // Total items is the length of the search results
                }
            };

            setOrders(transformedData.orders);
            setCurrentPage(transformedData.pagination.currentPage);
            setTotalPages(transformedData.pagination.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : t.errorSearching);
            console.error('Error searching orders:', err);
        } finally {
            setIsSearching(false);
        }
    };

    // Function to filter orders from API
    const filterOrders = async (filters: FilterOptions) => {
        try {
            setIsFiltering(true);
            setError("");

            // remove the attributes that have false values from filters
            const filteredKeys = Object.keys(filters).reduce((acc, key) => {
                if (filters[key as keyof FilterOptions] !== false && filters[key as keyof FilterOptions] !== null && filters[key as keyof FilterOptions] !== undefined) {
                    acc[key] = filters[key as keyof FilterOptions];
                }
                return acc;
            }, {} as { [key: string]: number | boolean });

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/filter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...filteredKeys,
                    page: currentPage, // Include current page in the request
                }),
            });

            if (!response.ok) {
                throw new Error(`${t.failedToFilter} ${response.status}`);
            }

            const data: ApiResponse = await response.json();

            setOrders(data.orders);
            setCurrentPage(data.pagination.currentPage);
            setTotalPages(data.pagination.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : t.errorFiltering);
            console.error('Error filtering orders:', err);
        } finally {
            setIsFiltering(false);
        }
    };

    // Function to fetch orders by selected country
    const fetchOrdersByCountry = async (countryId: string, page: number = 1, limit: number = 10) => {
        try {
            setIsFilteringByCountry(true);
            setError("");

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/by-selected-country/${countryId}?page=${page}&limit=${limit}`);

            if (!response.ok) {
                throw new Error(`${t.failedToFetchCountry} ${response.status}`);
            }

            const data: ApiResponse = await response.json();

            setOrders(data.orders);
            setCurrentPage(data.pagination.currentPage);
            setTotalPages(data.pagination.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : t.errorCountryFetch);
            console.error('Error fetching orders by country:', err);
        } finally {
            setIsFilteringByCountry(false);
        }
    };

    // Effect to fetch data on component mount and page change
    useEffect(() => {
        if (searchTerm.trim()) {
            searchOrders(searchTerm);
        } else if (selectedCountryId) {
            fetchOrdersByCountry(selectedCountryId, currentPage);
        } else if (activeFilters && currentPage > 1) {
            // Only apply filters for page changes, not initial filter application
            const updatedFilters = { ...activeFilters, page: currentPage };
            filterOrders(updatedFilters);
        } else if (!searchTerm.trim() && !activeFilters && !selectedCountryId) {
            fetchOrders(currentPage);
        }
    }, [currentPage, searchTerm, selectedCountryId]);

    // Function to handle search
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setActiveFilters(null); // Clear filters when searching
        setSelectedCountryId(null); // Clear country selection when searching
        setSelectedCountryName("");
        setCurrentPage(1); // Reset to first page when searching
    };

    // Function to handle filter
    const handleFilter = (filters: FilterOptions) => {
        setActiveFilters(filters);
        setSearchTerm(""); // Clear search when filtering
        setSelectedCountryId(null); // Clear country selection when filtering
        setSelectedCountryName("");
        setCurrentPage(1); // Reset to first page when filtering
        filterOrders(filters);
    };

    // Function to handle reset filters
    const handleReset = () => {
        setActiveFilters(null);
        setSearchTerm(""); // Clear search when resetting
        setSelectedCountryId(null); // Clear country selection when resetting
        setSelectedCountryName("");
        setCurrentPage(1); // Reset to first page when resetting
        fetchOrders(1); // Fetch regular orders
    };

    // Function to handle country selection
    const handleCountrySelect = (countryId: string, countryName: string) => {
        setSelectedCountryId(countryId);
        setSelectedCountryName(countryName);
        setSearchTerm(""); // Clear search when selecting country
        setActiveFilters(null); // Clear filters when selecting country
        setCurrentPage(1); // Reset to first page when selecting country
        
        // If "All" is selected (empty countryId), fetch all orders
        if (countryId === "" || countryId === "all") {
            setSelectedCountryId(null); // Set to null for "All" option
            fetchOrders(1);
        } else {
            fetchOrdersByCountry(countryId, 1);
        }
    };

    // Function to handle page change
    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    // Transform API data to match TributeCard props
    const transformOrderToTributeData = (order: ApiOrder) => ({
        _id: order._id,
        title: order.information.shortDescription || order.information.title,
        name: order.information.title,
        date: new Date(order.information.dateofDeath).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }),
        address: order.information.address,
        imageUrl: order.primaryImage || order.thumbnailImage || "/images/tribute.jpg",
        condolences: order.tributeItems? order.tributeItems.length : 0,
    });

    return (
        <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16  py-6 max-md:px-5">
            <Separator className="mb-4" />
            <OrbituaryNavbar 
                onSearch={handleSearch} 
                onFilter={handleFilter}
                onReset={handleReset}
                isLoading={isSearching || isFiltering || isFilteringByCountry} 
            />
            <CountrySection 
                onCountrySelect={handleCountrySelect}
                selectedCountryId={selectedCountryId === null ? "all" : selectedCountryId}
            />
            <Separator className="mb-4" />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {(loading || isSearching || isFiltering || isFilteringByCountry) ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#880002]"></div>
                        </div>
                    ) : orders.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {orders.map((order) => {
                                    const tributeData = transformOrderToTributeData(order);
                                    return (
                                        <TributeCard
                                            key={order._id}
                                            condolencesCount={tributeData.condolences}
                                            timeAgo={calculateTimeAgo(order.createdAt)}
                                            imageUrl={tributeData.imageUrl}
                                            ceremonyTitle={tributeData.title}
                                            eventName={tributeData.name}
                                            date={tributeData.date}
                                            entry={tributeData}
                                        />
                                    );
                                })}
                            </div>
                            <div className="flex justify-center md:mt-12">
                                <PaginationBar
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                {searchTerm.trim() 
                                    ? `${t.noObituariesForSearch} "${searchTerm}".` 
                                    : selectedCountryId
                                        ? `${t.noObituariesForCountry} ${selectedCountryName}.`
                                        : activeFilters 
                                            ? t.noObituariesForFilters
                                            : `${t.noObituariesFound}.`
                                }
                            </p>
                            {(searchTerm.trim() || activeFilters || selectedCountryId) && (
                                <p className="text-gray-400 text-sm mt-2">
                                    {t.adjustSearchSuggestion}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <div className="md:col-span-1">
                    <AdvertisementSidebar 
                    numberOfAds={4}
                    adPageName="obituary"
                    />
                </div>
            </div>
        </section>
    );
};

export default Obituary;
