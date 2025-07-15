'use client';

import React, { useState } from 'react';
import Plans from '../Memorial/Plans';
import useSWR from 'swr';


interface PlanSelectorProps {
    selectedPlan: any;
    selectedCountryId: string;
    setSelectedPlan: (plan: any) => void;
    setActiveStep?: (step: number) => void;
    language?: 'en' | 'ta' | 'si';
}

const translations = {
    en: {
        heading: 'Choose a Right Plan For You',
        subtext: 'Pick a plan that suits your needs',
        obituary: 'Obituary',
        remembrance: 'Remembrance',
    },
    ta: {
        heading: 'உங்களுக்கு பொருத்தமான திட்டத்தைத் தேர்வுசெய்க',
        subtext: 'உங்கள் தேவைக்கு ஏற்ப ஒரு திட்டத்தைத் தேர்வுசெய்க',
        obituary: 'இறப்புச்செய்தி',
        remembrance: 'நினைவஞ்சலி',
    },
    si: {
        heading: 'ඔබට සුදුසු සැලැස්මක් තෝරන්න',
        subtext: 'ඔබේ අවශ්‍යතාවයට ගැළපෙන සැලැස්මක් තෝරන්න',
        obituary: 'නිවේදනය',
        remembrance: 'සැරෙන්න',
    },
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

const usePackages = (type: 'Obituary' | 'Rememberence', language: 'en' | 'ta' | 'si', selectedCountryId: string) => {
    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/obituaryRemembarance-packages/active?page=1&limit=100`,
        fetcher
    );
    const packages = React.useMemo(() => {
        if (!data?.obituaryRemembarancePackages) return [];
        return data.obituaryRemembarancePackages.map((pkg: any) => {
            const mainFeatures = pkg.description[language]?.map((desc: any) => desc.value) || [];
            const addonFeatures =
                pkg.addons?.flatMap((addon: any) =>
                    addon.name?.[language]?.map((n: any) => n.value) ||
                    addon.name?.en?.map((n: any) => n.value) ||
                    []
                ) || [];
            const matchedPrice = pkg.priceList?.find(
                (p: any) => p.country?._id === selectedCountryId
            );
            return {
                ...pkg,
                id: pkg._id,
                planName: pkg.duration,
                price: matchedPrice?.price ?? pkg.basePrice?.price ?? 0,
                currency: matchedPrice?.country?.currencyCode ?? pkg.basePrice?.country?.currencyCode ?? '',
                features: [...mainFeatures],
                addonsFeatures: [...addonFeatures],
                isPremium: pkg.isPremium ?? false,
                isObituary: pkg.isObituary ?? false,
                isRemembarace: pkg.isRemembarace ?? false,
            };
        });
    }, [data, language]);

    return { packages, error, isLoading };
};


const PlanSelector: React.FC<PlanSelectorProps> = ({
    selectedPlan,
    setSelectedPlan,
    setActiveStep = () => { },
    language = 'en',
    selectedCountryId
}) => {
    const t = translations[language] || translations.en;
    const [selectedType, setSelectedType] = useState('Obituary');
    const { packages, error, isLoading } = usePackages(selectedType as 'Obituary' | 'Rememberence', language, selectedCountryId);

    return (
        <div className="text-center mt-8">
            <h1 className="text-2xl md:text-4xl font-bold text-primary">{t.heading}</h1>
            <p className="text-primary my-2">{t.subtext}</p>

            <div
                className={`flex border border-primary ${language === 'ta' ? 'w-96' : 'w-72'} p-2 rounded-lg mb-4 justify-center items-center mx-auto mt-8`}
            >
                <button
                    className={`py-2 px-2 font-medium text-xl border-b-2 -mb-px ${selectedType === 'Obituary'
                        ? 'bg-primary text-white font-bold rounded'
                        : 'border-transparent text-[#0D1322] hover:text-gray-900'
                        }`}
                    onClick={() => setSelectedType('Obituary')}
                >
                    {t.obituary}
                </button>
                <button
                    className={`py-2 px-2 font-medium text-xl border-b-2 -mb-px ${selectedType === 'Rememberence'
                        ? 'bg-primary text-white font-bold rounded'
                        : 'border-transparent text-gray-700 hover:text-gray-900'
                        }`}
                    onClick={() => setSelectedType('Rememberence')}
                >
                    {t.remembrance}
                </button>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center items-center">
                    {(() => {
                        const filteredPlans = packages.filter(
                            (plan: { isObituary: boolean; isRemembarace: boolean }) =>
                                (selectedType === 'Obituary' && plan.isObituary === true) ||
                                (selectedType === 'Rememberence' && plan.isRemembarace === true)
                        );

                        const premiumIndex = filteredPlans.findIndex((plan: { isPremium: boolean }) => plan.isPremium);
                        let reorderedPlans = [...filteredPlans];

                        if (premiumIndex !== -1 && filteredPlans.length > 2) {
                            const [premiumPlan] = reorderedPlans.splice(premiumIndex, 1);
                            const middleIndex = Math.floor(reorderedPlans.length / 2);
                            reorderedPlans.splice(middleIndex, 0, premiumPlan);
                        }

                        return reorderedPlans.map(
                            (
                                plan: {
                                    currency: string;
                                    planName: string;
                                    price: any;
                                    features: string[];
                                    addonsFeatures?: string[];
                                    isPremium: any;
                                },
                                index: React.Key | null | undefined
                            ) => (
                                <Plans
                                    key={index}
                                    plan={plan}
                                    planName={
                                        language === 'ta'
                                            ? `${plan.planName} நாட்கள் திட்டம்`
                                            : language === 'si'
                                                ? `${plan.planName} දින සැලැස්ම`
                                                : `${plan.planName} Days plan`
                                    }
                                    price={Number(plan.price)}
                                    currency={plan.currency}
                                    features={plan.features}
                                    addons={plan.addonsFeatures || []}
                                    isPremium={plan.isPremium ?? false}
                                    setActiveStep={setActiveStep}
                                    language={language}
                                    setSelectedPlan={setSelectedPlan}
                                />
                            )
                        );
                    })()}
                </div>
            </div>
        </div>
    );
};

export default PlanSelector;
