"use client";
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

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
    const [isDonationReceivable, setIsDonationReceivable] = useState(initialDonationReceivable);

    // Translations object
    const translations = {
        en: {
            title: "Donation Receivable",
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
            continueButton: "Continue"
        },
        ta: {
            title: "நன்கொடை பெறுதல்",
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
            continueButton: "தொடர்"
        },
        si: {
            title: "පරිත්‍යාග ලැබීම",
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
            continueButton: "ඉදිරියට"
        }
    };

    const getTranslations = () => {
        if (language === 'tamil') return translations.ta;
        if (language === 'sinhala') return translations.si;
        return translations.en;
    };

    const currentTranslations = getTranslations();

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
        <div className="p-4 md:p-8 lg:px-16 bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]">
            {/* Header */}
            <div className="flex items-center space-x-2 p-4 mb-6">
                <div className="bg-primary text-white rounded-full p-2">
                    <ArrowLeft
                        onClick={handleBack}
                        className='cursor-pointer'
                    />
                </div>
                <span className="text-primary text-lg">
                    {currentTranslations.backButton}
                </span>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {currentTranslations.title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-2">
                        {currentTranslations.subtitle}
                    </p>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        {currentTranslations.description}
                    </p>
                </div>

                {/* Toggle Section */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {currentTranslations.toggleLabel}
                            </h3>
                            <p className="text-gray-600">
                                {isDonationReceivable ? currentTranslations.enableDonations : currentTranslations.disableDonations}
                            </p>
                        </div>
                        <div className="ml-6">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isDonationReceivable}
                                    onChange={(e) => handleToggleChange(e.target.checked)}
                                />
                                <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-teal-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {currentTranslations.benefitsTitle}
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <span className="text-teal-600 mr-3 mt-1">✓</span>
                            <span className="text-gray-700">{currentTranslations.benefit1}</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-teal-600 mr-3 mt-1">✓</span>
                            <span className="text-gray-700">{currentTranslations.benefit2}</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-teal-600 mr-3 mt-1">✓</span>
                            <span className="text-gray-700">{currentTranslations.benefit3}</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-teal-600 mr-3 mt-1">✓</span>
                            <span className="text-gray-700">{currentTranslations.benefit4}</span>
                        </li>
                    </ul>
                </div>

                {/* Warning Section */}
                {/* <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                        {currentTranslations.warningTitle}
                    </h3>
                    <p className="text-yellow-700">
                        {currentTranslations.warningText}
                    </p>
                </div> */}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6"
                    >
                        {currentTranslations.backButton}
                    </button>
                    <button
                        type="button"
                        onClick={handleContinue}
                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6"
                    >
                        {currentTranslations.continueButton}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonationReceivableConfirmation;
