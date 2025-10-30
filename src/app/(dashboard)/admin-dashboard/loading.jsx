"use client";
import React from "react";

const AdminDashboardLoading = () => {
    return (
        <div className="min-h-[calc(100vh-73px)] flex flex-col justify-center">
            <div className="p-6 animate-pulse ">
                {/* Header */}
                <div className="mb-6">
                    <div className="h-6 w-56 bg-gray-300 rounded-md mb-2"></div>
                    <div className="h-4 w-80 bg-gray-200 rounded-md"></div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl shadow h-48 p-4 flex flex-col gap-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                                <div>
                                    <div className="h-4 w-20 bg-gray-200 rounded-md mb-1"></div>
                                    <div className="h-5 w-16 bg-gray-300 rounded-md"></div>
                                </div>
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-md"></div>
                            <div className="h-2 w-full bg-gray-200 rounded-md"></div>
                            <div className="h-2 w-full bg-gray-200 rounded-md"></div>
                            <div className="h-2 w-full bg-gray-200 rounded-md"></div>
                        </div>
                    ))}
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Growth */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="h-5 w-40 bg-gray-300 rounded-md mb-6"></div>
                        <div className="flex items-end justify-between space-x-2">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-full bg-gray-200 rounded-md"
                                    style={{ height: `${Math.random() * 80 + 40}px` }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
                        <div className="h-5 w-32 bg-gray-300 rounded-md mb-3"></div>
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-gray-200 rounded-md"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-3/4 bg-gray-200 rounded-md"></div>
                                    <div className="h-3 w-1/2 bg-gray-100 rounded-md"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardLoading;