'use client'

import React, { useState } from 'react';
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

interface ContactDetailProps {
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

const ContactDetailsForm: React.FC<ContactDetailProps> = ({ setActiveStep }) => {
    const [contacts, setContacts] = useState<ContactDetail[]>([defaultDetail]);

    const handleChange = (index: number, field: keyof ContactDetail, value: string) => {
        const updated = [...contacts];
        updated[index][field] = value;
        setContacts(updated);
    };

    const addContact = () => {
        setContacts([...contacts, { ...defaultDetail }]);
    };

    const removeContact = (index: number) => {
        if (contacts.length === 1) return;
        const updated = contacts.filter((_, i) => i !== index);
        setContacts(updated);
    };

    return (
        <div className="p-4 md:p-8 lg:px-16 bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] mt-10">
            <div className="p-4 mb-6">
                <h3 className="text-xl font-semibold text-center mb-4 text-primary">Hi name, Our deepest condolences.</h3>
                <p className="text-center text-gray-500 mb-4 text-primary">
                    You have selected a 4 days obituary plan package, <span className='text-[#880002]'>with no extra addons</span>
                </p>
            </div>
            <div className="flex-shrink min-w-0 mb-8">
                <TitleWithUnderline text="Contact Details" underlineWidth={64} />
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
                            >
                                <option value="">--Select Country--</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
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
                    className="text-green-600 flex items-center space-x-1"
                >
                    <PlusCircle className="h-5 w-5" />
                    <span>Add More Contact Details</span>
                </button>

                <div className="flex justify-end gap-2 items-center self-stretch">
                    <button
                        onClick={() => setActiveStep(3)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                        Back
                    </button>
                    <button
                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 "
                        onClick={() => setActiveStep(5)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactDetailsForm;
