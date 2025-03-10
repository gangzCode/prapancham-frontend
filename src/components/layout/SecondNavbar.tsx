"use client";

import React, { useState } from "react";
import Link from "next/link";
import DropMenu from "./DropMenu";
import { Menu, Minus, ChevronDown } from "lucide-react";
import SearchBox from "./SearchBox";

const SecondNavbar: React.FC = () => {
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Home");

  const toggleDropMenu = () => {
    setIsDropMenuOpen(!isDropMenuOpen);
  };

  const handlePageClick = (page: string) => {
    setSelectedPage(page);
  };

  return (
    <>
      <div className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-32">
        <nav className="flex flex-wrap md:flex-nowrap gap-4 md:gap-10 justify-between items-center w-full px-2 sm:px-4 lg:px-8 py-2 mt-4 md:mt-6 bg-[#F8F8F8] rounded-lg">
          <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 items-center w-full md:w-auto">
            <button
              className="flex justify-center items-center p-2 hover:bg-stone-100 rounded-lg transition-colors"
              onClick={toggleDropMenu}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <div className="flex flex-wrap gap-2 items-center text-sm md:text-base text-center whitespace-nowrap text-zinc-900 overflow-x-auto scrollbar-hide">
              {["Home", "Page1", "Page2"].map(
                (page, index) => (
                  <React.Fragment key={page}>
                    {index > 0 && (
                      <Minus className="hidden md:block h-4 w-[1px] bg-black" />
                    )}
                    <Link
                      href={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                      onClick={() => handlePageClick(page)}
                      className={`flex justify-center items-center px-2 py-1 rounded-md transition-colors duration-200 hover:text-link-hover font-poppins ${selectedPage === page ? "text-link-hover font-bold" : "text-link"}`}
                    >
                      {page}
                    </Link>
                  </React.Fragment>
                )
              )}
              {/* TODO: Remove commented code if not needed in future for usage */}
              {/* <button className="flex items-center gap-1 px-2 py-1 hover:bg-stone-100 rounded-md transition-colors">
                <span>More</span>
                <ChevronDown className="w-4 h-4" />
              </button> */}
            </div>
          </div>
          <div className="w-full md:w-auto mt-2 md:mt-0">
            <SearchBox />
          </div>
        </nav>
      </div>
      {isDropMenuOpen && (
        <div className="fixed inset-0 flex items-start md:items-center justify-center bg-black bg-opacity-50 z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] lg:w-[calc(100%-16rem)] max-w-[1400px] mt-16 md:mt-0">
            <DropMenu onClose={toggleDropMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default SecondNavbar;
