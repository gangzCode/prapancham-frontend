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
    isDonationReceivable?: boolean;
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

    // Function to check if donations are enabled for this memorial
    const isDonationEnabled = (): boolean => {
        return obituaryData?.isDonationReceivable === true;
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
                                        className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 font-semibold"
                                        onClick={() => setShowSharePopup(!showSharePopup)}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                        </svg>
                                        Share Memorial
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
                            {isDonationEnabled() && (
                                <button
                                    onClick={() => setIsModalOpen(true)}
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
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                    onClick={() => setShowSharePopup(false)}
                >
                    <div 
                        className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">Share Memorial</h2>
                                    <p className="text-teal-100 text-sm opacity-90">Honor their memory by sharing</p>
                                </div>
                                <button
                                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                                    onClick={() => setShowSharePopup(false)}
                                    aria-label="Close"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {/* Facebook */}
                                <button
                                    className="group flex flex-col items-center p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
                                    onClick={() => handleShare('facebook')}
                                >
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-700 transition-colors">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Facebook</span>
                                </button>

                                {/* WhatsApp */}
                                <button
                                    className="group flex flex-col items-center p-4 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all duration-200 transform hover:scale-105"
                                    onClick={() => handleShare('whatsapp')}
                                >
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2 group-hover:bg-green-600 transition-colors">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488"/>
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">WhatsApp</span>
                                </button>

                                {/* Instagram */}
                                <button
                                    className="group flex flex-col items-center p-4 rounded-xl border-2 border-gray-100 hover:border-pink-200 hover:bg-pink-50 transition-all duration-200 transform hover:scale-105"
                                    onClick={() => handleShare('instagram')}
                                >
                                    <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center mb-2 group-hover:from-yellow-500 group-hover:via-red-600 group-hover:to-purple-600 transition-all">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-pink-700">Instagram</span>
                                </button>

                                {/* Copy Link */}
                                <button
                                    className="group flex flex-col items-center p-4 rounded-xl border-2 border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
                                    onClick={async () => {
                                        try {
                                            await navigator.clipboard.writeText(currentUrl);
                                            // Show success feedback
                                            const button = event?.currentTarget as HTMLButtonElement;
                                            const originalText = button.querySelector('span')?.textContent;
                                            const span = button.querySelector('span');
                                            if (span) {
                                                span.textContent = 'Copied!';
                                                span.className = 'text-sm font-medium text-green-600';
                                                setTimeout(() => {
                                                    span.textContent = originalText || 'Copy Link';
                                                    span.className = 'text-sm font-medium text-gray-700 group-hover:text-gray-800';
                                                }, 2000);
                                            }
                                        } catch {
                                            alert('Failed to copy link.');
                                        }
                                    }}
                                >
                                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-gray-700 transition-colors">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800">Copy Link</span>
                                </button>
                            </div>

                            {/* Memorial Info */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <div className="flex items-center space-x-3">
                                    {obituaryData?.primaryImage && (
                                        <img 
                                            src={obituaryData.primaryImage} 
                                            alt="Memorial" 
                                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                                            {obituaryData?.information?.title || 'Memorial'}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            Share this beautiful memorial with family and friends
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ObituaryDetail;
