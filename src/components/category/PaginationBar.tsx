import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationBar = () => {
  return (
    <div className="mt-8 flex justify-center px-4">
      <Pagination>
        <PaginationContent className="flex flex-wrap gap-2 justify-center">
          <PaginationItem className="hidden sm:block">
            <PaginationPrevious
              href="#"
              className="border border-gray-300 rounded-full p-2 text-gray-600 hover:bg-gray-100"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              className="bg-primary text-white px-3 sm:px-4 py-2 rounded-full min-w-[32px] text-center"
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden sm:block">
            <PaginationLink
              href="#"
              className="border border-gray-300 rounded-full px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 min-w-[32px] text-center"
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden sm:block">
            <PaginationLink
              href="#"
              className="border border-gray-300 rounded-full px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 min-w-[32px] text-center"
            >
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden sm:block">
            <PaginationLink
              href="#"
              className="border border-gray-300 rounded-full px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 min-w-[32px] text-center"
            >
              4
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis className="text-gray-600" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              className="border border-gray-300 rounded-full px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 min-w-[32px] text-center"
            >
              10
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden sm:block">
            <PaginationNext
              href="#"
              className="border border-gray-300 rounded-full p-2 text-gray-600 hover:bg-gray-100"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationBar;
