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
    nameTitle: string;
    firstName: string;
    lastName: string;
    preferredNameTitle: string;
    preferredName: string;
    usePreferredName: boolean;
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

    const nameTitleOptions = {
        mr: "Mr",
        mrs: "Mrs",
        ms: "Ms",
        miss: "Miss",
        dr: "Dr",
        prof: "Prof",
        rev: "Rev",
        hon: "Hon",
        sir: "Sir"
    };

    const translations = {
        english: {
            greeting: "Hi {username}, Our deepest condolences.",
            greetingAnonymous: "Hi there, Our deepest condolences.",
            packageInfo: "You have selected a {duration} days '{planName}' package,",
            informationTitle: "Information",
            nameTitleLabel: "Title",
            firstNameLabel: "First Name",
            lastNameLabel: "Last Name",
            preferredNameLabel: "Preferred Name",
            usePreferredNameLabel: "Use preferred name instead of first and last name",
            obituaryHeadlineLabel: "Obituary Headline",
            remembranceHeadlineLabel: "Remembrance Headline",
            obituaryHeadlinePlaceholder: "e.g., 'In loving memory of John Smith'",
            remembranceHeadlinePlaceholder: "e.g., 'Celebrating the life of John Smith'",
            shortDescriptionPlaceholder: "Maximum 10 words allowed",
            wordsUsed: "{count}/10 words used",
            addressLabel: "Funeral House Address",
            dateOfBirthLabel: "Date of Birth",
            dateOfDeathLabel: "Date of Passing",
            obituaryDescriptionLabel: "Obituary Description",
            remembranceDescriptionLabel: "Remembrance Description",
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
            nameTitleLabel: "பட்டம்",
            firstNameLabel: "முதல் பெயர்",
            lastNameLabel: "கடைசி பெயர்",
            preferredNameLabel: "விருப்பமான பெயர்",
            usePreferredNameLabel: "முதல் மற்றும் கடைசி பெயருக்கு பதிலாக விருப்பமான பெயரைப் பயன்படுத்தவும்",
            obituaryHeadlineLabel: "இறப்பு அறிக்கை தலைப்பு",
            remembranceHeadlineLabel: "நினைவஞ்சலி தலைப்பு",
            obituaryHeadlinePlaceholder: "உதாரணம்: 'ஜான் ஸ்மித்தின் அன்பான நினைவாக'",
            remembranceHeadlinePlaceholder: "உதாரணம்: 'ஜான் ஸ்மித்தின் வாழ்க்கையைக் கொண்டாடுதல்'",
            shortDescriptionPlaceholder: "அதிகபட்சம் 10 வார்த்தைகள் அனுமதிக்கப்படும்",
            wordsUsed: "{count}/10 வார்த்தைகள் பயன்படுத்தப்பட்டன",
            addressLabel: "இறுதிச் சடங்கு இல்லத்தின் முகவரி",
            dateOfBirthLabel: "பிறந்த தேதி",
            dateOfDeathLabel: "மறைவு தேதி",
            obituaryDescriptionLabel: "இறப்பு அறிக்கை விளக்கம்",
            remembranceDescriptionLabel: "நினைவஞ்சலி விளக்கம்",
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
            nameTitleLabel: "පිරිනාමය",
            firstNameLabel: "මුල් නම",
            lastNameLabel: "අවසන් නම",
            preferredNameLabel: "අභිමත නම",
            usePreferredNameLabel: "මුල් සහ අවසන් නම වෙනුවට අභිමත නම භාවිතා කරන්න",
            obituaryHeadlineLabel: "අවමංගල්‍ය මාතෘකාව",
            remembranceHeadlineLabel: "සිහිකිරීමේ මාතෘකාව",
            obituaryHeadlinePlaceholder: "උදාහරණ: 'ජෝන් ස්මිත්ගේ ප්‍රේමණීය සිහිකිරීමේදී'",
            remembranceHeadlinePlaceholder: "උදාහරණ: 'ජෝන් ස්මිත්ගේ ජීවිතය සැමරීම'",
            shortDescriptionPlaceholder: "උපරිම වචන 10ක් අවසර ඇත",
            wordsUsed: "වචන {count}/10ක් භාවිතා කර ඇත",
            addressLabel: "අවමංගල්‍ය ගෘහ ලිපිනය",
            dateOfBirthLabel: "උපන් දිනය",
            dateOfDeathLabel: "මරණ දිනය",
            obituaryDescriptionLabel: "අවමංගල්‍ය විස්තරය",
            remembranceDescriptionLabel: "සිහිකිරීමේ විස්තරය",
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
        nameTitle: initialFormData?.nameTitle || '',
        firstName: initialFormData?.firstName || '',
        lastName: initialFormData?.lastName || '',
        preferredNameTitle: initialFormData?.preferredNameTitle || '',
        preferredName: initialFormData?.preferredName || '',
        usePreferredName: initialFormData?.usePreferredName || false,
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
        const hasNameInfo = formData.usePreferredName
            ? formData.preferredName.trim() !== ''
            : formData.firstName.trim() !== '' && formData.lastName.trim() !== '';

        return hasNameInfo &&
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

    // Get description label based on package type
    const getDescriptionLabel = () => {
        if (selectedPlan?.isObituary) {
            return t.obituaryDescriptionLabel;
        } else if (selectedPlan?.isRemembarace) {
            return t.remembranceDescriptionLabel;
        }
        // Default fallback
        return t.obituaryDescriptionLabel;
    };

    // Get headline label based on package type
    const getHeadlineLabel = () => {
        if (selectedPlan?.isObituary) {
            return t.obituaryHeadlineLabel;
        } else if (selectedPlan?.isRemembarace) {
            return t.remembranceHeadlineLabel;
        }
        // Default fallback
        return t.obituaryHeadlineLabel;
    };

    // Get headline placeholder based on package type
    const getHeadlinePlaceholder = () => {
        if (selectedPlan?.isObituary) {
            return t.obituaryHeadlinePlaceholder;
        } else if (selectedPlan?.isRemembarace) {
            return t.remembranceHeadlinePlaceholder;
        }
        // Default fallback
        return t.obituaryHeadlinePlaceholder;
    };

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
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
        if (field === 'description' && typeof value === 'string') {
            const words = value.trim().split(/\s+/).filter(word => word.length > 0);
            setWordCount(words.length);
        }

        // Count words for short description field
        if (field === 'shortDescription' && typeof value === 'string') {
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
                    <div className="flex items-center mb-3">
                        <input
                            type="checkbox"
                            id="usePreferredName"
                            checked={formData.usePreferredName}
                            onChange={(e) => handleInputChange('usePreferredName', e.target.checked)}
                            className="mr-2 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                        <label htmlFor="usePreferredName" className="text-sm text-gray-700">
                            {t.usePreferredNameLabel}
                        </label>
                    </div>

                    {formData.usePreferredName ? (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label htmlFor="preferredNameTitle" className="pb-2 block">
                                    {t.nameTitleLabel}
                                </label>
                                <select
                                    id="preferredNameTitle"
                                    value={formData.preferredNameTitle}
                                    onChange={(e) => handleInputChange('preferredNameTitle', e.target.value)}
                                    className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                >
                                    <option value="">Select</option>
                                    {Object.values(nameTitleOptions).map((title: string, index: number) => (
                                        <option key={index} value={title}>{title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-3">
                                <label htmlFor="preferredName" className="pb-2 block">
                                    {t.preferredNameLabel}<span className="text-[#880002]">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="preferredName"
                                    value={formData.preferredName}
                                    onChange={(e) => handleInputChange('preferredName', e.target.value)}
                                    required
                                    className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label htmlFor="nameTitle" className="pb-2 block">
                                    {t.nameTitleLabel}
                                </label>
                                <select
                                    id="nameTitle"
                                    value={formData.nameTitle}
                                    onChange={(e) => handleInputChange('nameTitle', e.target.value)}
                                    className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                >
                                    <option value="">Select</option>
                                    {Object.values(nameTitleOptions).map((title: string, index: number) => (
                                        <option key={index} value={title}>{title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="firstName" className="pb-2 block">
                                    {t.firstNameLabel}<span className="text-[#880002]">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    required
                                    className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="lastName" className="pb-2 block">
                                    {t.lastNameLabel}<span className="text-[#880002]">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    required
                                    className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="shortDescription" className={`pb-2 block`}>
                        {getHeadlineLabel()}
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
                        placeholder={getHeadlinePlaceholder()}
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
                        {getDescriptionLabel()}
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