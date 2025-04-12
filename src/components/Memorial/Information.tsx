"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React from 'react';
interface InformationProps {
    setActiveStep: (step: number) => void;
}

const Information: React.FC<InformationProps> = ({ setActiveStep }) => {
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
                    <TitleWithUnderline text="Information" underlineWidth={64} />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className={`pb-2 block`}>
                        Title &#40;Name of Deceased&#41;<span className="text-[#880002]">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className={`pb-2 block`}>
                        Address <span className="text-[#880002]">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className={`pb-2 block`}>
                        Date of Birth<span className="text-[#880002]">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className={`pb-2 block`}>
                        Date of Death<span className="text-[#880002]">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        required
                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        maxLength={2000}
                        className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                    <p className="text-xs">Maximum 2000 charactrts allowed</p>
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className={`pb-2 block`}>
                        Tribute Video
                    </label>
                    <input
                        type="text"
                        id="name"
                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                    />
                    <span className='text-xs'>Create a tribute video and upload it to YouTube. Then copy and paste it’s link here to show it in your tribute.</span>
                </div>
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        onClick={() => setActiveStep(2)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0B4157] rounded border border-teal-900 border-solid min-h-6 ">
                        Back
                    </button>
                    <button
                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 "
                        onClick={() => setActiveStep(4)}
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Information;