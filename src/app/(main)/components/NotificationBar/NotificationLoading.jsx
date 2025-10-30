import React from 'react';

const NotificationLoading = () => {
    return (
        <div className="space-y-4 w-full">

           

            {/* Skeleton for Notification List */}
            <div className="space-y-3">

                {/* --- Skeleton Notification Item Card --- */}
                {/* Using bg-gray-100 to mimic the light purple card background */}
                <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-xl">
                    {/* Avatar Placeholder */}
                    <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse shrink-0"></div>
                    {/* Text Lines Placeholder */}
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/4 animate-pulse"></div>
                    </div>
                    {/* Icon Placeholder (person, comment, heart) */}
                    <div className="h-8 w-8 bg-gray-300 rounded-lg animate-pulse shrink-0"></div>
                </div>

                {/* --- Skeleton Notification Item Card --- */}
                <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-xl">
                    <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse shrink-0"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/4 animate-pulse"></div>
                    </div>
                    <div className="h-8 w-8 bg-gray-300 rounded-lg animate-pulse shrink-0"></div>
                </div>

                {/* --- Skeleton Notification Item Card --- */}
                <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-xl">
                    <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse shrink-0"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/4 animate-pulse"></div>
                    </div>
                    <div className="h-8 w-8 bg-gray-300 rounded-lg animate-pulse shrink-0"></div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-xl">
                    <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse shrink-0"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/4 animate-pulse"></div>
                    </div>
                    <div className="h-8 w-8 bg-gray-300 rounded-lg animate-pulse shrink-0"></div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-xl">
                    <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse shrink-0"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/4 animate-pulse"></div>
                    </div>
                    <div className="h-8 w-8 bg-gray-300 rounded-lg animate-pulse shrink-0"></div>
                </div>

            </div>
        </div>
    );
};

export default NotificationLoading;