"use client";
import React, { useState, useRef, useEffect } from "react";
import { Upload, FileText, AlertTriangle, Eye, Sparkles } from "lucide-react";
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { useSession } from "next-auth/react";
import { AI_URL } from "@/Ai/constant";
import Swal from "sweetalert2";

// Profession-wise input fields
const professionFields = {
  Developer: [
    { name: "techStack", label: "Tech Stack", type: "text" },
    { name: "githubRepo", label: "GitHub Repo Link", type: "url" },
    { name: "liveDemo", label: "Live Demo Link", type: "url" },
    { name: "projectDescription", label: "Project Description", type: "textarea" },
  ],
  Writer: [
    { name: "genre", label: "Genre", type: "text" },
    { name: "inspiration", label: "Inspiration Source", type: "text" },
  ],
  Blogger: [
    { name: "topic", label: "Topic", type: "text" },
    { name: "keywords", label: "Keywords", type: "text" },
  ],
  Photographer: [
    { name: "location", label: "Location", type: "text" },
    { name: "cameraModel", label: "Camera Model", type: "text" },
    { name: "photoStory", label: "Story Behind Photo", type: "textarea" },
  ],
  Designer: [
    { name: "designCategory", label: "Design Category", type: "text" },
    { name: "toolsUsed", label: "Tools Used", type: "text" },
  ],
};

// ----------------- Fetch user -----------------
async function getUserByEmail(email) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/user?email=${email}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export default function BlogForm() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);

  // ----------------- Form States -----------------
  const [formData, setFormData] = useState({
    blog_title: "",
    description: "",
    author_name: "",
    author_email: "",
    featured_image: "",
    category: "",
    likes: 0,
    comment: 0,
    created_at: new Date().toISOString(),
    modified_at: null,
  });

  const [extraFields, setExtraFields] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [featuredPreview, setFeaturedPreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [wordCount, setWordCount] = useState(50);
  const [isGenerating, setIsGenerating] = useState(false);
  const featuredInputRef = useRef(null);

  // ----------------- Fetch user data -----------------
  useEffect(() => {
    if (session?.user?.email) {
      const fetchUser = async () => {
        const data = await getUserByEmail(session.user.email);
        console.log(data)
        if (data) {
          setUserData(data);
          setFormData((prev) => ({
            ...prev,
            author_name: data.name || "",
            author_email: data.email || "",
          }));

          const prof = data.profession;
          if (prof && professionFields[prof]) {
            const initialExtra = {};
            professionFields[prof].forEach((f) => (initialExtra[f.name] = ""));
            setExtraFields(initialExtra);
          }
        }
      };
      fetchUser();
    }
  }, [session?.user?.email]);


  
  // ----------------- Handlers -----------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleExtraFieldChange = (e) => {
    const { name, value } = e.target;
    setExtraFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFeaturedPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, featured_image: file }));
    }
  };
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, featured_image: file }));
    }
  };

  const handleWordCountChange = (e) => setWordCount(e.target.value);

  // ----------------- AI Content Generation -----------------
  const generateContent = async (e) => {
    e.preventDefault();
    if (!formData.blog_title.trim() || !formData.category.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please enter both title and category first!",
      });
      return;
    }
    setIsGenerating(true);
    try {
      const payload = {
        contents: [
          {
            parts: [
              {
                text: `Write a detailed blog description in English based on this title and category.
Title: ${formData.blog_title}
Category: ${formData.category}
Requirements:
- One continuous paragraph (~${wordCount} words)
- Do NOT suggest any featured image URL
- Extra info: ${JSON.stringify(extraFields)}`,
              },
            ],
          },
        ],
      };

      let response = await fetch(AI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      response = await response.json();

      const aiText = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      setFormData((prev) => ({ ...prev, description: aiText.trim() }));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while generating content!",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // ----------------- Validation -----------------
  const validateForm = () => {
    const newErrors = {};
    if (!formData.blog_title.trim())
      newErrors.blog_title = "Blog title is required";
    else if (formData.blog_title.length < 5)
      newErrors.blog_title = "Title must be at least 5 characters";

    if (!formData.description.trim())
      newErrors.description = "Description is required";
    else if (formData.description.length < 10)
      newErrors.description = "Description must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ----------------- Submit Handler -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!userData) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "Please login before publishing a post!",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = "";
      if (formData.featured_image instanceof File) {
        const imgForm = new FormData();
        imgForm.append("image", formData.featured_image);

        const uploadRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
          { method: "POST", body: imgForm }
        );
        const uploadData = await uploadRes.json();
        imageUrl = uploadData?.data?.url || "";
      }

      const payload = {
        ...formData,
        category: formData.category
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        featured_image: imageUrl,
        extraFields, // Add profession fields
      };

      const res = await fetch("/api/add-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your blog post has been published.",
        });
        setFormData({
          blog_title: "",
          description: "",
          author_name: userData.name || "",
          author_email: userData.email || "",
          featured_image: "",
          category: "",
          likes: 0,
          comment: 0,
          created_at: new Date().toISOString(),
          modified_at: null,
        });
        setExtraFields(
          Object.keys(extraFields).reduce((acc, key) => ({ ...acc, [key]: "" }), {})
        );
        setFeaturedPreview(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: result.message || "Failed to publish post.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while submitting!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----------------- UI -----------------
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-900 to-amber-900 bg-clip-text text-transparent leading-normal mb-3">
            Blog Post Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create and manage your blog content with our intuitive form interface
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 lg:p-10 space-y-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <FileText className="w-5 h-5 text-[#0000FF]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              </div>

              {/* Title & Category */}
              <div className="md:flex items-center gap-3">
                <div className="flex-3 mt-2">
                  <label className="flex items-center mb-2 text-sm font-semibold text-gray-700">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" /> Blog Title
                  </label>
                  <input
                    name="blog_title"
                    type="text"
                    value={formData.blog_title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none text-lg ${errors.blog_title
                      ? "border-red-300 bg-red-50 focus:border-red-500"
                      : "border-gray-200 bg-gray-50 focus:border-[#0000FF]"
                      }`}
                    placeholder="Enter an engaging blog title..."
                  />
                  {errors.blog_title && (
                    <p className="flex items-center text-sm text-red-600 mt-1">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {errors.blog_title}
                    </p>
                  )}
                </div>

                <div className="flex-2 mt-2">
                  <label className="flex items-center text-sm mb-2 font-semibold text-gray-700">
                    <TbCategoryPlus className="w-4 h-4 mr-2 text-gray-500" /> Category
                  </label>
                  <input
                    name="category"
                    type="text"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-[#0000FF]"
                    placeholder="Any kind of category..."
                  />
                </div>
              </div>

              {/* Word Count & AI */}
              <div className="mt-4 flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-700">Word Count</label>
                <input
                  type="number"
                  min={50}
                  max={1000}
                  value={wordCount}
                  onChange={handleWordCountChange}
                  className="w-20 px-3 py-2 rounded-xl border border-gray-300 focus:border-[#0000FF]"
                />
                <button
                  onClick={generateContent}
                  type="button"
                  disabled={isGenerating}
                  className={`btn rounded-lg text-amber-500 hover:text-white font-bold border border-amber-500 hover:bg-amber-500 ${isGenerating ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {isGenerating ? "Generating..." : "Generate Content"}
                </button>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <FileText className="w-4 h-4 mr-2 text-gray-500" /> Description
                </label>
                <textarea
                  name="description"
                  rows={10}
                  value={isGenerating ? "Generating content..." : formData.description}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none resize-none ${errors.description
                    ? "border-red-300 bg-red-50 focus:border-red-500"
                    : "border-gray-200 bg-gray-50 focus:border-[#0000FF]"
                    }`}
                  disabled={isGenerating}
                  placeholder="Write a compelling description..."
                />
                {errors.description && (
                  <p className="flex items-center text-sm text-red-600 mt-1">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Extra Profession Fields */}
            {userData?.profession && professionFields[userData.profession]?.length > 0 && (
              <div className="mt-8 space-y-4 p-6 bg-gray-50 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">{userData.profession} Info</h2>
                {professionFields[userData.profession].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        value={extraFields[field.name]}
                        onChange={handleExtraFieldChange}
                        rows={4}
                        className="w-full border rounded-xl p-3 focus:border-[#0000FF]"
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={extraFields[field.name]}
                        onChange={handleExtraFieldChange}
                        className="w-full border rounded-xl p-3 focus:border-[#0000FF]"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Featured Image */}
            <div className="space-y-4 mt-6">
              <div
                className={`relative border-2 border-dashed rounded-2xl overflow-hidden h-48 sm:h-64 lg:h-72 flex items-center justify-center cursor-pointer transition-all duration-300 ${isDragOver
                  ? "border-[#0000FF] bg-orange-50 scale-102"
                  : featuredPreview
                    ? "border-transparent"
                    : "border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 hover:border-[#0000FF]"
                  }`}
                onClick={() => featuredInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {featuredPreview ? (
                  <div className="relative w-full h-full group">
                    <img
                      src={featuredPreview}
                      alt="Featured preview"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-medium">Change Featured</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#0000FF] to-yellow-600 rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-500 font-medium">Drag & Drop or Click to Upload Featured Image</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={featuredInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#0000FF] hover:bg-[#0000DD] text-white font-semibold rounded-xl shadow-lg transition-all duration-200"
              >
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
