'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PaginationBar from '../category/PaginationBar';
import useSWR from 'swr';
import { useLanguage } from "@/components/ui/LanguageProvider";

interface Attendee {
    id: number;
    name: string;
    imageUrl: string;
}

interface EventCardProps {
    title: string;
    date: string;
    description: string;
    attendees: number;
    organizer: string;
    eventImage: string;
    bookEvent?: string;
    peopleHaveRegistered?: string;
    eventLink?: string;
}
interface CalendarProps {
    year: number | null;
    month: number | null;
    day: number | null;
}


const EventCard: React.FC<EventCardProps> = ({
    title,
    date,
    description,
    attendees,
    organizer,
    eventImage,
    peopleHaveRegistered,
    eventLink,
    bookEvent,

}) => {
    return (
        <div className="bg-white mb-6 p-4 flex flex-col md:flex-row items-start shadow-[0_4px_6px_0_rgba(0,0,0,0.1),0_2px_3px_0_rgba(0,0,0,0.08)]">
            <img
                alt="People attending the event"
                className="w-full md:w-32 aspect-[1/1] mr-4 mb-4 md:mb-0"
                src={eventImage}
            />
            <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-600 mb-1 text-sm">{date}</p>
                <p className="mb-2">{description}</p>
                <div className="flex items-center mb-2">
                    {/* {attendees.slice(0, 5).map((attendee) => (
                        <img
                            key={attendee.id}
                            alt={`Attendee ${attendee.id}`}
                            className="w-8 h-8 rounded-full border-2 border-white -ml-2"
                            src={attendee.imageUrl}
                        />
                    ))} */}
                    <span className="ml-2">{`${attendees} ${peopleHaveRegistered}`}</span>
                </div>
            </div>
            <div className="flex flex-col items-end w-full md:w-auto">
                <span className="mb-2  text-sm"><span className="text-green-500">●</span> {organizer}</span>
                {/* <button className="mb-2 px-8 py-2 border border-[#0D1322] text-[#0D1322]  w-full sm:w-auto rounded-md bg-transparent hover:bg-primary hover:text-white transition-colors">
                    View more
                </button> */}
                <a
                    href={eventLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0D1322] text-white py-2 px-8 rounded-lg w-full sm:w-auto hover:bg-[#0D1322]/80 transition-colors text-center block sm:inline-block"
                >
                    {bookEvent || "Book Event"}
                </a>

            </div>
        </div>
    );
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

const EventList: React.FC<CalendarProps> = ({ year, month, day }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 7;
    const { language } = useLanguage();

    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/event/active?page=${currentPage}&limit=${eventsPerPage}&year=${year || ''}&month=${month || ''}&day=${day || ''}`,
        fetcher
    );

    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Failed to load events</div>;

    const events = data?.events || [];
    const totalPages = data?.pagination?.totalPages || 1;
    let langKey: LanguageKey;

    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";
    else langKey = "en";
    type LanguageKey = 'en' | 'ta' | 'si';
    const translations: Record<LanguageKey, { [key: string]: string }> = {
        en: {
            noEventsFound: "No events found",
            bookEvent: "Book Event",
            peopleHaveRegistered: "people have registered",
        },
        ta: {
            noEventsFound: "நிகழ்வுகள் எதுவும் கிடைக்கவில்லை",
            bookEvent: "நிகழ்வை பதிவு செய்",
            peopleHaveRegistered: "பதிவு செய்துள்ளவர்கள்",
        },
        si: {
            noEventsFound: "නොමැති සිදුවීම්",
            bookEvent: "සිදුවීමක් වෙන්කරන්න",
            peopleHaveRegistered: "පිළිගත් පුද්ගලයින්",
        },
    };
    const t = translations[langKey];


    return (
        <div className='mt-10'>
            <div className="event-list">
                {events.length === 0 ? (
                    <p>{t.noEventsFound}</p>
                ) : (
                    (() => {

                        return events.map((event: any) => {
                            const eventDate = new Date(event.eventDate);
                            const formattedDate = eventDate.toLocaleString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            }).replace(',', ' -').replace(',', ' -');

                            return (
                                <EventCard
                                    key={event._id}
                                    title={event.name[langKey]?.[0]?.value || ''}
                                    date={formattedDate}
                                    description={event.description[langKey]?.[0]?.value || ''}
                                    attendees={event.registeredPeopleCount || "0"}
                                    organizer={event.organizer || ''}
                                    eventImage={event.image}
                                    bookEvent={t.bookEvent}
                                    peopleHaveRegistered={t.peopleHaveRegistered}
                                    eventLink={event.eventLink || ''}
                                />
                            );
                        });
                    })()
                )}
            </div>

            <div>
                <PaginationBar
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default EventList;
