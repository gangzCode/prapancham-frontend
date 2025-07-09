import { useEffect, useState, DragEvent } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { TitleWithUnderline } from "../ui/title-with-underline";
import { Separator } from "@/components/ui/separator";
import type { ObituaryEntry } from "../hero/types";
import CardFormWithStepper from "./CardFormWithStepper";

type TributeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    obituaryEntry: ObituaryEntry;
    timeAgo: string;
    imageUrl: string;
    ceremonyTitle: string;
    eventName: string;
    date: string;
};

const TributeModal: React.FC<TributeModalProps> = ({ 
    isOpen, 
    onClose, 
    obituaryEntry, 
    timeAgo, 
    imageUrl, 
    ceremonyTitle, 
    eventName, 
    date 
}) => {
    const [activeTab, setActiveTab] = useState("message");
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const [cardTemplates, setCardTemplates] = useState<any[]>([]);
    const [loadingTemplates, setLoadingTemplates] = useState(false);

    // Fetch card templates when cards tab is active
    useEffect(() => {
        const fetchCardTemplates = async () => {
            if (activeTab === "cards" && cardTemplates.length === 0) {
                setLoadingTemplates(true);
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tribute-items/card-template/active?page=1&limit=10`);
                    if (response.ok) {
                        const data = await response.json();
                        setCardTemplates(data.tributeCardTemplate || []);
                    } else {
                        console.error('Failed to fetch card templates');
                    }
                } catch (error) {
                    console.error('Error fetching card templates:', error);
                } finally {
                    setLoadingTemplates(false);
                }
            }
        };

        fetchCardTemplates();
    }, [activeTab, cardTemplates.length]);

    
    // Form state for message submission
    const [formData, setFormData] = useState({
        message: "",
        name: "",
        relationship: "",
        country: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitTribute = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.message.trim()) {
            setSubmitMessage({ type: 'error', text: 'Please enter a message.' });
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/tribute/${obituaryEntry._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tributeOptions: 'message',
                    message: {
                        message: formData.message,
                        name: formData.name,
                        relationship: formData.relationship,
                        country: formData.country
                    }
                }),
            });

            if (response.ok) {
                setSubmitMessage({ type: 'success', text: 'Your tribute has been submitted successfully!' });
                // Reset form
                setFormData({
                    message: "",
                    name: "",
                    relationship: "",
                    country: ""
                });
                // Close modal after a short delay
                setTimeout(() => {
                    handleClose();
                }, 2000);
            } else {
                const errorData = await response.json();
                setSubmitMessage({ type: 'error', text: errorData.message || 'Failed to submit tribute. Please try again.' });
            }
        } catch (error) {
            console.error('Error submitting tribute:', error);
            setSubmitMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);
    
    const handleClose = () => {
        setActiveTab("message");
        setFormData({
            message: "",
            name: "",
            relationship: "",
            country: ""
        });
        setSubmitMessage(null);
        setIsSubmitting(false);
        onClose();
    };

    const tabs = [
        { id: "message", title: "Message", subtitle: "Share your thoughts" },
        { id: "cards", title: "Cards", subtitle: "Send a card" },
        { id: "letter", title: "Letter", subtitle: "Write a letter" },
        { id: "memory", title: "Memory", subtitle: "Share a memory" },
        { id: "flowers", title: "Send Flowers", subtitle: "Send flowers" },
    ];

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith("image/"));
        const newPreviews = droppedFiles.map(file => URL.createObjectURL(file));

        setImages(prev => [...prev, ...droppedFiles]);
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files ?? []).filter(file => file.type.startsWith("image/"));
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));

        setImages(prev => [...prev, ...selectedFiles]);
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index: number) => {
        const updatedImages = [...images];
        const updatedPreviews = [...previews];

        updatedImages.splice(index, 1);
        URL.revokeObjectURL(previews[index]);
        updatedPreviews.splice(index, 1);

        setImages(updatedImages);
        setPreviews(updatedPreviews);
    };




    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">

            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            ></div>


            <div className="relative bg-white p-4 md:p-8  shadow-lg  max-w-full z-50 overflow-y-auto  overflow-x-hidden thin-scrollbar">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-full p-2 border-2 border-black w-8 h-8 flex items-center justify-center"
                ><X className="w-8 h-8 text-black" strokeWidth={4} />

                </button>

                <div className="max-h-[80vh] w-auto md:w-[40rem]  lg:w-[68rem] ">
                    <div className="flex flex-col md:flex-row bg-gray-100 w-full p-4 mt-8">
                        <div className="w-full md:w-48 h-48 md:h-24 relative">
                            <Image
                                src={imageUrl || obituaryEntry.imageUrl || "/images/tribute.jpg"}
                                alt={obituaryEntry.title || "Portrait"}
                                layout="fill"
                                objectFit="cover"
                                className="object-cover rounded"
                            />
                        </div>

                        <div className="w-full pl-0 md:pl-4 mt-4 md:mt-0 flex flex-col gap-y-4">

                            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                                <h2 className="font-bold">{obituaryEntry.title || obituaryEntry.name}</h2>
                                <span className="text-[#880002]">
                                    {obituaryEntry.condolences} Tributes
                                </span>
                            </div>

                            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-2">
                                <div>
                                    <p>{obituaryEntry.address}</p>
                                    <p>{date || obituaryEntry.date}</p>
                                </div>
                                <span className="mt-4 md:mt-0">
                                    {timeAgo}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center my-5">
                        <h3 className="text-2xl font-semibold mb-4 text-primary">Select a Tribute Type</h3>

                        <div className="overflow-x-auto md:flex md:justify-center">
                            <div className="flex gap-2 md:gap-4 w-max md:w-auto px-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        className={`py-4 min-w-[150px] rounded shadow-md bg-white ${activeTab === tab.id ? "border-2 border-black" : ""}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setActiveTab(tab.id);
                                        }}
                                    >
                                        <h6 className="font-bold">{tab.title}</h6>
                                        <p className="text-sm">{tab.subtitle}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {activeTab === "message" &&
                        <form className="bg-white shadow-lg p-4 md:p-8 pb-8 mt-8 border border-black" onSubmit={handleSubmitTribute}>
                            <div className="p-4 mb-6">
                                <h3 className="text-xl font-semibold text-center mb-4 text-primary">Write Your Message Here </h3>
                                <p className="text-center text-gray-500 mb-4 text-primary">
                                    Share your thoughts and condolences
                                </p>
                            </div>

                            {/* Display success/error messages */}
                            {submitMessage && (
                                <div className={`mb-4 p-3 rounded-lg ${submitMessage.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                                    {submitMessage.text}
                                </div>
                            )}

                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-700 mb-2">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    maxLength={2000}
                                    required
                                    className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    placeholder="Share your thoughts, condolences, or memories..."
                                />
                                <p className="text-xs text-gray-500 mt-1">Maximum 2000 characters allowed ({formData.message.length}/2000)</p>
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="tribute-name" className="pb-2 block text-gray-700">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="tribute-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    placeholder="Your full name"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="relationship" className="pb-2 block text-gray-700">
                                    Relationship/Organization
                                </label>
                                <input
                                    type="text"
                                    id="relationship"
                                    name="relationship"
                                    value={formData.relationship}
                                    onChange={handleInputChange}
                                    className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    placeholder="e.g., Friend, Colleague, Family member"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="country" className="pb-2 block text-gray-700">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    placeholder="Your country"
                                />
                            </div>
                            
                            <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !formData.message.trim() || !formData.name.trim()}
                                    className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Tribute'}
                                </button>
                            </div>
                        </form>
                    }
                    {activeTab === "cards" && !loadingTemplates &&
                        <CardFormWithStepper
                        cardTemplates={cardTemplates}
                        obituaryEntry={obituaryEntry}
                        />
                    }
                    {activeTab === "letter" &&
                        <form className="bg-white shadow-lg p-4 md:p-8 pb-8 mt-8 border border-black" >
                            <div className="p-4 mb-6">
                                <h3 className="text-xl font-semibold text-center mb-4 text-primary">Choose a Template for Letter</h3>
                                <p className="text-center text-gray-500 mb-4 text-primary">
                                    You can select a design from the options below
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-between gap-2 md:gap-4 mb-4">
                                    {[1, 2, 3, 4].map((id) => (
                                        <div
                                            key={id}
                                            className={`
                                                w-56 h-32 bg-gray-200 rounded flex items-center justify-center
                                                ${id === 1 ? 'block' : 'hidden'} 
                                                md:block
                                            `}
                                        >
                                            <span className="text-gray-500">Letter Template {id}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center">
                                    <button className="px-2 py-1 mr-2">
                                        <ChevronLeft />
                                    </button>
                                    <button className="px-2 py-1 ">
                                        <ChevronRight />
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    maxLength={2000}
                                    className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                                <p className="text-xs">Maximum 2000 characters allowed</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block`}>
                                    Relationship/Organization
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block`}>
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                                <button
                                    onClick={handleClose}
                                    className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                                    Back
                                </button>
                                <button
                                    className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 "
                                    onClick={(e => {
                                        e.preventDefault();
                                        // setActiveTab("payment");
                                    }
                                    )}
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    }
                    {activeTab === "memory" &&
                        <form className="bg-white shadow-lg p-4 md:p-8 pb-8 mt-8 border border-black" >
                            <div className=" p-4  mb-6">
                                <h3 className="text-xl font-semibold text-center mb-4 text-primary">Share Your Memories as Images</h3>
                                <p className="text-center text-gray-500 mb-4 text-primary">
                                    You can select a design from the options below
                                </p>
                                <div className="w-full">
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        className="border-2  border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center text-center bg-white hover:border-primary transition"
                                    >
                                        {previews.length > 0 && (
                                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                                {previews.map((src, idx) => (
                                                    <div key={idx} className="relative group">
                                                        <img
                                                            src={src}
                                                            alt={`Preview ${idx + 1}`}
                                                            className="w-full h-32 object-cover rounded shadow"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(idx)}
                                                            className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <p className="text-gray-500 mb-2">Drag & drop images here or click to browse</p>
                                        <label className="cursor-pointer text-white bg-primary px-8 py-2">
                                            Browse Files...
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleBrowse}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    maxLength={2000}
                                    className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                                <p className="text-xs">Maximum 2000 characters allowed</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block`}>
                                    Relationship/Organization
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block`}>
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                                <button
                                    onClick={handleClose}
                                    className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                                    Back
                                </button>
                                <button
                                    className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 "
                                    onClick={(e => {
                                        e.preventDefault();
                                        // setActiveTab("payment");
                                    }
                                    )}
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    }
                    {activeTab === "flowers" &&
                        <form className="bg-white shadow-lg p-4 md:p-8 pb-8 mt-8 border border-black" >
                            <div className="p-4 mb-6">
                                <h3 className="text-xl font-semibold text-center mb-4 text-primary">Choose a Type</h3>
                                <p className="text-center text-gray-500 mb-4 text-primary">
                                    You can select a design from the options below
                                </p>
                                <div className="flex flex-wrap justify-between text-center mb-4">
                                    <div className="w-1/2">
                                        <div className="w-full pr-2 h-32 bg-gray-200 rounded flex items-center justify-center">
                                            <span className="text-gray-500">Flower Type 1</span>
                                        </div>
                                        <p>Bouquet</p>
                                    </div>

                                    <div className="w-1/2">
                                        <div className="w-full pl-2 h-32 bg-gray-200 rounded flex items-center justify-center">
                                            <span className="text-gray-500">Flower Type 2</span>
                                        </div>
                                        <p>Wreath</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    maxLength={2000}
                                    className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                                <p className="text-xs">Maximum 2000 characters allowed</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block`}>
                                    Relationship/Organization
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block`}>
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                                <button
                                    onClick={handleClose}
                                    className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                                    Back
                                </button>
                                <button
                                    className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 "
                                    onClick={(e => {
                                        e.preventDefault();
                                        // setActiveTab("payment");
                                    }
                                    )}
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div >,
        document.body
    );
};

export default TributeModal;
