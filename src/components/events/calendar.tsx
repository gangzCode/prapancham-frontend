'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, RotateCcw } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/ui/LanguageProvider";


interface CalendarProps {
    year: number | null;
    month: number | null;
    day: number | null;
    setYear: (year: number | null) => void;
    setMonth: (month: number | null) => void;
    setDay: (day: number | null) => void;
}

const Calendar: React.FC<CalendarProps> = ({ year, month, day, setYear, setMonth, setDay }) => {
    const { language } = useLanguage();
    const [selectedMonth, setSelectedMonth] = useState<number>(0);
    const [selectedYear, setSelectedYear] = useState<number>(2025);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    let langKey: LanguageKey;

    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";
    else langKey = "en";
    type LanguageKey = 'en' | 'ta' | 'si';
    const translations: Record<LanguageKey, { [key: string]: string }> = {
        en: {
            reset: "Reset",
            apply: "Apply",
        },
        ta: {
            reset: "மீட்டமை",
            apply: "பயன்படுத்து",
        },
        si: {
            reset: "නැවත සකසන්න",
            apply: "අයදුම් කරන්න",
        },
    };

    const monthNames: Record<string, string[]> = {
        en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        ta: ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'],
        si: ['ජනවාරි', 'පෙබරවාරි', 'මාර්තු', 'අප්‍රේල්', 'මැයි', 'ජූනි', 'ජූලි', 'අගෝස්තු', 'සැප්තැම්බර්', 'ඔක්තෝබර්', 'නොවැම්බර්', 'දෙසැම්බර්']
    };

    const weekdayNames: Record<string, string[]> = {
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        ta: ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'],
        si: ['ඉරිදා', 'සඳුදා', 'අඟහරුවාදා', 'බදාදා', 'බ්‍රහස්පතින්දා', 'සිකුරාදා', 'සෙනසුරාදා']
    };
    const t = translations[langKey];


    const resetCalendar = () => {
        const today = new Date();
        setSelectedMonth(today.getMonth());
        setSelectedYear(today.getFullYear());
        setSelectedDate(today.getDate());
        setCurrentDate(today);
        setYear(null);
        setMonth(null);
        setDay(null);
    };

    useEffect(() => {
        resetCalendar();
    }, []);

    const handleApply = () => {
        const date = new Date(selectedYear, selectedMonth, selectedDate || 1);
        setCurrentDate(new Date(selectedYear, selectedMonth, selectedDate || 1));
        setDropdownOpen(false);
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
        setDay(date.getDate());
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
        setYear(newYear);
        setMonth(newMonth + 1);
    };

    const handleDateSelect = (day: number) => {
        setSelectedDate(day);
        setCurrentDate(new Date(selectedYear, selectedMonth, day));
        setDay(day);
        setMonth(selectedMonth + 1);
        setYear(selectedYear);
    };

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getWeekday = (day: number, month: number, year: number) => {
        const dayIndex = new Date(year, month, day).getDay();
        return weekdayNames[langKey][dayIndex];
    };

    const scrollDates = (direction: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction * 100, behavior: 'smooth' });
        }
    };

    return (
        <div className="px-0 mb-5">
            <div className="text-gray-500 text-md mb-2">
                {currentDate.toLocaleDateString(langKey, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <Separator className='!w-full' />
            <div className="bg-white mt-2">
                <div className="flex items-center gap-6 p-4 border-b bg-[#F8F8F8] rounded-lg justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-gray-700 flex items-center">
                                {monthNames[langKey][selectedMonth]} {selectedYear} <ChevronDown className="ml-2" />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                                    <div className="p-2">
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={selectedMonth}
                                            onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                        >
                                            {monthNames[langKey].map((month, index) => (
                                                <option key={index} value={index}>{month}</option>
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
                                    <div className="p-2 flex gap-2">
                                        <button onClick={handleApply} className="w-full bg-primary text-white p-2 rounded">
                                            Apply
                                        </button>
                                        <button onClick={resetCalendar} className="w-full bg-gray-200 text-gray-700 p-2 rounded">
                                            Reset
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
                    <button
                        onClick={resetCalendar}
                        className="flex items-center gap-1 text-sm text-primary hover:text-red-700"
                    >
                        <RotateCcw size={16} />
                        {t.reset}
                    </button>
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
                                <div
                                    key={day}
                                    onClick={() => handleDateSelect(day)}
                                    className={`text-center cursor-pointer text-sm px-2 py-1 ${isSelected ? 'bg-primary text-white rounded-lg' : ''}`}
                                >
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
