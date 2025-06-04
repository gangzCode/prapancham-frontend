"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React, { useEffect, useState, DragEvent } from 'react';
import Image from "next/image";

interface PrimaryImageProps {
    setActiveStep: (step: number) => void;
}

const PrimaryImage: React.FC<PrimaryImageProps> = ({ setActiveStep }) => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = Array.from(e.dataTransfer.files)
            .find(file => file.type.startsWith("image/"));

        if (droppedFile) {
            if (preview) URL.revokeObjectURL(preview);
            setImage(droppedFile);
            setPreview(URL.createObjectURL(droppedFile));
        }
    };

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = Array.from(e.target.files ?? [])
            .find(file => file.type.startsWith("image/"));

        if (selectedFile) {
            if (preview) URL.revokeObjectURL(preview);
            setImage(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const removeImage = () => {
        if (preview) URL.revokeObjectURL(preview);
        setImage(null);
        setPreview(null);
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
                    <TitleWithUnderline text="Primary Image" underlineWidth={64} />
                </div>
                <div className="w-full">
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="border-2 min-h-[15rem] border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center text-center bg-white hover:border-primary transition"
                    >
                        {preview && (
                            <div className=" flex justify-center items-center flex-wrap ">
                                <div className="relative group">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className=" md:h-48 aspect-square object-cover  shadow"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        )}
                        {!preview && (
                            <>
                                <p className="text-gray-500 mb-2">Drag & drop image here or click to browse</p>
                                <label className="cursor-pointer text-white bg-primary px-8 py-2">
                                    Browse File...
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleBrowse}
                                        className="hidden"
                                    />
                                </label>
                            </>
                        )}
                    </div>
                    <div className='bg-[#F8D7DA] mt-4 p-4 rounded'>
                        Recommended image size<br />
                        Recommended image type<br />
                        Image max size<br />
                        You can upload only 1 primary image
                    </div>
                </div>
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        onClick={() => setActiveStep(4)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                        Back
                    </button>
                    <button
                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 "
                        onClick={() => setActiveStep(6)}
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PrimaryImage;