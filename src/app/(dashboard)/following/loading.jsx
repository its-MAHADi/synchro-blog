"use client";
import React from "react";

const FollowingLoading = () => {
    return (
        <div className="px-4 md:px-8 py-6 mt-6">
            {/* Page Title Skeleton */}
            <div className="w-32 h-6 bg-gray-300 rounded mb-6 animate-pulse"></div>

            {/* Skeleton Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center animate-pulse"
                    >
                        <div className="w-20 h-20 bg-gray-300 rounded-full mb-4"></div>
                        <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="w-40 h-3 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FollowingLoading;
