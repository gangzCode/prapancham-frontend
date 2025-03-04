"use client";

import React, { useState } from "react";
import { Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface PodcastEpisode {
  id: number;
  title: string;
  host: string;
  episode: number;
  duration: string;
  image: string;
  category: string;
}

interface PodcastSectionProps {
  title?: string;
  showViewMore?: boolean;
}

const PodcastSection = ({
  title = "Our Podcast",
  showViewMore = true,
}: PodcastSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPodcast, setCurrentPodcast] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const podcastEpisodes: PodcastEpisode[] = [
    {
      id: 1,
      title: "Title of the podcast",
      host: "Joe Root",
      episode: 3,
      duration: "1hr 25mins",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
      category: "Category1",
    },
    {
      id: 2,
      title: "Title of the podcast",
      host: "Joe Root",
      episode: 3,
      duration: "1hr 25mins",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
      category: "Category2",
    },
    {
      id: 3,
      title: "Title of the podcast",
      host: "Joe Root",
      episode: 3,
      duration: "1hr 25mins",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
      category: "Category3",
    },
  ];

  const categories = [
    "All",
    "Category1",
    "Category2",
    "Category3",
    "Category4",
    "Category5",
  ];

  const filteredPodcasts =
    activeCategory === "All"
      ? podcastEpisodes
      : podcastEpisodes.filter(
          (podcast) => podcast.category === activeCategory
        );

  const togglePlay = (id: number) => {
    if (currentPodcast === id && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentPodcast(id);
      setIsPlaying(true);
    }
  };

  // Generate waveform bars
  const generateWaveform = () => {
    const bars = [];
    for (let i = 0; i < 30; i++) {
      const height = Math.random() * 20 + 5;
      bars.push(
        <div
          key={i}
          className="w-[3px] bg-gray-300 mx-[1px] rounded-sm"
          style={{ height: `${height}px` }}
        />
      );
    }
    return bars;
  };

  return (
    <section className="container mx-auto px-4 space-y-8 py-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair font-bold">
          {title}
          <div className="h-1 w-20 bg-secondary mt-2"></div>
        </h2>
        {showViewMore && (
          <a
            href="#"
            className="text-secondary font-medium flex items-center gap-1 hover:underline"
          >
            View more <ChevronRight className="w-4 h-4" />
          </a>
        )}
      </div>

      <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
        <div className="flex justify-start md:justify-center items-center min-w-max px-2">
          {categories.map((category, index) => (
            <React.Fragment key={category}>
              <Button
                variant="ghost"
                className={cn(
                  "rounded-none border-none whitespace-nowrap",
                  activeCategory === category
                    ? "text-secondary font-medium"
                    : "text-gray-600"
                )}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
              {index < categories.length - 1 && (
                <Separator orientation="vertical" className="h-6 mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPodcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-secondary font-medium">{podcast.host}</p>
                  <h3 className="text-xl font-bold">{podcast.title}</h3>
                </div>
                <span className="text-sm text-gray-500">
                  Episode {podcast.episode} • {podcast.duration}
                </span>
              </div>

              <div className="aspect-video rounded-md overflow-hidden mb-4">
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center h-[30px] w-full justify-between">
                  {generateWaveform()}
                </div>

                <div className="flex justify-between items-center w-full">
                  <div className="text-sm text-gray-500">
                    {currentPodcast === podcast.id && isPlaying
                      ? "00:30"
                      : "00:00"}
                  </div>

                  <button
                    className="rounded-full bg-primary text-white p-2 hover:bg-primary/90 transition-colors"
                    onClick={() => togglePlay(podcast.id)}
                    aria-label={
                      isPlaying && currentPodcast === podcast.id
                        ? "Pause"
                        : "Play"
                    }
                  >
                    <Play className="w-4 h-4" />
                  </button>

                  <div className="text-sm text-gray-500">
                    {podcast.duration.replace("hr", ":").replace("mins", "")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PodcastSection;
