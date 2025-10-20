"use client";
import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, Share2, TrashIcon, Edit } from "lucide-react"; // Added Edit icon
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

const PostCard = ({ postData, usersData, onFollowUpdate }) => {
    const [showFull, setShowFull] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    // console.log(usersData.following)
    const [newComment, setNewComment] = useState("");
    // ⭐ EDIT STATE: The ID of the comment being edited and its text
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState("");
    // ⭐

    const { data: session } = useSession();

    const [likes, setLikes] = useState(postData?.likes || 0);
    const [liked, setLiked] = useState(false);
    const [totalComments, setTotalComments] = useState(postData?.comment || 0);
    const shares = postData?.shares || 4;
    const [isFollowing, setIsFollowing] = useState(false);

    const titleText = postData?.blog_title || "Untitled Post";
    const descText = postData?.description || "";
    const image = postData?.featured_image || null;
    const authorName = postData?.author_name || "Unknown Author";
    const authorAvatar = postData?.author_image ? postData.author_image : "/defult_profile.jpg";

    const fbTime = formatFacebookDate(postData?.created_at || new Date().toISOString());
    const mobileLimit = 100;
    const isLong = descText.length > mobileLimit;
    const shortDesc = descText.slice(0, mobileLimit) + "...";

    // 🟢 Fetch comments from backend (Unchanged)
    const fetchComments = async () => {
        try {
            setLoadingComments(true);
            const res = await fetch(
                `/api/single-post-comments/${postData?._id}?email=${postData?.author_email}`
            );
            const data = await res.json();
            if (data.success) {
                setComments(data.comments.map(c => ({ ...c, id: c._id || c.id })));
            } else {
                console.error("Failed to load comments:", data.message);
            }
        } catch (err) {
            console.error("Error fetching comments:", err);
        } finally {
            setLoadingComments(false);
        }
    };

    // 🟠 Auto-fetch comments when modal opens (Unchanged)
    useEffect(() => {
        if (modalOpen && postData?._id) {
            fetchComments();
        }
    }, [modalOpen]);




    // 🟢 Handler to START editing a comment
    const handleStartEdit = (comment) => {
        // Only allow editing if the current user is the comment author
        if (session?.user?.email !== comment.comment_author_email) return;

        setEditingCommentId(comment.id);
        setEditingCommentText(comment.text);
    };

    // 🟢 Handler to SUBMIT the comment update
    const handleUpdateComment = async () => {
        if (!editingCommentId || editingCommentText.trim() === "") return;

        try {
            const res = await fetch("/api/add-comment", {
                method: "PATCH", // Use PATCH as set up in the backend API
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    commentId: editingCommentId,
                    newText: editingCommentText.trim(),
                }),
            });

            const data = await res.json();

            if (data.success) {
                // Update local state immediately without re-fetching all comments
                setComments((prev) =>
                    prev.map((c) =>
                        c.id === editingCommentId ? { ...c, text: editingCommentText.trim() } : c
                    )
                );
                // Clear editing state
                setEditingCommentId(null);
                setEditingCommentText("");
                Swal.fire({
                    icon: "success",
                    title: "Comment Updated!",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: data.message || "Failed to update comment",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        } catch (err) {
            console.error("Error updating comment:", err);
            Swal.fire({
                icon: "error",
                title: "Network error. Please try again.",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };


    // -----------------------------------------------------------

    // 🟢 Add Comment Handler 
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
                setComments((prev) => [savedComment, ...prev]);
                setNewComment("");
                setTotalComments((prev) => prev + 1);
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

    // ⭐ Delete Comment Handler 
    const handleDeleteComment = async (commentId) => {
        if (!session) return;

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444", // red-500
            cancelButtonColor: "#6B7280", // gray-500
            confirmButtonText: "Yes, delete it!"
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`/api/add-comment?commentId=${commentId}&postId=${postData?._id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.success) {
                setComments((prev) => prev.filter((comment) => comment.id !== commentId));
                setTotalComments((prev) => prev - 1);
                Swal.fire({
                    icon: "success",
                    title: "Comment Deleted!",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: data.message || "Failed to delete comment",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        } catch (err) {
            console.error("Error deleting comment:", err);
            Swal.fire({
                icon: "error",
                title: "Network error. Please try again.",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };
    // -----------------------------------------------------------

    // ... (Handle Like and Follow functions remain unchanged) ...
    useEffect(() => {
        if (session?.user?.email) {
            setLiked(postData?.likedUsers?.includes(session.user.email));
        }
    }, [session, postData?.likedUsers]);

    //Handle Like
    const handleLike = async () => {
        if (!session) {
            Swal.fire({
                icon: "warning",
                title: "You must be logged in to like!",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            return;
        }

        try {
            const res = await fetch("/api/add-likes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ blogId: postData?._id }),
            });
            const data = await res.json();

            if (data.success) {
                setLikes(data.likes);
                setLiked(data.liked);
            }
        } catch (err) {
            console.error("Error liking post:", err);
        }
    };

    useEffect(() => {
        if (session?.user?.email && postData?.author_email) {
            const followingStatus = postData.followers?.some(
                (email) => email.toLowerCase() === session.user.email.toLowerCase()
            );
            setIsFollowing(followingStatus);
        }
    }, [session, postData?.followers, postData?.author_email]);

    // Check follow status considering usersData.following
    useEffect(() => {
        if (session?.user?.email && postData?.author_email) {
            const followingStatus = usersData.following?.some(
                (email) => email.toLowerCase() === postData.author_email.toLowerCase()
            );
            setIsFollowing(followingStatus);
        }
    }, [session, postData?.author_email, usersData.following]);

    // Handle follow
    const handleFollow = async () => {
        if (!session) return;
        try {
            const res = await fetch("/api/follow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ targetEmail: postData.author_email }),
            });
            const data = await res.json();
            if (data.success) {
                setIsFollowing(data.following);
                onFollowUpdate(postData.author_email, data.following);
            }
        } catch (err) {
            console.error(err);
        }
    };


    const CardContent = () => (
        // ... Card Content (unchanged)
        <article className="rounded-xl p-4 flex flex-col gap-4 border border-gray-200 h-full bg-white">
            <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full" src={authorAvatar} alt="Author_photo" />
                <div className="-space-y-1">
                    <div className="flex items-center gap-2">
                        <p className="text-gray-900 font-medium">{authorName}</p>

                        {session?.user?.email !== postData.author_email && (
                            isFollowing ? (
                                <button
                                    onClick={handleFollow}
                                    className="text-blue-600 cursor-pointer text-xs font-bold"
                                >
                                    Following
                                </button>
                            ) : (
                                <button
                                    onClick={handleFollow}
                                    className="text-blue-600 cursor-pointer text-xs font-bold"
                                >
                                    Follow
                                </button>
                            )
                        )}
                    </div>
                    <small className="text-gray-500 text-xs">{fbTime}</small>
                </div>
            </div>

            {image && (
                <img
                    src={image}
                    alt={titleText}
                    className="w-full h-auto max-h-[500px] object-contain rounded-lg"
                />
            )}

            <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{titleText}</h2>
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

            <div className="flex justify-between items-end text-sm text-gray-500 mt-1">
                <div className="flex items-center cursor-pointer gap-1">
                    <FaHeart size={14} color="red" />
                    <span>{likes} Likes</span>
                </div>
                <div className="flex items-center  gap-5">
                    <span>{totalComments} Comments</span>
                    <span>{shares} Shares</span>
                </div>
            </div>

            <hr className="border-gray-200" />

            <div className="flex justify-around items-center text-gray-600">
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-1 cursor-pointer transition ${liked ? "text-red-500" : "hover:text-[#0000FF]"}`}
                >
                    <Heart size={18} fill={liked ? "red" : "none"} /> {liked ? "Liked" : "Like"}
                </button>

                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center cursor-pointer gap-1 hover:text-[#0000FF] transition"
                >
                    <MessageCircle size={18} /> Comment
                </button>

                <button className="flex cursor-pointer items-center gap-1 hover:text-[#0000FF] transition">
                    <Share2 size={18} /> Share
                </button>
            </div>
        </article>
    );

    return (
        <>
            <CardContent />

            {modalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4">
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

                        {/* Comment Input (Unchanged) */}
                        <div className="flex gap-2 border-t border-gray-200 p-3 bg-white">
                            <img
                                src={session?.user?.image || "/defult_profile.jpg"}
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
                            <button onClick={handleAddComment} className="text-blue-600 font-semibold px-2">
                                Post
                            </button>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-3 p-4">
                            {loadingComments ? (
                                <p className="text-gray-400 text-sm text-center">Loading comments...</p>
                            ) : comments.length === 0 ? (
                                <p className="text-gray-400 text-sm text-center">No comments yet</p>
                            ) : (
                                comments.map((comment) => {
                                    const isAuthor = session?.user?.email === comment.comment_author_email;
                                    const isPostAuthor = session?.user?.email === postData?.author_email;
                                    const canDelete = isAuthor || isPostAuthor;
                                    const isEditing = editingCommentId === comment.id;

                                    return (
                                        <div key={comment.id} className="flex gap-2">
                                            <img
                                                src={comment.comment_author_image || "/defult_profile.jpg"}
                                                alt=""
                                                className="w-8 h-8 rounded-full"
                                            />

                                            {/* Comment Content Area */}
                                            <div className="bg-gray-100 p-2 rounded-xl flex-1 relative">
                                                <div className="flex justify-between items-start">
                                                    <p className="text-sm text-gray-800 font-semibold">
                                                        {comment.comment_author_name}
                                                    </p>

                                                    {/* Action Icons */}
                                                    {isAuthor && session && (
                                                        <div className="flex gap-1 -mt-1 -mr-1">
                                                            {/* Edit Icon */}
                                                            <button
                                                                className={`text-gray-400 hover:text-blue-500 transition duration-150 p-1 rounded-full ${isEditing ? 'text-blue-500' : ''}`}
                                                                onClick={() => isEditing ? setEditingCommentId(null) : handleStartEdit(comment)}
                                                                aria-label={isEditing ? "Cancel edit" : "Edit comment"}
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>

                                                            {/* Delete Icon */}
                                                            <button
                                                                className="text-gray-400 hover:text-red-500 transition duration-150 p-1 rounded-full"
                                                                onClick={() => handleDeleteComment(comment.id)}
                                                                aria-label="Delete comment"
                                                            >
                                                                <TrashIcon className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Conditional Rendering for Edit Mode */}
                                                {isEditing ? (
                                                    <div className="flex flex-col gap-1 mt-1">
                                                        <textarea
                                                            value={editingCommentText}
                                                            onChange={(e) => setEditingCommentText(e.target.value)}
                                                            className="w-full text-sm text-gray-700 p-1 border border-blue-300 rounded resize-none focus:outline-none"
                                                            rows="2"
                                                        />
                                                        <button
                                                            onClick={handleUpdateComment}
                                                            className="self-end text-xs text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded font-medium disabled:opacity-50"
                                                            disabled={editingCommentText.trim() === comment.text || editingCommentText.trim() === ""}
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <p className="text-sm text-gray-700">{comment.text}</p>
                                                        <small className="text-gray-400 text-xs">
                                                            {formatFacebookDate(comment.created_at)}
                                                        </small>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PostCard;