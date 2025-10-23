"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PostPage() {
  const { postId } = useParams(); // ✅ destructure directly
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!postId) return; // safeguard

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`); // ✅ API endpoint
        const data = await res.json();
        if (data.success) setPost(data.post);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-2">{post.content}</p>

      <div className="mt-4">
        <p className="font-semibold">Likes: {post.likes.length}</p>
        <div className="mt-2">
          <p className="font-semibold">Comments:</p>
          <ul>
            {post.comments.map((c, i) => (
              <li key={i}>
                <span className="font-bold">{c.userName}</span>: {c.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
