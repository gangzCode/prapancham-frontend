'use client'

import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { TitleWithUnderline } from '../ui/title-with-underline';

interface ContactDetail {
    country: string;
    address: string;
    phone: string;
    name: string;
    relationship: string;
    email: string;
}

interface Country {
    _id: string;
    name: {
        en: Array<{ name: string; value: string; _id: string }>;
        ta: Array<{ name: string; value: string; _id: string }>;
        si: Array<{ name: string; value: string; _id: string }>;
    };
    currencyCode: string;
    isDeleted: boolean;
    isActive: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
}

interface CountriesResponse {
    countries: Country[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };
}

interface ContactDetailProps {
    selectedPlan: any;
    profile: any;
    language: string;
    selectedAddon?: any;
    selectedCountryId: string;
    informationFormData?: any;
    initialContactData?: ContactDetail[];
    onContactDataChange?: (contactData: ContactDetail[]) => void;
    setActiveStep: (step: number) => void;
}

const defaultDetail: ContactDetail = {
    country: '',
    address: '',
    phone: '',
    name: '',
    relationship: '',
    email: '',
};

const ContactDetailsForm: React.FC<ContactDetailProps> = ({ 
    selectedPlan,
    profile,
    language,
    selectedAddon,
    selectedCountryId,
    informationFormData,
    initialContactData,
    onContactDataChange,
    setActiveStep 
}) => {
    const [contacts, setContacts] = useState<ContactDetail[]>(
        initialContactData && initialContactData.length > 0 
            ? initialContactData 
            : [defaultDetail]
    );
    const [countries, setCountries] = useState<Country[]>([]);
    const [loadingCountries, setLoadingCountries] = useState(true);

    // Get plan name based on language
    const getPlanName = () => {
        const planNames = selectedPlan?.name?.[language];
        return planNames?.[0]?.name || 'Selected Package';
    };

    // Get plan duration
    const getDuration = () => {
        return selectedPlan?.duration || 0;
    };

    // Get maximum number of contact details allowed
    const getMaxContactDetails = () => {
        return selectedPlan?.noofContectDetails || 1;
    };

    // Get addon info
    const getAddonInfo = () => {
        if (!selectedAddon || selectedAddon.length === 0) {
            return 'with no extra addons';
        }
        return `with ${selectedAddon.map((addon: any) => addon.name).join(', ')} addon${selectedAddon.length > 1 ? 's' : ''}`;
    };

    // Validation function to check if at least one contact has required fields filled
    const isFormValid = () => {
        return contacts.some(contact => 
            contact.country.trim() !== '' &&
            contact.phone.trim() !== '' &&
            contact.name.trim() !== ''
        );
    };

    // Fetch countries from API
    const fetchCountries = async () => {
        try {
            setLoadingCountries(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/country/active?page=1&limit=10`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch countries');
            }
            
            const data: CountriesResponse = await response.json();
            setCountries(data.countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
            // Keep empty array as fallback
            setCountries([]);
        } finally {
            setLoadingCountries(false);
        }
    };

    // Get country name based on current language
    const getCountryName = (country: Country) => {
        const languageKey = language as keyof typeof country.name;
        const nameArray = country.name[languageKey];
        return nameArray && nameArray.length > 0 ? nameArray[0].value || nameArray[0].name : 'Unknown Country';
    };

    const handleChange = (index: number, field: keyof ContactDetail, value: string) => {
        const updated = [...contacts];
        updated[index][field] = value;
        setContacts(updated);
        
        // Notify parent component of contact data changes
        if (onContactDataChange) {
            onContactDataChange(updated);
        }
    };

    const addContact = () => {
        const maxContacts = getMaxContactDetails();
        if (contacts.length < maxContacts) {
            // Create a fresh copy of defaultDetail for each new contact
            const newContact: ContactDetail = {
                country: '',
                address: '',
                phone: '',
                name: '',
                relationship: '',
                email: '',
            };
            const updatedContacts = [...contacts, newContact];
            setContacts(updatedContacts);
            
            // Notify parent component of contact data changes
            if (onContactDataChange) {
                onContactDataChange(updatedContacts);
            }
        }
    };

    const removeContact = (index: number) => {
        if (contacts.length === 1) return;
        const updated = contacts.filter((_, i) => i !== index);
        setContacts(updated);
        
        // Notify parent component of contact data changes
        if (onContactDataChange) {
            onContactDataChange(updated);
        }
    };

    // Fetch countries on component mount
    useEffect(() => {
        fetchCountries();
    }, []);

    // Log the received information form data
    React.useEffect(() => {
        console.log({
            "selectedPlan": selectedPlan,
            "selectedAddon": selectedAddon,
            "selectedCountryId": selectedCountryId,
            "profile": profile,
            "language": language,
            "informationFormData": informationFormData,
            "maxContactDetails": getMaxContactDetails(),
            "currentContactsCount": contacts.length,
            "contactDetails": contacts,
            "countries": countries,
            "loadingCountries": loadingCountries
        });
    }, [selectedPlan, selectedAddon, selectedCountryId, profile, language, informationFormData, contacts, countries, loadingCountries]);

    return (
        <div className="p-4 md:p-8 lg:px-16 bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] mt-10">
            <div className="p-4 mb-6">
                <h3 className="text-2xl md:text-4xl font-bold text-center mb-4 text-primary">
                    Hi {profile?.username || 'there'}, Our deepest condolences.
                </h3>
                <p className="text-center text-gray-500 mb-4 text-primary">
                    You have selected a {getDuration()} days '{getPlanName()}' package, <span className='text-[#880002]'>{getAddonInfo()}</span>
                </p>
            </div>
            <div className="flex-shrink min-w-0 mb-8">
                <TitleWithUnderline text="Contact Details" underlineWidth={64} />
                <p className="text-sm text-gray-600 mt-2">
                    You can add up to {getMaxContactDetails()} contact detail{getMaxContactDetails() > 1 ? 's' : ''} for this plan.
                </p>
            </div>

            {contacts.map((contact, index) => (
                <div key={index} className="space-y-4 mb-8 border-b pb-4">
                    {/* <h2 className="text-lg font-semibold text-blue-900">Contact Details {index + 1}</h2> */}
                    <div className="space-y-4">
                        <div>
                            <label className="pb-2 block">Country<span className="text-[#880002]">*</span></label>
                            <select
                                value={contact.country}
                                onChange={(e) => handleChange(index, 'country', e.target.value)}
                                className="w-full p-4 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                                disabled={loadingCountries}
                            >
                                <option value="">
                                    {loadingCountries ? 'Loading countries...' : '--Select Country--'}
                                </option>
                                {countries.map((country) => (
                                    <option key={country._id} value={country._id}>
                                        {getCountryName(country)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="pb-2 block">Address</label>
                            <input
                                type="text"
                                value={contact.address}
                                onChange={(e) => handleChange(index, 'address', e.target.value)}
                                className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            />
                        </div>

                        <div>
                            <label className="pb-2 block">Phone number<span className="text-[#880002]">*</span></label>
                            <input
                                type="text"
                                value={contact.phone}
                                onChange={(e) => handleChange(index, 'phone', e.target.value)}
                                className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            />
                        </div>

                        <div>
                            <label className="pb-2 block">Name<span className="text-[#880002]">*</span></label>
                            <input
                                type="text"
                                value={contact.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            />
                        </div>

                        <div>
                            <label className="pb-2 block">Relationship</label>
                            <select
                                value={contact.relationship}
                                onChange={(e) => handleChange(index, 'relationship', e.target.value)}
                                className="w-full p-4 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                            >
                                <option value="">--Select--</option>
                                <option value="Family">Family</option>
                                <option value="Friend">Friend</option>
                            </select>
                        </div>

                        <div>
                            <label className="pb-2 block">E-mail address</label>
                            <input
                                type="email"
                                value={contact.email}
                                onChange={(e) => handleChange(index, 'email', e.target.value)}
                                className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => removeContact(index)}
                                className="text-[#880002] flex items-center space-x-1"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span>Remove Details</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex md:flex-row flex-col justify-between mt-4 gap-6">
                <button
                    type="button"
                    onClick={addContact}
                    disabled={contacts.length >= getMaxContactDetails()}
                    className={`flex items-center space-x-1 ${
                        contacts.length >= getMaxContactDetails()
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-green-600 hover:text-green-700 cursor-pointer'
                    }`}
                >
                    <PlusCircle className="h-5 w-5" />
                    <span>
                        Add More Contact Details 
                        ({contacts.length}/{getMaxContactDetails()})
                    </span>
                </button>

                <div className="flex justify-end gap-2 items-center self-stretch">
                    <button
                        onClick={() => setActiveStep(3)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                        Back
                    </button>
                    <button
                        className={`gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap rounded min-h-6 ${
                            isFormValid() 
                                ? 'bg-[#0D1322] hover:bg-[#1a2647] cursor-pointer' 
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() => {
                            if (isFormValid()) {
                                setActiveStep(5);
                            }
                        }}
                        disabled={!isFormValid()}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactDetailsForm;
