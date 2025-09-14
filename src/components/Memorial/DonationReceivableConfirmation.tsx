"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React, { useState } from 'react';
import { useLanguage } from '@/components/ui/LanguageProvider';

interface DonationReceivableConfirmationProps {
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
    additionalImagesData?: File[];
    initialDonationReceivable?: boolean;
    onDonationReceivableChange: (isDonationReceivable: boolean) => void;
    setActiveStep: (step: number) => void;
}

const DonationReceivableConfirmation: React.FC<DonationReceivableConfirmationProps> = ({
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
    additionalImagesData,
    initialDonationReceivable = false,
    onDonationReceivableChange,
    setActiveStep
}) => {
    const { language: langKey } = useLanguage();
    const [isDonationReceivable, setIsDonationReceivable] = useState(initialDonationReceivable);

    // Translations object
    const translations = {
        english: {
            greeting: "Hi {username}, Our deepest condolences.",
            greetingAnonymous: "Hi there, Our deepest condolences.",
            packageInfo: "You have selected a {duration} days '{planName}' package,",
            title: "Donation Settings",
            subtitle: "Enable donation functionality for this memorial",
            description: "When enabled, visitors can make donations to support this memorial. This allows family and friends to contribute financially in memory of the deceased.",
            enableDonations: "Enable Donations",
            disableDonations: "Disable Donations",
            toggleLabel: "Allow visitors to donate to this memorial",
            benefitsTitle: "Benefits of enabling donations:",
            benefit1: "Visitors can contribute financially to honor the memory",
            benefit2: "Helps cover memorial expenses and maintenance",
            benefit3: "Creates a meaningful way for people to show support",
            benefit4: "Transparent donation tracking and management",
            warningTitle: "Important Note:",
            warningText: "Once enabled, donation information will be displayed on the memorial page. You can disable this feature at any time from your memorial settings.",
            backButton: "Back",
            continueButton: "Continue",
            withNoExtraAddons: "with no extra addons",
            with: "with",
            addon: "addon",
            addons: "addons"
        },
        tamil: {
            greeting: "வணக்கம் {username}, எங்கள் ஆழ்ந்த இரங்கல்கள்.",
            greetingAnonymous: "வணக்கம், எங்கள் ஆழ்ந்த இரங்கல்கள்.",
            packageInfo: "நீங்கள் {duration} நாட்கள் '{planName}' தொகுப்பை தேர்ந்தெடுத்துள்ளீர்கள்,",
            title: "நன்கொடை அமைப்புகள்",
            subtitle: "இந்த நினைவுச்சின்னத்திற்கு நன்கொடை செயல்பாட்டை இயக்கவும்",
            description: "இயக்கப்படும்போது, பார்வையாளர்கள் இந்த நினைவுச்சின்னத்தை ஆதரிக்க நன்கொடைகளை வழங்க முடியும். இது குடும்பத்தினர் மற்றும் நண்பர்கள் இறந்தவரின் நினைவாக நிதி ரீதியாக பங்களிக்க அனுமதிக்கிறது.",
            enableDonations: "நன்கொடைகளை இயக்கவும்",
            disableDonations: "நன்கொடைகளை முடக்கவும்",
            toggleLabel: "பார்வையாளர்கள் இந்த நினைவுச்சின்னத்திற்கு நன்கொடை அளிக்க அனுமதிக்கவும்",
            benefitsTitle: "நன்கொடைகளை இயக்குவதன் நன்மைகள்:",
            benefit1: "பார்வையாளர்கள் நினைவை மதிக்க நிதி ரீதியாக பங்களிக்க முடியும்",
            benefit2: "நினைவுச்சின்ன செலவுகள் மற்றும் பராமரிப்பு செலவுகளை ஈடுகட்ட உதவுகிறது",
            benefit3: "மக்கள் ஆதரவு காட்ட அர்த்தமுள்ள வழியை உருவாக்குகிறது",
            benefit4: "வெளிப்படையான நன்கொடை கண்காணிப்பு மற்றும் நிர்வாகம்",
            warningTitle: "முக்கியமான குறிப்பு:",
            warningText: "இயக்கப்பட்டவுடன், நன்கொடை தகவல் நினைவுச்சின்ன பக்கத்தில் காண்பிக்கப்படும். உங்கள் நினைவுச்சின்ன அமைப்புகளில் இருந்து எந்த நேரத்திலும் இந்த அம்சத்தை முடக்க முடியும்.",
            backButton: "பின்",
            continueButton: "தொடர்",
            withNoExtraAddons: "கூடுதல் சேவைகள் இல்லாமல்",
            with: "உடன்",
            addon: "சேவை",
            addons: "சேவைகள்"
        },
        sinhala: {
            greeting: "ආයුබෝවන් {username}, අපගේ ගැඹුරු සානුකම්පනාව.",
            greetingAnonymous: "ආයුබෝවන්, අපගේ ගැඹුරු සානුකම්පනාව.",
            packageInfo: "ඔබ දින {duration} ක '{planName}' පැකේජයක් තෝරාගෙන ඇත,",
            title: "පරිත්‍යාග සැකසීම්",
            subtitle: "මෙම ස්මාරකය සඳහා පරිත්‍යාග කාර්යක්ෂමතාව සක්‍රිය කරන්න",
            description: "සක්‍රිය කළ විට, නරඹන්නන්ට මෙම ස්මාරකයට සහාය දැක්වීම සඳහා පරිත්‍යාග කළ හැකිය. මෙය පවුලේ සාමාජිකයින්ට සහ මිතුරන්ට මියගිය පුද්ගලයාගේ මතකය වෙනුවෙන් මූල්‍ය වශයෙන් දායක වීමට ඉඩ සලසයි.",
            enableDonations: "පරිත්‍යාග සක්‍රිය කරන්න",
            disableDonations: "පරිත්‍යාග අක්‍රිය කරන්න",
            toggleLabel: "නරඹන්නන්ට මෙම ස්මාරකයට පරිත්‍යාග කිරීමට ඉඩ දෙන්න",
            benefitsTitle: "පරිත්‍යාග සක්‍රිය කිරීමේ ප්‍රතිලාභ:",
            benefit1: "නරඹන්නන්ට මතකය සම්මාන කිරීම සඳහා මූල්‍ය වශයෙන් දායක විය හැකිය",
            benefit2: "ස්මාරක වියදම් සහ නඩත්තු පිරිවැය ආවරණය කිරීමට උපකාරී වේ",
            benefit3: "මිනිසුන්ට සහාය පෙන්වීමට අර්ථවත් මාර්ගයක් නිර්මාණය කරයි",
            benefit4: "පරිදෘශ්‍ය පරිත්‍යාග ලුහුබැඳීම සහ කළමනාකරණය",
            warningTitle: "වැදගත් සටහන:",
            warningText: "සක්‍රිය කළ පසු, පරිත්‍යාග තොරතුරු ස්මාරක පිටුවේ ප්‍රදර්ශනය වේ. ඔබගේ ස්මාරක සැකසීම් වලින් ඕනෑම වේලාවක මෙම විශේෂාංගය අක්‍රිය කළ හැකිය.",
            backButton: "ආපසු",
            continueButton: "ඉදිරියට",
            withNoExtraAddons: "අමතර සේවා නොමැතිව",
            with: "සමඟ",
            addon: "සේවාව",
            addons: "සේවා"
        }
    };
    
    const t = translations[langKey as keyof typeof translations] || translations.english;

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

    const handleToggleChange = (checked: boolean) => {
        setIsDonationReceivable(checked);
        onDonationReceivableChange(checked);
    };

    const handleContinue = () => {
        setActiveStep(10); // Go to Summary step
    };

    const handleBack = () => {
        setActiveStep(8); // Go back to Additional Images step
    };

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
                    <TitleWithUnderline text={t.title} underlineWidth={64} />
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
                        {t.description}
                    </p>
                </div>

                {/* Toggle Section */}
                <div className="mb-6">
                    <label htmlFor="donationToggle" className="pb-2 block font-medium">
                        {t.toggleLabel}
                    </label>
                    <div className="bg-gray-50 rounded-lg p-6 border border-primary">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-gray-700">
                                    {isDonationReceivable ? t.enableDonations : t.disableDonations}
                                </p>
                            </div>
                            <div className="ml-6">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="donationToggle"
                                        className="sr-only peer"
                                        checked={isDonationReceivable}
                                        onChange={(e) => handleToggleChange(e.target.checked)}
                                    />
                                    <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-teal-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                        {t.backButton}
                    </button>
                    <button
                        type="button"
                        onClick={handleContinue}
                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap rounded min-h-6 bg-[#0D1322] hover:bg-[#1a2647] cursor-pointer"
                    >
                        {t.continueButton}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DonationReceivableConfirmation;
