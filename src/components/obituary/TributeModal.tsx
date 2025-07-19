import { useEffect, useState, DragEvent } from "react";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { TitleWithUnderline } from "../ui/title-with-underline";
import { Separator } from "@/components/ui/separator";
import type { ObituaryEntry } from "../hero/types";
import CardFormWithStepper from "./CardFormWithStepper";
import LetterFormWithStepper from "./LetterFormWithStepper";

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

type LanguageKey = "en" | "ta" | "si";

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
    const { language } = useLanguage();
    let langKey: LanguageKey = "en";
    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";

    const translations: Record<LanguageKey, { [key: string]: string }> = {
        en: {
            selectTributeType: "Select a Tribute Type",
            messageTab: "Message",
            messageTabSubtitle: "Share your thoughts",
            cardsTab: "Cards",
            cardsTabSubtitle: "Send a card",
            letterTab: "Letter",
            letterTabSubtitle: "Write a letter",
            memoryTab: "Memory",
            memoryTabSubtitle: "Share a memory",
            flowersTab: "Send Flowers",
            flowersTabSubtitle: "Send flowers",
            writeMessage: "Write Your Message Here ",
            shareThoughts: "Share your thoughts and condolences",
            messageLabel: "Message",
            messageRequired: "Please enter a message.",
            messagePlaceholder: "Share your thoughts, condolences, or memories...",
            maxChars: "Maximum 2000 characters allowed",
            nameLabel: "Name",
            namePlaceholder: "Your full name",
            relationshipLabel: "Relationship/Organization",
            relationshipPlaceholder: "e.g., Friend, Colleague, Family member",
            countryLabel: "Country",
            countryPlaceholder: "Your country",
            cancel: "Cancel",
            submitTribute: "Submit Tribute",
            submitting: "Submitting...",
            success: "Your tribute has been submitted successfully!",
            error: "Failed to submit tribute. Please try again.",
            networkError: "Network error. Please check your connection and try again.",
            back: "Back",
            next: "Next",
            shareMemories: "Share Your Memories as Images",
            selectDesign: "You can select a design from the options below",
            dragDrop: "Drag & drop images here or click to browse",
            browseFiles: "Browse Files...",
            chooseType: "Choose a Type",
            flowerType1: "Flower Type 1",
            flowerType2: "Flower Type 2",
            bouquet: "Bouquet",
            wreath: "Wreath"
        },
        ta: {
            selectTributeType: "ஒரு இரங்கல் வகையைத் தேர்ந்தெடுக்கவும்",
            messageTab: "செய்தி",
            messageTabSubtitle: "உங்கள் எண்ணங்களை பகிரவும்",
            cardsTab: "அட்டைகள்",
            cardsTabSubtitle: "ஒரு அட்டையை அனுப்பவும்",
            letterTab: "கடிதம்",
            letterTabSubtitle: "ஒரு கடிதம் எழுதவும்",
            memoryTab: "நினைவுகள்",
            memoryTabSubtitle: "ஒரு நினைவை பகிரவும்",
            flowersTab: "மலர்கள் அனுப்பு",
            flowersTabSubtitle: "மலர்கள் அனுப்பு",
            writeMessage: "உங்கள் செய்தியை இங்கே எழுதவும்",
            shareThoughts: "உங்கள் எண்ணங்கள் மற்றும் இரங்கல்களை பகிரவும்",
            messageLabel: "செய்தி",
            messageRequired: "தயவுசெய்து ஒரு செய்தியை உள்ளிடவும்.",
            messagePlaceholder: "உங்கள் எண்ணங்கள், இரங்கல்கள் அல்லது நினைவுகளை பகிரவும்...",
            maxChars: "அதிகபட்சம் 2000 எழுத்துகள் அனுமதிக்கப்படுகிறது",
            nameLabel: "பெயர்",
            namePlaceholder: "உங்கள் முழுப் பெயர்",
            relationshipLabel: "உறவு/நிறுவனம்",
            relationshipPlaceholder: "எ.கா., நண்பர், சக ஊழியர், குடும்ப உறுப்பினர்",
            countryLabel: "நாடு",
            countryPlaceholder: "உங்கள் நாடு",
            cancel: "ரத்து செய்",
            submitTribute: "இரங்கலை சமர்ப்பிக்கவும்",
            submitting: "சமர்ப்பிக்கப்படுகிறது...",
            success: "உங்கள் இரங்கல் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!",
            error: "இரங்கலை சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
            networkError: "பிணைய பிழை. உங்கள் இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
            back: "பின்னால்",
            next: "அடுத்தது",
            shareMemories: "உங்கள் நினைவுகளை படங்களாக பகிரவும்",
            selectDesign: "கீழே உள்ள விருப்பங்களில் இருந்து ஒரு வடிவமைப்பைத் தேர்ந்தெடுக்கலாம்",
            dragDrop: "படங்களை இங்கே இழுத்து விடவும் அல்லது கிளிக் செய்து தேர்ந்தெடுக்கவும்",
            browseFiles: "கோப்புகளைத் தேடு...",
            chooseType: "வகையைத் தேர்ந்தெடுக்கவும்",
            flowerType1: "மலர் வகை 1",
            flowerType2: "மலர் வகை 2",
            bouquet: "மலர் கொத்து",
            wreath: "மலர் மாலை"
        },
        si: {
            selectTributeType: "ශෝක ප්‍රකාශ වර්ගයක් තෝරන්න",
            messageTab: "පණිවිඩය",
            messageTabSubtitle: "ඔබේ සිතුවිලි බෙදා ගන්න",
            cardsTab: "කාඩ්පත්",
            cardsTabSubtitle: "කාඩ්පතක් යවන්න",
            letterTab: "ලිපිය",
            letterTabSubtitle: "ලිපියක් ලියන්න",
            memoryTab: "මතකය",
            memoryTabSubtitle: "මතකයක් බෙදා ගන්න",
            flowersTab: "මල් යවන්න",
            flowersTabSubtitle: "මල් යවන්න",
            writeMessage: "ඔබේ පණිවිඩය මෙහි ලියන්න",
            shareThoughts: "ඔබේ සිතුවිලි සහ ශෝකය බෙදා ගන්න",
            messageLabel: "පණිවිඩය",
            messageRequired: "කරුණාකර පණිවිඩයක් ඇතුළත් කරන්න.",
            messagePlaceholder: "ඔබේ සිතුවිලි, ශෝකය හෝ මතකයන් බෙදා ගන්න...",
            maxChars: "උපරිම අක්ෂර 2000ක් ඉඩ ඇත",
            nameLabel: "නම",
            namePlaceholder: "ඔබේ සම්පූර්ණ නම",
            relationshipLabel: "සම්බන්ධය/ආයතනය",
            relationshipPlaceholder: "උදා: මිතුරා, සහකර්මිකයා, පවුලේ සාමාජිකයා",
            countryLabel: "රට",
            countryPlaceholder: "ඔබේ රට",
            cancel: "අවලංගු කරන්න",
            submitTribute: "ශෝක ප්‍රකාශය ඉදිරිපත් කරන්න",
            submitting: "ඉදිරිපත් කරමින්...",
            success: "ඔබේ ශෝක ප්‍රකාශය සාර්ථකව ඉදිරිපත් කරන ලදී!",
            error: "ශෝක ප්‍රකාශය ඉදිරිපත් කිරීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න.",
            networkError: "ජාල දෝෂයක්. කරුණාකර ඔබේ සම්බන්ධතාවය පරීක්ෂා කර නැවත උත්සාහ කරන්න.",
            back: "ආපසු",
            next: "ඊළඟ",
            shareMemories: "ඔබේ මතකයන් පින්තූර ලෙස බෙදා ගන්න",
            selectDesign: "පහත විකල්ප වලින් නිර්මාණයක් තෝරා ගත හැකියි",
            dragDrop: "පින්තූර මෙහි ඇද දමන්න හෝ ක්ලික් කර තෝරන්න",
            browseFiles: "ගොනු පිරික්සන්න...",
            chooseType: "වර්ගයක් තෝරන්න",
            flowerType1: "මල් වර්ගය 1",
            flowerType2: "මල් වර්ගය 2",
            bouquet: "මල් කදම",
            wreath: "මල් මාලය"
        }
    };

    const t = translations[langKey];
    const [activeTab, setActiveTab] = useState("message");
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const [cardTemplates, setCardTemplates] = useState<any[]>([]);
    const [loadingTemplates, setLoadingTemplates] = useState(false);
    const [letterTemplates, setLetterTemplates] = useState<any[]>([]);

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

    // fetch letter templates when letter tab is active
    useEffect(() => {
        const fetchLetterTemplates = async () => {
            if (activeTab === "letter" && letterTemplates.length === 0) {
                setLoadingTemplates(true);
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tribute-items/letter-template/active?page=1&limit=10`);
                    if (response.ok) {
                        const data = await response.json();
                        setLetterTemplates(data.tributeLetterTemplate || []);
                    } else {
                        console.error('Failed to fetch letter templates');
                    }
                } catch (error) {
                    console.error('Error fetching letter templates:', error);
                } finally {
                    setLoadingTemplates(false);
                }
            }
        };

        fetchLetterTemplates();
    }, [activeTab, letterTemplates.length]);


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
            setSubmitMessage({ type: 'error', text: t.messageRequired });
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
                setSubmitMessage({ type: 'success', text: t.success });
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
                setSubmitMessage({ type: 'error', text: errorData.message || t.error });
            }
        } catch (error) {
            console.error('Error submitting tribute:', error);
            setSubmitMessage({ type: 'error', text: t.networkError });
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
        { id: "message", title: t.messageTab, subtitle: t.messageTabSubtitle },
        { id: "cards", title: t.cardsTab, subtitle: t.cardsTabSubtitle },
        { id: "letter", title: t.letterTab, subtitle: t.letterTabSubtitle },
        { id: "memory", title: t.memoryTab, subtitle: t.memoryTabSubtitle },
        { id: "flowers", title: t.flowersTab, subtitle: t.flowersTabSubtitle },
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

                <div className="max-h-[80vh] w-auto md:w-[40rem] lg:w-[68rem]">
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
                        <h3 className="text-2xl font-semibold mb-4 text-primary">{t.selectTributeType}</h3>
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
                        <div className="pb-8">
                            <form className="bg-white shadow-lg p-4 md:p-8 pb-8 mt-8 border border-black" onSubmit={handleSubmitTribute}>
                                <div className="p-4 mb-6">
                                    <h3 className="text-xl font-semibold text-center mb-4 text-primary">{t.writeMessage}</h3>
                                    <p className="text-center text-gray-500 mb-4 text-primary">
                                        {t.shareThoughts}
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
                                        {t.messageLabel} <span className="text-red-500">*</span>
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
                                        placeholder={t.messagePlaceholder}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{t.maxChars} ({formData.message.length}/2000)</p>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="tribute-name" className="pb-2 block text-gray-700">
                                        {t.nameLabel} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="tribute-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                        placeholder={t.namePlaceholder}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="relationship" className="pb-2 block text-gray-700">
                                        {t.relationshipLabel}
                                    </label>
                                    <input
                                        type="text"
                                        id="relationship"
                                        name="relationship"
                                        value={formData.relationship}
                                        onChange={handleInputChange}
                                        className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                        placeholder={t.relationshipPlaceholder}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="country" className="pb-2 block text-gray-700">
                                        {t.countryLabel}
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                        placeholder={t.countryPlaceholder}
                                    />
                                </div>
                                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6"
                                        disabled={isSubmitting}
                                    >
                                        {t.cancel}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !formData.message.trim() || !formData.name.trim()}
                                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? t.submitting : t.submitTribute}
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                    {activeTab === "cards" && !loadingTemplates &&
                        <CardFormWithStepper
                            cardTemplates={cardTemplates}
                            obituaryEntry={obituaryEntry}
                        />
                    }
                    {activeTab === "letter" && !loadingTemplates &&
                        <LetterFormWithStepper
                            letterTemplates={letterTemplates}
                            obituaryEntry={obituaryEntry}
                        />
                    }
                    {activeTab === "memory" &&
                        <div className="pb-8">
                            <form className="bg-white shadow-lg p-4 md:p-8 pb-8 mt-8 border border-black" >
                                <div className=" p-4  mb-6">
                                    <h3 className="text-xl font-semibold text-center mb-4 text-primary">{t.shareMemories}</h3>
                                    <p className="text-center text-gray-500 mb-4 text-primary">
                                        {t.selectDesign}
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
                                            <p className="text-gray-500 mb-2">{t.dragDrop}</p>
                                            <label className="cursor-pointer text-white bg-primary px-8 py-2">
                                                {t.browseFiles}
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
                                        {t.messageLabel}
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        maxLength={2000}
                                        className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    />
                                    <p className="text-xs">{t.maxChars}</p>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className={`pb-2 block`}>
                                        {t.nameLabel}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className={`pb-2 block`}>
                                        {t.relationshipLabel}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className={`pb-2 block`}>
                                        {t.countryLabel}
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
                                        {t.back}
                                    </button>
                                    <button
                                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 "
                                        onClick={(e => {
                                            e.preventDefault();
                                            // setActiveTab("payment");
                                        }
                                        )}
                                    >
                                        {t.next}
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                    {activeTab === "flowers" &&
                        <div className="pb-8">
                            <form className="bg-white shadow-lg p-4 md:p-8 pb-8 mt-8 border border-black" >
                                <div className="p-4 mb-6">
                                    <h3 className="text-xl font-semibold text-center mb-4 text-primary">{t.chooseType}</h3>
                                    <p className="text-center text-gray-500 mb-4 text-primary">
                                        {t.selectDesign}
                                    </p>
                                    <div className="flex flex-wrap justify-between text-center mb-4">
                                        <div className="w-1/2">
                                            <div className="w-full pr-2 h-32 bg-gray-200 rounded flex items-center justify-center">
                                                <span className="text-gray-500">{t.flowerType1}</span>
                                            </div>
                                            <p>{t.bouquet}</p>
                                        </div>
                                        <div className="w-1/2">
                                            <div className="w-full pl-2 h-32 bg-gray-200 rounded flex items-center justify-center">
                                                <span className="text-gray-500">{t.flowerType2}</span>
                                            </div>
                                            <p>{t.wreath}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="block text-gray-700 mb-2">
                                        {t.messageLabel}
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        maxLength={2000}
                                        className="w-full p-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    />
                                    <p className="text-xs">{t.maxChars}</p>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className={`pb-2 block`}>
                                        {t.nameLabel}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className={`pb-2 block`}>
                                        {t.relationshipLabel}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className={`pb-2 block`}>
                                        {t.countryLabel}
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
                                        {t.back}
                                    </button>
                                    <button
                                        className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 "
                                        onClick={(e => {
                                            e.preventDefault();
                                            // setActiveTab("payment");
                                        }
                                        )}
                                    >
                                        {t.next}
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div >,
        document.body
    );
};

export default TributeModal;
