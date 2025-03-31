import React from "react";
import { Calendar, ChevronRight } from "lucide-react";
import VideoCard from "../video-news/VideoCard";
import { TitleWithUnderline } from "../ui/title-with-underline";

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
  const smallVideos: VideoNewsItem[] = [
    {
      id: 1,
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis...",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      editorName: "Editor's name",
      category: "Category1",
      duration: "15 minutes video",
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
      duration: "15 minutes video",
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
      duration: "15 minutes video",
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
    duration: "15 minutes video",
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
      <div className="flex justify-between items-center mb-6">
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
          <time className="w-full hidden md:block sm:w-auto text-center text-primary y order-2 sm:order-2 text-sm sm:text-base font-poppins">
            {formatDate()}
          </time>
          <div className="bg-[#880002] rounded p-2">
            <Calendar className="text-white h-4" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <VideoCard
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
          {smallVideos.map((video) => (
            <VideoCard
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
