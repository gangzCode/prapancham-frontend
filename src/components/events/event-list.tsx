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
    attendees: Attendee[];
    organizer: string;
    eventImage: string;
}

const EventCard: React.FC<EventCardProps> = ({
    title,
    date,
    description,
    attendees,
    organizer,
    eventImage,
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
                    {attendees.slice(0, 5).map((attendee) => (
                        <img
                            key={attendee.id}
                            alt={`Attendee ${attendee.id}`}
                            className="w-8 h-8 rounded-full border-2 border-white -ml-2"
                            src={attendee.imageUrl}
                        />
                    ))}
                    <span className="ml-2">{`${attendees.length} people have registered`}</span>
                </div>
            </div>
            <div className="flex flex-col items-end w-full md:w-auto">
                <span className="mb-2  text-sm"><span className="text-green-500">●</span> {organizer}</span>
                <button className="mb-2 px-8 py-2 border border-[#0A3F51] text-[#0A3F51]  w-full sm:w-auto rounded-md bg-transparent hover:bg-primary hover:text-white transition-colors">
                    View more
                </button>
                <button className="bg-[#0A3F51] text-white py-2 px-8 rounded-lg w-full sm:w-auto hover:bg-[#0A3F51]/80 transition-colors">
                    Book Event
                </button>
            </div>
        </div>
    );
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

const EventList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 7;
    const { language } = useLanguage();

    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/event/active?page=${currentPage}&limit=${eventsPerPage}`,
        fetcher
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Failed to load events</div>;

    const events = data?.events || [];
    const totalPages = data?.pagination?.totalPages || 1;

    return (
        <div className='mt-10'>
            <div className="event-list">
                {(() => {
                    let langKey = language;
                    if (langKey === "english") langKey = "en";
                    if (langKey === "tamil") langKey = "ta";
                    if (langKey === "sinhala") langKey = "si";
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
                                attendees={[]} 
                                organizer={event.organizer || ''}
                                eventImage={event.image}
                            />
                        );
                    });
                })()}
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
