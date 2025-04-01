'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
            <img alt="People attending the event" className="w-32 h-32 rounded-md mr-4" src={eventImage} />
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
            <div className="flex flex-col items-end">
                <span className="mb-2  text-sm"><span className="text-green-500">●</span> {organizer}</span>
                <button className="mb-2 px-8 py-2 border border-[#0A3F51] text-[#0A3F51] rounded-md bg-transparent hover:bg-primary hover:text-white transition-colors">
                    View more
                </button>
                <button className="bg-[#0A3F51] text-white py-2 px-8 rounded-lg w-full sm:w-auto hover:bg-[#0A3F51]/80 transition-colors">
                    Book Event
                </button>
            </div>
        </div>
    );
};

const EventList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 9;

    const events = [
        {
            title: 'Event 1',
            date: 'Tuesday - Feb 07, 2025 - 9:00 PM',
            description: 'no2. masdd, sddd, sdsdddffd',
            attendees: [
                { id: 1, name: 'Attendee 1', imageUrl: 'https://storage.googleapis.com/a1aa/image/WpYM3R-C69SiR3u0ZBVgoaVLPpaAzd4Mgx7zxGqR30M.jpg' },
                { id: 2, name: 'Attendee 2', imageUrl: 'https://storage.googleapis.com/a1aa/image/bcA1oIydlhkWJJ7Jlwm22KMwQiLVNZQinDmq-I6R6MA.jpg' },
                { id: 3, name: 'Attendee 3', imageUrl: 'https://storage.googleapis.com/a1aa/image/eWz3K9uN30e2uNXszdWk_d5aJkwnQSQu8Sm-Aswsv7o.jpg' },
                { id: 4, name: 'Attendee 4', imageUrl: 'https://storage.googleapis.com/a1aa/image/DQimsrnpYjVqF_WDtYqxHIsbmW0I2R6HrQw6RA5bs10.jpg' },
                { id: 5, name: 'Attendee 5', imageUrl: 'https://storage.googleapis.com/a1aa/image/b-2uUEe6r0ZYDFtA8csYUgtfY1F_DlQznQEAfczFTs4.jpg' },
            ],
            organizer: 'Event organizer',
            eventImage: 'https://storage.googleapis.com/a1aa/image/eacgDKnntV8qXLLjEJCo2MaE3ipiN_Vvn48FHDJvyg4.jpg',
        },
        {
            title: 'Event 2',
            date: 'Tuesday - Feb 07, 2025 - 9:00 PM',
            description: 'no2. masdd, sddd, sdsdddffd',
            attendees: [
                { id: 1, name: 'Attendee 1', imageUrl: 'https://storage.googleapis.com/a1aa/image/WpYM3R-C69SiR3u0ZBVgoaVLPpaAzd4Mgx7zxGqR30M.jpg' },
                { id: 2, name: 'Attendee 2', imageUrl: 'https://storage.googleapis.com/a1aa/image/bcA1oIydlhkWJJ7Jlwm22KMwQiLVNZQinDmq-I6R6MA.jpg' },
                { id: 3, name: 'Attendee 3', imageUrl: 'https://storage.googleapis.com/a1aa/image/eWz3K9uN30e2uNXszdWk_d5aJkwnQSQu8Sm-Aswsv7o.jpg' },
                { id: 4, name: 'Attendee 4', imageUrl: 'https://storage.googleapis.com/a1aa/image/DQimsrnpYjVqF_WDtYqxHIsbmW0I2R6HrQw6RA5bs10.jpg' },
                { id: 5, name: 'Attendee 5', imageUrl: 'https://storage.googleapis.com/a1aa/image/b-2uUEe6r0ZYDFtA8csYUgtfY1F_DlQznQEAfczFTs4.jpg' },
            ],
            organizer: 'Event organizer',
            eventImage: 'https://storage.googleapis.com/a1aa/image/eacgDKnntV8qXLLjEJCo2MaE3ipiN_Vvn48FHDJvyg4.jpg',
        },
        {
            title: 'Event 3',
            date: 'Tuesday - Feb 07, 2025 - 9:00 PM',
            description: 'no2. masdd, sddd, sdsdddffd',
            attendees: [
                { id: 1, name: 'Attendee 1', imageUrl: 'https://storage.googleapis.com/a1aa/image/WpYM3R-C69SiR3u0ZBVgoaVLPpaAzd4Mgx7zxGqR30M.jpg' },
                { id: 2, name: 'Attendee 2', imageUrl: 'https://storage.googleapis.com/a1aa/image/bcA1oIydlhkWJJ7Jlwm22KMwQiLVNZQinDmq-I6R6MA.jpg' },
                { id: 3, name: 'Attendee 3', imageUrl: 'https://storage.googleapis.com/a1aa/image/eWz3K9uN30e2uNXszdWk_d5aJkwnQSQu8Sm-Aswsv7o.jpg' },
                { id: 4, name: 'Attendee 4', imageUrl: 'https://storage.googleapis.com/a1aa/image/DQimsrnpYjVqF_WDtYqxHIsbmW0I2R6HrQw6RA5bs10.jpg' },
                { id: 5, name: 'Attendee 5', imageUrl: 'https://storage.googleapis.com/a1aa/image/b-2uUEe6r0ZYDFtA8csYUgtfY1F_DlQznQEAfczFTs4.jpg' },
            ],
            organizer: 'Event organizer',
            eventImage: 'https://storage.googleapis.com/a1aa/image/eacgDKnntV8qXLLjEJCo2MaE3ipiN_Vvn48FHDJvyg4.jpg',
        },
        {
            title: 'Event 4',
            date: 'Tuesday - Feb 07, 2025 - 9:00 PM',
            description: 'no2. masdd, sddd, sdsdddffd',
            attendees: [
                { id: 1, name: 'Attendee 1', imageUrl: 'https://storage.googleapis.com/a1aa/image/WpYM3R-C69SiR3u0ZBVgoaVLPpaAzd4Mgx7zxGqR30M.jpg' },
                { id: 2, name: 'Attendee 2', imageUrl: 'https://storage.googleapis.com/a1aa/image/bcA1oIydlhkWJJ7Jlwm22KMwQiLVNZQinDmq-I6R6MA.jpg' },
                { id: 3, name: 'Attendee 3', imageUrl: 'https://storage.googleapis.com/a1aa/image/eWz3K9uN30e2uNXszdWk_d5aJkwnQSQu8Sm-Aswsv7o.jpg' },
                { id: 4, name: 'Attendee 4', imageUrl: 'https://storage.googleapis.com/a1aa/image/DQimsrnpYjVqF_WDtYqxHIsbmW0I2R6HrQw6RA5bs10.jpg' },
                { id: 5, name: 'Attendee 5', imageUrl: 'https://storage.googleapis.com/a1aa/image/b-2uUEe6r0ZYDFtA8csYUgtfY1F_DlQznQEAfczFTs4.jpg' },
            ],
            organizer: 'Event organizer',
            eventImage: 'https://storage.googleapis.com/a1aa/image/eacgDKnntV8qXLLjEJCo2MaE3ipiN_Vvn48FHDJvyg4.jpg',
        },
        {
            title: 'Event 5',
            date: 'Tuesday - Feb 07, 2025 - 9:00 PM',
            description: 'no2. masdd, sddd, sdsdddffd',
            attendees: [
                { id: 1, name: 'Attendee 1', imageUrl: 'https://storage.googleapis.com/a1aa/image/WpYM3R-C69SiR3u0ZBVgoaVLPpaAzd4Mgx7zxGqR30M.jpg' },
                { id: 2, name: 'Attendee 2', imageUrl: 'https://storage.googleapis.com/a1aa/image/bcA1oIydlhkWJJ7Jlwm22KMwQiLVNZQinDmq-I6R6MA.jpg' },
                { id: 3, name: 'Attendee 3', imageUrl: 'https://storage.googleapis.com/a1aa/image/eWz3K9uN30e2uNXszdWk_d5aJkwnQSQu8Sm-Aswsv7o.jpg' },
                { id: 4, name: 'Attendee 4', imageUrl: 'https://storage.googleapis.com/a1aa/image/DQimsrnpYjVqF_WDtYqxHIsbmW0I2R6HrQw6RA5bs10.jpg' },
                { id: 5, name: 'Attendee 5', imageUrl: 'https://storage.googleapis.com/a1aa/image/b-2uUEe6r0ZYDFtA8csYUgtfY1F_DlQznQEAfczFTs4.jpg' },
            ],
            organizer: 'Event organizer',
            eventImage: 'https://storage.googleapis.com/a1aa/image/eacgDKnntV8qXLLjEJCo2MaE3ipiN_Vvn48FHDJvyg4.jpg',
        },
        {
            title: 'Event 6',
            date: 'Tuesday - Feb 07, 2025 - 9:00 PM',
            description: 'no2. masdd, sddd, sdsdddffd',
            attendees: [
                { id: 1, name: 'Attendee 1', imageUrl: 'https://storage.googleapis.com/a1aa/image/WpYM3R-C69SiR3u0ZBVgoaVLPpaAzd4Mgx7zxGqR30M.jpg' },
                { id: 2, name: 'Attendee 2', imageUrl: 'https://storage.googleapis.com/a1aa/image/bcA1oIydlhkWJJ7Jlwm22KMwQiLVNZQinDmq-I6R6MA.jpg' },
                { id: 3, name: 'Attendee 3', imageUrl: 'https://storage.googleapis.com/a1aa/image/eWz3K9uN30e2uNXszdWk_d5aJkwnQSQu8Sm-Aswsv7o.jpg' },
                { id: 4, name: 'Attendee 4', imageUrl: 'https://storage.googleapis.com/a1aa/image/DQimsrnpYjVqF_WDtYqxHIsbmW0I2R6HrQw6RA5bs10.jpg' },
                { id: 5, name: 'Attendee 5', imageUrl: 'https://storage.googleapis.com/a1aa/image/b-2uUEe6r0ZYDFtA8csYUgtfY1F_DlQznQEAfczFTs4.jpg' },
            ],
            organizer: 'Event organizer',
            eventImage: 'https://storage.googleapis.com/a1aa/image/eacgDKnntV8qXLLjEJCo2MaE3ipiN_Vvn48FHDJvyg4.jpg',
        },
        {
            title: 'Event 1',
            date: 'Tuesday - Feb 07, 2025 - 9:00 PM',
            description: 'no2. masdd, sddd, sdsdddffd',
            attendees: [
                { id: 1, name: 'Attendee 1', imageUrl: 'https://storage.googleapis.com/a1aa/image/WpYM3R-C69SiR3u0ZBVgoaVLPpaAzd4Mgx7zxGqR30M.jpg' },
                { id: 2, name: 'Attendee 2', imageUrl: 'https://storage.googleapis.com/a1aa/image/bcA1oIydlhkWJJ7Jlwm22KMwQiLVNZQinDmq-I6R6MA.jpg' },
                { id: 3, name: 'Attendee 3', imageUrl: 'https://storage.googleapis.com/a1aa/image/eWz3K9uN30e2uNXszdWk_d5aJkwnQSQu8Sm-Aswsv7o.jpg' },
                { id: 4, name: 'Attendee 4', imageUrl: 'https://storage.googleapis.com/a1aa/image/DQimsrnpYjVqF_WDtYqxHIsbmW0I2R6HrQw6RA5bs10.jpg' },
                { id: 5, name: 'Attendee 5', imageUrl: 'https://storage.googleapis.com/a1aa/image/b-2uUEe6r0ZYDFtA8csYUgtfY1F_DlQznQEAfczFTs4.jpg' },
            ],
            organizer: 'Event organizer',
            eventImage: 'https://storage.googleapis.com/a1aa/image/eacgDKnntV8qXLLjEJCo2MaE3ipiN_Vvn48FHDJvyg4.jpg',
        },
        {
            title: 'Event 2',
            date: 'Tuesday - Feb 07, 2025 - 9:00 PM',
            description: 'no2. masdd, sddd, sdsdddffd',
            attendees: [
                { id: 1, name: 'Attendee 1', imageUrl: 'https://storage.googleapis.com/a1aa/image/WpYM3R-C69SiR3u0ZBVgoaVLPpaAzd4Mgx7zxGqR30M.jpg' },
                { id: 2, name: 'Attendee 2', imageUrl: 'https://storage.googleapis.com/a1aa/image/bcA1oIydlhkWJJ7Jlwm22KMwQiLVNZQinDmq-I6R6MA.jpg' },
                { id: 3, name: 'Attendee 3', imageUrl: 'https://storage.googleapis.com/a1aa/image/eWz3K9uN30e2uNXszdWk_d5aJkwnQSQu8Sm-Aswsv7o.jpg' },
                { id: 4, name: 'Attendee 4', imageUrl: 'https://storage.googleapis.com/a1aa/image/DQimsrnpYjVqF_WDtYqxHIsbmW0I2R6HrQw6RA5bs10.jpg' },
                { id: 5, name: 'Attendee 5', imageUrl: 'https://storage.googleapis.com/a1aa/image/b-2uUEe6r0ZYDFtA8csYUgtfY1F_DlQznQEAfczFTs4.jpg' },
            ],
            organizer: 'Event organizer',
            eventImage: 'https://storage.googleapis.com/a1aa/image/eacgDKnntV8qXLLjEJCo2MaE3ipiN_Vvn48FHDJvyg4.jpg',
        },
        {
            title: 'Event 3',
            date: 'Tuesday - Feb 07, 2025 - 9:00 PM',
            description: 'no2. masdd, sddd, sdsdddffd',
            attendees: [
                { id: 1, name: 'Attendee 1', imageUrl: 'https://storage.googleapis.com/a1aa/image/WpYM3R-C69SiR3u0ZBVgoaVLPpaAzd4Mgx7zxGqR30M.jpg' },
                { id: 2, name: 'Attendee 2', imageUrl: 'https://storage.googleapis.com/a1aa/image/bcA1oIydlhkWJJ7Jlwm22KMwQiLVNZQinDmq-I6R6MA.jpg' },
                { id: 3, name: 'Attendee 3', imageUrl: 'https://storage.googleapis.com/a1aa/image/eWz3K9uN30e2uNXszdWk_d5aJkwnQSQu8Sm-Aswsv7o.jpg' },
                { id: 4, name: 'Attendee 4', imageUrl: 'https://storage.googleapis.com/a1aa/image/DQimsrnpYjVqF_WDtYqxHIsbmW0I2R6HrQw6RA5bs10.jpg' },
                { id: 5, name: 'Attendee 5', imageUrl: 'https://storage.googleapis.com/a1aa/image/b-2uUEe6r0ZYDFtA8csYUgtfY1F_DlQznQEAfczFTs4.jpg' },
            ],
            organizer: 'Event organizer',
            eventImage: 'https://storage.googleapis.com/a1aa/image/eacgDKnntV8qXLLjEJCo2MaE3ipiN_Vvn48FHDJvyg4.jpg',
        },
        {
            title: 'Event 4',
            date: 'Tuesday - Feb 07, 2025 - 9:00 PM',
            description: 'no2. masdd, sddd, sdsdddffd',
            attendees: [
                { id: 1, name: 'Attendee 1', imageUrl: 'https://storage.googleapis.com/a1aa/image/WpYM3R-C69SiR3u0ZBVgoaVLPpaAzd4Mgx7zxGqR30M.jpg' },
                { id: 2, name: 'Attendee 2', imageUrl: 'https://storage.googleapis.com/a1aa/image/bcA1oIydlhkWJJ7Jlwm22KMwQiLVNZQinDmq-I6R6MA.jpg' },
                { id: 3, name: 'Attendee 3', imageUrl: 'https://storage.googleapis.com/a1aa/image/eWz3K9uN30e2uNXszdWk_d5aJkwnQSQu8Sm-Aswsv7o.jpg' },
                { id: 4, name: 'Attendee 4', imageUrl: 'https://storage.googleapis.com/a1aa/image/DQimsrnpYjVqF_WDtYqxHIsbmW0I2R6HrQw6RA5bs10.jpg' },
                { id: 5, name: 'Attendee 5', imageUrl: 'https://storage.googleapis.com/a1aa/image/b-2uUEe6r0ZYDFtA8csYUgtfY1F_DlQznQEAfczFTs4.jpg' },
            ],
            organizer: 'Event organizer',
            eventImage: 'https://storage.googleapis.com/a1aa/image/eacgDKnntV8qXLLjEJCo2MaE3ipiN_Vvn48FHDJvyg4.jpg',
        },
        {
            title: 'Event 5',
            date: 'Tuesday - Feb 07, 2025 - 9:00 PM',
            description: 'no2. masdd, sddd, sdsdddffd',
            attendees: [
                { id: 1, name: 'Attendee 1', imageUrl: 'https://storage.googleapis.com/a1aa/image/WpYM3R-C69SiR3u0ZBVgoaVLPpaAzd4Mgx7zxGqR30M.jpg' },
                { id: 2, name: 'Attendee 2', imageUrl: 'https://storage.googleapis.com/a1aa/image/bcA1oIydlhkWJJ7Jlwm22KMwQiLVNZQinDmq-I6R6MA.jpg' },
                { id: 3, name: 'Attendee 3', imageUrl: 'https://storage.googleapis.com/a1aa/image/eWz3K9uN30e2uNXszdWk_d5aJkwnQSQu8Sm-Aswsv7o.jpg' },
                { id: 4, name: 'Attendee 4', imageUrl: 'https://storage.googleapis.com/a1aa/image/DQimsrnpYjVqF_WDtYqxHIsbmW0I2R6HrQw6RA5bs10.jpg' },
                { id: 5, name: 'Attendee 5', imageUrl: 'https://storage.googleapis.com/a1aa/image/b-2uUEe6r0ZYDFtA8csYUgtfY1F_DlQznQEAfczFTs4.jpg' },
            ],
            organizer: 'Event organizer',
            eventImage: 'https://storage.googleapis.com/a1aa/image/eacgDKnntV8qXLLjEJCo2MaE3ipiN_Vvn48FHDJvyg4.jpg',
        },
        {
            title: 'Event 6',
            date: 'Tuesday - Feb 07, 2025 - 9:00 PM',
            description: 'no2. masdd, sddd, sdsdddffd',
            attendees: [
                { id: 1, name: 'Attendee 1', imageUrl: 'https://storage.googleapis.com/a1aa/image/WpYM3R-C69SiR3u0ZBVgoaVLPpaAzd4Mgx7zxGqR30M.jpg' },
                { id: 2, name: 'Attendee 2', imageUrl: 'https://storage.googleapis.com/a1aa/image/bcA1oIydlhkWJJ7Jlwm22KMwQiLVNZQinDmq-I6R6MA.jpg' },
                { id: 3, name: 'Attendee 3', imageUrl: 'https://storage.googleapis.com/a1aa/image/eWz3K9uN30e2uNXszdWk_d5aJkwnQSQu8Sm-Aswsv7o.jpg' },
                { id: 4, name: 'Attendee 4', imageUrl: 'https://storage.googleapis.com/a1aa/image/DQimsrnpYjVqF_WDtYqxHIsbmW0I2R6HrQw6RA5bs10.jpg' },
                { id: 5, name: 'Attendee 5', imageUrl: 'https://storage.googleapis.com/a1aa/image/b-2uUEe6r0ZYDFtA8csYUgtfY1F_DlQznQEAfczFTs4.jpg' },
            ],
            organizer: 'Event organizer',
            eventImage: 'https://storage.googleapis.com/a1aa/image/eacgDKnntV8qXLLjEJCo2MaE3ipiN_Vvn48FHDJvyg4.jpg',
        },
    ];

    // Pagination Logic
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(events.length / eventsPerPage);

    return (
        <div className='mt-10'>
            <div className="event-list">
                {currentEvents.map((event, index) => (
                    <EventCard
                        key={index}
                        title={event.title}
                        date={event.date}
                        description={event.description}
                        attendees={event.attendees}
                        organizer={event.organizer}
                        eventImage={event.eventImage}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
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
    );
};

export default EventList;
