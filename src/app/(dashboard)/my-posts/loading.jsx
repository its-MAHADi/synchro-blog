"use client"
import React from "react";

const MyPostsLoading = () => {
    return (
        <div className="px-4 md:px-10 mx-auto mt-10 space-y-6 animate-pulse">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white"
                >
                    {/* Profile section */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                        <div className="flex-1">
                            <div className="w-32 h-3 bg-gray-300 rounded mb-2"></div>
                            <div className="w-20 h-2 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                    {/* Image shimmer */}
                    <div className="w-full h-64 bg-gray-300 rounded-md mb-4"></div>

                    {/* Text lines */}
                    <div className="space-y-2">
                        <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
                        <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
                        <div className="w-2/3 h-3 bg-gray-300 rounded"></div>
                    </div>

                    {/* Buttons section */}
                    <div className="flex justify-between items-center mt-4">
                        <div className="w-16 h-4 bg-gray-300 rounded"></div>
                        <div className="w-16 h-4 bg-gray-300 rounded"></div>
                        <div className="w-16 h-4 bg-gray-300 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyPostsLoading;
