"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React, { useState, useEffect } from 'react';

interface InformationProps {
    selectedPlan: any;
    setActiveStep: (step: number) => void;
    language: string;
    selectedCountryId: string;
    selectedAddon?: any;
    profile?: any;
    onFormDataChange?: (formData: FormData) => void;
    initialFormData?: FormData;
}

interface FormData {
    title: string;
    shortDescription: string;
    address: string;
    dateOfBirth: string;
    dateOfDeath: string;
    description: string;
    tributeVideo: string;
}

const Information: React.FC<InformationProps> = ({
    selectedPlan,
    setActiveStep,
    language,
    selectedCountryId,
    selectedAddon,
    profile,
    onFormDataChange,
    initialFormData
}) => {
    const [formData, setFormData] = useState<FormData>({
        title: initialFormData?.title || '',
        shortDescription: initialFormData?.shortDescription || '',
        address: initialFormData?.address || '',
        dateOfBirth: initialFormData?.dateOfBirth || '',
        dateOfDeath: initialFormData?.dateOfDeath || '',
        description: initialFormData?.description || '',
        tributeVideo: initialFormData?.tributeVideo || ''
    });

    const [wordCount, setWordCount] = useState(0);
    const [shortDescWordCount, setShortDescWordCount] = useState(0);

    // Initialize word count from initial form data
    useEffect(() => {
        if (initialFormData?.description) {
            const words = initialFormData.description.trim().split(/\s+/).filter((word: string) => word.length > 0);
            setWordCount(words.length);
        }
        if (initialFormData?.shortDescription) {
            const shortWords = initialFormData.shortDescription.trim().split(/\s+/).filter((word: string) => word.length > 0);
            setShortDescWordCount(shortWords.length);
        }
    }, [initialFormData]);

    // Validation function to check if all required fields are filled
    const isFormValid = () => {
        return formData.title.trim() !== '' &&
               formData.address.trim() !== '' &&
               formData.dateOfBirth !== '' &&
               formData.dateOfDeath !== '';
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

    // Get word limit
    const getWordLimit = () => {
        return selectedPlan?.wordLimit || 2000;
    };

    // Get addon info
    const getAddonInfo = () => {
        if (!selectedAddon || selectedAddon.length === 0) {
            return 'with no extra addons';
        }
        return `with ${selectedAddon.map((addon: any) => addon.name).join(', ')} addon${selectedAddon.length > 1 ? 's' : ''}`;
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        const updatedFormData = {
            ...formData,
            [field]: value
        };
        setFormData(updatedFormData);

        // Notify parent component of form data changes
        if (onFormDataChange) {
            onFormDataChange(updatedFormData);
        }

        // Count words for description field
        if (field === 'description') {
            const words = value.trim().split(/\s+/).filter(word => word.length > 0);
            setWordCount(words.length);
        }

        // Count words for short description field
        if (field === 'shortDescription') {
            const words = value.trim().split(/\s+/).filter(word => word.length > 0);
            setShortDescWordCount(words.length);
        }
    };

    useEffect(() => {
        console.log({
            "selectedPlan": selectedPlan,
            "selectedAddon": selectedAddon,
            "selectedCountryId": selectedCountryId,
            "profile": profile,
            "language": language,
            "formData": formData
        })
    }, [formData]);

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
                    <TitleWithUnderline text="Information" underlineWidth={64} />
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className={`pb-2 block`}>
                        Title &#40;Name of Deceased&#41;<span className="text-[#880002]">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        required
                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="shortDescription" className={`pb-2 block`}>
                        Short Description
                    </label>
                    <textarea
                        id="shortDescription"
                        rows={2}
                        value={formData.shortDescription}
                        onChange={(e) => {
                            const words = e.target.value.trim().split(/\s+/).filter(word => word.length > 0);
                            if (words.length <= 10 || e.target.value === '') {
                                handleInputChange('shortDescription', e.target.value);
                            }
                        }}
                        className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                        placeholder="Maximum 10 words allowed"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                        {shortDescWordCount}/10 words used
                    </p>
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className={`pb-2 block`}>
                        Address <span className="text-[#880002]">*</span>
                    </label>
                    <input
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dateOfBirth" className={`pb-2 block`}>
                        Date of Birth<span className="text-[#880002]">*</span>
                    </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        required
                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dateOfDeath" className={`pb-2 block`}>
                        Date of Death<span className="text-[#880002]">*</span>
                    </label>
                    <input
                        type="date"
                        id="dateOfDeath"
                        value={formData.dateOfDeath}
                        onChange={(e) => handleInputChange('dateOfDeath', e.target.value)}
                        required
                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => {
                            const words = e.target.value.trim().split(/\s+/).filter(word => word.length > 0);
                            if (words.length <= getWordLimit() || e.target.value === '') {
                                handleInputChange('description', e.target.value);
                            }
                        }}
                        className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                        placeholder={`Maximum ${getWordLimit()} words allowed`}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                        {wordCount}/{getWordLimit()} words used
                    </p>
                </div>
                {selectedPlan?.isTributeVideoUploading && (
                    <div className="mb-4">
                        <label htmlFor="tributeVideo" className={`pb-2 block`}>
                            Tribute Video
                        </label>
                        <input
                            type="url"
                            id="tributeVideo"
                            value={formData.tributeVideo}
                            onChange={(e) => handleInputChange('tributeVideo', e.target.value)}
                            className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                            placeholder="Enter YouTube video URL"
                        />
                        <span className='text-xs text-gray-600 mt-1 block'>
                            Create a tribute video and upload it to YouTube. Then copy and paste its link here to show it in your tribute.
                        </span>
                    </div>
                )}
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                        Back
                    </button>
                    <button
                        type="button"
                        className={`gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap rounded min-h-6 ${
                            isFormValid() 
                                ? 'bg-[#0D1322] hover:bg-[#1a2647] cursor-pointer' 
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() => {
                            if (isFormValid()) {
                                setActiveStep(4);
                            }
                        }}
                        disabled={!isFormValid()}
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Information;