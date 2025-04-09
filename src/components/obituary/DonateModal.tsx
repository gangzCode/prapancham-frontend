import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Image from "next/image";
import { TitleWithUnderline } from "../ui/title-with-underline";
import { Separator } from "@/components/ui/separator";

type DonateModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
    const [isAnonymous, setIsAnonymous] = useState(false);

    const [activeTab, setActiveTab] = useState("donate");

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
        setActiveTab("donate");
        onClose();
    };


    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">

            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            ></div>


            <div className="relative bg-white p-8  shadow-lg  max-w-full z-50 overflow-y-auto  overflow-x-hidden thin-scrollbar">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-full p-2 border-2 border-black w-8 h-8 flex items-center justify-center"
                ><X className="w-8 h-8 text-black" strokeWidth={4} />

                </button>


                {activeTab === "donate" &&
                    <div className="max-h-[80vh] w-auto md:w-[40rem]  lg:w-[60rem] ">
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

                        <form className="bg-white shadow-lg md:p-8 mt-8" >
                            <div className="flex-shrink min-w-0 max-w-full mt-4 mb-10">
                                <TitleWithUnderline text="Donor's Details" underlineWidth={64} fontSize={3} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block pb-2 ">
                                    Email Address*
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <div className="mb-4 flex items-center justify-between">
                                <label htmlFor="anonymous" className="text-sm font-medium">
                                    Keep it an anonymous donation
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox"
                                        value=""
                                        className="sr-only peer"
                                        id="anonymous"
                                        checked={isAnonymous}
                                        onChange={handleAnonymousChange}
                                    />
                                    <div
                                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-600">

                                    </div>
                                </label>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className={`pb-2 block ${isAnonymous ? "text-gray-400" : ""}`}>
                                    Name*
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    readOnly={isAnonymous}
                                    className={`w-full h-[3.5rem] px-3 py-2 border ${isAnonymous ? "border-gray-400" : "border-primary"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="country" className={`pb-2 block  ${isAnonymous ? "text-gray-400" : ""}`}>
                                    Country*
                                </label>
                                <select
                                    id="country"
                                    disabled={isAnonymous}
                                    className={`w-full h-[3.5rem] px-3 py-2 border ${isAnonymous ? "border-gray-400" : "border-primary"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                >
                                    <option value="">Select a country</option>
                                    <option value="sri-lanka">Sri Lanka</option>
                                    <option value="india">India</option>
                                    <option value="uk">United Kingdom</option>
                                    <option value="us">United States</option>
                                    {/* Add more as needed */}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className={`pb-2 block ${isAnonymous ? "text-gray-400" : ""}`}>
                                    Address*
                                </label>
                                <input
                                    readOnly={isAnonymous}
                                    type="text"
                                    id="address"
                                    className={`w-full h-[3.5rem] px-3 py-2 border ${isAnonymous ? "border-gray-400" : "border-primary"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className={`pb-2 block ${isAnonymous ? "text-gray-400" : ""}`}>
                                    Phone number*
                                </label>
                                <input
                                    readOnly={isAnonymous}
                                    type="text"
                                    id="phone"
                                    className={`w-full h-[3.5rem] px-3 py-2 border ${isAnonymous ? "border-gray-400" : "border-primary"} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600`}
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
                                        setActiveTab("payment");
                                    }
                                    )}
                                >
                                    Continue to Pay
                                </button>
                            </div>
                        </form>
                    </div>
                }
                {activeTab === "payment" &&
                    <div className="bg-white shadow-lg p-4 md:p-6 w-full mx-auto mt-0 md:mt-16">
                        <div className="flex space-x-4 mb-6 flex-wrap justify-center">
                            <div className="flex-1 w-40 p-4 border-2 border-gray-300 rounded-lg flex flex-col items-start justify-center mb-4 sm:mb-0">
                                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 2H0V5H16V2Z" fill="#030708" />
                                    <path d="M16 7H0V14H16V7Z" fill="#030708" />
                                </svg>
                                <span>Card</span>
                            </div>
                            <div className="flex-1 w-40 p-4 border-2 border-gray-300 rounded-lg flex flex-col items-start justify-center mb-4 sm:mb-0">
                                <Image
                                    alt="EPS logo"
                                    className="mr-2"
                                    height={20}
                                    width={20}
                                    src="/icons/eps.jpg"
                                />
                                <span>EPS</span>
                            </div>
                            <div className="flex-1 w-40 p-4 border-2 border-gray-300 rounded-lg flex flex-col items-start justify-center mb-4 sm:mb-0">
                                <Image
                                    alt="Giropay logo"
                                    className="mr-2"
                                    height={20}
                                    width={20}
                                    src="/icons/giropay.png"
                                />
                                <span>Giropay</span>
                            </div>
                            <div className="flex-1 p-4 border-2 border-gray-300 rounded-lg flex items-start justify-center mb-4 sm:mb-0">
                                <i className="fas fa-ellipsis-h text-xl"></i>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Account Number</label>
                            <div className="relative">
                                <input
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                    placeholder="1234 1234 1234 1234"
                                    type="text"
                                />
                                <div className="hidden md:flex absolute inset-y-0 right-0 items-center pr-3">
                                    <Image
                                        alt="Visa logo"
                                        className="mr-1"
                                        height={30}
                                        width={30}
                                        src="/icons/visa.svg"
                                    />
                                    <Image
                                        alt="MasterCard logo"
                                        className="mr-1"
                                        height={30}
                                        width={30}
                                        src="/icons/master.svg"
                                    />
                                    <Image
                                        alt="Visa logo"
                                        className="mr-1"
                                        height={30}
                                        width={30}
                                        src="/icons/amex.svg"
                                    />
                                    <Image
                                        alt="MasterCard logo"
                                        className="mr-1"
                                        height={30}
                                        width={30}
                                        src="/icons/discover.svg"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4 mb-4 flex-wrap">
                            <div className="flex-1">
                                <label className="block text-gray-700 font-semibold mb-2">Expiry</label>
                                <input
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                    placeholder="MM / YY"
                                    type="text"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 font-semibold mb-2">CVC</label>
                                <input
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                    placeholder="CVC"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-4 mb-4 flex-wrap">
                            <div className="flex-1">
                                <label className="block text-gray-700 font-semibold mb-2">Country</label>
                                <div className="relative">
                                    <select className="w-full p-3 border-2 border-gray-300 rounded-lg">
                                        <option>United States</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 font-semibold mb-2">Postal Code</label>
                                <input
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg"
                                    placeholder="90210"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end w-full">
                            <button
                                className="px-5 bg-primary text-white p-3 rounded font-semibold"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab("success");
                                }}
                            >
                                Pay
                            </button>
                        </div>
                    </div>
                }
                {activeTab === "success" &&
                    <div className="bg-white shadow-lg p-4 md:p-6 w-full mx-auto mt-0 md:mt-8">
                        <h2 className="text-center text-2xl my-4">Payment Successful!</h2>
                        <Separator className="!w-full" />
                        <div className="flex flex-col md:flex-row w-full mt-4">
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
                                </div>

                                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-2">
                                    <div>
                                        <p>No2. masdd, sddd sdsfffd</p>
                                        <p>Date of Birth - Date of Death</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Separator className="!w-full mt-4" />
                        <div className="flex justify-between">
                            <h2 className="text-center text-2xl my-4">Amount payed</h2>
                            <h2 className="text-center text-2xl font-bold my-4">2000.00LKR</h2>
                        </div>
                        <Separator className="!w-full mb-4" />
                        <button
                            className="w-full bg-primary text-white p-3 rounded font-semibold"
                            onClick={handleClose}
                        >
                            Done
                        </button>
                    </div>
                }
            </div>
        </div >,
        document.body
    );
};

export default DonateModal;
