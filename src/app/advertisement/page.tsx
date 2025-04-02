"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AdvertisementTypeMenu from "@/components/advertisement/advertismentType";
import CountryMenu from "@/components/contact/CountryMenu";
import PaginationBar from "@/components/category/PaginationBar";


const ads = {
    banners: {
        top: "/images/top-ad-1.png",
        bottom: "/images/top-ad-2.png",
    },
    gridAds: [
        "/images/top-ad-1.png",
        "/images/top-ad-2.png",
        "/images/top-ad-3.png",
        "/images/top-ad-4.png",
        "/images/top-ad-1.png",
        "/images/top-ad-1.png",
    ]
};

const adTypes = [
    "Commercial (50 Posts)",
    "House for rent and sales (10 Posts)",
    "Job vacancies (15 Posts)",
];


const Advertisement = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;
    const [activeAdtype, setActiveAdtype] = useState(adTypes[0]);
    const [activeCountry, setActiveCountry] = useState('All');
    const categories = [
        "All",
        "Politics",
        "Sports",
        "Category1",
        "Category2",
        "Category3",];


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="mt-8">

            <CountryMenu
                countries={categories}
                activeCountry={activeCountry}
                setActiveCountry={setActiveCountry}
            />

            <div className="py-8 px-4 md:px-8 lg:px-16 space-y-4">
                <div className="bg-slate-50 shadow-lg p-4 ">
                    <img
                        src="https://images.unsplash.com/photo-1538688423619-a81d3f23454b"
                        alt="Black Friday Sale"
                        className="w-full max-h-[232px] object-cover"
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                    {ads.gridAds.map((src, index) => (
                        <div key={index} className="bg-slate-50 shadow-lg p-4 ">
                            <img
                                src={src}
                                alt="Black Friday Sale"
                                className="w-full max-h-[232px] object-cover"
                            />
                        </div>
                    ))}
                </div>

                <div className="bg-slate-50 shadow-lg p-4 ">
                    <img
                        src="https://images.unsplash.com/photo-1538688423619-a81d3f23454b"
                        alt="Black Friday Sale"
                        className="w-full max-h-[232px] object-cover"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
                    <div className="bg-slate-50 shadow-lg p-4 flex items-stretch md:col-span-2">
                        <img
                            src={ads.gridAds[0]}
                            alt="Top Image"
                            className="w-full h-full object-cover max-h-[232px]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:grid-cols-2 md:col-span-2">
                        {ads.gridAds.slice(1, 3).map((src, index) => (
                            <div key={index} className="bg-slate-50 shadow-lg p-4 flex items-stretch">
                                <img
                                    src={src}
                                    alt={`Image ${index + 2}`}
                                    className="w-full h-full object-cover max-h-[232px]"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {ads.gridAds.slice(0, 2).map((src, index) => (
                        <div key={index} className="bg-slate-50 shadow-lg p-4 ">
                            <img
                                src={src}
                                alt="Black Friday Sale"
                                className="w-full md:h-[464px]  h-auto object-cover"
                            />
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {ads.gridAds.slice(0, 2).map((src, index) => (
                        <div key={index} className="bg-slate-50 shadow-lg p-4 ">
                            <img
                                src={src}
                                alt="Black Friday Sale"
                                className="w-full max-h-[232px] h-auto object-cover"
                            />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
                    <div className="bg-slate-50 shadow-lg p-4 flex items-stretch md:col-span-2">
                        <img
                            src={ads.gridAds[0]}
                            alt="Top Image"
                            className="w-full h-full object-cover max-h-[232px]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:grid-cols-2 md:col-span-2">
                        {ads.gridAds.slice(1, 3).map((src, index) => (
                            <div key={index} className="bg-slate-50 shadow-lg p-4 flex items-stretch">
                                <img
                                    src={src}
                                    alt={`Image ${index + 2}`}
                                    className="w-full h-full object-cover max-h-[232px]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2 mb-4">
                    {ads.gridAds.slice(2, 3).map((src, index) => (
                        <div key={index} className="bg-slate-50 shadow-lg p-4 ">
                            <img
                                src={src}
                                alt="Black Friday Sale"
                                className="w-full md:h-[648px]  h-auto object-cover"
                            />
                        </div>
                    ))}
                </div>

                <div>
                    <PaginationBar />
                </div>

            </div>
        </div>
    );
};

export default Advertisement;
