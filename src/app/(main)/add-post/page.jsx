"use client";
import React, { useState, useEffect } from "react";
import {
  FileText,
  Image,
  Tag,
  Clock,
  AlertTriangle,
  Save,
  Eye,
  Sparkles,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";

const metadata = {
  title: "Add post | Synchro",
  description:
    "The purpose of Synchro - AI-Powered Blogging Site is to simplify and enhance the process of creating, managing, and publishing blog content by leveraging artificial intelligence.",
};


export default function BlogForm() {
  const { data: session } = useSession();
  // console.log(session)

  const [formData, setFormData] = useState({
    blog_title: "",
    description: "",
    author_name: "",
    author_email: "",
    featured_image: "",
    tags: "",
    read_time: "",
    created_at: new Date().toISOString(),
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        author_name: prev.author_name?.trim() ? prev.author_name : session.user.name || "",
        author_email: prev.author_email?.trim() ? prev.author_email : session.user.email || "",
      }));
    }
  }, [session]);


  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Basic validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.blog_title.trim()) {
      newErrors.blog_title = "Blog title is required";
    } 
    else if (formData.blog_title.length < 5) {
      newErrors.blog_title = "Title must be at least 5 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }
    else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(formData.featured_image) || !formData.featured_image.trim()) {
      newErrors.featured_image = "Please enter a valid image URL";
    }

    if (formData.read_time && !/^\d+$/.test(String(formData.read_time))) {
      newErrors.read_time = "Please enter a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // prevent double submit
    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    
    const payload = {
      ...formData,
    };
    // console.log(payload)

    try {
      const res = await fetch("http://localhost:3000/api/service", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // const newPost = await res.json();
      // console.log(newPost)

      if (!res.ok) {
        toast.error("There is some error in creating a new post. Please try again.")

      } else {
        toast.success("Successfully added a new post!")
        setErrors({});
      }
    } catch (error) {
      console.error("Network or unexpected error while saving post:", error);
      alert("An error occurred while saving. See console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => setShowPreview(true);

  return (
    <>
      <ToastContainer/>
      <div className="min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-900 via-amber-900 to-amber-900 bg-clip-text text-transparent leading-normal mb-3">
              Blog Post Management
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create and manage your blog content with our intuitive form interface
            </p>
          </div>

          {/* Form */}
          <div className="rounded-3xl shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div className="p-8 lg:p-10">
                <div className="space-y-8">
                  {/* Basic Info */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 pb-4">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <FileText className="w-5 h-5 text-[#c45627]" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                    </div>

                    <div className="space-y-2 mb-5">
                      <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FileText className="w-4 h-4 mr-2 text-gray-500" />
                        Blog Title
                      </label>
                      <input
                        name="blog_title"
                        type="text"
                        value={formData.blog_title}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none text-lg ${
                          errors.blog_title
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:bg-red-50"
                            : "border-gray-200 bg-gray-50 focus:border-[#c45627] focus:bg-white hover:border-gray-300"
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

                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700">
                        <FileText className="w-4 h-4 mr-2 text-gray-500" />
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none resize-none ${
                          errors.description
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:bg-red-50"
                            : "border-gray-200 bg-gray-50 focus:border-[#c45627] focus:bg-white hover:border-gray-300"
                        }`}
                        placeholder="Write a compelling description for your blog post..."
                      />
                      {errors.description && (
                        <p className="flex items-center text-sm text-red-600 mt-1">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          {errors.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Media & Content */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Image className="w-5 h-5 text-amber-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">Media & Content</h2>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700">
                        <Image className="w-4 h-4 mr-2 text-gray-500" />
                        Featured Image URL
                      </label>
                      <input
                        name="featured_image"
                        type="url"
                        value={formData.featured_image}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                          errors.featured_image
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:bg-red-50"
                            : "border-gray-200 bg-gray-50 focus:border-[#c45627] focus:bg-white hover:border-gray-300"
                        }`}
                        placeholder="https://example.com/featured-image.jpg"
                      />
                      {errors.featured_image && (
                        <p className="flex items-center text-sm text-red-600 mt-1">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          {errors.featured_image}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700">
                        <Tag className="w-4 h-4 mr-2 text-gray-500" />
                        Tags
                      </label>
                      <input
                        name="tags"
                        type="text"
                        value={formData.tags}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-[#c45627] focus:bg-white hover:border-gray-300 transition-all duration-200"
                        placeholder="technology, web development, react, javascript"
                      />
                      <p className="text-sm text-gray-500">Separate tags with commas</p>
                    </div>
                  </div>

                  {/* Read Time */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      Read Time (minutes)
                    </label>
                    <input
                      name="read_time"
                      type="number"
                      min="1"
                      value={formData.read_time}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                        errors.read_time
                          ? "border-red-300 bg-red-50 focus:border-red-500 focus:bg-red-50"
                          : "border-gray-200 bg-gray-50 focus:border-[#c45627] focus:bg-white hover:border-gray-300"
                      }`}
                      placeholder="5"
                    />
                    {errors.read_time && (
                      <p className="flex items-center text-sm text-red-600 mt-1">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {errors.read_time}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 lg:px-10">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-600 text-white font-semibold rounded-2xl hover:from-amber-700 hover:to-amber-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    {isSubmitting ? "Saving Blog Post..." : "Save Blog Post"}
                  </button>

                  <button
                    onClick={handlePreview}
                    type="button"
                    className="cursor-pointer flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Preview Post
                  </button>
                </div>
              </div>
            </form>

            {/* Preview Modal */}
            {showPreview && (
              <div className="fixed inset-0 bg-yellow-50 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 relative">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="absolute top-3 right-3 text-gray-600 hover:text-black cursor-pointer"
                  >
                    ✖
                  </button>

                  <h1 className="text-3xl font-bold mb-3">{formData.blog_title}</h1>
                  <p className="text-gray-500 text-sm mb-6">
                    By {formData.author_name} ({formData.author_email}) •{" "}
                    {new Date(formData.created_at).toLocaleString()}
                  </p>

                  {formData.featured_image && (
                    <img src={formData.featured_image} alt="Featured" className="w-full rounded-xl mb-6" />
                  )}

                  <p className="text-lg leading-relaxed mb-6">{formData.description}</p>

                  {formData.tags && (
                    <div className="flex gap-2 flex-wrap">
                      {formData.tags.split(",").map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
