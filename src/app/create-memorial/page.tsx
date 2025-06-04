"use client";

import FAQ from '@/components/Memorial/FAQ';
import Plans from '@/components/Memorial/Plans';
import Information from '@/components/Memorial/Information';
import ContactDetailsForm from '@/components/Memorial/ContactDetailsForm';
import AdvertisementSidebar from '@/components/news-category/AdvertisementSidebar';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Import, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import PrimaryImage from '@/components/Memorial/PrimaryImage';
import Frame from '@/components/Memorial/Frame';
import AdditionalImage from '@/components/Memorial/AdditionalImage';
import AccoundDetails from '@/components/Memorial/AccoundDetails';
import Summary from '@/components/Memorial/Summary';



const CreateMemorialPage: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedPlan, setSelectedPlan] = useState("Obituary");
    const [isChecked, setIsChecked] = useState(false);
    const dummyPlans = [
        {
            planName: "4 Days Plan",
            price: 10000,
            features: [
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum"
            ],
            isPremium: false,
        },
        {
            planName: "7 Days Plan",
            price: 15000,
            features: [
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum"
            ],
            isPremium: false,
        },
        {
            planName: "10 Days Plan",
            price: 25000,
            features: [
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum"
            ],
            isPremium: true,
        },
        {
            planName: "1 Month Plan",
            price: 40000,
            features: [
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum"
            ],
            isPremium: false,
        },
        {
            planName: "6 Month Plan",
            price: 120000,
            features: [
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum",
                "Lorem ipsum"
            ],
            isPremium: false,
        }
    ];

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [activeStep]);


    const handleChange = (event: { target: { value: string; }; }) => {
        if (event.target.value !== "") {
            setActiveStep(1);
        }
    };
    return (
        <section className="flex flex-col justify-center px-4 md:px-8 lg:px-16  py-6 max-md:px-5">
            {activeStep === 0 &&
                <div className="text-center mt-8">
                    <h1 className="text-2xl md:text-4xl font-bold text-primary">Choose the country of deceased person</h1>
                    <p className="text-primary mt-2 ">Please select the country from the dropdown below</p>
                    <div className="mt-6 relative inline-block w-full md:w-1/3">
                        <div className="relative">
                            <select
                                className="w-full p-4 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                                onChange={handleChange}
                            >
                                <option value="">--Select Country--</option>
                                <option value="sri-lanka">Sri Lanka</option>
                            </select>
                        </div>
                    </div>

                </div>
            }
            {activeStep === 1 &&
                <div className="text-center mt-8">
                    <div className="flex items-center space-x-2 p-4">
                        <div className="bg-primary text-white rounded-full p-2">
                            <ArrowLeft
                                onClick={() => setActiveStep(0)}
                                className='cursor-pointer'
                            />
                        </div>
                        <span className="text-primary text-lg">Go back</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold text-primary">Choose a Right Plan For You</h1>
                    <p className="text-primary my-2 ">Choose a Right Plan For You</p>
                    <div className="flex border border-primary w-72 p-2 rounded-lg mb-4  justify-center items-center mx-auto mt-8">
                        <button
                            className={
                                `py-2 px-2 font-medium text-xl border-b-2 -mb-px ${selectedPlan === "Obituary"
                                    ? "bg-primary text-white font-bold rounded"
                                    : "border-transparent text-[#0D1322] hover:text-gray-900"
                                }`
                            }
                            onClick={() => setSelectedPlan("Obituary")}
                        >
                            Obituary
                        </button>
                        <button
                            className={
                                `py-2 px-2 font-medium text-xl border-b-2 -mb-px ${selectedPlan === "Rememberence"
                                    ? "bg-primary text-white font-bold rounded"
                                    : "border-transparent text-gray-700 hover:text-gray-900"
                                }`
                            }
                            onClick={() => setSelectedPlan("Rememberence")}
                        >
                            Rememberence
                        </button>
                    </div>
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-center items-center">
                            {dummyPlans.map((plan, index) => (
                                <Plans
                                    key={index}
                                    planName={plan.planName}
                                    price={plan.price}
                                    features={plan.features}
                                    isPremium={plan.isPremium}
                                    setActiveStep={setActiveStep}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            }
            {activeStep === 2 &&
                <div className='p-4 md:p-8 lg:px-16 bg-white shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]'>
                    <div className="text-center mt-8">

                        <h1 className="text-2xl md:text-4xl font-bold text-primary">Hi name, Our deepest condolences</h1>
                        <p className="text-primary my-2 ">You have selected a 4 days  obituary plan package, <span className='text-[#880002]'>with no extra addons</span></p>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        <div className="p-4 border border-gray-500">
                            <div className='flex justify-between text-primary'>
                                <p>Total amount to pay</p>
                                <h1 className="text-xl font-bold">30,000KR</h1>
                            </div>
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
                        <div className="p-4 border border-gray-500">
                            <div className="flex items-center space-x-2">
                                <h1 className="text-xl font-bold text-primary">Additional Services</h1>
                            </div>
                            <Separator />
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className='flex justify-between items-center mt-2 mx-8'>
                                    <p>Lorem ipsum</p>
                                    <div className='flex gap-6'>
                                        <p>10,000LKR</p>
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#34C759]">
                                            <Plus className="text-[#34C759] font-bold w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='md:text-end flex items-center justify-end mt-8 break-words whitespace-normal'>
                        <div>
                            I have read and accept the  <span className='text-[#880002] underline'> Terms & Conditions</span>

                        </div>
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 ml-2 "
                            style={{
                                border: "2px solid #0D1322",
                                accentColor: "#0D1322",
                                color: "#0D1322"
                            }}
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                    </div>
                    <div className="flex justify-end gap-2 items-center self-stretch mt-16">
                        <button
                            onClick={(e => {
                                e.preventDefault();
                                setActiveStep(1);
                            }
                            )}
                            className="gap-2.5 self-stretch shrink-0 px-4 py-3 my-auto text-body-xs text-[#0D1322] rounded border border-teal-900 border-solid min-h-6 ">
                            Back
                        </button>
                        <button
                            className="gap-2.5 self-stretch px-4 py-3 my-auto text-white whitespace-nowrap bg-[#0D1322] rounded min-h-6 "
                            onClick={(e => {
                                e.preventDefault();
                                setActiveStep(3);
                            }
                            )}
                        >
                            Next
                        </button>
                    </div>
                </div>
            }
            {activeStep === 3 &&
                <Information
                    setActiveStep={setActiveStep}
                />
            }
            {activeStep === 4 &&
                <ContactDetailsForm
                    setActiveStep={setActiveStep}
                />
            }
            {activeStep === 5 &&
                <PrimaryImage
                    setActiveStep={setActiveStep}
                />
            }
            {activeStep === 6 &&
                <Frame
                    setActiveStep={setActiveStep}
                />
            }
            {activeStep === 7 &&
                <AdditionalImage
                    setActiveStep={setActiveStep}
                />
            }
            {activeStep === 8 &&
                <AccoundDetails
                    setActiveStep={setActiveStep}
                />
            }
            {activeStep === 9 &&
                <Summary
                    setActiveStep={setActiveStep}
                />
            }
            {(activeStep === 0 || activeStep === 1) &&
                <div>
                    <div className="my-16 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <img
                                src="https://images.unsplash.com/photo-1538688423619-a81d3f23454b"
                                alt="Black Friday Sale"
                                className="w-full md:max-h-[232px] max-h-[232px] object-cover"
                            />
                        </div>
                        <div>
                            <img
                                src="/images/top-ad-1.png"
                                alt="Black Friday Sale"
                                className="w-full md:max-h-[232px] max-h-[116px] object-cover"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 ">
                        <div className="md:col-span-2 pr-8 md:border-r border-gray-500">
                            <FAQ />
                        </div>

                        {/* Right side advertisement section - 1/3 width on desktop */}
                        <div className="md:col-span-1 pl-8">
                            <AdvertisementSidebar numberOfAds={4} />
                        </div>
                    </div>
                </div>
            }
        </section>
    );
};

export default CreateMemorialPage;