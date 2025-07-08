"use client";

import FAQ from '@/components/Memorial/FAQ';
import Plans from '@/components/Memorial/Plans';
import Information from '@/components/Memorial/Information';
import ContactDetailsForm from '@/components/Memorial/ContactDetailsForm';
import AdvertisementSidebar from '@/components/news-category/AdvertisementSidebar';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Import, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import PrimaryImage from '@/components/Memorial/PrimaryImage';
import Frame from '@/components/Memorial/Frame';
import AdditionalImage from '@/components/Memorial/AdditionalImage';
import AccoundDetails from '@/components/Memorial/AccoundDetails';
import Summary from '@/components/Memorial/Summary';
import SignupModal from '@/components/siginin/SignupModal ';
import useSWR from 'swr';
import { useLanguage } from "@/components/ui/LanguageProvider";
import CountrySelector from '@/components/create-Memorial/CountrySelector';
import PlanSelector from '@/components/create-Memorial/PlanSelector';
import PlanSummary from '@/components/create-Memorial/PlanSummary';
import ThumbnailImage from '@/components/Memorial/ThumbnailImage';

// Define interfaces for ad types and advertisements
interface AdType {
  _id: string;
  imageSize: string;
  isDeleted: boolean;
  type: string;
  isActive: boolean;
  __v: number;
}

interface AdTypesResponse {
  adTypes: AdType[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
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

const fetcher = (url: string | URL | Request) => fetch(url).then(res => res.json());

const CreateMemorialPage: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [selectedAddon, setSelectedAddon] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCountryId, setSelectedCountryId] = useState('');
    const [informationFormData, setInformationFormData] = useState<any>(null);
    const [contactDetailsData, setContactDetailsData] = useState<any>(null);
    const [thumbnailImageData, setThumbnailImageData] = useState<File | null>(null);
    const [primaryImageData, setPrimaryImageData] = useState<File | null>(null);
    const [frameData, setFrameData] = useState<any>(null);
    const [additionalImagesData, setAdditionalImagesData] = useState<File[]>([]);
    const [accountDetailsData, setAccountDetailsData] = useState<any>(null);
    const { language } = useLanguage();

    // Fetch ad types to get Billboard and Sidebar Banner ad type IDs
    const { data: adTypesData } = useSWR<AdTypesResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/advertistment/ad-type/active?page=1&limit=10`,
        fetcher
    );

    // Find Billboard and Sidebar Banner ad type IDs
    const billboardAdType = adTypesData?.adTypes?.find(type => type.type === 'Billboard');
    const sidebarBannerAdType = adTypesData?.adTypes?.find(type => type.type === 'Sidebar Banner');
    const billboardAdTypeId = billboardAdType?._id;
    const sidebarBannerAdTypeId = sidebarBannerAdType?._id;

    // Fetch Billboard ads for create-memorial page
    const { data: billboardAds } = useSWR<Advertisement[]>(
        billboardAdTypeId 
            ? `${process.env.NEXT_PUBLIC_API_URL}/advertistment/by-ad-type-ad-page?adType=${billboardAdTypeId}&adPageName=create-memorial`
            : null,
        fetcher
    );

    // Fetch Sidebar Banner ads for create-memorial page
    const { data: sidebarBannerAds } = useSWR<Advertisement[]>(
        sidebarBannerAdTypeId 
            ? `${process.env.NEXT_PUBLIC_API_URL}/advertistment/by-ad-type-ad-page?adType=${sidebarBannerAdTypeId}&adPageName=create-memorial`
            : null,
        fetcher
    );

    // console.log("selectedplan", selectedPlan);

    let langKey: LanguageKey;

    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";
    else langKey = "en";
    type LanguageKey = 'en' | 'ta' | 'si';

    const [profile, setProfile] = useState({
        username: '',
        email: '',
        phone: '',
        country: '',
        address: '',
        image: '',
        imageFile: null as File | null,
    });

    useEffect(() => {
        const checkAuth = () => {
            const user = localStorage.getItem("user");
            if (user) {
                try {
                    const token = localStorage.getItem("accessToken");
                    if (token) {
                        const decodedToken = JSON.parse(atob(token.split(".")[1]));
                        const currentTime = Math.floor(Date.now() / 1000);
                        if (decodedToken.exp && decodedToken.exp > currentTime) {
                            setIsModalOpen(false);
                            return;
                        }
                    }
                } catch (error) { }
            }
            setIsModalOpen(true);
        };
        checkAuth();
    }, [isModalOpen]);
    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            const user = JSON.parse(userStr);
            setProfile((prev) => ({
                ...prev,
                username: user.username || '',
                email: user.email || '',
                phone: user.phone || '',
                country: user.country || '',
                address: user.address || '',
                image: user.image || '',
            }));
        }
    }, [isModalOpen]);


    const handleClose = () => {
        const user = localStorage.getItem("user");
        let isAuthValid = false;
        if (user) {
            try {
                const token = localStorage.getItem("accessToken");
                if (token) {
                    const decodedToken = JSON.parse(atob(token.split(".")[1]));
                    const currentTime = Math.floor(Date.now() / 1000);
                    if (decodedToken.exp && decodedToken.exp > currentTime) {
                        isAuthValid = true;
                    }
                }
            } catch (error) { }
        }
        if (!isAuthValid && typeof window !== "undefined") {
            window.history.back();
        } else {
            setIsModalOpen(false);
        }
    };


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [activeStep]);


    const handleChange = (event: { target: { value: string; }; }) => {
        if (event.target.value !== "") {
            setActiveStep(1);
        }
    };
    if (!isModalOpen) {
        return (
            <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16  py-6 max-md:px-5">
                {activeStep === 0 &&
                    <CountrySelector
                        selectedCountryId={selectedCountryId}
                        onChange={setSelectedCountryId}
                        language={langKey}
                        setActiveStep={setActiveStep}
                    />
                }
                {activeStep === 1 &&
                    <div className="text-center mt-8">
                        <div className="flex items-center space-x-2 p-4">
                            <div className="bg-primary text-white rounded-full p-2">
                                <ArrowLeft
                                    onClick={() => setActiveStep(0)}
                                    className='cursor-pointer'
                                />
                            </div>
                            <span className="text-primary text-lg">
                                {langKey === "ta"
                                    ? "பின்செல்"
                                    : langKey === "si"
                                        ? "ආපසු යන්න"
                                        : "Go back"}
                            </span>
                        </div>
                        <PlanSelector
                            selectedPlan={selectedPlan}
                            setSelectedPlan={setSelectedPlan}
                            setActiveStep={setActiveStep}
                            language={langKey}
                            selectedCountryId={selectedCountryId}
                        />

                    </div>
                }
                {activeStep === 2 &&
                    <PlanSummary
                        selectedPlan={selectedPlan}
                        profile={profile}
                        language={langKey}
                        setSelectedAddon={setSelectedAddon}
                        selectedAddon={selectedAddon}
                        selectedCountryId={selectedCountryId}
                        setActiveStep={setActiveStep}
                    />

                }
                {activeStep === 3 &&
                    <Information
                        selectedPlan={selectedPlan}
                        profile={profile}
                        language={langKey}
                        selectedAddon={selectedAddon}
                        selectedCountryId={selectedCountryId}
                        setActiveStep={setActiveStep}
                        onFormDataChange={setInformationFormData}
                        initialFormData={informationFormData}
                    />
                }
                {activeStep === 4 &&
                    <ContactDetailsForm
                        selectedPlan={selectedPlan}
                        profile={profile}
                        language={langKey}
                        selectedAddon={selectedAddon}
                        selectedCountryId={selectedCountryId}
                        informationFormData={informationFormData}
                        initialContactData={contactDetailsData}
                        onContactDataChange={setContactDetailsData}
                        setActiveStep={setActiveStep}
                    />
                }
                {activeStep === 5 &&
                    <ThumbnailImage
                        selectedPlan={selectedPlan}
                        profile={profile}
                        language={langKey}
                        selectedAddon={selectedAddon}
                        selectedCountryId={selectedCountryId}
                        informationFormData={informationFormData}
                        contactData={contactDetailsData}
                        initialImageData={thumbnailImageData}
                        onImageDataChange={setThumbnailImageData}
                        setActiveStep={setActiveStep}
                    />
                }
                {activeStep === 6 &&
                    <PrimaryImage
                        selectedPlan={selectedPlan}
                        profile={profile}
                        language={langKey}
                        selectedAddon={selectedAddon}
                        selectedCountryId={selectedCountryId}
                        informationFormData={informationFormData}
                        contactData={contactDetailsData}
                        thumbnailImage={thumbnailImageData}
                        initialImageData={primaryImageData}
                        onImageDataChange={setPrimaryImageData}
                        setActiveStep={setActiveStep}
                    />
                }
                {activeStep === 7 &&
                    <Frame
                        selectedPlan={selectedPlan}
                        profile={profile}
                        language={langKey}
                        selectedAddon={selectedAddon}
                        selectedCountryId={selectedCountryId}
                        informationFormData={informationFormData}
                        contactData={contactDetailsData}
                        thumbnailImage={thumbnailImageData}
                        primaryImage={primaryImageData}
                        initialSelectedFrame={frameData?._id || null}
                        onFrameDataChange={setFrameData}
                        setActiveStep={setActiveStep}
                    />
                }
                {activeStep === 8 &&
                    <AdditionalImage
                        selectedPlan={selectedPlan}
                        profile={profile}
                        language={langKey}
                        selectedAddon={selectedAddon}
                        selectedCountryId={selectedCountryId}
                        informationFormData={informationFormData}
                        contactData={contactDetailsData}
                        thumbnailImage={thumbnailImageData}
                        primaryImage={primaryImageData}
                        frameData={frameData}
                        initialImages={additionalImagesData}
                        onImagesDataChange={setAdditionalImagesData}
                        setActiveStep={setActiveStep}
                    />
                }
                {activeStep === 9 &&
                    <AccoundDetails
                        selectedPlan={selectedPlan}
                        profile={profile}
                        language={langKey}
                        selectedAddon={selectedAddon}
                        selectedCountryId={selectedCountryId}
                        informationFormData={informationFormData}
                        contactData={contactDetailsData}
                        thumbnailImage={thumbnailImageData}
                        primaryImage={primaryImageData}
                        frameData={frameData}
                        additionalImagesData={additionalImagesData}
                        initialAccountData={accountDetailsData}
                        onAccountDataChange={setAccountDetailsData}
                        setActiveStep={setActiveStep}
                    />
                }
                {activeStep === 10 &&
                    <Summary
                        selectedPlan={selectedPlan}
                        profile={profile}
                        language={langKey}
                        selectedAddon={selectedAddon}
                        selectedCountryId={selectedCountryId}
                        informationFormData={informationFormData}
                        contactData={contactDetailsData}
                        thumbnailImage={thumbnailImageData}
                        primaryImage={primaryImageData}
                        frameData={frameData}
                        additionalImagesData={additionalImagesData}
                        accountDetailsData={accountDetailsData}
                        setActiveStep={setActiveStep}
                    />
                }
                {(activeStep === 0 || activeStep === 1) &&
                    <div>
                        <div className="my-16 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                {billboardAds && billboardAds.length > 0 ? (
                                    <a 
                                        href={billboardAds[0].link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <img
                                            src={billboardAds[0].image}
                                            alt="Advertisement"
                                            className="w-full md:max-h-[232px] max-h-[232px] object-cover"
                                        />
                                    </a>
                                ) : (
                                    <div className="w-full md:max-h-[232px] max-h-[232px] bg-red-600 flex items-center justify-center">
                                        <div className="text-center text-white p-4">
                                            <h3 className="text-lg font-semibold mb-2">Ad Space Available</h3>
                                            <p className="text-sm">Contact us for advertising opportunities</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='md:col-span-1'>
                                {sidebarBannerAds && sidebarBannerAds.length > 0 ? (
                                    <a 
                                        href={sidebarBannerAds[0].link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <img
                                            src={sidebarBannerAds[0].image}
                                            alt="Advertisement"
                                            className="w-full md:max-h-[232px] max-h-[232px] object-cover"
                                        />
                                    </a>
                                ) : (
                                    <div className="w-full md:max-h-[232px] max-h-[232px] bg-red-600 flex items-center justify-center">
                                        <div className="text-center text-white p-4">
                                            <h3 className="text-lg font-semibold mb-2">Ad Space Available</h3>
                                            <p className="text-sm">Contact us for advertising opportunities</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 ">
                            <div className="md:col-span-2 pr-8 md:border-r border-gray-500">
                                <FAQ />
                            </div>

                            {/* Right side advertisement section - 1/3 width on desktop */}
                            <div className="md:col-span-1 pl-8">
                                <AdvertisementSidebar 
                                numberOfAds={4}
                                adPageName='create-memorial'
                                 />
                            </div>
                        </div>
                    </div>
                }
            </section>
        );
    }
    return <SignupModal isOpen={isModalOpen} onClose={handleClose} />;
};

export default CreateMemorialPage;