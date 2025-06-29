"use client"
import React from "react";
import AdvertisementSidebar from "@/components/news-category/AdvertisementSidebar";
import { Separator } from "@/components/ui/separator";
import CountrySection from "@/components/obituary/CountrySection";
import TributeCard from "../../components/obituary/TributeCard";
import { Pagination } from "@/components/ui/pagination";
import PaginationBar from "@/components/category/PaginationBar";
import OrbituaryNavbar from "@/components/obituary/OrbituaryNavbar";

const tributeData = Array.from({ length: 10 }).map((_, index) => ({
    "_id": `685ac0799230744ead66da8c${index}`,
    "title": "31st day ceremony after death",
    "name": "Mr U. Gangezwer",
    "date": "01 Oct 2022",
    "address": "123 Street",
    "imageUrl": "/images/tribute.jpg",
    "condolences": 1
}));

const Obituary: React.FC = () => {
    function setCurrentPage(page: number): void {
        throw new Error("Function not implemented.");
    }

    return (
        <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16  py-6 max-md:px-5">
            <Separator className="mb-4" />
            <OrbituaryNavbar />
            <CountrySection />
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tributeData.map((item) => (
                            <TributeCard
                                key={item._id}
                                condolencesCount={item.condolences}
                                timeAgo={ "1 hour ago"}
                                imageUrl={item.imageUrl}
                                ceremonyTitle={item.title}
                                eventName={item.name}
                                date={item.date}
                                entry={item}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center md:mt-12">
                        <PaginationBar
                            currentPage={1}
                            totalPages={10}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>

                <div className="md:col-span-1">
                    <AdvertisementSidebar numberOfAds={4} />
                </div>


            </div>
        </section>
    );
};

export default Obituary;
