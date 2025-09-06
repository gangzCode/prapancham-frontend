"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React, { useEffect, useState, DragEvent } from 'react';
import Image from "next/image";
import { useLanguage } from '@/components/ui/LanguageProvider';
import { convertHeicToJpeg } from '@/lib/heicConverter';

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
    const { language: langKey } = useLanguage();
    
    const translations = {
        english: {
            greeting: "Hi {username}, Our deepest condolences.",
            greetingAnonymous: "Hi there, Our deepest condolences.",
            packageInfo: "You have selected a {duration} days '{planName}' package,",
            primaryImageTitle: "Primary Image",
            dragDropText: "Drag & drop image here or click to browse",
            browseFileButton: "Browse File...",
            removeImageButton: "✕",
            altText: "Preview",
            recommendedSizeLabel: "Recommended image size:",
            recommendedSizeValue: "400x400 pixels (1:1 aspect ratio)",
            recommendedTypeLabel: "Recommended image type:",
            recommendedTypeValue: "JPEG, PNG, WebP, or HEIC",
            noteLabel: "Note:",
            noteValue: "You can upload only 1 primary image",
            backButton: "Back",
            nextButton: "Next"
        },
        tamil: {
            greeting: "வணக்கம் {username}, எங்கள் ஆழ்ந்த இரங்கல்கள்.",
            greetingAnonymous: "வணக்கம், எங்கள் ஆழ்ந்த இரங்கல்கள்.",
            packageInfo: "நீங்கள் {duration} நாட்கள் '{planName}' தொகுப்பை தேர்ந்தெடுத்துள்ளீர்கள்,",
            primaryImageTitle: "முதன்மை படம்",
            dragDropText: "படத்தை இங்கே இழுத்து விடவும் அல்லது உலாவ கிளிக் செய்யவும்",
            browseFileButton: "கோப்பை உலாவு...",
            removeImageButton: "✕",
            altText: "முன்னோட்டம்",
            recommendedSizeLabel: "பரிந்துரைக்கப்பட்ட படத்தின் அளவு:",
            recommendedSizeValue: "400x400 பிக்சல்கள் (1:1 விகித அளவு)",
            recommendedTypeLabel: "பரிந்துரைக்கப்பட்ட படத்தின் வகை:",
            recommendedTypeValue: "JPEG, PNG, WebP, அல்லது HEIC",
            noteLabel: "குறிப்பு:",
            noteValue: "நீங்கள் 1 முதன்மை படத்தை மட்டுமே பதிவேற்ற முடியும்",
            backButton: "பின்",
            nextButton: "அடுத்து"
        },
        sinhala: {
            greeting: "ආයුබෝවන් {username}, අපගේ ගැඹුරු සානුකම්පනාව.",
            greetingAnonymous: "ආයුබෝවන්, අපගේ ගැඹුරු සානුකම්පනාව.",
            packageInfo: "ඔබ දින {duration} ක '{planName}' පැකේජයක් තෝරාගෙන ඇත,",
            primaryImageTitle: "ප්‍රධාන රූපය",
            dragDropText: "රූපය මෙහි ඇද දමන්න හෝ පිරික්සීමට ක්ලික් කරන්න",
            browseFileButton: "ගොනුව පිරික්සන්න...",
            removeImageButton: "✕",
            altText: "පෙරදසුන",
            recommendedSizeLabel: "නිර්දේශිත රූප ප්‍රමාණය:",
            recommendedSizeValue: "400x400 පික්සල් (1:1 අනුපාත ප්‍රමාණය)",
            recommendedTypeLabel: "නිර්දේශිත රූප වර්ගය:",
            recommendedTypeValue: "JPEG, PNG, WebP, හෝ HEIC",
            noteLabel: "සටහන:",
            noteValue: "ඔබට ප්‍රධාන රූප 1ක් පමණක් උඩුගත කළ හැකිය",
            backButton: "ආපසු",
            nextButton: "ඊළඟ"
        }
    };
    
    const t = translations[langKey as keyof typeof translations] || translations.english;
    const [image, setImage] = useState<File | null>(initialImageData || null);
    const [preview, setPreview] = useState<string | null>(null);

    // Initialize preview for existing image
    useEffect(() => {
        if (initialImageData) {
            convertHeicToJpeg(initialImageData).then(setPreview);
        }
    }, [initialImageData]);

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

    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = Array.from(e.dataTransfer.files)
            .find(file => file.type.startsWith("image/") || file.type === "image/heic" || file.name.toLowerCase().endsWith('.heic'));

        if (droppedFile) {
            if (preview) URL.revokeObjectURL(preview);
            setImage(droppedFile);
            
            // Convert HEIC to JPEG if needed and create preview
            const previewUrl = await convertHeicToJpeg(droppedFile);
            setPreview(previewUrl);
            
            // Notify parent component of image change
            if (onImageDataChange) {
                onImageDataChange(droppedFile);
            }
        }
    };

    const handleBrowse = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = Array.from(e.target.files ?? [])
            .find(file => file.type.startsWith("image/") || file.type === "image/heic" || file.name.toLowerCase().endsWith('.heic'));

        if (selectedFile) {
            if (preview) URL.revokeObjectURL(preview);
            setImage(selectedFile);
            
            // Convert HEIC to JPEG if needed and create preview
            const previewUrl = await convertHeicToJpeg(selectedFile);
            setPreview(previewUrl);
            
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
                    <TitleWithUnderline text={t.primaryImageTitle} underlineWidth={64} />
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
                                        alt={t.altText}
                                        className=" md:h-48 aspect-square object-cover  shadow"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                    >
                                        {t.removeImageButton}
                                    </button>
                                </div>
                            </div>
                        )}
                        {!preview && (
                            <>
                                <p className="text-gray-500 mb-2">{t.dragDropText}</p>
                                <label className="cursor-pointer text-white bg-primary px-8 py-2">
                                    {t.browseFileButton}
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
                        <strong>{t.recommendedSizeLabel}</strong> {t.recommendedSizeValue}<br />
                        <strong>{t.recommendedTypeLabel}</strong> {t.recommendedTypeValue}<br />
                        <strong>{t.noteLabel}</strong> {t.noteValue}
                    </div>
                </div>
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        type="button"
                        onClick={() => setActiveStep(5)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
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
                                setActiveStep(7);
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

export default PrimaryImage;