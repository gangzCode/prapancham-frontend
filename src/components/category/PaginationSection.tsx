import React from "react";
import AdvertisementSidebar from "../news-category/AdvertisementSidebar";
import PhotoCard from "../video-news/PhotoCard";
import PaginationBar from "./PaginationBar";
import { Separator } from "../ui/separator";

interface VideoNewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  editorName?: string;
  category: string;
  duration: string;
}

const PaginationSection = () => {
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

  const featuredVideos: VideoNewsItem[] = [
    {
      id: 4,
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis...",
      image: "https://images.unsplash.com/photo-1529390079861-591de354faf5",
      editorName: "Editor's name",
      category: "Category1",
      duration: "15 minutes ago",
    },
    {
      id: 5,
      title:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis.",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisldhgteg convallis...",
      image: "https://images.unsplash.com/photo-1529390079861-591de354faf5",
      category: "Category1",
      editorName: "Editor's name",

      duration: "15 minutes ago",
    },
  ];

  function setCurrentPage(page: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <section className="px-4 md:px-8 lg:px-16  py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Left side scrollable news section - 2/3 width on desktop */}
        <div className="lg:col-span-2 h-auto relative bg-white rounded-md shadow-sm overflow-hidden">
          {/* Small vdieo card section */}
          <div className="grid grid-cols-1 gap-6">
            {smallVideos.map((video) => (
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
          {/* Large video card section */}
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

            {/* 2 video card in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {featuredVideos.map((video) => (
                <PhotoCard
                  key={video.id}
                  title={video.title}
                  excerpt={video.excerpt}
                  image={video.image}
                  editorName={video.editorName}
                  category={video.category}
                  duration={video.duration}
                  variant="large"
                />
              ))}
            </div>
          </div>
          <Separator className="!w-full" />
          <PaginationBar
            currentPage={1}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        </div>
        {/* Right side advertisement section - 1/3 width on desktop */}
        <div className="lg:col-span-1 h-auto pr-4 border-r-[3px] border-gray-200 overflow-hidden">
          <AdvertisementSidebar 
          className="h-full overflow-y-auto" 
          numberOfAds={4} 
          adPageName="home"
          />
        </div>
      </div>

    </section>
  );
};

export default PaginationSection;
