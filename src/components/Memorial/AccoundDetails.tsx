"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React from 'react';
interface AccoundDetailsProps {
    setActiveStep: (step: number) => void;
}

const AccoundDetails: React.FC<AccoundDetailsProps> = ({ setActiveStep }) => {
    return (
        <div className='p-4 md:p-8 lg:px-16 bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]'>
            <form>
                <div className="p-4 mb-6">
                    <h3 className="text-xl font-semibold text-center mb-4 text-primary">Hi name, Our deepest condolences.</h3>
                    <p className="text-center text-gray-500 mb-4 text-primary">
                        You have selected a 4 days obituary plan package, <span className='text-[#880002]'>with no extra addons</span>
                    </p>
                </div>
                <div className="flex-shrink min-w-0 mb-8">
                    <TitleWithUnderline text="Accound Details" underlineWidth={64} />
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
                            className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                    </div>
                    <div className="mb-4 col-span-1">
                        <label htmlFor="branch" className="pb-2 block">
                            Branch
                        </label>
                        <input
                            type="text"
                            id="branch"
                            className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                    </div>
                    <div className="mb-4 col-span-1">
                        <label htmlFor="accountNumber" className="pb-2 block">
                            Account Number
                        </label>
                        <input
                            type="text"
                            id="accountNumber"
                            className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                    </div>
                    <div className="mb-4 col-span-1">
                        <label htmlFor="accountHolder" className="pb-2 block">
                            Account holder&apos;s name
                        </label>
                        <input
                            type="text"
                            id="accountHolder"
                            required
                            className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        onClick={() => setActiveStep(7)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0B4157] rounded border border-teal-900 border-solid min-h-6 ">
                        Back
                    </button>
                    <button
                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 "
                        onClick={() => setActiveStep(9)}
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccoundDetails;