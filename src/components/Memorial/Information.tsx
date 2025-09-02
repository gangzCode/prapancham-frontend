"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/components/ui/LanguageProvider';

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
    dateofBirth: string;
    dateofDeath: string;
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
    const { language: langKey } = useLanguage();
    
    const translations = {
        english: {
            greeting: "Hi {username}, Our deepest condolences.",
            greetingAnonymous: "Hi there, Our deepest condolences.",
            packageInfo: "You have selected a {duration} days '{planName}' package,",
            informationTitle: "Information",
            titleLabel: "Title (Name of Deceased)",
            shortDescriptionLabel: "Short Description",
            shortDescriptionPlaceholder: "Maximum 10 words allowed",
            wordsUsed: "{count}/10 words used",
            addressLabel: "Address",
            dateOfBirthLabel: "Date of Birth",
            dateOfDeathLabel: "Date of Death",
            descriptionLabel: "Description",
            descriptionPlaceholder: "Maximum {limit} words allowed",
            descriptionWordsUsed: "{count}/{limit} words used",
            tributeVideoLabel: "Tribute Video",
            tributeVideoPlaceholder: "Enter YouTube video URL",
            tributeVideoNote: "Create a tribute video and upload it to YouTube. Then copy and paste its link here to show it in your tribute.",
            backButton: "Back",
            nextButton: "Next"
        },
        tamil: {
            greeting: "வணக்கம் {username}, எங்கள் ஆழ்ந்த இரங்கல்கள்.",
            greetingAnonymous: "வணக்கம், எங்கள் ஆழ்ந்த இரங்கல்கள்.",
            packageInfo: "நீங்கள் {duration} நாட்கள் '{planName}' தொகுப்பை தேர்ந்தெடுத்துள்ளீர்கள்,",
            informationTitle: "தகவல்",
            titleLabel: "தலைப்பு (இறந்தவரின் பெயர்)",
            shortDescriptionLabel: "குறுகிய விளக்கம்",
            shortDescriptionPlaceholder: "அதிகபட்சம் 10 வார்த்தைகள் அனுமதிக்கப்படும்",
            wordsUsed: "{count}/10 வார்த்தைகள் பயன்படுத்தப்பட்டன",
            addressLabel: "முகவரி",
            dateOfBirthLabel: "பிறந்த தேதி",
            dateOfDeathLabel: "இறந்த தேதி",
            descriptionLabel: "விளக்கம்",
            descriptionPlaceholder: "அதிகபட்சம் {limit} வார்த்தைகள் அனுமதிக்கப்படும்",
            descriptionWordsUsed: "{count}/{limit} வார்த்தைகள் பயன்படுத்தப்பட்டன",
            tributeVideoLabel: "நினைவு வீடியோ",
            tributeVideoPlaceholder: "YouTube வீடியோ URL ஐ உள்ளிடவும்",
            tributeVideoNote: "ஒரு நினைவு வீடியோவை உருவாக்கி YouTube இல் பதிவேற்றவும். பின்னர் அதன் இணைப்பை இங்கே நகலெடுத்து ஒட்டவும்.",
            backButton: "பின்",
            nextButton: "அடுத்து"
        },
        sinhala: {
            greeting: "ආයුබෝවන් {username}, අපගේ ගැඹුරු සානුකම්පනාව.",
            greetingAnonymous: "ආයුබෝවන්, අපගේ ගැඹුරු සානුකම්පනාව.",
            packageInfo: "ඔබ දින {duration} ක '{planName}' පැකේජයක් තෝරාගෙන ඇත,",
            informationTitle: "තොරතුරු",
            titleLabel: "මාතෘකාව (මියගිය පුද්ගලයාගේ නම)",
            shortDescriptionLabel: "කෙටි විස්තරය",
            shortDescriptionPlaceholder: "උපරිම වචන 10ක් අවසර ඇත",
            wordsUsed: "වචන {count}/10ක් භාවිතා කර ඇත",
            addressLabel: "ලිපිනය",
            dateOfBirthLabel: "උපන් දිනය",
            dateOfDeathLabel: "මරණ දිනය",
            descriptionLabel: "විස්තරය",
            descriptionPlaceholder: "උපරිම වචන {limit}ක් අවසර ඇත",
            descriptionWordsUsed: "වචන {count}/{limit}ක් භාවිතා කර ඇත",
            tributeVideoLabel: "ස්තුති වීඩියෝව",
            tributeVideoPlaceholder: "YouTube වීඩියෝ URL එක ඇතුළත් කරන්න",
            tributeVideoNote: "ස්තුති වීඩියෝවක් සාදා YouTube වෙත උඩුගත කරන්න. ඉන්පසු එහි සබැඳිය මෙහි පිටපත් කර ඔබේ ස්තුතියේ පෙන්වන්න.",
            backButton: "ආපසු",
            nextButton: "ඊළඟ"
        }
    };
    
    const t = translations[langKey as keyof typeof translations] || translations.english;
    const [formData, setFormData] = useState<FormData>({
        title: initialFormData?.title || '',
        shortDescription: initialFormData?.shortDescription || '',
        address: initialFormData?.address || '',
        dateofBirth: initialFormData?.dateofBirth || '',
        dateofDeath: initialFormData?.dateofDeath || '',
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
            formData.dateofBirth !== '' &&
            formData.dateofDeath !== '';
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
                        {profile?.username 
                            ? t.greeting.replace('{username}', profile.username)
                            : t.greetingAnonymous
                        }
                    </h3>
                    <p className="text-center text-gray-500 mb-4 text-primary">
                        {t.packageInfo
                            .replace('{duration}', getDuration())
                            .replace('{planName}', getPlanName())
                        } <span className='text-[#880002]'>{getAddonInfo()}</span>
                    </p>
                </div>
                <div className="flex-shrink min-w-0 mb-8">
                    <TitleWithUnderline text={t.informationTitle} underlineWidth={64} />
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className={`pb-2 block`}>
                        {t.titleLabel}<span className="text-[#880002]">*</span>
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
                        {t.shortDescriptionLabel}
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
                        placeholder={t.shortDescriptionPlaceholder}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                        {t.wordsUsed.replace('{count}', shortDescWordCount.toString())}
                    </p>
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className={`pb-2 block`}>
                        {t.addressLabel} <span className="text-[#880002]">*</span>
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
                    <label htmlFor="dateofBirth" className={`pb-2 block`}>
                        {t.dateOfBirthLabel}<span className="text-[#880002]">*</span>
                    </label>
                    <input
                        type="date"
                        id="dateofBirth"
                        value={formData.dateofBirth}
                        min="1000-01-01"
                        max="9999-12-31"
                        onChange={(e) => handleInputChange('dateofBirth', e.target.value)}
                        required
                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dateofDeath" className={`pb-2 block`}>
                        {t.dateOfDeathLabel}<span className="text-[#880002]">*</span>
                    </label>
                    <input
                        type="date"
                        id="dateofDeath"
                        value={formData.dateofDeath}
                        min="1000-01-01"
                        max="9999-12-31"
                        onChange={(e) => handleInputChange('dateofDeath', e.target.value)}
                        required
                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 mb-2">
                        {t.descriptionLabel}
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
                        placeholder={t.descriptionPlaceholder.replace('{limit}', getWordLimit().toString())}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                        {t.descriptionWordsUsed
                            .replace('{count}', wordCount.toString())
                            .replace('{limit}', getWordLimit().toString())
                        }
                    </p>
                </div>
                {selectedPlan?.isTributeVideoUploading && (
                    <div className="mb-4">
                        <label htmlFor="tributeVideo" className={`pb-2 block`}>
                            {t.tributeVideoLabel}
                        </label>
                        <input
                            type="url"
                            id="tributeVideo"
                            value={formData.tributeVideo}
                            onChange={(e) => handleInputChange('tributeVideo', e.target.value)}
                            className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                            placeholder={t.tributeVideoPlaceholder}
                        />
                        <span className='text-xs text-gray-600 mt-1 block'>
                            {t.tributeVideoNote}
                        </span>
                    </div>
                )}
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                        {t.backButton}
                    </button>
                    <button
                        type="button"
                        className={`gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap rounded min-h-6 ${isFormValid()
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
                        {t.nextButton}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Information;