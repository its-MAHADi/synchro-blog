"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaPenFancy, FaSearch, FaGlobe, FaCheckCircle } from "react-icons/fa";

//features data
const features = [
    {
        id: 1,
        title: "AI-Powered Writing",
        desc: "Generate blog ideas, drafts, and refined content instantly with Synchro’s intelligent AI writing assistant.",
        icon: <FaPenFancy className="text-2xl text-indigo-400" />,
    },
    {
        id: 2,
        title: "Smart SEO Optimization",
        desc: "Boost your visibility with AI-driven keyword suggestions, meta descriptions, and readability insights.",
        icon: <FaSearch className="text-2xl text-green-400" />,
    },
    {
        id: 3,
        title: "Multilingual Blogging",
        desc: "Reach a global audience by creating and publishing blogs in multiple languages with AI translation support.",
        icon: <FaGlobe className="text-2xl text-sky-400" />,
    },
    {
        id: 4,
        title: "Plagiarism-Free Content",
        desc: "Ensure originality with AI-powered plagiarism checks, keeping your blogs authentic and trustworthy.",
        icon: <FaCheckCircle className="text-2xl text-blue-500" />,
    },
];

// Motion variants for staggered entrance
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 20 } },
};

// Feature Card component
const FeatureCard = ({ feature }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{
                scale: 1.05,
                transition: { type: "tween", duration: 0.15 }
            }}

            className="bg-[#f7f5eb] rounded-xl shadow p-5 cursor-pointer transition-transform"
        >
            {/* Circle with Icon */}
            <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 250, damping: 15 }}
                className="w-14 h-14 bg-[#f3e7e3] shadow-xs rounded-full flex items-center justify-center mb-4"
            >
                {feature.icon}
            </motion.div>

            <h3 className="text-lg font-semibold text-[#693d2a] mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{feature.desc}</p>
            {/* <a className="text-[#0000FF] cursor-pointer font-medium hover:border-b pb-1 transition-all duration-300 ease-in-out">
                Learn More →
            </a> */}
        </motion.div>
    );
};

const SynchroFeatures = () => {
    return (
        <section id="features" className="max-w-screen-xl mx-auto px-4 py-11">
            <h2 className="text-4xl md:text-5xl text-center font-bold bg-gradient-to-br from-[#853716] via-[#ed703b] to-[#853716] bg-clip-text text-transparent mb-10">
                Features of Synchro
            </h2>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {features.map((feature) => (
                    <FeatureCard key={feature.id} feature={feature} />
                ))}
            </motion.div>
        </section>
    );
};

export default SynchroFeatures;
