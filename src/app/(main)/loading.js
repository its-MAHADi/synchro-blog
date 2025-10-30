"use client";
import React from "react";

const LoadingForHome = () => {
  return (
    <div className="animate-pulse max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-12">
      {/* Hero Section */}
      <div className="bg-gray-100 rounded-xl p-4 sm:p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 items-center shadow-sm">
        {/* Left Text Skeleton */}
        <div className="flex-1 w-full space-y-3 sm:space-y-4">
          <div className="h-6 sm:h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>

          {/* Features */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-3">
            <div className="h-3 sm:h-4 bg-gray-300 rounded w-20 sm:w-24"></div>
            <div className="h-3 sm:h-4 bg-gray-300 rounded w-24 sm:w-32"></div>
            <div className="h-3 sm:h-4 bg-gray-300 rounded w-20 sm:w-28"></div>
          </div>
        </div>

        {/* Right Image Skeleton */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-300 h-40 sm:h-56 md:h-64 rounded-lg w-full"></div>
        </div>
      </div>

      {/* Section Title */}
      <div className="text-center mt-10 sm:mt-12 space-y-2 sm:space-y-3">
        <div className="h-6 sm:h-7 bg-gray-300 rounded w-40 sm:w-48 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-64 sm:w-80 mx-auto"></div>
      </div>

      {/* Blog Grid */}
      <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-xl p-4 space-y-4 shadow-sm"
          >
            <div className="h-32 sm:h-40 bg-gray-300 rounded"></div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8 sm:mt-10 mb-10">
        <div className="h-10 bg-gray-300 rounded w-36 sm:w-40"></div>
      </div>
    </div>
  );
};

export default LoadingForHome;
