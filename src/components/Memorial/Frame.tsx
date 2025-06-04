"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React, { useState } from 'react';
import Image from "next/image";
import { Check } from 'lucide-react';

interface FrameProps {
    setActiveStep: (step: number) => void;
}

interface FrameItem {
    src: string;
    name: string;
}

const Frame: React.FC<FrameProps> = ({ setActiveStep }) => {
    const frames: FrameItem[] = [
        { src: "/images/tribute.jpg", name: "frame 1" },
        { src: "/images/tribute.jpg", name: "frame 2" },
        { src: "/images/tribute.jpg", name: "frame 3" },
        { src: "/images/tribute.jpg", name: "frame 4" },
        { src: "/images/tribute.jpg", name: "frame 5" }
    ];

    const [selectedFrame, setSelectedFrame] = useState<string | null>(null);

    const handleSelectFrame = (name: string) => {
        setSelectedFrame(name);
    };

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
                    <TitleWithUnderline text="Add a Frame" underlineWidth={64} />
                </div>
                <div className="w-full">
                    <div className="border-2 border-gray-300  rounded flex flex-col items-center bg-white">
                        <div className=" flex justify-center items-center flex-wrap gap-8">
                            {frames.map((frame, idx) => (
                                <div
                                    key={idx}
                                    className={`relative  group cursor-pointer   p-1  text-center ${selectedFrame === frame.name ? "border-2 border-[#699635]" : ""
                                        }`}
                                    onClick={() => handleSelectFrame(frame.name)}
                                >
                                    <img
                                        src={frame.src}
                                        alt={frame.name}

                                        className="object-cover md:h-48 md:!w-48 aspect-square"
                                    />
                                    {selectedFrame === frame.name && (
                                        <div className="absolute -top-2 -right-2 bg-[#699635] text-white text-xs rounded-full p-1 shadow-md">
                                            <Check className="w-5 h-5" />
                                        </div>
                                    )}
                                    <p className="mt-2 text-sm text-gray-700">{frame.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='bg-[#F8D7DA] mt-4 p-2 text-sm text-red-800 rounded'>
                        Select a frame style in which you wish to display the primary image
                    </div>
                </div>
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        onClick={() => setActiveStep(5)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6"
                        type="button"
                    >
                        Back
                    </button>
                    <button
                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6"
                        type="button"
                        onClick={() => setActiveStep(7)}
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Frame;
