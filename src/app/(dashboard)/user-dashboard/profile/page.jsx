"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaHeart } from "react-icons/fa";
import {
  Briefcase,
  Camera, Globe, GraduationCap, Languages, Mail, MapPin, X,
} from "lucide-react";
import { BsPostcard } from "react-icons/bs";
import { SlUserFollowing } from "react-icons/sl";
import { FiEdit, FiPhone } from "react-icons/fi";
import PostField from "@/app/(main)/components/PostField/PostField";
import Swal from "sweetalert2";

// Facebook-style date formatter
const formatFacebookDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  const mins = Math.floor(diff / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (days === 0) {
    if (hours > 0) return `${hours}h ago`;
    if (mins > 0) return `${mins}m ago`;
    return "Just now";
  }
  if (days === 1) return "Yesterday";
  return `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
};

export default function Profile() {

  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState("");
  const [tempBio, setTempBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [tempDetails, setTempDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    blog_title: "",
    description: "",
    featured_image: "",
    tags: "",
    read_time: "",
  });

  const hasChanges = JSON.stringify(details) !== JSON.stringify(tempDetails);


  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  // ===== EDIT POST HANDLERS =====
  const handleEditPost = (post) => {
    setSelectedPost(post);
    setEditFormData({
      blog_id: post._id,
      blog_title: post.blog_title || "",
      description: post.description || "",
      featured_image: post.featured_image || "",
      tags: post.tags || "",
      read_time: post.read_time || "",
    });
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEditedPost = async () => {
    if (!selectedPost?._id) return;
    const confirm = await Swal.fire({
      title: "Update this post?",
      text: "Your changes will be saved permanently.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#c45627",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/edit-single-post`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blog_id: selectedPost._id,
          blog_title: editFormData.blog_title,
          description: editFormData.description,
          featured_image: editFormData.featured_image,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Post Updated!",
          timer: 1500,
          showConfirmButton: false,
        });

        setPosts((prev) =>
          prev.map((p) =>
            p._id === selectedPost._id ? { ...p, ...editFormData } : p
          )
        );

        setIsEditModalOpen(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to update",
          text: data.message || "Something went wrong.",
        });
      }
    } catch (err) {
      console.error("Error updating post:", err);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to update post right now.",
      });
    }
  };

  // ===== DELETE POST =====
  const handleDeletePost = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This post will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#c45627",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/delete-single-post?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your post has been removed.",
          timer: 1500,
          showConfirmButton: false,
        });

        setPosts((prev) => prev.filter((p) => p._id !== id));
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to delete",
          text: data.message || "Something went wrong.",
        });
      }
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to delete post right now.",
      });
    }
  };

  // ===== SEARCH & SORT =====
  const filteredPosts = posts
    .filter(
      (post) =>
        post.blog_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "newest") return new Date(b.created_at) - new Date(a.created_at);
      if (sortOption === "oldest") return new Date(a.created_at) - new Date(b.created_at);
      if (sortOption === "title-asc") return a.blog_title.localeCompare(b.blog_title);
      if (sortOption === "title-desc") return b.blog_title.localeCompare(a.blog_title);
      return 0;
    });

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

  // ===== EDIT BIO =====
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
      setIsEditing(false);
    }
  };

  const handleCancelBio = () => {
    setTempBio(bio);
    setIsEditing(false);
  };

  // ============= MODAL HANDLERS FOR DETAILS =============
  const handleModalCancel = () => {
    setTempDetails(details); // Reset temporary state to original
    setIsModalOpen(false);
  };

  // ============= MODAL HANDLERS FOR DETAILS =============
  const handleModalSave = async () => {
    if (!session?.user?.email || !hasChanges) return;

    const defaultDetailsStructure = {
      work: "",
      education: "",
      location: "",
      skills: "",
      website: "",
      languages: "",
      contact_email: "",
      contact_number: "",
    };

    try {
      const res = await fetch("/api/user-details", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          ...tempDetails,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const newDetails = { ...defaultDetailsStructure, ...data.user };
        setDetails(newDetails);
        setTempDetails(newDetails);
        setIsModalOpen(false);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });

        // ✅ Reload page after short delay
        setTimeout(() => {
          window.location.reload();
        }, 1600);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to update profile",
        });
      }
    } catch (err) {
      console.error("Update user details error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating profile.",
      });
    }
  };


  if (loading) {
    return (
      <p className="text-center mt-10 text-xl text-[#c45627] min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </p>
    );
  }

  // ===== MAIN RENDER =====
  return (
    <div className="min-h-screen md:mt-16 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
      {/* HEADER */}
      <div className="relative w-full shadow-md">
        <div className="h-40 sm:h-60 relative bg-gray-200">
          {coverImage ? (
            <img src={URL.createObjectURL(coverImage)} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#c45627]"></div> // Placeholder
          )}
          <label className="absolute top-3 right-3 bg-white/80 text-gray-900 px-3 py-1 rounded-lg cursor-pointer text-sm flex items-center gap-1 hover:bg-white transition">
            <Camera size={16} />
            Change Cover
            <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} className="hidden" />
          </label>
        </div>

        {/* Profile Image + Name */}
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

          {/* Stats */}
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
              <button className="px-4 cursor-pointer text-[#c45627] font-semibold rounded-lg hover:bg-[#fdf4f0] transition-all  gap-1">
                <FiEdit size={30} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* POST FIELD */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <PostField />
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: ABOUT */}
        <div className="lg:col-span-4 bg-white rounded-2xl shadow-lg p-5 border border-orange-100 self-start lg:sticky top-18">
          <h3 className="text-lg font-bold text-gray-900 mb-3">About</h3>

          {/* BIO */}
          {!isEditing ? (
            <>
              <p className="text-gray-600 text-sm whitespace-pre-line">{bio}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full border border-[#c45627] text-[#c45627] rounded-lg mt-3 py-2 hover:bg-orange-50 transition"
              >
                Edit Bio
              </button>
            </>
          ) : (
            <>
              <textarea
                className="w-full h-32 border border-orange-200 rounded-lg p-3 text-sm text-gray-700 focus:ring-2 focus:ring-[#c45627]"
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
              />
              <div className="flex gap-2 mt-3">
                <button onClick={handleCancelBio} className="w-1/2 border rounded-lg py-2 text-gray-600 hover:bg-gray-100">Cancel</button>
                <button
                  onClick={handleSaveBio}
                  disabled={tempBio.trim() === bio.trim()}
                  className={`w-1/2 rounded-lg py-2 text-white transition ${tempBio.trim() === bio.trim() ? "bg-gray-300 cursor-not-allowed" : "bg-[#c45627] hover:bg-[#a9471c]"}`}
                >
                  Save
                </button>
              </div>
            </>
          )}
          <div className="mt-6 space-y-3 text-sm text-gray-700">
            {/* FIX: Use details?.work instead of details.work */}
            {details?.work ? <div className="flex items-center gap-3"><Briefcase size={14} className="text-[#c45627]" /><span>{details.work}</span></div> :
              <div className="flex items-center gap-3"><Briefcase size={14} className="text-[#c45627]" /><span>add work</span></div>
            }
            {details?.education ? <div className="flex items-center gap-3"><GraduationCap size={14} className="text-[#c45627]" /><span>{details.education}</span></div>
              :
              <div className="flex items-center gap-3"><GraduationCap size={14} className="text-[#c45627]" /><span>add education</span></div>
            }
            {details?.location ? <div className="flex items-center gap-3"><MapPin size={14} className="text-[#c45627]" /><span>{details.location}</span></div>
              :
              <div className="flex items-center gap-3"><MapPin size={14} className="text-[#c45627]" /><span>add location</span></div>
            }
          </div>
          {details?.skills && (() => {
            // Convert skills to a clean array safely
            const skillsArray = Array.isArray(details.skills)
              ? details.skills.map(s => s.trim()).filter(Boolean)
              : typeof details.skills === "string"
                ? details.skills.split(",").map(s => s.trim()).filter(Boolean)
                : [];

            // Only render if there’s at least one valid skill
            return skillsArray.length > 0 ? (
              <div className="mt-5 border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {skillsArray.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-orange-50 text-[#c45627] rounded-full border border-orange-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : null;
          })()}


          <div className="mt-5 border-t pt-4 space-y-3 text-sm text-gray-700">
            {details?.contact_email ? <div className="flex items-center gap-3"><Mail size={14} className="text-[#c45627]" /><span>{details.contact_email}</span></div> :
              <div className="flex items-center gap-3"><Mail size={14} className="text-[#c45627]" /><span>add email</span></div>
            }
            {details?.contact_number ? <div className="flex items-center gap-3"><FiPhone size={14} className="text-[#c45627]" /><span>{details.contact_number}</span></div>
              :
              <div className="flex items-center gap-3"><FiPhone size={14} className="text-[#c45627]" /><span>add number</span></div>
            }
            {details?.website ? <div className="flex items-center gap-3"><Globe size={14} className="text-[#c45627]" /><a href={details.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{details.website}</a></div>
              :
              <div className="flex items-center gap-3"><Globe size={14} className="text-[#c45627]" /><a className="text-blue-600 hover:underline">https://example.com</a></div>
            }
            {details?.languages ? <div className="flex items-center gap-3"><Languages size={14} className="text-[#c45627]" /><span>{details?.languages}</span></div>
              :
              <div className="flex items-center gap-3"><Languages size={14} className="text-[#c45627]" /><span>add language</span></div>
            }
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-4 border bg-[#c45627] text-white rounded-lg py-2 hover:bg-[#a9471c] transition"
          >
            Edit Details
          </button>
          {/* </div> */}
        </div>


        {/* RIGHT: POSTS */}
        <div className="lg:col-span-8 space-y-6">
          {/* SEARCH & SORT */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-1/2 border border-orange-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#c45627] outline-none"
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full sm:w-1/4 border border-orange-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#c45627] outline-none bg-white"
            >
              <option value="default">🔁 Default</option>
              <option value="newest">🕒 Newest</option>
              <option value="oldest">📅 Oldest</option>
              <option value="title-asc">🔤 Title (A–Z)</option>
              <option value="title-desc">🔡 Title (Z–A)</option>
            </select>
          </div>

          {/* POSTS LIST */}
          {filteredPosts.length === 0 ? (
            <div className="text-center text-gray-500 bg-white p-10 rounded-xl shadow-sm">
              No posts found.
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post._id}
                className="rounded-xl p-4 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={session?.user?.image || "/defult_profile.jpg"}
                    alt="Author"
                  />
                  <div>
                    <p className="text-gray-900 font-medium">{session?.user?.name}</p>
                    <small className="text-gray-500 text-xs">{formatFacebookDate(post.created_at)}</small>
                  </div>
                </div>

                {post.featured_image && (
                  <img
                    src={post.featured_image}
                    alt={post.blog_title}
                    className="w-full max-h-[400px] object-cover mt-3 rounded-lg"
                  />
                )}

                <h2 className="text-lg font-semibold mt-3">{post.blog_title}</h2>
                <p className="text-gray-600 text-sm mt-1">{post.description}</p>

                <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaHeart className="text-red-500" /> {post.likes || 0} Likes
                  </div>
                  <div>
                    {post.comment || 0} Comments · {post.shares || 0} Shares
                  </div>
                </div>

                <div className="flex justify-between mt-5">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="px-4 py-2 bg-[#c45627] text-white font-semibold rounded-xl hover:bg-[#a9471c]"
                  >
                    Edit Post
                  </button>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="px-4 py-2 border border-[#c45627] text-[#c45627] font-semibold rounded-xl hover:bg-[#c45627] hover:text-white"
                  >
                    Delete Post
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </main>

      {/* ===== EDIT POST MODAL ===== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-bold mb-4">Edit Post</h2>
            <input
              type="text"
              name="blog_title"
              value={editFormData.blog_title}
              onChange={handleEditInputChange}
              placeholder="Post Title"
              className="w-full mb-3 border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#c45627]"
            />
            <textarea
              name="description"
              value={editFormData.description}
              onChange={handleEditInputChange}
              placeholder="Description"
              className="w-full mb-3 border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#c45627]"
            />
            <input
              type="text"
              name="featured_image"
              value={editFormData.featured_image}
              onChange={handleEditInputChange}
              placeholder="Featured Image URL"
              className="w-full mb-3 border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#c45627]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditedPost}
                className="px-4 py-2 bg-[#c45627] text-white rounded-lg hover:bg-[#a9471c]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Details */}
      {
        isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
            <div className="bg-white w-full sm:max-w-lg rounded-xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto animate-slide-up">
              {/* Close button */}
              <button
                onClick={handleModalCancel}
                className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
              >
                <X size={22} />
              </button>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-5 text-center border-b pb-3">
                Edit Details
              </h3>

              {/* Form fields */}
              <div className="space-y-4 text-sm">
                {[
                  { label: "Work / Profession", field: "work" },
                  { label: "Education", field: "education" },
                  { label: "Location", field: "location" },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <label className="block text-gray-600 font-medium mb-1">{label}</label>
                    <input
                      type="text"
                      value={tempDetails[field] || ""}
                      onChange={(e) => setTempDetails({ ...tempDetails, [field]: e.target.value })}
                      placeholder={label}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#c45627] outline-none"
                    />
                  </div>
                ))}

                {/* Skills, Contact, Website, Languages */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Skills (comma separated)</label>
                  <input
                    type="text"
                    value={tempDetails.skills || ""}
                    onChange={(e) => setTempDetails({ ...tempDetails, skills: e.target.value })}
                    placeholder="Write your skills"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#c45627] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={tempDetails.contact_email || ""}
                    onChange={(e) => setTempDetails({ ...tempDetails, contact_email: e.target.value })}
                    placeholder="example@email.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#c45627] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={tempDetails.contact_number || ""}
                    onChange={(e) => setTempDetails({ ...tempDetails, contact_number: e.target.value })}
                    placeholder="+8801XXXXXXXXX"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#c45627] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Website</label>
                  <input
                    type="text"
                    value={tempDetails.website || ""}
                    onChange={(e) => setTempDetails({ ...tempDetails, website: e.target.value })}
                    placeholder="https://yourportfolio.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#c45627] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Languages (comma separated)</label>
                  <input
                    type="text"
                    value={tempDetails.languages || ""}
                    onChange={(e) => setTempDetails({ ...tempDetails, languages: e.target.value })}
                    placeholder="Bangla, English"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#c45627] outline-none"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6 border-t pt-4">
                <button
                  onClick={handleModalCancel}
                  className="w-1/2 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleModalSave}
                  disabled={!hasChanges}
                  className={`w-1/2 py-2 rounded-lg text-white transition ${!hasChanges
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#c45627] hover:bg-[#a9471c]"
                    }`}
                >
                  Save Details
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
