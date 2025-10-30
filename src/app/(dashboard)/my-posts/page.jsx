"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { X } from "lucide-react";
import Swal from "sweetalert2";
import PostCartOfMP from "./PostCartOfMP";
import MyPostsLoading from "./loading";

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

const professionFields = {
  Developer: [
    { name: "projectTitle", label: "Project Title", type: "text" },
    { name: "projectOverView", label: "Project OverView", type: "text" },
    { name: "techStack", label: "Tech Stack (React, Node, MongoDB, etc.)", type: "text" },
    { name: "githubRepo", label: "GitHub Repo Link", type: "url" },
    { name: "liveDemo", label: "Live Demo Link", type: "url" },
    { name: "projectDuration", label: "Project Duration (e.g., 2 months)", type: "number" },
    { name: "toolsUsed", label: "Tools Used (VS Code, Figma, etc.)", type: "text" },
    { name: "keyFeatures", label: "Key Features", type: "textarea" },
    { name: "challenges", label: "Challenges Faced", type: "textarea" },
    { name: "futureImprovements", label: "Future Improvements", type: "textarea" },
    // { name: "projectImage", label: "Upload Project Image", type: "file" },
  ],

  Writer: [
    { name: "storyTitle", label: "Story / Article Title", type: "text" },
    { name: "genre", label: "Genre (Story, Poem, Motivation, etc.)", type: "text" },
    { name: "writingStyle", label: "Writing Style (Narrative, Creative, Descriptive)", type: "text" },
    { name: "summary", label: "Summary", type: "textarea" },
    { name: "fullContent", label: "Full Content", type: "textarea" },
    { name: "inspiration", label: "Inspiration Source (optional)", type: "textarea" },
    // { name: "coverImage", label: "Upload Cover Image", type: "file" },
  ],

  Blogger: [
    { name: "blogTitle", label: "Blog Title", type: "text" },
    { name: "topic", label: "Topic (Lifestyle, Opinion, Technology)", type: "text" },
    { name: "content", label: "Content", type: "textarea" },
    { name: "references", label: "References or Links (optional)", type: "text" },
    { name: "keywords", label: "Keywords (SEO tags)", type: "text" },
    { name: "mood", label: "Mood (Happy, Sad, Informative, etc.)", type: "text" },
  ],

  Designer: [
    { name: "designTitle", label: "Design Title", type: "text" },
    { name: "designCategory", label: "Design Category (UI/UX, Branding, 3D, Logo)", type: "text" },
    { name: "toolsUsed", label: "Tools Used (Figma, Photoshop, etc.)", type: "text" },
    { name: "designProcess", label: "Design Process", type: "textarea" },
    { name: "clientProject", label: "Client / Project Type (optional)", type: "text" },
    { name: "inspirationSource", label: "Inspiration Source (URL or text)", type: "text" },
    { name: "feedbackNote", label: "Feedback Note (optional)", type: "textarea" },
  ],

  Photographer: [
    { name: "photoTitle", label: "Photo Title", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "cameraModel", label: "Camera Model", type: "text" },
    { name: "lensUsed", label: "Lens Used (optional)", type: "text" },
    { name: "shootingMode", label: "Shooting Mode (Manual, Auto, etc.)", type: "text" },
    { name: "photoStory", label: "Story Behind the Shot", type: "textarea" },
    { name: "editingSoftware", label: "Editing Software (if any)", type: "text" },
  ],

  Marketer: [
    { name: "blogTitle", label: "Blog Title", type: "text" },
    { name: "marketingType", label: "Marketing Type (SEO, Social Media, Branding)", type: "text" },
    { name: "strategyDescription", label: "Strategy Description", type: "textarea" },
    { name: "caseStudy", label: "Case Study Example", type: "textarea" },
    { name: "targetAudience", label: "Target Audience", type: "text" },
    { name: "toolsUsed", label: "Tools Used (Ahrefs, Canva, etc.)", type: "text" },
    { name: "keyResult", label: "Key Result or Outcome (optional)", type: "text" },

  ],

  Teacher: [
    { name: "lessonTitle", label: "Lesson / Topic Title", type: "text" },
    { name: "subject", label: "Subject", type: "text" },
    { name: "gradeLevel", label: "Grade / Level", type: "text" },
    { name: "learningObjectives", label: "Learning Objectives", type: "textarea" },
    { name: "lessonContent", label: "Lesson Content", type: "textarea" },
    { name: "resourceLinks", label: "Resource / Reference Links", type: "text" },

  ],

  Traveler: [
    { name: "destinationName", label: "Destination Name", type: "text" },
    { name: "tripTitle", label: "Trip Title", type: "text" },
    { name: "countryCity", label: "Country / City", type: "text" },
    { name: "duration", label: "Duration (e.g., 5 Days)", type: "text" },
    { name: "budget", label: "Budget", type: "text" },
    { name: "travelStory", label: "Travel Story", type: "textarea" },
    { name: "tips", label: "Tips for Travelers", type: "text" },
    { name: "bestTime", label: "Best Time to Visit", type: "text" },
  ],

  Foodie: [
    { name: "recipeName", label: "Recipe Name", type: "text" },
    { name: "cuisineType", label: "Cuisine Type", type: "text" },
    { name: "ingredients", label: "Ingredients", type: "textarea" },
    { name: "cookingSteps", label: "Cooking Steps", type: "textarea" },
    { name: "prepTime", label: "Preparation Time", type: "text" },
    { name: "cookingTime", label: "Cooking Time", type: "text" },
    { name: "difficultyLevel", label: "Difficulty Level (Easy/Medium/Hard)", type: "text" },
    { name: "tasteRating", label: "Taste Rating (1–5)", type: "number" },
  ],

  HealthFitnessExpert: [
    { name: "postTitle", label: "Post Title", type: "text" },
    { name: "topic", label: "Topic (Workout, Diet, Motivation)", type: "text" },
    { name: "routineDescription", label: "Routine Description", type: "textarea" },
    { name: "equipmentNeeded", label: "Equipment Needed (optional)", type: "text" },
    { name: "durationFrequency", label: "Duration / Frequency", type: "text" },
    { name: "nutritionAdvice", label: "Nutrition Advice", type: "textarea" },
  ],

  Entrepreneur: [
    { name: "startupName", label: "Startup / Business Name", type: "text" },
    { name: "industryType", label: "Industry Type", type: "text" },
    { name: "foundingStory", label: "Founding Story", type: "textarea" },
    { name: "challengesFaced", label: "Challenges Faced", type: "textarea" },
    { name: "achievements", label: "Achievements / Milestones", type: "textarea" },
    { name: "fundingInfo", label: "Funding Info (optional)", type: "text" },
    { name: "teamSize", label: "Team Size", type: "text" },
    { name: "websiteLinks", label: "Website / Social Media Links", type: "text" },

  ],

  Student: [
    { name: "projectTitle", label: "Project / Blog Title", type: "text" },
    { name: "institutionName", label: "Institution Name", type: "text" },
    { name: "course", label: "Course / Subject", type: "text" },
    { name: "yearSemester", label: "Year / Semester", type: "text" },
    { name: "projectDescription", label: "Project Description", type: "textarea" },
    { name: "keyLearnings", label: "Key Learnings", type: "text" },
    { name: "mentorName", label: "Mentor Name (optional)", type: "text" },

  ],

  TechReviewer: [
    { name: "productName", label: "Product / App Name", type: "text" },
    { name: "brand", label: "Brand / Company", type: "text" },
    { name: "reviewSummary", label: "Review Summary", type: "text" },
    { name: "prosCons", label: "Pros and Cons", type: "textarea" },
    { name: "overallRating", label: "Overall Rating (1–10)", type: "number" },
    { name: "recommendation", label: "Recommendation (Yes/No)", type: "text" },

  ],

  Gamer: [
    { name: "gameTitle", label: "Game Title", type: "text" },
    { name: "gameGenre", label: "Game Genre", type: "text" },
    { name: "reviewExperience", label: "Review / Experience", type: "textarea" },
    { name: "platform", label: "Platform (Mobile, PC, Console)", type: "text" },
    { name: "rating", label: "Rating (1–10)", type: "number" },
    { name: "gameplayDuration", label: "Gameplay Duration", type: "text" },
    { name: "favoriteCharacter", label: "Favorite Character / Weapon (optional)", type: "text" },
  ],

  MotivationalSpeaker: [
    { name: "speechTitle", label: "Speech Title", type: "text" },
    { name: "topic", label: "Topic (Life, Success, Confidence, etc.)", type: "text" },
    { name: "storyMessage", label: "Story / Message", type: "textarea" },
    { name: "keyTakeaways", label: "Key Takeaways (bullet list)", type: "textarea" },
    { name: "quote", label: "Quote (optional)", type: "text" },
  ],
};

export default function MyPostsPage() {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [bio, setBio] = useState("");
  const [tempBio, setTempBio] = useState("");
  const [tempDetails, setTempDetails] = useState({});
  const [extraFields, setExtraFields] = useState({});
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

    // Standard fields prefill
    setEditFormData({
      blog_id: post._id,
      blog_title: post.blog_title || "",
      description: post.description || "",
      featured_image: post.featured_image || "",
      tags: post.tags || "",
      read_time: post.read_time || "",
    });

    // Profession-specific fields prefill
    if (post.profession && professionFields[post.profession]) {
      const prefilledExtraFields = {};
      professionFields[post.profession].forEach((field) => {
        prefilledExtraFields[field.name] = post[field.name] || "";
      });
      setExtraFields(prefilledExtraFields);
    } else {
      setExtraFields({});
    }

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
      <><MyPostsLoading/></>
    );
  }

  return (
    <div className="min-h-screen ">
      <h1 className="px-4 md:px-8 text-2xl md:text-3xl font-semibold text-center">My Posts</h1>
      <main className="px-0 md:px-8  mx-auto py-8">
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
          <div className="bg-white w-full sm:max-w-xl md:max-w-2xl rounded-2xl shadow-xl border border-gray-100 relative overflow-y-auto max-h-[90vh]">

            {/* Close Button */}
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition z-50"
            >
              <X size={22} />
            </button>

            {/* Modal Header */}
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-900">Edit Post</h2>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">

              {/* Image Upload */}
              <div
                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer transition
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {editFormData.featured_image ? (
                  <img
                    src={editFormData.featured_image}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    Drag & drop an image here, or click to select
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-auto"
                />
              </div>

              {/* Standard Fields */}
              {/* Show basic fields only if profession is not set */}
              {!details.profession && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Blog Title</label>
                    <input
                      type="text"
                      name="blog_title"
                      value={editFormData.blog_title}
                      onChange={handleEditInputChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditInputChange}
                      rows={4}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>
                </div>
              )}


              {/* Profession-Specific Fields */}
              {details.profession && professionFields[details.profession]?.length > 0 && (
                <div className="mt-4 space-y-4 border-t pt-4">
                  {professionFields[details.profession].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium mb-1">{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          value={extraFields[field.name] || ""}
                          onChange={(e) =>
                            setExtraFields(prev => ({ ...prev, [field.name]: e.target.value }))
                          }
                          rows={4}
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={extraFields[field.name] || ""}
                          onChange={(e) =>
                            setExtraFields(prev => ({ ...prev, [field.name]: e.target.value }))
                          }
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t flex justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditedPost}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
