'use client'

import 'react-phone-input-2/lib/style.css';
import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import { PlusCircle, Trash2 } from 'lucide-react';
import { TitleWithUnderline } from '../ui/title-with-underline';
import { useLanguage } from '@/components/ui/LanguageProvider';

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
    const { language: langKey } = useLanguage();
    
    const translations = {
        english: {
            greeting: "Hi {username}, Our deepest condolences.",
            greetingAnonymous: "Hi there, Our deepest condolences.",
            packageInfo: "You have selected a {duration} days '{planName}' package,",
            contactDetailsTitle: "Contact Details",
            contactDetailsDescription: "You can add up to {max} contact detail{plural} for this plan.",
            countryLabel: "Country",
            selectCountry: "--Select Country--",
            loadingCountries: "Loading countries...",
            addressLabel: "Address",
            phoneLabel: "Phone number",
            nameLabel: "Name",
            relationshipLabel: "Relationship",
            selectRelationship: "--Select--",
            familyOption: "Family",
            friendOption: "Friend",
            emailLabel: "E-mail address",
            removeDetails: "Remove Details",
            addMoreDetails: "Add More Contact Details ({current}/{max})",
            backButton: "Back",
            nextButton: "Next"
        },
        tamil: {
            greeting: "வணக்கம் {username}, எங்கள் ஆழ்ந்த இரங்கல்கள்.",
            greetingAnonymous: "வணக்கம், எங்கள் ஆழ்ந்த இரங்கல்கள்.",
            packageInfo: "நீங்கள் {duration} நாட்கள் '{planName}' தொகுப்பை தேர்ந்தெடுத்துள்ளீர்கள்,",
            contactDetailsTitle: "தொடர்பு விவரங்கள்",
            contactDetailsDescription: "இந்த திட்டத்திற்கு நீங்கள் {max} தொடர்பு விவரங்கள்{plural} வரை சேர்க்கலாம்.",
            countryLabel: "நாடு",
            selectCountry: "--நாடு தேர்ந்தெடுக்கவும்--",
            loadingCountries: "நாடுகள் ஏற்றப்படுகின்றன...",
            addressLabel: "முகவரி",
            phoneLabel: "தொலைபேசி எண்",
            nameLabel: "பெயர்",
            relationshipLabel: "உறவுமுறை",
            selectRelationship: "--தேர்ந்தெடுக்கவும்--",
            familyOption: "குடும்பம்",
            friendOption: "நண்பர்",
            emailLabel: "மின்னஞ்சல் முகவரி",
            removeDetails: "விவரங்களை அகற்று",
            addMoreDetails: "மேலும் தொடர்பு விவரங்கள் சேர்க்கவும் ({current}/{max})",
            backButton: "பின்",
            nextButton: "அடுத்து"
        },
        sinhala: {
            greeting: "ආයුබෝවන් {username}, අපගේ ගැඹුරු සානුකම්පනාව.",
            greetingAnonymous: "ආයුබෝවන්, අපගේ ගැඹුරු සානුකම්පනාව.",
            packageInfo: "ඔබ දින {duration} ක '{planName}' පැකේජයක් තෝරාගෙන ඇත,",
            contactDetailsTitle: "සම්බන්ධතා විස්තර",
            contactDetailsDescription: "මෙම සැලැස්ම සඳහා ඔබට සම්බන්ධතා විස්තර {max}ක්{plural} දක්වා එකතු කළ හැක.",
            countryLabel: "රට",
            selectCountry: "--රට තෝරන්න--",
            loadingCountries: "රටවල් පූරණය වෙමින්...",
            addressLabel: "ලිපිනය",
            phoneLabel: "දුරකථන අංකය",
            nameLabel: "නම",
            relationshipLabel: "සම්බන්ධතාව",
            selectRelationship: "--තෝරන්න--",
            familyOption: "පවුල",
            friendOption: "මිතුරා",
            emailLabel: "විද්‍යුත් ලිපිනය",
            removeDetails: "විස්තර ඉවත් කරන්න",
            addMoreDetails: "තවත් සම්බන්ධතා විස්තර එකතු කරන්න ({current}/{max})",
            backButton: "ආපසු",
            nextButton: "ඊළඟ"
        }
    };
    
    const t = translations[langKey as keyof typeof translations] || translations.english;
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
                <TitleWithUnderline text={t.contactDetailsTitle} underlineWidth={64} />
                <p className="text-sm text-gray-600 mt-2">
                    {t.contactDetailsDescription
                        .replace('{max}', getMaxContactDetails().toString())
                        .replace('{plural}', getMaxContactDetails() > 1 ? 's' : '')
                    }
                </p>
            </div>

            {contacts.map((contact, index) => (
                <div key={index} className="space-y-4 mb-8 border-b pb-4">
                    {/* <h2 className="text-lg font-semibold text-blue-900">Contact Details {index + 1}</h2> */}
                    <div className="space-y-4">
                        <div>
                            <label className="pb-2 block">{t.countryLabel}<span className="text-[#880002]">*</span></label>
                            <select
                                value={contact.country}
                                onChange={(e) => handleChange(index, 'country', e.target.value)}
                                className="w-full p-4 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                                disabled={loadingCountries}
                            >
                                <option value="">
                                    {loadingCountries ? t.loadingCountries : t.selectCountry}
                                </option>
                                {countries.map((country) => (
                                    <option key={country._id} value={country._id}>
                                        {getCountryName(country)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="pb-2 block">{t.addressLabel}</label>
                            <input
                                type="text"
                                value={contact.address}
                                onChange={(e) => handleChange(index, 'address', e.target.value)}
                                className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            />
                        </div>

                        <div>
                            <label className="pb-2 block">{t.phoneLabel}<span className="text-[#880002]">*</span></label>
                            <PhoneInput
                                country={'lk'}
                                placeholder={t.phoneLabel}
                                containerClass="phone-input"
                                inputClass="form-control"
                                containerStyle={{
                                    border: '1px solid #0f766e',
                                    borderRadius: '0.5rem'
                                }}
                                inputStyle={{
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    paddingLeft: '60px',
                                    fontSize: '16px',
                                    width: '100%'
                                }}
                                buttonStyle={{
                                    border: 'none',
                                    borderRadius: '0.5rem 0 0 0.5rem'
                                }}
                                value={contact.phone}
                                onChange={(value) => handleChange(index, 'phone', value)}
                            />
                        </div>

                        <div>
                            <label className="pb-2 block">{t.nameLabel}<span className="text-[#880002]">*</span></label>
                            <input
                                type="text"
                                value={contact.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            />
                        </div>

                        <div>
                            <label className="pb-2 block">{t.relationshipLabel}</label>
                            <select
                                value={contact.relationship}
                                onChange={(e) => handleChange(index, 'relationship', e.target.value)}
                                className="w-full p-4 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                            >
                                <option value="">{t.selectRelationship}</option>
                                <option value="Family">{t.familyOption}</option>
                                <option value="Friend">{t.friendOption}</option>
                            </select>
                        </div>

                        <div>
                            <label className="pb-2 block">{t.emailLabel}</label>
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
                                <span>{t.removeDetails}</span>
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
                        {t.addMoreDetails
                            .replace('{current}', contacts.length.toString())
                            .replace('{max}', getMaxContactDetails().toString())
                        }
                    </span>
                </button>

                <div className="flex justify-end gap-2 items-center self-stretch">
                    <button
                        onClick={() => setActiveStep(3)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                        {t.backButton}
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
                        {t.nextButton}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactDetailsForm;
