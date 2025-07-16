"use client";
import * as React from "react";
import { CircleX } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/components/ui/LanguageProvider";
import useSWR from 'swr';
import { useRouter } from 'next/navigation';

// Define interfaces for the API response
interface CategoryName {
  name: string;
  value: string;
  _id: string;
}

interface NewsCategory {
  name: {
    en: CategoryName[];
    ta: CategoryName[];
    si: CategoryName[];
  };
  _id: string;
  isDeleted: boolean;
  isActive: boolean;
  __v: number;
}

interface NewsCategoryResponse {
  newsCategory: NewsCategory[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

interface PodcastCategory {
  en: Array<{ name: string; value: string; _id: string }>;
  ta: Array<{ name: string; value: string; _id: string }>;
  si: Array<{ name: string; value: string; _id: string }>;
}

interface PodcastCategoryResponse {
  categories: PodcastCategory[];
}

interface DropMenuProps {
  onClose?: () => void;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const DropMenu: React.FC<DropMenuProps> = ({ onClose }) => {
  const [openItem, setOpenItem] = React.useState<string | undefined>(undefined);
  const { language } = useLanguage();
  const router = useRouter();

  // Fetch news categories from API
  const { data: newsCategoriesData } = useSWR<NewsCategoryResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/news/news-category/active?page=1&limit=10`,
    fetcher
  );

  // Fetch podcast categories from API
  const { data: podcastCategoriesData } = useSWR<PodcastCategoryResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/podcast/categories`,
    fetcher
  );

  // Determine language key
  let langKey: 'en' | 'ta' | 'si';
  if (language === "tamil") langKey = "ta";
  else if (language === "sinhala") langKey = "si";
  else langKey = "en";

  // Handle news category click
  const handleNewsCategoryClick = (categoryId?: string) => {
    if (categoryId) {
      router.push(`/news?category=${categoryId}`);
    } else {
      router.push('/news');
    }
    onClose?.();
  };

  // Handle podcast category click
  const handlePodcastCategoryClick = (category?: string) => {
    // Always add a parameter so the PodcastSection component can detect the navigation
    const categoryParam = `?podcastCategory=${encodeURIComponent(category || "All")}`;
    router.push(`/${categoryParam}`);
    onClose?.();
    
    // Auto-scroll to podcast section after navigation with better timing and fallback
    setTimeout(() => {
      const scrollToPodcastSection = () => {
        // Try multiple selectors to find the podcast section
        const podcastSection = document.querySelector('#podcast-section') ||
                              document.querySelector('[data-section="podcast"]') || 
                              document.querySelector('section[data-section="podcast"]') ||
                              // Fallback: look for text content
                              Array.from(document.querySelectorAll('section')).find(section => 
                                section.textContent?.includes('Our Podcast') || 
                                section.textContent?.includes('Podcast')
                              );
        
        if (podcastSection) {
          // Get the height of any fixed headers/navbars
          const fixedHeaders = document.querySelectorAll('nav, header, [class*="fixed"], [class*="sticky"]');
          let headerHeight = 0;
          
          fixedHeaders.forEach(header => {
            const rect = header.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(header);
            if (computedStyle.position === 'fixed' || computedStyle.position === 'sticky') {
              headerHeight = Math.max(headerHeight, rect.height);
            }
          });
          
          // Add some extra padding (20px) to ensure content is not hidden
          const offsetTop = podcastSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        } else {
          // If still not found, try again after a longer delay
          setTimeout(() => {
            const retrySection = document.querySelector('#podcast-section') || 
                                document.querySelector('[data-section="podcast"]');
            if (retrySection) {
              const fixedHeaders = document.querySelectorAll('nav, header, [class*="fixed"], [class*="sticky"]');
              let headerHeight = 0;
              
              fixedHeaders.forEach(header => {
                const rect = header.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(header);
                if (computedStyle.position === 'fixed' || computedStyle.position === 'sticky') {
                  headerHeight = Math.max(headerHeight, rect.height);
                }
              });
              
              const offsetTop = retrySection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
              
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
              });
            }
          }, 500);
        }
      };

      // Initial attempt
      scrollToPodcastSection();
    }, 500); // Increased timeout for deployed sites
  };

  // Handle obituary menu click
  const handleObituaryMenuClick = (menuItem: string) => {
    if (menuItem === "All Obituaries") {
      router.push('/obituary');
    } else if (menuItem === "Create Memorial") {
      router.push('/create-memorial');
    }
    onClose?.();
  };

  // Generate news sub-items from API data
  const getNewsSubItems = () => {
    const subItems: { label: string; categoryId?: string }[] = [
      {
        label: langKey === "ta" ? "அனைத்து செய்திகள்" : langKey === "si" ? "සියලු පුවත්" : "All News",
        categoryId: undefined
      }
    ];

    if (newsCategoriesData?.newsCategory) {
      newsCategoriesData.newsCategory.forEach(category => {
        const categoryName = category.name[langKey]?.[0]?.name || category.name.en[0]?.name;
        if (categoryName) {
          const newsLabel = langKey === "ta" 
            ? `${categoryName} செய்திகள்`
            : langKey === "si" 
              ? `${categoryName} පුවත්`
              : `${categoryName} News`;
          
          subItems.push({
            label: newsLabel,
            categoryId: category._id
          });
        }
      });
    }

    return subItems;
  };

  // Generate podcast sub-items from API data
  const getPodcastSubItems = () => {
    const subItems: { label: string; category?: string }[] = [
      {
        label: langKey === "ta" ? "அனைத்தும்" : langKey === "si" ? "සියල්ල" : "All",
        category: "All"
      }
    ];

    if (podcastCategoriesData?.categories) {
      podcastCategoriesData.categories.forEach(category => {
        const categoryName = category[langKey]?.[0]?.value || category.en[0]?.value;
        if (categoryName) {
          subItems.push({
            label: categoryName,
            category: category.en[0]?.value
          });
        }
      });
    }

    return subItems;
  };

  const menuItems = [
    {
      title: "Prapancham News",
      value: "news",
      subItems: getNewsSubItems(),
      isNews: true,
      isPodcast: false,
      isObituary: false
    },
    {
      title: "Prapancham Podcast",
      value: "podcast",
      subItems: getPodcastSubItems(),
      isPodcast: true,
      isNews: false,
      isObituary: false
    },
    {
      title: "Prapancham Obituary",
      value: "obituary",
      subItems: [
        { label: "All Obituaries" },
        { label: "Create Memorial" },
      ],
      isNews: false,
      isPodcast: false,
      isObituary: true
    },
    // {
    //   title: "Prapancham Youtube",
    //   value: "youtube",
    //   subItems: [
    //     "Latest Videos",
    //     "Popular Videos",
    //     "Live Streams",
    //     "Playlists",
    //   ],
    // },
    // {
    //   title: "Prapancham FM",
    //   value: "fm",
    //   subItems: ["Live Radio", "Show Schedule", "Past Shows", "Request Song"],
    // },
  ];

  return (
    <div className="flex flex-col py-4 bg-primary shadow-[0px_4px_16px_rgba(0,0,0,0.25)] relative   overflow-hidden font-poppins">
      <div className="flex justify-between items-center px-4 w-full mb-4">
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
          aria-label="Close menu"
        >
          <CircleX className="h-6 w-6 text-white" />
        </button>
      </div>

      <section className="px-4 md:px-6 space-y-4">
        <Accordion
          type="single"
          collapsible
          className="space-y-4"
          onValueChange={(value) => setOpenItem(value)}
        >
          {menuItems.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className={` overflow-hidden border-none ${
                openItem === item.value ? "bg-black-300" : "bg-[#F8F8F8]"
              }`}
            >
              <AccordionTrigger className="flex justify-between items-center p-3 transition-colors no-underline data-[state=open]:bg-stone-400 data-[state=open]:text-white">
                <span className="text-base ">{item.title}</span>
              </AccordionTrigger>
              <AccordionContent className="bg-primary">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3">
                  {item.subItems.map((subItem, index) => (
                    <button
                      key={index}
                      className="text-base py-2 px-3 text-white  transition-colors text-left hover:bg-white rounded-lg hover:text-primary"
                      onClick={() => {
                        if (item.isNews) {
                          handleNewsCategoryClick((subItem as { label: string; categoryId?: string }).categoryId);
                        } else if (item.isPodcast) {
                          handlePodcastCategoryClick((subItem as { label: string; category?: string }).category);
                        } else if (item.isObituary) {
                          handleObituaryMenuClick((subItem as { label: string }).label);
                        }
                      }}
                    >
                      {typeof subItem === 'string' ? subItem : (subItem as { label: string }).label}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default DropMenu;
