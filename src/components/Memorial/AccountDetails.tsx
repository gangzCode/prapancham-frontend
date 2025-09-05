"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React, { useState, useEffect } from 'react';

interface AccoundDetailsProps {
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
    initialAccountData?: any;
    onAccountDataChange?: (accountData: any) => void;
    setActiveStep: (step: number) => void;
}

const AccountDetails: React.FC<AccoundDetailsProps> = ({ 
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
    initialAccountData,
    onAccountDataChange,
    setActiveStep 
}) => {
    const [skipAccountDetails, setSkipAccountDetails] = useState(false);
    const [accountData, setAccountData] = useState({
        bankName: initialAccountData?.bankName || '',
        branch: initialAccountData?.branch || '',
        accountNumber: initialAccountData?.accountNumber || '',
        accountHolder: initialAccountData?.accountHolder || ''
    });

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

    const handleInputChange = (field: string, value: string) => {
        // For account number, only allow numbers
        if (field === 'accountNumber') {
            const numericValue = value.replace(/[^0-9]/g, '');
            const updatedData = { ...accountData, [field]: numericValue };
            setAccountData(updatedData);
            
            // Notify parent component of changes
            if (onAccountDataChange) {
                onAccountDataChange(updatedData);
            }
        } else {
            const updatedData = { ...accountData, [field]: value };
            setAccountData(updatedData);
            
            // Notify parent component of changes
            if (onAccountDataChange) {
                onAccountDataChange(updatedData);
            }
        }
    };

    const handleToggleSkip = () => {
        const newSkipValue = !skipAccountDetails;
        setSkipAccountDetails(newSkipValue);
        
        if (newSkipValue) {
            // If skipping, clear account data and notify parent
            const emptyData = {
                bankName: '',
                branch: '',
                accountNumber: '',
                accountHolder: ''
            };
            setAccountData(emptyData);
            if (onAccountDataChange) {
                onAccountDataChange(emptyData);
            }
        }
    };

    // Check if all required fields are filled
    const isFormValid = () => {
        if (skipAccountDetails) {
            return true; // If skipping, always valid
        }
        return accountData.bankName.trim() !== '' &&
               accountData.branch.trim() !== '' &&
               accountData.accountNumber.trim() !== '' &&
               accountData.accountHolder.trim() !== '';
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
            "additionalImagesData": additionalImagesData,
            "accountData": accountData
        });
    }, [selectedPlan, selectedAddon, selectedCountryId, profile, language, informationFormData, contactData, thumbnailImage, primaryImage, frameData, additionalImagesData, accountData]);
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
                    <TitleWithUnderline text="Accound Details" underlineWidth={64} />
                </div>
                
                {/* Toggle Button */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-lg font-medium text-gray-900 mb-1">
                                Skip Account Details
                            </h4>
                            <p className="text-sm text-gray-600">
                                Toggle this if you don't want to provide bank account details.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleToggleSkip}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                                skipAccountDetails ? 'bg-teal-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    skipAccountDetails ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>
                </div>

                <p className='text-primary mb-8'>To receive donations from others please include your account details.</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className="mb-4 col-span-1">
                        <label htmlFor="bankName" className="pb-2 block">
                            Bank name
                        </label>
                        <input
                            type="text"
                            id="bankName"
                            value={accountData.bankName}
                            onChange={(e) => handleInputChange('bankName', e.target.value)}
                            disabled={skipAccountDetails}
                            className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                                skipAccountDetails ? 'bg-gray-100 cursor-not-allowed' : ''
                            }`}
                        />
                    </div>
                    <div className="mb-4 col-span-1">
                        <label htmlFor="branch" className="pb-2 block">
                            Branch
                        </label>
                        <input
                            type="text"
                            id="branch"
                            value={accountData.branch}
                            onChange={(e) => handleInputChange('branch', e.target.value)}
                            disabled={skipAccountDetails}
                            className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                                skipAccountDetails ? 'bg-gray-100 cursor-not-allowed' : ''
                            }`}
                        />
                    </div>
                    <div className="mb-4 col-span-1">
                        <label htmlFor="accountNumber" className="pb-2 block">
                            Account Number
                        </label>
                        <input
                            type="text"
                            id="accountNumber"
                            value={accountData.accountNumber}
                            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                            disabled={skipAccountDetails}
                            placeholder="Enter numbers only"
                            className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                                skipAccountDetails ? 'bg-gray-100 cursor-not-allowed' : ''
                            }`}
                        />
                    </div>
                    <div className="mb-4 col-span-1">
                        <label htmlFor="accountHolder" className="pb-2 block">
                            Account holder&apos;s name
                        </label>
                        <input
                            type="text"
                            id="accountHolder"
                            value={accountData.accountHolder}
                            onChange={(e) => handleInputChange('accountHolder', e.target.value)}
                            disabled={skipAccountDetails}
                            required={!skipAccountDetails}
                            className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 ${
                                skipAccountDetails ? 'bg-gray-100 cursor-not-allowed' : ''
                            }`}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        type="button"
                        onClick={() => setActiveStep(8)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                        Back
                    </button>
                    <button
                        type="button"
                        className={`gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap rounded min-h-6 transition-colors ${
                            isFormValid() 
                                ? 'bg-[#0D1322] hover:bg-[#0D1322]/90 cursor-pointer' 
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() => isFormValid() && setActiveStep(10)}
                        disabled={!isFormValid()}
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountDetails;