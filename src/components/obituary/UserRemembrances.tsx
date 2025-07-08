"use client";

import React, { useState, useEffect } from "react";
import OrbituaryCard from "./OrbituaryCard";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";

type LanguageKey = "en" | "ta" | "si";

interface UserremembranceOrder {
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
    basePackagePrice: {
        country: {
            _id: string;
            currencyCode: string;
        };
        price: number;
    };
    finalPrice: {
        country: {
            _id: string;
            currencyCode: string;
        };
        price: number;
    };
    finalPriceInCAD: number;
    donationRecieved: {
        currencyCode: string;
    };
    donationGivenBack: {
        currencyCode: string;
    };
    memoryImageMoneyRecieved: {
        currencyCode: string;
    };
    flowerMoneyRecieved: {
        currencyCode: string;
    };
    slideshowImages: string[];
    tributeItems: any[];
    expiryDate: string;
    recievedDonations: any[];
    primaryImage: string;
    thumbnailImage: string;
    selectedAddons: any[];
    additionalImages: string[];
    isDeleted: boolean;
    orderStatus: string;
    contactDetails: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    selectedBgColor?: any;
    selectedPackage?: any;
    selectedPrimaryImageBgFrame?: any;
}

interface UserRemembrancesResponse {
    type: string;
    count: number;
    orders: UserremembranceOrder[];
}

const UserRemembrances: React.FC = () => {
    const { language } = useLanguage();
    const router = useRouter();
    let langKey: LanguageKey = "en";
    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";

    const translations: Record<LanguageKey, { [key: string]: string }> = {
        en: {
            myRemembrances: "My Remembrances",
            loading: "Loading your remembrances...",
            noRemembrances: "No remembrances found.",
            errorLoading: "Error loading remembrances. Please try again.",
            failedToFetch: "Failed to fetch remembrances:",
            refresh: "Refresh",
            days: "days",
            day: "day",
            hours: "hours",
            hour: "hour",
            minutes: "minutes",
            minute: "minute",
            justNow: "Just now",
            ago: "ago",
            loginRequired: "Please log in to view your obituaries.",
            postObituary: "Post Remembrance"
        },
        ta: {
            myRemembrances: "எனது இரங்கல்கள்",
            loading: "உங்கள் இரங்கல்களை ஏற்றுகிறது...",
            noRemembrances: "இரங்கல்கள் எதுவும் கிடைக்கவில்லை.",
            errorLoading: "இரங்கல்களை ஏற்றுவதில் பிழை. மீண்டும் முயற்சிக்கவும்.",
            failedToFetch: "இரங்கல்களைப் பெறுவதில் தோல்வி:",
            refresh: "புதுப்பிக்கவும்",
            days: "நாட்கள்",
            day: "நாள்",
            hours: "மணி நேரங்கள்",
            hour: "மணி நேரம்",
            minutes: "நிமிடங்கள்",
            minute: "நிமிடம்",
            justNow: "இப்போதே",
            ago: "முன்பு",
            loginRequired: "உங்கள் இரங்கல்களைப் பார்க்க தயவுசெய்து உள்நுழையவும்.",
            postObituary: "இரங்கல் பதிவு செய்யவும்"
        },
        si: {
            myRemembrances: "මගේ මරණ දැන්වීම්",
            loading: "ඔබේ මරණ දැන්වීම් පූරණය වෙමින්...",
            noRemembrances: "මරණ දැන්වීම් හමු නොවීය.",
            errorLoading: "මරණ දැන්වීම් පූරණය කිරීමේදී දෝෂයක්. කරුණාකර නැවත උත්සාහ කරන්න.",
            failedToFetch: "මරණ දැන්වීම් ලබා ගැනීමට අසමත්:",
            refresh: "නැවුම් කරන්න",
            days: "දින",
            day: "දිනය",
            hours: "පැය",
            hour: "පැයක්",
            minutes: "මිනිත්තු",
            minute: "මිනිත්තුව",
            justNow: "දැන්",
            ago: "කලින්",
            loginRequired: "ඔබේ මරණ දැන්වීම් බැලීමට කරුණාකර පුරනය වන්න.",
            postObituary: "මරණ දැන්වීම පළ කරන්න"
        }
    };

    const t = translations[langKey];

    const [remembrances, setRemembrances] = useState<UserremembranceOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [user, setUser] = useState<any>(null);

    // Function to get user data from localStorage
    const getUserFromStorage = () => {
        try {
            const userData = localStorage.getItem('user');
            const accessToken = localStorage.getItem('accessToken');

            if (userData && accessToken) {
                return {
                    user: JSON.parse(userData),
                    accessToken
                };
            }
            return null;
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
            return null;
        }
    };

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

    // Function to fetch user remembrances
    const fetchUserRemembrances = async (userId: string, accessToken: string) => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/order/find/${userId}?type=remembrance`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                setRemembrances([]);
                return;
            }

            const data: UserRemembrancesResponse = await response.json();
            setRemembrances(data.orders);
        } catch (err) {
            setError(err instanceof Error ? err.message : t.errorLoading);
            console.error('Error fetching user remembrances:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const userData = getUserFromStorage();

        if (userData && userData.user && userData.accessToken) {
            setUser(userData.user);
            fetchUserRemembrances(userData.user._id, userData.accessToken);
        } else {
            setError(t.loginRequired);
            setLoading(false);
        }
    }, []);

    // Function to refresh remembrances
    const handleRefresh = () => {
        const userData = getUserFromStorage();
        if (userData && userData.user && userData.accessToken) {
            fetchUserRemembrances(userData.user._id, userData.accessToken);
        }
    };

    // Function to handle after deletion (refresh the list)
    const handleAfterDelete = () => {
        handleRefresh();
    };

    // Function to calculate total donations received
    const calculateDonationReceived = (recievedDonations: any): any => {
        if (!recievedDonations || !recievedDonations.price) {
            return {
                price: 0,
                currencyCode: 'CAD' // Default to CAD if no donations
            }
        }
        else return {
            price: recievedDonations.price,
            currencyCode: recievedDonations.currencyCode || 'CAD' // Default to CAD if no currency code
        }
    };

    // Transform remembrance data to match OrbituaryCard props
    const transformRemembranceData = (remembrance: UserremembranceOrder) => ({
        condolencesCount: remembrance.tributeItems?.length || 0,
        timeAgo: calculateTimeAgo(remembrance.createdAt),
        imageUrl: remembrance.primaryImage || remembrance.thumbnailImage || "/images/tribute.jpg",
        ceremonyTitle: remembrance.information.shortDescription || remembrance.information.title,
        eventName: remembrance.information.title,
        date: new Date(remembrance.information.dateofDeath).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }),
        finalPrice: {
            currencyCode: remembrance.finalPrice.country.currencyCode,
            price: remembrance.finalPrice.price
        },
        donationReceived: calculateDonationReceived(remembrance.donationRecieved),
        postedDate: new Date(remembrance.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#880002]"></div>
                <span className="ml-4 text-gray-600">{t.loading}</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{error}</p>
                {user && error !== t.loginRequired && (
                    <button
                        onClick={handleRefresh}
                        className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                        {t.refresh}
                    </button>
                )}
            </div>
        );
    }

    return (
        <div>
            {/* First row with Post Obituary card and first 2 obituaries (if they exist) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Post Obituary Card */}
                <div
                    className="border-2 border-dashed border-gray-300 flex items-center justify-center p-4 min-h-48 cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors"
                    onClick={() => router.push('/create-memorial')}
                >
                    <div className="text-center">
                        <CirclePlus className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">{t.postObituary}</p>
                    </div>
                </div>

                {/* First 2 obituary cards (if they exist) */}
                {remembrances.slice(0, 2).map((obituary) => {
                    const cardData = transformRemembranceData(obituary);
                    return (
                        <OrbituaryCard
                            key={obituary._id}
                            orderId={obituary._id}
                            condolencesCount={cardData.condolencesCount}
                            timeAgo={cardData.timeAgo}
                            imageUrl={cardData.imageUrl}
                            ceremonyTitle={cardData.ceremonyTitle}
                            eventName={cardData.eventName}
                            date={cardData.date}
                            finalPrice={cardData.finalPrice}
                            donationReceived={cardData.donationReceived}
                            postedDate={cardData.postedDate}
                            onDelete={handleAfterDelete}
                        />
                    );
                })}
            </div>





            {/* Remaining obituaries in normal 3-column grid */}
            {remembrances.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {remembrances.slice(2).map((obituary) => {
                        const cardData = transformRemembranceData(obituary);
                        return (
                            <OrbituaryCard
                                key={obituary._id}
                                orderId={obituary._id}
                                condolencesCount={cardData.condolencesCount}
                                timeAgo={cardData.timeAgo}
                                imageUrl={cardData.imageUrl}
                                ceremonyTitle={cardData.ceremonyTitle}
                                eventName={cardData.eventName}
                                date={cardData.date}
                                finalPrice={cardData.finalPrice}
                                donationReceived={cardData.donationReceived}
                                postedDate={cardData.postedDate}
                                onDelete={handleAfterDelete}
                            />
                        );
                    })}
                </div>
            )}



            {/* No obituaries message */}
            {remembrances.length === 0 && !loading && !error && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">{t.noRemembrances}</p>
                </div>
            )}

        </div>
    );
};

export default UserRemembrances;
