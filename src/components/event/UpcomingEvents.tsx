"use client";

import EventCard from "./EventCard";
import FeaturedEvent from "./FeaturedEvent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TitleWithUnderline } from "@/components/ui/title-with-underline";

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
  return (
    <section className="flex flex-wrap gap-6 justify-center px-32 mt-6 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex-1 shrink rounded-2xl basis-4 min-w-60 max-md:max-w-full h-[600px]">
        <header className="w-full max-md:max-w-full">
          <TitleWithUnderline text="Upcoming Events" underlineWidth={64} />
        </header>
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
      <FeaturedEvent
        imageUrl="/images/event-1.png"
        location="Ravindra Bharathi Auditorium, Hyderabad"
        eventName="Classical Fusion Night: Carnatic Meets Jazz"
        date="15/03/2024"
      />
    </section>
  );
};

export default UpcomingEvents;
