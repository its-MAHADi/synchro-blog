"use client";

import React, { useEffect, useState } from "react";
import { User2, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import FollowersLoading from "./loading";

export default function FollowersPage() {
    const { data: session } = useSession();
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch followers from your backend
    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                if (!session?.user?.email) return;

                const res = await fetch(`/api/followers?email=${session.user.email}`);
                const data = await res.json();

                if (res.ok) {
                    setFollowers(data.followers || []);
                } else {
                    console.error("Failed to fetch followers:", data);
                }
            } catch (error) {
                console.error("Error fetching followers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowers();
    }, [session?.user?.email]);

    if (loading) {
        return (
            <>
               <FollowersLoading/> 
            </>
        );
    }

    if (!followers.length) {
        return (
            <div className="text-center mt-10 text-gray-600">
                You don’t have any followers yet 😢
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-blue-600 border-b-2 border-blue-200 pb-2">
                Your Followers
            </h1>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {followers.map((follower) => (
                    <Link
                        key={follower._id || follower.email}
                        href={`/view-profile/${follower.email}`}
                        className="group"
                    >
                        <div className="relative p-5 bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                            <div className="flex flex-col items-center">
                                {follower.image ? (
                                    <img
                                        src={follower.image}
                                        alt={follower.userName}
                                        className="rounded-full w-24 h-24 object-cover border-4 border-blue-100 group-hover:border-blue-400 transition-all duration-300"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-gray-200 rounded-full flex justify-center items-center border-4 border-gray-300 group-hover:border-blue-400 transition-all duration-300">
                                        <User2 className="text-gray-400 w-10 h-10" />
                                    </div>
                                )}
                                <h2 className="mt-4 font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                    {follower.userName}
                                </h2>
                                <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                                    {follower.email}
                                </p>
                            </div>
                            
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    );
}
