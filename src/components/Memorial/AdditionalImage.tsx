"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React, { useEffect, useState, DragEvent } from 'react';
import Image from "next/image";
import { CirclePlus } from 'lucide-react';

interface AdditionalImageProps {
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
    initialImages?: File[] | null;
    onImagesDataChange?: (images: File[]) => void;
    setActiveStep: (step: number) => void;
}

const AdditionalImage: React.FC<AdditionalImageProps> = ({ 
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
    initialImages,
    onImagesDataChange,
    setActiveStep 
}) => {
    const [images, setImages] = useState<File[]>(initialImages || []);
    const [previews, setPreviews] = useState<string[]>(
        initialImages ? initialImages.map(file => URL.createObjectURL(file)) : []
    );

    // Get the maximum number of additional images allowed
    const getMaxImages = () => {
        return selectedPlan?.noofAdditionalImages || 5;
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

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const maxImages = getMaxImages();
        const availableSlots = maxImages - images.length;
        
        if (availableSlots <= 0) return;

        const droppedFiles = Array.from(e.dataTransfer.files)
            .filter(file => file.type.startsWith("image/") || file.type === "image/heic" || file.name.toLowerCase().endsWith('.heic'))
            .slice(0, availableSlots);
        
        const newPreviews = droppedFiles.map(file => URL.createObjectURL(file));
        const updatedImages = [...images, ...droppedFiles];
        const updatedPreviews = [...previews, ...newPreviews];

        setImages(updatedImages);
        setPreviews(updatedPreviews);
        
        // Notify parent component of images change
        if (onImagesDataChange) {
            onImagesDataChange(updatedImages);
        }
    };

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxImages = getMaxImages();
        const availableSlots = maxImages - images.length;
        
        if (availableSlots <= 0) return;

        const selectedFiles = Array.from(e.target.files ?? [])
            .filter(file => file.type.startsWith("image/") || file.type === "image/heic" || file.name.toLowerCase().endsWith('.heic'))
            .slice(0, availableSlots);
        
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        const updatedImages = [...images, ...selectedFiles];
        const updatedPreviews = [...previews, ...newPreviews];

        setImages(updatedImages);
        setPreviews(updatedPreviews);
        
        // Notify parent component of images change
        if (onImagesDataChange) {
            onImagesDataChange(updatedImages);
        }
    };

    const removeImage = (index: number) => {
        const updatedImages = [...images];
        const updatedPreviews = [...previews];

        updatedImages.splice(index, 1);
        URL.revokeObjectURL(previews[index]);
        updatedPreviews.splice(index, 1);

        setImages(updatedImages);
        setPreviews(updatedPreviews);
        
        // Notify parent component of images change
        if (onImagesDataChange) {
            onImagesDataChange(updatedImages);
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
            "thumbnailImage": thumbnailImage,
            "primaryImage": primaryImage,
            "frameData": frameData,
            "maxImages": getMaxImages(),
            "selectedImages": images,
            "imagePreviews": previews
        });
    }, [selectedPlan, selectedAddon, selectedCountryId, profile, language, informationFormData, contactData, thumbnailImage, primaryImage, frameData, images, previews]);

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
                    <TitleWithUnderline text="Additional Images" underlineWidth={64} />
                </div>
                <div className="w-full">
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="border-2 md:h-60 border-gray-300 p-4 md:p-16 rounded-lg flex flex-col items-center justify-center text-center bg-white hover:border-primary transition"
                    >
                        {previews.length > 0 && (
                            <div className=" flex justify-center items-center flex-wrap gap-8">
                                {previews.map((src, idx) => (
                                    <div key={idx} className="relative group">
                                        <img
                                            src={src}
                                            alt={`Preview ${idx + 1}`}
                                            className=" md:h-48 object-cover aspect-square"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                {previews.length < getMaxImages() && (
                                    <div className="relative group">
                                        <div className="border-2 rounded h-48 aspect-square border-dashed border-gray-300 flex items-center justify-center p-4 min-h-48">
                                            <div className="text-center">
                                                <label htmlFor="imageUpload" className="cursor-pointer">
                                                    <CirclePlus className="w-7 h-7 text-primary mx-auto mb-2" strokeWidth={2} />
                                                </label>

                                <input
                                    id="imageUpload"
                                    type="file"
                                    accept="image/*,.heic"
                                    multiple
                                    onChange={handleBrowse}
                                    className="hidden"
                                />                                                <p className="text-primary mt-2">
                                                    {getMaxImages() - previews.length} more images left
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {previews.length === 0 && (
                            <div>
                                <p className="text-gray-500 mb-2">Drag & drop images here or click to browse</p>
                                <label className="cursor-pointer text-white bg-primary px-8 py-2">
                                    Browse Files...
                                    <input
                                        type="file"
                                        accept="image/*,.heic"
                                        multiple
                                        onChange={handleBrowse}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="bg-[#F8D7DA] mt-4 p-4 rounded">
                        <strong>Recommended image size:</strong> 400x400 pixels (1:1 aspect ratio)<br />
                        <strong>Recommended image type:</strong> JPEG, PNG, WebP, or HEIC<br />
                        <strong>Image max size:</strong> 5 MB<br />
                        <strong>Note:</strong> You can upload up to {getMaxImages()} additional images
                    </div>

                </div>
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        type="button"
                        onClick={() => setActiveStep(7)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                        Back
                    </button>
                    <button
                        type="button"
                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6"
                        onClick={() => setActiveStep(9)}
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdditionalImage;