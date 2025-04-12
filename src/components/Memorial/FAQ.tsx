"use client";
import { SetStateAction, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TitleWithUnderline } from "../ui/title-with-underline";

const faqs = [
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    {
        question: "Lorem ipsum dolor sit amet consectetur. Vestibulum ut ?",
        answer:
            "Lorem ipsum dolor sit amet consectetur. Vestibulum ut sodales estut. Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    },
    
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(3);

    const toggleIndex = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="">
            <div className=" mx-auto bg-white p-6 ">
                <div className=" min-w-0 max-w-full">
                    <TitleWithUnderline text="Frequently Asked Questions" underlineWidth={64} fontSize={2.4} />
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`${openIndex===index?"shadow-md":""} border-b hover:shadow-lg`}>
                            <button
                                className="w-full text-left py-4 flex justify-start items-center"
                                onClick={() => toggleIndex(index)}
                            >
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-gray-600 ml-4" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-600 ml-4" />
                                )}
                                <span className="ml-8">{faq.question}</span>
                            </button>
                            {openIndex === index && faq.answer && (
                                <div className="py-4 px-6  text-sm text-gray-900  border-t">
                                    {/* {faq.answer.split(". ").map((line, i) => (
                                        <p key={i} className="mb-2">{line.trim()}.</p>
                                    ))} */}
                                    <p className="break-words whitespace-normal w-1/2 ml-12">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
