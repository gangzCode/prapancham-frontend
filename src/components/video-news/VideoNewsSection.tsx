import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import VideoCard from "./VideoCard";
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

const VideoNewsSection: React.FC = () => {
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

  return (
    <section
      className={
        "flex flex-wrap gap-6 justify-center px-4 md:px-8 lg:px-16  mt-6 w-full mx-auto max-md:px-5 mb-4"}
    >
      <div className="flex justify-between items-center mb-6 w-full">

        <div className="flex-shrink min-w-0">
          <TitleWithUnderline text="Video News" underlineWidth={64} />
        </div>
        <button className="flex-shrink-0 flex items-center gap-2 text-red-800 hover:text-red-700 transition-colors">
          <span className="text-sm sm:text-base md:text-heading-base">
            View more
          </span>
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
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
      </div>
    </section>
  );
};

export default VideoNewsSection;
