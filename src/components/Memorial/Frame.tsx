"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Check } from 'lucide-react';

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
            return 'with no extra addons';
        }
        return `with ${selectedAddon.map((addon: any) => addon.name).join(', ')} addon${selectedAddon.length > 1 ? 's' : ''}`;
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
                        Hi {profile?.username || 'there'}, Our deepest condolences.
                    </h3>
                    <p className="text-center text-gray-500 mb-4 text-primary">
                        You have selected a {getDuration()} days '{getPlanName()}' package, <span className='text-[#880002]'>{getAddonInfo()}</span>
                    </p>
                </div>
                <div className="flex-shrink min-w-0 mb-8">
                    <TitleWithUnderline text="Add a Frame" underlineWidth={64} />
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
                                            alt={`Frame ${idx + 1}`}
                                            className="object-cover md:h-48 md:!w-48 aspect-square"
                                        />
                                        {selectedFrame === frame._id && (
                                            <div className="absolute -top-2 -right-2 bg-[#699635] text-white text-xs rounded-full p-1 shadow-md">
                                                <Check className="w-5 h-5" />
                                            </div>
                                        )}
                                        <p className="mt-2 text-sm text-gray-700">Frame {idx + 1}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-8">
                                No frames available for this plan.
                            </div>
                        )}
                    </div>
                    <div className='bg-[#F8D7DA] mt-4 p-2 text-sm text-red-800 rounded'>
                        Select a frame style in which you wish to display the primary image
                    </div>
                </div>
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        onClick={() => setActiveStep(6)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6"
                        type="button"
                    >
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
                                setActiveStep(8);
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

export default Frame;
