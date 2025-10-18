"use client";
import React, { useState, useRef, useEffect } from "react";
import { Upload, FileText, AlertTriangle, Eye, Sparkles } from "lucide-react";
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { useSession } from "next-auth/react";
import { AI_URL } from "@/Ai/constant";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";



export default function BlogForm({ onClose }) {
  const { data } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    blog_title: "",
    description: "",
    author_name: "",
    author_email: "",
    author_image: "",
    featured_image: "",
    category: "",
    likes: 0,
    comment: 0,
    created_at: new Date().toISOString(),
    modified_at: null,
  });

  useEffect(() => {
    if (data?.user) {
      setFormData((prev) => ({
        ...prev,
        author_name: data.user.name || "",
        author_email: data.user.email || "",
        author_image: data.user.image || "",
      }));
    }
  }, [data]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [featuredPreview, setFeaturedPreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const featuredInputRef = useRef(null);
  const [wordCount, setWordCount] = useState(50);
  const [isGenerating, setIsGenerating] = useState(false);

  // ---------------- Handlers ----------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
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

  // ---------------- AI Content Generation ----------------
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
- Do NOT suggest any featured image URL`,
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

  // ---------------- Validation ----------------
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

  // ---------------- Submit Form ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!data?.user) {
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
        blog_title: formData.blog_title,
        description: formData.description,
        category: formData.category
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        featured_image: imageUrl,
        author_name: data.user.name,
        author_email: data.user.email,
        author_image: data.user.image,
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
          author_name: data.user.name,
          author_email: data.user.email,
          author_image: data.user.image,
          featured_image: "",
          category: "",
          likes: 0,
          comment: 0,
          created_at: new Date().toISOString(),
          modified_at: null,
        });
        router.push("/");
        setFeaturedPreview(null);
          if (onClose) onClose();
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

  // console.log("Featured File:", formData.featured_image);


  // ---------------- UI ----------------
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
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-8 lg:p-10 space-y-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <FileText className="w-5 h-5 text-[#0000FF]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              </div>

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

            {/* Featured Image */}
            <div className="space-y-4">
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
                    <div className="text-lg font-semibold text-gray-800 mb-2">
                      {isDragOver ? "Drop your image here!" : "Drag & drop or click to upload"}
                    </div>
                    <div className="text-sm text-gray-500">
                      Recommended size: 800×600 • JPG, PNG, WEBP • Max 3MB
                    </div>
                  </div>
                )}
                <input
                  ref={featuredInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-8 py-6 bg-gray-50 flex flex-col sm:flex-row gap-4">
            <button

              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-600 text-white rounded-2xl hover:from-amber-700 disabled:opacity-50"
            >
              <MdOutlinePublishedWithChanges className="w-5 h-5 mr-2" />
              {isSubmitting ? "Publishing your Post..." : "Publish"}
            </button>

            <button
              onClick={() => setShowPreview(true)}
              type="button"
              className="flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border-2 hover:bg-gray-50"
            >
              <Eye className="w-5 h-5 mr-2" />
              Preview Post
            </button>
          </div>
        </form>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                ✖
              </button>
              <h1 className="text-3xl font-bold mb-3">
                {formData.blog_title || "Untitled Blog Post"}
              </h1>
              <div className="flex items-center mb-4 gap-3">
                {formData.author_image && (
                  <img
                    src={formData.author_image}
                    alt={formData.author_name}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <p className="text-gray-500 text-sm">
                  By {formData.author_name || "Unknown Author"} ({formData.author_email || "No Email"}) •{" "}
                  {new Date(formData.created_at).toLocaleString()}
                </p>
              </div>
              {featuredPreview && (
                <img
                  src={featuredPreview}
                  alt="Featured"
                  className="w-full rounded-xl mb-6"
                />
              )}
              <div className="prose lg:prose-lg max-w-none mb-6">
                <p>{formData.description || "No description provided."}</p>
              </div>
              {formData.category && (
                <div className="flex gap-2 flex-wrap">
                  {formData.category.split(",").map((tag, i) => {
                    const t = tag.trim();
                    return t ? (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                      >
                        #{t}
                      </span>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
