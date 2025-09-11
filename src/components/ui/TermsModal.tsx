'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
    language: string;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, language }) => {
    if (!isOpen) return null;

    const handleClose = () => {
        onClose();
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={handleClose}
            ></div>
            <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden z-50 shadow-2xl rounded-2xl border border-gray-200">
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 w-10 h-10 flex items-center justify-center z-10 bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-200 hover:scale-105"
                >
                    <X className="w-5 h-5" strokeWidth={2.5} />
                </button>
                
                <div className="overflow-y-auto max-h-[90vh]">
                    <div className="bg-gradient-to-r from-[#0D1322] to-[#1a2540] text-white">
                        <div className="px-8 md:px-16 lg:px-24 py-12">
                            <div className="flex-shrink min-w-0">
                                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                                    {language === 'en' ? 'Terms and Conditions' :
                                    language === 'si' ? 'නියමයන් සහ කොන්දේසි' :
                                    language === 'ta' ? 'விதிமுறைகளும் நிபந்தனைகளும்' :
                                    'Terms and Conditions'}
                                </h1>
                            </div>
                            <p className="text-gray-300 text-sm md:text-base opacity-90">
                                {language === 'en' && 'Published and Effective on 1st April 2025'}
                                {language === 'si' && '2025 අප්‍රේල් 1 වන දින ප්‍රකාශයට පත් කර ක්‍රියාත්මක විය'}
                                {language === 'ta' && '1 ஏப்ரல் 2025 அன்று வெளியிடப்பட்டு அமலுக்கு வந்தது'}
                            </p>
                        </div>
                    </div>

                    <div className="px-8 md:px-16 lg:px-24 py-12 bg-white">
                        <div className="max-w-4xl mx-auto space-y-12">
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-8 bg-[#880002] rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-[#0D1322]">
                                        {language === 'en' && 'Terms'}
                                        {language === 'si' && 'නියමයන්'}
                                        {language === 'ta' && 'விதிமுறைகள்'}
                                    </h2>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#880002]">
                                    <p className="text-gray-700 leading-relaxed text-justify">
                                        {language === 'en' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis.'}
                                        {language === 'si' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis.'}
                                        {language === 'ta' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis.'}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-8 bg-[#880002] rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-[#0D1322]">
                                        {language === 'en' && 'Conditions'}
                                        {language === 'si' && 'කොන්දේසි'}
                                        {language === 'ta' && 'நிபந்தனைகள்'}
                                    </h2>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#880002]">
                                        <p className="text-gray-700 leading-relaxed text-justify">
                                            {language === 'en' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.'}
                                            {language === 'si' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.'}
                                            {language === 'ta' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.'}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#880002]">
                                        <p className="text-gray-700 leading-relaxed text-justify">
                                            {language === 'en' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.'}
                                            {language === 'si' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.'}
                                            {language === 'ta' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.'}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#880002]">
                                        <p className="text-gray-700 leading-relaxed text-justify">
                                            {language === 'en' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.'}
                                            {language === 'si' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.'}
                                            {language === 'ta' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-8 bg-[#880002] rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-[#0D1322]">
                                        {language === 'en' && 'Terms of Usage'}
                                        {language === 'si' && 'භාවිතයේ නියමයන්'}
                                        {language === 'ta' && 'பயன்பாட்டு விதிமுறைகள்'}
                                    </h2>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#880002]">
                                    <p className="text-gray-700 leading-relaxed text-justify">
                                        {language === 'en' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.'}
                                        {language === 'si' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.'}
                                        {language === 'ta' && 'Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis. Lorem ipsum dolor sit amet consectetur. Tellus nisi risus tellus ac hendrerit nisl convallis Lorem ipsum dolor sit amet consectetur.'}
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="pt-8 border-t border-gray-200">
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-4">
                                        {language === 'en' && 'Last updated: April 1, 2025'}
                                        {language === 'si' && 'අවසන් වරට යාවත්කාලීන කරන ලද්දේ: 2025 අප්‍රේල් 1'}
                                        {language === 'ta' && 'கடைசியாக புதுப்பிக்கப்பட்டது: ஏப்ரல் 1, 2025'}
                                    </p>
                                    <button
                                        onClick={handleClose}
                                        className="px-8 py-3 bg-[#0D1322] text-white rounded-lg hover:bg-[#1a2540] transition-colors duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                                    >
                                        {language === 'en' && 'Close'}
                                        {language === 'si' && 'වසන්න'}
                                        {language === 'ta' && 'மூடு'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default TermsModal;
