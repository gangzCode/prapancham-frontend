"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React, { useEffect, useState, DragEvent } from 'react';
import Image from "next/image";
import { CirclePlus } from 'lucide-react';
import { useLanguage } from '@/components/ui/LanguageProvider';
import { convertHeicToJpeg } from '@/lib/heicConverter';

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
    const { language: langKey } = useLanguage();
    
    const translations = {
        english: {
            greeting: "Hi {username}, Our deepest condolences.",
            greetingAnonymous: "Hi there, Our deepest condolences.",
            packageInfo: "You have selected a {duration} days '{planName}' package,",
            additionalImagesTitle: "Additional Images",
            previewAltText: "Preview {number}",
            removeImageButton: "✕",
            moreImagesText: "{count} more images left",
            dragDropText: "Drag & drop images here or click to browse",
            browseFilesButton: "Browse Files...",
            recommendedSizeLabel: "Recommended image size:",
            recommendedSizeValue: "800x800 pixels (1:1 aspect ratio)",
            recommendedTypeLabel: "Recommended image type:",
            recommendedTypeValue: "JPEG, PNG, WebP, or HEIC",
            noteLabel: "Note:",
            noteValue: "You can upload up to {max} additional images",
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
            additionalImagesTitle: "கூடுதல் படங்கள்",
            previewAltText: "முன்னோட்டம் {number}",
            removeImageButton: "✕",
            moreImagesText: "{count} மேலும் படங்கள் மீதமுள்ளன",
            dragDropText: "படங்களை இங்கே இழுத்து விடவும் அல்லது உலாவ கிளிக் செய்யவும்",
            browseFilesButton: "கோப்புகளை உலாவு...",
            recommendedSizeLabel: "பரிந்துரைக்கப்பட்ட படத்தின் அளவு:",
            recommendedSizeValue: "800x800 பிக்சல்கள் (1:1 விகித அளவு)",
            recommendedTypeLabel: "பரிந்துரைக்கப்பட்ட படத்தின் வகை:",
            recommendedTypeValue: "JPEG, PNG, WebP, அல்லது HEIC",
            noteLabel: "குறிப்பு:",
            noteValue: "நீங்கள் {max} கூடுதல் படங்கள் வரை பதிவேற்ற முடியும்",
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
            additionalImagesTitle: "අමතර රූප",
            previewAltText: "පෙරදසුන {number}",
            removeImageButton: "✕",
            moreImagesText: "තවත් රූප {count}ක් ඉතිරිය",
            dragDropText: "රූප මෙහි ඇද දමන්න හෝ පිරික්සීමට ක්ලික් කරන්න",
            browseFilesButton: "ගොනු පිරික්සන්න...",
            recommendedSizeLabel: "නිර්දේශිත රූප ප්‍රමාණය:",
            recommendedSizeValue: "800x800 පික්සල් (1:1 අනුපාත ප්‍රමාණය)",
            recommendedTypeLabel: "නිර්දේශිත රූප වර්ගය:",
            recommendedTypeValue: "JPEG, PNG, WebP, හෝ HEIC",
            noteLabel: "සටහන:",
            noteValue: "ඔබට අමතර රූප {max}ක් දක්වා උඩුගත කළ හැකිය",
            backButton: "ආපසු",
            nextButton: "ඊළඟ",
            withNoExtraAddons: "අමතර සේවා නොමැතිව",
            with: "සමඟ",
            addon: "සේවාව",
            addons: "සේවා"
        }
    };
    
    const t = translations[langKey as keyof typeof translations] || translations.english;
    const [images, setImages] = useState<File[]>(initialImages || []);
    const [previews, setPreviews] = useState<string[]>([]);

    // Initialize previews for existing images
    useEffect(() => {
        if (initialImages && initialImages.length > 0) {
            Promise.all(initialImages.map(file => convertHeicToJpeg(file)))
                .then(setPreviews);
        }
    }, [initialImages]);

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

    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const maxImages = getMaxImages();
        const availableSlots = maxImages - images.length;
        
        if (availableSlots <= 0) return;

        const droppedFiles = Array.from(e.dataTransfer.files)
            .filter(file => file.type.startsWith("image/") || file.type === "image/heic" || file.name.toLowerCase().endsWith('.heic'))
            .slice(0, availableSlots);
        
        // Convert HEIC files to JPEG for preview
        const newPreviews = await Promise.all(droppedFiles.map(file => convertHeicToJpeg(file)));
        const updatedImages = [...images, ...droppedFiles];
        const updatedPreviews = [...previews, ...newPreviews];

        setImages(updatedImages);
        setPreviews(updatedPreviews);
        
        // Notify parent component of images change
        if (onImagesDataChange) {
            onImagesDataChange(updatedImages);
        }
    };

    const handleBrowse = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxImages = getMaxImages();
        const availableSlots = maxImages - images.length;
        
        if (availableSlots <= 0) return;

        const selectedFiles = Array.from(e.target.files ?? [])
            .filter(file => file.type.startsWith("image/") || file.type === "image/heic" || file.name.toLowerCase().endsWith('.heic'))
            .slice(0, availableSlots);
        
        // Convert HEIC files to JPEG for preview
        const newPreviews = await Promise.all(selectedFiles.map(file => convertHeicToJpeg(file)));
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
                    <TitleWithUnderline text={t.additionalImagesTitle} underlineWidth={64} />
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
                                            alt={t.previewAltText.replace('{number}', (idx + 1).toString())}
                                            className=" md:h-48 object-cover aspect-square"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                        >
                                            {t.removeImageButton}
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
                                                    {t.moreImagesText.replace('{count}', (getMaxImages() - previews.length).toString())}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {previews.length === 0 && (
                            <div>
                                <p className="text-gray-500 mb-2">{t.dragDropText}</p>
                                <label className="cursor-pointer text-white bg-primary px-8 py-2">
                                    {t.browseFilesButton}
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
                        <strong>{t.recommendedSizeLabel}</strong> {t.recommendedSizeValue}<br />
                        <strong>{t.recommendedTypeLabel}</strong> {t.recommendedTypeValue}<br />
                        <strong>{t.noteLabel}</strong> {t.noteValue.replace('{max}', getMaxImages().toString())}
                    </div>

                </div>
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        type="button"
                        onClick={() => setActiveStep(7)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                        {t.backButton}
                    </button>
                    <button
                        type="button"
                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6"
                        onClick={() => setActiveStep(9)}
                    >
                        {t.nextButton}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdditionalImage;