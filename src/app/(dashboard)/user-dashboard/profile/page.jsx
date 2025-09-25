"use client";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { SlUserFollowing } from "react-icons/sl";
import { BsPostcard } from "react-icons/bs";
import {
  Camera,
  Edit,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  UserPlus,
  MessageCircle,
  Share2,
  Award,
  TrendingUp,
  Eye,
  ThumbsUp,
  Bookmark,
  BookOpen,
  PenTool,
  Settings,
  Star,
  Filter,
} from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* Floating Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left: Profile Pic + Name */}
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
              alt="Profile"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#c45627]"
            />
            <span className="font-bold text-sm sm:text-base text-gray-900">
              জন ডো
            </span>
          </div>

          {/* Right: Settings + Edit Button */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-[#c45627]/10 rounded-lg transition-colors">
              <Settings size={18} className="text-[#c45627]" />
            </button>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#c45627] text-white rounded-lg hover:bg-[#a8401f] transition-colors text-sm sm:text-base font-medium">
              এডিট প্রোফাইল
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Sidebar */}
          <div className="xl:col-span-4 space-y-6 order-1 xl:order-none">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-orange-100">
              {/* Cover */}
              <div className="relative h-28 sm:h-32 bg-gradient-to-r from-[#c45627] via-[#d4651f] to-[#e67317] overflow-hidden">
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all">
                    <Camera size={14} className="sm:size-16" />
                  </button>
                </div>
              </div>

              <div className="relative px-4 sm:px-6 pb-6">
                {/* Profile Picture */}
                <div className="flex justify-center -mt-10 sm:-mt-12 mb-3 sm:mb-4">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face"
                      alt="Profile"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-[#c45627] rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Camera size={12} className="text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Star size={10} className="text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center mb-4 sm:mb-6">
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
                    জন ডো
                  </h1>
                  <p className="text-[#c45627] font-semibold text-sm sm:text-base mb-1">
                    প্রফেশনাল ব্লগার ও রাইটার
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    আমি প্রযুক্তি এবং জীবনযাত্রা নিয়ে লিখি
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-1 text-center bg-gradient-to-br from-[#c45627]/5 to-[#c45627]/10 rounded-xl sm:rounded-2xl py-2 sm:py-3">
                    <div className="text-[10px] sm:text-xs text-gray-600">
                      <BsPostcard size={15} className="text-[#c45627]" />
                    </div>
                    <div className="text-base sm:text-sm font-bold text-[#c45627]">
                      85
                    </div>

                  </div>
                  <div className="flex items-center gap-1 text-center bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-xl sm:rounded-2xl py-2 sm:py-3">
                    <div className="text-[10px] sm:text-xs text-gray-600">
                      <SlUserFollowing size={15} className="text-blue-600" />
                    </div>
                    <div className="text-base sm:text-sm font-bold text-blue-600">
                      12.5K
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-center bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-xl sm:rounded-2xl py-2 sm:py-3">
                    <div className="text-[10px] sm:text-xs text-gray-600">
                      <IoEyeOutline size={15} className="text-green-600" />
                    </div>
                    <div className="text-base sm:text-sm font-bold text-green-600">
                      250K
                    </div>

                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <button className="flex-1 bg-[#c45627] text-white px-2 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold hover:bg-[#a8401f] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-1 sm:gap-2">
                    <UserPlus size={14} className="sm:size-5" />
                    follow
                  </button>
                  <button className="p-2 sm:px-4 sm:py-3 bg-gray-100 text-gray-700 rounded-xl sm:rounded-2xl hover:bg-gray-200">
                    <MessageCircle size={14} />
                  </button>
                  <button className="p-2 sm:px-4 sm:py-3 bg-gray-100 text-gray-700 rounded-xl sm:rounded-2xl hover:bg-gray-200">
                    <Share2 size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Achievements + About */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border border-orange-100">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                সম্পর্কে
              </h3>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Briefcase size={14} className="text-[#c45627]" />
                  <span>সিনিয়র কন্টেন্ট রাইটার - টেক কোম্পানি</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <GraduationCap size={14} className="text-[#c45627]" />
                  <span>কম্পিউটার সাইন্স - ঢাকা বিশ্ববিদ্যালয়</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin size={14} className="text-[#c45627]" />
                  <span>ঢাকা, বাংলাদেশ</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Calendar size={14} className="text-[#c45627]" />
                  <span>জানুয়ারি ২০২২ থেকে</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="xl:col-span-8 space-y-4 sm:space-y-6 order-2 xl:order-none">
            {/* Tabs */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-2 border border-orange-100">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                  {[
                    { key: "posts", label: "ব্লগ পোস্ট", icon: BookOpen },
                    { key: "articles", label: "আর্টিকেল", icon: PenTool },
                    { key: "saved", label: "সংরক্ষিত", icon: Bookmark },
                    { key: "analytics", label: "পরিসংখ্যান", icon: TrendingUp },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-4 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-2 whitespace-nowrap ${activeTab === tab.key
                        ? "bg-[#c45627] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      <tab.icon className="sm:size-5" />
                      {tab.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                  className="p-2 sm:p-3 text-gray-600 hover:bg-gray-50 rounded-xl sm:rounded-2xl transition-colors"
                >
                  <Filter size={14} />
                </button>
              </div>
            </div>

            {/* Posts */}
            {activeTab === "posts" && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
                    : "space-y-4 sm:space-y-6"
                }
              >
                {[1, 2, 3, 4].map((id) => (
                  <article
                    key={id}
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-orange-100 group"
                  >
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop"
                        alt="Post"
                        className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <button className="bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-lg sm:rounded-xl backdrop-blur-sm transition-all">
                          <Bookmark size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-[#c45627] transition-colors cursor-pointer">
                        Example Blog Post {id}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                      <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500">
                        <div className="flex gap-3 sm:gap-4">
                          <div className="flex items-center gap-1">
                            <Eye size={12} /> <span>২.৩K</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp size={12} /> <span>145</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle size={12} /> <span>23</span>
                          </div>
                        </div>
                        <span>২ দিন আগে</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#c45627] to-[#d4651f] text-white rounded-xl sm:rounded-2xl hover:shadow-lg font-semibold transition-all hover:scale-105 text-sm sm:text-base">
                আরও পোস্ট লোড করুন
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
