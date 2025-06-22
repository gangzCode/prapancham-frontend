'use client';

import React from 'react';
import useSWR from 'swr';

interface Country {
    _id: string;
    name: {
        [key: string]: {
            name: string;
            value: string;
            _id: string;
        }[];
    };
}

interface CountrySelectorProps {
    selectedCountryId: string;
    language?: 'en' | 'ta' | 'si';
    onChange: (value: string) => void;
    setActiveStep?: (step: number) => void;
}


const translations = {
    en: {
        heading: 'Choose the country of deceased person',
        subtext: 'Please select the country from the dropdown below',
        selectPlaceholder: '--Select Country--',
        loading: 'Loading...',
        error: 'Failed to load countries.',
    },
    ta: {
        heading: 'மரணமடைந்த நபரின் நாட்டைத் தேர்வுசெய்க',
        subtext: 'தயவுசெய்து கீழுள்ள பெயர்பட்டியலில் இருந்து நாடு ஒன்றைத் தேர்வுசெய்க',
        selectPlaceholder: '--நாட்டைத் தேர்ந்தெடுக்கவும்--',
        loading: 'ஏற்றப்படுகிறது...',
        error: 'நாடுகள் ஏற்ற முடியவில்லை.',
    },
    si: {
        heading: 'මියගිය පුද්ගලයාගේ රට තෝරන්න',
        subtext: 'කරුණාකර පහත ව්‍යාප්ත ලැයිස්තුවෙන් රට තෝරන්න',
        selectPlaceholder: '--රට තෝරන්න--',
        loading: 'ඇතුළත් වෙමින්...',
        error: 'රටවල් පූරණය කිරීම අසාර්ථකයි.',
    },
};

const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
    });

const CountrySelector: React.FC<CountrySelectorProps> = ({
    selectedCountryId,
    onChange,
    setActiveStep = () => {}, 
    language = 'en',
}) => {
    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/country/active?page=1&limit=100`,
        fetcher);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
        setActiveStep(1); 
    };

    const countries: Country[] = data?.countries || [];
    const t = translations[language] || translations.en;

    return (
        <div className="text-center mt-8">
            <h1 className="text-2xl md:text-4xl font-bold text-primary">
                {t.heading}
            </h1>
            <p className="text-primary mt-2">{t.subtext}</p>

            <div className="mt-6 relative inline-block w-full md:w-1/3">
                <div className="relative">
                    <select
                        className="w-full p-4 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                        value={selectedCountryId}
                        onChange={handleChange}
                        disabled={isLoading || !!error}
                    >
                        <option value="">{t.selectPlaceholder}</option>
                        {countries.map((country) => {
                            const localizedName =
                                country.name[language]?.[0]?.value ||
                                country.name['en']?.[0]?.value ||
                                'Unnamed Country';

                            return (
                                <option key={country._id} value={country._id}>
                                    {localizedName}
                                </option>
                            );
                        })}
                    </select>

                    {isLoading && (
                        <p className="text-sm text-gray-500 mt-2">{t.loading}</p>
                    )}
                    {error && (
                        <p className="text-sm text-red-500 mt-2">{t.error}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CountrySelector;
