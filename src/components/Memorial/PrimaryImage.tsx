"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React, { useEffect, useState, DragEvent } from 'react';
import Image from "next/image";

interface PrimaryImageProps {
    selectedPlan: any;
    profile: any;
    language: string;
    selectedAddon?: any;
    selectedCountryId: string;
    informationFormData?: any;
    contactData?: any;
    initialImageData?: File | null;
    thumbnailImage?: File | null;
    onImageDataChange?: (imageData: File | null) => void;
    setActiveStep: (step: number) => void;
}

const PrimaryImage: React.FC<PrimaryImageProps> = ({ 
    selectedPlan,
    profile,
    language,
    selectedAddon,
    selectedCountryId,
    informationFormData,
    contactData,
    initialImageData,
    thumbnailImage,
    onImageDataChange,
    setActiveStep 
}) => {
    const [image, setImage] = useState<File | null>(initialImageData || null);
    const [preview, setPreview] = useState<string | null>(
        initialImageData ? URL.createObjectURL(initialImageData) : null
    );

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

    // Validation function to check if image is selected
    const isFormValid = () => {
        return image !== null;
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = Array.from(e.dataTransfer.files)
            .find(file => file.type.startsWith("image/") || file.type === "image/heic" || file.name.toLowerCase().endsWith('.heic'));

        if (droppedFile) {
            if (preview) URL.revokeObjectURL(preview);
            setImage(droppedFile);
            setPreview(URL.createObjectURL(droppedFile));
            
            // Notify parent component of image change
            if (onImageDataChange) {
                onImageDataChange(droppedFile);
            }
        }
    };

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = Array.from(e.target.files ?? [])
            .find(file => file.type.startsWith("image/") || file.type === "image/heic" || file.name.toLowerCase().endsWith('.heic'));

        if (selectedFile) {
            if (preview) URL.revokeObjectURL(preview);
            setImage(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            
            // Notify parent component of image change
            if (onImageDataChange) {
                onImageDataChange(selectedFile);
            }
        }
    };

    const removeImage = () => {
        if (preview) URL.revokeObjectURL(preview);
        setImage(null);
        setPreview(null);
        
        // Notify parent component of image removal
        if (onImageDataChange) {
            onImageDataChange(null);
        }
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
            "selectedImage": image,
            "imagePreview": preview
        });
    }, [selectedPlan, selectedAddon, selectedCountryId, profile, language, informationFormData, contactData, image, preview]);

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
                    <TitleWithUnderline text="Primary Image" underlineWidth={64} />
                </div>
                <div className="w-full">
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="border-2 min-h-[15rem] border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center text-center bg-white hover:border-primary transition"
                    >
                        {preview && (
                            <div className=" flex justify-center items-center flex-wrap ">
                                <div className="relative group">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className=" md:h-48 aspect-square object-cover  shadow"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        )}
                        {!preview && (
                            <>
                                <p className="text-gray-500 mb-2">Drag & drop image here or click to browse</p>
                                <label className="cursor-pointer text-white bg-primary px-8 py-2">
                                    Browse File...
                                    <input
                                        type="file"
                                        accept="image/*,.heic"
                                        onChange={handleBrowse}
                                        className="hidden"
                                    />
                                </label>
                            </>
                        )}
                    </div>
                    <div className='bg-[#F8D7DA] mt-4 p-4 rounded'>
                        <strong>Recommended image size:</strong> 400x400 pixels (1:1 aspect ratio)<br />
                        <strong>Recommended image type:</strong> JPEG, PNG, WebP, or HEIC<br />
                        <strong>Image max size:</strong> 5 MB<br />
                        <strong>Note:</strong> You can upload only 1 primary image
                    </div>
                </div>
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        type="button"
                        onClick={() => setActiveStep(5)}
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
                                setActiveStep(7);
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

export default PrimaryImage;