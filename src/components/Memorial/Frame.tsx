"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Check } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageProvider';

interface FrameProps {
    selectedPlan: any;
    profile: any;
    language: string;
    selectedAddon?: any;
    selectedCountryId: string;
    informationFormData?: any;
    contactData?: any;
    thumbnailImage?: File | null;
    primaryImage?: File | null;
    initialSelectedFrame?: string | null;
    onFrameDataChange?: (frameData: any) => void;
    setActiveStep: (step: number) => void;
}

interface FrameItem {
    _id: string;
    frameImage: string;
    isDeleted: boolean;
    isActive: boolean;
}

const Frame: React.FC<FrameProps> = ({ 
    selectedPlan,
    profile,
    language,
    selectedAddon,
    selectedCountryId,
    informationFormData,
    contactData,
    thumbnailImage,
    primaryImage,
    initialSelectedFrame,
    onFrameDataChange,
    setActiveStep 
}) => {
    const { language: langKey } = useLanguage();
    
    const translations = {
        english: {
            greeting: "Hi {username}, Our deepest condolences.",
            greetingAnonymous: "Hi there, Our deepest condolences.",
            packageInfo: "You have selected a {duration} days '{planName}' package,",
            addFrameTitle: "Add a Frame",
            frameAltText: "Frame {number}",
            frameLabel: "Frame {number}",
            noFramesMessage: "No frames available for this plan.",
            frameInstruction: "Select a frame style in which you wish to display the primary image",
            backButton: "Back",
            nextButton: "Next",
            withNoExtraAddons: "with no extra addons",
            with: "with",
            addon: "addon",
            addons: "addons"
        },
        tamil: {
            greeting: "வணக்கம் {username}, எங்கள் ஆழ்ந்த இரங்கல்கள்.",
            greetingAnonymous: "வணக்கம், எங்கள் ஆழ்ந்த இரங்கல்கள்.",
            packageInfo: "நீங்கள் {duration} நாட்கள் '{planName}' தொகுப்பை தேர்ந்தெடுத்துள்ளீர்கள்,",
            addFrameTitle: "சட்டம் சேர்க்கவும்",
            frameAltText: "சட்டம் {number}",
            frameLabel: "சட்டம் {number}",
            noFramesMessage: "இந்த திட்டத்திற்கு சட்டங்கள் எதுவும் கிடைக்கவில்லை.",
            frameInstruction: "முதன்மை படத்தை காட்ட விரும்பும் சட்ட பாணியை தேர்ந்தெடுக்கவும்",
            backButton: "பின்",
            nextButton: "அடுத்து",
            withNoExtraAddons: "கூடுதல் சேவைகள் இல்லாமல்",
            with: "உடன்",
            addon: "சேவை",
            addons: "சேவைகள்"
        },
        sinhala: {
            greeting: "ආයුබෝවන් {username}, අපගේ ගැඹුරු සානුකම්පනාව.",
            greetingAnonymous: "ආයුබෝවන්, අපගේ ගැඹුරු සානුකම්පනාව.",
            packageInfo: "ඔබ දින {duration} ක '{planName}' පැකේජයක් තෝරාගෙන ඇත,",
            addFrameTitle: "රාමුවක් එකතු කරන්න",
            frameAltText: "රාමුව {number}",
            frameLabel: "රාමුව {number}",
            noFramesMessage: "මෙම සැලැස්ම සඳහා රාමු නොමැත.",
            frameInstruction: "ප්‍රධාන රූපය ප්‍රදර්ශනය කිරීමට ඔබ කැමති රාමු ශෛලිය තෝරන්න",
            backButton: "ආපසු",
            nextButton: "ඊළඟ",
            withNoExtraAddons: "අමතර සේවා නොමැතිව",
            with: "සමඟ",
            addon: "සේවාව",
            addons: "සේවා"
        }
    };
    
    const t = translations[langKey as keyof typeof translations] || translations.english;
    // Get frames from selectedPlan
    const frames: FrameItem[] = selectedPlan?.primaryImageBgFrames?.filter(
        (frame: FrameItem) => frame.isActive && !frame.isDeleted
    ) || [];

    const [selectedFrame, setSelectedFrame] = useState<string | null>(initialSelectedFrame || null);

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
            return t.withNoExtraAddons;
        }
        const addonText = selectedAddon.length > 1 ? t.addons : t.addon;
        const addonNames = selectedAddon.map((addon: any) => {
            // Use the multilingual name from originalAddon
            const localizedName = addon.originalAddon?.name?.[language]?.[0]?.value;
            return localizedName || addon.name; // Fallback to addon.name if localized name not found
        }).join(', ');
        return `${t.with} ${addonNames} ${addonText}`;
    };

    const handleSelectFrame = (frameId: string) => {
        setSelectedFrame(frameId);
        
        // Find the selected frame data
        const selectedFrameData = frames.find(frame => frame._id === frameId);
        
        // Notify parent component of frame change
        if (onFrameDataChange && selectedFrameData) {
            onFrameDataChange(selectedFrameData);
        }
    };

    // Validation function to check if frame is selected
    const isFormValid = () => {
        return selectedFrame !== null;
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
            "frames": frames,
            "selectedFrame": selectedFrame
        });
    }, [selectedPlan, selectedAddon, selectedCountryId, profile, language, informationFormData, contactData, thumbnailImage, primaryImage, frames, selectedFrame]);

    return (
        <div className='p-4 md:p-8 lg:px-16 bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]'>
            <form>
                <div className="p-4 mb-6">
                    <h3 className="text-2xl md:text-4xl font-bold text-center mb-4 text-primary">
                        {profile?.username 
                            ? t.greeting.replace('{username}', profile.username)
                            : t.greetingAnonymous
                        }
                    </h3>
                    <p className="text-center text-gray-500 mb-4 text-primary">
                        {t.packageInfo
                            .replace('{duration}', getDuration().toString())
                            .replace('{planName}', getPlanName())
                        } <span className='text-[#880002]'>{getAddonInfo()}</span>
                    </p>
                </div>
                <div className="flex-shrink min-w-0 mb-8">
                    <TitleWithUnderline text={t.addFrameTitle} underlineWidth={64} />
                </div>
                <div className="w-full">
                    <div className="border-2 border-gray-300 rounded flex flex-col items-center bg-white p-4">
                        {frames.length > 0 ? (
                            <div className="flex justify-center items-center flex-wrap gap-8">
                                {frames.map((frame, idx) => (
                                    <div
                                        key={frame._id}
                                        className={`relative group cursor-pointer p-1 text-center ${selectedFrame === frame._id ? "border-2 border-[#699635]" : ""
                                            }`}
                                        onClick={() => handleSelectFrame(frame._id)}
                                    >
                                        <img
                                            src={frame.frameImage}
                                            alt={t.frameAltText.replace('{number}', (idx + 1).toString())}
                                            className="object-cover md:h-48 md:!w-48 aspect-square"
                                        />
                                        {selectedFrame === frame._id && (
                                            <div className="absolute -top-2 -right-2 bg-[#699635] text-white text-xs rounded-full p-1 shadow-md">
                                                <Check className="w-5 h-5" />
                                            </div>
                                        )}
                                        <p className="mt-2 text-sm text-gray-700">
                                            {t.frameLabel.replace('{number}', (idx + 1).toString())}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-8">
                                {t.noFramesMessage}
                            </div>
                        )}
                    </div>
                    <div className='bg-[#F8D7DA] mt-4 p-2 text-sm text-red-800 rounded'>
                        {t.frameInstruction}
                    </div>
                </div>
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        onClick={() => setActiveStep(6)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6"
                        type="button"
                    >
                        {t.backButton}
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
                                setActiveStep(8);
                            }
                        }}
                        disabled={!isFormValid()}
                    >
                        {t.nextButton}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Frame;
