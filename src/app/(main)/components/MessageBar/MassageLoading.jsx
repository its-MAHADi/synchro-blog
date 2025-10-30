import React from 'react';

const MassageLoading = () => {
    return (
        // This container mimics the padding and spacing of your screenshot
        <div className="p-4 min-h-[calc(100vh-73px)] space-y-4 w-full">

            {/* Skeleton for Header ("Chats" Title + Menu Icon) */}
            <div className="flex justify-between items-center pt-2 px-2">
                <div className="h-7 bg-gray-300 rounded-md w-1/4 animate-pulse"></div>
                <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse"></div>
            </div>

            {/* Skeleton for Search Bar Input */}
            {/* Using a slightly lighter gray to mimic the input field */}
            <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>

            {/* Skeleton for Chat List */}
            <div className="space-y-3 pt-2">

                {/* --- Skeleton Chat Item Card --- */}
                {/* This outer div mimics the white card for the chat item */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-200">
                    {/* Avatar Placeholder */}
                    <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse shrink-0"></div>
                    {/* Text Lines Placeholder */}
                    <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                    </div>
                </div>

                {/* --- Skeleton Chat Item Card --- */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-200">
                    <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse shrink-0"></div>
                    <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                    </div>
                </div>

                {/* --- Skeleton Chat Item Card --- */}
                {/* Added a third one, as lists often have multiple items */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-200">
                    <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse shrink-0"></div>
                    <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                    </div>
                </div>
                {/* --- Skeleton Chat Item Card --- */}
                {/* Added a third one, as lists often have multiple items */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-200">
                    <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse shrink-0"></div>
                    <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                    </div>
                </div>
                {/* --- Skeleton Chat Item Card --- */}
                {/* Added a third one, as lists often have multiple items */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-200">
                    <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse shrink-0"></div>
                    <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MassageLoading;