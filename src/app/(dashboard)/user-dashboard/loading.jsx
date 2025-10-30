"use client";
import React from "react";

const UserDashboardLoading = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 px-4 md:px-10 py-6 animate-pulse">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-xl shadow p-5 mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                    <div className="space-y-2">
                        <div className="h-5 w-40 bg-gray-300 rounded"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                </div>

                <div className="mt-4 md:mt-0 h-10 w-44 bg-gray-300 rounded-lg"></div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-5 mb-6">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl shadow p-5 flex h-[120px] justify-between items-center"
                    >
                        <div className="space-y-2">
                            <div className="h-3 w-20 bg-gray-200 rounded"></div>
                            <div className="h-6 w-10 bg-gray-300 rounded"></div>
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    </div>
                ))}
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-xl shadow p-6">
                <div className="h-5 w-40 bg-gray-300 rounded mb-4"></div>
                <div className="grid md:grid-cols-2 gap-y-3 text-sm">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-2 items-center">
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            <div className="h-4 w-32 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDashboardLoading;
