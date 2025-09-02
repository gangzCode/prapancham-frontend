"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import DonateModal from '@/components/obituary/DonateModal';
import type { ObituaryEntry } from '@/components/hero/types';
import { useLanguage } from '@/components/ui/LanguageProvider';
import TributeModal from "@/components/obituary/TributeModal";

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
        letters: "Letters",
        memories: "Memories",
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
        noImageSelected: "No image selected",
        share: "Social Share",
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
        letters: "கடிதங்கள்",
        memories: "நினைவுகள்",
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
        noImageSelected: "படம் தேர்ந்தெடுக்கப்படவில்லை",
        share: "சமூக பகிர்வு",
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
        letters: "ලිපි",
        memories: "මතකයන්",
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
        noImageSelected: "පින්තූරයක් තෝරා නැත",
        share: "සමාජ බෙදාහැරීම",
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
    const [isTributeModalOpen, setIsTributeModalOpen] = useState(false);
    const [error, setError] = useState<string>("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'messages' | 'cards' | 'letters' | 'memories'>('messages');
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
    const [tributeTemplateLetters, setTributeTemplateLetters] = useState<{
        tributeLetterTemplate: [
            {
                _id: string;
                name: string;
                image: string;
            }
        ],
        pagination: {}
    }>({
        tributeLetterTemplate: [
            {
                _id: "",
                name: "",
                image: ""
            }
        ],
        pagination: {}
    });

    const [showSharePopup, setShowSharePopup] = useState(false);

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleShare = (platform: 'facebook' | 'whatsapp' | 'instagram') => {
        let shareUrl = '';
        const pageTitle = obituaryData?.information?.title || document.title || '';
        const encodedUrl = encodeURIComponent(currentUrl);
        const encodedTitle = encodeURIComponent(pageTitle);

        if (platform === 'facebook') {
            // Facebook share dialog with title and url
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;
        } else if (platform === 'whatsapp') {
            // WhatsApp message with title and url
            const message = `Check out this memorial: ${pageTitle} - ${currentUrl}`;
            shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        } else if (platform === 'instagram') {
            // Instagram does not support direct web sharing
            shareUrl = `https://www.instagram.com/`;
        } else {
            alert('Sharing to this platform is not supported.');
            return;
        }
        window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
    };

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

    // Fetch tribute template letters
    useEffect(() => {
        const fetchTributeTemplateLetters = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tribute-items/letter-template/active?page=1&limit=10`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTributeTemplateLetters(data);
            } catch (err) {
                console.error('Error fetching tribute template letters:', err);
            }
        };

        fetchTributeTemplateLetters();
    }, []);

    const getSelectedTemplate = (
        selectedCardTemplate: string
    ) => {
        return tributeTemplateCards.tributeCardTemplate.find(template => template._id === selectedCardTemplate);
    };

    const getSelectedLetterTemplate = (
        selectedLetterTemplate: string
    ) => {
        return tributeTemplateLetters.tributeLetterTemplate.find(template => template._id === selectedLetterTemplate);
    };

    const CardPreview = (
        card: any
    ) => {
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

    const LetterPreview = (
        letter: any
    ) => {
        const selectedTemplate = getSelectedLetterTemplate(letter.letter.letterTemplate);

        if (!selectedTemplate) {
            return (
                <div className="max-w-2xl mx-auto relative">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-12 text-center border-2 border-dashed border-amber-200">
                        <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-amber-700 font-medium text-lg">Select a template to preview your letter</p>
                        <p className="text-amber-600 text-sm mt-2">Your beautifully crafted letter will appear here</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="max-w-2xl mx-auto">
                <div className="relative">
                    {/* Paper shadow layers */}
                    <div className="absolute -inset-2 bg-gray-400 rounded-lg transform rotate-1 opacity-20"></div>
                    <div className="absolute -inset-1 bg-gray-300 rounded-lg transform -rotate-1 opacity-30"></div>

                    {/* Main letter paper with template background */}
                    <div className="relative rounded-lg shadow-2xl overflow-hidden border border-white/20">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={selectedTemplate.image || '/default-letter-template.jpg'}
                                alt={selectedTemplate.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Paper-like overlay */}
                            <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
                        </div>

                        {/* Letter header with decorative border */}
                        <div className="relative border-b-2 border-amber-300 bg-white/60 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-amber-900 font-serif text-xl font-bold">Personal Letter</h2>
                                </div>
                                <div className="text-amber-700 text-sm font-medium">
                                    {new Date().toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Letter content */}
                        <div className="relative p-8">
                            {/* Greeting */}
                            <div className="mb-6">
                                <p className="text-amber-900 font-serif text-lg">Dear {obituaryData?.information.title || 'Friend'},</p>
                            </div>

                            {/* Message body */}
                            {letter.letter.message && (
                                <div className="mb-8">
                                    <div className="text-amber-900 font-serif text-base leading-relaxed space-y-4">
                                        {letter.letter.message.split('\n').map((paragraph: string, index: number) => (
                                            <p key={index} className="indent-8 text-justify">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Letter closing */}
                            <div className="text-right">
                                <p className="text-amber-900 font-serif text-base mb-2">From,</p>
                                <div>
                                    <div className="w-40 h-12 ml-auto border-b-2 border-amber-300 flex items-end justify-center pb-2">
                                        <p className="text-amber-700 font-serif italic text-sm">
                                            {letter.letter.name || 'Your signature'}
                                        </p>
                                    </div>
                                    <p className="text-amber-700 font-serif text-sm mt-1">
                                        {letter.letter.relationship || 'Your relationship'}
                                    </p>
                                    <p className="text-amber-700 font-serif text-sm">
                                        {letter.letter.country || 'Your country'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Vintage postmark */}
                        <div className="absolute top-4 right-4 w-20 h-20 border-2 border-amber-600 rounded-full flex items-center justify-center transform -rotate-12 bg-white/60 backdrop-blur-sm opacity-80">
                            <div className="text-center">
                                <p className="text-amber-800 text-xs font-bold">SENT</p>
                                <p className="text-amber-700 text-xs">{new Date().getFullYear()}</p>
                            </div>
                        </div>
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

    // Function to calculate time ago from createdAt
    const calculateTimeAgo = (createdAt: string): string => {
        const now = new Date();
        const created = new Date(createdAt);
        const diffInMilliseconds = now.getTime() - created.getTime();
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays > 0) {
            return `${diffInDays} ${diffInDays > 1 ? 'days' : 'day'} ago`;
        } else if (diffInHours > 0) {
            return `${diffInHours} ${diffInHours > 1 ? 'days' : 'day'} ago`;
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes} ${diffInMinutes > 1 ? 'minutes' : 'minute'} ago`;
        } else {
            return 'just now';
        }
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

    // Function to check if account details are valid for donation
    const hasValidAccountDetails = (accountDetails: any): boolean => {
        if (!accountDetails) return false;
        
        return !!(
            accountDetails.bankName?.trim() &&
            accountDetails.branchName?.trim() &&
            accountDetails.accountNumber &&
            accountDetails.accountHolderName?.trim()
        );
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
                        <div className="md:p-10 p-4" style={{ backgroundColor: obituaryData.selectedBgColor?.colorCode || "#ffffff" }}>
                            <div className="bg-black w-full shadow-md flex justify-center">
                                <div className="pt-4 pb-2 text-center w-full max-w-5xl px-4">
                                    <div className="w-full flex justify-center">
                                        <h1 className="text-2xl md:text-3xl font-serif font-light text-white mb-8 leading-relaxed tracking-wide text-center max-w-3xl">
                                            {obituaryData.information.shortDescription || t.ourDeepestCondolences}
                                        </h1>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-center items-center mb-6 gap-8 sm:gap-12 w-full">
                                        <div className="text-white text-center flex flex-col items-center">
                                            <p className="text-sm uppercase tracking-wider text-white font-sans">
                                                {t.birth}</p>
                                            <p className="text-lg font-serif text-white mt-1">
                                                {obituaryData.information.dateofBirth ? new Date(obituaryData.information.dateofBirth).toLocaleDateString() : t.birthDate}</p>
                                        </div>

                                        {obituaryData.primaryImage && (
                                            <div className="relative flex justify-center">
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
                                                        className="w-40 sm:w-60 shadow-md aspect-square object-cover rounded"
                                                        src={obituaryData.primaryImage}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {!obituaryData.primaryImage && (
                                            <div className="w-40 sm:w-60 shadow-md aspect-square bg-gray-200 flex items-center justify-center">
                                                <p className="text-white text-sm">{t.noImageSelected}</p>
                                            </div>
                                        )}

                                        <div className="text-white text-center flex flex-col items-center">
                                            <p className="text-sm uppercase tracking-wider text-white font-sans">
                                                {t.death}</p>
                                            <p className="text-lg font-serif text-white mt-1">
                                                {obituaryData.information.dateofDeath ? new Date(obituaryData.information.dateofDeath).toLocaleDateString() : t.deathDate}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="w-full flex justify-center">
                                        <h1 className="text-3xl md:text-4xl font-serif font-normal text-white mb-8 leading-tight text-center max-w-4xl">
                                            {obituaryData.information.title || t.memorialTitle}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-justify mt-4">
                            {obituaryData.information.description || t.noDescriptionProvided}
                        </p>

                        <div className="flex justify-end gap-2 items-center self-stretch mt-4">
                            {
                                obituaryData.selectedPackage.isSocialSharing && (
                                    <button
                                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]"
                                        onClick={() => setShowSharePopup(!showSharePopup)}
                                    >
                                        📢 {t.share}
                                    </button>
                                )
                            }
                            <button
                                className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]"
                                onClick={() =>
                                    setIsTributeModalOpen(true)
                                }
                            >

                                🕯️ {t.postTribute}
                            </button>
                            {hasValidAccountDetails(obituaryData.accountDetails) && (
                                <button
                                    onClick={openModal}
                                    className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]"
                                >
                                    💝 {t.donate}
                                </button>
                            )}
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
                                    <button
                                        onClick={() => setActiveTab('letters')}
                                        className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'letters'
                                            ? 'border-primary text-primary bg-gray-50'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {t.letters}
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('memories')}
                                        className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'memories'
                                            ? 'border-primary text-primary bg-gray-50'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {t.memories || 'Memories'}
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

                                {activeTab === 'letters' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {obituaryData.tributeItems
                                            .filter(tribute => tribute.tributeOptions === 'letter' && !tribute.isDeleted)
                                            .map((tribute, index) => (
                                                <div key={tribute._id}>
                                                    <LetterPreview letter={tribute.letter} />
                                                </div>
                                            ))}
                                        {obituaryData.tributeItems.filter(tribute => tribute.tributeOptions === 'letter' && !tribute.isDeleted).length === 0 && (
                                            <div className="col-span-full bg-gray-100 p-6 rounded-lg shadow-md text-center text-gray-500">
                                                No tribute letters available
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'memories' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {obituaryData.tributeItems
                                            .filter(tribute => tribute.tributeOptions === 'memory' && !tribute.isDeleted)
                                            .map((tribute, index) => (
                                                <div
                                                    key={tribute._id}
                                                    className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                                >
                                                    {/* Memory Image */}
                                                    {tribute.memory.images && (
                                                        <div className="relative h-48 overflow-hidden">
                                                            <img
                                                                src={tribute.memory.images}
                                                                alt="Memory"
                                                                className="w-full h-full object-cover"
                                                            />
                                                            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                                                                Memory
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Memory Content */}
                                                    <div className="p-4">
                                                        {/* Message */}
                                                        {tribute.memory.message && (
                                                            <div className="mb-4">
                                                                <p className="text-gray-800 leading-relaxed italic">
                                                                    "{tribute.memory.message}"
                                                                </p>
                                                            </div>
                                                        )}
                                                        
                                                        {/* Author Info */}
                                                        <div className="border-t border-gray-200 pt-4 space-y-1">
                                                            <p className="font-semibold text-gray-900">
                                                                {tribute.memory.name}
                                                            </p>
                                                            <p className="text-gray-600 text-sm">
                                                                {tribute.memory.relationship}
                                                            </p>
                                                            <p className="text-gray-500 text-xs">
                                                                {tribute.memory.country}
                                                            </p>
                                                            {tribute.memory.finalPriceInCAD && tribute.memory.finalPriceInCAD.price && (
                                                                <p className="text-teal-600 text-sm font-medium">
                                                                    Donation: ${tribute.memory.finalPriceInCAD.price} {tribute.memory.finalPriceInCAD.currencyCode}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        {obituaryData.tributeItems.filter(tribute => tribute.tributeOptions === 'memory' && !tribute.isDeleted).length === 0 && (
                                            <div className="col-span-full bg-gray-100 p-6 rounded-lg shadow-md text-center text-gray-500">
                                                No memories available
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
                                    {obituaryData.selectedPackage.isSlideShow && obituaryData.additionalImages && obituaryData.additionalImages.length > 0 && (
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
                                    {obituaryData.additionalImages && obituaryData.additionalImages.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-2 pb-4">
                                            {obituaryData.additionalImages.map((imgUrl: string, idx: number) => (
                                                <img
                                                    key={idx}
                                                    alt={`Additional image ${idx + 1}`}
                                                    className="w-full shadow-md aspect-square object-cover"
                                                    src={imgUrl}
                                                />
                                            ))}
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

            <TributeModal
                isOpen={isTributeModalOpen}
                onClose={() => setIsTributeModalOpen(false)}
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
                    imageUrl: obituaryData.thumbnailImage || obituaryData.primaryImage || "/images/tribute.jpg",
                    condolences: obituaryData.tributeItems ? obituaryData.tributeItems.length : 0,
                }}
                timeAgo={obituaryData.createdAt ? calculateTimeAgo(obituaryData.createdAt) : ''}
                imageUrl={obituaryData.thumbnailImage || obituaryData.primaryImage || "/images/tribute.jpg"}
                ceremonyTitle={obituaryData.information.title}
                eventName={obituaryData.information.title}
                date={obituaryData.information.dateofDeath ? new Date(obituaryData.information.dateofDeath).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                }) : ''}
            />

            {showSharePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
                            onClick={() => setShowSharePopup(false)}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h2 className="text-lg font-semibold mb-4 text-center">{t.share}</h2>
                        <div className="flex flex-col gap-3">
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                                onClick={() => handleShare('facebook')}
                            >
                                <span>
                                    {/* Facebook SVG */}
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
                                        <path d="M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z M 25 5 C 36.057562 5 45 13.942438 45 25 C 45 34.729791 38.035799 42.731796 28.84375 44.533203 L 28.84375 31.564453 L 34.136719 31.564453 L 35.298828 24.044922 L 28.84375 24.044922 L 28.84375 22.027344 C 28.84375 20.989871 29.033574 20.060293 29.353516 19.501953 C 29.673457 18.943614 29.981865 18.701172 30.738281 18.701172 L 35.185547 18.701172 L 35.185547 12.009766 L 34.318359 11.892578 C 33.718567 11.811418 32.349197 11.621094 29.878906 11.621094 C 27.175808 11.621094 24.855567 12.357448 23.253906 14.023438 C 21.652246 15.689426 20.861328 18.170128 20.861328 21.373047 L 20.861328 24.046875 L 15.664062 24.046875 L 15.664062 31.566406 L 20.861328 31.566406 L 20.861328 44.470703 C 11.816995 42.554813 5 34.624447 5 25 C 5 13.942438 13.942438 5 25 5 z"></path>
                                    </svg>
                                </span> Facebook
                            </button>
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
                                onClick={() => handleShare('whatsapp')}
                            >
                                <span>
                                    {/* WhatsApp SVG */}
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
                                        <path d="M 25 2 C 12.3 2 2 12.3 2 25 C 2 29.1 3.1 32.899219 5 36.199219 L 2 46.699219 C 1.9 46.999219 1.9992187 47.399219 2.1992188 47.699219 C 2.4992187 47.999219 2.8992187 48 3.1992188 48 L 14.199219 45.300781 C 17.399219 47.000781 21.1 48 25 48 C 37.7 48 48 37.7 48 25 C 48 12.3 37.7 2 25 2 z M 25 4 C 36.6 4 46 13.4 46 25 C 46 36.6 36.6 46 25 46 C 21.3 46 17.800781 45.000781 14.800781 43.300781 C 14.600781 43.200781 14.299609 43.099219 14.099609 43.199219 L 4.5 45.599609 L 7 36.400391 C 7.1 36.100391 7.0003906 35.899609 6.9003906 35.599609 C 5.1003906 32.499609 4 28.9 4 25 C 4 13.4 13.4 4 25 4 z M 18.113281 12.988281 C 17.925781 12.975781 17.800781 13 17.800781 13 L 16.599609 13 C 15.999609 13 15.100781 13.2 14.300781 14 C 13.800781 14.5 12 16.3 12 19.5 C 12 22.9 14.299609 25.799609 14.599609 26.099609 C 14.599609 26.099609 15 26.600781 15.5 27.300781 C 16 28.000781 16.699609 28.800781 17.599609 29.800781 C 19.399609 31.700781 21.899609 33.899219 25.099609 35.199219 C 26.499609 35.799219 27.699609 36.2 28.599609 36.5 C 30.199609 37 31.700781 36.900781 32.800781 36.800781 C 33.600781 36.700781 34.500391 36.299219 35.400391 35.699219 C 36.300391 35.099219 37.199609 34.400391 37.599609 33.400391 C 37.899609 32.600391 37.999609 31.900781 38.099609 31.300781 L 38.099609 30.5 C 38.099609 30.2 38.000781 30.200781 37.800781 29.800781 C 37.300781 29.000781 36.799219 29.000781 36.199219 28.800781 C 35.899219 28.600781 34.999219 28.200781 34.199219 27.800781 C 33.299219 27.400781 32.599609 27.000781 32.099609 26.800781 C 31.799609 26.700781 31.400391 26.499609 30.900391 26.599609 C 30.400391 26.699609 29.899609 27 29.599609 27.5 C 29.299609 27.9 28.200781 29.299219 27.800781 29.699219 L 27.699219 29.599609 C 27.299219 29.399609 26.7 29.200781 26 28.800781 C 25.2 28.400781 24.299219 27.800781 23.199219 26.800781 C 21.599219 25.400781 20.499219 23.699609 20.199219 23.099609 C 20.499219 22.699609 20.899609 22.3 21.099609 22 C 21.199609 21.9 21.280859 21.799219 21.349609 21.699219 C 21.418359 21.599219 21.475391 21.500391 21.525391 21.400391 C 21.625391 21.200391 21.700781 21.000781 21.800781 20.800781 C 22.200781 20.100781 22.000781 19.300391 21.800781 18.900391 C 21.800781 18.900391 21.7 18.600781 21.5 18.300781 C 21.4 18.000781 21.2 17.499609 21 17.099609 C 20.6 16.199609 20.2 15.199609 20 14.599609 C 19.7 13.899609 19.300781 13.399219 18.800781 13.199219 C 18.550781 13.049219 18.300781 13.000781 18.113281 12.988281 z M 16.599609 15 L 17.699219 15 L 17.900391 15 C 17.900391 15 17.999609 15.100391 18.099609 15.400391 C 18.299609 16.000391 18.799609 17.000391 19.099609 17.900391 C 19.299609 18.300391 19.499609 18.799609 19.599609 19.099609 C 19.699609 19.399609 19.800391 19.600781 19.900391 19.800781 C 19.900391 19.900781 20 19.900391 20 19.900391 C 19.8 20.300391 19.8 20.399219 19.5 20.699219 C 19.2 21.099219 18.799219 21.499219 18.699219 21.699219 C 18.599219 21.899219 18.299609 22.1 18.099609 22.5 C 17.899609 22.9 18.000781 23.599609 18.300781 24.099609 C 18.700781 24.699609 19.900781 26.700391 21.800781 28.400391 C 23.000781 29.500391 24.1 30.199609 25 30.599609 C 25.9 31.099609 26.600781 31.300391 26.800781 31.400391 C 27.200781 31.600391 27.599609 31.699219 28.099609 31.699219 C 28.599609 31.699219 29.000781 31.3 29.300781 31 C 29.700781 30.6 30.699219 29.399609 31.199219 28.599609 L 31.400391 28.699219 C 31.400391 28.699219 31.699609 28.8 32.099609 29 C 32.499609 29.2 32.900391 29.399609 33.400391 29.599609 C 34.300391 29.999609 35.100391 30.399609 35.400391 30.599609 L 36 30.900391 L 36 31.199219 C 36 31.599219 35.899219 32.200781 35.699219 32.800781 C 35.599219 33.100781 35.000391 33.699609 34.400391 34.099609 C 33.700391 34.499609 32.899609 34.800391 32.599609 34.900391 C 31.699609 35.000391 30.600781 35.099219 29.300781 34.699219 C 28.500781 34.399219 27.4 34.1 26 33.5 C 23.2 32.3 20.899219 30.3 19.199219 28.5 C 18.399219 27.6 17.699219 26.799219 17.199219 26.199219 C 16.699219 25.599219 16.500781 25.2 16.300781 25 C 15.900781 24.6 14 21.999609 14 19.599609 C 14 17.099609 15.200781 16.100391 15.800781 15.400391 C 16.100781 15.000391 16.499609 15 16.599609 15 z"></path>
                                    </svg>
                                </span> WhatsApp
                            </button>
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 rounded bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white hover:opacity-90 transition"
                                onClick={() => handleShare('instagram')}
                            >
                                <span>
                                    {/* Instagram SVG */}
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
                                        <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                                    </svg>
                                </span> Instagram
                            </button>
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                                onClick={async () => {
                                    try {
                                        await navigator.clipboard.writeText(currentUrl);
                                        alert('Link copied to clipboard!');
                                    } catch {
                                        alert('Failed to copy link.');
                                    }
                                }}
                            >
                                <span>🔗</span> Copy Link
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ObituaryDetail;
