"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { Briefcase, Sparkles, TrendingUp, Award } from 'lucide-react';
// import { Code2, PenTool, BookOpen, Palette, Camera, TrendingUp, GraduationCap, Plane, ChefHat, Dumbbell, Rocket, BookMarked, Smartphone, Gamepad2, Sparkles } from 'lucide-react';


async function getUserByEmail(email) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/usersfor-apply?email=${email}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch user");

    return res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}



export default function Page() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [userData, setUserData] = useState(null);
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [hasApplied, setHasApplied] = useState(false);


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
    router.push(`/questions-per-profession?profession=${encodeURIComponent(selectedProfession)}`);
  };

  // apply
  const handleSubmitRequest = async () => {
    if (!reason.trim()) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: "Please provide a reason!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    try {
      const res = await fetch("/api/apply-change-profession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userData._id,
          email: userData.email,
          currentProfession: userData.profession,
          reason,
        }),
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Your request has been sent to the admin!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        setReason("");
        setShowModal(false);
        setHasApplied(true); // Button stays disabled
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: data.error || "Failed to send request.",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };







  useEffect(() => {
    async function fetchUserData() {
      if (session?.user?.email) {
        const data = await getUserByEmail(session.user.email);
        setUserData(data);

        // Check if user already applied
        if (data?.hasAppliedProfessionChange) {
          setHasApplied(true);
        }
      }
    }
    fetchUserData();
  }, [session?.user?.email]);




  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      {
        userData?.profession
          ?
          <div className="border border-gray-300 rounded-xl relative overflow-hidden flex items-center justify-center px-4 py-8">


            {/* Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96  rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96  rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>

            <div className="relative w-full max-w-6xl">
              <div className="grid lg:grid-cols-2 gap-8 items-center">

                {/* Left Side - Hero Content */}
                <div className=" space-y-6 lg:pr-8">
                  <div className="inline-flex items-center gap-2  border border-purple-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-300">Professional Profile</span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Your Career
                    <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                      Identity
                    </span>
                  </h1>

                  <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                    Showcase your professional expertise and keep your career profile up-to-date. Your journey matters to us.
                  </p>


                </div>

                {/* Right Side - Card */}
                <div className="relative">
                  {/* Glow Effect */}


                  {/* Main Card */}
                  <div className="relative  backdrop-blur-xl border border-blue-200 rounded-3xl p-8 shadow-2xl">

                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Current Role</p>
                          <p className="text-sm text-slate-400">Professional Status</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                        <span className="text-xs font-semibold text-emerald-400">● Active</span>
                      </div>
                    </div>

                    {/* Profession Display */}
                    <div className="mb-8">
                      <div className="0 border border-gray-300 rounded-2xl p-6 shadow-inner">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-5xl">🎯</div>
                          <div className="flex-1">
                            <h2 className="text-3xl md:text-4xl text-blue-600 font-bold mb-1">
                              {userData.profession}
                            </h2>
                            <p className="text-sm text-slate-500">Your verified profession</p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        {/* <div className="mt-4">
                          <div className="flex justify-between text-xs text-slate-500 mb-2">
                            <span>Profile Completion</span>
                            <span>100%</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-full"></div>
                          </div>
                        </div> */}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => setShowModal(true)}
                      disabled={hasApplied} // disable if already applied
                      className={`group relative w-full ${hasApplied ? "cursor-not-allowed opacity-50" : ""}`}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative px-2 md:px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 group-hover:scale-[1.02] flex items-center justify-center gap-2">
                        {hasApplied ? (
                          <span>Request Sent</span>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            <span>Request Profession Change</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </div>
                    </button>



                    {showModal && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
                          <h2 className="text-2xl font-bold mb-4">Apply to Change Profession</h2>

                          <label className="block mb-4">
                            <span className="text-sm font-medium text-slate-600">Email</span>
                            <input
                              type="email"
                              value={userData.email}
                              readOnly
                              className="mt-1 block w-full rounded-lg border border-slate-300 p-2 bg-gray-100 text-slate-700"
                            />
                          </label>

                          <label className="block mb-6">
                            <span className="text-sm font-medium text-slate-600">Reason</span>
                            <textarea
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                              placeholder="Why do you want to change your profession?"
                              className="mt-1 block w-full rounded-lg border border-slate-300 p-2 text-slate-700"
                              rows={4}
                            />
                          </label>

                          <div className="flex justify-end gap-4">
                            <button
                              onClick={() => setShowModal(false)}
                              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-gray-100 transition"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSubmitRequest}
                              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    )}


                    {/* Footer Info */}
                    <div className="mt-6 pt-6 border-t border-gray-300 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span>Profile Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>


          :
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
                  className={`group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border overflow-hidden ${selectedProfession === profession.name ? "border-blue-500 ring-2 ring-blue-400" : "border-slate-200 hover:border-blue-400"
                    }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                        {profession.icon}
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${hoveredIndex === index ? "bg-blue-500 scale-150" : "bg-slate-300"
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
                className={`px-6 py-3 rounded-lg cursor-pointer font-semibold text-white transition-all duration-300 ${selectedProfession ? "bg-[#0000FF] text-white hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
                  }`}
              >
                Next Step
              </button>
            </div>
          </div>
      }
    </div>
  );
}