import React from "react";
import { Headphones, Youtube } from "lucide-react";
import Calendar from "@/components/events/calendar";
import EventSlider from "@/components/events/event-slider";
import EventList from "@/components/events/event-list";
import AdvertisementSidebar from "@/components/news-category/AdvertisementSidebar";


const Events: React.FC = () => {
    return (
        <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16  py-6 max-md:px-5">
            <Calendar />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <EventSlider />
                    <EventList />
                </div>

                {/* Right side advertisement section - 1/3 width on desktop */}
                <div className="md:col-span-1">
                    <AdvertisementSidebar numberOfAds={6} />
                </div>
            </div>
        </section>
    );
};

export default Events;
