'use client';

import React, { useState } from "react";
import Calendar from "@/components/events/calendar";
import EventSlider from "@/components/events/event-slider";
import EventList from "@/components/events/event-list";
import AdvertisementSidebar from "@/components/news-category/AdvertisementSidebar";

const Events: React.FC = () => {
    const [year, setYear] = useState<number | null>(2025);
    const [month, setMonth] = useState<number | null>(6);
    const [day, setDay] = useState<number | null>(15);


    return (
        <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16 py-6 max-md:px-5">
            <Calendar
                year={year}
                month={month}
                day={day}
                setYear={setYear}
                setMonth={setMonth}
                setDay={setDay}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <EventSlider />
                    <EventList
                        year={year}
                        month={month}
                        day={day}
                    />
                </div>
                <div className="md:col-span-1">
                    <AdvertisementSidebar numberOfAds={6} />
                </div>
            </div>
        </section>
    );
};

export default Events;
