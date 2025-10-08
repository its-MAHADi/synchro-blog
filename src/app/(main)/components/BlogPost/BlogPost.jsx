"use client";

import React from "react";

// Single Blog Card Component for Next.js
export default function BlogPost() {
  const post = {
    id: 1,
    author: "Sudipto Das",
    avatar: "SD",
    date: "05 Aug 2025",
    title: "Phytron is a best for backend",
    excerpt:
      "Dive into the world of Phytron and discover why it's gaining traction as a top choice for backend development. This blog explores Phytron's core functionalities, compares it to other backend frameworks, and showcases its strengths in handling data, APIs, and server-side logic. Uncover real-world examples and learn how Phytron can streamline your development process, enhance performance, and ultimately build robust and scalable applications.",
    tags: ["backend", "api", "performance"],
    category: "programing",
    image: null, // put image URL if available
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <article className="bg-[#0b1220] border border-white/5 rounded-xl p-6 flex flex-col gap-4">
{/* Author + Category */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold">
            {post.avatar}
          </div>
          <div>
            <p className="text-white font-medium">{post.author}</p>
            <small className="text-gray-400 text-xs">{post.date}</small>
          </div>
          <span className="ml-auto bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
            {post.category}
          </span>
        </div>

        {/* Thumbnail */}
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-60 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-60 bg-gradient-to-r from-indigo-700 to-cyan-600 rounded-lg flex items-center justify-center text-white/40 text-xl font-semibold">
            No Image
          </div>
        )}


        {/* Title */}
        <h2 className="text-xl font-semibold text-white">{post.title}</h2>

        {/* Excerpt */}
        <p className="text-gray-300 text-sm leading-relaxed">{post.excerpt}</p>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-white/5 rounded text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <button className="px-3 py-1 border border-white/10 rounded-md text-gray-200 text-sm hover:bg-white/10">
            Read more
          </button>
        </div>
      </article>
    </section>
  );
}
