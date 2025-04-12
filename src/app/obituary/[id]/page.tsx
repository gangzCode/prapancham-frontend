import React from "react";
import AdvertisementSidebar from "@/components/news-category/AdvertisementSidebar";
import { Separator } from "@/components/ui/separator";
import CountrySection from "@/components/obituary/CountrySection";
import { Pagination } from "@/components/ui/pagination";
import PaginationBar from "@/components/category/PaginationBar";
import OrbituaryNavbar from "@/components/obituary/OrbituaryNavbar";
import { TitleWithUnderline } from "@/components/ui/title-with-underline";



const ObituaryDetail: React.FC = () => {
    return (
        <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16  py-6 max-md:px-5">
            <Separator className="mb-4" />
            <OrbituaryNavbar />
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <div className="bg-gray-100 md:p-10 p-4">
                        <div className="bg-white w-full  shadow-md">
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
                    <div className="mt-8">
                        <div className="flex-shrink min-w-0 max-w-full">
                            <TitleWithUnderline text="Tributes" underlineWidth={64} fontSize={3} />
                        </div>

                        <div className="space-y-4 mt-8">
                            <div className="bg-[#1A1D1F] text-white p-4 ">
                                Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales quisque nibh est. Diam natoque scelerisque netus tellus. Est mus potenti dictum augue. Fringilla scelerisque sed ultricies dignissim nisi integer adipiscing. Convallis facilisis adipiscing odio ac.
                            </div>
                            <div className="bg-[#1A1D1F] text-white p-4 ">
                                Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales quisque nibh est. Diam natoque scelerisque netus tellus. Est mus potenti dictum augue. Fringilla scelerisque sed ultricies dignissim nisi integer adipiscing. Convallis facilisis adipiscing odio ac.
                            </div>
                            <div className="bg-[#1A1D1F] text-white p-4 ">
                                Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales quisque nibh est. Diam natoque scelerisque netus tellus. Est mus potenti dictum augue. Fringilla scelerisque sed ultricies dignissim nisi integer adipiscing. Convallis facilisis adipiscing odio ac.
                            </div>
                            <div className="bg-[#1A1D1F] text-white p-4 ">
                                Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales quisque nibh est. Diam natoque scelerisque netus tellus. Est mus potenti dictum augue. Fringilla scelerisque sed ultricies dignissim nisi integer adipiscing. Convallis facilisis adipiscing odio ac.
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 items-center self-stretch mt-4">
                            <button className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0B4157] rounded border border-teal-900 border-solid min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                Post Tribute
                            </button>
                            <button className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0B4157] rounded min-h-6 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                                Read All
                            </button>
                        </div>
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
    );
};

export default ObituaryDetail;
