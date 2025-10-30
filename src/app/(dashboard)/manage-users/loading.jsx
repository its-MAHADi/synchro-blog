"use client";
import React from "react";

const AdminUsersLoading = () => {
    return (
        <div className="px-4 md:px-8 py-6 mt-6">
            <div className="flex justify-between items-center">
                {/* Page Title Skeleton */}
                <div className="w-36 h-7 bg-gray-200 rounded mb-6 animate-pulse"></div>

                {/* Search Bar Skeleton */}
                <div className="w-full md:w-72 h-10 bg-gray-200 rounded mb-8 animate-pulse"></div>
            </div>

            {/* Skeleton Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center animate-pulse border-slate-200  border"
                    >
                        {/* Avatar */}
                        <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>

                        {/* Name */}
                        <div className="w-32 h-4 bg-gray-200 rounded mb-2"></div>

                        {/* Email */}
                        <div className="w-40 h-3 bg-gray-100 rounded mb-3"></div>

                        {/* Badges */}
                        <div className="flex gap-2 mb-4">
                            <div className="w-10 h-4 bg-gray-200 rounded-full"></div>
                            <div className="w-20 h-4 bg-gray-200 rounded-full"></div>
                        </div>

                        {/* Followers Section */}
                        <div className="flex justify-between w-full text-xs text-gray-400 mb-4">
                            <div className="w-16 h-3 bg-gray-200 rounded"></div>
                            <div className="w-16 h-3 bg-gray-200 rounded"></div>
                        </div>

                        {/* Joined Date */}
                        <div className="w-28 h-3 bg-gray-100 rounded mb-4"></div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <div className="w-20 h-8 bg-gray-200 rounded"></div>
                            <div className="w-20 h-8 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminUsersLoading;
