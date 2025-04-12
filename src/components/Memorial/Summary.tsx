"use client";
import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import { Check, X } from 'lucide-react';
import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import Image from "next/image";
import PaymentModal from '../obituary/PaymentModal';

interface SummaryProps {
    setActiveStep: (step: number) => void;
}


const Summary: React.FC<SummaryProps> = ({ setActiveStep }) => {
    const [activeTab, setActiveTab] = useState("");
    const handlePay = () => {
        setActiveTab("success");
    };


    return (
        <div className='p-4 md:p-8 lg:px-16 bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]'>
            <form>
                <div className="p-4 mb-6">
                    <h3 className="text-xl font-semibold text-center mb-4 text-primary">Hi name, Our deepest condolences.</h3>
                    <p className="text-center text-gray-500 mb-4 text-primary">
                        You have selected a 4 days obituary plan package, <span className='text-[#880002]'>with no extra addons</span>
                    </p>
                </div>
                <div className="flex-shrink min-w-0 mb-8">
                    <TitleWithUnderline text="Summary" underlineWidth={64} />
                </div>
                <div className="p-4 border border-gray-500">
                    <h3 className="text-xl font-semibold text-center mb-4 text-primary">4 Days Plan + 1 Addons</h3>
                    <Separator />
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className='flex justify-between items-center mt-2 mx-8'>
                            <p>Lorem ipsum</p>
                            <div className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-500">
                                <Check className="text-black w-4 h-4" />
                            </div>
                        </div>
                    ))}

                </div>
                <div className='flex justify-between text-primary my-8'>
                    <p>Total amount to pay</p>
                    <h1 className="text-xl font-bold">31,000KR</h1>
                </div>
                <div className='border-t border-gray-500 pt-4 mb-8'>
                    <p>Title &#40;Name of Deceased&#41;<span className="text-[#880002]">*</span></p><br />
                    <p>Address<span className="text-[#880002]">*</span></p><br />
                    <p>Date of Birth<span className="text-[#880002]">*</span></p><br />
                    <p>Date of Death<span className="text-[#880002]">*</span></p><br />
                    <p>Ullamcorper fames diam eget nisl faucibus massa ante. Nec magna purusvitae adipiscing
                        gravida in vulputate mauris. Volutpat integer aliquam mattis tincidunt dui sodales
                        viverra. Vestibulum pellentesque dolor ipsum aliquam pretium morbi mauris. Erat
                        pellentesque lectus nulla auctor. Faucibus malesuada vulputate quisque cras volutpat
                        pretium. Augue tempus ut aliquam sem elit.morbi ornare nullam velit. Id facilisis risus
                        sit eros facilisis sapien in orci. Aliquam vel ipsum vulputate diam.

                        Ullamcorper fames diam eget nisl faucibus massa ante. Nec magna purus vitae adipiscing
                        gravida in vulputate mauris. Volutpat integer aliquam mattis tincidunt dui sodales viverra.
                        Vestibulum pellentesque
                    </p><br />
                    <p>Tribute Video Link</p><br />
                    <div>
                        <div className="grid md:grid-cols-6 grid-cols-1  mt-6 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="w-full md:h-36 flex items-center justify-center">
                                    <img
                                        src="/images/tribute.jpg"
                                        alt="/images"
                                        className="object-cover md:w-48 aspect-square"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='text-end'>
                    I have read and accept the <span className='text-[#880002] underline'>Terms & Conditions</span>
                </div>
                <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                    <button
                        onClick={() => setActiveStep(8)}
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
                {activeTab &&
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 ">

                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={(e => {
                                e.preventDefault();
                                setActiveTab("");
                            }
                            )}
                        ></div>


                        <div className="relative bg-white p-8  shadow-lg  max-w-full z-50 overflow-y-auto  overflow-x-hidden thin-scrollbar">
                            <button
                                onClick={(e => {
                                    e.preventDefault();
                                    setActiveTab("");
                                }
                                )}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-full p-2 border-2 border-black w-8 h-8 flex items-center justify-center"
                            ><X className="w-8 h-8 text-black" strokeWidth={4} />

                            </button>

                            {activeTab === "payment" && (
                                <PaymentModal
                                    isOpen={true}
                                    onClose={() => setActiveTab("donate")}
                                    onPay={handlePay}
                                />
                            )}
                            {activeTab === "success" &&
                                <div className="bg-white shadow-lg p-2 md:p-6 w-full mx-auto mt-4 md:mt-8">
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
                                    // onClick={handleClose}
                                    >
                                        Done
                                    </button>
                                </div>
                            }
                        </div>
                    </div>}
            </form>
        </div>
    );
};

export default Summary;