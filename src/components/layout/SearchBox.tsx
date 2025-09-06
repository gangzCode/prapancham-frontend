"use client";

import { useEffect, useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Mic, Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface OrderResult {
  _id: string;
  information: {
    title: string;
    address: string;
    dateofBirth: string;
    dateofDeath: string;
    description: string;
    tributeVideo: string;
    shortDescription: string;
  };
  thumbnailImage: string;
  primaryImage: string;
  username: string;
}

interface MultilingualField {
  en: { name: string; value: string; _id: string }[];
  ta: { name: string; value: string; _id: string }[];
  si: { name: string; value: string; _id: string }[];
}

interface NewsResult {
  _id: string;
  title: MultilingualField;
  description: MultilingualField;
  editorName: MultilingualField;
  thumbnailImage: string;
  mainImage: string;
  isDeleted: boolean;
  otherImages: string[];
  paragraphs: (MultilingualField & { _id: string })[];
  isBreakingNews: boolean;
  isImportantNews: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  newsCategory: string;
}

interface EventResult {
  _id: string;
  name: MultilingualField;
  description: MultilingualField;
  eventDate: string;
  isFeatured: boolean;
  image: string;
  featuredEventImage: string;
  isDeleted: boolean;
  expiryDate: string;
  isActive: boolean;
  uploadedDate: string;
  createdAt: string;
  updatedAt: string;
  eventLink: string;
  registeredPeopleCount: string;
}

interface SearchResponse {
  query: string;
  orders: OrderResult[];
  news: NewsResult[];
  events: EventResult[];
}

const SearchBox: React.FC = () => {
  const id = useId();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'news' | 'events'>('orders');

  // Helper function to extract English value from multilingual field
  const getEnglishValue = (field: MultilingualField): string => {
    return field.en?.[0]?.value || '';
  };

  useEffect(() => {
    if (inputValue.trim()) {
      setIsLoading(true);
      const timer = setTimeout(async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?q=${encodeURIComponent(inputValue.trim())}`);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: SearchResponse = await response.json();
          setSearchResults(data);
          setShowResults(true);
          // Set default active tab to the first tab that has results
          if (data.orders.length > 0) {
            setActiveTab('orders');
          } else if (data.news.length > 0) {
            setActiveTab('news');
          } else if (data.events.length > 0) {
            setActiveTab('events');
          }
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults(null);
        } finally {
          setIsLoading(false);
        }
      }, 1000); // 1000ms debounce

      return () => clearTimeout(timer);
    } else {
      setSearchResults(null);
      setShowResults(false);
      setIsLoading(false);
    }
  }, [inputValue]);

  const handleOrderClick = (orderId: string) => {
    console.log("Order clicked:", orderId);
    // Prevent the blur event from interfering
    setTimeout(() => {
      router.push(`/obituary/${orderId}`);
      setShowResults(false);
      setInputValue("");
    }, 0);
  };

  const handleNewsClick = (newsId: string) => {
    console.log("News clicked:", newsId);
    // Prevent the blur event from interfering
    setTimeout(() => {
      router.push(`/news/${newsId}`);
      setShowResults(false);
      setInputValue("");
    }, 0);
  };

  const handleEventClick = (eventId: string) => {
    console.log("Event clicked:", eventId);
    // Prevent the blur event from interfering
    setTimeout(() => {
      // router.push(`/events/${eventId}`);
      router.push(`/events`);
      setShowResults(false);
      setInputValue("");
    }, 0);
  };

  const handleInputFocus = () => {
    if (inputValue && searchResults) setShowResults(true);
  };

  const handleInputBlur = () => {
    // Delay hiding results to allow for result click
    setTimeout(() => setShowResults(false), 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent the input from losing focus when clicking on results
    e.preventDefault();
  };

  const hasResults = searchResults && (searchResults.orders.length > 0 || searchResults.news.length > 0 || searchResults.events.length > 0);

  const getTabContent = () => {
    if (!searchResults) return null;

    switch (activeTab) {
      case 'orders':
        return searchResults.orders.map((order) => (
          <div
            key={order._id}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 active:bg-gray-100 rounded-md cursor-pointer transition-all duration-150 group"
            onClick={() => handleOrderClick(order._id)}
            onMouseDown={handleMouseDown}
          >
            <img
              src={order.thumbnailImage || order.primaryImage || "/images/tribute.jpg"}
              alt={order.information.title}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                {order.information.title}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {order.information.address}
              </div>
            </div>
          </div>
        ));

      case 'news':
        return searchResults.news.map((news) => (
          <div
            key={news._id}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 active:bg-gray-100 rounded-md cursor-pointer transition-all duration-150 group"
            onClick={() => handleNewsClick(news._id)}
            onMouseDown={handleMouseDown}
          >
            <img
              src={news.thumbnailImage || news.mainImage || "/images/tribute.jpg"}
              alt={getEnglishValue(news.title)}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                {getEnglishValue(news.title)}
              </div>
              <div className="text-xs text-gray-500 line-clamp-2 mt-1">
                {getEnglishValue(news.description)}
              </div>
            </div>
          </div>
        ));

      case 'events':
        return searchResults.events.map((event) => (
          <div
            key={event._id}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 active:bg-gray-100 rounded-md cursor-pointer transition-all duration-150 group"
            onClick={() => handleEventClick(event._id)}
            onMouseDown={handleMouseDown}
          >
            <img
              src={event.image || event.featuredEventImage || "/images/tribute.jpg"}
              alt={getEnglishValue(event.name)}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                {getEnglishValue(event.name)}
              </div>
              <div className="text-xs text-gray-500 line-clamp-2 mt-1">
                {getEnglishValue(event.description)}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(event.eventDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        ));

      default:
        return null;
    }
  };

  const getAvailableTabs = () => {
    if (!searchResults) return [];

    const tabs = [];
    if (searchResults.orders.length > 0) tabs.push({ key: 'orders', label: 'Obituaries', count: searchResults.orders.length });
    if (searchResults.news.length > 0) tabs.push({ key: 'news', label: 'News', count: searchResults.news.length });
    if (searchResults.events.length > 0) tabs.push({ key: 'events', label: 'Events', count: searchResults.events.length });
    return tabs;
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

      {showResults && hasResults && (
        <div
          className="absolute left-0 right-0 md:right-0 md:left-auto md:w-[600px] top-full w-full bg-white rounded-none md:rounded-lg shadow-2xl mt-0 md:mt-1 max-h-[50vh] md:max-h-[500px] overflow-hidden origin-top animate-in fade-in zoom-in duration-200 border-t md:border border-gray-200 z-50"
          onMouseDown={handleMouseDown}
        >
          <div className="flex flex-col h-full">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200 bg-gray-50">
              {getAvailableTabs().map((tab) => (
                <button
                  key={tab.key}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.key
                      ? 'text-primary border-b-2 border-primary bg-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  onClick={() => setActiveTab(tab.key as 'orders' | 'news' | 'events')}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-2">
              <div className="space-y-1">
                {getTabContent()}
              </div>
            </div>

            {/* Show message if no results found */}
            {searchResults && searchResults.orders.length === 0 && searchResults.news.length === 0 && searchResults.events.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No results found for "{searchResults.query}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
