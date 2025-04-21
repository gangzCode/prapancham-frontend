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
    const [activeColor, setActiveColor] = useState("bg-gray-100");
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
                {/* <div className='border-t border-gray-500 pt-4 mb-8'>
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
                </div> */}


                <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16  py-6 max-md:px-5">
                    <Separator className="mb-5 w-full" />
                    <div className="flex flex-wrap gap-2 my-4">
                        {[
                            "#fdcece",
                            "#bfdbfd",
                            "#cff6dd",
                            "#fef2c2",
                            "#d2c3fc",
                            "#fee8d6",
                            "#ffffff",
                        ].map((color) => (
                            <button
                                key={color}
                                className="w-8 h-8 rounded-full flex items-center justify-center relative border-2 border-gray-400 bg-white"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveColor(color);
                                }}
                            >
                                <div
                                    className="w-6 h-6 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: color }}
                                >
                                    {activeColor === color && (
                                        <Check className="text-gray-500 w-4 h-4" />
                                    )}
                                </div>
                            </button>

                        ))}
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <div
                                className="bg-gray-100 md:p-10 p-4"
                            >
                                <div
                                    className="bg-white w-full  shadow-md"
                                    style={{ backgroundColor: activeColor }}
                                >
                                    <div className="pt-4 pb-2 text-center max-w-lg mx-auto px-4">
                                        <h1 className="text-xl font-bold text-primary mb-6">
                                            31st day ceremony after death
                                        </h1>

                                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
                                            <div className="text-gray-500  text-center flex md:flex-col">
                                                <p>Birth<span className="md:hidden mr-1 ml-1">:</span></p>
                                                <p>Birth date</p>
                                            </div>

                                            <img
                                                alt="Portrait of Mr. Nadesh Rasathurai"
                                                className="w-40 sm:w-60 shadow-md aspect-square object-cover mx-auto sm:mx-4"
                                                src="https://storage.googleapis.com/a1aa/image/Gq3Jh_7GVg1_qc9JxqqNf8LZ7c-13gEQYfPNoQDiPVc.jpg"
                                            />

                                            <div className="text-gray-500  text-center flex md:flex-col">
                                                <p>Death<span className="md:hidden mr-1 ml-1">:</span></p>
                                                <p>Death date</p>
                                            </div>
                                        </div>

                                        <p className="text-[#880002] font-medium">
                                            Mr. Nadesh Rasathurai
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <p className="text-justify mt-4">
                                Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales quisque nibh est. Diam natoque scelerisque netus tellus. Est mus potenti dictum augue. Fringilla scelerisque sed ultricies dignissim nisi integer adipiscing. Convallis facilisis adipiscing odio ac. Pharetra vitae ultricies sit vel. Massa purus nibh auctor eros sollicitudin sollicitudin pharetra tristique. Arcu accumsan consectetur lobortis ut vel pellentesque quis libero nullam.
                                Sed in viverra risus eros non nisl elit adipiscing praesent. Amet vel turpis et dis eget. Vel lectus tincidunt et mattis etiam.
                            </p>
                            <div className="flex justify-end gap-2 items-center self-stretch mt-4">
                                <button className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0B4157] rounded border border-teal-900 border-solid min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                    Post Tribute
                                </button>
                                <button className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                    Donate
                                </button>
                            </div>
                            <Separator className="mt-4 !w-full" />
                            <div className="mt-8">
                                <div className="flex-shrink min-w-0 max-w-full">
                                    <TitleWithUnderline text="Contacts" underlineWidth={64} fontSize={3} />
                                </div>
                                <div className="bg-white p-6 shadow-md mb-4 flex  md:flex-row flex-col justify-between md:items-center">
                                    <div>
                                        <p className="text-[#880002]">Mr. Nadesh Rasathurai</p>
                                        <p>no2. masdd,</p>
                                        <p>sddd, sdsdddfd</p>
                                        <p>Son</p>
                                    </div>
                                    <button className="mb-0 gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                        Request to Contact
                                    </button>
                                </div>
                                <div className="bg-white p-6 shadow-md mb-4 flex  md:flex-row flex-col justify-between md:items-center">
                                    <div>
                                        <p className="text-[#880002]">Mr. Nadesh Rasathurai</p>
                                        <p>no2. masdd,</p>
                                        <p>sddd, sdsdddfd</p>
                                        <p>Son</p>
                                    </div>
                                    <button className="mb-0 gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                        Request to Contact
                                    </button>
                                </div>
                                <div className="bg-white p-6 shadow-md mb-4 flex  md:flex-row flex-col justify-between md:items-center">
                                    <div>
                                        <p className="text-[#880002]">Mr. Nadesh Rasathurai</p>
                                        <p>no2. masdd,</p>
                                        <p>sddd, sdsdddfd</p>
                                        <p>Son</p>
                                    </div>
                                    <button className="mb-0 gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                        Request to Contact
                                    </button>
                                </div>
                            </div>
                        </div>



                        {/* Right side advertisement section - 1/3 width on desktop */}
                        <div className="md:col-span-1">
                            <div className="bg-white p-2 shadow-md">
                                <div className="flex-shrink min-w-0 max-w-full mt-2">
                                    <TitleWithUnderline text="Overview" underlineWidth={64} fontSize={3} />
                                </div>
                                <div className="space-y-2 mt-2 p-2">
                                    <p className="text-[#880002]">Mr. Nadesh Rasathurai</p>
                                    <p className="text-gray-500">Birth Date</p>
                                    <p className="text-gray-500">Death Date</p>
                                    <p>Age</p>
                                    <p>no2. masdd,sddd, sdsdddfd</p>
                                    <p>Funeral Date</p>
                                </div>
                                <Separator className="mt-6 !w-full mb-8" />
                                <div className="flex-shrink min-w-0 max-w-full mt-4">
                                    <TitleWithUnderline text="Poster's Information" underlineWidth={64} fontSize={3} />
                                </div>
                                <div className="space-y-2 mt-2 p-2">
                                    <p className="text-[#880002]">Mr. Nadesh Rasathurai</p>
                                    <p>no2. masdd,sddd, sdsdddfd</p>
                                </div>
                                <button className="w-full gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                    Request to Contact
                                </button>
                                <Separator className="mt-8 !w-full mb-4" />
                                <div className="flex-shrink min-w-0 max-w-full mt-8 mb-6">
                                    <TitleWithUnderline text="Pictures" underlineWidth={64} fontSize={3} />
                                </div>
                                <div className="p-2">
                                    <div className="bg-white p-2 shadow-md ">
                                        <div className="grid grid-cols-[3fr_2fr] gap-2 pb-4">
                                            <img
                                                alt="Portrait of Mr. Nadesh Rasathurai"
                                                className="w-full row-span-2 shadow-md h-full object-cover"
                                                src="https://storage.googleapis.com/a1aa/image/Gq3Jh_7GVg1_qc9JxqqNf8LZ7c-13gEQYfPNoQDiPVc.jpg"
                                            />
                                            <img
                                                alt="Portrait of Mr. Nadesh Rasathurai"
                                                className="w-full shadow-md aspect-square object-cover"
                                                src="https://storage.googleapis.com/a1aa/image/Gq3Jh_7GVg1_qc9JxqqNf8LZ7c-13gEQYfPNoQDiPVc.jpg"
                                            />
                                            <img
                                                alt="Portrait of Mr. Nadesh Rasathurai"
                                                className="w-full shadow-md aspect-square object-cover"
                                                src="https://storage.googleapis.com/a1aa/image/Gq3Jh_7GVg1_qc9JxqqNf8LZ7c-13gEQYfPNoQDiPVc.jpg"
                                            />
                                        </div>

                                        <button className="w-full gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                            Request to Contact
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>

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