import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { ObituaryEntry } from '../hero/types';

interface cardTemplateData {
    _id: string;
    name: string;
    image: string | null;
    isDeleted: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const CardFormWithStepper = (
    props: {
        cardTemplates: cardTemplateData[];
        obituaryEntry: ObituaryEntry;
    }
) => {
    const [currentStep, setCurrentStep] = useState(1);

    // Card form state
    const [cardFormData, setCardFormData] = useState({
        message: "",
        name: "",
        relationship: "",
        country: ""
    });

    // Card templates state
    const [cardTemplates, setCardTemplates] = useState(props.cardTemplates || []);
    const [loadingTemplates, setLoadingTemplates] = useState(false);
    const [selectedCardTemplate, setSelectedCardTemplate] = useState("");
    const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);

    // Submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleCardInputChange = (e: any) => {
        const { name, value } = e.target;
        setCardFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePrevTemplate = () => {
        if (cardTemplates.length > 0) {
            setCurrentTemplateIndex(prev =>
                prev === 0 ? cardTemplates.length - 1 : prev - 1
            );
        }
    };

    const handleNextTemplate = () => {
        if (cardTemplates.length > 0) {
            setCurrentTemplateIndex(prev =>
                prev === cardTemplates.length - 1 ? 0 : prev + 1
            );
        }
    };

    const handleSelectCardTemplate = (templateId: string) => {
        setSelectedCardTemplate(templateId);
    };

    const handleNext = () => {
        if (currentStep === 1) {
            setCurrentStep(2);
        }
    };

    const handleBack = () => {
        if (currentStep === 2) {
            setCurrentStep(1);
        }
    };

    const handleClose = () => {
        console.log('Close modal');
    };

    const handleSubmitCard = async () => {
        if (!selectedCardTemplate || !props.obituaryEntry?._id) {
            setSubmitError('Missing required information for submission');
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Create FormData object
            const formData = new FormData();

            // Prepare the card data object
            const cardData = {
                cardTemplate: selectedCardTemplate,
                message: cardFormData.message,
                name: cardFormData.name,
                relationship: cardFormData.relationship,
                country: cardFormData.country
            };

            // Add data to FormData
            formData.append('tributeOptions', 'card');
            formData.append('card', JSON.stringify(cardData));

            // Make API call
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/order/tribute/${props.obituaryEntry._id}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Card submitted successfully:', result);

            setSubmitSuccess(true);

            // Optional: Reset form or close modal after successful submission
            setTimeout(() => {
                handleClose();
            }, 2000);

        } catch (error) {
            console.error('Error submitting card:', error);
            setSubmitError(error instanceof Error ? error.message : 'Failed to submit card. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getSelectedTemplate = () => {
        return cardTemplates.find(template => template._id === selectedCardTemplate);
    };

    const Stepper = () => (
        <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
                {/* Step 1 */}
                <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                        {currentStep > 1 ? <Check size={16} /> : '1'}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${currentStep >= 1 ? 'text-teal-600' : 'text-gray-500'
                        }`}>
                        Design Card
                    </span>
                </div>

                {/* Connector */}
                <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-teal-600' : 'bg-gray-300'
                    }`} />

                {/* Step 2 */}
                <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                        2
                    </div>
                    <span className={`ml-2 text-sm font-medium ${currentStep >= 2 ? 'text-teal-600' : 'text-gray-500'
                        }`}>
                        Confirm
                    </span>
                </div>
            </div>
        </div>
    );

    const CardPreview = () => {
        const selectedTemplate = getSelectedTemplate();

        if (!selectedTemplate) {
            return (
                <div className="max-w-md mx-auto relative">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300 hover:border-teal-400 transition-all duration-300">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-medium">Select a template to preview</p>
                        <p className="text-gray-400 text-sm mt-2">Your card design will appear here</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="max-w-md mx-auto perspective-1000">
                <div className="relative transform hover:scale-105 transition-all duration-500 hover:rotate-1">
                    {/* Decorative background blur */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 animate-pulse"></div>

                    {/* Main card container */}
                    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                        {/* Decorative corner elements */}
                        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-teal-400 to-transparent opacity-20 rounded-br-full"></div>
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-400 to-transparent opacity-20 rounded-bl-full"></div>

                        {/* Background Image with enhanced overlay */}
                        <div className="relative h-80">
                            {selectedTemplate.image && (
                                <>
                                    <img
                                        src={selectedTemplate.image}
                                        alt={selectedTemplate.name}
                                        className="w-full h-full object-cover filter brightness-110 contrast-110"
                                    />
                                    {/* Multiple gradient overlays for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30"></div>
                                </>
                            )}

                            {/* Enhanced content overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <div className="text-white">
                                    {/* Message with enhanced styling */}
                                    {cardFormData.message && (
                                        <div className="mb-4 backdrop-blur-sm bg-white/10 rounded-xl p-3 border border-white/20">
                                            <div className="flex items-start space-x-2">
                                                <svg className="w-4 h-4 text-teal-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                                </svg>
                                                <p className="italic text-sm leading-relaxed font-light text-shadow-lg">
                                                    {cardFormData.message}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Enhanced personal details */}
                                    <div className="backdrop-blur-sm bg-black/20 rounded-xl p-4 border border-white/10">
                                        <div className="space-y-2">
                                            {cardFormData.name && (
                                                <div className="flex items-center justify-between group">
                                                    <span className="font-medium opacity-90 text-xs flex items-center">
                                                        <svg className="w-3 h-3 mr-1.5 text-teal-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                        </svg>
                                                        From:
                                                    </span>
                                                    <span className="font-semibold text-xs bg-white/20 px-2 py-1 rounded-full group-hover:bg-white/30 transition-colors">
                                                        {cardFormData.name}
                                                    </span>
                                                </div>
                                            )}

                                            {cardFormData.relationship && (
                                                <div className="flex items-center justify-between group">
                                                    <span className="font-medium opacity-90 text-xs flex items-center">
                                                        <svg className="w-3 h-3 mr-1.5 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.001 1.001 0 0 0 19 8h-2c-.55 0-1 .45-1 1v5H8V9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v7l2 6h2v-6h8v6h4z" />
                                                        </svg>
                                                        Bond:
                                                    </span>
                                                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full group-hover:bg-white/30 transition-colors">
                                                        {cardFormData.relationship}
                                                    </span>
                                                </div>
                                            )}

                                            {cardFormData.country && (
                                                <div className="flex items-center justify-between group">
                                                    <span className="font-medium opacity-90 text-xs flex items-center">
                                                        <svg className="w-3 h-3 mr-1.5 text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                                        </svg>
                                                        From:
                                                    </span>
                                                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full group-hover:bg-white/30 transition-colors">
                                                        {cardFormData.country}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Decorative bottom border */}
                                        <div className="mt-3 pt-2 border-t border-white/20">
                                            <div className="flex justify-center space-x-1">
                                                <div className="w-1 h-1 bg-teal-300 rounded-full animate-pulse"></div>
                                                <div className="w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                                <div className="w-1 h-1 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom decorative strip */}
                        <div className="h-2 bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400"></div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="mx-auto pb-8">
            <div className="bg-white shadow-lg p-4 md:p-8 pb-8 mt-8 border border-black">
                <Stepper />

                {currentStep === 1 && (
                    <>
                        <div className="p-4 mb-6">
                            <h3 className="text-xl font-semibold text-center mb-4 text-primary">Choose a Card Design</h3>
                            <p className="text-center text-gray-500 mb-4 text-primary">
                                You can select a design from the options below
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-between gap-2 md:gap-4 mb-4">
                                {loadingTemplates ? (
                                    <div className="flex justify-center items-center w-full h-32">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                                        <span className="ml-2 text-gray-500">Loading card templates...</span>
                                    </div>
                                ) : cardTemplates.length > 0 ? (
                                    cardTemplates.map((template, index) => (
                                        <div
                                            key={template._id}
                                            className={`
                      w-56 h-32 bg-gray-200 rounded flex items-center justify-center cursor-pointer border-2 transition-all relative overflow-hidden
                      ${selectedCardTemplate === template._id ? 'border-teal-600 bg-teal-50' : 'border-gray-300 hover:border-teal-400'}
                      ${index === currentTemplateIndex ? 'block' : 'hidden md:block'}
                    `}
                                            onClick={() => handleSelectCardTemplate(template._id)}
                                        >
                                            {template.image ? (
                                                <img
                                                    src={template.image}
                                                    alt={template.name || `Card Design ${index + 1}`}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                            ) : (
                                                <span className="text-gray-500 text-center p-2">
                                                    {template.name || `Card Design ${index + 1}`}
                                                </span>
                                            )}

                                            {/* Template name overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 text-center">
                                                {template.name}
                                            </div>

                                            {selectedCardTemplate === template._id && (
                                                <div className="absolute top-2 right-2 bg-teal-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                                    ✓
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 py-8 w-full">
                                        No card templates available at the moment.
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <button
                                    type="button"
                                    className="px-2 py-1 mr-2 hover:bg-gray-100 rounded disabled:opacity-50"
                                    disabled={loadingTemplates || cardTemplates.length === 0}
                                    onClick={handlePrevTemplate}
                                >
                                    <ChevronLeft />
                                </button>
                                <button
                                    type="button"
                                    className="px-2 py-1 hover:bg-gray-100 rounded disabled:opacity-50"
                                    disabled={loadingTemplates || cardTemplates.length === 0}
                                    onClick={handleNextTemplate}
                                >
                                    <ChevronRight />
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="card-message" className="block text-gray-700 mb-2">
                                Message
                            </label>
                            <textarea
                                id="card-message"
                                name="message"
                                value={cardFormData.message}
                                onChange={handleCardInputChange}
                                rows={4}
                                maxLength={2000}
                                className="w-full p-2 border border-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                placeholder="Write your message for the card..."
                            />
                            <p className="text-xs text-gray-500 mt-1">Maximum 2000 characters allowed ({cardFormData.message.length}/2000)</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="card-name" className="pb-2 block text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="card-name"
                                name="name"
                                value={cardFormData.name}
                                onChange={handleCardInputChange}
                                className="w-full h-[3.5rem] px-3 py-2 border border-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                placeholder="Your full name"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="card-relationship" className="pb-2 block text-gray-700">
                                Relationship/Organization
                            </label>
                            <input
                                type="text"
                                id="card-relationship"
                                name="relationship"
                                value={cardFormData.relationship}
                                onChange={handleCardInputChange}
                                className="w-full h-[3.5rem] px-3 py-2 border border-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                placeholder="e.g., Friend, Colleague, Family member"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="card-country" className="pb-2 block text-gray-700">
                                Country
                            </label>
                            <input
                                type="text"
                                id="card-country"
                                name="country"
                                value={cardFormData.country}
                                onChange={handleCardInputChange}
                                className="w-full h-[3.5rem] px-3 py-2 border border-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                placeholder="Your country"
                            />
                        </div>
                    </>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Review Your Card</h3>
                            <p className="text-gray-600">Please review your card details before submitting</p>
                        </div>

                        {/* Success Message */}
                        {submitSuccess && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-green-800 font-medium">Card submitted successfully!</p>
                                </div>
                                <p className="text-green-700 text-sm mt-1">Your tribute card has been sent.</p>
                            </div>
                        )}

                        {/* Error Message */}
                        {submitError && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-red-800 font-medium">Submission failed</p>
                                </div>
                                <p className="text-red-700 text-sm mt-1">{submitError}</p>
                            </div>
                        )}

                        {/* Card Preview with image overlay */}
                        <CardPreview />

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-4">Card Details Summary</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Selected Template:</span>
                                    <p className="text-gray-800">{getSelectedTemplate()?.name || 'No design selected'}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">From:</span>
                                    <p className="text-gray-800">{cardFormData.name || 'Not provided'}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Relationship:</span>
                                    <p className="text-gray-800">{cardFormData.relationship || 'Not provided'}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Country:</span>
                                    <p className="text-gray-800">{cardFormData.country || 'Not provided'}</p>
                                </div>
                            </div>
                            {cardFormData.message && (
                                <div className="mt-4">
                                    <span className="text-sm font-medium text-gray-500">Message:</span>
                                    <p className="text-gray-800 mt-1">{cardFormData.message}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        type="button"
                        onClick={currentStep === 1 ? handleClose : handleBack}
                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6"
                    >
                        {currentStep === 1 ? 'Close' : 'Back'}
                    </button>
                    <button
                        type="button"
                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                        disabled={(currentStep === 1 && !selectedCardTemplate) || isSubmitting || submitSuccess}
                        onClick={currentStep === 1 ? handleNext : handleSubmitCard}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                            </>
                        ) : submitSuccess ? (
                            <>
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Submitted
                            </>
                        ) : (
                            currentStep === 1 ? 'Next' : 'Submit Card'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardFormWithStepper;