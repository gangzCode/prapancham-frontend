"use client";

import { useState, useEffect } from "react";
import { Filter, Search, ChevronLeft, ChevronRight } from "lucide-react";

const CountrySection = () => {
    const countries = [
        { name: "Canada", posts: 7, flag: "/svg/canada.svg" },
        { name: "Australia", posts: 7, flag: "/svg/australia.svg" },
        { name: "Denmark", posts: 7, flag: "/svg/denmark.svg" },
        { name: "France", posts: 7, flag: "/svg/france.svg" },
        { name: "German", posts: 7, flag: "/svg/german.svg" },
        { name: "India", posts: 7, flag: "/svg/india.svg" },
        { name: "Malaysia", posts: 7, flag: "/svg/malaysia.svg" },
        { name: "UK", posts: 7, flag: "/svg/uk.svg" },
        { name: "USA", posts: 7, flag: "/svg/usa.svg" },
        { name: "Switzerland", posts: 7, flag: "/svg/switzerland.svg" },
        { name: "Srilanka", posts: 7, flag: "/svg/srilanka.svg" },
        { name: "Singapore", posts: 7, flag: "/svg/singapore.svg" },
    ];

    const [search, setSearch] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    useEffect(() => {
        const updateItemsPerPage = () => {
            setItemsPerPage(window.innerWidth <= 768 ? 1 : 6);
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);
    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase())
    );

    let visibleCountries = [];

    if (currentIndex + itemsPerPage > filteredCountries.length) {
        visibleCountries = [
            ...filteredCountries.slice(currentIndex),
            ...filteredCountries.slice(0, (currentIndex + itemsPerPage) % filteredCountries.length),
        ];
    } else {
        visibleCountries = filteredCountries.slice(currentIndex, currentIndex + itemsPerPage);
    }
    const handlePrev = () => {
        setCurrentIndex((prev) => (filteredCountries.length + prev - 1) % filteredCountries.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredCountries.length);
    };


    return (
        <div className="">
            <div className="container mx-auto p-4">
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
                                    setCurrentIndex(0);
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

                    <button className="bg-[#880002] text-white py-3 px-6 rounded shadow w-full sm:w-auto">
                        Create Memorial
                    </button>
                </div>

                <div className="bg-white p-4 rounded shadow flex items-center gap-4">
                    <button className="text-gray-500" onClick={handlePrev}>
                        <ChevronLeft size={24} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-6 flex-1">
                        {visibleCountries.map((country, idx) => (
                            <div key={idx} className="flex items-center gap-3 relative">
                                <img
                                    src={country.flag}
                                    alt={`${country.name} flag`}
                                    width={60}
                                    height={60}
                                    className="rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">{country.name}</p>
                                    <p className="text-red-700">{country.posts} Posts</p>
                                </div>
                                {(idx % 2 === 1 && idx !== visibleCountries.length - 1) && (
                                    <div className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 h-12 border-r border-gray-300 block md:hidden" />
                                )}
                                {(idx !== visibleCountries.length - 1) && (
                                    <div className="absolute right-[15px] top-1/2 transform -translate-y-1/2 h-12 border-r border-gray-300 hidden md:block" />
                                )}
                            </div>
                        ))}
                    </div>

                    <button className="text-gray-500" onClick={handleNext}>
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CountrySection;
