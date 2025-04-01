import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import PhotoCard from "../video-news/PhotoCard";
import { TitleWithUnderline } from "../ui/title-with-underline";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";

interface VideoNewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  editorName: string;
  category: string;
  duration: string;
}

const PoliticalNewsSection: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);


  const smallPhotos: VideoNewsItem[] = [
    {
      id: 1,
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis...",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      editorName: "Editor's name",
      category: "Category1",
      duration: "15 minutes ago",
    },
    {
      id: 2,
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis...",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      editorName: "Editor's name",
      category: "Category1",
      duration: "15 minutes ago",
    },
    {
      id: 3,
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis...",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552",
      editorName: "Editor's name",
      category: "Category1",
      duration: "15 minutes ago",
    },
  ];

  const featuredVideo: VideoNewsItem = {
    id: 4,
    title:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis...",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5",
    editorName: "Editor's name",
    category: "Category1",
    duration: "15 minutes ago",
  };
  const formatDate = () => {
    const date = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = days[date.getDay()];
    const dateNum = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const ordinal = (n: number) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${day}, ${ordinal(dateNum)} ${month} ${year}`;
  };
  return (
    <section className="flex flex-col justify-center mx-auto py-8 px-16 max-md:px-5">
      <div className="flex-row md:flex justify-between items-center mb-6 ">
        <div className="relative">

          <div className="flex-shrink min-w-0 max-w-full">
            <TitleWithUnderline text="Political News" underlineWidth={64} />
          </div>
        </div>
        {/* <a
          href="#"
          className="text-secondary text-heading-base flex items-center gap-1 hover:underline"
        >
          View more <ChevronRight className="w-4 h-4" />
        </a> */}

        <div className="flex gap-2 sm:gap-3.5 justify-center items-center">
          <time className="w-full  sm:w-auto text-center text-primary y order-2 sm:order-2 text-sm sm:text-base font-poppins">
            {formatDate()}
          </time>
          <div className="bg-[#880002] rounded p-2" onClick={() => setShowCalendar(!showCalendar)}>
            <CalendarIcon className="text-white h-4" />
          </div>
          {showCalendar && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div
                ref={calendarRef}
                className="bg-white rounded-lg shadow-lg p-4 w-80 relative"
              >
                <div className="text-gray-600 text-sm mb-2">Select date</div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-semibold">{date.toDateString()}</div>
                  <Pencil className="text-gray-600" />
                </div>
                <div className="border-t border-b py-2 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600">{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                    <div className="flex items-center space-x-2">
                      <ChevronLeft
                        className="text-gray-600 cursor-pointer"
                        onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}
                      />
                      <ChevronRight
                        className="text-gray-600 cursor-pointer"
                        onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-7 text-center text-gray-600 mb-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                    <div
                    // key={d}
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 text-center text-gray-800">
                  {[...Array(31)].map((_, i) => (
                    <div
                      // key={i}
                      className={`py-2 cursor-pointer ${date.getDate() === i + 1
                        ? "bg-primary text-white rounded-full"
                        : ""
                        }`}
                      onClick={() => setDate(new Date(date.getFullYear(), date.getMonth(), i + 1))}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                  <button className="text-gray-600" onClick={() => setShowCalendar(false)}>
                    Cancel
                  </button>
                  <button className="text-primary" onClick={() => setShowCalendar(false)}>
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>



      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <PhotoCard
            title={featuredVideo.title}
            excerpt={featuredVideo.excerpt}
            image={featuredVideo.image}
            editorName={featuredVideo.editorName}
            category={featuredVideo.category}
            duration={featuredVideo.duration}
            variant="large"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {smallPhotos.map((video) => (
            <PhotoCard
              key={video.id}
              title={video.title}
              excerpt={video.excerpt}
              image={video.image}
              editorName={video.editorName}
              category={video.category}
              duration={video.duration}
              variant="small"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoliticalNewsSection;
