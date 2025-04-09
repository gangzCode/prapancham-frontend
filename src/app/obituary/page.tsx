import React from "react";
import AdvertisementSidebar from "@/components/news-category/AdvertisementSidebar";
import { Separator } from "@/components/ui/separator";
import CountrySection from "@/components/obituary/CountrySection";
import TributeCard from "../../components/obituary/TributeCard";
import { Pagination } from "@/components/ui/pagination";
import PaginationBar from "@/components/category/PaginationBar";
import OrbituaryNavbar from "@/components/obituary/OrbituaryNavbar";

const tributeData = Array.from({ length: 10 }).map((_, index) => ({
    id: index,
    condolencesCount: Math.floor(Math.random() * 10) + 1,
    timeAgo: `${Math.floor(Math.random() * 5) + 1} hour${Math.random() > 0.5 ? "s" : ""} ago`,
    imageUrl: "/images/tribute.jpg",
    ceremonyTitle: "31st day ceremony after death",
    eventName: `Event Name ${index + 1}`,
    date: "DD/MM/YYYY",
}));

const Events: React.FC = () => {
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
                                key={item.id}
                                condolencesCount={item.condolencesCount}
                                timeAgo={item.timeAgo}
                                imageUrl={item.imageUrl}
                                ceremonyTitle={item.ceremonyTitle}
                                eventName={item.eventName}
                                date={item.date}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center md:mt-12">
                        <PaginationBar />
                    </div>
                </div>

                {/* Right side advertisement section - 1/3 width on desktop */}
                <div className="md:col-span-1">
                    <AdvertisementSidebar numberOfAds={4} />
                </div>


            </div>
        </section>
    );
};

export default Events;
