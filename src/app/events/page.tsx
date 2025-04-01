import React from "react";
import { Headphones, Youtube } from "lucide-react";
import Calendar from "@/components/events/calendar";
import EventSlider from "@/components/events/event-slider";
import EventList from "@/components/events/event-list";

const Events: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <div className=" py-8 px-4 md:px-8 lg:px-16">
                <Calendar />
                <div className="flex flex-col lg:flex-row gap-8 mt-4">
                    {/* Main Content Section */}
                    <div className="w-full lg:w-2/3">
                        <EventSlider />
                        <EventList />
                    </div>


                    {/* Sidebar - Ads and Contact Information */}
                    <div className="w-full lg:w-1/3 space-y-6 border p-4">
                        {/* Contact Sections */}
                        <div className="bg-white rounded-md shadow-sm border border-gray-100">
                            <div className="bg-white p-4 text-center">
                                <h3 className="text-[#880002] font-bold">
                                    Contact Us For Advertisements
                                </h3>
                                <div className="mt-3 mb-2">
                                    <button className="w-full bg-[#0A3F51] text-white py-3 rounded-md hover:bg-[#0A3F51]/90 transition-colors">
                                        +94 77 002 33 23
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-md shadow-sm border border-gray-100">
                            <div className="bg-white p-4 text-center">
                                <h3 className="text-[#880002] font-bold">
                                    Contact Us For Obituary News
                                </h3>
                                <div className="mt-3 mb-2">
                                    <button className="w-full bg-[#0A3F51] text-white py-3 rounded-md hover:bg-[#0A3F51]/90 transition-colors">
                                        +94 77 002 33 23
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Advertisement Banners */}
                        <div className="space-y-4">
                            <div className="bg-blue-500 rounded-md overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1607083206968-13611e3d76db"
                                    alt="Super Sale"
                                    className="w-full h-auto"
                                />
                            </div>

                            <div className="bg-red-500 rounded-md overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5"
                                    alt="Black Friday"
                                    className="w-full h-auto"
                                />
                            </div>

                            <div className="bg-yellow-500 rounded-md overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae"
                                    alt="Super Sale"
                                    className="w-full h-auto"
                                />
                            </div>

                            <div className="bg-green-500 rounded-md overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1589254065878-42c9da997008"
                                    alt="Website Creation"
                                    className="w-full h-auto"
                                />
                            </div>

                            <div className="bg-black rounded-md overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1627384113743-6bd5a479fffd"
                                    alt="Black Friday Sale"
                                    className="w-full h-auto"
                                />
                            </div>

                            <div className="bg-orange-500 rounded-md overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae"
                                    alt="Super Sale"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>

                        {/* Contact Details Section */}
                        <div className="bg-white rounded-md shadow-sm border border-gray-100">
                            <div className="bg-white p-4 text-center">
                                <h3 className="text-[#880002] font-bold mb-4">
                                    For More Details Contact Us
                                </h3>
                                <div className="space-y-3">
                                    {[1, 2, 3, 4, 5].map((item, index) => (
                                        <button
                                            key={index}
                                            className="w-full bg-[#0A3F51] text-white py-3 rounded-md hover:bg-[#0A3F51]/90 transition-colors"
                                        >
                                            +94 77 002 33 23
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="space-y-3">
                            <a
                                href="#"
                                className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                <Headphones className="w-5 h-5 text-gray-700" />
                                <span className="text-[#880002]">Listen To Our Podcast Now</span>
                            </a>

                            <a
                                href="#"
                                className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                <Youtube className="w-5 h-5 text-red-600" />
                                <span className="text-[#880002]">Visit our YouTube Now</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
