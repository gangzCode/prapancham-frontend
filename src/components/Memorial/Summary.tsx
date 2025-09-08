"use client";
import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Separator } from '../ui/separator';
import StripePaymentMemorial, { useStripePaymentModal } from './StripePaymentMemorial';
import { add } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/components/ui/LanguageProvider';
interface SummaryProps {
    selectedPlan: any;
    profile: any;
    language: string;
    selectedAddon?: any;
    selectedCountryId: string;
    informationFormData?: any;
    contactData?: any;
    thumbnailImage?: File | null;
    primaryImage?: File | null;
    frameData?: any;
    additionalImagesData?: File[];
    donationReceivableData?: boolean;
    setActiveStep: (step: number) => void;
}

const translations = {
    english: {
        overview: "Overview",
        name: "Name:",
        birthDateLabel: "Birth Date:",
        deathDateLabel: "Date of Passing:",
        age: "Age:",
        address: "Funeral House Address:",
        notProvided: "Not provided",
        postersInformation: "Poster's Information",
        posterName: "Name:",
        posterAddress: "Address:",
        posterEmail: "Email:",
        posterPhone: "Phone:",
        contacts: "Contacts",
        contactName: "Name:",
        contactAddress: "Address:",
        contactPhone: "Phone:",
        contactEmail: "Email:",
        contactRelationship: "Relationship:",
        requestToContact: "Request to Contact",
        noContactInformation: "No contact information provided.",
        donationStatus: "Donation Status",
        donationsEnabled: "Donations enabled for this memorial",
        donationsNotEnabled: "Donations not enabled for this memorial",
        pictures: "Pictures",
        noImagesUploaded: "No images uploaded",
        nameNotProvided: "Name not provided",
        addressNotProvided: "Address not provided",
        emailNotProvided: "Email not provided",
        phoneNotProvided: "Phone not provided"
    },
    tamil: {
        overview: "கண்ணோட்டம்",
        name: "பெயர்:",
        birthDateLabel: "பிறந்த தேதி:",
        deathDateLabel: "மறைவு தேதி:",
        age: "வயது:",
        address: "இறுதிச் சடங்கு இல்லத்தின் முகவரி:",
        notProvided: "வழங்கப்படவில்லை",
        postersInformation: "போஸ்டரின் தகவல்கள்",
        posterName: "பெயர்:",
        posterAddress: "முகவரி:",
        posterEmail: "மின்னஞ்சல்:",
        posterPhone: "தொலைபேசி:",
        contacts: "தொடர்புகள்",
        contactName: "பெயர்:",
        contactAddress: "முகவரி:",
        contactPhone: "தொலைபேசி:",
        contactEmail: "மின்னஞ்சல்:",
        contactRelationship: "உறவு:",
        requestToContact: "தொடர்பு கோரிக்கை",
        noContactInformation: "தொடர்பு தகவல்கள் வழங்கப்படவில்லை.",
        donationStatus: "நன்கொடை நிலை",
        donationsEnabled: "இந்த நினைவகத்திற்கு நன்கொடைகள் இயக்கப்பட்டுள்ளன",
        donationsNotEnabled: "இந்த நினைவகத்திற்கு நன்கொடைகள் இயக்கப்படவில்லை",
        pictures: "படங்கள்",
        noImagesUploaded: "படங்கள் பதிவேற்றப்படவில்லை",
        nameNotProvided: "பெயர் வழங்கப்படவில்லை",
        addressNotProvided: "முகவரி வழங்கப்படவில்லை",
        emailNotProvided: "மின்னஞ்சல் வழங்கப்படவில்லை",
        phoneNotProvided: "தொலைபேசி வழங்கப்படவில்லை"
    },
    sinhala: {
        overview: "දළ විශ්ලේෂණය",
        name: "නම:",
        birthDateLabel: "උපන් දිනය:",
        deathDateLabel: "මරණ දිනය:",
        age: "වයස:",
        address: "අවමංගල්‍ය ගෘහ ලිපිනය:",
        notProvided: "ලබා දී නැත",
        postersInformation: "පෝස්ටරගේ තොරතුරු",
        posterName: "නම:",
        posterAddress: "ලිපිනය:",
        posterEmail: "ඊ-මේල්:",
        posterPhone: "දුරකථනය:",
        contacts: "සම්බන්ධතා",
        contactName: "නම:",
        contactAddress: "ලිපිනය:",
        contactPhone: "දුරකථනය:",
        contactEmail: "ඊ-මේල්:",
        contactRelationship: "සම්බන්ධතාවය:",
        requestToContact: "සම්බන්ධ වීමට ඉල්ලීම",
        noContactInformation: "සම්බන්ධතා තොරතුරු ලබා දී නැත.",
        donationStatus: "දන්දීම් තත්ත්වය",
        donationsEnabled: "මෙම ස්මාරකය සඳහා දන්දීම් සක්‍රීය කර ඇත",
        donationsNotEnabled: "මෙම ස්මාරකය සඳහා දන්දීම් සක්‍රීය කර නැත",
        pictures: "පින්තූර",
        noImagesUploaded: "පින්තූර උඩුගත කර නැත",
        nameNotProvided: "නම ලබා දී නැත",
        addressNotProvided: "ලිපිනය ලබා දී නැත",
        emailNotProvided: "ඊ-මේල් ලබා දී නැත",
        phoneNotProvided: "දුරකථනය ලබා දී නැත"
    }
};


const Summary: React.FC<SummaryProps> = ({
    selectedPlan,
    profile,
    language,
    selectedAddon,
    selectedCountryId,
    informationFormData,
    contactData,
    thumbnailImage,
    primaryImage,
    frameData,
    additionalImagesData,
    donationReceivableData,
    setActiveStep
}) => {
    const router = useRouter();
    const { language: langKey } = useLanguage();

    const t = translations[langKey as keyof typeof translations] || translations.english;

    const [activeColor, setActiveColor] = useState("#ffffff");
    const [activeColorId, setActiveColorId] = useState<string>("");
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [primaryPreview, setPrimaryPreview] = useState<string | null>(null);
    const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const { isOpen: isPaymentModalOpen, openModal: openPaymentModal, closeModal: closePaymentModal } = useStripePaymentModal();
    const [stripePaymentProp, setStripePaymentProp] = useState<any>(null);
    const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [activeMediaTab, setActiveMediaTab] = useState<'messages' | 'cards' | 'letters' | 'memories' | 'flowers'>('messages');

    // Localization text for share popup
    const shareText = {
        shareMemorial: "Share Memorial",
        shareMemorialDescription: "Honor their memory by sharing",
        facebook: "Facebook",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        copyLink: "Copy Link",
        copied: "Copied!",
        shareThisMemorial: "Share this beautiful memorial with family and friends",
        close: "Close",
        memorial: "Memorial",
    };

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleShare = (platform: 'facebook' | 'whatsapp' | 'instagram') => {
        let shareUrl = '';
        const pageTitle = informationFormData?.title
            || (informationFormData?.firstName && informationFormData?.lastName)
            ? `${informationFormData.firstName} ${informationFormData.lastName}'s Memorial`
            : `${informationFormData?.preferredName || 'Memorial Preview'}`;
        const encodedUrl = encodeURIComponent(currentUrl);
        const encodedTitle = encodeURIComponent(pageTitle);

        if (platform === 'facebook') {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;
        } else if (platform === 'whatsapp') {
            const message = `Check out this memorial: ${pageTitle} - ${currentUrl}`;
            shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        } else if (platform === 'instagram') {
            shareUrl = `https://www.instagram.com/`;
        } else {
            alert('Sharing to this platform is not supported.');
            return;
        }
        window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
    };
    // Get plan name based on language
    const getPlanName = () => {
        const planNames = selectedPlan?.name?.[language];
        return planNames?.[0]?.name || 'Selected Package';
    };

    // Get plan duration
    const getDuration = () => {
        return selectedPlan?.duration || 0;
    };

    // Get addon info
    const getAddonInfo = () => {
        if (!selectedAddon || selectedAddon.length === 0) {
            return 'with no extra addons';
        }
        return `with ${selectedAddon.map((addon: any) => addon.name).join(', ')} addon${selectedAddon.length > 1 ? 's' : ''}`;
    };

    // Get total price
    const getTotalPrice = () => {
        const planPrice = getPlanPrice();
        const addonPrice = selectedAddon?.reduce((total: number, addon: any) => total + (addon.price || 0), 0) || 0;
        return planPrice + addonPrice;
    };

    // Get plan price for selected country
    const getPlanPrice = () => {
        if (!selectedPlan?.priceList || !selectedCountryId) return 0;

        const countryPrice = selectedPlan.priceList.find((priceItem: any) =>
            priceItem.country._id === selectedCountryId
        );

        return countryPrice?.price || 0;
    };

    // Get currency
    const getCurrency = () => {
        if (!selectedPlan?.priceList || !selectedCountryId) return 'USD';

        const countryPrice = selectedPlan.priceList.find((priceItem: any) =>
            priceItem.country._id === selectedCountryId
        );

        return countryPrice?.country?.currencyCode || 'USD';
    };

    // Get plan features
    const getPlanFeatures = () => {
        const features = [];
        const currency = getCurrency();

        // Add base plan description with price
        const description = selectedPlan?.description?.[language];
        if (description && description[0]) {
            features.push({
                name: description[0].value,
                price: getPlanPrice()
            });
        }

        // Add selected addons with their prices
        if (selectedAddon && selectedAddon.length > 0) {
            selectedAddon.forEach((addon: any) => {
                features.push({
                    name: addon.name,
                    price: addon.price || 0
                });
            });
        }

        return features;
    };

    const calculateAge = (dateofBirth: string, dateofDeath: string) => {
        const birthDate = new Date(dateofBirth);
        const deathDate = dateofDeath ? new Date(dateofDeath) : new Date();
        let age = deathDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = deathDate.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && deathDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // Create form data object
    const createFormData = () => {
        const formData = {
            information: informationFormData ? {
                title: informationFormData.title ||
                    ((informationFormData?.firstName && informationFormData?.lastName)
                        ? `${informationFormData.nameTitle ? informationFormData.nameTitle + ' ' : ''}${informationFormData.firstName} ${informationFormData.lastName}`
                        : informationFormData?.preferredName
                            ? `${informationFormData.preferredNameTitle ? informationFormData.preferredNameTitle + ' ' : ''}${informationFormData.preferredName}`
                            : ''
                    ) || '',
                firstName: (informationFormData.firstName && informationFormData.lastName) ? `${informationFormData.nameTitle} ${informationFormData.firstName} ${informationFormData.lastName}` : '',
                lastName: informationFormData.lastName || '',
                preferredName: informationFormData.preferredName ? `${informationFormData.preferredNameTitle} ${informationFormData.preferredName}` : '',
                address: informationFormData.address || '',
                dateofBirth: informationFormData.dateofBirth ? new Date(informationFormData.dateofBirth).toISOString().split('T')[0] : '',
                dateofDeath: informationFormData.dateofDeath ? new Date(informationFormData.dateofDeath).toISOString().split('T')[0] : '',
                description: informationFormData.description || '',
                tributeVideo: informationFormData.tributeVideo || '',
                shortDescription: informationFormData.shortDescription || '',
            } : {},
            primaryImage: primaryImage || null,
            isDonationReceivable: donationReceivableData || false,
            selectedCountry: selectedCountryId || '',
            selectedPackage: selectedPlan?._id || '',
            thumbnailImage: thumbnailImage || null,
            username: profile?.username || '',
            contactDetails: contactData ? contactData.map((contact: any) => ({
                country: contact.country || '',
                address: contact.address || '',
                phoneNumber: contact.phone || '',
                name: contact.name || '',
                relationship: contact.relationship || '',
                email: contact.email || '',
            })) : [],
            additionalImages: additionalImagesData || [],
            selectedAddons: selectedAddon?.map((addon: any) => addon.id) || [],
            selectedPrimaryImageBgFrame: frameData?._id || '',
            selectedBgColor: activeColorId || '',
            slideshowImages: additionalImagesData || []
        };
        return formData;
    };

    const handleContinueToPay = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        try {
            // Get access token from local storage
            const accessToken = localStorage.getItem('accessToken');
            const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');

            const headers: HeadersInit = {
                'Content-Type': 'application/json'
            };
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`;
            }

            // Step 1: Create payment intent
            const paymentIntentData = {
                username: profile?.username || '',
                selectedPackage: selectedPlan?._id || '',
                selectedCountry: selectedCountryId || '',
                selectedAddons: selectedAddon?.map((addon: any) => addon.id) || [],
                accountDetails: {
                    firstName: loggedInUser.firstName || loggedInUser.name?.split(' ')[0] || '',
                    lastName: loggedInUser.lastName || loggedInUser.name?.split(' ').slice(1).join(' ') || '',
                    email: loggedInUser.email || '',
                    phone: loggedInUser.phone || ''
                },
                information: informationFormData ? {
                    title: informationFormData.title ||
                        ((informationFormData?.firstName && informationFormData?.lastName)
                            ? `${informationFormData.firstName} ${informationFormData.lastName}`
                            : informationFormData?.preferredName
                        ) || '',
                    address: informationFormData.address || '',
                    dateofBirth: informationFormData.dateofBirth ? new Date(informationFormData.dateofBirth).toISOString().split('T')[0] : '',
                    dateofDeath: informationFormData.dateofDeath ? new Date(informationFormData.dateofDeath).toISOString().split('T')[0] : '',
                    description: informationFormData.description || '',
                    tributeVideo: informationFormData.tributeVideo || '',
                    shortDescription: informationFormData.shortDescription || '',
                } : {},
                contactDetails: contactData ? contactData.map((contact: any) => ({
                    country: contact.country || '',
                    address: contact.address || '',
                    phoneNumber: contact.phone || '',
                    name: contact.name || '',
                    relationship: contact.relationship || '',
                    email: contact.email || '',
                })) : []
            };

            console.log('Payment Intent Data:', paymentIntentData);

            const paymentIntentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/create-payment-intent`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(paymentIntentData),
            });

            if (paymentIntentResponse.ok) {
                const paymentIntentResult = await paymentIntentResponse.json();
                console.log('Payment Intent Result:', paymentIntentResult);

                // Create stripe payment data for the modal
                const stripePaymentData = {
                    email: loggedInUser.email || '',
                    name: loggedInUser.name || '',
                    address: loggedInUser.address || '',
                    phoneNumber: loggedInUser.phone || '',
                    countryId: selectedCountryId,
                    packageAmount: paymentIntentResult.amount || getTotalPrice(),
                    tempOrderId: paymentIntentResult.tempOrderId,
                    paymentIntentId: paymentIntentResult.paymentIntentId
                };

                setStripePaymentProp(stripePaymentData);
                setStripeClientSecret(paymentIntentResult.clientSecret || null);
                openPaymentModal();
            } else {
                const errorData = await paymentIntentResponse.json();
                setSubmitMessage({
                    type: 'error',
                    message: errorData.message || 'Failed to create payment intent. Please try again.'
                });
            }
        } catch (error) {
            console.error('Error creating payment intent:', error);
            setSubmitMessage({
                type: 'error',
                message: 'Network error. Please check your connection and try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Create preview URLs for images
    useEffect(() => {
        if (thumbnailImage) {
            const url = URL.createObjectURL(thumbnailImage);
            setThumbnailPreview(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [thumbnailImage]);

    useEffect(() => {
        if (primaryImage) {
            const url = URL.createObjectURL(primaryImage);
            setPrimaryPreview(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [primaryImage]);

    useEffect(() => {
        if (additionalImagesData && additionalImagesData.length > 0) {
            const urls = additionalImagesData.map(file => URL.createObjectURL(file));
            setAdditionalPreviews(urls);
            return () => urls.forEach(url => URL.revokeObjectURL(url));
        }
    }, [additionalImagesData]);

    // Auto-carousel for additional images
    useEffect(() => {
        if (additionalPreviews.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) =>
                    (prevIndex + 1) % additionalPreviews.length
                );
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [additionalPreviews.length]);

    // Navigation functions for carousel
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % additionalPreviews.length
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? additionalPreviews.length - 1 : prevIndex - 1
        );
    };

    // Log the received data for debugging
    useEffect(() => {
        console.log({
            "selectedPlan": selectedPlan,
            "selectedAddon": selectedAddon,
            "selectedCountryId": selectedCountryId,
            "profile": profile,
            "language": language,
            "informationFormData": informationFormData,
            "contactData": contactData,
            "thumbnailImage": thumbnailImage,
            "primaryImage": primaryImage,
            "frameData": frameData,
            "additionalImagesData": additionalImagesData,
            "donationReceivableData": donationReceivableData,
            "totalPrice": getTotalPrice(),
            "currency": getCurrency(),
            "features": getPlanFeatures()
        });
    }, [selectedPlan, selectedAddon, selectedCountryId, profile, language, informationFormData, contactData, thumbnailImage, primaryImage, frameData, additionalImagesData, donationReceivableData]);


    // Initialize default background color
    useEffect(() => {
        if (selectedPlan?.bgColors && selectedPlan.bgColors.length > 0) {
            const firstColor = selectedPlan.bgColors[0];
            setActiveColor(firstColor.colorCode);
            setActiveColorId(firstColor._id);
        }
    }, [selectedPlan]);


    // Handle closing the payment modal
    const handleClosePaymentModal = () => {
        closePaymentModal();
        setStripePaymentProp(null);
        setStripeClientSecret(null);
    };

    // Handle successful payment
    const handlePaymentSuccess = async () => {
        try {
            // Step 2: Confirm order after successful payment
            await confirmOrder();

            closePaymentModal();
            setStripePaymentProp(null);
            setStripeClientSecret(null);
            // Show success popup
            setShowSuccessPopup(true);
        } catch (error) {
            console.error('Error confirming order:', error);
            setSubmitMessage({
                type: 'error',
                message: 'Payment was successful, but order confirmation failed. Please contact support.'
            });
        }
    };

    // Confirm order after successful payment
    const confirmOrder = async () => {
        const formData = createFormData();
        console.log('Confirming Order with Form Data:', formData);

        // Create FormData for file upload
        const uploadFormData = new FormData();

        // Append non-file fields
        uploadFormData.append('information', JSON.stringify(formData.information));
        uploadFormData.append('selectedCountry', formData.selectedCountry);
        uploadFormData.append('selectedPackage', formData.selectedPackage);
        uploadFormData.append('username', formData.username);
        uploadFormData.append('contactDetails', JSON.stringify(formData.contactDetails));
        uploadFormData.append('selectedAddons', JSON.stringify(formData.selectedAddons));
        uploadFormData.append('selectedPrimaryImageBgFrame', formData.selectedPrimaryImageBgFrame);
        uploadFormData.append('selectedBgColor', formData.selectedBgColor);
        uploadFormData.append('isDonationReceivable', String(formData.isDonationReceivable));

        // Append additional fields for order confirmation
        if (stripePaymentProp?.tempOrderId) {
            uploadFormData.append('tempOrderId', stripePaymentProp.tempOrderId);
        }
        if (stripePaymentProp?.paymentIntentId) {
            uploadFormData.append('paymentIntentId', stripePaymentProp.paymentIntentId);
        }

        // Append file fields
        if (formData.primaryImage) {
            uploadFormData.append('primaryImage', formData.primaryImage);
        }
        if (formData.thumbnailImage) {
            uploadFormData.append('thumbnailImage', formData.thumbnailImage);
        }
        if (formData.additionalImages && formData.additionalImages.length > 0) {
            formData.additionalImages.forEach((file, index) => {
                uploadFormData.append('additionalImages', file);
            });
        }
        if (formData.slideshowImages && formData.slideshowImages.length > 0) {
            formData.slideshowImages.forEach((file, index) => {
                uploadFormData.append('slideshowImages', file);
            });
        }

        // Get access token from local storage
        const accessToken = localStorage.getItem('accessToken');

        const headers: HeadersInit = {};
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/confirm-order`, {
            method: 'POST',
            headers: headers,
            body: uploadFormData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to confirm order');
        }

        const result = await response.json();
        console.log('Order confirmation result:', result);
        return result;
    };

    // Handle success popup OK button
    const handleSuccessOk = () => {
        setShowSuccessPopup(false);
        // Refresh the page
        window.location.reload();
    };

    // Handle payment error
    const handlePaymentError = (error: string) => {
        console.error('Payment error:', error);
        setSubmitMessage({
            type: 'error',
            message: `Payment failed: ${error}`
        });
    };

    // Handle back from payment
    const handlePaymentBack = () => {
        closePaymentModal();
        // Optionally keep the form data and allow user to retry
    };

    return (
        <div className='p-4 md:p-8 lg:px-16 bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]'>
            <form>
                <div className="p-4 mb-6">
                    <h3 className="text-2xl md:text-4xl font-bold text-center mb-4 text-primary">
                        Hi {profile?.username || 'there'}, Our deepest condolences.
                    </h3>
                    <p className="text-center text-gray-500 mb-4 text-primary">
                        You have selected a {getDuration()} days '{getPlanName()}' package, <span className='text-[#880002]'>{getAddonInfo()}</span>
                    </p>
                </div>
                <div className="flex-shrink min-w-0 mb-8">
                    <TitleWithUnderline text="Summary" underlineWidth={64} />
                </div>
                <div className="p-4 border border-gray-500">
                    <h3 className="text-xl font-semibold text-center mb-4 text-primary">
                        {getDuration()} Days {getPlanName()} + {selectedAddon?.length || 0} Addon{(selectedAddon?.length || 0) !== 1 ? 's' : ''}
                    </h3>
                    <Separator />
                    {getPlanFeatures().map((feature, index) => (
                        <div key={index} className='flex justify-between items-center mt-2 mx-8'>
                            <div className="flex justify-between items-center w-full">
                                <p>{feature.name}</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-md font-semibold">{feature.price.toLocaleString()} {getCurrency()}</span>
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-500">
                                        <Check className="text-black w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between text-primary my-8'>
                    <p>Total amount to pay</p>
                    <h1 className="text-xl font-bold">{getTotalPrice().toLocaleString()} {getCurrency()}</h1>
                </div>


                <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16  py-6 max-md:px-5">
                    <Separator className="mb-5 w-full" />
                    
                    {/* Background Color Selection */}
                    <div className="my-4">
                        <p className="text-sm text-gray-600 mb-2">Select the background color for the obituary post</p>
                        <div className="flex flex-wrap gap-2">
                            {(selectedPlan?.bgColors || [
                                { _id: "", colorCode: "#ffffff" },
                            ]).map((colorObj: any, index: number) => {
                                const color = colorObj?.colorCode || colorObj;
                                const colorId = colorObj?._id || "";
                                return (
                                    <button
                                        key={colorId || color}
                                        className="w-8 h-8 rounded-full flex items-center justify-center relative border-2 border-gray-400 bg-white"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setActiveColor(color);
                                            setActiveColorId(colorId);
                                        }}
                                    >
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: color }}
                                        >
                                            {activeColor === color && (
                                                <Check className="text-gray-500 w-4 h-4" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <div className="md:p-10 p-4" style={{ backgroundColor: activeColor }}>
                                <div className="bg-black w-full shadow-md flex justify-center">
                                    <div className="pt-4 pb-2 text-center w-full max-w-5xl px-4">
                                        <div className="w-full flex justify-center">
                                            <h1 className="text-2xl md:text-3xl font-serif font-light text-white mb-8 leading-relaxed tracking-wide text-center max-w-3xl">
                                                {informationFormData?.shortDescription || 'Our deepest condolences'}
                                            </h1>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-center items-center mb-6 gap-8 sm:gap-12 w-full">
                                            <div className="text-white text-center flex flex-col items-center">
                                                <p className="text-sm uppercase tracking-wider text-white font-sans">
                                                    Birth</p>
                                                <p className="text-lg font-serif text-white mt-1">
                                                    {informationFormData?.dateofBirth ? new Date(informationFormData.dateofBirth).toLocaleDateString() : 'Birth date'}</p>
                                            </div>

                                            {primaryPreview && (
                                                <div className="relative flex justify-center">
                                                    {frameData?.frameImage ? (
                                                        <div className="relative flex items-center justify-center">
                                                            {/* Frame background - slightly larger */}
                                                            <div
                                                                className="w-44 sm:w-64 aspect-square bg-cover bg-center bg-no-repeat"
                                                                style={{
                                                                    backgroundImage: `url(${frameData.frameImage})`,
                                                                }}
                                                            />
                                                            {/* Primary image - positioned absolutely inside frame */}
                                                            <img
                                                                alt="Primary memorial image"
                                                                className="absolute w-40 sm:w-60 aspect-square object-cover rounded shadow-md"
                                                                src={primaryPreview}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <img
                                                            alt="Primary memorial image"
                                                            className="w-40 sm:w-60 shadow-md aspect-square object-cover rounded"
                                                            src={primaryPreview}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {!primaryPreview && (
                                                <div className="w-40 sm:w-60 shadow-md aspect-square bg-gray-200 flex items-center justify-center">
                                                    <p className="text-white text-sm">No image selected</p>
                                                </div>
                                            )}

                                            <div className="text-white text-center flex flex-col items-center">
                                                <p className="text-sm uppercase tracking-wider text-white font-sans">
                                                    Death</p>
                                                <p className="text-lg font-serif text-white mt-1">
                                                    {informationFormData?.dateofDeath ? new Date(informationFormData.dateofDeath).toLocaleDateString() : 'Death date'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-center">
                                            <h1 className="text-3xl md:text-4xl font-serif font-normal text-white mb-8 leading-tight text-center max-w-4xl">
                                                {informationFormData?.title ||
                                                    ((informationFormData?.firstName && informationFormData?.lastName)
                                                        ? `${informationFormData.nameTitle} ${informationFormData.firstName} ${informationFormData.lastName}`
                                                        : `${informationFormData.nameTitle} ${informationFormData?.preferredName}`
                                                    ) || 'Memorial Preview'}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Description Section */}
                            <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-1 h-16 bg-gradient-to-b from-teal-500 to-teal-700 rounded-full"></div>
                                    </div>
                                    <div className="flex-1">
                                        {informationFormData.description ? (
                                            <div className="prose prose-gray max-w-none">
                                                <p className="text-gray-700 leading-relaxed text-lg font-light italic">
                                                    "{informationFormData.description}"
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center py-8">
                                                <div className="text-center">
                                                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    <p className="text-gray-500 text-sm">No description provided.</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 items-center self-stretch mt-6">
                                <button
                                    className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 font-semibold"
                                    onClick={() => setShowSharePopup(!showSharePopup)}
                                    type="button"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                    </svg>
                                    Share Memorial
                                </button>
                                <button
                                    className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 font-semibold cursor-not-allowed"
                                    disabled
                                    type="button"
                                >
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Post Tribute
                                </button>
                                <button
                                    className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 font-semibold cursor-not-allowed"
                                    disabled
                                    type="button"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 013 18.546V19a1 1 0 001 1h16a1 1 0 001-1v-.454c0-.793-.644-1.546-1.5-1.546z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12.054l-2.5-2.5L8 11.054l4 4 4-4-1.5-1.5-2.5 2.5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.054V12.054" />
                                    </svg>
                                    Donate
                                </button>
                            </div>
                            <Separator className="mt-4 !w-full" />

                            {/* Tributes Section */}
                            <div className="mt-8">
                                <div className="flex-shrink min-w-0 max-w-full mb-6">
                                    <TitleWithUnderline text="Tributes" underlineWidth={64} fontSize={3} />
                                </div>

                                {/* Tab Navigation */}
                                <div className="flex flex-wrap sm:flex-nowrap border-b border-gray-200 mb-6 overflow-x-auto">
                                    <button
                                        type="button"
                                        onClick={() => setActiveMediaTab('messages')}
                                        className={`px-3 sm:px-6 py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeMediaTab === 'messages'
                                            ? 'border-primary text-primary bg-gray-50'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        Guest Book
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveMediaTab('cards')}
                                        className={`px-3 sm:px-6 py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeMediaTab === 'cards'
                                            ? 'border-primary text-primary bg-gray-50'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        Cards
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveMediaTab('letters')}
                                        className={`px-3 sm:px-6 py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeMediaTab === 'letters'
                                            ? 'border-primary text-primary bg-gray-50'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        Letters
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveMediaTab('memories')}
                                        className={`px-3 sm:px-6 py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeMediaTab === 'memories'
                                            ? 'border-primary text-primary bg-gray-50'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        Memories
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveMediaTab('flowers')}
                                        className={`px-3 sm:px-6 py-3 font-medium text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${activeMediaTab === 'flowers'
                                            ? 'border-primary text-primary bg-gray-50'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        Flowers
                                    </button>
                                </div>

                                {/* Tab Content */}
                                {activeMediaTab === 'messages' && (
                                    <div className="grid grid-cols-1 gap-4 mb-8">
                                        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center text-gray-500">
                                            No guest book entries available
                                        </div>
                                    </div>
                                )}

                                {activeMediaTab === 'cards' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                        <div className="col-span-full bg-gray-100 p-6 rounded-lg shadow-md text-center text-gray-500">
                                            No tribute cards available
                                        </div>
                                    </div>
                                )}

                                {activeMediaTab === 'letters' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                        <div className="col-span-full bg-gray-100 p-6 rounded-lg shadow-md text-center text-gray-500">
                                            No tribute letters available
                                        </div>
                                    </div>
                                )}

                                {activeMediaTab === 'memories' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                        <div className="col-span-full bg-gray-100 p-6 rounded-lg shadow-md text-center text-gray-500">
                                            No memories available
                                        </div>
                                    </div>
                                )}

                                {activeMediaTab === 'flowers' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                        <div className="col-span-full bg-gray-100 p-6 rounded-lg shadow-md text-center text-gray-500">
                                            No virtual flowers available
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* YouTube Video and Additional Images Section */}
                            {(informationFormData?.tributeVideo || (additionalPreviews && additionalPreviews.length > 0)) && (
                                <div className="mt-8">
                                    <div className="flex-shrink min-w-0 max-w-full mb-6">
                                        <TitleWithUnderline text="Media Gallery" underlineWidth={64} fontSize={3} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* YouTube Video Section */}
                                        {informationFormData?.tributeVideo && (
                                            <div className={`${!additionalPreviews || additionalPreviews.length === 0 ? 'md:col-span-2 flex justify-center' : ''}`}>
                                                <div className="bg-white p-4 shadow-md">
                                                    <h3 className="text-lg font-semibold mb-4 text-center">Tribute Video</h3>
                                                    <div className="aspect-video w-full">
                                                        <iframe
                                                            width="100%"
                                                            height="100%"
                                                            src={`https://www.youtube.com/embed/${informationFormData.tributeVideo.split('v=')[1]?.split('&')[0] || informationFormData.tributeVideo.split('/').pop()}`}
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
                                        {additionalPreviews && additionalPreviews.length > 0 && (
                                            <div className={`${!informationFormData?.tributeVideo ? 'md:col-span-2 flex justify-center' : ''}`}>
                                                <div className="bg-white p-4 shadow-md w-full">
                                                    <h3 className="text-lg font-semibold mb-4 text-center">Additional Images</h3>
                                                    <div className="relative">
                                                        <div className="w-full relative aspect-video">
                                                            <img
                                                                src={additionalPreviews[currentImageIndex]}
                                                                alt={`Additional image ${currentImageIndex + 1}`}
                                                                className="w-full h-full object-cover rounded shadow-md"
                                                            />

                                                            {/* Navigation arrows - only show if multiple images */}
                                                            {additionalPreviews.length > 1 && (
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
                                                            {additionalPreviews.length > 1 && (
                                                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                                                                    {currentImageIndex + 1} / {additionalPreviews.length}
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

                            <div className="mt-8">
                                <div className="flex-shrink min-w-0 max-w-full">
                                    <TitleWithUnderline text={t.contacts} underlineWidth={64} fontSize={3} />
                                </div>
                                {contactData && contactData.length > 0 ? (
                                    contactData.map((contact: any, index: number) => (
                                        <div key={index} className="bg-white p-6 shadow-md mb-4 flex md:flex-row flex-col justify-between md:items-center">
                                            <div>
                                                <p>
                                                    <span className="text-gray-600 font-medium">{t.contactName} </span>
                                                    <span className="text-[#880002]">{contact.name}</span>
                                                </p>
                                                <p>
                                                    <span className="text-gray-600 font-medium">{t.contactAddress} </span>
                                                    <span className="text-gray-700">{contact.address}</span>
                                                </p>
                                                <p>
                                                    <span className="text-gray-600 font-medium">{t.contactPhone} </span>
                                                    <span className="text-gray-700">{contact.phone}</span>
                                                </p>
                                                <p>
                                                    <span className="text-gray-600 font-medium">{t.contactEmail} </span>
                                                    <span className="text-gray-700">{contact.email}</span>
                                                </p>
                                                <p>
                                                    <span className="text-gray-600 font-medium">{t.contactRelationship} </span>
                                                    <span className="text-gray-700">{contact.relationship}</span>
                                                </p>
                                            </div>
                                            <button
                                                className={`mb-0 gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)] ${true ? 'bg-[#0D1322]' : 'bg-gray-400'}`}
                                                disabled
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



                        {/* Right side advertisement section - 1/3 width on desktop */}
                        <div className="md:col-span-1">
                            <div className="bg-white p-2 shadow-md">
                                <div className="flex-shrink min-w-0 max-w-full mt-2">
                                    <TitleWithUnderline text={t.overview} underlineWidth={64} fontSize={3} />
                                </div>
                                <div className="space-y-2 mt-2 p-2">
                                    <p className="text-gray-500">{t.name} {informationFormData?.title || ((informationFormData?.firstName && informationFormData?.lastName) ? `${informationFormData.nameTitle} ${informationFormData.firstName} ${informationFormData.lastName}` : `${informationFormData.nameTitle} ${informationFormData?.preferredName}`) || t.notProvided}</p>
                                    <p className="text-gray-500">{t.birthDateLabel} {informationFormData?.dateofBirth ? new Date(informationFormData.dateofBirth).toLocaleDateString() : t.notProvided}</p>
                                    <p className="text-gray-500">{t.deathDateLabel} {informationFormData?.dateofDeath ? new Date(informationFormData.dateofDeath).toLocaleDateString() : t.notProvided}</p>
                                    <p className="text-gray-500">{t.age} {informationFormData?.dateofBirth && informationFormData?.dateofDeath ? calculateAge(informationFormData.dateofBirth, informationFormData.dateofDeath) : t.notProvided}</p>
                                    <p>{t.address} {informationFormData?.address || t.notProvided}</p>
                                </div>
                                <Separator className="mt-6 !w-full mb-8" />
                                <div className="flex-shrink min-w-0 max-w-full mt-4">
                                    <TitleWithUnderline text={t.postersInformation} underlineWidth={64} fontSize={3} />
                                </div>
                                <div className="space-y-2 mt-2 p-2">
                                    <p>
                                        <span className="text-gray-600 font-medium">{t.posterName} </span>
                                        <span className="text-[#880002]">{profile?.username || t.nameNotProvided}</span>
                                    </p>
                                    <p>
                                        <span className="text-gray-600 font-medium">{t.posterAddress} </span>
                                        <span className="text-gray-700">{profile?.address || t.addressNotProvided}</span>
                                    </p>
                                    <p>
                                        <span className="text-gray-600 font-medium">{t.posterEmail} </span>
                                        <span className="text-gray-700">{profile?.email || t.emailNotProvided}</span>
                                    </p>
                                    <p>
                                        <span className="text-gray-600 font-medium">{t.posterPhone} </span>
                                        <span className="text-gray-700">{profile?.phone || t.phoneNotProvided}</span>
                                    </p>
                                </div>
                                <Separator className="mt-6 !w-full mb-4" />
                                <div className="flex-shrink min-w-0 max-w-full mt-4">
                                    <TitleWithUnderline text={t.donationStatus} underlineWidth={64} fontSize={3} />
                                </div>
                                <div className="space-y-2 mt-2 p-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${donationReceivableData ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                        <p className={donationReceivableData ? 'text-green-700' : 'text-gray-600'}>
                                            {donationReceivableData ? t.donationsEnabled : t.donationsNotEnabled}
                                        </p>
                                    </div>
                                </div>
                                <Separator className="mt-8 !w-full mb-4" />
                                <div className="flex-shrink min-w-0 max-w-full mt-8 mb-6">
                                    <TitleWithUnderline text={t.pictures} underlineWidth={64} fontSize={3} />
                                </div>
                                <div className="p-2">
                                    <div className="bg-white p-2 shadow-md">
                                        {(thumbnailPreview || primaryPreview) ? (
                                            <div className="grid grid-cols-2 gap-2 pb-4">
                                                {thumbnailPreview && (
                                                    <img
                                                        alt="Thumbnail image"
                                                        className="w-full shadow-md aspect-square object-cover"
                                                        src={thumbnailPreview}
                                                    />
                                                )}
                                                {primaryPreview && (
                                                    <img
                                                        alt="Primary image"
                                                        className="w-full shadow-md aspect-square object-cover"
                                                        src={primaryPreview}
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
                            </div>
                        </div>


                    </div>
                </section>

                <div className='text-end'>
                    I have read and accept the <span
                        className='text-[#880002] underline cursor-pointer'
                        onClick={() => window.open('/terms', 'termsWindow', 'width=800,height=600,scrollbars=yes,resizable=yes,status=no,location=no,toolbar=no,menubar=no')}
                    >
                        Terms & Conditions
                    </span>
                </div>

                {/* Display success/error message */}
                {submitMessage && (
                    <div className={`mt-4 p-4 rounded-lg ${submitMessage.type === 'success'
                        ? 'bg-green-100 border border-green-400 text-green-700'
                        : 'bg-red-100 border border-red-400 text-red-700'
                        }`}>
                        <p className="text-center font-semibold">{submitMessage.message}</p>
                    </div>
                )}

                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        type="button"
                        onClick={() => setActiveStep(9)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 "
                        disabled={isSubmitting}
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleContinueToPay}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Continue to Pay'}
                    </button>
                </div>
            </form>

            {/* Stripe Payment Modal */}
            {isPaymentModalOpen && stripePaymentProp && stripeClientSecret && (
                <StripePaymentMemorial
                    formData={stripePaymentProp}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    onBack={handlePaymentBack}
                    onClose={handleClosePaymentModal}
                    currencyCode={getCurrency()}
                    clientSecret={stripeClientSecret}
                    isOpen={isPaymentModalOpen}
                    t={{
                        completePayment: 'Complete Payment',
                        packageAmount: 'Package Amount',
                        customer: 'Customer',
                        email: 'Email',
                        processing: 'Processing...',
                        back: 'Back',
                        payNow: 'Pay Now',
                        noClientSecret: 'Payment initialization required. Please try again.'
                    }}
                />
            )}

            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
                        {/* Success Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <Check className="w-8 h-8 text-green-600" />
                            </div>
                        </div>

                        {/* Success Message */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600 mb-6">
                            Your memorial package has been purchased successfully. Thank you for your order.
                        </p>

                        {/* Package Details */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                            <h3 className="font-semibold text-gray-900 mb-2">Order Summary:</h3>
                            <p className="text-sm text-gray-600">Package: {getPlanName()}</p>
                            <p className="text-sm text-gray-600">Duration: {getDuration()} days</p>
                            <p className="text-sm text-gray-600">Total: {getTotalPrice().toLocaleString()} {getCurrency()}</p>
                        </div>

                        {/* OK Button */}
                        <button
                            onClick={handleSuccessOk}
                            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Share Memorial Popup */}
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
                        <div className="bg-primary px-6 py-4 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">{shareText.shareMemorial}</h2>
                                    <p className="text-teal-100 text-sm opacity-90">{shareText.shareMemorialDescription}</p>
                                </div>
                                <button
                                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                                    onClick={() => setShowSharePopup(false)}
                                    aria-label={shareText.close}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex gap-3 mb-4">
                                {/* Facebook */}
                                <button
                                    className="group flex flex-col items-center p-3 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 flex-1"
                                    onClick={() => handleShare('facebook')}
                                >
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-700 transition-colors">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">{shareText.facebook}</span>
                                </button>

                                {/* WhatsApp */}
                                <button
                                    className="group flex flex-col items-center p-3 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all duration-200 transform hover:scale-105 flex-1"
                                    onClick={() => handleShare('whatsapp')}
                                >
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mb-2 group-hover:bg-green-600 transition-colors">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 group-hover:text-green-700">{shareText.whatsapp}</span>
                                </button>

                                {/* Instagram */}
                                <button
                                    className="group flex flex-col items-center p-3 rounded-xl border-2 border-gray-100 hover:border-pink-200 hover:bg-pink-50 transition-all duration-200 transform hover:scale-105 flex-1"
                                    onClick={() => handleShare('instagram')}
                                >
                                    <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center mb-2 group-hover:from-yellow-500 group-hover:via-red-600 group-hover:to-purple-600 transition-all">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-medium text-gray-700 group-hover:text-pink-700">{shareText.instagram}</span>
                                </button>
                            </div>

                            {/* Copy Link Section */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{shareText.copyLink}</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={currentUrl}
                                        readOnly
                                        className="w-full px-3 py-2 pr-12 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <button
                                        onClick={() => {
                                            const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                                            if (input) {
                                                input.select();
                                                input.setSelectionRange(0, 99999);
                                                try {
                                                    document.execCommand('copy');
                                                    alert(shareText.copied);
                                                } catch (err) {
                                                    console.error('Copy failed:', err);
                                                }
                                            }
                                        }}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                                        title={shareText.copyLink}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Memorial Info */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <div className="flex items-center space-x-3">
                                    {primaryPreview && (
                                        <img
                                            src={primaryPreview}
                                            alt="Memorial"
                                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 truncate">
                                            {informationFormData?.title || ((informationFormData?.firstName && informationFormData?.lastName) ? `${informationFormData.firstName} ${informationFormData.lastName}` : informationFormData?.preferredName) || 'Memorial Name'}
                                        </h4>
                                        <p className="text-sm text-gray-600 truncate">{shareText.shareThisMemorial}</p>
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

export default Summary;