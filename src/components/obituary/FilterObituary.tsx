"use client";

import { useState, useEffect } from "react";
import { Filter, X, Check } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageProvider";

type LanguageKey = "en" | "ta" | "si";

export interface FilterOptions {
    isPriority: boolean;
    isRemembarace: boolean;
    isObituary: boolean;
    isFeatured: boolean;
    page: number;
    limit: number;
}

interface FilterObituaryProps {
    onFilter: (filters: FilterOptions) => void;
    onReset: () => void;
    isLoading?: boolean;
}

const FilterObituary = ({ onFilter, onReset, isLoading = false }: FilterObituaryProps) => {
    const { language } = useLanguage();
    let langKey: LanguageKey = "en";
    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";

    const translations: Record<LanguageKey, { [key: string]: string }> = {
        en: {
            priorityObituaries: "Priority Obituaries",
            remembranceServices: "Remembrance Services",
            obituaryPosts: "Obituary Posts",
            featuredObituaries: "Featured Obituaries",
            itemsPerPage: "Items per page",
            reset: "Reset",
            applyFilters: "Apply Filters"
        },
        ta: {
            priorityObituaries: "முன்னுரிமை இரங்கல்கள்",
            remembranceServices: "நினைவு சேவைகள்",
            obituaryPosts: "இரங்கல் இடுகைகள்",
            featuredObituaries: "சிறப்பு இரங்கல்கள்",
            itemsPerPage: "ஒரு பக்கத்திற்கு உருப்படிகள்",
            reset: "மீட்டமை",
            applyFilters: "வடிகட்டிகளைப் பயன்படுத்து"
        },
        si: {
            priorityObituaries: "ප්‍රමුඛතා මරණ දැන්වීම්",
            remembranceServices: "මතක සේවාවන්",
            obituaryPosts: "මරණ දැන්වීම් පළ කිරීම්",
            featuredObituaries: "විශේෂ මරණ දැන්වීම්",
            itemsPerPage: "පිටුවකට අයිතම",
            reset: "නැවත සකසන්න",
            applyFilters: "පෙරහන් යොදන්න"
        }
    };

    const t = translations[langKey];
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<FilterOptions>({
        isPriority: false,
        isRemembarace: false,
        isObituary: true, // Default to true since this is the obituary page
        isFeatured: false,
        page: 1,
        limit: 10
    });

    const [appliedFilters, setAppliedFilters] = useState<FilterOptions>(filters);

    // Handle filter change
    const handleFilterChange = (key: keyof FilterOptions, value: boolean | number) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Apply filters
    const applyFilters = () => {
        setAppliedFilters(filters);
        onFilter(filters);
        setIsOpen(false);
    };

    // Reset filters
    const resetFilters = () => {
        const defaultFilters: FilterOptions = {
            isPriority: false,
            isRemembarace: false,
            isObituary: true,
            isFeatured: false,
            page: 1,
            limit: 10
        };
        setFilters(defaultFilters);
        setAppliedFilters(defaultFilters);
        onReset(); // Call the reset function instead of onFilter
        setIsOpen(false);
    };

    // Close filter when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const filterModal = document.getElementById('filter-modal');
            if (filterModal && !filterModal.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Count active filters
    const getActiveFilterCount = () => {
        let count = 0;
        if (appliedFilters.isPriority) count++;
        if (appliedFilters.isRemembarace) count++;
        if (appliedFilters.isFeatured) count++;
        // Don't count isObituary as it's default for this page
        return count;
    };

    const activeFilterCount = getActiveFilterCount();

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isLoading}
                className="bg-[#880002] text-white p-3 rounded relative disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#660001] transition-colors"
            >
                <Filter size={24} />
                {activeFilterCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-[#880002] rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                        {activeFilterCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div
                        id="filter-modal"
                        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Filter Obituaries</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Priority Filter */}
                                <div className="flex items-center justify-between">
                                    <label htmlFor="isPriority" className="text-sm font-medium text-gray-700">
                                        {t.priorityObituaries}
                                    </label>
                                    <button
                                        onClick={() => handleFilterChange('isPriority', !filters.isPriority)}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            filters.isPriority ? 'bg-[#880002]' : 'bg-gray-300'
                                        }`}
                                    >
                                        <div
                                            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                                                filters.isPriority ? 'translate-x-6' : 'translate-x-0.5'
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* Remembrance Filter */}
                                <div className="flex items-center justify-between">
                                    <label htmlFor="isRemembarace" className="text-sm font-medium text-gray-700">
                                        {t.remembranceServices}
                                    </label>
                                    <button
                                        onClick={() => handleFilterChange('isRemembarace', !filters.isRemembarace)}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            filters.isRemembarace ? 'bg-[#880002]' : 'bg-gray-300'
                                        }`}
                                    >
                                        <div
                                            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                                                filters.isRemembarace ? 'translate-x-6' : 'translate-x-0.5'
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* Obituary Filter */}
                                <div className="flex items-center justify-between">
                                    <label htmlFor="isObituary" className="text-sm font-medium text-gray-700">
                                        {t.obituaryPosts}
                                    </label>
                                    <button
                                        onClick={() => handleFilterChange('isObituary', !filters.isObituary)}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            filters.isObituary ? 'bg-[#880002]' : 'bg-gray-300'
                                        }`}
                                    >
                                        <div
                                            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                                                filters.isObituary ? 'translate-x-6' : 'translate-x-0.5'
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* Featured Filter */}
                                <div className="flex items-center justify-between">
                                    <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                                        {t.featuredObituaries}
                                    </label>
                                    <button
                                        onClick={() => handleFilterChange('isFeatured', !filters.isFeatured)}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            filters.isFeatured ? 'bg-[#880002]' : 'bg-gray-300'
                                        }`}
                                    >
                                        <div
                                            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                                                filters.isFeatured ? 'translate-x-6' : 'translate-x-0.5'
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* Items per page */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">{t.itemsPerPage}</label>
                                    <select
                                        value={filters.limit}
                                        onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#880002]"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                        <option value={20}>20</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={resetFilters}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                                >
                                    {t.reset}
                                </button>
                                <button
                                    onClick={applyFilters}
                                    className="flex-1 px-4 py-2 bg-[#880002] text-white rounded hover:bg-[#660001] transition-colors"
                                >
                                    {t.applyFilters}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterObituary;
