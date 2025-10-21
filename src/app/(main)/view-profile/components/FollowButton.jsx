"use client";

import { useState } from "react";

const FollowButton = ({ targetEmail, initialIsFollowing, onFollowChange }) => {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [loading, setLoading] = useState(false);

    const toggleFollow = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/follow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ targetEmail }),
            });

            if (!res.ok) throw new Error("Failed to follow/unfollow");

            const newState = !isFollowing;
            setIsFollowing(newState);

            // Notify parent to update follower/following counts
            onFollowChange?.(newState);

        } catch (err) {
            console.error("Follow error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={toggleFollow}
            disabled={loading}
            className={`px-5 py-2 rounded-lg font-semibold transition-all ${isFollowing
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
        >
            {loading ? "..." : isFollowing ? "Following" : "Follow"}
        </button>
    );
};

export default FollowButton;
