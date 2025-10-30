import React from "react";

const LoadingApplicationList = () => {
    return (
        <div className="p-4 md:p-6 animate-pulse">
            {/* Page Title */}
            <div className="h-6 md:h-8 w-40 md:w-48 bg-gray-300 rounded mb-6"></div>

            {/* Section Title */}
            <div className="h-5 md:h-6 w-48 md:w-60 bg-gray-300 rounded mb-3"></div>

            {/* First Table Skeleton */}
            <div className="border border-slate-200 rounded-lg overflow-hidden mb-8">
                {/* Table Header (hidden on mobile) */}
                <div className="hidden md:grid grid-cols-4 border-b border-slate-200 bg-gray-200">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-10"></div>
                    ))}
                </div>
                {/* Table Rows */}
                {[...Array(2)].map((_, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 p-4 border-b border-slate-200"
                    >
                        {[...Array(4)].map((_, j) => (
                            <div key={j} className="h-4 bg-gray-300 rounded w-full"></div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Second Section Title */}
            <div className="h-5 md:h-6 w-64 md:w-80 bg-gray-300 rounded mb-3"></div>

            {/* Second Table Skeleton */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
                {/* Table Header (hidden on mobile) */}
                <div className="hidden md:grid grid-cols-4 border-b border-slate-200 bg-gray-200">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-10"></div>
                    ))}
                </div>
                {/* Table Rows */}
                {[...Array(2)].map((_, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 p-4 border-b border-slate-200"
                    >
                        {[...Array(4)].map((_, j) => (
                            <div key={j} className="h-4 bg-gray-300 rounded w-full"></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingApplicationList;
