"use client";
import React, { useState } from "react";
import { Camera, Edit, MoreHorizontal, MapPin, Briefcase, GraduationCap, Heart, Calendar, Users, MessageCircle, UserPlus, BookOpen, Eye, ThumbsUp, Share2, Bookmark, PenTool, Award } from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState('blogs');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto bg-white">
        {/* Cover Photo Section */}
        <div className="relative">
          <div className="h-80 md:h-96 lg:h-[420px] bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=400&fit=crop"
              alt="Cover"
              className="w-full h-full object-cover opacity-80"
            />
            {/* Cover Photo Edit Button */}
            <button className="absolute bottom-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all shadow-lg">
              <Camera size={16} />
              Edit cover photo
            </button>
          </div>

          {/* Profile Picture */}
          <div className="absolute -bottom-4 left-6 md:left-8">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full border-4 border-white shadow-xl"
              />
              <button className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors shadow-lg">
                <Camera size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="pt-6 px-6 md:px-8 pb-0 ">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="mt-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">জন ডো</h1>
              <p className="text-indigo-600 font-semibold mb-1">প্রফেশনাল ব্লগার ও রাইটার</p>
              <p className="text-gray-600 font-medium mb-2">১২.৫K ফলোয়ার • ৮৫ ব্লগ পোস্ট</p>

              {/* Writer Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>২৫০K+ ভিউ</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp size={16} />
                  <span>১৮.২K লাইক</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award size={16} />
                  <span>টপ রাইটার</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-sm">
                <UserPlus size={16} />
                ফলো করুন
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors">
                <MessageCircle size={16} />
                মেসেজ
              </button>
              <button className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          <hr className="border-gray-300 mt-4" />

          {/* Navigation Tabs */}
          <div className="flex space-x-8 mt-0">
            {[
              { key: 'blogs', label: 'ব্লগ পোস্ট', icon: BookOpen },
              { key: 'about', label: 'সম্পর্কে', icon: Users },
              { key: 'articles', label: 'আর্টিকেল', icon: PenTool },
              { key: 'saved', label: 'সংরক্ষিত', icon: Bookmark }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 font-medium text-sm relative transition-colors flex items-center gap-2 ${activeTab === tab.key
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto mt-6 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - About & Stats */}
          <div className="lg:col-span-1">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">সম্পর্কে</h2>
                <button className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors">
                  <Edit size={16} />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                প্রযুক্তি, জীবনযাত্রা এবং ব্যক্তিগত উন্নয়ন নিয়ে লিখি। আমার লক্ষ্য মানুষের জীবনে ইতিবাচক পরিবর্তন আনা।
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Briefcase size={18} className="mr-3 text-indigo-500" />
                  <span>সিনিয়র কন্টেন্ট রাইটার</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <GraduationCap size={18} className="mr-3 text-indigo-500" />
                  <span>ঢাকা বিশ্ববিদ্যালয়</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-3 text-indigo-500" />
                  <span>ঢাকা, বাংলাদেশ</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-3 text-indigo-500" />
                  <span>জানুয়ারি ২০২২ থেকে</span>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-medium transition-colors">
                বিস্তারিত দেখুন
              </button>
            </div>

            {/* Writing Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">রাইটিং স্ট্যাটস</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">মোট পোস্ট</span>
                  <span className="font-bold text-lg text-indigo-600">৮৫</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">মোট ভিউ</span>
                  <span className="font-bold text-lg text-green-600">২৫০K+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">এই মাসে</span>
                  <span className="font-bold text-lg text-blue-600">১২K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">পজিটিভ রিঅ্যাকশন</span>
                  <span className="font-bold text-lg text-pink-600">৯৮%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Blog Posts */}
          <div className="lg:col-span-3">
            {/* Recent Blog Posts */}
            <div className="space-y-6">
              {[
                {
                  id: 1,
                  title: "রিঅ্যাক্ট দিয়ে আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি করার সহজ উপায়",
                  excerpt: "আজকের দিনে ওয়েব ডেভেলপমেন্টে রিঅ্যাক্ট একটি অত্যন্ত জনপ্রিয় লাইব্রেরি। এই পোস্টে আমি রিঅ্যাক্ট দিয়ে কিভাবে সহজেই একটি আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি করা যায় সে সম্পর্কে আলোচনা করব।",
                  image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop",
                  category: "প্রযুক্তি",
                  readTime: "৮ মিনিট পড়ুন",
                  publishedAt: "২ দিন আগে",
                  likes: 145,
                  comments: 23,
                  views: "২.৩K"
                },
                {
                  id: 2,
                  title: "ডিজিটাল যুগে ব্যক্তিগত উন্নয়নের ১০টি কার্যকর পদ্ধতি",
                  excerpt: "ব্যক্তিগত উন্নয়ন একটি চলমান প্রক্রিয়া। ডিজিটাল যুগে এসে এই প্রক্রিয়া আরও সহজ হয়েছে। এই পোস্টে আমি ১০টি কার্যকর পদ্ধতি নিয়ে আলোচনা করেছি যা আপনার ব্যক্তিগত উন্নয়নে সহায়ক হবে।",
                  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop",
                  category: "ব্যক্তিগত উন্নয়ন",
                  readTime: "১২ মিনিট পড়ুন",
                  publishedAt: "৫ দিন আগে",
                  likes: 289,
                  comments: 45,
                  views: "৪.৭K"
                },
                {
                  id: 3,
                  title: "স্বাস্থ্যকর জীবনযাত্রার জন্য ৫টি সহজ অভ্যাস",
                  excerpt: "স্বাস্থ্যকর জীবনযাত্রা মানে শুধু সঠিক খাবার খাওয়া নয়, এর সাথে জড়িত আছে আরও অনেক বিষয়। এই পোস্টে আমি ৫টি সহজ অভ্যাসের কথা বলেছি যা আপনার জীবনযাত্রার মান উন্নত করবে।",
                  image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop",
                  category: "স্বাস্থ্য",
                  readTime: "৬ মিনিট পড়ুন",
                  publishedAt: "১ সপ্তাহ আগে",
                  likes: 178,
                  comments: 32,
                  views: "৩.১K"
                }
              ].map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="text-gray-500 text-sm">{post.publishedAt}</span>
                        <span className="text-gray-500 text-sm">•</span>
                        <span className="text-gray-500 text-sm">{post.readTime}</span>
                      </div>

                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 hover:text-indigo-600 cursor-pointer line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye size={16} />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp size={16} />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle size={16} />
                            <span>{post.comments}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Heart size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                            <Share2 size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                            <Bookmark size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors">
                আরও ব্লগ পোস্ট দেখুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}