"use client";
import React from "react";

const ManagePostLoading = () => {
    return (
        <div className="p-4 animate-pulse">
            {/* Search bar */}
            <div className="h-10 bg-gray-200 rounded-md w-full max-w-3xl mx-auto mb-8"></div>

            {/* Grid of post cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white p-4 rounded-xl shadow flex flex-col space-y-3"
                    >
                        {/* Top user info */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div className="flex-1">
                                <div className="h-4 w-24 bg-gray-200 rounded-md mb-2"></div>
                                <div className="h-3 w-16 bg-gray-100 rounded-md"></div>
                            </div>
                        </div>

                        {/* Image placeholder */}
                        <div className="w-full h-40 bg-gray-200 rounded-md"></div>

                        {/* Title */}
                        <div className="h-5 w-3/4 bg-gray-200 rounded-md"></div>

                        {/* Content lines */}
                        <div className="space-y-2">
                            <div className="h-3 w-full bg-gray-100 rounded-md"></div>
                            <div className="h-3 w-5/6 bg-gray-100 rounded-md"></div>
                            <div className="h-3 w-4/6 bg-gray-100 rounded-md"></div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between mt-3">
                            <div className="h-8 w-20 bg-gray-200 rounded-md"></div>
                            <div className="h-8 w-20 bg-gray-200 rounded-md"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManagePostLoading;