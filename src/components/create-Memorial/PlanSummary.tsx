'use client';

import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import TermsModal from '@/components/ui/TermsModal';

interface PlanSummaryProps {
    language: string;
    selectedCountryId: string;
    setActiveStep: (step: number) => void;
    setSelectedAddon: (addon: any) => void;
    selectedAddon?: any;
    selectedPlan: any;
    profile?: any;
}
const fetcher = (url: string | URL | Request) => fetch(url).then(res => res.json());

const PlanSummary: React.FC<PlanSummaryProps> = ({
    language,
    selectedAddon,
    setSelectedAddon,
    selectedCountryId,
    setActiveStep,
    profile,
    selectedPlan
}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const router = useRouter();

    const availableAddons = (selectedPlan?.addons || []).map((addon: any) => {
        const id = addon._id;
        const nameObj = addon.name?.[language]?.[0];
        const priceObj = addon.priceList?.find((p: any) => p.country === selectedCountryId);        
        return {
            id: id,
            name: nameObj?.value || '',
            price: priceObj?.price || 0,
        };
    });
    
    const addonsTotal = selectedAddon && Array.isArray(selectedAddon)
        ? selectedAddon.reduce((sum: number, addon: any) => {
            const addonPrice = typeof addon.price === 'number' ? addon.price : parseFloat(addon.price || '0');
            return sum + (isNaN(addonPrice) ? 0 : addonPrice);
        }, 0)
        : 0;
    const totalAmount = (typeof selectedPlan.price === 'number' ? selectedPlan.price : parseFloat(selectedPlan.price || '0')) + addonsTotal;
    const roundedTotalAmount = Math.round(totalAmount * 100) / 100;

    return (
        <div className='p-4 md:p-8 lg:px-16 bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]'>
            <div className="text-center mt-8">
                <h1 className="text-2xl md:text-4xl font-bold text-primary">
                    {language === 'en' && `Hi ${profile?.username}, Our deepest condolences`}
                    {language === 'si' && `ආයුබෝවන් ${profile?.username}, අපගේ ගැඹුරු සන්වේදනා`}
                    {language === 'ta' && `வணக்கம் ${profile?.username}, எங்கள் ஆழ்ந்த அனுதாபங்கள்`}
                </h1>
                <p className="text-primary my-2">
                    {' '}
                    {language === 'en' && 'and'}
                    {language === 'si' && 'සහ'}
                    {language === 'ta' && 'மற்றும்'}
                    {' '}
                    {selectedAddon && selectedAddon.length > 0 ? (
                        selectedAddon.length
                    ) : ' '}{' '}

                    <span className='text-[#880002]'>
                        {language === 'en' && (selectedAddon && selectedAddon.length > 0 ? 'with additional addons' : 'with no extra addons')}
                        {language === 'si' && (selectedAddon && selectedAddon.length > 0 ? 'අමතර සේවා සමඟ' : 'අමතර සේවා නොමැතිව')}
                        {language === 'ta' && (selectedAddon && selectedAddon.length > 0 ? 'கூடுதல் சேவைகளுடன்' : 'கூடுதல் சேவைகள் இல்லாமல்')}
                    </span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {/* Total & Features */}
                <div className="p-4 border border-gray-500">
                    <div className='flex justify-between text-primary'>
                        <p>
                            {language === 'en' && `Total amount to pay`}
                            {language === 'si' && `ගෙවිය යුතු මුළු මුදල`}
                            {language === 'ta' && `செலுத்த வேண்டிய மொத்த தொகை`}
                        </p>
                        <h1 className="text-xl font-bold">{selectedPlan.currency} {roundedTotalAmount.toFixed(2)}</h1>
                    </div>
                    <Separator />
                    {selectedPlan.features.map((feature: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                        <div key={index} className='flex justify-between items-center mt-2 mx-8'>
                            <p>{feature}</p>
                            <div className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-500">
                                <Check className="text-black w-4 h-4" />
                            </div>
                        </div>
                    ))}
                    {selectedAddon && selectedAddon.length > 0 && (
                        <>
                            {selectedAddon.map(
                                (
                                    addon: { name: string },
                                    idx: number
                                ) => (
                                    <div key={`addon-${idx}`} className='flex justify-between items-center mt-2 mx-8'>
                                        <p>{addon.name}</p>
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center border border-red-500 cursor-pointer"
                                            onClick={() => {
                                                const updatedAddons = selectedAddon.filter((_: any, removeIdx: number) => removeIdx !== idx);
                                                setSelectedAddon(updatedAddons);
                                            }}
                                            title="Remove"
                                        >
                                            <span className="text-red-500 font-bold text-lg leading-none">×</span>
                                        </div>
                                    </div>
                                )
                            )}
                        </>
                    )}
                </div>

                {/* Additional Services */}
                <div className="p-4 border border-gray-500">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-xl font-bold text-primary">
                            {language === 'en' && 'Additional Services'}
                            {language === 'si' && 'අමතර සේවා'}
                            {language === 'ta' && 'கூடுதல் சேவைகள்'}
                        </h1>
                    </div>
                    <Separator />

                    {availableAddons
                        .filter((service: { id: any; }) => {
                            // Only filter out addons that the user has manually selected
                            const userSelectedAddonIds = selectedAddon ? selectedAddon.map((a: any) => a.id) : [];
                            return !userSelectedAddonIds.includes(service.id);
                        })
                        .map(
                            (
                                service: {
                                    id: string;
                                    name: string;
                                    price: string | number;
                                },
                                index: React.Key | null | undefined
                            ) => (
                                <div key={index} className='flex justify-between items-center mt-2 mx-8'>
                                    <p>{service.name}</p>
                                    <div className='flex gap-6'>
                                        <p>{selectedPlan.currency} {service.price}</p>
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#34C759] cursor-pointer"
                                            onClick={() => setSelectedAddon([...(selectedAddon || []), service])}
                                        >
                                            <Plus className="text-[#34C759] font-bold w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                    {availableAddons.filter((service: { id: any; }) => {
                        // Only filter out addons that the user has manually selected
                        const userSelectedAddonIds = selectedAddon ? selectedAddon.map((a: any) => a.id) : [];
                        return !userSelectedAddonIds.includes(service.id);
                    }).length === 0 && (
                            <div className="text-center text-gray-500 mt-4">
                                {language === 'en' && 'No more add-ons available'}
                                {language === 'si' && 'තවත් අමතර සේවා නොමැත'}
                                {language === 'ta' && 'மேலும் கூடுதல் சேவைகள் இல்லை'}
                            </div>
                        )}

                </div>
            </div>

            {/* Terms Checkbox */}
            <div className='md:text-end flex items-center justify-end mt-8 break-words whitespace-normal'>
                <div>
                    {language === 'en' && 'I have read and accept the'}
                    {language === 'ta' && 'நான் படித்து ஏற்றுக்கொண்டேன்'}
                    {language === 'si' && 'මම කියවා පිළිගත්තා'}
                    {' '}
                    <span 
                        className='text-[#880002] underline cursor-pointer hover:text-[#660001] transition-colors'
                        onClick={() => setIsTermsModalOpen(true)}
                    >
                        {language === 'en' && 'Terms & Conditions'}
                        {language === 'si' && 'නියමයන් සහ කොන්දේසි'}
                        {language === 'ta' && 'விதிமுறைகளும் நிபந்தனைகளும்'}
                    </span>
                </div>
                <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 ml-2"
                    style={{
                        border: '2px solid #0D1322',
                        accentColor: '#0D1322',
                        color: '#0D1322',
                    }}
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setActiveStep(1);
                    }}
                    className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6"
                >
                    {/* Back */}
                    {language === 'en' && 'Back'}
                    {language === 'si' && 'ආපසු යන්න'}
                    {language === 'ta' && 'பின்னுக்கு'}
                </button>
                <button
                    className={`gap-2.5 self-stretch px-4 py-3 my-auto whitespace-nowrap rounded min-h-6 transition-all duration-200 ${
                        !isChecked 
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-60' 
                            : 'bg-[#0D1322] text-white hover:bg-[#1a2540]'
                    }`}
                    onClick={(e) => {
                        e.preventDefault();
                        setActiveStep(3);
                    }}
                    disabled={!isChecked}
                >
                    {/* Next */}
                    {language === 'en' && 'Next'}
                    {language === 'si' && 'ඊළඟට'}
                    {language === 'ta' && 'அடுத்தது'}
                </button>
            </div>

            {/* Terms Modal */}
            <TermsModal 
                isOpen={isTermsModalOpen} 
                onClose={() => setIsTermsModalOpen(false)} 
                language={language} 
            />
        </div>
    );
};

export default PlanSummary;
