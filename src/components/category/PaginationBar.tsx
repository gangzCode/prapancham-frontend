import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationBarProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const handlePageChange = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    let pageNumbers: (number | string)[] = [];
    if (totalPages <= 4) {
        pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
        pageNumbers = [1, 2, 3, '...', totalPages];
    }

    return (
        <div className="mt-8 flex justify-center px-4">
            <Pagination>
                <PaginationContent className="flex flex-wrap gap-2 justify-center">
                    <PaginationItem>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-full ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            aria-label="Previous"
                        >
                            <ArrowLeft className="text-primary" />
                        </button>
                    </PaginationItem>
                    {pageNumbers.map((num, idx) =>
                        typeof num === 'number' ? (
                            <PaginationItem key={num}>
                                <button
                                    onClick={() => handlePageChange(num)}
                                    disabled={num === currentPage}
                                    className={`border border-primary rounded-full px-3 sm:px-4 py-2 min-w-[32px] text-center ${num === currentPage
                                            ? 'bg-[#0D1322] text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {num}
                                </button>
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={`ellipsis-${idx}`}>
                                <PaginationEllipsis className="text-gray-600" />
                            </PaginationItem>
                        )
                    )}
                    <PaginationItem>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-full ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            aria-label="Next"
                        >
                            <ArrowRight className="text-primary" />
                        </button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PaginationBar;
