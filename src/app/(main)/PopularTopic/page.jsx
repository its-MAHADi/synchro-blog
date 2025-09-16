"use client";

import React, { useState } from "react";
import { Flame, TrendingUp, Users, Eye, Sparkles } from "lucide-react";

export default function PopularTopic() {
    const [hoveredTopic, setHoveredTopic] = useState(null);

    // Enhanced dummy data with more visual elements
    const topics = [
        {
            id: 1,
            title: "AI in Blogging",
            uses: 120,
            trend: "+12%",
            category: "Technology",
            gradient: "from-purple-600 via-purple-500 to-pink-500",
            bgGradient: "from-purple-50 to-pink-50"
        },
        {
            id: 2,
            title: "Next.js Best Practices",
            uses: 95,
            trend: "+8%",
            category: "Development",
            gradient: "from-blue-600 via-blue-500 to-cyan-500",
            bgGradient: "from-blue-50 to-cyan-50"
        },
        {
            id: 3,
            title: "MERN Stack Development",
            uses: 88,
            trend: "+15%",
            category: "Full Stack",
            gradient: "from-green-600 via-emerald-500 to-teal-500",
            bgGradient: "from-green-50 to-teal-50"
        },
        {
            id: 4,
            title: "Tailwind CSS Tricks",
            uses: 72,
            trend: "+6%",
            category: "Design",
            gradient: "from-orange-600 via-red-500 to-pink-500",
            bgGradient: "from-orange-50 to-pink-50"
        },
        {
            id: 5,
            title: "How to Rank on Google",
            uses: 65,
            trend: "+10%",
            category: "SEO",
            gradient: "from-indigo-600 via-purple-500 to-pink-500",
            bgGradient: "from-indigo-50 to-purple-50"
        },
        // Duplicate topics for continuous scroll
        {
            id: 6,
            title: "React Performance Tips",
            uses: 85,
            trend: "+9%",
            category: "React",
            gradient: "from-cyan-600 via-blue-500 to-indigo-500",
            bgGradient: "from-cyan-50 to-blue-50"
        },
        {
            id: 7,
            title: "Database Optimization",
            uses: 78,
            trend: "+7%",
            category: "Backend",
            gradient: "from-emerald-600 via-green-500 to-teal-500",
            bgGradient: "from-emerald-50 to-green-50"
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 border rounded-lg relative">
            {/* Animated background elements - responsive sizes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-5 sm:top-10 left-2 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-2xl sm:blur-3xl opacity-20 sm:opacity-30 animate-pulse"></div>
                <div className="absolute bottom-5 sm:bottom-10 right-2 sm:right-10 w-24 sm:w-40 h-24 sm:h-40 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-2xl sm:blur-3xl opacity-20 sm:opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 relative z-10">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl sm:rounded-2xl shadow-lg">
                        <Flame className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <Sparkles className="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2 px-4">
                    Trending Topics
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                    Discover what's hot in the community right now
                </p>
            </div>

            {/* Custom Marquee Animation */}
            <div className="relative z-10 overflow-hidden">
                <div className="flex animate-marquee hover:pause-animation gap-6">
                    {/* First set of topics */}
                    {topics.map((topic, index) => (
                        <div
                            key={`first-${topic.id}`}
                            className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border-0 bg-gradient-to-br ${topic.bgGradient} hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 flex-shrink-0 w-80 sm:w-96`}
                            onMouseEnter={() => setHoveredTopic(topic.id)}
                            onMouseLeave={() => setHoveredTopic(null)}
                        >
                            {/* Rank Badge */}
                            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${topic.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
                                    <span className="text-white font-black text-sm sm:text-lg">#{(index % 5) + 1}</span>
                                </div>
                            </div>

                            {/* Category Tag */}
                            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
                                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full text-xs font-semibold border border-white/20">
                                    {topic.category}
                                </span>
                            </div>

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                            {/* Content */}
                            <div className="relative z-10 p-4 sm:p-6 pt-16 sm:pt-20">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-gray-900 transition-colors leading-tight">
                                    {topic.title}
                                </h2>

                                <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                                    Explore cutting-edge insights and stay ahead with the latest trends in {topic.title.toLowerCase()}.
                                </p>

                                {/* Stats Row */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 sm:gap-4">
                                        <div className="flex items-center gap-1 text-gray-700">
                                            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                                            <span className="font-semibold text-sm sm:text-base">{topic.uses}</span>
                                            <span className="text-xs text-gray-500 hidden sm:inline">uses</span>
                                        </div>

                                        <div className="flex items-center gap-1 text-green-600">
                                            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                                            <span className="font-semibold text-xs sm:text-sm">{topic.trend}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 text-gray-500 group-hover:text-gray-700 transition-colors">
                                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span className="text-xs hidden sm:inline">View Details</span>
                                    </div>
                                </div>
                            </div>

                            {/* Animated border on hover */}
                            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                            {/* Bottom glow effect */}
                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${topic.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                        </div>
                    ))}
                    
                    {/* Second set for seamless loop */}
                    {topics.map((topic, index) => (
                        <div
                            key={`second-${topic.id}`}
                            className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border-0 bg-gradient-to-br ${topic.bgGradient} hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 flex-shrink-0 w-80 sm:w-96`}
                            onMouseEnter={() => setHoveredTopic(topic.id + 100)}
                            onMouseLeave={() => setHoveredTopic(null)}
                        >
                            {/* Rank Badge */}
                            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${topic.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
                                    <span className="text-white font-black text-sm sm:text-lg">#{(index % 5) + 1}</span>
                                </div>
                            </div>

                            {/* Category Tag */}
                            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
                                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full text-xs font-semibold border border-white/20">
                                    {topic.category}
                                </span>
                            </div>

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                            {/* Content */}
                            <div className="relative z-10 p-4 sm:p-6 pt-16 sm:pt-20">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-gray-900 transition-colors leading-tight">
                                    {topic.title}
                                </h2>

                                <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                                    Explore cutting-edge insights and stay ahead with the latest trends in {topic.title.toLowerCase()}.
                                </p>

                                {/* Stats Row */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 sm:gap-4">
                                        <div className="flex items-center gap-1 text-gray-700">
                                            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                                            <span className="font-semibold text-sm sm:text-base">{topic.uses}</span>
                                            <span className="text-xs text-gray-500 hidden sm:inline">uses</span>
                                        </div>

                                        <div className="flex items-center gap-1 text-green-600">
                                            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                                            <span className="font-semibold text-xs sm:text-sm">{topic.trend}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 text-gray-500 group-hover:text-gray-700 transition-colors">
                                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span className="text-xs hidden sm:inline">View Details</span>
                                    </div>
                                </div>
                            </div>

                            {/* Animated border on hover */}
                            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                            {/* Bottom glow effect */}
                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${topic.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom decorative element */}
            <div className="flex justify-center mt-8 sm:mt-12">
                <div className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full shadow-sm border border-gray-200">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">More trending topics coming soon</span>
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .pause-animation:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}