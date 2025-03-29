import React from "react";
import { ChevronRight } from "lucide-react";
import VideoCard from "../video-news/VideoCard";

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

  return (
    <section className="flex flex-col justify-center mx-auto py-8 px-16 max-md:px-5">
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <h2 className="text-heading-lg text-[#0B4157]">Political News</h2>
          <div className="absolute -bottom-2 left-0 h-1 w-20 bg-secondary"></div>
        </div>
        <a
          href="#"
          className="text-secondary text-heading-base flex items-center gap-1 hover:underline"
        >
          View more <ChevronRight className="w-4 h-4" />
        </a>
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
