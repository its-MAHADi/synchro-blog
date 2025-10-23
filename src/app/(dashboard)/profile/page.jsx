"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Briefcase,
  Camera,
  Globe,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  X,
} from "lucide-react";
import { BsPostcard } from "react-icons/bs";
import { SlUserFollowing } from "react-icons/sl";
import { FiEdit, FiPhone } from "react-icons/fi";
import Swal from "sweetalert2";
import Link from "next/link";



async function getUserByEmail(email) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/user?email=${email}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch user");

    return res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}



// Format date similar to Facebook
const formatFacebookDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  const mins = Math.floor(diff / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (days === 0) return hours > 0 ? `${hours}h ago` : mins > 0 ? `${mins}m ago` : "Just now";
  if (days === 1) return "Yesterday";
  return `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
};

export default function Profile() {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState("");
  const [tempBio, setTempBio] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [tempDetails, setTempDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const hasChanges = JSON.stringify(details) !== JSON.stringify(tempDetails);

  // Search & Sort states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");





  useEffect(() => {
    async function fetchUserData() {
      if (session?.user?.email) {
        const data = await getUserByEmail(session.user.email);
        setUserData(data);
      }
    }

    fetchUserData();
  }, [session?.user?.email]);


  
  useEffect(() => {
    if (userData) {
      console.log("✅ User data fetched:", userData);
    }
  }, [userData]);


  // ===== FETCH USER DATA =====
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const email = session.user.email;
        const [bioRes, postsRes, detailsRes] = await Promise.all([
          fetch(`/api/edit-bio?email=${email}`),
          fetch(`/api/get-user-posts?email=${email}`),
          fetch(`/api/user-details?email=${email}`),
        ]);

        const bioData = await bioRes.json();
        const postsData = await postsRes.json();
        const detailsData = await detailsRes.json();

        setBio(bioData?.user?.bio || "No bio added yet.");
        setTempBio(bioData?.user?.bio || "No bio added yet.");
        setPosts(postsData?.posts || []);
        setDetails(detailsData?.user || {});
        setTempDetails(detailsData?.user || {});
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.user?.email]);

  // ===== BIO HANDLERS =====
  const handleSaveBio = async () => {
    try {
      const res = await fetch("/api/edit-bio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          bio: tempBio.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) setBio(tempBio.trim());
    } catch (err) {
      console.error(err);
    } finally {
      setIsEditingBio(false);
    }
  };

  const handleCancelBio = () => {
    setTempBio(bio);
    setIsEditingBio(false);
  };

  // ===== DETAILS MODAL HANDLERS =====
  const handleModalCancel = () => {
    setTempDetails(details);
    setIsModalOpen(false);
  };

  const handleModalSave = async () => {
    if (!session?.user?.email || !hasChanges) return;

    try {
      const res = await fetch("/api/user-details", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email, ...tempDetails }),
      });

      const data = await res.json();

      if (data.success) {
        setDetails({ ...details, ...tempDetails });
        setTempDetails({ ...details, ...tempDetails });
        setIsModalOpen(false);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });

        setTimeout(() => window.location.reload(), 1600);
      } else {
        Swal.fire({ icon: "error", title: "Error", text: data.message || "Failed to update profile" });
      }
    } catch (err) {
      console.error("Update user details error:", err);
      Swal.fire({ icon: "error", title: "Error", text: "An error occurred while updating profile." });
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-xl text-[#0000FF] min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </p>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* HEADER */}
      <div className="relative w-full shadow-md">
        <div className="h-40 sm:h-60 relative bg-gray-200">
          {coverImage ? (
            <img src={URL.createObjectURL(coverImage)} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#0000FF]"></div>
          )}
          <label className="absolute top-3 right-3 bg-white/80 text-gray-900 px-3 py-1 rounded-lg cursor-pointer text-sm flex items-center gap-1 hover:bg-white transition">
            <Camera size={16} /> Change Cover
            <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} className="hidden" />
          </label>
        </div>

        <div className="relative flex flex-col items-center -mt-16 pb-6">
          <div className="relative group">
            <img
              src={profileImage ? URL.createObjectURL(profileImage) : session?.user?.image || "/defult_profile.jpg"}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover"
              alt="Profile"
            />
            <label className="absolute bottom-0 right-0 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white cursor-pointer">
              <Camera size={16} />
              <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} className="hidden" />
            </label>
          </div>

          <h1 className="mt-4 text-xl font-bold">{session?.user?.name || "Anonymous User"}</h1>
          <p className="text-sm opacity-80">Professional Blogger & Writer</p>

          <div className="w-full mt-3 flex justify-between ">
            <div className="px-4 grid grid-cols-2 gap-3 sm:gap-10 text-center">
              <div className="flex flex-col items-center bg-white rounded-xl p-3 shadow-sm border border-orange-100">
                <BsPostcard className="text-[#0000FF]" />
                <span className="font-bold text-[#0000FF] text-sm sm:text-base mt-1">{posts.length} Posts</span>
              </div>
              <div className="flex flex-col items-center bg-white rounded-xl p-3 shadow-sm border border-orange-100">
                <SlUserFollowing className="text-[#0000FF]" />
                <span className="font-bold text-[#0000FF] text-sm sm:text-base mt-1">12.5K Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-8 g">
        {/* LEFT: ABOUT */}
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-orange-100 self-start lg:sticky top-18">
          <h3 className="text-lg font-bold text-gray-900 mb-3">About</h3>

          {/* BIO */}
          {!isEditingBio ? (
            <>
              <p className="text-gray-600 text-sm whitespace-pre-line">{bio}</p>
              <button
                onClick={() => setIsEditingBio(true)}
                className="w-full border border-[#0000FF] text-[#0000FF] rounded-lg mt-3 py-2 hover:bg-orange-50 transition"
              >
                Edit Bio
              </button>
            </>
          ) : (
            <>
              <textarea
                className="w-full h-32 border border-orange-200 rounded-lg p-3 text-sm text-gray-700 focus:ring-2 focus:ring-[#0000FF]"
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
              />
              <div className="flex gap-2 mt-3">
                <button onClick={handleCancelBio} className="w-1/2 border rounded-lg py-2 text-gray-600 hover:bg-gray-100">Cancel</button>
                <button
                  onClick={handleSaveBio}
                  disabled={tempBio.trim() === bio.trim()}
                  className={`w-1/2 rounded-lg py-2 text-white transition ${tempBio.trim() === bio.trim() ? "bg-gray-300 cursor-not-allowed" : "bg-[#0000FF] hover:bg-[#a9471c]"}`}
                >
                  Save
                </button>
              </div>
            </>
          )}

          {/* DETAILS */}
          <div className="mt-6 space-y-3 text-sm text-gray-700">
            {/* Work */}
            <div className="flex items-center gap-3">
              <Briefcase size={14} className="text-[#0000FF]" />
              <span>{details?.work || "Add work"}</span>
            </div>

            {/* Education */}
            <div className="flex items-center gap-3">
              <GraduationCap size={14} className="text-[#0000FF]" />
              <span>{details?.education || "Add education"}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-[#0000FF]" />
              <span>{details?.location || "Add location"}</span>
            </div>
          </div>


          {/* SKILLS */}
          {details?.skills && (
            <div className="mt-5 border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  let skillsArray = [];

                  if (Array.isArray(details.skills)) {
                    skillsArray = details.skills;
                  } else if (typeof details.skills === "string") {
                    skillsArray = details.skills.split(",").map((s) => s.trim()).filter(Boolean);
                  }

                  return skillsArray.length > 0 ? (
                    skillsArray.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-orange-50 text-[#0000FF] rounded-full border border-orange-200"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Unknown</span>
                  );
                })()}
              </div>
            </div>
          )}


          {/* CONTACT & LINKS */}
          <div className="mt-5 border-t pt-4 space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-3"><Mail size={14} className="text-[#0000FF]" /><span>{details.contact_email || "Add email"}</span></div>
            <div className="flex items-center gap-3"><FiPhone size={14} className="text-[#0000FF]" /><span>{details.contact_number || "Add number"}</span></div>
            <div className="flex items-center gap-3"><Globe size={14} className="text-[#0000FF]" /><a href={details.website || "#"} className="text-blue-600 hover:underline">{details.website || "https://example.com"}</a></div>
            <div className="flex items-center gap-3"><Languages size={14} className="text-[#0000FF]" /><span>{details.languages || "Add language"}</span></div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-4 border bg-[#0000FF] text-white rounded-lg py-2 hover:bg-[#a9471c] transition"
          >
            Edit Details
          </button>
        </div>
      </main>

      {/* DETAILS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-full sm:max-w-lg rounded-xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto animate-slide-up">
            <button onClick={handleModalCancel} className="absolute top-3 right-3 text-gray-500 hover:text-black"><X size={22} /></button>
            <h3 className="text-xl font-semibold text-gray-800 mb-5 text-center border-b pb-3">Edit Details</h3>

            <div className="space-y-4 text-sm">
              {["work", "education", "location", "skills", "contact_email", "contact_number", "website", "languages"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-600 font-medium mb-1">{field.replace("_", " ").toUpperCase()}</label>
                  <input
                    type={field.includes("email") ? "email" : "text"}
                    value={tempDetails[field] || ""}
                    onChange={(e) => setTempDetails({ ...tempDetails, [field]: e.target.value })}
                    placeholder={`Enter ${field.replace("_", " ")}`}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0000FF] outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6 border-t pt-4">
              <button onClick={handleModalCancel} className="w-1/2 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition">Cancel</button>
              <button
                onClick={handleModalSave}
                disabled={!hasChanges}
                className={`w-1/2 py-2 rounded-lg text-white transition ${!hasChanges ? "bg-gray-300 cursor-not-allowed" : "bg-[#0000FF] hover:bg-[#a9471c]"}`}
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
