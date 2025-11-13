"use client";
import { BadgeQuestionMark } from 'lucide-react';
import { Plus, Minus } from 'lucide-react';
import React, { useState } from 'react';
// #0000FF #213943 #f6f5ea  
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null); // Keep track of the open/close state of each FAQ

    const faqs = [
        {
            question: "What is this AI-powered blogging platform?",
            answer:
            "It’s a smart blogging toolkit that helps you generate high-quality blog posts, optimize for SEO, design layouts, and manage your content effortlessly—all powered by AI.",
        },
        {
            question: "Can the AI write entire blog posts for me?",
            answer:
            "Yes! You can input a topic, keywords, or outline, and the AI will draft a complete, well-structured article. You can also edit and refine it to match your voice.",
        },
        {
            question: "Does it help with SEO optimization?",
            answer:
            "Absolutely. The platform suggests keywords, improves readability, and ensures your blog posts are optimized for search engines to boost visibility and ranking.",
        },
        {
            question: "Can I customize the style and tone of the content?",
            answer:
            "Yes. You can choose different tones (professional, casual, persuasive, etc.) and adjust the length, depth, and format of your articles to match your brand’s voice.",
        },
        {
            question: "Is the platform mobile-friendly?",
            answer:
            "Definitely. You can draft, edit, and publish posts from any device—whether desktop, tablet, or mobile—without losing functionality.",
        },
        {
            question: "Do I need to pay to use this platform?",
            answer:
            "You can start for free with basic features. Advanced tools like premium templates, AI SEO audits, and extended content generation may require a paid plan.",
        },
    ];

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle open/close for each FAQ
    };

    return (
        <div id="faq" className='mt-25 flex justify-center items-center flex-col'>
            <div className="inline-flex flex-row-reverse items-center gap-2 bg-[#0000FF] px-4 py-2 rounded-full mb-4">
                <BadgeQuestionMark className="lg:w-8 lg:h-8 text-[#f6f5ea]" />
                <span className="text-sm lg:text-2xl font-medium text-[#f6f5ea]">Got questions? We’re here to help</span>
            </div>
            <h1 className="text-4xl md:text-5xl text-center font-bold bg-gradient-to-br from-[#853716] via-[#ed703b] to-[#853716] bg-clip-text text-transparent mb-10">Frequently Asked Questions</h1>
            <div className='space-y-4  w-full'>
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-[#ec9975] bg-white shadow-md rounded-xl">
                        <div
                            className="flex justify-between items-center p-4 cursor-pointer"
                            onClick={() => handleToggle(index)}>
                            <span className="text-xl font-semibold text-[#853716]">{faq.question}</span>
                            {openIndex === index ? (
                                <Minus className="text-[#853716]" />
                            ) : (
                                <Plus className=" text-[#853716]" />
                            )}
                        </div>
                        {openIndex === index && (
                            <div className="p-4 text-gray-800 font-semibold text-lg">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
