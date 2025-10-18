"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import CommentBox from "../components/CommentBox";

const BlogPostDetailsPage = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog-post-details/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPostData(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  if (!postData)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Blog post not found
      </div>
    );

  // ✅ Safe fallback values
  const image = postData?.featured_image || "/default-cover.png";
  const authorImage = postData?.author_image || "/defult_profile.jpg";
  const authorName = postData?.author_name || "Unknown Author";
  const publishDate = postData?.created_at
    ? new Date(postData.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown Date";

  return (
    <>
      <Head>
        <title>{postData?.blog_title || "Blog Post"}</title>
        <meta
          name="description"
          content={postData?.description?.substring(0, 160) || "Blog details"}
        />
      </Head>

      <div className="bg-[#fdfcfb] min-h-screen text-black">
        <main className="max-w-6xl mx-auto px-4 md:px-6">
          <article className="bg-white rounded-2xl shadow-lg p-6 md:p-12 border border-[#e7e5e4] transition-all duration-300 hover:shadow-2xl">

            {/* --- Blog Header --- */}
            <header className="mb-8">
              <span className="text-[#0000FF] uppercase font-semibold tracking-widest text-sm">
                {postData?.category?.join(", ") || "Uncategorized"}
              </span>

              <h1 className="text-xl md:text-4xl font-extrabold text-black my-4 leading-tight">
                {postData?.blog_title || "Untitled Post"}
              </h1>

              <div className="flex items-center mt-6">
                <img
                  src={authorImage}
                  alt={authorName}
                  width={56}
                  height={56}
                  className="rounded-full object-cover border-2 border-[#0000FF]"
                />
                <div className="ml-4">
                  <p className="text-black font-semibold text-lg">
                    {authorName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Published on {publishDate}
                  </p>
                </div>
              </div>
            </header>

            {/* --- Blog Cover Image --- */}
            <div className="my-8 rounded-xl overflow-hidden shadow-md">
              <img
                src={image}
                alt={postData?.blog_title}
                className="w-full h-auto object-cover md:h-[500px] transform hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            {/* --- Blog Content --- */}
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12 whitespace-pre-line">
              {postData?.description || "No description available."}
            </div>

            <hr className="my-12 border-t-2 border-[#f1f1f1]" />

            {/* --- Comments Section --- */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-8 border-l-4 border-[#0000FF] pl-4">
                Join the Discussion
              </h2>

              {/* Example Comment */}
              <div className="mb-10 p-5 bg-[#f9f8f7] rounded-xl border border-[#e7e5e4] shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="John Smith"
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-[#0000FF]"
                  />
                  <div className="ml-4 flex-1">
                    <p className="font-semibold text-black text-lg">
                      John Smith
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                      This is such an inspiring read! I’ve been trying to build
                      a consistent morning routine for weeks, and this article
                      gave me the practical push I needed. Thank you for
                      sharing!
                    </p>
                  </div>
                </div>
              </div>

              {/* Comment Box Form */}
              <CommentBox />
            </section>
          </article>
        </main>
      </div>
    </>
  );
};

export default BlogPostDetailsPage;
