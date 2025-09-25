"use client"; // Client component in Next.js 13+
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

// Sample Posts Data
const recentPosts = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        title: "Photography, the best hobby to have",
        description:
            "Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum.",
        author_name: "Paris Washington",
        author_image: "https://randomuser.me/api/portraits/women/44.jpg",
        publish_date: "June 28, 2018",
        read_time: "2 min read",
        category: "Lifestyle",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        title: "Why coding is the language of the future",
        description:
            "Learn how programming is shaping the digital world and why it is considered one of the most valuable skills.",
        author_name: "Michael Brown",
        author_image: "https://randomuser.me/api/portraits/men/32.jpg",
        publish_date: "January 12, 2021",
        read_time: "5 min read",
        category: "Technology",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        title: "The ultimate guide to remote work productivity",
        description:
            "Discover practical tips and tools that will help you stay productive and focused while working remotely.",
        author_name: "Sophia Lee",
        author_image: "https://randomuser.me/api/portraits/women/68.jpg",
        publish_date: "August 5, 2022",
        read_time: "4 min read",
        category: "Productivity",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        title: "Mastering teamwork in the digital era",
        description:
            "Collaboration has changed drastically. Learn modern teamwork strategies for hybrid and remote teams.",
        author_name: "Daniel Carter",
        author_image: "https://randomuser.me/api/portraits/men/15.jpg",
        publish_date: "March 3, 2020",
        read_time: "3 min read",
        category: "Business",
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixid=Mnwx",
        title: "Healthy lifestyle tips for busy people",
        description:
            "Balancing work, family, and health can be hard. Here are proven habits for maintaining a healthy lifestyle.",
        author_name: "Emily Johnson",
        author_image: "https://randomuser.me/api/portraits/women/22.jpg",
        publish_date: "October 9, 2019",
        read_time: "6 min read",
        category: "Lifestyle",
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixid=Mnwx",
        title: "Healthy lifestyle tips for busy people",
        description:
            "Balancing work, family, and health can be hard. Here are proven habits for maintaining a healthy lifestyle.",
        author_name: "Emily Johnson",
        author_image: "https://randomuser.me/api/portraits/women/22.jpg",
        publish_date: "October 9, 2019",
        read_time: "6 min read",
        category: "Lifestyle",
    },
    {
        id: 11,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=Mnwx",
        title: "Cooking hacks for quick and tasty meals",
        description: "Learn simple cooking techniques that save time in the kitchen without sacrificing flavor.",
        author_name: "Sophia Walker",
        author_image: "https://randomuser.me/api/portraits/women/11.jpg",
        publish_date: "February 7, 2022",
        read_time: "6 min read"
    },
];

// Category badge color helper
const getCategoryColor = (category) => {
    const colors = {
        React: "bg-blue-100 text-blue-800",
        "Next.js": "bg-gray-100 text-gray-800",
        JavaScript: "bg-yellow-100 text-yellow-800",
        CSS: "bg-green-100 text-green-800",
        TypeScript: "bg-purple-100 text-purple-800",
        Lifestyle: "bg-pink-100 text-pink-800",
        Technology: "bg-indigo-100 text-indigo-800",
        Productivity: "bg-green-100 text-green-800",
        Business: "bg-orange-100 text-orange-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
};

// Framer Motion Variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

const RecentPosts = () => {
    return (
        <section className="py-16 px-4 min-h-screen rounded-xl">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-[#853716] via-[#ed703b] to-[#853716] bg-clip-text text-transparent mb-10">
                        Recent Posts
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Discover the latest insights and tutorials on web development,
                        programming, and modern technologies.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#c45627] to-amber-500 mx-auto mt-6 rounded-full"></div>
                </motion.div>

                {/* Featured Post */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="relative rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-[url('https://i.ibb.co.com/PZhDNhwj/natuer-image.png')] bg-cover bg-center">
                        {/* Glass overlay */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-lg"></div>
                        {/* Optional dark overlay for text contrast */}
                        <div className="absolute inset-0  bg-black/10"></div>

                        <div className="relative p-8 md:p-10">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#c45627] via-[#c45627dc] to-[#ec6d36]"></div>

                            <div className="flex items-center gap-3 mb-4">
                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                                        recentPosts[0].category
                                    )}`}
                                >
                                    ✨ Featured
                                </span>
                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                                        recentPosts[0].category
                                    )}`}
                                >
                                    {recentPosts[0].category}
                                </span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 hover:text-[#c45627] transition-colors duration-300">
                                {recentPosts[0].title}
                            </h3>
                            <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                                {recentPosts[0].description}
                            </p>

                            <div className="flex flex-col lg:flex-row items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-300 whitespace-nowrap">
                                    <span className="flex items-center gap-1">
                                        📅 {recentPosts[0].publish_date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        ⏱️ {recentPosts[0].read_time}
                                    </span>
                                </div>
                                <button className="cursor-pointer mt-5 lg:mt-0 group px-6 py-3 bg-[#e76a34] hover:bg-[#c45627] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                    Read Article
                                    <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Regular Posts Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                >
                    {recentPosts.slice(1).map((post) => {
                        const text = post.description;
                        const truncated = text.length > 140 ? text.slice(0, 140) + " ..." : text;

                        const titleText = post.title;
                        const titleTruncated =
                            titleText.length > 60 ? titleText.slice(0, 60) + " ..." : titleText;

                        return (
                            <motion.div
                                key={post.id}
                                variants={cardVariants}
                                className="max-w-sm mx-auto bg-[#f6f5ea] rounded-lg overflow-hidden shadow flex flex-col h-full cursor-pointer transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
                            >
                                {/* Image */}
                                <div className="relative">
                                    <img
                                        className="w-full h-60 object-cover"
                                        src={post.image}
                                        alt="Blog Cover"
                                    />
                                    <div className="absolute bottom-0 w-full text-white p-4 flex items-center justify-between bg-black/40 backdrop-blur-md">
                                        <div className="flex items-center space-x-2">
                                            <img
                                                className="w-8 md:w-10 h-8 md:h-10 rounded-full"
                                                src={post.author_image}
                                                alt="Author"
                                            />
                                            <div>
                                                <p className="text-sm md:text-base font-semibold">
                                                    {post.author_name}
                                                </p>
                                                <p className="text-xs text-gray-200">
                                                    {post.publish_date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">{titleTruncated}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{truncated}</p>
                                    </div>

                                    <div>
                                        <Link
                                            href={`/all-posts/${post.id}`}
                                            className="flex items-center gap-1 font-medium text-[#c45627] text-lg hover:underline"
                                        >
                                            View Post <ArrowUpRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Load More Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mt-12"
                >
                    <button className="group px-8 py-4 bg-[#c45627] text-white border-2 border-[#c45627] hover:bg-white hover:border-[#853716] hover:text-[#853716] font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer">
                        <span className="flex items-center gap-2">
                            Load More Posts
                            <span className="transition-transform duration-300 group-hover:rotate-180">
                                ↻
                            </span>
                        </span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default RecentPosts;