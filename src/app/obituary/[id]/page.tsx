"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import DonateModal from '@/components/obituary/DonateModal';
import type { ObituaryEntry } from '@/components/hero/types';
import { useLanguage } from '@/components/ui/LanguageProvider';
// import { demoData } from "./demoData";

type LanguageKey = "en" | "ta" | "si";

const localeText = {
    en: {
        loading: "Loading...",
        error: "Error:",
        obituaryNotFound: "Obituary not found",
        ourDeepestCondolences: "Our deepest condolences",
        birth: "Birth",
        death: "Death",
        birthDate: "Birth date",
        deathDate: "Death date",
        memorialTitle: "Memorial Title",
        noDescriptionProvided: "No description provided.",
        postTribute: "Post Tribute",
        donate: "Donate",
        mediaGallery: "Media Gallery",
        tributeVideo: "Tribute Video",
        slideshowImages: "Slideshow Images",
        tributes: "Tributes",
        messages: "Messages",
        cards: "Cards",
        contacts: "Contacts",
        noContactInformation: "No contact information provided.",
        requestToContact: "Request to Contact",
        overview: "Overview",
        name: "Name:",
        birthDateLabel: "Birth Date:",
        deathDateLabel: "Death Date:",
        age: "Age:",
        address: "Address:",
        notProvided: "Not provided",
        postersInformation: "Poster's Information",
        nameNotProvided: "Name not provided",
        addressNotProvided: "Address not provided",
        emailNotProvided: "Email not provided",
        phoneNotProvided: "Phone not provided",
        accountDetails: "Account Details",
        bank: "Bank:",
        branch: "Branch:",
        account: "Account:",
        holder: "Holder:",
        pictures: "Pictures",
        noImagesUploaded: "No images uploaded",
        noImageSelected: "No image selected"
    },
    ta: {
        loading: "ஏற்றுகிறது...",
        error: "பிழை:",
        obituaryNotFound: "மரண அறிவித்தல் கிடைக்கவில்லை",
        ourDeepestCondolences: "எங்கள் ஆழ்ந்த இரங்கல்கள்",
        birth: "பிறப்பு",
        death: "மரணம்",
        birthDate: "பிறந்த தேதி",
        deathDate: "மரண தேதி",
        memorialTitle: "நினைவு தலைப்பு",
        noDescriptionProvided: "விளக்கம் வழங்கப்படவில்லை.",
        postTribute: "அஞ்சலி இடு",
        donate: "நன்கொடை",
        mediaGallery: "ஊடக காட்சியகம்",
        tributeVideo: "அஞ்சலி வீடியோ",
        slideshowImages: "ஸ்லைடுஷோ படங்கள்",
        tributes: "அஞ்சலிகள்",
        messages: "செய்திகள்",
        cards: "அட்டைகள்",
        contacts: "தொடர்புகள்",
        noContactInformation: "தொடர்பு தகவல்கள் வழங்கப்படவில்லை.",
        requestToContact: "தொடர்பு கோரிக்கை",
        overview: "கண்ணோட்டம்",
        name: "பெயர்:",
        birthDateLabel: "பிறந்த தேதி:",
        deathDateLabel: "மரண தேதி:",
        age: "வயது:",
        address: "முகவரி:",
        notProvided: "வழங்கப்படவில்லை",
        postersInformation: "போஸ்டரின் தகவல்கள்",
        nameNotProvided: "பெயர் வழங்கப்படவில்லை",
        addressNotProvided: "முகவரி வழங்கப்படவில்லை",
        emailNotProvided: "மின்னஞ்சல் வழங்கப்படவில்லை",
        phoneNotProvided: "தொலைபேசி வழங்கப்படவில்லை",
        accountDetails: "கணக்கு விவரங்கள்",
        bank: "வங்கி:",
        branch: "கிளை:",
        account: "கணக்கு:",
        holder: "வைத்திருப்பவர்:",
        pictures: "படங்கள்",
        noImagesUploaded: "படங்கள் பதிவேற்றப்படவில்லை",
        noImageSelected: "படம் தேர்ந்தெடுக்கப்படவில்லை"
    },
    si: {
        loading: "පූරණය වෙමින්...",
        error: "දෝෂය:",
        obituaryNotFound: "මරණ දැනුම්දීම සොයා ගත නොහැක",
        ourDeepestCondolences: "අපගේ ගැඹුරු සමුපකාර",
        birth: "උපත",
        death: "මරණය",
        birthDate: "උපන් දිනය",
        deathDate: "මරණ දිනය",
        memorialTitle: "ස්මාරක මාතෘකාව",
        noDescriptionProvided: "විස්තරයක් ලබා දී නැත.",
        postTribute: "ප්‍රණාමය පළ කරන්න",
        donate: "දන්දීම්",
        mediaGallery: "මාධ්‍ය ගැලරිය",
        tributeVideo: "ප්‍රණාම වීඩියෝව",
        slideshowImages: "ස්ලයිඩ්ෂෝ පින්තූර",
        tributes: "ප්‍රණාම",
        messages: "පණිවිඩ",
        cards: "කාඩ්පත්",
        contacts: "සම්බන්ධතා",
        noContactInformation: "සම්බන්ධතා තොරතුරු ලබා දී නැත.",
        requestToContact: "සම්බන්ධ වීමට ඉල්ලීම",
        overview: "දළ විශ්ලේෂණය",
        name: "නම:",
        birthDateLabel: "උපන් දිනය:",
        deathDateLabel: "මරණ දිනය:",
        age: "වයස:",
        address: "ලිපිනය:",
        notProvided: "ලබා දී නැත",
        postersInformation: "පෝස්ටරගේ තොරතුරු",
        nameNotProvided: "නම ලබා දී නැත",
        addressNotProvided: "ලිපිනය ලබා දී නැත",
        emailNotProvided: "ඊ-මේල් ලබා දී නැත",
        phoneNotProvided: "දුරකථනය ලබා දී නැත",
        accountDetails: "ගිණුම් විස්තර",
        bank: "බැංකුව:",
        branch: "ශාඛාව:",
        account: "ගිණුම:",
        holder: "හිමිකරු:",
        pictures: "පින්තූර",
        noImagesUploaded: "පින්තූර උඩුගත කර නැත",
        noImageSelected: "පින්තූරයක් තෝරා නැත"
    },
};
interface ObituaryData {
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
        country: string;
        price: number;
    };
    finalPrice: {
        country: {
            _id: string;
            currencyCode: string;
        };
        price: number;
    };
    finalPriceInCAD: {
        price: number;
        currencyCode: string;
    };
    accountDetails: {
        bankName: string;
        branchName: string;
        accountNumber: number;
        accountHolderName: string;
    };
    _id: string;
    username: string;
    primaryImage: string;
    thumbnailImage: string;
    selectedAddons: any[];
    additionalImages: string[];
    slideshowImages: string[];
    isDeleted: boolean;
    orderStatus: string;
    tributeItems: any[];
    expiryDate: string;
    recievedDonations: any[];
    userDonationStatus: string;
    contactDetails: any[];
    createdAt: string;
    updatedAt: string;
    selectedBgColor: {
        _id: string;
        name: string;
        colorCode: string;
        isDeleted: boolean;
        isActive: boolean;
    };
    selectedCountry: string;
    selectedPackage: any;
    selectedPrimaryImageBgFrame: {
        _id: string;
        frameImage: string;
        isDeleted: boolean;
        isActive: boolean;
    };
}

const ObituaryDetail: React.FC = () => {
    const { language } = useLanguage();
    const params = useParams();
    const orderId = params?.id as string;

    let langKey: LanguageKey = "en";
    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";

    const t = localeText[langKey];

    const [obituaryData, setObituaryData] = useState<ObituaryData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'messages' | 'cards'>('messages');
    const [tributeTemplateCards, setTributeTemplateCards] = useState<{
        tributeCardTemplate: [
            {
                _id: string;
                name: string;
                image: string;
            }
        ],
        pagination: {}
    }>({
        tributeCardTemplate: [
            {
                _id: "",
                name: "",
                image: ""
            }
        ],
        pagination: {}
    });

    // Modal handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Fetch obituary data
    useEffect(() => {
        const fetchObituaryData = async () => {
            if (!orderId) return;

            try {
                setLoading(true);
                setError("");

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: ObituaryData = await response.json();
                setObituaryData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
                console.error('Error fetching obituary data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchObituaryData();
    }, [orderId]);

    // Fetch tribute template cards
    useEffect(() => {
        const fetchTributeTemplateCards = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tribute-items/card-template/active?page=1&limit=10`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTributeTemplateCards(data);
            } catch (err) {
                console.error('Error fetching tribute template cards:', err);
            }
        };

        fetchTributeTemplateCards();
    }, []);

    const getSelectedTemplate = (
        selectedCardTemplate: string
    ) => {
        console.log('tributeTemplateCards:', tributeTemplateCards.tributeCardTemplate);
        console.log('selectedCardTemplate:', selectedCardTemplate);
        return tributeTemplateCards.tributeCardTemplate.find(template => template._id === selectedCardTemplate);
    };

    const CardPreview = (
        card: any
    ) => {
        console.log('card.cardTemplate:', card.card);
        const selectedTemplate = getSelectedTemplate(card.card.cardTemplate);

        if (!selectedTemplate) {
            return (
                <div className="max-w-md mx-auto relative">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300 hover:border-teal-400 transition-all duration-300">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-medium">Select a template to preview</p>
                        <p className="text-gray-400 text-sm mt-2">Your card design will appear here</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="max-w-md mx-auto perspective-1000">
                <div className="relative transform hover:scale-105 transition-all duration-500 hover:rotate-1">
                    {/* Decorative background blur */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 animate-pulse"></div>

                    {/* Main card container */}
                    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                        {/* Decorative corner elements */}
                        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-teal-400 to-transparent opacity-20 rounded-br-full"></div>
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-400 to-transparent opacity-20 rounded-bl-full"></div>

                        {/* Background Image with enhanced overlay */}
                        <div className="relative h-80">
                            {selectedTemplate.image && (
                                <>
                                    <img
                                        src={selectedTemplate.image}
                                        alt={selectedTemplate.name}
                                        className="w-full h-full object-cover filter brightness-110 contrast-110"
                                    />
                                    {/* Multiple gradient overlays for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30"></div>
                                </>
                            )}

                            {/* Enhanced content overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <div className="text-white">
                                    {/* Message with enhanced styling */}
                                    {card.card.message && (
                                        <div className="mb-4 backdrop-blur-sm bg-white/10 rounded-xl p-3 border border-white/20">
                                            <div className="flex items-start space-x-2">
                                                <svg className="w-4 h-4 text-teal-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                                </svg>
                                                <p className="italic text-sm leading-relaxed font-light text-shadow-lg">
                                                    {card.card.message}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Enhanced personal details */}
                                    <div className="backdrop-blur-sm bg-black/20 rounded-xl p-4 border border-white/10">
                                        <div className="space-y-2">
                                            {card.card.name && (
                                                <div className="flex items-center justify-between group">
                                                    <span className="font-medium opacity-90 text-xs flex items-center">
                                                        <svg className="w-3 h-3 mr-1.5 text-teal-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                        </svg>
                                                        From:
                                                    </span>
                                                    <span className="font-semibold text-xs bg-white/20 px-2 py-1 rounded-full group-hover:bg-white/30 transition-colors">
                                                        {card.card.name}
                                                    </span>
                                                </div>
                                            )}

                                            {card.card.relationship && (
                                                <div className="flex items-center justify-between group">
                                                    <span className="font-medium opacity-90 text-xs flex items-center">
                                                        <svg className="w-3 h-3 mr-1.5 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.001 1.001 0 0 0 19 8h-2c-.55 0-1 .45-1 1v5H8V9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v7l2 6h2v-6h8v6h4z" />
                                                        </svg>
                                                        Bond:
                                                    </span>
                                                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full group-hover:bg-white/30 transition-colors">
                                                        {card.card.relationship}
                                                    </span>
                                                </div>
                                            )}

                                            {card.card.country && (
                                                <div className="flex items-center justify-between group">
                                                    <span className="font-medium opacity-90 text-xs flex items-center">
                                                        <svg className="w-3 h-3 mr-1.5 text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                                        </svg>
                                                        From:
                                                    </span>
                                                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full group-hover:bg-white/30 transition-colors">
                                                        {card.card.country}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Decorative bottom border */}
                                        <div className="mt-3 pt-2 border-t border-white/20">
                                            <div className="flex justify-center space-x-1">
                                                <div className="w-1 h-1 bg-teal-300 rounded-full animate-pulse"></div>
                                                <div className="w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                                <div className="w-1 h-1 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom decorative strip */}
                        <div className="h-2 bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400"></div>
                    </div>
                </div>
            </div>
        );
    };

    // Auto-carousel for additional images
    useEffect(() => {
        if (obituaryData?.additionalImages && obituaryData.additionalImages.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) =>
                    (prevIndex + 1) % obituaryData.additionalImages.length
                );
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [obituaryData?.additionalImages]);

    // Navigation functions for carousel
    const nextImage = () => {
        if (obituaryData?.additionalImages) {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % obituaryData.additionalImages.length
            );
        }
    };

    const prevImage = () => {
        if (obituaryData?.additionalImages) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? obituaryData.additionalImages.length - 1 : prevIndex - 1
            );
        }
    };

    // Calculate age
    const calculateAge = (dateofBirth: string, dateofDeath: string) => {
        const birthDate = new Date(dateofBirth);
        const deathDate = dateofDeath ? new Date(dateofDeath) : new Date();
        let age = deathDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = deathDate.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && deathDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // Extract YouTube video ID
    const getYouTubeVideoId = (url: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    // Handle phone call functionality
    const handleRequestToContact = (phoneNumber?: string) => {
        // Get the first contact's phone number if no specific number provided
        const contactPhone = phoneNumber ||
            (obituaryData?.contactDetails && obituaryData.contactDetails.length > 0
                ? obituaryData.contactDetails[0].phoneNumber
                : null);

        if (contactPhone) {
            // Clean the phone number (remove spaces, dashes, etc.)
            const cleanedPhone = contactPhone.replace(/[^+\d]/g, '');
            window.location.href = `tel:${cleanedPhone}`;
        } else {
            // Fallback - could show an alert or handle no phone number case
            alert('No phone number available for contact.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">{t.loading}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-red-500">{t.error} {error}</div>
            </div>
        );
    }

    if (!obituaryData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">{t.obituaryNotFound}</div>
            </div>
        );
    }

    return (
        <div className='p-4 md:p-8 lg:px-16 bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]'>
            <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16 py-6 max-md:px-5">
                <Separator className="mb-5 w-full" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="bg-gray-100 md:p-10 p-4">
                            <div
                                className="bg-white w-full shadow-md"
                                style={{ backgroundColor: obituaryData.selectedBgColor?.colorCode || "#ffffff" }}
                            >
                                <div className="pt-4 pb-2 text-center max-w-lg mx-auto px-4">
                                    <h1 className="text-xl font-bold text-primary mb-6">
                                        {obituaryData.information.shortDescription || t.ourDeepestCondolences}
                                    </h1>

                                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
                                        <div className="text-gray-500 text-center flex md:flex-col">
                                            <p>{t.birth}<span className="md:hidden mr-1 ml-1">:</span></p>
                                            <p>{obituaryData.information.dateofBirth ? new Date(obituaryData.information.dateofBirth).toLocaleDateString() : t.birthDate}</p>
                                        </div>

                                        {obituaryData.primaryImage && (
                                            <div className="relative">
                                                {obituaryData.selectedPrimaryImageBgFrame?.frameImage ? (
                                                    <div className="relative flex items-center justify-center">
                                                        {/* Frame background - slightly larger */}
                                                        <div
                                                            className="w-44 sm:w-64 aspect-square bg-cover bg-center bg-no-repeat"
                                                            style={{
                                                                backgroundImage: `url(${obituaryData.selectedPrimaryImageBgFrame.frameImage})`,
                                                            }}
                                                        />
                                                        {/* Primary image - positioned absolutely inside frame */}
                                                        <img
                                                            alt="Primary memorial image"
                                                            className="absolute w-40 sm:w-60 aspect-square object-cover rounded shadow-md"
                                                            src={obituaryData.primaryImage}
                                                        />
                                                    </div>
                                                ) : (
                                                    <img
                                                        alt="Primary memorial image"
                                                        className="w-40 sm:w-60 shadow-md aspect-square object-cover mx-auto sm:mx-4 rounded"
                                                        src={obituaryData.primaryImage}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {!obituaryData.primaryImage && (
                                            <div className="w-40 sm:w-60 shadow-md aspect-square bg-gray-200 flex items-center justify-center mx-auto sm:mx-4">
                                                <p className="text-gray-500 text-sm">{t.noImageSelected}</p>
                                            </div>
                                        )}

                                        <div className="text-gray-500 text-center flex md:flex-col">
                                            <p>{t.death}<span className="md:hidden mr-1 ml-1">:</span></p>
                                            <p>{obituaryData.information.dateofDeath ? new Date(obituaryData.information.dateofDeath).toLocaleDateString() : t.deathDate}</p>
                                        </div>
                                    </div>

                                    <h1 className="text-xl font-bold text-secondary mb-6">
                                        {obituaryData.information.title || t.memorialTitle}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <p className="text-justify mt-4">
                            {obituaryData.information.description || t.noDescriptionProvided}
                        </p>

                        <div className="flex justify-end gap-2 items-center self-stretch mt-4">
                            <button className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                {t.postTribute}
                            </button>
                            <button
                                onClick={openModal}
                                className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]"
                            >
                                {t.donate}
                            </button>
                        </div>

                        <Separator className="mt-4 !w-full" />

                        {/* Tributes Section */}
                        {obituaryData.tributeItems && obituaryData.tributeItems.length > 0 && (
                            <div className="mt-8">
                                <div className="flex-shrink min-w-0 max-w-full mb-6">
                                    <TitleWithUnderline text={t.tributes} underlineWidth={64} fontSize={3} />
                                </div>

                                {/* Tab Navigation */}
                                <div className="flex border-b border-gray-200 mb-6">
                                    <button
                                        onClick={() => setActiveTab('messages')}
                                        className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'messages'
                                            ? 'border-primary text-primary bg-gray-50'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {t.messages}
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('cards')}
                                        className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'cards'
                                            ? 'border-primary text-primary bg-gray-50'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {t.cards}
                                    </button>
                                </div>

                                {/* Tab Content */}
                                {activeTab === 'messages' && (
                                    <div className="grid grid-cols-1 gap-4">
                                        {obituaryData.tributeItems
                                            .filter(tribute => tribute.tributeOptions === 'message' && !tribute.isDeleted)
                                            .map((tribute, index) => (
                                                <div
                                                    key={tribute._id}
                                                    className="bg-black text-white p-6 rounded-lg shadow-md"
                                                >
                                                    <div className="mb-4">
                                                        <p className="text-white leading-relaxed">
                                                            "{tribute.message.message}"
                                                        </p>
                                                    </div>
                                                    <div className="border-t border-gray-600 pt-4">
                                                        <p className="font-semibold text-white">
                                                            {tribute.message.name}
                                                        </p>
                                                        <p className="text-gray-300 text-sm">
                                                            {tribute.message.relationship}
                                                        </p>
                                                        <p className="text-gray-400 text-xs mt-1">
                                                            {tribute.message.country}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}

                                {activeTab === 'cards' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {obituaryData.tributeItems
                                            .filter(tribute => tribute.tributeOptions === 'card' && !tribute.isDeleted)
                                            .map((tribute, index) => (
                                                <div key={tribute._id}>
                                                    <CardPreview card={tribute.card} />
                                                </div>
                                            ))}
                                        {obituaryData.tributeItems.filter(tribute => tribute.tributeOptions === 'card' && !tribute.isDeleted).length === 0 && (
                                            <div className="col-span-full bg-gray-100 p-6 rounded-lg shadow-md text-center text-gray-500">
                                                No tribute cards available
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* YouTube Video and Additional Images Section */}
                        {(obituaryData.information.tributeVideo || (obituaryData.additionalImages && obituaryData.additionalImages.length > 0)) && (
                            <div className="mt-8">
                                <div className="flex-shrink min-w-0 max-w-full mb-6">
                                    <TitleWithUnderline text={t.mediaGallery} underlineWidth={64} fontSize={3} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* YouTube Video Section */}
                                    {obituaryData.information.tributeVideo && (
                                        <div className={`${!obituaryData.additionalImages || obituaryData.additionalImages.length === 0 ? 'md:col-span-2 flex justify-center' : ''}`}>
                                            <div className="bg-white p-4 shadow-md">
                                                <h3 className="text-lg font-semibold mb-4 text-center">{t.tributeVideo}</h3>
                                                <div className="aspect-video w-full">
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(obituaryData.information.tributeVideo)}`}
                                                        title="Tribute Video"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        className="rounded"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Additional Images Carousel Section */}
                                    {obituaryData.additionalImages && obituaryData.additionalImages.length > 0 && (
                                        <div className={`${!obituaryData.information.tributeVideo ? 'md:col-span-2 flex justify-center' : ''}`}>
                                            <div className="bg-white p-4 shadow-md w-full">
                                                <h3 className="text-lg font-semibold mb-4 text-center">{t.slideshowImages}</h3>
                                                <div className="relative">
                                                    <div className="w-full relative aspect-video">
                                                        <img
                                                            src={obituaryData.additionalImages[currentImageIndex]}
                                                            alt={`Additional image ${currentImageIndex + 1}`}
                                                            className="w-full h-full object-cover rounded shadow-md"
                                                        />

                                                        {/* Navigation arrows - only show if multiple images */}
                                                        {obituaryData.additionalImages.length > 1 && (
                                                            <>
                                                                <button
                                                                    onClick={prevImage}
                                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                                                                    type="button"
                                                                >
                                                                    <ChevronLeft className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={nextImage}
                                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                                                                    type="button"
                                                                >
                                                                    <ChevronRight className="w-4 h-4" />
                                                                </button>
                                                            </>
                                                        )}

                                                        {/* Image counter */}
                                                        {obituaryData.additionalImages.length > 1 && (
                                                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                                                                {currentImageIndex + 1} / {obituaryData.additionalImages.length}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Contacts Section */}
                        <div className="mt-8">
                            <div className="flex-shrink min-w-0 max-w-full">
                                <TitleWithUnderline text={t.contacts} underlineWidth={64} fontSize={3} />
                            </div>
                            {obituaryData.contactDetails && obituaryData.contactDetails.length > 0 ? (
                                obituaryData.contactDetails.map((contact: any, index: number) => (
                                    <div key={index} className="bg-white p-6 shadow-md mb-4 flex md:flex-row flex-col justify-between md:items-center">
                                        <div>
                                            <p className="text-[#880002]">{contact.name}</p>
                                            <p>{contact.address}</p>
                                            <p>{contact.phoneNumber}</p>
                                            <p>{contact.email}</p>
                                            <p>{contact.relationship}</p>
                                        </div>
                                        <button
                                            onClick={() => handleRequestToContact(contact.phoneNumber)}
                                            className="mb-0 gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]"
                                        >
                                            {t.requestToContact}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white p-6 shadow-md mb-4">
                                    <p className="text-gray-500 text-center">{t.noContactInformation}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right side sidebar - 1/3 width on desktop */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-2 shadow-md">
                            {/* Overview Section */}
                            <div className="flex-shrink min-w-0 max-w-full mt-2">
                                <TitleWithUnderline text={t.overview} underlineWidth={64} fontSize={3} />
                            </div>
                            <div className="space-y-2 mt-2 p-2">
                                <p className="text-gray-500">{t.name} {obituaryData.information.title || t.notProvided}</p>
                                <p className="text-gray-500">{t.birthDateLabel} {obituaryData.information.dateofBirth ? new Date(obituaryData.information.dateofBirth).toLocaleDateString() : t.notProvided}</p>
                                <p className="text-gray-500">{t.deathDateLabel} {obituaryData.information.dateofDeath ? new Date(obituaryData.information.dateofDeath).toLocaleDateString() : t.notProvided}</p>
                                <p className="text-gray-500">{t.age} {obituaryData.information.dateofBirth && obituaryData.information.dateofDeath ? calculateAge(obituaryData.information.dateofBirth, obituaryData.information.dateofDeath) : t.notProvided}</p>
                                <p>{t.address} {obituaryData.information.address || t.notProvided}</p>
                            </div>

                            <Separator className="mt-6 !w-full mb-8" />

                            {/* Poster's Information Section */}
                            <div className="flex-shrink min-w-0 max-w-full mt-4">
                                <TitleWithUnderline text={t.postersInformation} underlineWidth={64} fontSize={3} />
                            </div>
                            <div className="space-y-2 mt-2 p-2">
                                <p className="text-[#880002]">
                                    {obituaryData.contactDetails && obituaryData.contactDetails.length > 0
                                        ? obituaryData.contactDetails[0].name
                                        : obituaryData.username || t.nameNotProvided}
                                </p>
                                <p>
                                    {obituaryData.contactDetails && obituaryData.contactDetails.length > 0
                                        ? obituaryData.contactDetails[0].address || t.addressNotProvided
                                        : t.addressNotProvided}
                                </p>
                                <p>
                                    {obituaryData.contactDetails && obituaryData.contactDetails.length > 0
                                        ? obituaryData.contactDetails[0].email || t.emailNotProvided
                                        : obituaryData.username || t.emailNotProvided}
                                </p>
                                <p>
                                    {obituaryData.contactDetails && obituaryData.contactDetails.length > 0
                                        ? obituaryData.contactDetails[0].phoneNumber || t.phoneNotProvided
                                        : t.phoneNotProvided}
                                </p>
                            </div>

                            <button
                                onClick={() => handleRequestToContact()}
                                className="w-full gap-2.5 self-stretch px-4 py-3 my-auto mt-4 text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]"
                            >
                                {t.requestToContact}
                            </button>

                            <Separator className="mt-8 !w-full mb-4" />

                            {/* Pictures Section */}
                            <div className="flex-shrink min-w-0 max-w-full mt-8 mb-6">
                                <TitleWithUnderline text={t.pictures} underlineWidth={64} fontSize={3} />
                            </div>
                            <div className="p-2">
                                <div className="bg-white p-2 shadow-md">
                                    {(obituaryData.thumbnailImage || obituaryData.primaryImage) ? (
                                        <div className="grid grid-cols-2 gap-2 pb-4">
                                            {obituaryData.thumbnailImage && (
                                                <img
                                                    alt="Thumbnail image"
                                                    className="w-full shadow-md aspect-square object-cover"
                                                    src={obituaryData.thumbnailImage}
                                                />
                                            )}
                                            {obituaryData.primaryImage && (
                                                <img
                                                    alt="Primary image"
                                                    className="w-full shadow-md aspect-square object-cover"
                                                    src={obituaryData.primaryImage}
                                                />
                                            )}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-gray-500">
                                            {t.noImagesUploaded}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => handleRequestToContact()}
                                className="w-full gap-2.5 self-stretch px-4 py-3 my-auto mt-4 text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]"
                            >
                                {t.requestToContact}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* DonateModal */}
            {isModalOpen && obituaryData && (
                <DonateModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    obituaryEntry={{
                        _id: obituaryData._id,
                        title: obituaryData.information.title,
                        name: obituaryData.information.title,
                        date: obituaryData.information.dateofDeath ? new Date(obituaryData.information.dateofDeath).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        }) : '',
                        address: obituaryData.information.address,
                        imageUrl: obituaryData.primaryImage || obituaryData.thumbnailImage || "/images/tribute.jpg",
                        condolences: obituaryData.tributeItems ? obituaryData.tributeItems.length : 0,
                    }}
                />
            )}
        </div>
    );
};

export default ObituaryDetail;
