"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function MyBlogs() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(
          `http://localhost:3000/api/service?email=${session.user.email}`
        );

        const data = await res.json();
        if (res.ok) {
          setBlogs(data.blogs);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Error fetching user blogs:", err);
      }
    };

    fetchBlogs();
  }, [session]);

  return (
    <div>
      <h1>My Blogs</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id}>
            <h2>{blog.blog_title}</h2>
            <p>{blog.description}</p>
          </div>
        ))
      ) : (
        <p>No blogs found</p>
      )}
    </div>
  );
}
