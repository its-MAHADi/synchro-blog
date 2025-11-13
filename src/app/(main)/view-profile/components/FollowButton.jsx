"use client";
import { useEffect, useState } from "react";

export default function FollowButton({ targetEmail, initialIsFollowing, onFollowChange }) {
    const [isFollowing, setIsFollowing] = useState(!!initialIsFollowing);
    const [loading, setLoading] = useState(false);

    // Keep local state in sync when parent changes the prop
    useEffect(() => {
        setIsFollowing(!!initialIsFollowing);
    }, [initialIsFollowing]);

    const handleFollow = async () => {
        setLoading(true);
        // optimistic UI
        setIsFollowing(true);
        try {
            const res = await fetch("/api/follow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ targetEmail }),
            });
            if (!res.ok) throw new Error("Failed to follow");
            // Optionally read response to get updated follower list
            // const data = await res.json();
            onFollowChange(true);
        } catch (err) {
            console.error(err);
            // revert optimistic change
            setIsFollowing(false);
        } finally {
            setLoading(false);
        }
    };

    const handleUnfollow = async () => {
        setLoading(true);
        // optimistic UI
        setIsFollowing(false);
        try {
            const res = await fetch("/api/unfollow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ targetEmail }),
            });
            if (!res.ok) throw new Error("Failed to unfollow");
            onFollowChange(false);
        } catch (err) {
            console.error(err);
            // revert optimistic change
            setIsFollowing(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            disabled={loading}
            onClick={isFollowing ? handleUnfollow : handleFollow}
            className={`px-5 py-2 rounded-lg font-semibold transition-all ${isFollowing
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-[#0000FF] text-white hover:bg-blue-700"
                }`}
        >
            {loading ? "..." : isFollowing ? "Following" : "Follow"}
        </button>
    );
}
