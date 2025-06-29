import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Image from "next/image";
import { TitleWithUnderline } from "../ui/title-with-underline";
import { ObituaryEntry } from "../hero/types";
import axios from "axios";
import { useLanguage } from "@/components/ui/LanguageProvider";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from "./PaymentForm";
import PaymentSuccessMessage from "./PaymentSuccessMessage";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface DonateModalProps {
    isOpen: boolean;
    onClose: () => void;
    obituaryEntry: ObituaryEntry;
}

type LanguageKey = "en" | "ta" | "si";

interface Country {
    _id: string;
    name: {
        [key in LanguageKey]: Array<{ value: string }>;
    };
    currencyCode: string;
}

interface FormData {
    email: string;
    name: string;
    address: string;
    phoneNumber: string;
    countryId: string;
    donationAmount: number;
}

const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose, obituaryEntry }) => {
    const { language } = useLanguage();
    let langKey: LanguageKey = "en";
    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";

    const handlePaymentSuccess = () => {
        setActiveTab("success");
    };

    const handlePaymentError = (error: string) => {
        setError(error);
        // Optionally, you could stay on payment tab or go back to donate tab
        // For now, we'll just show the error on the payment tab
    };

    const handleBackToForm = () => {
        setActiveTab("donate");
    };

    const translations: Record<LanguageKey, { [key: string]: string }> = {
        en: {
            donorDetails: "Donor's Details",
            emailAddress: "Email Address",
            keepAnonymous: "Keep it an anonymous donation",
            name: "Name",
            country: "Country",
            address: "Address",
            phoneNumber: "Phone number",
            selectCountry: "Select a country",
            loading: "Loading...",
            back: "Back",
            continueToPay: "Continue to Pay",
            tribute: "Tribute",
            tributes: "Tributes",
            required: "*",
            donationAmount: "Donation Amount",
            paymentSuccessful: "Payment Successful!",
            thankYouDonation: "Thank you for your generous donation.",
            close: "Close",
            share: "Share",
            anonymousDonation: "Anonymous donation",
            donatedBy: "Donated by",
            donation: "Donation",
            importantInfo: "Important Information",
            receiptEmail: "A receipt has been sent to your email address for your records.",
            shareTitle: "Memorial Donation",
            shareText: "I just made a donation in memory of a loved one.",
        },
        ta: {
            donorDetails: "நன்கொடையாளர் விவரங்கள்",
            emailAddress: "மின்னஞ்சல் முகவரி",
            keepAnonymous: "இதை அநாமதேய நன்கொடையாக வைத்திருங்கள்",
            name: "பெயர்",
            country: "நாடு",
            address: "முகவரி",
            phoneNumber: "தொலைபேசி எண்",
            selectCountry: "ஒரு நாட்டைத் தேர்ந்தெடுக்கவும்",
            loading: "ஏற்றுகிறது...",
            back: "பின்",
            continueToPay: "பணம் செலுத்த தொடரவும்",
            tribute: "அஞ்சலி",
            tributes: "அஞ்சலிகள்",
            required: "*",
            donationAmount: "நன்கொடை தொகை",
            paymentSuccessful: "பணம் செலுத்துதல் வெற்றிகரமாக!",
            thankYouDonation: "உங்கள் தாராள நன்கொடைக்கு நன்றி.",
            close: "மூடு",
            share: "பகிர்",
            anonymousDonation: "அநாமதேய நன்கொடை",
            donatedBy: "நன்கொடை அளித்தவர்",
            donation: "நன்கொடை",
            importantInfo: "முக்கிய தகவல்",
            receiptEmail: "உங்கள் பதிவுகளுக்காக உங்கள் மின்னஞ்சல் முகவரிக்கு ரசீது அனுப்பப்பட்டுள்ளது.",
            shareTitle: "நினைவு நன்கொடை",
            shareText: "நான் ஒரு அன்புக்குரியவரின் நினைவாக நன்கொடை அளித்துள்ளேன்.",
        },
        si: {
            donorDetails: "දායකයාගේ විස්තර",
            emailAddress: "විද්‍යුත් තැපැල් ලිපිනය",
            keepAnonymous: "මෙය නිර්නාමික දානයක් ලෙස තබා ගන්න",
            name: "නම",
            country: "රට",
            address: "ලිපිනය",
            phoneNumber: "දුරකථන අංකය",
            selectCountry: "රටක් තෝරන්න",
            loading: "පූරණය වෙමින්...",
            back: "ආපසු",
            continueToPay: "ගෙවීම සඳහා ඉදිරියට",
            tribute: "උපහාරය",
            tributes: "උපහාර",
            required: "*",
            donationAmount: "දාන මුදල",
            paymentSuccessful: "ගෙවීම සාර්ථකයි!",
            thankYouDonation: "ඔබේ ත්‍යාගශීලී දානයට ස්තූතියි.",
            close: "වසන්න",
            share: "බෙදාගන්න",
            anonymousDonation: "නිර්නාමික දානය",
            donatedBy: "දානය කළේ",
            donation: "දානය",
            importantInfo: "වැදගත් තොරතුරු",
            receiptEmail: "ඔබේ වාර්තා සඳහා ඔබේ විද්‍යුත් තැපැල් ලිපිනයට රිසිට්පතක් එවා ඇත.",
            shareTitle: "මතක දානය",
            shareText: "මම ආදරණීය කෙනෙකුගේ මතකයට දානයක් කළා.",
        },
    };

    const t = translations[langKey];

    const [isAnonymous, setIsAnonymous] = useState(false);
    const [activeTab, setActiveTab] = useState("donate");
    const [countries, setCountries] = useState<Country[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [isValidating, setIsValidating] = useState(false);

    // Form data state
    const [formData, setFormData] = useState<FormData>({
        email: "",
        name: "",
        address: "",
        phoneNumber: "",
        countryId: "",
        donationAmount: 0,
    });

    const paymentFormData = useMemo(() => ({
        ...formData,
        phoneNumber: phoneNumber,
        orderId: obituaryEntry._id
    }), [formData, phoneNumber, obituaryEntry._id]);

    const fetchCountries = async (pageNumber: number) => {
        try {
            setLoading(true);
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/country/active?page=${pageNumber}&limit=10`);
            const newCountries = res.data.countries || [];

            setCountries(prev => {
                const allCountries = [...prev, ...newCountries];
                const unique = Array.from(
                    new Map(allCountries.map((c: Country) => [c._id, c])).values()
                );
                return unique;
            });

            const { totalPages } = res.data.pagination;
            setHasMore(pageNumber < totalPages);
        } catch (error) {
            console.error("Failed to fetch countries:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchCountries(page);
        }
    }, [page, isOpen]);

    const handleScroll = (e: React.UIEvent<HTMLSelectElement>) => {
        const target = e.target as HTMLSelectElement;
        if (
            hasMore &&
            !loading &&
            target.scrollTop + target.clientHeight >= target.scrollHeight - 10
        ) {
            setPage(prev => prev + 1);
        }
    };

    const handleAnonymousChange = (e: { target: { checked: boolean } }) => {
        setIsAnonymous(e.target.checked);
        if (e.target.checked) {
            setFormData(prev => ({
                ...prev,
                name: "",
                address: "",
                // Keep countryId for currency determination
            }));
            setPhoneNumber("");
            // Don't reset selectedCountry for anonymous donations
        }
    };

    const handleInputChange = (field: keyof FormData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // If country is selected, update selectedCountry state
        if (field === 'countryId' && typeof value === 'string') {
            const country = countries.find(c => c._id === value);
            setSelectedCountry(country || null);
        }
    };

    const validateForm = async () => {
        setIsValidating(true);
        
        if (!formData.email || !formData.donationAmount) {
            setError("Email and donation amount are required");
            setIsValidating(false);
            return false;
        }
        if (!formData.countryId || !selectedCountry) {
            setError("Please select a country to determine the currency");
            setIsValidating(false);
            return false;
        }
        
        // Check minimum donation amount (equivalent to 1 CAD)
        if (selectedCountry.currencyCode !== 'CAD') {
            try {
                const response = await axios.get(
                    `https://api.exchangerate.host/convert?from=${selectedCountry.currencyCode}&to=CAD&amount=${formData.donationAmount}&access_key=${process.env.NEXT_PUBLIC_EXCHANGE_RATE_KEY}`
                );
                
                if (response.data.success && response.data.result < 1) {
                    // Calculate minimum amount needed in user's currency to equal 1 CAD
                    const minAmountResponse = await axios.get(
                        `https://api.exchangerate.host/convert?from=CAD&to=${selectedCountry.currencyCode}&amount=1&access_key=${process.env.NEXT_PUBLIC_EXCHANGE_RATE_KEY}`
                    );
                    
                    if (minAmountResponse.data.success) {
                        const minAmount = minAmountResponse.data.result;
                        setError(`The minimum donation amount is equivalent to 1 CAD. Please enter at least ${selectedCountry.currencyCode} ${minAmount.toFixed(2)} to meet this generous minimum.`);
                    } else {
                        setError("The minimum donation amount is equivalent to 1 CAD. Please increase your donation amount.");
                    }
                    setIsValidating(false);
                    return false;
                }
            } catch (error) {
                console.error("Currency conversion failed:", error);
                // If conversion fails, allow the donation to proceed
            }
        } else if (formData.donationAmount < 1) {
            setError("The minimum donation amount is CAD 1.00");
            setIsValidating(false);
            return false;
        }
        
        if (!isAnonymous && (!formData.name || !formData.address || !phoneNumber)) {
            setError("All fields are required for non-anonymous donations");
            setIsValidating(false);
            return false;
        }
        
        setIsValidating(false);
        return true;
    };

    const handleContinueToPay = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const isValid = await validateForm();
        if (isValid) {
            setFormData(prev => ({ ...prev, phoneNumber }));
            setActiveTab("payment");
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
        setActiveTab("donate");
        setError("");
        setIsValidating(false);
        setFormData({
            email: "",
            name: "",
            address: "",
            phoneNumber: "",
            countryId: "",
            donationAmount: 0,
        });
        setPhoneNumber("");
        setIsAnonymous(false);
        setSelectedCountry(null);
        onClose();
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            <div className="relative bg-white p-8 shadow-lg max-w-full z-50 overflow-y-auto overflow-x-hidden thin-scrollbar">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-full p-2 border-2 border-black w-8 h-8 flex items-center justify-center"
                >
                    <X className="w-8 h-8 text-black" strokeWidth={4} />
                </button>

                {activeTab === "donate" && (
                    <div className="max-h-[80vh] w-auto md:w-[40rem] lg:w-[60rem]">
                        <div className="flex flex-col md:flex-row bg-gray-100 w-full p-4 mt-8">
                            <div className="w-full md:w-48 h-48 md:h-24 relative">
                                <Image
                                    src={obituaryEntry.imageUrl || "/images/placeholder.jpg"}
                                    alt={obituaryEntry.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="object-cover rounded"
                                />
                            </div>

                            <div className="w-full pl-0 md:pl-4 mt-4 md:mt-0 flex flex-col gap-y-4">
                                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                                    <h2 className="font-bold">{obituaryEntry.name}</h2>
                                    <span className="text-[#880002]">
                                        {obituaryEntry.condolences} {obituaryEntry.condolences === 1 ? t.tribute : t.tributes}
                                    </span>
                                </div>

                                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-2">
                                    <div>
                                        <p>{obituaryEntry.address}</p>
                                        <p>{obituaryEntry.date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form className="bg-white shadow-lg md:p-8 pb-8 mt-8" onSubmit={handleContinueToPay}>
                            <div className="flex-shrink min-w-0 max-w-full mt-4 mb-10">
                                <TitleWithUnderline text={t.donorDetails} underlineWidth={64} fontSize={3} />
                            </div>

                            {error && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {error}
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <div className="flex-1">
                                    <label htmlFor="country" className="pb-2 block">
                                        {t.country}{t.required}
                                    </label>
                                    <select
                                        id="country"
                                        value={formData.countryId}
                                        onChange={(e) => handleInputChange("countryId", e.target.value)}
                                        onScroll={handleScroll}
                                        className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                        required
                                    >
                                        <option value="">{t.selectCountry}</option>
                                        {countries.map((country) => (
                                            <option key={country._id} value={country._id}>
                                                {country.name[langKey]?.[0]?.value || country.name.en[0].value}
                                            </option>
                                        ))}
                                        {loading && <option disabled>{t.loading}</option>}
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="donationAmount" className="block pb-2">
                                        {t.donationAmount}{t.required}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id="donationAmount"
                                            min="1"
                                            step="0.01"
                                            value={formData.donationAmount || ""}
                                            onChange={(e) => handleInputChange("donationAmount", parseFloat(e.target.value) || 0)}
                                            disabled={!selectedCountry}
                                            className={`w-full h-[3.5rem] pl-16 pr-3 py-2 border ${!selectedCountry ? "border-gray-400 bg-gray-100" : "border-primary"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                            required
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                            {selectedCountry ? selectedCountry.currencyCode : "---"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block pb-2">
                                    {t.emailAddress}{t.required}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    required
                                />
                            </div>

                            <div className="mb-4 flex items-center justify-between">
                                <label htmlFor="anonymous" className="text-sm font-medium">
                                    {t.keepAnonymous}
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value=""
                                        className="sr-only peer"
                                        id="anonymous"
                                        checked={isAnonymous}
                                        onChange={handleAnonymousChange}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600" />
                                </label>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block ${isAnonymous ? "text-gray-400" : ""}`}>
                                    {t.name}{!isAnonymous && t.required}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    readOnly={isAnonymous}
                                    className={`w-full h-[3.5rem] px-3 py-2 border ${isAnonymous ? "border-gray-400 bg-gray-100" : "border-primary"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                    required={!isAnonymous}
                                />
                            </div>



                            <div className="mb-4">
                                <label htmlFor="address" className={`pb-2 block ${isAnonymous ? "text-gray-400" : ""}`}>
                                    {t.address}{!isAnonymous && t.required}
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    value={formData.address}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                    readOnly={isAnonymous}
                                    className={`w-full h-[3.5rem] px-3 py-2 border ${isAnonymous ? "border-gray-400 bg-gray-100" : "border-primary"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                    required={!isAnonymous}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phone" className={`pb-2 block ${isAnonymous ? "text-gray-400" : ""}`}>
                                    {t.phoneNumber}{!isAnonymous && t.required}
                                </label>
                                {/* <PhoneInput
                                    country={'lk'}
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={setPhoneNumber}
                                    disabled={isAnonymous}
                                    inputClass={`!w-full !h-[3.5rem] !px-3 !py-2 !text-black ${isAnonymous ? "!bg-gray-100 border-gray-400" : "!bg-white border-primary"} border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                    containerClass="!w-full"
                                /> */}
                                <PhoneInput
                                    country={'lk'}
                                    placeholder="Phone Number"
                                    containerClass="phone-input"
                                    inputClass="form-control"
                                    value={phoneNumber}
                                    onChange={setPhoneNumber}
                                    disabled={isAnonymous}
                                />
                            </div>

                            <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6"
                                >
                                    {t.back}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isValidating}
                                    className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isValidating ? "Validating..." : t.continueToPay}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {activeTab === "payment" && (
                    <PaymentForm
                        formData={paymentFormData}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                        onBack={handleBackToForm}
                        isAnonymous={isAnonymous}
                        currencyCode={selectedCountry?.currencyCode || "CAD"}
                        t={t}
                    />
                )}


                {activeTab === "success" && (
                    <PaymentSuccessMessage
                        onClose={handleClose}
                        t={t}
                        donationAmount={formData.donationAmount}
                        currencyCode={selectedCountry?.currencyCode || "CAD"}
                        donorName={formData.name}
                        isAnonymous={isAnonymous}
                    />
                )}
            </div>
        </div>,
        document.body
    );
};

export default DonateModal;