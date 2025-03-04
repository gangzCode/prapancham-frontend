"use client";

import { useEffect, useId, useState } from "react";

import { Input } from "@/components/ui/input";
import { LoaderCircle, Mic, Search } from "lucide-react";

const SearchBox: React.FC = () => {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [inputValue]);

  return (
    <div className="space-y-2 min-w-[300px]">
      <div className="relative">
        <Input
          id={id}
          className="peer rounded-sm bg-white px-12 py-3 text-body-sm placeholder:text-body-sm focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search..."
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
    </div>
  );
};

export default SearchBox;
