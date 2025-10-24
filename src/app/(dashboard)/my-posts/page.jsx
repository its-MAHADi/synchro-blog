"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { X } from "lucide-react";
import Swal from "sweetalert2";
import PostCartOfMP from "./PostCartOfMP";

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

export default function MyPostsPage() {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [bio, setBio] = useState("");
  const [tempBio, setTempBio] = useState("");
  const [tempDetails, setTempDetails] = useState({});

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    blog_title: "",
    description: "",
    featured_image: "",
    tags: "",
    read_time: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  // Disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isEditModalOpen ? "hidden" : "auto";
  }, [isEditModalOpen]);

  // ===== EDIT POST =====
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
    setImageFile(null);
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload (click or drag)
  const handleImageChange = (e) => {
    let file;
    if (e.dataTransfer?.files[0]) file = e.dataTransfer.files[0];
    else if (e.target?.files[0]) file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setEditFormData((prev) => ({
        ...prev,
        featured_image: URL.createObjectURL(file),
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageChange(e);
  };

  // ===== SAVE EDITED POST =====
  const handleSaveEditedPost = async () => {
    if (!selectedPost?._id) return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      let finalImageUrl = editFormData.featured_image;

      if (imageFile) {
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          { method: "POST", body: formData }
        );
        const uploadData = await uploadRes.json();
        if (!uploadData.success) throw new Error("Image upload failed");
        finalImageUrl = uploadData.data.url;
      }

      const payload = {
        blog_id: selectedPost._id,
        blog_title: editFormData.blog_title,
        description: editFormData.description,
        featured_image: finalImageUrl,
      };

      const res = await fetch(`/api/edit-single-post`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
          prev.map((p) => (p._id === selectedPost._id ? { ...p, ...payload } : p))
        );
        setIsEditModalOpen(false);
      } else {
        throw new Error(data.message || "Update failed");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Unable to update post.",
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
      confirmButtonColor: "#0000FF",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/delete-single-post?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1500,
          showConfirmButton: false,
        });
        setPosts((prev) => prev.filter((p) => p._id !== id));
      } else {
        throw new Error(data.message || "Delete failed");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Unable to delete post.",
      });
    }
  };

  // ===== SEARCH & SORT =====
  const filteredPosts = posts
    .filter(
      (p) =>
        p.blog_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
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

        setBio(bioData?.user?.bio || "");
        setTempBio(bioData?.user?.bio || "");
        setPosts(postsData?.posts || []);
        setDetails(detailsData?.user || {});
        setTempDetails(detailsData?.user || {});
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.user?.email]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-[#0000FF]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <h1 className="px-4 md:px-8 text-2xl md:text-3xl font-semibold text-center">My Posts</h1>
      <main className="px-4 md:px-8  mx-auto py-8">
        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0000FF] outline-none"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full sm:w-1/4 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0000FF] outline-none bg-white"
          >
            <option value="default">🔁 Default</option>
            <option value="newest">🕒 Newest</option>
            <option value="oldest">📅 Oldest</option>
            <option value="title-asc">🔤 Title (A–Z)</option>
            <option value="title-desc">🔡 Title (Z–A)</option>
          </select>
        </div>

        <div className="flex flex-col gap-4">
          {/* Posts */}
          {filteredPosts.length === 0 ? (
            <div className="text-center text-gray-500 bg-white p-10 rounded-xl shadow-sm">
              No posts found.
            </div>
          ) : (
            filteredPosts.map((post) => (
              <PostCartOfMP
                key={post._id}
                post={post}
                session={session}
                handleEditPost={handleEditPost}
                handleDeletePost={handleDeletePost}
                formatFacebookDate={formatFacebookDate}
              />
            ))
          )}
        </div>

      </main>

      {/* Edit Post Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full sm:max-w-xl md:max-w-2xl rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={22} />
            </button>

            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Edit Post</h2>
              <p className="text-sm text-gray-500 mt-1">
                Update your blog title, description, or featured image below.
              </p>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
              <div>
                <label className="block text-sm font-medium mb-1">Blog Title</label>
                <input
                  type="text"
                  name="blog_title"
                  value={editFormData.blog_title}
                  onChange={handleEditInputChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-[#0000FF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditInputChange}
                  rows={5}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-[#0000FF] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Featured Image</label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("fileInput").click()}
                  className={`relative flex justify-center items-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition
                    ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}
                >
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="text-center">
                    <p className="text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>

                {editFormData.featured_image && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-1">Preview</p>
                    <img
                      src={editFormData.featured_image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditedPost}
                className="px-5 py-2.5 bg-[#0000FF] text-white rounded-lg hover:bg-[#0000d6] transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
