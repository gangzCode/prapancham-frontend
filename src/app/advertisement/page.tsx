"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AdvertisementTypeMenu from "@/components/advertisement/advertismentType";

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

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="mt-8">
            <AdvertisementTypeMenu
                types={adTypes}
                activeType={activeAdtype}
                setActiveType={setActiveAdtype}
            />
            <div className="py-8 px-4 md:px-8 lg:px-16">

                <div className="flex justify-center mb-4">
                    <Image
                        src={ads.banners.top}
                        alt="NEW ARRIVAL SUPER SALE"
                        width={1200}
                        height={200}
                        className="w-full max-h-[232px] object-cover"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {ads.gridAds.map((src, index) => (
                        <Image key={index} src={src} alt="Sale Banner" width={400} height={200} className="w-full" />
                    ))}
                </div>

                <div className="flex justify-center mb-4">
                    <Image
                        src={ads.banners.bottom}
                        alt="Large Black Friday banner"
                        width={1200}
                        height={300}
                        className="w-full max-h-[232px] object-cover"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="col-span-1 md:col-span-2">
                        <Image src="/images/top-ad-1.png" alt="Black Friday" width={800} height={400} className="w-full h-[232px] object-cover border border-gray-400 p-2" />
                    </div>
                    <div className="col-span-1">
                        <Image src="/images/top-ad-1.png" alt="Black Friday" width={400} height={200} className="w-full h-[232px] object-cover border border-gray-400 p-2" />
                    </div>
                    <div className="col-span-1">
                        <Image src="/images/top-ad-1.png" alt="Black Friday" width={400} height={200} className="w-full h-[232px] object-cover border border-gray-400 p-2" />
                    </div>
                    <div className="col-span-1">
                        <Image src="/images/top-ad-1.png" alt="Black Friday" width={400} height={200} className="w-full h-[232px] object-cover border  border-gray-400 p-2" />
                    </div>
                    <div className="col-span-1">
                        <Image src="/images/top-ad-1.png" alt="Black Friday" width={400} height={200} className="w-full h-[232px] object-cover border  border-gray-400 p-2" />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <Image src="/images/top-ad-1.png" alt="Black Friday" width={800} height={400} className="w-full h-[232px] object-cover border  border-gray-400 p-2" />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <Image src="/images/top-ad-1.png" alt="Black Friday" width={800} height={400} className="w-full h-[232px] object-cover border border-gray-400 p-2" />
                    </div>
                    <div className="col-span-1">
                        <Image src="/images/top-ad-1.png" alt="Black Friday" width={400} height={200} className="w-full h-[232px] object-cover border border-gray-400 p-2" />
                    </div>
                    <div className="col-span-1">
                        <Image src="/images/top-ad-1.png" alt="Black Friday" width={400} height={200} className="w-full h-[232px] object-cover border border-gray-400 p-2" />
                    </div>
                </div>

                <div className="pagination flex justify-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-primary"
                    >
                        <ArrowLeft />
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 mx-1 font-bold ${currentPage === index + 1 ? ' text-[#880002]' : 'text-primary border border-primary rounded-full'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-primary"
                    >
                        <ArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Advertisement;
