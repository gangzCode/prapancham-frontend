import { useEffect, useState, DragEvent } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { TitleWithUnderline } from "../ui/title-with-underline";
import { Separator } from "@/components/ui/separator";

type TributeModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const TributeModal: React.FC<TributeModalProps> = ({ isOpen, onClose }) => {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [activeTab, setActiveTab] = useState("message");
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleAnonymousChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsAnonymous(e.target.checked);
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
        onClose();
    };

    const tabs = [
        { id: "message", title: "Message", subtitle: "ffj" },
        { id: "cards", title: "Cards", subtitle: "ffj" },
        { id: "letter", title: "Letter", subtitle: "ffj" },
        { id: "memory", title: "Memory", subtitle: "ffj" },
        { id: "flowers", title: "Send Flowers", subtitle: "ffj" },
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
                                src="/images/tribute.jpg"
                                alt="Portrait"
                                layout="fill"
                                objectFit="cover"
                                className="object-cover rounded"
                            />
                        </div>

                        <div className="w-full pl-0 md:pl-4 mt-4 md:mt-0 flex flex-col gap-y-4">

                            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                                <h2 className="font-bold">Name in Full</h2>
                                <span className="text-[#880002]">
                                    2 Tributes
                                </span>
                            </div>

                            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-2">
                                <div>
                                    <p>No2. masdd, sddd sdsfffd</p>
                                    <p>Date of Birth - Date of Death</p>
                                </div>
                                <span className="mt-4 md:mt-0">
                                    1 hour ago
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
                        <form className="bg-white shadow-lg p-4 md:p-8 pb-8 mt-8 border border-black" >
                            <div className="p-4 mb-6">
                                <h3 className="text-xl font-semibold text-center mb-4 text-primary">Write Your Message Here </h3>
                                <p className="text-center text-gray-500 mb-4 text-primary">
                                    You can select a design from the options below
                                </p>
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
                                <p className="text-xs">Maximum 2000 charactrts allowed</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    readOnly={isAnonymous}
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
                                    readOnly={isAnonymous}
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
                                    readOnly={isAnonymous}
                                    className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                                <button
                                    onClick={handleClose}
                                    className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0B4157] rounded border border-teal-900 border-solid min-h-6 ">
                                    Back
                                </button>
                                <button
                                    className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 "
                                    onClick={(e => {
                                        e.preventDefault();
                                        // setActiveTab("cards");
                                    }
                                    )}
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    }
                    {activeTab === "cards" &&
                        <form className="bg-white shadow-lg p-4 md:p-8 pb-8 mt-8 border border-black" >
                            <div className="p-4 mb-6">
                                <h3 className="text-xl font-semibold text-center mb-4 text-primary">Choose a Card Design</h3>
                                <p className="text-center text-gray-500 mb-4 text-primary">
                                    You can select a design from the options below
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-between gap-2 md:gap-4 mb-4">
                                    {[1, 2, 3, 4].map((id) => (
                                        <img
                                            key={id}
                                            src={`/images/${[
                                                'top-ad-1.png',
                                                'top-ad-2.png',
                                                'top-ad-3.png',
                                                'top-ad-4.png'
                                            ][id - 1]}`}
                                            alt={`Card design ${id}`}
                                            className={`
                                                w-56 h-auto object-cover rounded
                                                ${id === 1 ? 'block' : 'hidden'} 
                                                md:block
                                            `}
                                        />
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
                                <p className="text-xs">Maximum 2000 charactrts allowed</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    readOnly={isAnonymous}
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
                                    readOnly={isAnonymous}
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
                                    readOnly={isAnonymous}
                                    className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                                <button
                                    onClick={handleClose}
                                    className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0B4157] rounded border border-teal-900 border-solid min-h-6 ">
                                    Back
                                </button>
                                <button
                                    className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 "
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
                    {activeTab === "letter" &&
                        <form className="bg-white shadow-lg p-4 md:p-8 pb-8 mt-8 border border-black" >
                            <div className="p-4 mb-6">
                                <h3 className="text-xl font-semibold text-center mb-4 text-primary">Choose a Template for Letter</h3>
                                <p className="text-center text-gray-500 mb-4 text-primary">
                                    You can select a design from the options below
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-between gap-2 md:gap-4 mb-4">
                                    {[1, 2, 3, 4].map((id) => (
                                        <img
                                            key={id}
                                            src={`/images/${[
                                                'top-ad-1.png',
                                                'top-ad-2.png',
                                                'top-ad-3.png',
                                                'top-ad-4.png'
                                            ][id - 1]}`}
                                            alt={`Card design ${id}`}
                                            className={`
                                                w-56 h-auto object-cover rounded
                                                ${id === 1 ? 'block' : 'hidden'} 
                                                md:block
                                            `}
                                        />
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
                                <p className="text-xs">Maximum 2000 charactrts allowed</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    readOnly={isAnonymous}
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
                                    readOnly={isAnonymous}
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
                                    readOnly={isAnonymous}
                                    className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                                <button
                                    onClick={handleClose}
                                    className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0B4157] rounded border border-teal-900 border-solid min-h-6 ">
                                    Back
                                </button>
                                <button
                                    className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 "
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
                                <p className="text-xs">Maximum 2000 charactrts allowed</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    readOnly={isAnonymous}
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
                                    readOnly={isAnonymous}
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
                                    readOnly={isAnonymous}
                                    className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                                <button
                                    onClick={handleClose}
                                    className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0B4157] rounded border border-teal-900 border-solid min-h-6 ">
                                    Back
                                </button>
                                <button
                                    className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 "
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
                                <div className="flex flex-wrap justify-between text-center  mb-4">
                                    <div className=" w-1/2">
                                        <img
                                            src="/images/top-ad-1.png"
                                            alt="Card design"
                                            className="w-full pr-2 h-auto object-cover rounded"
                                        />
                                        <p>jjfj</p>
                                    </div>

                                    <div className="w-1/2">
                                        <img
                                            src="/images/top-ad-2.png"
                                            alt="Card design"
                                            className="w-full h-auto pl-2 object-cover rounded"
                                        />
                                        <p>jjfj</p>
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
                                <p className="text-xs">Maximum 2000 charactrts allowed</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    readOnly={isAnonymous}
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
                                    readOnly={isAnonymous}
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
                                    readOnly={isAnonymous}
                                    className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                                <button
                                    onClick={handleClose}
                                    className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0B4157] rounded border border-teal-900 border-solid min-h-6 ">
                                    Back
                                </button>
                                <button
                                    className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 "
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
