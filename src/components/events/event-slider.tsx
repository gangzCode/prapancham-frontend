'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample event data array
const events = [
  {
    id: 1,
    name: 'Event 1',
    address: '123 Street, City, Country',
    date: '01/05/2025',
    imageUrl: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae',
  },
  {
    id: 2,
    name: 'Event 2',
    address: '456 Avenue, Town, Country',
    date: '10/06/2025',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008',
  },
  {
    id: 3,
    name: 'Event 3',
    address: '789 Boulevard, Village, Country',
    date: '15/07/2025',
    imageUrl: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd',
  },
];

const EventSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentEvent = events[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="relative w-full">
        <Image
          src={currentEvent.imageUrl}
          alt={currentEvent.name}
          width={800}
          height={400}
          className="w-full h-96 md:h-auto filter brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            className="bg-white bg-opacity-50 rounded-full p-2 mb-16 md:mb-0"
            onClick={prevImage}
          >
            <ChevronLeft className="text-gray-700" />
          </button>
          <button
            className="bg-white bg-opacity-50 rounded-full p-2 mb-16 md:mb-0"
            onClick={nextImage}
          >
            <ChevronRight className="text-gray-700" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
          <div className="text-white flex justify-between items-center">
            <div>
              <p className="text-sm">{currentEvent.address}</p>
              <h2 className="text-lg font-bold">{currentEvent.name}</h2>
            </div>
            <p className="text-sm">{currentEvent.date}</p>
          </div>
          <div className="flex flex-col sm:flex-row mt-4 w-full">
            <button className="bg-transparent border border-white text-white py-2 px-4 rounded-lg w-full sm:w-auto sm:flex-grow mr-0 sm:mr-2 mb-2 sm:mb-0 hover:bg-white hover:text-black transition-colors">
              View Event Details
            </button>
            <button className="bg-[#0A3F51] text-white py-2 px-4 rounded-lg w-full sm:w-auto hover:bg-[#0A3F51]/80 transition-colors">
              Book Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSlider;
