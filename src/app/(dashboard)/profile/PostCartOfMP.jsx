"use client"
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const PostCartOfMP = ({ post, session, handleEditPost, handleDeletePost, formatFacebookDate }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => setShowFullDescription(!showFullDescription);

    const description = post.description || "";
    const isLongDescription = description.length > 300;
    const shortText = isLongDescription ? description.slice(0, 300) + "..." : description;

    return (
        <article
            key={post._id}
            className="rounded-xl p-4 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all"
        >
            <div className="flex items-center gap-3">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={session?.user?.image || "/default_profile.jpg"}
                    alt="Author"
                />
                <div>
                    <p className="text-gray-900 font-medium">{session?.user?.name}</p>
                    <small className="text-gray-500 text-xs">{formatFacebookDate(post.created_at)}</small>
                </div>
            </div>

            {post.featured_image && (
                <img
                    src={post.featured_image}
                    alt={post.blog_title}
                    className="w-full max-h-[400px] object-cover mt-3 rounded-lg"
                />
            )}

            <h2 className="text-lg font-semibold mt-3">{post.blog_title}</h2>

            <p className="text-gray-600 text-sm mt-1">
                {showFullDescription ? description : shortText}
            </p>

            {isLongDescription && (
                <button
                    onClick={toggleDescription}
                    className="text-[#0000FF] text-sm mt-1 font-medium hover:underline"
                >
                    {showFullDescription ? "See Less" : "See All"}
                </button>
            )}

            <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <FaHeart className="text-red-500" /> {post.likes || 0} Likes
                </div>
                <div>
                    {post.comment || 0} Comments · {post.shares || 0} Shares
                </div>
            </div>

            <div className="flex justify-between mt-5">
                <button
                    onClick={() => handleEditPost(post)}
                    className="px-4 py-2 bg-[#0000FF] cursor-pointer text-white font-semibold rounded-xl hover:bg-[#2727ff]"
                >
                    Edit Post
                </button>
                <button
                    onClick={() => handleDeletePost(post._id)}
                    className="px-4 py-2 border cursor-pointer border-[#0000FF] text-[#0000FF] font-semibold rounded-xl hover:bg-[#0000FF] hover:text-white"
                >
                    Delete Post
                </button>
            </div>
        </article>
    );
};

export default PostCartOfMP;