import HeroSection from "@/components/hero/HeroSection";
import AdvertisementBanner from "@/components/advertisement/AdvertisementBanner";
import { Separator } from "@/components/ui/separator";
import UpcomingEvents from "@/components/event/UpcomingEvents";
import TrendingNewsSection from "@/components/trending-news/TrendingNewsSection";
import HAdCarousel from "@/components/advertisement/HAdCarousel";
import NewsCategoriesSection from "@/components/news-category/NewsCategoriesSection";
import VideoNewsSection from "@/components/video-news/VideoNewsSection";
import HorizontalAdBanner from "@/components/news-category/HorizontalAdBanner";
import PodcastSection from "@/components/podcast/PodcastSection";
import QuoteSection from "@/components/quote/QuoteSection";

import { featuredAds } from "@/data/featured-ads";

const HomePage: React.FC = () => {
  // TODO: Replace with images from api and delete the iamge files
  const topAdImages = [
    "/images/top-ad-1.png",
    "/images/top-ad-2.png",
    "/images/top-ad-3.png",
    "/images/top-ad-4.png",
  ];


  return (
    <div className="flex flex-col">
      <main className="flex flex-col mt-0 w-full bg-white max-md:mt-0 max-md:max-w-full gap-[24px]">
        <AdvertisementBanner images={topAdImages} />
        <HeroSection />
        <Separator />
        <UpcomingEvents />
        <Separator />
        <TrendingNewsSection className="px-16" />
        <Separator />
        <HAdCarousel
          ads={featuredAds}
          title="Advertisements"
          className="px-4 md:px-8 lg:px-16   max-md:px-5"
          autoSlideInterval={6000}
        />
        <Separator />
        <VideoNewsSection />
        {/* <HorizontalAdBanner
          image="/images/top-ad-2.png"
          className="flex flex-col justify-center mx-auto  px-32 max-md:px-5 h-[143px]"
        /> */}
        <img
          src="https://images.unsplash.com/photo-1538688423619-a81d3f23454b"
          alt="Black Friday Sale"
          className="w-full max-h-[232px] object-cover px-4 md:px-8 lg:px-16 "
        />
        <PodcastSection />
        <QuoteSection />
        <NewsCategoriesSection />
      </main>
    </div>
  );
};


export default HomePage;
