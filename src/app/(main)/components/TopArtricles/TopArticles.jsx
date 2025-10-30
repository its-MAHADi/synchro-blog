"use client";
import React from "react";
import { Heart, Clock, TrendingUp, ArrowUpRight } from "lucide-react";

export default function TopArticles() {
  const articles = [
    {
      _id: 1,
      title: "Creamy Chicken Alfredo Pasta",
      desc: `🍽️ Cuisine: Italian
        🕐 Preparation Time: 15 minutes
        🔥 Cooking Time: 20 minutes
        🎯 Difficulty: Medium
        ⭐ Taste Rating: 4 / 5`,
      author_name: "Sudipto Das",
      created_at: "2025-10-24T02:20:00",
    },
    {
      _id: 2,
      title: "Digital Marketing",
      desc: `🍽️ Dive deep into the ever-evolving world of digital marketing with a specific focus on Facebook! This blog explores the latest strategies, tactics, and trends for harnessing the power of Facebook to grow your business, connect with your audience, and achieve your marketing goals`,
      author_name: "Mahadi Hasan",
      created_at: "2025-10-29T22:25:00",
    },
    {
      _id: 3,
      title: "Exploring the Magical Northern Lights",
      desc: `📍 Destination: Lofoten Islands
        🗺️ Location: Norway
        🕒 Duration: 7 Days
        💰 Budget: $1,200
        🌤️ Best Time to Visit: November to March`,
      author_name: "Sudipto Das",
      created_at: "2025-10-24T02:15:00",
    },
    {
      _id: 4,
      title: "Modern Dashboard UI for Finance App",
      desc: `🧰 Tools Used: Figma, Adobe Illustrator
      👥 Client / Project: Freelance project for a fintech startup

      The goal was to create a clean, user-friendly finance dashboard focusing on data clarity and intuitive navigation. I started with low-fidelity wireframes, moved to color exploration, and finalized a modern dark-light toggle interface. Each component follows an 8px grid for consistent spacing.`,
      author_name: "Sudipto Das",
      created_at: "2025-9-20T12:15:00",
    },
    {
      _id: 5,
      title: "SkillForge",
      desc: `A full-stack web application where users can browse, enroll, and manage courses. Built using MERN stack, this project demonstrates practical implementation of JWT authentication, Firebase auth, protected routes, MongoDB operations, and modern frontend design.`,
      author_name: "Sudipto Das",
      created_at: "2025-10-24T01:55:00",
    },
    {
      _id: 6,
      title: "Understanding Photosynthesis",
      desc: `📘 Teacher
      📚 Subject: Biology

      🎓 Grade Level: Grade 8

      🎯 Learning Objectives:

      Students will be able to explain the process of photosynthesis, identify its reactants and products, and understand its importance for life on Earth.`,
      author_name: "Sudipto Das",
      created_at: "2025-10-24T02:11:00",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="w-full -mt-20 py-16 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-center mb-10">
          <div className="animate-fadeInUp">
            <h2 className="text-center text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Top Articles of this Week
            </h2>
            <p className="text-gray-600 flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Most popular content this week
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={String(article._id)}
              className="group bg-white rounded-2xl overflow-hidden border border-blue-100 hover:border-blue-300 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer animate-fadeInUp relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-500 pointer-events-none"></div>
              
              {/* Blue accent line */}
              <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              <div className="p-6 relative">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 flex-1">
                    {article.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transform translate-x-0 -translate-y-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 ml-2" />
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-4 mb-6 leading-relaxed whitespace-pre-line">
                  {article.desc}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {article.author_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(article.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}