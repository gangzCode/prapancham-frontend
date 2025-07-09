"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import PaginationBar from "@/components/category/PaginationBar";
import useSWR from 'swr';
import { useLanguage } from "@/components/ui/LanguageProvider";



// Define ad types interface
interface AdType {
    _id: string;
    imageSize: string;
    isDeleted: boolean;
    type: string;
    isActive: boolean;
    __v: number;
}

interface AdCategory {
    name: {
        en: Array<{ name: string; value: string; _id: string }>;
        ta: Array<{ name: string; value: string; _id: string }>;
        si: Array<{ name: string; value: string; _id: string }>;
    };
    _id: string;
    isDeleted: boolean;
    isActive: boolean;
    __v: number;
}

interface Advertisement {
    _id: string;
    image: string;
    isDeleted: boolean;
    adPageName: string;
    isActive: boolean;
    expiryDate: string;
    uploadedDate: string;
    __v: number;
    adCategory: AdCategory;
    adType: AdType;
    link: string;
}

interface AdResponse {
    advertisements: Advertisement[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Advertisement = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAdCategory, setSelectedAdCategory] = useState<string>('');
    const { language } = useLanguage();
    let langKey: LanguageKey;

    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";
    else langKey = "en";
    type LanguageKey = 'en' | 'ta' | 'si';
    const translations: Record<LanguageKey, { [key: string]: string }> = {
        en: {
            posts: "Posts",
            allCategories: "All Categories",
        },
        ta: {
            posts: "பதிவுகள்",
            allCategories: "அனைத்து வகைகள்",
        },
        si: {
            posts: "පිටු",
            allCategories: "සියලුම කාණ්ඩ",
        },
    };
    const t = translations[langKey];

    // Fetch ad categories
    const { data: categoriesData, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/advertistment/ad-categories-with-count`,
        fetcher
    );

    // Fetch active advertisements with category filter
    const { data: adsData, error: adsError, isLoading: adsLoading } = useSWR<AdResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/advertistment/by-category?page=${currentPage}&limit=20${selectedAdCategory ? `&adCategory=${selectedAdCategory}` : ''}`,
        fetcher
    );


    const categories: string[] = [
        ...(categoriesData?.map((cat: any) => {
            const langObj = cat.name[langKey]?.[0] || cat.name["en"]?.[0];
            return `${langObj?.value} (${cat.adCount} ${t.posts})` || "";
        }) || []),
    ];

    // Categorize ads by type
    const categorizeAdsByType = (advertisements: Advertisement[]) => {
        const categorized: Record<string, Advertisement[]> = {};

        advertisements.forEach(ad => {
            const type = ad.adType.type;
            if (!categorized[type]) {
                categorized[type] = [];
            }
            categorized[type].push(ad);
        });

        return categorized;
    };

    const categorizedAds = adsData ? categorizeAdsByType(adsData.advertisements) : {};

    // Helper function to render an ad
    const renderAd = (ad: Advertisement, className: string = "") => (
        <div key={ad._id} className="bg-slate-50 shadow-lg p-4">
            <a href={ad.link} target="_blank" rel="noopener noreferrer">
                <img
                    src={ad.image}
                    alt={`${ad.adType.type} Advertisement`}
                    className={className}
                />
            </a>
        </div>
    );


    const [activeCountry, setActiveCountry] = useState(categories[0]);
    useEffect(() => {
        if (categories.length > 0 && !activeCountry) {
            setActiveCountry(categories[0]);
        }
    }, [categories, activeCountry]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedAdCategory(categoryId);
        setCurrentPage(1); // Reset to first page when changing category
    };

    // Get total ad count for "All Categories" tab
    const totalAdCount = categoriesData?.reduce((sum: number, cat: any) => sum + cat.adCount, 0) || 0;

    // Loading state
    if (adsLoading) {
        return (
            <div className="mt-8 py-8 px-4 md:px-8 lg:px-16">
                <div className="text-center">Loading advertisements...</div>
            </div>
        );
    }

    // Error state
    if (adsError) {
        return (
            <div className="mt-8 py-8 px-4 md:px-8 lg:px-16">
                <div className="text-center text-red-500">Error loading advertisements.</div>
            </div>
        );
    }

    const handleWhatsAppClick = () => {
        const phoneNumber = "94770023323";
        const message = encodeURIComponent("Hi! I'm interested in advertising on your platform. Could you please provide more information?");
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }

    return (
        <div className="mt-8">
            {/* Category Tabs */}
            <div className="py-4 px-4 md:px-8 lg:px-16 bg-white border-b">
                <div className="flex flex-wrap gap-2 md:gap-4">
                    {/* All Categories Tab */}
                    <button
                        onClick={() => handleCategoryChange('')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
                            selectedAdCategory === '' 
                                ? 'bg-primary text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {t.allCategories} ({totalAdCount} {t.posts})
                    </button>
                    
                    {/* Category Tabs */}
                    {categoriesData?.map((category: any) => {
                        const langObj = category.name[langKey]?.[0] || category.name["en"]?.[0];
                        return (
                            <button
                                key={category._id}
                                onClick={() => handleCategoryChange(category._id)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
                                    selectedAdCategory === category._id 
                                        ? 'bg-primary text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {langObj?.value} ({category.adCount} {t.posts})
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="py-8 px-4 md:px-8 lg:px-16 space-y-4">
                {/* First Full Width Ad */}
                {categorizedAds['Full Width'] && categorizedAds['Full Width'].length > 0 && (
                    <div className="bg-slate-50 shadow-lg p-4">
                        <a href={categorizedAds['Full Width'][0].link} target="_blank" rel="noopener noreferrer">
                            <img
                                src={categorizedAds['Full Width'][0].image}
                                alt={`${categorizedAds['Full Width'][0].adType.type} Advertisement`}
                                className="w-full md:max-h-[232px] max-h-[116px] object-cover"
                            />
                        </a>
                    </div>
                )}

                {/* Sidebar Banner Ads */}
                {categorizedAds['Sidebar Banner'] && categorizedAds['Sidebar Banner'].length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                        {categorizedAds['Sidebar Banner'].map(ad => (
                            <div key={ad._id} className="bg-slate-50 shadow-lg p-4">
                                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={ad.image}
                                        alt={`${ad.adType.type} Advertisement`}
                                        className="w-full max-h-[232px] object-fit"
                                    />
                                </a>
                            </div>
                        ))}
                        {/* Fill empty spaces with advertisement message */}
                        {categorizedAds['Sidebar Banner'].length % 2 === 1 && (
                            <div className="bg-slate-50 shadow-lg p-4 md:hidden cursor-pointer"
                                onClick={handleWhatsAppClick}
                            >
                                <a href="https://wa.me/94770023323" target="_blank" rel="noopener noreferrer">
                                    <div className="aspect-video w-full h-full relative bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center hover:from-teal-700 hover:to-teal-900 transition-colors">
                                        <div className="text-center text-white p-6">
                                            <h3 className="text-xl md:text-2xl font-bold mb-4">
                                                Want to Advertise Here?
                                            </h3>
                                            <p className="text-sm md:text-base mb-4 opacity-90">
                                                Contact us to post your advertisements and reach thousands of viewers
                                            </p>
                                            <div className="space-y-2">
                                                <p className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
                                                    <span className="text-green-300">💬</span>
                                                    +94 77 002 33 23
                                                </p>
                                                <p className="text-xs md:text-sm opacity-80">
                                                    Click to message us on WhatsApp!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )}
                        {categorizedAds['Sidebar Banner'].length % 3 !== 0 && categorizedAds['Sidebar Banner'].length % 3 === 1 && (
                            <>
                                <div className="hidden md:block bg-slate-50 shadow-lg p-4 cursor-pointer"
                                    onClick={handleWhatsAppClick}
                                >
                                    <a href="https://wa.me/94770023323" target="_blank" rel="noopener noreferrer">
                                        <div className="aspect-video w-full h-full relative bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center hover:from-teal-700 hover:to-teal-900 transition-colors">
                                            <div className="text-center text-white p-6">
                                                <h3 className="text-xl md:text-2xl font-bold mb-4">
                                                    Want to Advertise Here?
                                                </h3>
                                                <p className="text-sm md:text-base mb-4 opacity-90">
                                                    Contact us to post your advertisements and reach thousands of viewers
                                                </p>
                                                <div className="space-y-2">
                                                    <p className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
                                                        <span className="text-green-300">💬</span>
                                                        +94 77 002 33 23
                                                    </p>
                                                    <p className="text-xs md:text-sm opacity-80">
                                                        Click to message us on WhatsApp!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="hidden md:block bg-slate-50 shadow-lg p-4 cursor-pointer"
                                    onClick={handleWhatsAppClick}
                                >
                                    <a href="https://wa.me/94770023323" target="_blank" rel="noopener noreferrer">
                                        <div className="aspect-video w-full h-full relative bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center hover:from-teal-700 hover:to-teal-900 transition-colors">
                                            <div className="text-center text-white p-6">
                                                <h3 className="text-xl md:text-2xl font-bold mb-4">
                                                    Want to Advertise Here?
                                                </h3>
                                                <p className="text-sm md:text-base mb-4 opacity-90">
                                                    Contact us to post your advertisements and reach thousands of viewers
                                                </p>
                                                <div className="space-y-2">
                                                    <p className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
                                                        <span className="text-green-300">💬</span>
                                                        +94 77 002 33 23
                                                    </p>
                                                    <p className="text-xs md:text-sm opacity-80">
                                                        Click to message us on WhatsApp!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </>
                        )}
                        {categorizedAds['Sidebar Banner'].length % 3 === 2 && (
                            <div className="hidden md:block bg-slate-50 shadow-lg p-4 cursor-pointer"
                                onClick={handleWhatsAppClick}
                            >
                                <a href="https://wa.me/94770023323" target="_blank" rel="noopener noreferrer">
                                    <div className="aspect-video w-full h-full relative bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center hover:from-teal-700 hover:to-teal-900 transition-colors">
                                        <div className="text-center text-white p-6">
                                            <h3 className="text-xl md:text-2xl font-bold mb-4">
                                                Want to Advertise Here?
                                            </h3>
                                            <p className="text-sm md:text-base mb-4 opacity-90">
                                                Contact us to post your advertisements and reach thousands of viewers
                                            </p>
                                            <div className="space-y-2">
                                                <p className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
                                                    <span className="text-green-300">💬</span>
                                                    +94 77 002 33 23
                                                </p>
                                                <p className="text-xs md:text-sm opacity-80">
                                                    Click to message us on WhatsApp!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {/* Second Full Width Ad */}
                {categorizedAds['Full Width'] && categorizedAds['Full Width'].length > 1 && (
                    <div className="bg-slate-50 shadow-lg p-4">
                        <a href={categorizedAds['Full Width'][1].link} target="_blank" rel="noopener noreferrer">
                            <img
                                src={categorizedAds['Full Width'][1].image}
                                alt={`${categorizedAds['Full Width'][1].adType.type} Advertisement`}
                                className="w-full md:max-h-[232px] max-h-[116px] object-cover"
                            />
                        </a>
                    </div>
                )}

                {/* Billboard Ads */}
                {categorizedAds['Billboard'] && categorizedAds['Billboard'].length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        {categorizedAds['Billboard'].map(ad => (
                            <div key={ad._id} className="bg-slate-50 shadow-lg p-4">
                                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={ad.image}
                                        alt={`${ad.adType.type} Advertisement`}
                                        className="w-full md:h-[464px] h-auto object-fit"
                                    />
                                </a>
                            </div>
                        ))}
                        {/* Fill empty spaces with advertisement message */}
                        {categorizedAds['Billboard'].length % 2 === 1 && (
                            <div className="hidden md:block bg-slate-50 shadow-lg p-4 cursor-pointer"
                                onClick={handleWhatsAppClick}
                            >
                                <a href="https://wa.me/94770023323" target="_blank" rel="noopener noreferrer">
                                    <div className="aspect-video w-full h-full relative bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center hover:from-teal-700 hover:to-teal-900 transition-colors">
                                        <div className="text-center text-white p-6">
                                            <h3 className="text-xl md:text-2xl font-bold mb-4">
                                                Want to Advertise Here?
                                            </h3>
                                            <p className="text-sm md:text-base mb-4 opacity-90">
                                                Contact us to post your advertisements and reach thousands of viewers
                                            </p>
                                            <div className="space-y-2">
                                                <p className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
                                                    <span className="text-green-300">💬</span>
                                                    +94 77 002 33 23
                                                </p>
                                                <p className="text-xs md:text-sm opacity-80">
                                                    Click to message us on WhatsApp!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {/* Square Ads */}
                {categorizedAds['Square'] && categorizedAds['Square'].length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {categorizedAds['Square'].map(ad => (
                            <div key={ad._id} className="bg-slate-50 shadow-lg p-4">
                                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={ad.image}
                                        alt={`${ad.adType.type} Advertisement`}
                                        className="w-full aspect-square object-cover"
                                    />
                                </a>
                            </div>
                        ))}
                        {/* Fill empty spaces with advertisement message */}
                        {categorizedAds['Square'].length % 2 === 1 && (
                            <div className="bg-slate-50 shadow-lg p-4 cursor-pointer"
                                onClick={handleWhatsAppClick}
                            >
                                <a href="https://wa.me/94770023323" target="_blank" rel="noopener noreferrer">
                                    <div className="aspect-square w-full h-full relative bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center hover:from-teal-700 hover:to-teal-900 transition-colors">
                                        <div className="text-center text-white p-4">
                                            <h3 className="text-lg font-bold mb-2">
                                                Want to Advertise Here?
                                            </h3>
                                            <p className="text-xs mb-2 opacity-90">
                                                Contact us to post your advertisements
                                            </p>
                                            <div className="space-y-1">
                                                <p className="text-xs font-medium flex items-center justify-center gap-1">
                                                    <span className="text-green-300">💬</span>
                                                    +94 77 002 33 23
                                                </p>
                                                <p className="text-xs opacity-80">
                                                    Click to message us!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {/* Standard Ads */}
                {categorizedAds['Standard'] && categorizedAds['Standard'].length > 0 && (
                    <div className="grid grid-cols-1 gap-2 mb-4">
                        {categorizedAds['Standard'].map(ad => (
                            <div key={ad._id} className="bg-slate-50 shadow-lg p-4">
                                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={ad.image}
                                        alt={`${ad.adType.type} Advertisement`}
                                        className="w-full md:h-[648px] h-[400px] object-fit"
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {/* Display other ad types if any */}
                {Object.keys(categorizedAds).map(adType => {
                    if (!['Full Width', 'Sidebar Banner', 'Billboard', 'Square', 'Standard'].includes(adType)) {
                        return (
                            <div key={adType} className="space-y-4">
                                <h3 className="text-lg font-semibold">{adType} Ads</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
                                    {categorizedAds[adType].map(ad => (
                                        <div key={ad._id} className="bg-slate-50 shadow-lg p-4">
                                            <a href={ad.link} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={ad.image}
                                                    alt={`${ad.adType.type} Advertisement`}
                                                    className="w-full h-auto object-fit"
                                                />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}

                {/* Remaining Full Width Ads (3rd and beyond) */}
                {categorizedAds['Full Width'] && categorizedAds['Full Width'].length > 2 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Additional Full Width Ads</h3>
                        {categorizedAds['Full Width'].slice(2).map((ad) => (
                            <div key={ad._id} className="bg-slate-50 shadow-lg p-4">
                                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={ad.image}
                                        alt={`${ad.adType.type} Advertisement`}
                                        className="w-full md:max-h-[232px] max-h-[116px] object-cover"
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {adsData && adsData.pagination && (
                    <div>
                        <PaginationBar
                            currentPage={adsData.pagination.currentPage}
                            totalPages={adsData.pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Advertisement;
