"use client";

import { useEffect, useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Mic, Search } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
}

const dummyData: SearchResult[] = [
  {
    id: "1",
    title: "Introduction to Classical Music",
    description:
      "Learn about the fundamentals of classical music and its rich history",
  },
  {
    id: "2",
    title: "Understanding Ragas",
    description: "Explore the melodic framework of Indian classical music",
  },
  {
    id: "3",
    title: "Rhythm Patterns in Carnatic Music",
    description:
      "Deep dive into the complex rhythm patterns used in South Indian classical music",
  },
  {
    id: "4",
    title: "Musical Instruments Guide",
    description:
      "Comprehensive guide to traditional Indian musical instruments",
  },
  {
    id: "5",
    title: "Concert Etiquette",
    description: "Guidelines for attending classical music concerts",
  },
];

const SearchBox: React.FC = () => {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        try {
          // Filter dummy data based on search query
          const filteredResults = dummyData.filter(
            (item) =>
              item.title.toLowerCase().includes(inputValue.toLowerCase()) ||
              item.description.toLowerCase().includes(inputValue.toLowerCase())
          );
          setSearchResults(filteredResults);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      }, 500); // Simulate network delay
      return () => clearTimeout(timer);
    }
    setSearchResults([]);
    setIsLoading(false);
  }, [inputValue]);

  const handleInputFocus = () => {
    if (inputValue) setShowResults(true);
  };

  const handleInputBlur = () => {
    // Delay hiding results to allow for result click
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <div className="space-y-2 min-w-[300px] relative">
      <div className="relative">
        <Input
          id={id}
          className="peer rounded-sm bg-white px-12 py-3 text-body-sm placeholder:text-body-sm focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search..."
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-4 text-muted-foreground/80 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircle
              className="animate-spin"
              size={18}
              strokeWidth={2}
              role="status"
              aria-label="Loading..."
            />
          ) : (
            <Search size={18} strokeWidth={2} aria-hidden="true" />
          )}
        </div>
      </div>
      {showResults && searchResults.length > 0 && (
        <div className="fixed md:absolute left-0 right-0 md:left-auto md:right-auto top-full md:top-auto w-full md:w-auto min-w-full bg-white rounded-none md:rounded-lg shadow-2xl mt-0 md:mt-1 max-h-[50vh] md:max-h-[300px] overflow-y-auto origin-top animate-in fade-in zoom-in duration-200 border-t md:border border-gray-200 z-50">
          <div className="p-2 space-y-1">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="p-3 hover:bg-gray-50 active:bg-gray-100 rounded-md cursor-pointer transition-all duration-150 group"
                onClick={() => {
                  // Handle result click - e.g., navigate to result page
                  console.log("Selected result:", result);
                }}
              >
                <div className="font-medium group-hover:text-primary transition-colors">
                  {result.title}
                </div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {result.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
