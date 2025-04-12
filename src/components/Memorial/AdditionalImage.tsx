"use client";

import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import React, { useEffect, useState, DragEvent } from 'react';
import Image from "next/image";
import { CirclePlus } from 'lucide-react';

interface AdditionalImageProps {
    setActiveStep: (step: number) => void;
}

const AdditionalImage: React.FC<AdditionalImageProps> = ({ setActiveStep }) => {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith("image/"));
        const newPreviews = droppedFiles.map(file => URL.createObjectURL(file));

        setImages(prev => [...prev, ...droppedFiles]);
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files ?? []).filter(file => file.type.startsWith("image/"));
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));

        setImages(prev => [...prev, ...selectedFiles]);
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index: number) => {
        const updatedImages = [...images];
        const updatedPreviews = [...previews];

        updatedImages.splice(index, 1);
        URL.revokeObjectURL(previews[index]);
        updatedPreviews.splice(index, 1);

        setImages(updatedImages);
        setPreviews(updatedPreviews);
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
                    <TitleWithUnderline text="Additional Images" underlineWidth={64} />
                </div>
                <div className="w-full">
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="border-2 md:h-60 border-gray-300 p-4 md:p-16 rounded-lg flex flex-col items-center justify-center text-center bg-white hover:border-primary transition"
                    >
                        {previews.length > 0 && (
                            <div className=" flex justify-center items-center flex-wrap gap-8">
                                {previews.map((src, idx) => (
                                    <div key={idx} className="relative group">
                                        <img
                                            src={src}
                                            alt={`Preview ${idx + 1}`}
                                            className=" md:h-48 object-cover aspect-square"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                {previews.length < 5 && (
                                    <div className="relative group">
                                        <div className="border-2 rounded h-48 aspect-square border-dashed border-gray-300 flex items-center justify-center p-4 min-h-48">
                                            <div className="text-center">
                                                <label htmlFor="imageUpload" className="cursor-pointer">
                                                    <CirclePlus className="w-7 h-7 text-primary mx-auto mb-2" strokeWidth={2} />
                                                </label>

                                                <input
                                                    id="imageUpload"
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleBrowse}
                                                    className="hidden"
                                                />

                                                <p className="text-primary mt-2">
                                                    {5 - previews.length} more images left
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {previews.length === 0 && (
                            <div>
                                <p className="text-gray-500 mb-2">Drag & drop images here or click to browse</p>
                                <label className="cursor-pointer text-white bg-primary px-8 py-2">
                                    Browse Files...
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleBrowse}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="bg-[#F8D7DA] mt-4 p-2 rounded flex flex-col gap-4">
                        <div>Recommended image size</div>
                        <div>Recommended image type</div>
                        <div>Image max size</div>
                        <div>You can upload only 1 primary image</div>
                    </div>

                </div>
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        onClick={() => setActiveStep(6)}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0B4157] rounded border border-teal-900 border-solid min-h-6 ">
                        Back
                    </button>
                    <button
                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 "
                        onClick={() => setActiveStep(8)}
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdditionalImage;