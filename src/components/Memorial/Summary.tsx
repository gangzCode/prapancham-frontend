"use client";
import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Separator } from '../ui/separator';
import DonateModal from '../obituary/DonateModal';
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
    const [activeTab, setActiveTab] = useState("");
    const [activeColor, setActiveColor] = useState("bg-gray-100");
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [primaryPreview, setPrimaryPreview] = useState<string | null>(null);
    const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        const planPrice = selectedPlan?.price || 0;
        const addonPrice = selectedAddon?.reduce((total: number, addon: any) => total + (addon.price || 0), 0) || 0;
        return planPrice + addonPrice;
    };

    // Get currency
    const getCurrency = () => {
        return selectedPlan?.currency || 'USD';
    };

    // Get plan features
    const getPlanFeatures = () => {
        const features = [];

        // Add base plan description
        const description = selectedPlan?.description?.[language];
        if (description && description[0]) {
            features.push(description[0].value);
        }

        // Add selected addons
        if (selectedAddon && selectedAddon.length > 0) {
            selectedAddon.forEach((addon: any) => {
                features.push(addon.name);
            });
        }

        return features;
    };

    const calculateAge = (dateOfBirth: string, dateOfDeath: string) => {
        const birthDate = new Date(dateOfBirth);
        const deathDate = dateOfDeath ? new Date(dateOfDeath) : new Date();
        let age = deathDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = deathDate.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && deathDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const handlePay = () => {
        setActiveTab("success");
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


    return (
        <div className='p-4 md:p-8 lg:px-16 bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]'>
            <form>
                <div className="p-4 mb-6">
                    <h3 className="text-xl font-semibold text-center mb-4 text-primary">
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
                            <p>{feature}</p>
                            <div className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-500">
                                <Check className="text-black w-4 h-4" />
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
                            { colorCode: "#ffffff" },
                        ]).map((colorObj: any, index: number) => {
                            const color = colorObj?.colorCode || colorObj;
                            return (
                                <button
                                    key={color}
                                    className="w-8 h-8 rounded-full flex items-center justify-center relative border-2 border-gray-400 bg-white"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveColor(color);
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
                                            {'Our deepest condolences'}
                                        </h1>

                                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
                                            <div className="text-gray-500 text-center flex md:flex-col">
                                                <p>Birth<span className="md:hidden mr-1 ml-1">:</span></p>
                                                <p>{informationFormData?.dateOfBirth ? new Date(informationFormData.dateOfBirth).toLocaleDateString() : 'Birth date'}</p>
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
                                                <p>{informationFormData?.dateOfDeath ? new Date(informationFormData.dateOfDeath).toLocaleDateString() : 'Death date'}</p>
                                            </div>
                                        </div>

                                        <h1 className="text-xl font-bold text-primary mb-6">
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
                                                        <div className="w-full relative">
                                                            <img
                                                                src={additionalPreviews[currentImageIndex]}
                                                                alt={`Additional image ${currentImageIndex + 1}`}
                                                                className="w-full aspect-square object-cover rounded shadow-md"
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
                                                        <p className="text-center text-sm text-gray-500 mt-2">
                                                            {additionalPreviews.length} image{additionalPreviews.length !== 1 ? 's' : ''}
                                                        </p>
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
                                    <p className="text-gray-500">Birth Date: {informationFormData?.dateOfBirth ? new Date(informationFormData.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
                                    <p className="text-gray-500">Death Date: {informationFormData?.dateOfDeath ? new Date(informationFormData.dateOfDeath).toLocaleDateString() : 'Not provided'}</p>
                                    <p className="text-gray-500">Age: {informationFormData?.dateOfBirth && informationFormData?.dateOfDeath ? calculateAge(informationFormData.dateOfBirth, informationFormData.dateOfDeath) : 'Not provided'}</p>
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
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        type="button"
                        onClick={() => setActiveStep(9)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                        Back
                    </button>
                    <button
                        type="button"
                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 "
                        onClick={(e => {
                            e.preventDefault();
                            setActiveTab("payment");
                        }
                        )}
                    >
                        Continue to Pay
                    </button>
                </div>
                {activeTab &&
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 ">

                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={(e => {
                                e.preventDefault();
                                setActiveTab("");
                            }
                            )}
                        ></div>


                        <div className="relative bg-white p-8  shadow-lg  max-w-full z-50 overflow-y-auto  overflow-x-hidden thin-scrollbar">
                            <button
                                onClick={(e => {
                                    e.preventDefault();
                                    setActiveTab("");
                                }
                                )}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-full p-2 border-2 border-black w-8 h-8 flex items-center justify-center"
                            ><X className="w-8 h-8 text-black" strokeWidth={4} />

                            </button>

                            {activeTab === "payment" && (
                                <>
                                {/* <DonateModal
                                     isOpen={true}
                                     onClose={() => setActiveTab("donate")}
                                     obituaryEntry={entry}
                                 /> */}
                                </>
                            )}
                            {activeTab === "success" &&
                                <></>
                            }
                        </div>
                    </div>}
            </form>
        </div>
    );
};

export default Summary;