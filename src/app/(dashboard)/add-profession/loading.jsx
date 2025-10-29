"use client";
import React from "react";

const LoadingForAddProfession = () => {
    return (
        <div className="w-full mx-auto px-3 sm:px-6 md:px-10 py-8 md:py-12 animate-pulse">
            {/* Page Title */}
            <div className="flex flex-col items-center justify-center text-center mb-10 space-y-3">
                <div className="h-6 sm:h-8 bg-gray-200 rounded w-40 sm:w-72"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-64 sm:w-96"></div>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {Array.from({ length: 12 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="border border-slate-200 rounded-xl p-4 sm:p-6 bg-white shadow-sm flex flex-col justify-between"
                    >
                        {/* Top Icon */}
                        <div className="h-10 w-10 bg-gray-200 rounded mb-3"></div>

                        {/* Title */}
                        <div className="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>

                        {/* Description */}
                        <div className="space-y-2 mb-4">
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>

                        {/* Button */}
                        <div className="mt-auto h-8 sm:h-9 bg-gray-200 rounded w-20 sm:w-24"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingForAddProfession;

