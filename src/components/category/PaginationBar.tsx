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
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PaginationBar = () => {
  return (
    <div className="mt-8 flex justify-center px-4">
      <Pagination>
        <PaginationContent className="flex flex-wrap gap-2 justify-center">
          <PaginationItem className="hidden sm:block">
            <ArrowLeft className="text-primary" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              className="text-[#880002] px-3 sm:px-4 py-2 rounded-full min-w-[32px] text-center"
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden sm:block">
            <PaginationLink
              href="#"
              className="border border-primary rounded-full px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 min-w-[32px] text-center"
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden sm:block">
            <PaginationLink
              href="#"
              className="border border-primary rounded-full px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 min-w-[32px] text-center"
            >
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden sm:block">
            <PaginationLink
              href="#"
              className="border border-primary rounded-full px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 min-w-[32px] text-center"
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
              className="border border-primary rounded-full px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 min-w-[32px] text-center"
            >
              10
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="hidden sm:block">
            <ArrowRight className="text-primary" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationBar;
