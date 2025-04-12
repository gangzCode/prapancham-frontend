"use client";
import Image from 'next/image';
import { Minus, CirclePlus } from "lucide-react";
import React, { useState } from "react";
import { Upload, Trash2 } from 'lucide-react';
import { TitleWithUnderline } from '@/components/ui/title-with-underline';
import OrbituaryCard from '@/components/obituary/OrbituaryCard';

const tributeData = Array.from({ length: 10 }).map((_, index) => ({
    id: index,
    condolencesCount: Math.floor(Math.random() * 10) + 1,
    timeAgo: `${Math.floor(Math.random() * 5) + 1} hour${Math.random() > 0.5 ? "s" : ""} ago`,
    imageUrl: "/images/tribute.jpg",
    ceremonyTitle: "31st day ceremony after death",
    eventName: `Event Name ${index + 1}`,
    date: "DD/MM/YYYY",
}));
const Events: React.FC = () => {
    const [activeTab, setActiveTab] = useState("General");

    const tabs = ["General", "Obituary", "Remembrance", "Advertisement"];

    return (
        <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16 py-6 max-md:px-5">
            <div className="shadow rounded">
                <div className="container mx-auto px-4 shadow border border-gray-300 bg-white rounded-lg">
                    <div className="flex flex-col md:flex-row md:justify-between items-center p-4 md:px-6 gap-4 md:gap-0">
                        <div className="w-full overflow-x-auto">
                            <div className="flex items-center space-x-4 whitespace-nowrap">
                                {tabs.map((tab, index) => (
                                    <React.Fragment key={tab}>
                                        <a
                                            href="#"
                                            onClick={() => setActiveTab(tab)}
                                            className={`${activeTab === tab ? "text-[#1D94C5] font-bold" : ""
                                                } transition-colors duration-200`}
                                        >
                                            {tab}
                                        </a>
                                        {index < tabs.length - 1 && (
                                            <Minus className=" h-4 w-[1px] mt-1 bg-black" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>


                        <div className="flex justify-end ">
                            <button className="border border-primary text-primary px-4 py-2 rounded shrink-0">
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
                {activeTab === 'General' &&
                    <div>
                        <div className="bg-gray-50 p-6 my-10  rounded shadow">
                            <div className="flex flex-row items-center gap-6 md:mx-4">
                                <Image
                                    src="/images/tribute.jpg"
                                    alt="Profile"
                                    width={100}
                                    height={100}
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                <div className="flex flex-wrap gap-4">
                                    <button className="border border-primary text-primary px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-50">
                                        <Upload className="w-4 h-4" />
                                        <span>Upload Image</span>
                                    </button>
                                    <button className="border border-[#880002] text-[#880002] px-4 py-2 rounded flex items-center gap-2 hover:bg-red-50">
                                        <Trash2 className="w-4 h-4" />
                                        <span>Remove</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <form className='px-8'>
                            <div className="grid grid-col-1 md:grid-cols-2 gap-4">
                                <div className="">
                                    <label htmlFor="name" className="block pb-2 ">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="email" className="block pb-2 text-gray-400">
                                        E-mail ID
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        readOnly
                                        className="w-full h-[3.5rem] px-3 py-2 border border-gray-400 rounded-lg "
                                    />
                                </div>
                                <div className="">
                                    <div className="flex-1">
                                        <label htmlFor="phone" className="block pb-2 ">
                                            Country
                                        </label>
                                        <div className="relative">
                                            <select className="w-full p-4 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600">
                                                <option>United States</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <label htmlFor="phone" className="block pb-2 ">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="phone" className="block pb-2 ">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        className="w-full h-[3.5rem] px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-10 mb-4">
                                <button type="submit"
                                    className="px-5 bg-primary text-white p-3 rounded font-semibold"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                }
                {activeTab === 'Obituary' &&
                    <div className='my-4 md:p-6'>
                        <div className="flex-shrink min-w-0 max-w-full pb-6">
                            <TitleWithUnderline text="Tributes" underlineWidth={64} fontSize={3} />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                            <div className="border-2 border-dashed border-gray-300 flex items-center justify-center p-4 min-h-48">
                                <div className="text-center">
                                    <CirclePlus className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500">Post Obituary</p>
                                </div>
                            </div>
                            <div className="bg-white shadow-md  px-4 w-full ">
                                <div className="relative bg-primary text-white p-4 mb-4 rounded-b-none rounded-lg">
                                    <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-tr-lg">Premium</div>
                                    <div className="text-lg font-semibold mt-6">4 Days Plan + no addons</div>
                                    <div className="text-2xl font-bold mt-4">LKR 10,000</div>
                                    <div className="text-sm mt-4">Purchased on 22/03/2025</div>
                                </div>
                                <button className="my-4 w-full bg-primary text-white py-4 rounded-lg text-center font-semibold">Continue Editing</button>
                            </div>
                            {tributeData.map((item) => (
                                <OrbituaryCard
                                    key={item.id}
                                    condolencesCount={item.condolencesCount}
                                    timeAgo={item.timeAgo}
                                    imageUrl={item.imageUrl}
                                    ceremonyTitle={item.ceremonyTitle}
                                    eventName={item.eventName}
                                    date={item.date}
                                />
                            ))}
                        </div>
                    </div>
                }
                {activeTab === 'Remembrance' &&
                    <div className='my-4 md:p-6'>
                        <div className="flex-shrink min-w-0 max-w-full pb-6">
                            <TitleWithUnderline text="Rememberence" underlineWidth={64} fontSize={3} />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                            <div className="border-2 border-dashed border-gray-300 flex items-center justify-center p-4 min-h-48">
                                <div className="text-center">
                                    <CirclePlus className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500">Post Rememberence</p>
                                </div>
                            </div>
                            <div className="bg-white shadow-md  px-4 w-full ">
                                <div className="relative bg-primary text-white p-4 mb-4 rounded-b-none rounded-lg">
                                    <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-tr-lg">Premium</div>
                                    <div className="text-lg font-semibold mt-6">4 Days Plan + no addons</div>
                                    <div className="text-2xl font-bold mt-4">LKR 10,000</div>
                                    <div className="text-sm mt-4">Purchased on 22/03/2025</div>
                                </div>
                                <button className="my-4 w-full bg-primary text-white py-4 rounded-lg text-center font-semibold">Continue Editing</button>
                            </div>
                            {tributeData.map((item) => (
                                <OrbituaryCard
                                    key={item.id}
                                    condolencesCount={item.condolencesCount}
                                    timeAgo={item.timeAgo}
                                    imageUrl={item.imageUrl}
                                    ceremonyTitle={item.ceremonyTitle}
                                    eventName={item.eventName}
                                    date={item.date}
                                />
                            ))}
                        </div>
                    </div>
                }
                {activeTab === 'Advertisement' &&
                    <div className='my-4 md:p-6'>
                        <div className="flex-shrink min-w-0 max-w-full pb-6">
                            <TitleWithUnderline text="Advertisement" underlineWidth={64} fontSize={3} />
                        </div>
                        <div className="border-2 border-dashed border-gray-300 flex items-center justify-center p-4 min-h-48">
                            <div className="text-center">
                                {/* <CirclePlus className="w-10 h-10 text-gray-400 mx-auto mb-2" /> */}
                                <p className="text-gray-900">No advertisements posted!</p>
                                <p className="text-gray-900">Contact <span className='text-primary underline font-semibold'>administration</span> to post your advertisements</p>
                            </div>
                        </div>

                    </div>
                }
            </div>
        </section>
    );
};

export default Events;
