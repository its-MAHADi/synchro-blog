"use client";

import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, TrashIcon, Edit } from "lucide-react";
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

const ViewPostCard = ({ postData, usersData, onFollowUpdate }) => {
    const { data: session } = useSession();

    const [showFull, setShowFull] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState("");
    const [likes, setLikes] = useState(postData?.likes || 0);
    const [liked, setLiked] = useState(false);
    const [totalComments, setTotalComments] = useState(postData?.comment || 0);
    const shares = postData?.shares || 4;

    const titleText = postData?.blog_title || "Untitled Post";
    const descText = postData?.description || "";
    const image = postData?.featured_image || null;
    const authorName = postData?.author_name || "Unknown Author";
    const authorAvatar = postData?.author_image || "/defult_profile.jpg";

    const fbTime = formatFacebookDate(postData?.created_at || new Date().toISOString());
    const mobileLimit = 100;
    const isLong = descText.length > mobileLimit;
    const shortDesc = descText.slice(0, mobileLimit) + "...";

    // Follow state derived from parent
    const isFollowing = usersData.following?.some(
        email => email.toLowerCase() === postData.author_email.toLowerCase()
    );

    // Fetch comments
    const fetchComments = async () => {
        try {
            setLoadingComments(true);
            const res = await fetch(`/api/single-post-comments/${postData?._id}?email=${postData?.author_email}`);
            const data = await res.json();
            if (data.success) {
                setComments(data.comments.map(c => ({ ...c, id: c._id || c.id })));
            }
        } catch (err) {
            console.error("Error fetching comments:", err);
        } finally {
            setLoadingComments(false);
        }
    };

    useEffect(() => {
        if (modalOpen && postData?._id) fetchComments();
    }, [modalOpen]);

    // Comment Handlers
    const handleAddComment = async () => {
        if (!session) {
            Swal.fire({ icon: "warning", title: "Login to comment!", toast: true, position: "top-end", showConfirmButton: false, timer: 2000 });
            return;
        }
        if (newComment.trim() === "") return;

        const commentObj = {
            post_id: postData?._id,
            post_author_email: postData?.author_email,
            text: newComment,
            comment_author_name: session?.user?.name,
            comment_author_email: session?.user?.email,
            comment_author_image: session?.user?.image || null,
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
                const savedComment = { ...commentObj, id: data.data._id || Date.now() };
                setComments(prev => [savedComment, ...prev]);
                setNewComment("");
                setTotalComments(prev => prev + 1);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!session) return;
        const result = await Swal.fire({
            title: "Delete comment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
        });
        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`/api/add-comment?commentId=${commentId}&postId=${postData?._id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setComments(prev => prev.filter(c => c.id !== commentId));
                setTotalComments(prev => prev - 1);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleStartEdit = (comment) => {
        if (session?.user?.email !== comment.comment_author_email) return;
        setEditingCommentId(comment.id);
        setEditingCommentText(comment.text);
    };

    const handleUpdateComment = async () => {
        if (!editingCommentId || editingCommentText.trim() === "") return;

        try {
            const res = await fetch("/api/add-comment", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    commentId: editingCommentId,
                    newText: editingCommentText.trim(),
                }),
            });
            const data = await res.json();
            if (data.success) {
                setComments(prev => prev.map(c => c.id === editingCommentId ? { ...c, text: editingCommentText.trim() } : c));
                setEditingCommentId(null);
                setEditingCommentText("");
                Swal.fire({ icon: "success", title: "Comment Updated!", toast: true, position: "top-end", showConfirmButton: false, timer: 1500 });
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Like logic
    useEffect(() => {
        if (session?.user?.email) setLiked(postData?.likedUsers?.includes(session.user.email));
    }, [session, postData?.likedUsers]);

    const handleLike = async () => {
        if (!session) return;
        try {
            const res = await fetch("/api/add-likes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ blogId: postData?._id })
            });
            const data = await res.json();
            if (data.success) {
                setLikes(data.likes);
                setLiked(data.liked);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Follow logic
    // const handleFollow = async () => {
    //     if (!session) return;
    //     try {
    //         const res = await fetch("/api/follow", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ targetEmail: postData.author_email }),
    //         });
    //         const data = await res.json();
    //         if (data.success) {
    //             onFollowUpdate(postData.author_email, data.following);
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const CardContent = () => (
        <article className="rounded-xl p-4 flex flex-col gap-2 bg-white shadow-sm hover:shadow-md transition-all">
            {/* Header */}
            <div className="flex items-center gap-3">
                <img src={authorAvatar} alt="Author" className="w-10 h-10 rounded-full object-cover shadow-2xs" />
                <div className="flex flex-col">
                    <p className="font-semibold text-gray-800">{authorName}</p>
                    <p className="text-xs text-gray-500">{fbTime}</p>
                </div>
                {/* <div className="ml-auto">
                    {session?.user?.email !== postData?.author_email && (
                        <button
                            onClick={handleFollow}
                            className={`px-3 py-1 text-sm rounded-full font-semibold ${isFollowing ? "bg-gray-200 text-gray-700" : "bg-blue-600 text-white"}`}
                        >
                            {isFollowing ? "Following" : "Follow"}
                        </button>
                    )}
                </div> */}
            </div>

            {/* Content */}
            <div className="mt-2 text-gray-800 leading-relaxed">
                {isLong && !showFull ? shortDesc : descText}
                {isLong && (
                    <button className="text-blue-600 text-sm ml-1" onClick={() => setShowFull(!showFull)}>
                        {showFull ? "Show Less" : "Read More"}
                    </button>
                )}
            </div>

            {image && <img src={image} alt="Post" className="rounded-lg max-h-96 mt-3 w-full object-cover" />}

            {/* Footer */}
            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-4">
                    <button onClick={handleLike} className={`flex items-center gap-1 cursor-pointer transition ${liked ? "text-red-500" : "hover:text-red-500"}`}>
                        <Heart size={18} fill={liked ? "red" : "none"} /> {liked ? "Liked" : "Like"}
                    </button>
                    <button onClick={() => setModalOpen(true)} className="flex items-center gap-1 text-gray-700 hover:text-blue-500">
                        <MessageCircle /> {totalComments}
                    </button>
                    <button className="flex items-center gap-1 text-gray-700 hover:text-green-500">
                        <Share2 /> {shares}
                    </button>
                </div>
            </div>
        </article>
    );

    return (
        <>
            <CardContent />
            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/40 min-h-screen backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative flex flex-col">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl"
                        >
                            ✖
                        </button>

                        <div className="p-4">
                            <CardContent />
                        </div>

                        {/* Comment Input */}
                        <div className="flex gap-2 border-t border-gray-200 p-3 bg-white">
                            <img
                                src={session?.user?.image || "/defult_profile.jpg"}
                                alt="user"
                                className="w-10 h-10 rounded-full"
                            />
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                className="flex-1 border rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleAddComment()}
                            />
                            <button onClick={handleAddComment} className="px-4 py-2 bg-blue-600 text-white rounded-full">
                                Send
                            </button>
                        </div>

                        {/* Comments List */}
                        <div className="max-h-96 overflow-y-auto p-4 space-y-3">
                            {loadingComments ? (
                                <p>Loading comments...</p>
                            ) : comments.length === 0 ? (
                                <p className="text-gray-500">No comments yet</p>
                            ) : (
                                comments.map(comment => (
                                    <div key={comment.id} className="flex gap-3">
                                        <img src={comment.comment_author_image || "/defult_profile.jpg"} alt="author" className="w-8 h-8 rounded-full object-cover" />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold">{comment.comment_author_name}</p>
                                            {editingCommentId === comment.id ? (
                                                <div className="flex gap-2 mt-1">
                                                    <input
                                                        type="text"
                                                        value={editingCommentText}
                                                        onChange={e => setEditingCommentText(e.target.value)}
                                                        className="flex-1 border rounded-full px-2 py-1"
                                                    />
                                                    <button onClick={handleUpdateComment} className="text-blue-600">Save</button>
                                                </div>
                                            ) : (
                                                <p className="text-gray-700">{comment.text}</p>
                                            )}
                                        </div>
                                        {session?.user?.email === comment.comment_author_email && (
                                            <div className="flex gap-1 items-center">
                                                <button onClick={() => handleStartEdit(comment)} className="text-gray-500 hover:text-blue-500">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDeleteComment(comment.id)} className="text-gray-500 hover:text-red-500">
                                                    <TrashIcon size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewPostCard;
