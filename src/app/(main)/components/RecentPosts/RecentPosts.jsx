"use client"; // Client component in Next.js 13+
import React from "react";

const recentPosts = [
    {
        id: 1,
        title: "10 Minimalist Lifestyle Tips",
        excerpt: "Learn practical ways to simplify your home, reduce stress, and focus on what matters most.",
        date: "2025-09-18",
        category: "Lifestyle",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Top 7 Travel Destinations for 2025",
        excerpt: "From hidden beaches to mountain escapes — discover the best places to add to your 2025 bucket list.",
        date: "2025-09-17",
        category: "Travel",
        readTime: "7 min read"
    },
    {
        id: 3,
        title: "How Smart Home Tech Is Changing Daily Life",
        excerpt: "Smart devices are making routines easier, safer, and more energy-efficient — here’s what to try first.",
        date: "2025-09-16",
        category: "Technology",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "Morning Workout Routines for Busy People",
        excerpt: "Quick, effective exercises you can do at home to boost energy and start the day strong.",
        date: "2025-09-15",
        category: "Health & Fitness",
        readTime: "8 min read"
    },
    {
        id: 5,
        title: "Smart Investments for Beginners",
        excerpt: "Practical, low-risk strategies to begin growing your savings and understanding the market.",
        date: "2025-09-14",
        category: "Business & Finance",
        readTime: "4 min read"
    },
    {
        id: 6,
        title: "Healthy Eating on a Budget",
        excerpt: "Nutritious, affordable meal ideas and shopping tips that keep both your wallet and body happy.",
        date: "2025-09-13",
        category: "Health & Fitness",
        readTime: "6 min read"
    },
    {
        id: 7,
        title: "Digital Declutter: Organize Your Life",
        excerpt: "Simple steps to reduce digital noise, manage apps and notifications, and reclaim focus.",
        date: "2025-09-12",
        category: "Lifestyle",
        readTime: "10 min read"
    },
    {
        id: 8,
        title: "Best Budget Travel Hacks",
        excerpt: "Insider tips to travel more for less — from timing flights to finding affordable stays.",
        date: "2025-09-11",
        category: "Travel",
        readTime: "5 min read"
    },
    {
        id: 9,
        title: "Top Portable Gadgets for 2025",
        excerpt: "Handy gadgets that make travel, work, and daily life easier — compact, powerful, and worth buying.",
        date: "2025-09-10",
        category: "Technology",
        readTime: "7 min read"
    },
    {
        id: 10,
        title: "Side Hustles That Actually Work",
        excerpt: "Realistic side-income ideas with steps to get started and scale over time.",
        date: "2025-09-09",
        category: "Business & Finance",
        readTime: "9 min read"
    },
];

const getCategoryColor = (category) => {
    const colors = {
        React: "bg-blue-100 text-blue-800",
        "Next.js": "bg-gray-100 text-gray-800",
        JavaScript: "bg-yellow-100 text-yellow-800",
        CSS: "bg-green-100 text-green-800",
        TypeScript: "bg-purple-100 text-purple-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
};

const RecentPosts = () => {
    return (
        <section className="max-w-screen-xl mx-auto px-4 py-16 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl">
            <div className=" mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold bg-[#c45627] bg-clip-text text-transparent mb-4">
                        Recent Posts
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Discover the latest insights and tutorials on web development, programming, and modern technologies.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#c45627] to-purple-500 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Featured Post (First Post) */}
                <div className="mb-12">
                    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#c45627] via-[#c45627dc] to-[#ec6d36]"></div>
                        <div className="p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(recentPosts[0].category)}`}>
                                    ✨ Featured
                                </span>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(recentPosts[0].category)}`}>
                                    {recentPosts[0].category}
                                </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 hover:text-[#c45627] transition-colors duration-300">
                                {recentPosts[0].title}
                            </h3>
                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                {recentPosts[0].excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        📅 {new Date(recentPosts[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        ⏱️ {recentPosts[0].readTime}
                                    </span>
                                </div>
                                <button className="group md:px-6 md:py-3 p-2 text-[14px] md:text-base bg-[#e76a34] hover:bg-[#c45627] text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                    Read Article
                                    <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Regular Posts Grid */}
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {recentPosts.slice(1).map((post, index) => (
                        <article
                            key={post.id}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                        >
                            {/* Card Header */}
                            <div className="p-6 pb-4">
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(post.category)}`}>
                                        {post.category}
                                    </span>
                                    <div className="w-8 h-8 bg-gradient-to-br from-[#c4562728] to-[#c456275b] rounded-full flex items-center justify-center">
                                        <div className="w-3 h-3 bg-gradient-to-br from-[#eb6b34] to-[#c45627] rounded-full"></div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#c45627] transition-colors duration-300 leading-tight">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>

                            {/* Card Footer */}
                            <div className="px-6 pb-6">
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        📅 {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        ⏱️ {post.readTime}
                                    </span>
                                </div>

                                <button className="group w-full py-3 px-4 bg-gray-50 hover:bg-[#c45627] text-[#c45627] hover:text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] border border-[#c45627] hover:border-transparent">
                                    <span className="flex items-center justify-center gap-2">
                                        Read More
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </span>
                                </button>
                            </div>

                            {/* Hover Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </article>
                    ))}
                </div>

                {/* Load More Section */}
                <div className="text-center mt-12">
                    <button className="group px-8 py-4 bg-white border-2 cursor-pointer border-gray-200 hover:border-[#c45627] text-gray-700 hover:text-[#c45627] font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                        <span className="flex items-center gap-2">
                            Load More Posts
                            <span className="transition-transform duration-300 group-hover:rotate-180">↻</span>
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default RecentPosts;
