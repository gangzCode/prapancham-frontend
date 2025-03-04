"use client";

import EventCard from "./EventCard";
import FeaturedEvent from "./FeaturedEvent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TitleWithUnderline } from "@/components/ui/title-with-underline";
import { ArrowRight } from "lucide-react";
import React from "react";

const events = [
  {
    imageUrl: "/images/event-1.png",
    location: "Ravindra Bharathi Auditorium, Hyderabad",
    eventName: "Classical Fusion Night: Carnatic Meets Jazz",
    date: "15/03/2024",
  },
  {
    imageUrl: "/images/event-2.png",
    location: "Music Academy, Chennai",
    eventName: "Annual Thyagaraja Aradhana Festival",
    date: "28/03/2024",
  },
  {
    imageUrl: "/images/event-1.png",
    location: "Chowdiah Memorial Hall, Bangalore",
    eventName: "Youth Classical Music Competition",
    date: "05/04/2024",
  },
];

const UpcomingEvents: React.FC = () => {
  const [currentEventIndex, setCurrentEventIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
      }
    }, 3000); // Change event every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentEvent = events[currentEventIndex];

  return (
    <section className="flex flex-wrap gap-6 justify-center px-32 mt-6 w-full max-md:px-5 max-md:max-w-full">
<<<<<<< HEAD
      <div className="flex-1 shrink rounded-2xl basis-4 min-w-60 max-md:max-w-full h-[600px]">
        <header className="w-full overflow-hidden">
=======
      <header className="flex flex-row items-center justify-between w-full gap-4 sm:gap-6 md:gap-10 overflow-hidden">
        <div className="flex-shrink min-w-0">
>>>>>>> 688f1f4 (Merge branch 'feature/home')
          <TitleWithUnderline text="Upcoming Events" underlineWidth={64} />
        </div>
        <button className="flex-shrink-0 flex items-center gap-2 text-red-800 hover:text-red-700 transition-colors">
          <span className="text-sm sm:text-base md:text-heading-base">
            View more
          </span>
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </header>
      <div className="flex-1 shrink rounded-2xl basis-4 min-w-60 max-md:max-w-full h-[600px]">
        <div className="flex flex-wrap flex-1 gap-2 justify-center mt-4 h-full max-md:max-w-full">
          <ScrollArea className="overflow-hidden flex-1 shrink p-2 basis-0 min-w-60 max-md:max-w-full h-[calc(100%-40px)]">
            <div className="flex flex-col gap-1">
              {events.map((event, index) => (
                <EventCard
                  key={index}
                  imageUrl={event.imageUrl}
                  location={event.location}
                  eventName={event.eventName}
                  date={event.date}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="transition-opacity duration-500"
      >
        <FeaturedEvent
          imageUrl={currentEvent.imageUrl}
          location={currentEvent.location}
          eventName={currentEvent.eventName}
          date={currentEvent.date}
        />
      </div>
    </section>
  );
};

export default UpcomingEvents;
