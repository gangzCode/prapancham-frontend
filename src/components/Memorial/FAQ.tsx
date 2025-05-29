"use client";
import { SetStateAction, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TitleWithUnderline } from "../ui/title-with-underline";
import useSWR from 'swr';
import { useLanguage } from "@/components/ui/LanguageProvider";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(3);
    const { language } = useLanguage();

    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data, error, isLoading } = useSWR(
        typeof window !== "undefined" && process.env.NEXT_PUBLIC_API_URL
            ? `${process.env.NEXT_PUBLIC_API_URL}/faq/active?page=1&limit=10`
            : null,
        fetcher
    );

    const toggleIndex = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    // if (error) {
    //     return <div>Failed to load FAQs.</div>;
    // }

    const faqs = data?.faqs || [];

    return (
        <div className="">
            <div className=" mx-auto bg-white p-6 ">
                <div className=" min-w-0 max-w-full">
                    <TitleWithUnderline text="Frequently Asked Questions" underlineWidth={64} fontSize={2.4} />
                </div>
                <div className="space-y-4">
                    {faqs.map((faq: any, index: number) => {
                        let langKey = language;
                        if (langKey === "english") langKey = "en";
                        if (langKey === "tamil") langKey = "ta";
                        if (langKey === "sinhala") langKey = "si";
                        const questionArr = faq.question?.[langKey] || faq.question?.["en"] || [];
                        const answerArr = faq.answer?.[langKey] || faq.answer?.["en"] || [];
                        const question = questionArr[0]?.value || "";
                        const answer = answerArr[0]?.value || "";
                        return (
                            <div key={faq._id || index} className={`${openIndex===index?"shadow-md":""} border-b hover:shadow-lg`}>
                                <button
                                    className="w-full text-left py-4 flex justify-start items-center"
                                    onClick={() => toggleIndex(index)}
                                >
                                    {openIndex === index ? (
                                        <ChevronUp className="w-5 h-5 text-gray-600 ml-4" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-600 ml-4" />
                                    )}
                                    <span className="ml-8">{question}</span>
                                </button>
                                {openIndex === index && answer && (
                                    <div className="py-4 px-6  text-sm text-gray-900  border-t">
                                        <p className="break-words whitespace-normal w-1/2 ml-12">{answer}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
