"use client";
import React, { useState } from "react";
import PostCard from "./PostCard/PostCard";


const AllPostsClient = ({ initialPosts, userEmail, usersData }) => {
  const [posts, setPosts] = useState(initialPosts || []);

  const handleFollowUpdate = (authorEmail, following) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.author_email === authorEmail
          ? {
              ...post,
              followers: following
                ? [...(post.followers || []), userEmail]
                : (post.followers || []).filter(
                    e => e.toLowerCase() !== userEmail.toLowerCase()
                  ),
            }
          : post
      )
    );
  };

  return (
    <div className="grid grid-cols-1 gap-10">
      {posts.length > 0 ? (
        posts.map(post => (
          <PostCard
            key={post._id}
            postData={post}
            usersData={usersData}
            onFollowUpdate={handleFollowUpdate}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No posts found
        </p>
      )}
    </div>
  );
};

export default AllPostsClient;
