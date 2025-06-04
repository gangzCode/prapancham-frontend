"use client";
import { TitleWithUnderline } from "@/components/ui/title-with-underline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const About = () => {
    type StatProps = {
        count: string;
        label: string;
    };

    const stats: StatProps[] = [
        { count: "2", label: "Years of expertise" },
        { count: "100", label: "Daily Readers" },
        { count: "50", label: "Subscribers" },
        { count: "20", label: "Team Members" },
    ];

    const Counter = ({ target }: { target: number }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            let start = 0;
            const duration = 2000; // 2 seconds
            const stepTime = Math.abs(Math.floor(duration / target));

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start >= target) clearInterval(timer);
            }, stepTime);

            return () => clearInterval(timer);
        }, [target]);

        return <motion.span>{count}+</motion.span>;
    };

    const offerings = [
        {
            description:
                `Funeral Fundraising: We help families 
                raise funds quickly and respectfully during times of loss.`,
            imageSrc:
                "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        },
        {
            description:
                `Local Partnerships: We collaborate with florists and service 
                providers to offer meaningful, affordable support options.`,
            imageSrc:
                "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        },
        {
            description:
                `Digital Platform: Our website simplifies the process of
                 giving and receiving help, connecting people
                  through compassion and purpose.`,
            imageSrc:
                "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        },
        {
            description:
                `Ongoing Initiatives: From awareness campaigns to 
                support drives, we are always working to meet emerging 
                community needs with grace and care.`,
            imageSrc:
                "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        },
    ];

    const attendees = [
        { id: 1, name: 'Attendee 1', imageUrl: 'https://storage.googleapis.com/a1aa/image/WpYM3R-C69SiR3u0ZBVgoaVLPpaAzd4Mgx7zxGqR30M.jpg' },
        { id: 2, name: 'Attendee 2', imageUrl: 'https://storage.googleapis.com/a1aa/image/bcA1oIydlhkWJJ7Jlwm22KMwQiLVNZQinDmq-I6R6MA.jpg' },
        { id: 3, name: 'Attendee 3', imageUrl: 'https://storage.googleapis.com/a1aa/image/eWz3K9uN30e2uNXszdWk_d5aJkwnQSQu8Sm-Aswsv7o.jpg' },
        { id: 4, name: 'Attendee 4', imageUrl: 'https://storage.googleapis.com/a1aa/image/DQimsrnpYjVqF_WDtYqxHIsbmW0I2R6HrQw6RA5bs10.jpg' },
        { id: 5, name: 'Attendee 5', imageUrl: 'https://storage.googleapis.com/a1aa/image/b-2uUEe6r0ZYDFtA8csYUgtfY1F_DlQznQEAfczFTs4.jpg' },
    ];

    return (
        <div className="bg-white min-h-screen mt-8">
            <div className="space-y-10">
                <div className="px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <Image
                                src="/images/event-1.png"
                                alt="About us"
                                width={500}
                                height={400}
                                className="w-[100%] h-auto mx-auto object-cover "
                            />
                        </div>
                        <div className="text-justify">
                            <div className="flex-shrink min-w-0">
                                <TitleWithUnderline text="About" underlineWidth={64} />
                            </div>
                            <p className="mb-4">Prapancham is more than just a non- profit— it’s a global mindset
                                grounded in purpose, integrity, and innovation.
                                Rooted in
                                the ancient Sanskrit word for "world" or "universe,"
                                Prapancham represents our vision to create meaningful
                                impact across industries, communities, and cultures.</p>
                            <p className="mb-4">Prapancham is a purpose-driven charitable organization committed to
                                supporting communities with empathy, dignity, and innovation. Rooted in the belief
                                that compassion can be a catalyst for change, we aim to
                                build a trustworthy and sustainable platform that
                                responds to real-life needs—especially during life’s
                                most vulnerable moments.</p>
                            <p className="mb-4">We focus on creating accessible and
                                lasting impact by combining heartfelt support with
                                smart technology, meaningful partnerships, and a deep
                                understanding of our community's challenges.</p>
                        </div>
                    </div>
                </div>

                <Separator className="!w-full !mb-2" />

                <div className="px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <h3 className="text-3xl md:text-5xl font-bold mb-2">
                                    {index === 0 && <span className="mr-4">Over</span>}
                                    <Counter target={parseInt(stat.count, 10)} />
                                </h3>
                                <p>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator className="!w-full mb-8" />

                <div className="px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="text-justify">
                            <div className="flex-shrink min-w-0">
                                <TitleWithUnderline text="How Do We Work?" underlineWidth={64} />
                            </div>
                            <p className="mb-4">At Prapancham, we believe that every act of
                                kindness counts, and every contribution can change a
                                life. Our approach is:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Community-Centered: We start by listening
                                    to the needs of the people we serve and
                                    co-creating solutions that reflect their
                                    realities.</li>
                                <li>Collaborative: We work alongside
                                    local businesses, service providers,
                                    and volunteers to deliver personalized,
                                    impactful support.</li>
                                <li>
                                    Tech-Enabled: Our easy-to-use web platform
                                    streamlines fundraising and community
                                    support, making help more accessible when
                                    it’s needed most.
                                </li>
                                <li>Transparent & Accountable: We prioritize trust,
                                    providing clear information, reliable processes,
                                    and consistent communication.</li>
                            </ul>

                        </div>
                        <div className="flex items-center mx-auto mr-10">
                            <div className="relative h-[280px] md:h-[400px] pr-8">
                                <Image
                                    src="/images/top-ad-1.png"
                                    alt="Two boys smiling and hugging each other"
                                    width={400}
                                    height={400}
                                    objectFit="cover"
                                    className=" aspect-[1/1] transform translate-x-20 w-64 md:w-96"
                                />
                                <Image
                                    src="/images/top-ad-2.png"
                                    alt="A woman recording a podcast with a microphone and headphones"
                                    width={300}
                                    height={300}
                                    className=" aspect-[1/1] w-48 md:w-72 p-4 bg-white absolute md:bottom-0 bottom-0  transform -translate-x-1/4 -translate-y-1/4   "
                                />

                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="!w-full !mb-2" />

                <div className="px-4 sm:px-8 lg:px-16">
                    <h2 className="text-[1.2rem] font-bold text-center text-[#0D1322] mb-8 flex flex-col items-center justify-center font-[Poppins]">
                        What Do We Offer?
                        <div className="bg-[#880002] w-16 h-0.5 mt-2"></div>
                    </h2>

                    <div className="text-justify">
                        <p>Prapancham provides a range of charitable services and tools designed to support families and inspire community giving:</p>
                        {offerings.map((offer, index) => (
                            <div key={index} className="flex md:items-center space-x-4 mb-6">
                                <div className="w-16 h-16 relative m-4 flex-shrink-0">
                                    <Image
                                        src={offer.imageSrc}
                                        alt={`Icon representing`}
                                        layout="fill"
                                        objectFit="cover"
                                        className=""
                                    />
                                </div>
                                <div>
                                    <p className="text-gray-600">{offer.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator className="!w-full !mb-2" />

                <div className="px-4 sm:px-8 lg:px-16">
                    <div className="text-center">
                        <h2 className="text-[1.2rem] font-bold text-center text-[#0D1322] mb-8 flex flex-col items-center justify-center font-[Poppins]">
                            About Our Obituary
                            <div className="bg-[#880002] w-16 h-0.5 mt-2"></div>
                        </h2>
                        <div className="flex justify-center items-center mt-2 space-x-2 ">
                            <div className="flex items-center mb-2">
                                {attendees.slice(0, 5).map((attendee) => (
                                    <img
                                        key={attendee.id}
                                        alt={`Attendee ${attendee.id}`}
                                        className="w-8 h-8 rounded-full border-2 border-white -ml-2"
                                        src={attendee.imageUrl}
                                    />
                                ))}
                            </div>
                            <span className="ml-2 text-gray-600">120+ Subscribers</span>
                        </div>
                        <div className="mt-4 ">
                            <p>
                                We are a forward-thinking charitable organization
                                committed to building a sustainable, trustworthy
                                platform that meets the evolving needs of our community.
                                Our goal is to create meaningful, accessible, and
                                lasting impact by leveraging innovative solutions,
                                strategic partnerships, and community engagement.
                                Through initiatives like funeral fundraising,
                                collaborations with local florists, and a user-friendly
                                web platform, we aim to support families in need,
                                foster compassion, and inspire collective action
                                for good.
                            </p>
                        </div>
                    </div>
                </div>

                <Separator className="!w-full !mb-2" />

                <div className="px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        <div className="flex items-center mx-auto">
                            <div className="relative w-full h-[280px] md:h-[400px]">
                                <Image
                                    src="/images/top-ad-1.png"
                                    alt="Two boys smiling and hugging each other"
                                    width={400}
                                    height={400}
                                    objectFit="cover"
                                    className="rounded aspect-[1/1] transform -translate-x-0 md:-translate-x-20 w-48 md:w-72"
                                />
                                <div className="absolute bottom-0 left-0 p-4 bg-white transform translate-x-20 translate-y-8">
                                    <Image
                                        src="/images/top-ad-2.png"
                                        alt="A woman recording a podcast with a microphone and headphones"
                                        width={300}
                                        height={300}
                                        className="rounded aspect-[1/1]  w-48  md:w-72"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-justify">
                            <div className="flex-shrink min-w-0">
                                <TitleWithUnderline text="Our Mission" underlineWidth={64} />
                            </div>
                            <p className="mb-4">To support community needs through innovative,
                                sustainable, and inclusive charitable initiatives that
                                foster trust, encourage participation, and create
                                lasting social impact.</p>

                        </div>
                    </div>
                </div>

                <Separator className="!w-full !mb-2" />

                <div className="px-4 md:px-8 lg:px-16 pb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="text-justify">
                            <div className="flex-shrink min-w-0">
                                <TitleWithUnderline text="Our Vision" underlineWidth={64} />
                            </div>
                            <p className="mb-4">To be a trusted leader in charitable giving,
                                empowering communities through technology,
                                partnerships, and heartfelt support—especially
                                during life’s most emotionally significant moments.</p>
                        </div>
                        <div className="flex items-center mx-auto">
                            <div className="relative w-full h-[280px] md:h-[400px]">
                                <Image
                                    src="/images/top-ad-1.png"
                                    alt="Two boys smiling and hugging each other"
                                    width={400}
                                    height={400}
                                    objectFit="cover"
                                    className="rounded aspect-[1/1] transform -translate-x-0 md:-translate-x-20 w-48 md:w-72"
                                />
                                <div className="absolute bottom-0 left-0 p-4 bg-white transform translate-x-20 translate-y-8">
                                    <Image
                                        src="/images/top-ad-2.png"
                                        alt="A woman recording a podcast with a microphone and headphones"
                                        width={300}
                                        height={300}
                                        className="rounded aspect-[1/1]  w-48  md:w-72"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Separator className="!w-full !mb-8" />
            </div>
        </div>
    );
};

export default About;
