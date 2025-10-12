"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaUserCircle, FaHeart } from "react-icons/fa";
import { Camera, Settings, Briefcase, GraduationCap, MapPin, Calendar, MessageCircle, Share2, Heart, UserPlus, Languages, Globe, Mail, X, } from "lucide-react";
import { BsPostcard } from "react-icons/bs";
import { SlUserFollowing } from "react-icons/sl";
import { FiEdit, FiPhone } from "react-icons/fi";
import PostField from "@/app/(main)/components/PostField/PostField";

// =======================
// Facebook style date formatter
// =======================
const formatFacebookDate = (dateString) => {
  // ... (Your original date formatting function)
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffDays === 0) {
    if (diffHrs > 0) return `${diffHrs}h ago`;
    if (diffMin > 0) return `${diffMin}m ago`;
    return "Just now";
  }
  if (diffDays === 1) return `Yesterday`;
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  return `${day} ${month}`;
};

// =======================
// Profile Component
// =======================
export default function Profile() {
  const { data: session } = useSession();

  // --- State for Posts ---
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true); // Renamed for clarity

  // --- State for Bio ---
  const [bio, setBio] = useState(""); // Initialize to empty string
  const [tempBio, setTempBio] = useState("");
  const [loadingBio, setLoadingBio] = useState(true); // New loading state for bio
  const [isEditing, setIsEditing] = useState(false);

  // --- State for Images/Details/Modal (kept your original logic) ---
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Default data structure for details
  const [details, setDetails] = useState({
    work: "সিনিয়র কন্টেন্ট রাইটার - টেক কোম্পানি",
    education: "কম্পিউটার সাইন্স - ঢাকা বিশ্ববিদ্যালয়",
    location: "ঢাকা, বাংলাদেশ",
    joined: "জানুয়ারি ২০২২ থেকে",
    skills: ["Content Writing", "SEO", "JavaScript", "React.js", "Teamwork"],
    email: session?.user?.email || "example@email.com", // Use session email if available
    phone: "+8801XXXXXXXXX",
    website: "https://www.yourportfolio.com",
    languages: "বাংলা, English",
    joinedDate: "March 2023",
  });
  const [tempDetails, setTempDetails] = useState(details);

  const hasChanges = JSON.stringify(tempDetails) !== JSON.stringify(details);
  const handleModalCancel = () => {
    setTempDetails(details);
    setIsModalOpen(false);
  };
  const handleModalSave = () => {
    // You would typically save details to a different API endpoint here
    setDetails(tempDetails);
    setIsModalOpen(false);
  };

  // =================================
  // ✅ 1. useEffect to FETCH USER BIO
  // =================================
  useEffect(() => {
    if (!session?.user?.email) {
      setLoadingBio(false);
      return;
    }

    const fetchBio = async () => {
      try {
        // Use the specified endpoint
        const res = await fetch(`/api/edit-bio?email=${session.user.email}`);
        const data = await res.json();

        // The backend now returns data.user.bio
        if (data.success && data.user) {
          setBio(data.user.bio || "");
          setTempBio(data.user.bio || "");
        } else {
          // Set a default bio if not found
          setBio("No bio added yet.");
          setTempBio("No bio added yet.");
        }
      } catch (error) {
        console.error("Error fetching bio:", error);
        setBio("Error loading bio.");
        setTempBio("Error loading bio.");
      } finally {
        setLoadingBio(false);
      }
    };

    fetchBio();
  }, [session?.user?.email]); // Re-run when the session (and email) changes


  // =================================
  // ✅ 2. useEffect to FETCH USER POSTS
  // =================================
  useEffect(() => {
    if (!session?.user?.email) {
      setLoadingPosts(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/get-user-posts?email=${session.user.email}`);
        const data = await res.json();
        if (data.success) {
          setPosts(data.posts);
        } else {
          console.error("Failed to fetch posts:", data.message);
        }
      } catch (err) {
        console.error("Error during post fetch:", err);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [session?.user?.email]); // Re-run when the session (and email) changes


  // =================================
  // ✅ 3. Function to SAVE/PATCH BIO
  // =================================
  const handleSaveBio = async () => {
    if (!session?.user?.email) return;

    // Disable editing while saving
    setIsEditing(false);
    setLoadingBio(true);

    try {
      const res = await fetch("/api/edit-bio", {
        method: "PATCH", // Must match your backend PATCH handler
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          bio: tempBio.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setBio(tempBio.trim());
      } else {
        alert(`Failed to update bio: ${data.message}`);
        // Revert to original bio on failure
        setTempBio(bio);
      }
    } catch (error) {
      console.error("Error updating bio:", error);
      alert("An internal error occurred while saving your bio.");
      setTempBio(bio); // Revert on network/server error
    } finally {
      setLoadingBio(false);
    }
  };

  // Cancel function remains simple
  const handleCancel = () => {
    setTempBio(bio);
    setIsEditing(false);
  };


  // Combine loading states for initial page load
  if (loadingBio || loadingPosts) {
    return <p className="text-center mt-10 text-xl font-medium text-[#c45627]">Loading Profile Data... 🚀</p>;
  }


  return (
    <div className="min-h-screen md:mt-16 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* ================== Profile Header ================== */}
      <div className="relative w-full shadow-md">
        {/* Cover Image ... (Your original code for cover image) */}
        <div className="h-40 sm:h-60 relative bg-gray-200">
          {/* ... (Cover image code) ... */}
          {coverImage && (
            <img
              src={URL.createObjectURL(coverImage)}
              alt="Cover Preview"
              className="w-full h-full object-cover"
            />
          )}
          {/* Cover Image Overlay ... */}
          <label className="absolute top-3 right-3 bg-white/80 hover:bg-white/100 text-gray-900 px-3 py-1 rounded-lg cursor-pointer text-sm flex items-center gap-1 transition-all">
            <Camera size={16} />
            Change Cover
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>

        {/* Profile Image and Name */}
        <div className="relative flex flex-col items-center -mt-16 pb-6 ">
          <div className="relative group">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profile Preview"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            ) : session?.user?.image ? (
              <img
                src={session.user.image} // Displays profile picture from session
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <FaUserCircle size={100} className="text-gray-400 border-4 border-white rounded-full bg-white" /> // Fallback icon
            )}

            {/* Camera icon overlay ... (Your original code for profile image overlay) */}
            <label className="absolute bottom-0 right-0 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer text-white">
              <Camera size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>

          <h1 className="mt-4 text-lg sm:text-2xl font-bold">{session?.user?.name || "Anonymous User"}</h1>
          <p className="text-sm sm:text-base opacity-90">প্রফেশনাল ব্লগার ও রাইটার</p>

          {/* Stats/Edit Button ... (Your original code for stats) */}
          <div className="w-full mt-3 flex justify-between ">
            <div className="px-4 grid grid-cols-2 gap-3 sm:gap-10 text-center">
              <div className="flex flex-col items-center bg-white rounded-xl p-3 shadow-sm border border-orange-100">
                <BsPostcard className="text-[#c45627]" />
                <span className="font-bold text-[#c45627] text-sm sm:text-base mt-1">{posts.length} Posts</span>
              </div>
              <div className="flex flex-col items-center bg-white rounded-xl p-3 shadow-sm border border-orange-100">
                <SlUserFollowing className="text-[#c45627]" />
                <span className="font-bold text-[#c45627] text-sm sm:text-base mt-1">12.5K Followers</span>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="px-4 cursor-pointer text-[#c45627] font-semibold rounded-lg hover:bg-[#fdf4f0] transition-all  gap-1">
                <FiEdit size={30} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <PostField />
      </div>

      {/* ================== Main Content Layout ================== */}
      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: About Section */}
        <div className="lg:col-span-4">
          <div className="bg-white min-h-screen rounded-2xl shadow-lg p-5 border border-orange-100">
            <h3 className="text-lg font-bold text-gray-900">সম্পর্কে</h3>

            {/* --- Bio Section --- */}
            <div className="leading-relaxed pt-4 pb-4">
              {!isEditing ? (
                <>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{bio || "No bio added yet."}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn w-full border-[#c45627] rounded-lg text-[#c45627] mt-3 hover:bg-orange-50 transition"
                  >
                    Edit bio
                  </button>
                </>
              ) : (
                <>
                  <textarea
                    className="w-full h-40 border border-orange-200 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c45627]"
                    rows="8"
                    value={tempBio}
                    onChange={(e) => setTempBio(e.target.value)}
                  />
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleCancel}
                      className="w-1/2 border rounded-lg py-2 text-gray-600 hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveBio} // 👈 Calls the asynchronous function
                      disabled={tempBio.trim() === bio.trim()}
                      className={`w-1/2 rounded-lg py-2 text-white transition ${tempBio.trim() === bio.trim()
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#c45627] hover:bg-[#a9471c]"
                        }`}
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
            </div>
            {/* ... (Rest of your original code for details and modal) ... */}

            {/* --- Basic Info --- */}
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <Briefcase size={14} className="text-[#c45627]" />
                <span>{details.work}</span>
              </div>
              {/* ... (All other details) ... */}
            </div>

            {/* --- Skills --- */}
            <div className="mt-5 border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                দক্ষতা (Skills)
              </h4>
              <div className="flex flex-wrap gap-2">
                {details.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs bg-orange-50 text-[#c45627] rounded-full border border-orange-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* --- Contact Info --- */}
            <div className="mt-5 border-t pt-4 space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[#c45627]" />
                <span>{details.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone size={14} className="text-[#c45627]" />
                <span>{details.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={14} className="text-[#c45627]" />
                <a
                  href={details.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {details.website}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Languages size={14} className="text-[#c45627]" />
                <span>{details.languages}</span>
              </div>
              <div className="flex items-center gap-3">
                <UserPlus size={14} className="text-[#c45627]" />
                <span>Joined: {details.joinedDate}</span>
              </div>
            </div>

            {/* --- Edit Button --- */}
            <div className="mt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn border bg-[#c45627] text-white w-full rounded-lg hover:bg-[#a9471c] transition"
              >
                Edit details
              </button>
            </div>

            {/* --- Edit Modal (Your original modal code) --- */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
                {/* ... (Modal content) ... */}
              </div>
            )}
            {/* --- Modal Animation --- */}
            <style jsx>{`
                            @keyframes slide-up { /* ... */ }
                            .animate-slide-up { /* ... */ }
                        `}</style>
          </div>
        </div>

        {/* Right: Posts Section */}
        <div className="lg:col-span-8 h-screen overflow-y-auto space-y-6">
          {loadingPosts ? (
            <p className="text-center mt-10 text-gray-500">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-center mt-10">কোনো পোস্ট নেই।</p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="rounded-xl p-4 flex flex-col gap-4 border border-gray-200 h-full bg-white shadow-sm hover:shadow-md transition-all"
                >
                  {/* ... (Your original post card code) ... */}
                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      // Ensure profile image fallback is robust
                      src={
                        session?.user?.image && session.user.image !== "null"
                          ? session.user.image
                          : "/defult_profile.jpg"
                      }
                      alt="Author"
                    />
                    <div className="-space-y-1">
                      <p className="text-gray-900 font-medium">{session?.user?.name || "Anonymous User"}</p>
                      <small className="text-gray-500 text-xs">{formatFacebookDate(post.created_at)}</small>
                    </div>
                  </div>

                  {/* ... (Rest of the post content) ... */}
                  {/* Post Image */}
                  {post.featured_image && (
                    <img
                      src={post.featured_image}
                      alt={post.blog_title}
                      className="w-full h-auto max-h-[500px] object-contain rounded-lg"
                    />
                  )}

                  {/* Title */}
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{post.blog_title}</h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm line-clamp-3">{post.description}</p>

                  {/* Stats */}
                  <div className="flex justify-between items-end text-sm text-gray-500 mt-1">
                    <div className="flex items-center gap-1">
                      <FaHeart size={14} color="red" /> <span>{post.likes || 0} Likes</span>
                    </div>
                    <div className="flex items-center gap-5">
                      <span>{post.comment || 0} Comments</span>
                      <span>{post.shares || 0} Shares</span>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  {/* Footer buttons */}
                  <div className="flex justify-around items-center text-gray-600">
                    <button className="flex items-center gap-1 hover:text-red-500 transition">
                      <Heart size={18} /> Like
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition">
                      <MessageCircle size={18} /> Comment
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition">
                      <Share2 size={18} /> Share
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}