import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { ObituaryEntry } from '../hero/types';

interface letterTemplateData {
    _id: string;
    name: string;
    image: string | null;
    isDeleted: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const LetterFormWithStepper = (
    props: {
        letterTemplates: letterTemplateData[];
        obituaryEntry: ObituaryEntry;
    }
) => {
    const [currentStep, setCurrentStep] = useState(1);

    // Letter form state
    const [letterFormData, setLetterFormData] = useState({
        message: "",
        name: "",
        relationship: "",
        country: ""
    });

    // Letter templates state
    const [letterTemplates, setLetterTemplates] = useState(props.letterTemplates || []);
    const [loadingTemplates, setLoadingTemplates] = useState(false);
    const [selectedLetterTemplate, setSelectedLetterTemplate] = useState("");
    const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);

    console.log('LetterFormWithStepper props:', props);

    // Submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleLetterInputChange = (e: any) => {
        const { name, value } = e.target;
        setLetterFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePrevTemplate = () => {
        if (letterTemplates.length > 0) {
            setCurrentTemplateIndex(prev =>
                prev === 0 ? letterTemplates.length - 1 : prev - 1
            );
        }
    };

    const handleNextTemplate = () => {
        if (letterTemplates.length > 0) {
            setCurrentTemplateIndex(prev =>
                prev === letterTemplates.length - 1 ? 0 : prev + 1
            );
        }
    };

    const handleSelectLetterTemplate = (templateId: string) => {
        setSelectedLetterTemplate(templateId);
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

    const handleSubmitLetter = async () => {
        if (!selectedLetterTemplate || !props.obituaryEntry?._id) {
            setSubmitError('Missing required information for submission');
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Create FormData object
            const formData = new FormData();

            // Prepare the letter data object
            const letterData = {
                letterTemplate: selectedLetterTemplate,
                message: letterFormData.message,
                name: letterFormData.name,
                relationship: letterFormData.relationship,
                country: letterFormData.country
            };

            // Add data to FormData
            formData.append('tributeOptions', 'letter');
            formData.append('letter', JSON.stringify(letterData));

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
            console.log('Letter submitted successfully:', result);

            setSubmitSuccess(true);

            // Optional: Reset form or close modal after successful submission
            setTimeout(() => {
                handleClose();
            }, 2000);

        } catch (error) {
            console.error('Error submitting letter:', error);
            setSubmitError(error instanceof Error ? error.message : 'Failed to submit letter. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getSelectedTemplate = () => {
        return letterTemplates.find(template => template._id === selectedLetterTemplate);
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
                        Design Letter
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

    const LetterPreview = () => {
        const selectedTemplate = getSelectedTemplate();

        if (!selectedTemplate) {
            return (
                <div className="max-w-2xl mx-auto relative">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-12 text-center border-2 border-dashed border-amber-200">
                        <div className="w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-amber-700 font-medium text-lg">Select a template to preview your letter</p>
                        <p className="text-amber-600 text-sm mt-2">Your beautifully crafted letter will appear here</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="max-w-2xl mx-auto">
                <div className="relative">
                    {/* Paper shadow layers */}
                    <div className="absolute -inset-2 bg-gray-400 rounded-lg transform rotate-1 opacity-20"></div>
                    <div className="absolute -inset-1 bg-gray-300 rounded-lg transform -rotate-1 opacity-30"></div>

                    {/* Main letter paper with template background */}
                    <div className="relative rounded-lg shadow-2xl overflow-hidden border border-white/20">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={selectedTemplate.image || '/default-letter-template.jpg'}
                                alt={selectedTemplate.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Paper-like overlay */}
                            <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
                        </div>

                        {/* Letter header with decorative border */}
                        <div className="relative border-b-2 border-amber-300 bg-white/60 backdrop-blur-sm p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-amber-900 font-serif text-xl font-bold">Personal Letter</h2>
                                </div>
                                <div className="text-amber-700 text-sm font-medium">
                                    {new Date().toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Letter content */}
                        <div className="relative p-8">
                            {/* Greeting */}
                            <div className="mb-6">
                                <p className="text-amber-900 font-serif text-lg">Dear {props.obituaryEntry.name || 'Friend'},</p>
                            </div>

                            {/* Message body */}
                            {letterFormData.message && (
                                <div className="mb-8">
                                    <div className="text-amber-900 font-serif text-base leading-relaxed space-y-4">
                                        {letterFormData.message.split('\n').map((paragraph, index) => (
                                            <p key={index} className="indent-8 text-justify">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Letter closing */}
                            <div className="text-right">
                                <p className="text-amber-900 font-serif text-base mb-2">From,</p>
                                <div>
                                    <div className="w-40 h-12 ml-auto border-b-2 border-amber-300 flex items-end justify-center pb-2">
                                        <p className="text-amber-700 font-serif italic text-sm">
                                            {letterFormData.name || 'Your signature'}
                                        </p>
                                    </div>
                                    <p className="text-amber-700 font-serif text-sm mt-1">
                                        {letterFormData.relationship || 'Your relationship'}
                                    </p>
                                    <p className="text-amber-700 font-serif text-sm">
                                        {letterFormData.country || 'Your country'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Vintage postmark */}
                        <div className="absolute top-4 right-4 w-20 h-20 border-2 border-amber-600 rounded-full flex items-center justify-center transform -rotate-12 bg-white/60 backdrop-blur-sm opacity-80">
                            <div className="text-center">
                                <p className="text-amber-800 text-xs font-bold">SENT</p>
                                <p className="text-amber-700 text-xs">{new Date().getFullYear()}</p>
                            </div>
                        </div>
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
                            <h3 className="text-xl font-semibold text-center mb-4 text-primary">Choose a Letter Design</h3>
                            <p className="text-center text-gray-500 mb-4 text-primary">
                                You can select a design from the options below
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-between gap-2 md:gap-4 mb-4">
                                {loadingTemplates ? (
                                    <div className="flex justify-center items-center w-full h-32">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                                        <span className="ml-2 text-gray-500">Loading letter templates...</span>
                                    </div>
                                ) : letterTemplates.length > 0 ? (
                                    letterTemplates.map((template, index) => (
                                        <div
                                            key={template._id}
                                            className={`
                      w-56 h-32 bg-gray-200 rounded flex items-center justify-center cursor-pointer border-2 transition-all relative overflow-hidden
                      ${selectedLetterTemplate === template._id ? 'border-teal-600 bg-teal-50' : 'border-gray-300 hover:border-teal-400'}
                      ${index === currentTemplateIndex ? 'block' : 'hidden md:block'}
                    `}
                                            onClick={() => handleSelectLetterTemplate(template._id)}
                                        >
                                            {template.image ? (
                                                <img
                                                    src={template.image}
                                                    alt={template.name || `Letter Design ${index + 1}`}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                            ) : (
                                                <span className="text-gray-500 text-center p-2">
                                                    {template.name || `Letter Design ${index + 1}`}
                                                </span>
                                            )}

                                            {/* Template name overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 text-center">
                                                {template.name}
                                            </div>

                                            {selectedLetterTemplate === template._id && (
                                                <div className="absolute top-2 right-2 bg-teal-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                                    ✓
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 py-8 w-full">
                                        No letter templates available at the moment.
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <button
                                    type="button"
                                    className="px-2 py-1 mr-2 hover:bg-gray-100 rounded disabled:opacity-50"
                                    disabled={loadingTemplates || letterTemplates.length === 0}
                                    onClick={handlePrevTemplate}
                                >
                                    <ChevronLeft />
                                </button>
                                <button
                                    type="button"
                                    className="px-2 py-1 hover:bg-gray-100 rounded disabled:opacity-50"
                                    disabled={loadingTemplates || letterTemplates.length === 0}
                                    onClick={handleNextTemplate}
                                >
                                    <ChevronRight />
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="letter-message" className="block text-gray-700 mb-2">
                                Message
                            </label>
                            <textarea
                                id="letter-message"
                                name="message"
                                value={letterFormData.message}
                                onChange={handleLetterInputChange}
                                rows={4}
                                maxLength={2000}
                                className="w-full p-2 border border-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                placeholder="Write your message for the letter..."
                            />
                            <p className="text-xs text-gray-500 mt-1">Maximum 2000 characters allowed ({letterFormData.message.length}/2000)</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="letter-name" className="pb-2 block text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="letter-name"
                                name="name"
                                value={letterFormData.name}
                                onChange={handleLetterInputChange}
                                className="w-full h-[3.5rem] px-3 py-2 border border-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                placeholder="Your full name"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="letter-relationship" className="pb-2 block text-gray-700">
                                Relationship/Organization
                            </label>
                            <input
                                type="text"
                                id="letter-relationship"
                                name="relationship"
                                value={letterFormData.relationship}
                                onChange={handleLetterInputChange}
                                className="w-full h-[3.5rem] px-3 py-2 border border-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                placeholder="e.g., Friend, Colleague, Family member"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="letter-country" className="pb-2 block text-gray-700">
                                Country
                            </label>
                            <input
                                type="text"
                                id="letter-country"
                                name="country"
                                value={letterFormData.country}
                                onChange={handleLetterInputChange}
                                className="w-full h-[3.5rem] px-3 py-2 border border-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                placeholder="Your country"
                            />
                        </div>
                    </>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Review Your Letter</h3>
                            <p className="text-gray-600">Please review your letter details before submitting</p>
                        </div>

                        {/* Success Message */}
                        {submitSuccess && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-green-800 font-medium">Letter submitted successfully!</p>
                                </div>
                                <p className="text-green-700 text-sm mt-1">Your tribute letter has been sent.</p>
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

                        {/* Letter Preview with image overlay */}
                        <LetterPreview />

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h4 className="font-semibold text-gray-800 mb-4">Letter Details Summary</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Selected Template:</span>
                                    <p className="text-gray-800">{getSelectedTemplate()?.name || 'No design selected'}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">From:</span>
                                    <p className="text-gray-800">{letterFormData.name || 'Not provided'}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Relationship:</span>
                                    <p className="text-gray-800">{letterFormData.relationship || 'Not provided'}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Country:</span>
                                    <p className="text-gray-800">{letterFormData.country || 'Not provided'}</p>
                                </div>
                            </div>
                            {letterFormData.message && (
                                <div className="mt-4">
                                    <span className="text-sm font-medium text-gray-500">Message:</span>
                                    <p className="text-gray-800 mt-1">{letterFormData.message}</p>
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
                        disabled={(currentStep === 1 && !selectedLetterTemplate) || isSubmitting || submitSuccess}
                        onClick={currentStep === 1 ? handleNext : handleSubmitLetter}
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
                            currentStep === 1 ? 'Next' : 'Submit Letter'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LetterFormWithStepper;