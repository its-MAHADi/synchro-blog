"use client";
import React from "react";

const ViewProfileLoading = () => {
    return (
        <div className="animate-pulse px-4 mt-5 md:px-10 py-6">
            {/* Cover Photo */}
            <div className="w-full h-40 md:h-56 bg-gray-300 rounded-lg"></div>

            {/* Profile Section */}
            <div className="relative flex flex-col items-center mt-[-3rem] md:mt-[-4rem]">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-300 rounded-full border-4 border-white"></div>
                <div className="mt-4 w-40 h-4 bg-gray-300 rounded"></div>
            </div>

            {/* Stats Section */}
            <div className="flex justify-center gap-6 mt-6">
                <div className="w-24 h-10 bg-gray-300 rounded-lg"></div>
                <div className="w-24 h-10 bg-gray-300 rounded-lg"></div>
            </div>

            {/* Post Input */}
            <div className="mt-8 w-full max-w-2xl mx-auto h-12 bg-gray-200 rounded-full"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {/* Left About Section */}
                <div className="bg-gray-100 rounded-2xl p-5 space-y-3">
                    <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                    <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
                    <div className="w-full h-3 bg-gray-300 rounded"></div>
                    <div className="w-2/3 h-3 bg-gray-300 rounded"></div>
                    <div className="w-1/3 h-3 bg-gray-300 rounded"></div>
                    <div className="w-full h-10 bg-gray-300 rounded-lg mt-3"></div>
                </div>

                {/* Right Posts Section */}
                <div className="md:col-span-2 space-y-6">
                    {[1, 2].map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-100 rounded-2xl p-5 space-y-4 shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                                <div>
                                    <div className="w-24 h-3 bg-gray-300 rounded"></div>
                                    <div className="w-16 h-2 bg-gray-200 rounded mt-2"></div>
                                </div>
                            </div>
                            <div className="w-full h-3 bg-gray-300 rounded"></div>
                            <div className="w-5/6 h-3 bg-gray-300 rounded"></div>
                            <div className="w-4/6 h-3 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewProfileLoading;
