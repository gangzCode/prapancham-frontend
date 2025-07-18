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

    const handleWhatsAppClick = () => {
        const phoneNumber = "94770023323";
        const message = encodeURIComponent("Hi! I'm interested in advertising on your platform. Could you please provide more information?");
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }

    // Loading state
    if (adsLoading) {
        return (
            <div className="mt-8 py-8 px-4 md:px-8 lg:px-16">
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    {/* Animated loading spinner */}
                    <div className="relative">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-teal-300 rounded-full animate-ping"></div>
                    </div>
                    
                    {/* Loading text with fade animation */}
                    <div className="text-center space-y-2">
                        <h2 className="text-xl font-semibold text-gray-700 animate-pulse">
                            {language === "tamil" ? "விளம்பரங்கள் ஏற்றப்படுகின்றன..." : 
                             language === "sinhala" ? "දැන්වීම් පූරණය වෙමින්..." : 
                             "Loading advertisements..."}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {language === "tamil" ? "தயவுசெய்து காத்திருங்கள்" : 
                             language === "sinhala" ? "කරුණාකර රැඳී සිටින්න" : 
                             "Please wait while we fetch the latest ads"}
                        </p>
                    </div>
                    
                    {/* Loading bars animation */}
                    <div className="flex space-x-1">
                        <div className="w-2 h-8 bg-primary rounded animate-pulse" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-8 bg-teal-400 rounded animate-pulse" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-8 bg-teal-300 rounded animate-pulse" style={{animationDelay: '300ms'}}></div>
                        <div className="w-2 h-8 bg-primary rounded animate-pulse" style={{animationDelay: '450ms'}}></div>
                    </div>
                </div>
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

    // No ads available state
    if (adsData && (!adsData.advertisements || adsData.advertisements.length === 0)) {
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

                {/* No Ads Message */}
                <div className="py-8 px-4 md:px-8 lg:px-16">
                    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
                        {/* No ads icon */}
                        <div className="relative">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                        </div>
                        
                        {/* No ads text */}
                        <div className="text-center space-y-3">
                            <h2 className="text-2xl font-semibold text-gray-700">
                                {language === "tamil" ? "விளம்பரங்கள் எதுவும் கிடைக்கவில்லை" : 
                                 language === "sinhala" ? "දැන්වීම් සොයා ගත නොහැකි විය" : 
                                 "No Advertisements Found"}
                            </h2>
                            <p className="text-gray-500 max-w-md">
                                {language === "tamil" ? 
                                    selectedAdCategory 
                                        ? "இந்த வகையில் தற்போது விளம்பரங்கள் எதுவும் இல்லை. வேறு வகையை முயற்சிக்கவும்." 
                                        : "தற்போது விளம்பரங்கள் எதுவும் கிடைக்கவில்லை. பின்னர் மீண்டும் சரிபார்க்கவும்."
                                 : language === "sinhala" ? 
                                    selectedAdCategory 
                                        ? "මෙම කාණ්ඩයේ දැනට දැන්වීම් නොමැත. වෙනත් කාණ්ඩයක් උත්සාහ කරන්න." 
                                        : "දැනට දැන්වීම් නොමැත. කරුණාකර පසුව නැවත පරීක්ෂා කරන්න."
                                 : selectedAdCategory 
                                    ? "There are currently no advertisements in this category. Try browsing other categories." 
                                    : "There are currently no advertisements available. Please check back later."}
                            </p>
                        </div>

                        {/* Call to action */}
                        <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg p-6 text-center text-white max-w-md cursor-pointer hover:from-teal-700 hover:to-teal-900 transition-colors"
                            onClick={handleWhatsAppClick}
                        >
                            <h3 className="text-lg font-bold mb-3">
                                {language === "tamil" ? "விளம்பரம் செய்ய விரும்புகிறீர்களா?" : 
                                 language === "sinhala" ? "ප්‍රචාරණය කිරීමට අවශ්‍යද?" : 
                                 "Want to Advertise Here?"}
                            </h3>
                            <p className="text-sm mb-4 opacity-90">
                                {language === "tamil" ? "உங்கள் விளம்பரங்களை இடுகையிட எங்களை தொடர்பு கொள்ளுங்கள்" : 
                                 language === "sinhala" ? "ඔබේ දැන්වීම් පළ කිරීමට අප හා සම්බන්ධ වන්න" : 
                                 "Contact us to post your advertisements and reach thousands of viewers"}
                            </p>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-green-300">💬</span>
                                <span className="font-medium">+94 77 002 33 23</span>
                            </div>
                            <p className="text-xs mt-2 opacity-80">
                                {language === "tamil" ? "WhatsApp இல் செய்தி அனுப்ப கிளிக் செய்யவும்!" : 
                                 language === "sinhala" ? "WhatsApp මගින් පණිවිඩ යැවීමට ක්ලික් කරන්න!" : 
                                 "Click to message us on WhatsApp!"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
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
