"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
// import { Code2, PenTool, BookOpen, Palette, Camera, TrendingUp, GraduationCap, Plane, ChefHat, Dumbbell, Rocket, BookMarked, Smartphone, Gamepad2, Sparkles } from 'lucide-react';

export default function Page() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProfession, setSelectedProfession] = useState(null);

  const professions = [
    { name: "Developer", description: "Shares coding tutorials, tech blogs, and project ideas.", icon: "💻" },
    { name: "Writer", description: "Posts stories, poems, and creative articles.", icon: "✍️" },
    { name: "Blogger", description: "Shares opinions, lifestyle, and personal experiences.", icon: "📝" },
    { name: "Designer", description: "Publishes design inspirations and UI/UX case studies.", icon: "🎨" },
    { name: "Photographer", description: "Uploads photo blogs, travel shots, and editing tips.", icon: "📷" },
    { name: "Marketer", description: "Writes about SEO, digital strategy, and social growth.", icon: "📊" },
    { name: "Teacher / Educator", description: "Shares educational blogs and learning guides.", icon: "📚" },
    { name: "Traveler", description: "Posts trip experiences, travel blogs, and destination reviews.", icon: "✈️" },
    { name: "Foodie / Chef", description: "Shares recipes, food reviews, and cooking tutorials.", icon: "🍳" },
    { name: "Health & Fitness Expert", description: "Blogs about workouts, health tips, and nutrition.", icon: "💪" },
    { name: "Entrepreneur", description: "Shares startup journeys, business tips, and motivation.", icon: "🚀" },
    { name: "Student", description: "Writes about learning experiences, projects, and study hacks.", icon: "🎓" },
    { name: "Tech Reviewer", description: "Reviews gadgets, apps, and new technologies.", icon: "⚡" },
    { name: "Gamer", description: "Shares gaming reviews, guides, and esports news.", icon: "🎮" },
    { name: "Motivational Speaker", description: "Posts inspirational blogs and success stories.", icon: "🌟" },
  ];

  const handleCardClick = (name) => {
    setSelectedProfession(name);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${name} selected!`,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  const handleNextStep = () => {
    if (!selectedProfession) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Please select a profession before continuing.",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    // Navigate to next page with selected profession in query
    router.push(`/user-dashboard/posts/questions-per-profession?profession=${encodeURIComponent(selectedProfession)}`);
  };

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-3">Choose Your Profession</h1>
          <p className="text-lg text-slate-600">Select the category that best describes your content focus</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {professions.map((profession, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleCardClick(profession.name)}
              className={`group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border overflow-hidden ${
                selectedProfession === profession.name ? "border-blue-500 ring-2 ring-blue-400" : "border-slate-200 hover:border-blue-400"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                    {profession.icon}
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      hoveredIndex === index ? "bg-blue-500 scale-150" : "bg-slate-300"
                    }`}
                  ></div>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {profession.name}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">{profession.description}</p>

                <div className="mt-4 flex items-center text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Select</span>
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Step Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleNextStep}
            disabled={!selectedProfession}
            className={`px-6 py-3 rounded-lg cursor-pointer font-semibold text-white transition-all duration-300 ${
              selectedProfession ? "bg-[#0000FF] text-white hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}
// 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