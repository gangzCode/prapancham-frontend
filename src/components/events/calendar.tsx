'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const Calendar = () => {
    const [selectedMonth, setSelectedMonth] = useState<number>(1);
    const [selectedYear, setSelectedYear] = useState<number>(2025);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        setSelectedMonth(currentDate.getMonth());
        setSelectedYear(currentDate.getFullYear());
        setSelectedDate(currentDate.getDate());
    }, []);

    const handleApply = () => {
        setCurrentDate(new Date(selectedYear, selectedMonth, selectedDate || 1));
        setDropdownOpen(false);
    };

    const handleMonthChange = (increment: number) => {
        let newMonth = selectedMonth + increment;
        let newYear = selectedYear;

        if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }

        setSelectedMonth(newMonth);
        setSelectedYear(newYear);
        setCurrentDate(new Date(newYear, newMonth, selectedDate || 1));
    };

    const handleDateSelect = (day: number) => {
        setSelectedDate(day);
        setCurrentDate(new Date(selectedYear, selectedMonth, day));
    };

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getWeekday = (day: number, month: number, year: number) => {
        return new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'short' });
    };

    const scrollDates = (direction: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction * 100, behavior: 'smooth' });
        }
    };

    return (
        <div className="px-0 mb-5">
            <div className="text-gray-500 text-md mb-2">
                {currentDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <Separator className='!w-full' />
            <div className="bg-white mt-2">
                <div className="flex items-center gap-10 p-4 border-b  bg-[#F8F8F8] rounded-lg">
                    <div className="relative">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-gray-700 flex items-center">
                            {months[selectedMonth]} {selectedYear} <ChevronDown className="ml-2" />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                                <div className="p-2">
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                    >
                                        {months.map((month, index) => (
                                            <option key={month} value={index}>{month}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="p-2">
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                                    >
                                        {[2023, 2024, 2025, 2026, 2027].map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="p-2">
                                    <button onClick={handleApply} className="w-full bg-primary text-white p-2 rounded">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => handleMonthChange(-1)} className="text-gray-500 hover:text-gray-700">
                            <ChevronLeft />
                        </button>
                        <button onClick={() => handleMonthChange(1)} className="text-gray-500 hover:text-gray-700">
                            <ChevronRight />
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between p-2">
                    <button onClick={() => scrollDates(-1)} className="text-[#880002] hover:text-red-700">
                        <ChevronLeft />
                    </button>
                    <div className="flex space-x-4 overflow-hidden w-full" ref={scrollRef}>
                        {[...Array(getDaysInMonth(selectedMonth, selectedYear))].map((_, i) => {
                            const day = i + 1;
                            const isSelected = day === selectedDate;
                            return (
                                <div key={day} onClick={() => handleDateSelect(day)} className={`text-center cursor-pointer text-sm px-2 py-1 ${isSelected ? 'bg-primary text-white rounded-lg' : ''}`}>
                                    <div>{day}</div>
                                    <div>{getWeekday(day, selectedMonth, selectedYear)}</div>
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={() => scrollDates(1)} className="text-[#880002] hover:text-red-700">
                        <ChevronRight />
                    </button>
                </div>
            </div>
            <Separator className='!w-full' />
        </div>
    );
};

export default Calendar;
