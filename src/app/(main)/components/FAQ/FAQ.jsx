"use client";
import { BadgeQuestionMark } from 'lucide-react';
import { Plus, Minus } from "lucide-react";
import React, { useState } from 'react';
// #c45627 #213943 #f6f5ea
const FAQ = () => {
    const [open, setOpen] = useState(false);


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


    return (
        <div id="faq" className='mt-25 flex justify-center items-center flex-col'>
            <div className="inline-flex flex-row-reverse items-center gap-2 bg-[#c45627] px-4 py-2 rounded-full mb-4">
                <BadgeQuestionMark className="hidden lg:block w-8 h-8 text-[#f6f5ea]" />
                <span className="text-2xl font-medium text-[#f6f5ea]">Got questions? We’re here to help</span>
            </div>
            <h1 className="text-4xl md:text-5xl text-center font-bold bg-gradient-to-tr from-[#853716] via-[#ec9975] to-[#853716] bg-clip-text text-transparent 6mb-10">Frequently Asked Questions</h1>
            
        </div>
    );
};

export default FAQ;