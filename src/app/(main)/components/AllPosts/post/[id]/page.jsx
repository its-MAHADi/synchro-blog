"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PostDetailsPage() {
  const { postId } = useParams(); // ✅ dynamic route থেকে id নিচ্ছি
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        // ✅ এখানে ঠিক করা হলো — API থেকে পোস্ট ডেটা আনবে
       const res = await fetch(`/api/single-post/${postId}`);
        const data = await res.json();
        console.log("Fetched post:", data);

        if (data.success) setPost(data.post);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{post.blog_title}</h1>
      <p className="text-gray-700 mb-4">{post.description}</p>

      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={post.blog_title}
          className="w-full rounded-lg mb-4"
        />
      )}

      <div className="border-t pt-3">
        <p className="font-semibold mb-1">Likes: {post.likes?.length || 0}</p>
        <div>
          <p className="font-semibold">Comments:</p>
          {post.comments?.length ? (
            <ul className="mt-2 space-y-1">
              {post.comments.map((c, i) => (
                <li key={i}>
                  <strong>{c.userName}</strong>: {c.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
