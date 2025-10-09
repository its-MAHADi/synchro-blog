"use client";
import React, { useState } from "react";
import { Heart, MessageCircle, Share2, X } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const formatFacebookDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);


    if (diffDays === 0) {
        if (diffHrs > 0) return `${diffHrs}h ago`;
        if (diffMin > 0) return `${diffMin}m ago`;
        return "Just now";
    }
    if (diffDays === 1) {
        const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return `Yesterday at ${time}`;
    }
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `${day} ${month} at ${time}`;
};

const PostCard = ({ postData }) => {

    // console.log(postData);
    const [showFull, setShowFull] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [comments, setComments] = useState(postData?.commentsList || []);
    const [newComment, setNewComment] = useState("");
    const { data: session, status } = useSession();

    const likes = postData?.likes;
    //For counting comments
    const [totalComments, setTotalComments] = useState(postData?.comment || 0); 
    const shares = postData?.shares || 4;

    const titleText = postData?.blog_title || "Untitled Post";
    const descText = postData?.description || "";
    const image = postData?.featured_image || null;
    const authorName = postData?.author_name || "Unknown Author";
    const authorAvatar = postData?.author_image;

    const fbTime = formatFacebookDate(postData?.created_at || new Date().toISOString());

    const mobileLimit = 100;
    const isLong = descText.length > mobileLimit;
    const shortDesc = descText.slice(0, mobileLimit) + "...";

    //Handle Comments 
    const handleAddComment = async () => {
        if (!session) {
            Swal.fire({
                icon: "warning",
                title: "You must be logged in to comment!",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            return;
        }

        if (newComment.trim() === "") return;

        const commentObj = {
            id: Date.now(),
            post_id: postData?._id,
            text: newComment,
            author_name: session?.user?.name,
            author_image: session?.user?.image,
            created_at: new Date().toISOString(),
        };

        try {
            const res = await fetch("/api/add-comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(commentObj),
            });

            const data = await res.json();

            if (data.success) {
                // ⬇️ Update comments instantly
                setComments((prev) => [commentObj, ...prev]);
                setNewComment("");

                // ⬇️ Smart live comment count
                setTotalComments((prev) => prev + 1);

                Swal.fire({
                    icon: "success",
                    title: "Comment added successfully!",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: data.message || "Failed to add comment",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        } catch (err) {
            console.error("Error adding comment:", err);
            Swal.fire({
                icon: "error",
                title: "Something went wrong. Please try again.",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        }
    };



    // Card content
    const CardContent = () => (
        <article className="rounded-xl p-4 flex flex-col gap-4 border border-gray-200 h-full bg-white">
            {/* Author Info */}
            <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full" src={authorAvatar} alt="" />
                <div className="-space-y-1">
                    <p className="text-gray-900 font-medium">{authorName}</p>
                    <small className="text-gray-500 text-xs">{fbTime}</small>
                </div>
            </div>

            {/* Image */}
            {image ? (
                <img src={image} alt={titleText} className="w-full h-52 md:h-72 object-cover rounded-lg" />
            ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-lg font-semibold">
                    No Image
                </div>
            )}

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{titleText}</h2>

            {/* Description */}
            <p className="text-gray-600 text-sm">
                <span className="block md:hidden">
                    {showFull ? descText : isLong ? shortDesc : descText}
                    {isLong && (
                        <button
                            onClick={() => setShowFull(!showFull)}
                            className="text-blue-600 font-medium ml-1 hover:underline"
                        >
                            {showFull ? "See less" : "See more"}
                        </button>
                    )}
                </span>
                <span className="hidden md:block">{descText}</span>
            </p>

            {/* Stats */}
            <div className="flex justify-between items-end text-sm text-gray-500 mt-1">
                <div className="flex items-center gap-1">
                    <FaHeart size={14} color="red" />
                    <span>{likes} Likes</span>
                </div>
                <div className="flex items-center gap-5">
                    <span>{totalComments} Comments</span>
                    <span>{shares} Shares</span>
                </div>
            </div>

            <hr className="border-gray-200" />

            {/* Footer icons */}
            <div className="flex justify-around items-center text-gray-600">
                <button className="flex items-center gap-1 hover:text-blue-600 transition">
                    <Heart size={18} /> Like
                </button>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-1 hover:text-blue-600 transition"
                >
                    <MessageCircle size={18} /> Comment
                </button>
                <button className="flex items-center gap-1 hover:text-blue-600 transition">
                    <Share2 size={18} /> Share
                </button>
            </div>
        </article>
    );

    return (
        <>
            <CardContent />

            {/* Modal */}
            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4">
                    {/* Use overflow-y-auto on the modal container, NOT inside comment list */}
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative flex flex-col overflow-visible">
                        {/* Close Button */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl z-50"
                        >
                            ✖
                        </button>

                        {/* Card Content */}
                        <div className="p-4">
                            <CardContent />
                        </div>

                        {/* Comment Input */}
                        <div className="flex gap-2 border-t border-gray-200 p-3 bg-white">
                            <img
                                src={session?.user?.image}
                                alt="user"
                                className="w-10 h-10 rounded-full"
                            />
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                className="flex-1 border border-gray-200 rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                            />
                            <button
                                onClick={handleAddComment}
                                className="text-blue-600 font-semibold px-2"
                            >
                                Post
                            </button>
                        </div>

                        {/* Comment List */}
                        <div className="space-y-3 p-4">
                            {comments.length === 0 && (
                                <p className="text-gray-400 text-sm text-center">No comments yet</p>
                            )}
                            {comments.map((comment) => (
                                <div key={comment.id} className="flex gap-2">
                                    <img
                                        src={comment.author_image || "https://i.pravatar.cc/40"}
                                        alt=""
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <div className="bg-gray-100 p-2 rounded-xl flex-1">
                                        <p className="text-sm font-medium">{comment.author_name}</p>
                                        <p className="text-sm text-gray-700">{comment.text}</p>
                                        <small className="text-gray-400 text-xs">{formatFacebookDate(comment.created_at)}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default PostCard;
