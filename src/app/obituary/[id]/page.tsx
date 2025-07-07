"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import DonateModal from '@/components/obituary/DonateModal';
import type { ObituaryEntry } from '@/components/hero/types';
// import { demoData } from "./demoData";
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
    const params = useParams();
    const orderId = params?.id as string;

  const [obituaryData, setObituaryData] = useState<ObituaryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                // const data: ObituaryData = demoData; // Use demo data for now
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-red-500">Error: {error}</div>
            </div>
        );
    }

    if (!obituaryData) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">Obituary not found</div>
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
                                        {obituaryData.information.shortDescription || 'Our deepest condolences'}
                                    </h1>

                                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
                                        <div className="text-gray-500 text-center flex md:flex-col">
                                            <p>Birth<span className="md:hidden mr-1 ml-1">:</span></p>
                                            <p>{obituaryData.information.dateofBirth ? new Date(obituaryData.information.dateofBirth).toLocaleDateString() : 'Birth date'}</p>
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
                                                <p className="text-gray-500 text-sm">No image selected</p>
                                            </div>
                                        )}

                                        <div className="text-gray-500 text-center flex md:flex-col">
                                            <p>Death<span className="md:hidden mr-1 ml-1">:</span></p>
                                            <p>{obituaryData.information.dateofDeath ? new Date(obituaryData.information.dateofDeath).toLocaleDateString() : 'Death date'}</p>
                                        </div>
                                    </div>

                                    <h1 className="text-xl font-bold text-secondary mb-6">
                                        {obituaryData.information.title || 'Memorial Title'}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <p className="text-justify mt-4">
                            {obituaryData.information.description || 'No description provided.'}
                        </p>

                        <div className="flex justify-end gap-2 items-center self-stretch mt-4">
                            <button className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                Post Tribute
                            </button>
                            <button 
                                onClick={openModal}
                                className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]"
                            >
                                Donate
                            </button>
                        </div>

                        <Separator className="mt-4 !w-full" />

                        {/* YouTube Video and Additional Images Section */}
                        {(obituaryData.information.tributeVideo || (obituaryData.additionalImages && obituaryData.additionalImages.length > 0)) && (
                            <div className="mt-8">
                                <div className="flex-shrink min-w-0 max-w-full mb-6">
                                    <TitleWithUnderline text="Media Gallery" underlineWidth={64} fontSize={3} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* YouTube Video Section */}
                                    {obituaryData.information.tributeVideo && (
                                        <div className={`${!obituaryData.additionalImages || obituaryData.additionalImages.length === 0 ? 'md:col-span-2 flex justify-center' : ''}`}>
                                            <div className="bg-white p-4 shadow-md">
                                                <h3 className="text-lg font-semibold mb-4 text-center">Tribute Video</h3>
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
                                                <h3 className="text-lg font-semibold mb-4 text-center">Additional Images</h3>
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
                                <TitleWithUnderline text="Contacts" underlineWidth={64} fontSize={3} />
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

                    {/* Right side sidebar - 1/3 width on desktop */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-2 shadow-md">
                            {/* Overview Section */}
                            <div className="flex-shrink min-w-0 max-w-full mt-2">
                                <TitleWithUnderline text="Overview" underlineWidth={64} fontSize={3} />
                            </div>
                            <div className="space-y-2 mt-2 p-2">
                                <p className="text-gray-500">Name: {obituaryData.information.title || 'Not provided'}</p>
                                <p className="text-gray-500">Birth Date: {obituaryData.information.dateofBirth ? new Date(obituaryData.information.dateofBirth).toLocaleDateString() : 'Not provided'}</p>
                                <p className="text-gray-500">Death Date: {obituaryData.information.dateofDeath ? new Date(obituaryData.information.dateofDeath).toLocaleDateString() : 'Not provided'}</p>
                                <p className="text-gray-500">Age: {obituaryData.information.dateofBirth && obituaryData.information.dateofDeath ? calculateAge(obituaryData.information.dateofBirth, obituaryData.information.dateofDeath) : 'Not provided'}</p>
                                <p>Address: {obituaryData.information.address || 'Not provided'}</p>
                            </div>

                            <Separator className="mt-6 !w-full mb-8" />

                            {/* Poster's Information Section */}
                            <div className="flex-shrink min-w-0 max-w-full mt-4">
                                <TitleWithUnderline text="Poster's Information" underlineWidth={64} fontSize={3} />
                            </div>
                            <div className="space-y-2 mt-2 p-2">
                                <p className="text-[#880002]">{obituaryData.username || 'Name'}</p>
                                <p>Address not provided</p>
                                <p>{obituaryData.username || 'Email not provided'}</p>
                                <p>Phone not provided</p>
                            </div>

                            <button className="w-full gap-2.5 self-stretch px-4 py-3 my-auto mt-4 text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                Request to Contact
                            </button>

                            {/* Account Details Section */}
                            {obituaryData.accountDetails && (
                                <>
                                    <Separator className="mt-6 !w-full mb-4" />
                                    <div className="flex-shrink min-w-0 max-w-full mt-4">
                                        <TitleWithUnderline text="Account Details" underlineWidth={64} fontSize={3} />
                                    </div>
                                    <div className="space-y-2 mt-2 p-2">
                                        <p>Bank: {obituaryData.accountDetails.bankName || 'Not provided'}</p>
                                        <p>Branch: {obituaryData.accountDetails.branchName || 'Not provided'}</p>
                                        <p>Account: {obituaryData.accountDetails.accountNumber || 'Not provided'}</p>
                                        <p>Holder: {obituaryData.accountDetails.accountHolderName || 'Not provided'}</p>
                                    </div>
                                </>
                            )}

                            <Separator className="mt-8 !w-full mb-4" />

                            {/* Pictures Section */}
                            <div className="flex-shrink min-w-0 max-w-full mt-8 mb-6">
                                <TitleWithUnderline text="Pictures" underlineWidth={64} fontSize={3} />
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
                                            No images uploaded
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
        </div>
    );
};

export default ObituaryDetail;
