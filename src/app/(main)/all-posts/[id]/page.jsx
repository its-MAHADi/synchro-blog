"use client";
import React from "react";
import Head from "next/head";
import CommentBox from "../components/CommentBox";

const BlogPostDetailsPage = () => {
  const blogPost = {
    title: "The Unseen Power of a Good Morning Routine",
    category: "Lifestyle",
    description: `In a world that constantly demands our attention, the first few hours of the day are a sanctuary. This is the time before the deluge of emails, notifications, and responsibilities begins. Harnessing this period through a structured morning routine is not just a productivity hack; it's a profound act of self-care that sets the tone for success and well-being.

A successful morning routine is not about waking up at 4 AM and running a marathon before sunrise. It's about creating a personal, intentional sequence of activities that energizes your mind, body, and spirit. It could be as simple as savoring a cup of coffee in silence, journaling your thoughts, or stretching for ten minutes.

The key is consistency and intention. The "why" behind your routine is what fuels it. Are you seeking more clarity? Less stress? Better physical health? Define your goals, and then build small, manageable habits around them. For instance, if your goal is mental clarity, you might start with a five-minute meditation session. If it's physical energy, a short walk or a healthy breakfast could be your cornerstone.

This deliberate start creates a ripple effect. When you begin your day with a sense of accomplishment and control, you are better equipped to handle the challenges that come your way. You react less and respond more thoughtfully. This proactive mindset prevents the day from managing you, and instead, empowers you to manage your day.

The beautiful thing is that there is no one-size-fits-all solution. Your perfect morning routine is uniquely yours. Experiment, be patient with yourself, and observe what makes you feel centered and prepared. Over time, this quiet, consistent investment in yourself will yield extraordinary returns, transforming not just your mornings, but your entire life.`,
    coverImage:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop",
    publishedDate: "October 4, 2025",
    author: {
      name: "Jane Doe",
      profilePic: "https://i.pravatar.cc/150?img=5",
    },
  };

  return (
    <>
      <Head>
        <title>{blogPost.title}</title>
        <meta
          name="description"
          content={blogPost.description.substring(0, 160)}
        />
      </Head>

      <div className="bg-[#fdfcfb] min-h-screen text-black">
        <main className="max-w-6xl mx-auto px-4 md:px-6 ">
          <article className="bg-white rounded-2xl shadow-lg p-6 md:p-12 border border-[#e7e5e4] transition-all duration-300 hover:shadow-2xl">

            {/* --- Blog Header --- */}
            <header className="mb-8">
              <span className="text-[#c45627] uppercase font-semibold tracking-widest text-sm">
                {blogPost.category}
              </span>
              <h1 className="text-xl md:text-4xl font-extrabold text-black my-4 leading-tight">
                {blogPost.title}
              </h1>

              <div className="flex items-center mt-6">
                <img
                  src={blogPost.author.profilePic}
                  alt={blogPost.author.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover border-2 border-[#c45627]"
                />
                <div className="ml-4">
                  <p className="text-black font-semibold text-lg">
                    {blogPost.author.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Published on {blogPost.publishedDate}
                  </p>
                </div>
              </div>
            </header>

            {/* --- Blog Cover Image --- */}
            <div className="my-8 rounded-xl overflow-hidden shadow-md">
              <img
                src={blogPost.coverImage}
                alt={blogPost.title}
                className="w-full h-auto object-cover md:h-[500px] transform hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            {/* --- Blog Content --- */}
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12">
              {blogPost.description}
            </div>

            <hr className="my-12 border-t-2 border-[#f1f1f1]" />

            {/* --- Comments Section --- */}
            <section>
              <h2 className="text-2xl font-bold text-black mb-8 border-l-4 border-[#c45627] pl-4">
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
                    className="rounded-full border-2 border-[#c45627]"
                  />
                  <div className="ml-4 flex-1">
                    <div className="">
                      <p className="font-semibold text-black text-lg">
                        John Smith
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                    <p className="text-gray-700 mt-2 leading-relaxed">
                      This is such an inspiring read! I've been trying to build
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
