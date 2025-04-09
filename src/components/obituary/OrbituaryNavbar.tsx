"use client";

import { useState, useEffect } from "react";
import { Filter, Search, ChevronLeft, ChevronRight } from "lucide-react";

const OrbituaryNavbar = () => {
   

    const [search, setSearch] = useState("");
    
    return (
        <div className="">
            <div className="container mx-auto pt-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                    <div className="flex md:w-96 items-center gap-2">
                        <button className="bg-[#880002] text-white p-3 rounded">
                            <Filter size={24} />
                        </button>
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    
                                }}
                                className="border border-gray-900 rounded py-3 px-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-[#880002]"
                            />
                            <Search
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black"
                                strokeWidth={3}
                                size={20}
                            />
                        </div>
                    </div>

                    <button className="bg-[#880002] text-white py-4 px-6 rounded shadow w-full sm:w-auto">
                        Create Memorial
                    </button>
                </div>

               
            </div>
        </div>
    );
};

export default OrbituaryNavbar;
