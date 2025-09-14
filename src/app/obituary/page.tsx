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
import useSWR from 'swr';

type LanguageKey = "en" | "ta" | "si";

interface ApiOrder {
    _id: string;
    information: {
        title?: string;
        firstName?: string;
        lastName?: string;
        preferredName?: string;
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
    recievedDonations: string[];
    createdAt: string;
    updatedAt: string;
    isDonationReceivable?: boolean;
    accountDetails?: {
        bankName: string;
        branchName: string;
        accountNumber: string | null;
        accountHolderName: string;
    };
}

interface ApiResponse {
    orders: ApiOrder[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}

function OrbituaryPage() {
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

    // State for UI controls
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [activeFilters, setActiveFilters] = useState<FilterOptions | null>(null);
    const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
    const [selectedCountryName, setSelectedCountryName] = useState<string>("");
    const [isMobile, setIsMobile] = useState(false);

    // SWR fetcher function
    const fetcher = (url: string) => fetch(url).then(res => {
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
    });

    // Construct API URL based on current state
    const getApiUrl = () => {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/order/active-sorted?page=${currentPage}&limit=10`;
        
        if (searchTerm) {
            url = `${process.env.NEXT_PUBLIC_API_URL}/order/search?query=${encodeURIComponent(searchTerm)}&page=${currentPage}&limit=10`;
        } else if (activeFilters) {
            const params = new URLSearchParams();
            params.append('page', currentPage.toString());
            params.append('limit', '10');
            if (activeFilters.isPriority) params.append('isPriority', 'true');
            if (activeFilters.isRemembarace) params.append('isRemembarace', 'true');
            if (activeFilters.isObituary) params.append('isObituary', 'true');
            if (activeFilters.isFeatured) params.append('isFeatured', 'true');
            url = `${process.env.NEXT_PUBLIC_API_URL}/order/filter?${params.toString()}`;
        } else if (selectedCountryId) {
            url = `${process.env.NEXT_PUBLIC_API_URL}/order/country/${selectedCountryId}?page=${currentPage}&limit=10`;
        }
        
        return url;
    };

    // SWR hook for data fetching with caching
    const { data, error, isLoading } = useSWR<ApiResponse>(getApiUrl(), fetcher, {
        keepPreviousData: true, // Show previous data while loading new data
        revalidateOnFocus: false, // Don't revalidate when window gets focus
        revalidateOnReconnect: false, // Don't revalidate on reconnect
    });

    const orders = data?.orders || [];
    const totalPages = data?.pagination?.totalPages || 1;

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
    };

    // Function to handle reset filters
    const handleReset = () => {
        setActiveFilters(null);
        setSearchTerm(""); // Clear search when resetting
        setSelectedCountryId(null); // Clear country selection when resetting
        setSelectedCountryName("");
        setCurrentPage(1); // Reset to first page when resetting
    };

    // Function to handle country selection
    const handleCountrySelect = (countryId: string, countryName: string) => {
        setSelectedCountryId(countryId);
        setSelectedCountryName(countryName);
        setSearchTerm(""); // Clear search when selecting country
        setActiveFilters(null); // Clear filters when selecting country
        setCurrentPage(1); // Reset to first page when selecting country
        
        // If "All" is selected (empty countryId), clear the selection
        if (countryId === "" || countryId === "all") {
            setSelectedCountryId(null); // Set to null for "All" option
        }
    };

    // Function to handle page change
    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    // Mobile detection useEffect
    useEffect(() => {
        const checkMobile = () => setIsMobile(window?.innerWidth < 878);
        checkMobile();
        window?.addEventListener("resize", checkMobile);
        return () => window?.removeEventListener("resize", checkMobile);
    }, []);

    // Transform API data to match TributeCard props
    const transformOrderToTributeData = (order: ApiOrder) => ({
        _id: order?._id ?? "",
        title:
            order?.information?.shortDescription
            || order?.information?.title
            || ((order?.information?.firstName && order?.information?.lastName)
                ? `${order.information.firstName} ${order.information.lastName}`
                : order?.information?.preferredName
            )
            || "",
        name: order?.information?.title
            || ((order?.information?.firstName && order?.information?.lastName && order?.information?.preferredName)
                ? `${order.information.firstName} ${order.information.lastName} (${order.information.preferredName})`
                : (order?.information?.firstName && order?.information?.lastName)
                    ? `${order.information.firstName} ${order.information.lastName}`
                    : order?.information?.preferredName
            ) || "",
        date: order?.information?.dateofDeath
            ? new Date(order.information.dateofDeath).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })
            : "",
        address: order?.information?.address ?? "",
        imageUrl: order?.thumbnailImage
            || order?.primaryImage
            || "/images/tribute.jpg",
        condolences: Array.isArray(order?.tributeItems) ? order.tributeItems.length : 0,
        donations: Array.isArray(order?.recievedDonations) ? order.recievedDonations.length : 0,
        isDonationReceivable: order?.isDonationReceivable ?? false,
        accountDetails: order?.accountDetails ?? null,
    });

    return (
        <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16  py-6 max-md:px-5">
            <Separator className="mb-4" />
            <OrbituaryNavbar
                onSearch={handleSearch}
                onFilter={handleFilter}
                onReset={handleReset}
                isLoading={isLoading}
            />
            <CountrySection
                onCountrySelect={handleCountrySelect}
                selectedCountryId={selectedCountryId === null ? "all" : selectedCountryId}
            />
            <Separator className="mb-4" />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error.message || t.errorOccurred}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {isLoading && !data ? (
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
                                            donationCount={tributeData.donations}
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
}

export default OrbituaryPage;
