export interface FeaturedAd {
  id: number;
  title: string;
  image: string;
  label: string;
}

export const featuredAds: FeaturedAd[] = [
  {
    id: 1,
    title: "Limited Time Offer",
    image: "/images/top-ad-1.png",
    label: "Limited Time Offer",
  },
  {
    id: 2,
    title: "New Arrivals",
    image: "/images/top-ad-2.png",
    label: "New Arrivals",
  },
  {
    id: 3,
    title: "Exclusive Deals",
    image: "/images/top-ad-3.png",
    label: "Exclusive Deals",
  },
  {
    id: 4,
    title: "Flash Sale",
    image: "/images/top-ad-4.png",
    label: "Flash Sale",
  },
  {
    id: 5,
    title: "Best Sellers",
    image: "/images/top-ad-1.png",
    label: "Best Sellers",
  },
  {
    id: 6,
    title: "Trending Now",
    image: "/images/top-ad-2.png",
    label: "Trending Now",
  },
];
