"use client";
import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Separator } from '../ui/separator';
import StripePaymentMemorial, { useStripePaymentModal } from './StripePaymentMemorial';
import { add } from 'date-fns';
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
    accountDetailsData?: any;
    setActiveStep: (step: number) => void;
}


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
    accountDetailsData,
    setActiveStep
}) => {
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
                title: informationFormData.title || '',
                address: informationFormData.address || '',
                dateofBirth: informationFormData.dateofBirth ? new Date(informationFormData.dateofBirth).toISOString().split('T')[0] : '',
                dateofDeath: informationFormData.dateofDeath ? new Date(informationFormData.dateofDeath).toISOString().split('T')[0] : '',
                description: informationFormData.description || '',
                tributeVideo: informationFormData.tributeVideo || '',
                shortDescription: informationFormData.shortDescription || '',
            } : {},
            primaryImage: primaryImage || null,
            accountDetails: accountDetailsData ? {
                bankName: accountDetailsData.bankName || '',
                branchName: accountDetailsData.branch || '',
                accountNumber: accountDetailsData.accountNumber || '',
                accountHolderName: accountDetailsData.accountHolder || ''
            } : {},
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
            const formData = createFormData();
            console.log('Form Data:', formData);

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
            uploadFormData.append('accountDetails', JSON.stringify(formData.accountDetails));

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

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
                method: 'POST',
                headers: headers,
                body: uploadFormData,
            });

            if (response.ok) {
                const result = await response.json();
                setSubmitMessage({ type: 'success', message: 'Order submitted successfully!' });

                const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');

                // Create obituary entry object for DonateModal
                const stripePaymentData = {
                    email: loggedInUser.email || '',
                    name: loggedInUser.name || '',
                    address: loggedInUser.address || '',
                    phoneNumber: loggedInUser.phone || '',
                    countryId: selectedCountryId,
                    packageAmount: getTotalPrice(),
                };

                setStripePaymentProp(stripePaymentData);
                setStripeClientSecret(result.paymentIntentClientSecret || null);
                openPaymentModal();
            } else {
                const errorData = await response.json();
                setSubmitMessage({
                    type: 'error',
                    message: errorData.message || 'Failed to submit order. Please try again.'
                });
            }
        } catch (error) {
            console.error('Error submitting order:', error);
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
            "accountDetailsData": accountDetailsData,
            "totalPrice": getTotalPrice(),
            "currency": getCurrency(),
            "features": getPlanFeatures()
        });
    }, [selectedPlan, selectedAddon, selectedCountryId, profile, language, informationFormData, contactData, thumbnailImage, primaryImage, frameData, additionalImagesData, accountDetailsData]);


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
    const handlePaymentSuccess = () => {
        closePaymentModal();
        setStripePaymentProp(null);
        setStripeClientSecret(null);
        // Show success popup
        setShowSuccessPopup(true);
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
                    <div className="flex flex-wrap gap-2 my-4">
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


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <div
                                className="bg-gray-100 md:p-10 p-4"
                            >
                                <div
                                    className="bg-white w-full  shadow-md"
                                    style={{ backgroundColor: activeColor }}
                                >
                                    <div className="pt-4 pb-2 text-center max-w-lg mx-auto px-4">
                                        <h1 className="text-xl font-bold text-primary mb-6">
                                            {informationFormData?.shortDescription || 'Our deepest condolences'}
                                        </h1>

                                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
                                            <div className="text-gray-500 text-center flex md:flex-col">
                                                <p>Birth<span className="md:hidden mr-1 ml-1">:</span></p>
                                                <p>{informationFormData?.dateofBirth ? new Date(informationFormData.dateofBirth).toLocaleDateString() : 'Birth date'}</p>
                                            </div>

                                            {primaryPreview && (
                                                <div className="relative">
                                                    {frameData?.frameImage ? (
                                                        <div className="relative flex items-center justify-center">
                                                            {/* Frame background - slightly larger */}
                                                            <div
                                                                className="w-44 sm:w-64 aspect-square bg-cover bg-center bg-no-repeat"
                                                                style={{
                                                                    backgroundImage: `url(${frameData.frameImage})`,
                                                                }}
                                                            />
                                                            {/* Primary image - centered and smaller than frame */}
                                                            <img
                                                                alt="Primary memorial image"
                                                                className="absolute w-40 sm:w-60 aspect-square object-cover rounded shadow-md"
                                                                src={primaryPreview}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <img
                                                            alt="Primary memorial image"
                                                            className="w-40 sm:w-60 shadow-md aspect-square object-cover mx-auto sm:mx-4 rounded"
                                                            src={primaryPreview}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {!primaryPreview && (
                                                <div className="w-40 sm:w-60 shadow-md aspect-square bg-gray-200 flex items-center justify-center mx-auto sm:mx-4">
                                                    <p className="text-gray-500 text-sm">No image selected</p>
                                                </div>
                                            )}

                                            <div className="text-gray-500 text-center flex md:flex-col">
                                                <p>Death<span className="md:hidden mr-1 ml-1">:</span></p>
                                                <p>{informationFormData?.dateofDeath ? new Date(informationFormData.dateofDeath).toLocaleDateString() : 'Death date'}</p>
                                            </div>
                                        </div>

                                        <h1 className="text-xl font-bold text-secondary mb-6">
                                            {informationFormData?.title || 'Memorial Title'}
                                        </h1>
                                    </div>

                                </div>
                            </div>
                            <p className="text-justify mt-4">
                                {informationFormData?.description || 'No description provided.'}
                            </p>
                            <div className="flex justify-end gap-2 items-center self-stretch mt-4">
                                <button className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                    Post Tribute
                                </button>
                                <button className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                    Donate
                                </button>
                            </div>
                            <Separator className="mt-4 !w-full" />

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
                                    <TitleWithUnderline text="Contacts" underlineWidth={64} fontSize={3} />
                                </div>
                                {contactData && contactData.length > 0 ? (
                                    contactData.map((contact: any, index: number) => (
                                        <div key={index} className="bg-white p-6 shadow-md mb-4 flex md:flex-row flex-col justify-between md:items-center">
                                            <div>
                                                <p className="text-[#880002]">{contact.name}</p>
                                                <p>{contact.address}</p>
                                                <p>{contact.phone}</p>
                                                <p>{contact.email}</p>
                                                <p>{contact.relationship}</p>
                                            </div>
                                            <button className="mb-0 gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                                Request to Contact
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-white p-6 shadow-md mb-4">
                                        <p className="text-gray-500 text-center">No contact information provided.</p>
                                    </div>
                                )}
                            </div>
                        </div>



                        {/* Right side advertisement section - 1/3 width on desktop */}
                        <div className="md:col-span-1">
                            <div className="bg-white p-2 shadow-md">
                                <div className="flex-shrink min-w-0 max-w-full mt-2">
                                    <TitleWithUnderline text="Overview" underlineWidth={64} fontSize={3} />
                                </div>
                                <div className="space-y-2 mt-2 p-2">
                                    <p className="text-gray-500">Name: {informationFormData?.title ? informationFormData.title : 'Not provided'}</p>
                                    <p className="text-gray-500">Birth Date: {informationFormData?.dateofBirth ? new Date(informationFormData.dateofBirth).toLocaleDateString() : 'Not provided'}</p>
                                    <p className="text-gray-500">Death Date: {informationFormData?.dateofDeath ? new Date(informationFormData.dateofDeath).toLocaleDateString() : 'Not provided'}</p>
                                    <p className="text-gray-500">Age: {informationFormData?.dateofBirth && informationFormData?.dateofDeath ? calculateAge(informationFormData.dateofBirth, informationFormData.dateofDeath) : 'Not provided'}</p>
                                    <p>Address: {informationFormData?.address || 'Not provided'}</p>
                                </div>
                                <Separator className="mt-6 !w-full mb-8" />
                                <div className="flex-shrink min-w-0 max-w-full mt-4">
                                    <TitleWithUnderline text="Poster's Information" underlineWidth={64} fontSize={3} />
                                </div>
                                <div className="space-y-2 mt-2 p-2">
                                    <p className="text-[#880002]">{profile?.username || 'Name'}</p>
                                    <p>{profile?.address || 'Address not provided'}</p>
                                    <p>{profile?.email || 'Email not provided'}</p>
                                    <p>{profile?.phone || 'Phone not provided'}</p>
                                </div>
                                {accountDetailsData && (
                                    <>
                                        <Separator className="mt-6 !w-full mb-4" />
                                        <div className="flex-shrink min-w-0 max-w-full mt-4">
                                            <TitleWithUnderline text="Account Details" underlineWidth={64} fontSize={3} />
                                        </div>
                                        <div className="space-y-2 mt-2 p-2">
                                            <p>Bank: {accountDetailsData.bankName || 'Not provided'}</p>
                                            <p>Branch: {accountDetailsData.branch || 'Not provided'}</p>
                                            <p>Account: {accountDetailsData.accountNumber || 'Not provided'}</p>
                                            <p>Holder: {accountDetailsData.accountHolder || 'Not provided'}</p>
                                        </div>
                                    </>
                                )}
                                <button className="w-full gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                    Request to Contact
                                </button>
                                <Separator className="mt-8 !w-full mb-4" />
                                <div className="flex-shrink min-w-0 max-w-full mt-8 mb-6">
                                    <TitleWithUnderline text="Pictures" underlineWidth={64} fontSize={3} />
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
                                                No images uploaded
                                            </div>
                                        )}

                                        <button className="w-full gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                            Request to Contact
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>

                <div className='text-end'>
                    I have read and accept the <span className='text-[#880002] underline'>Terms & Conditions</span>
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
        </div>
    );
};

export default Summary;