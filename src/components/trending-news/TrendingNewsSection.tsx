"use client";

import { NewsHeader } from "./NewsHeader";
import { FeaturedNewsCard } from "./FeaturedNewsCard";
import { SmallNewsCard } from "./SmallNewsCard";

interface NewsItem {
  imageUrl: string;
  title: string;
  description?: string;
  editorName: string;
  category: string;
  duration: string;
  isFeatured?: boolean;
}

const newsData: NewsItem[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    title: "OpenAI Unveils GPT-5: A Breakthrough in Artificial Intelligence",
    description:
      "OpenAI's latest language model shows unprecedented capabilities in reasoning and problem-solving, marking a significant milestone in AI development...",
    editorName: "Sarah Chen",
    category: "Technology",
    duration: "8 minutes read",
    isFeatured: true,
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74",
    title:
      "Apple's Vision Pro Sets New Record: 1 Million Units Sold in First Week",
    editorName: "Michael Roberts",
    category: "Business",
    duration: "5 minutes read",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    title:
      "NASA Announces Breakthrough in Quantum Computing for Space Exploration",
    editorName: "David Anderson",
    category: "Science",
    duration: "6 minutes read",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    title: "Tesla's New Battery Technology Promises 1000-Mile Range",
    editorName: "Emma Watson",
    category: "Automotive",
    duration: "7 minutes read",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    title:
      "Microsoft's AI-Powered Development Tools Transform Coding Experience",
    editorName: "James Wilson",
    category: "Technology",
    duration: "4 minutes read",
  },
];

const TrendingNewsSection = () => {
  return (
    <section className="flex flex-col justify-center px-32 max-md:px-5">
      <NewsHeader />

      <div className="flex flex-wrap gap-2 justify-center items-center p-2 mt-6 w-full max-md:max-w-full">
        {newsData.map((news, index) =>
          news.isFeatured ? (
            <FeaturedNewsCard
              key={index}
              imageUrl={news.imageUrl}
              title={news.title}
              description={news.description || ""}
              editorName={news.editorName}
              category={news.category}
              duration={news.duration}
            />
          ) : index % 2 === 1 ? (
            <div
              key={index}
<<<<<<< HEAD
              className="flex flex-col flex-1 shrink justify-center self-stretch my-auto text-sm basis-4 min-w-60"
=======
              className="flex flex-col flex-1 shrink justify-center self-stretch h-[520px] text-sm basis-4 min-w-60 gap-2"
>>>>>>> 688f1f4 (Merge branch 'feature/home')
            >
              <SmallNewsCard
                imageUrl={news.imageUrl}
                title={news.title}
                editorName={news.editorName}
                category={news.category}
                duration={news.duration}
              />
              {newsData[index + 1] && (
<<<<<<< HEAD
                <div className="mt-2">
                  <SmallNewsCard
                    imageUrl={newsData[index + 1].imageUrl}
                    title={newsData[index + 1].title}
                    editorName={newsData[index + 1].editorName}
                    category={newsData[index + 1].category}
                    duration={newsData[index + 1].duration}
                  />
                </div>
=======
                <SmallNewsCard
                  imageUrl={newsData[index + 1].imageUrl}
                  title={newsData[index + 1].title}
                  editorName={newsData[index + 1].editorName}
                  category={newsData[index + 1].category}
                  duration={newsData[index + 1].duration}
                />
>>>>>>> 688f1f4 (Merge branch 'feature/home')
              )}
            </div>
          ) : null
        )}
      </div>
    </section>
  );
};

export default TrendingNewsSection;
