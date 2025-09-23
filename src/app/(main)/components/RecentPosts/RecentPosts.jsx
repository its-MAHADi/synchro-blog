"use client"; // Client component in Next.js 13+
import React from "react";

const recentPosts = [
    {
        id: 1,
        title: "Understanding React Hooks",
        excerpt: "React Hooks let you use state and other features without writing a class...",
        date: "2025-09-18",
        category: "React",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Next.js 15 Features",
        excerpt: "Next.js 15 comes with many new features including improved Turbopack...",
        date: "2025-09-17",
        category: "Next.js",
        readTime: "7 min read"
    },
    {
        id: 3,
        title: "JavaScript ES2025 Updates",
        excerpt: "ES2025 introduces some exciting syntax features and better performance...",
        date: "2025-09-16",
        category: "JavaScript",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "CSS Grid vs Flexbox",
        excerpt: "A complete comparison between CSS Grid and Flexbox for modern layouts...",
        date: "2025-09-15",
        category: "CSS",
        readTime: "8 min read"
    },
    {
        id: 5,
        title: "TypeScript Tips for Beginners",
        excerpt: "Learn essential TypeScript tips that will make your code safer and cleaner...",
        date: "2025-09-14",
        category: "TypeScript",
        readTime: "4 min read"
    },
    {
        id: 6,
        title: "Tailwind CSS Utility Classes",
        excerpt: "Tailwind CSS is a utility-first framework to rapidly build custom designs...",
        date: "2025-09-13",
        category: "CSS",
        readTime: "6 min read"
    },
    {
        id: 7,
        title: "React Performance Optimization",
        excerpt: "Techniques and best practices to optimize React applications...",
        date: "2025-09-12",
        category: "React",
        readTime: "10 min read"
    },
    {
        id: 8,
        title: "Deploying Next.js App",
        excerpt: "Learn how to deploy your Next.js application on Vercel or other platforms...",
        date: "2025-09-11",
        category: "Next.js",
        readTime: "5 min read"
    },
    {
        id: 9,
        title: "Understanding useEffect",
        excerpt: "A deep dive into the useEffect hook and its common pitfalls...",
        date: "2025-09-10",
        category: "React",
        readTime: "7 min read"
    },
    {
        id: 10,
        title: "Building Reusable Components",
        excerpt: "Best practices for creating reusable and maintainable React components...",
        date: "2025-09-09",
        category: "React",
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
        <section className="py-16 px-4 min-h-screen rounded-xl">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl text-center font-bold bg-gradient-to-br from-[#853716] via-[#ed703b] to-[#853716] bg-clip-text text-transparent mb-10">
                        Recent Posts
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Discover the latest insights and tutorials on web development, programming, and modern technologies.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#c45627] to-amber-500 mx-auto mt-6 rounded-full"></div>
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
                            <div className="flex flex-col lg:flex-row items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-500 whitespace-nowrap">
                                    <span className="flex items-center gap-1">
                                        📅 {new Date(recentPosts[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        ⏱️ {recentPosts[0].readTime}
                                    </span>
                                </div>
                                <button className="cursor-pointer mt-5 lg:mt-0 group px-6 py-3 bg-[#e76a34] hover:bg-[#c45627] text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
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

                                <button className="cursor-pointer group w-full py-3 px-4 bg-gray-50 hover:bg-[#c45627] text-[#c45627] hover:text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] border border-[#c45627] hover:border-transparent">
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
                    <button className="cursor-pointer group px-8 py-4 bg-white border-2 border-gray-200 hover:border-[#853716] text-gray-700 hover:text-[#853716] font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
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