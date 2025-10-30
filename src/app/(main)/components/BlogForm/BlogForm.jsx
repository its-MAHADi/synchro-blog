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
  const [schedulePost, setSchedulePost] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");

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
  // const validateForm = () => {
  //   const newErrors = {};
  //   if (!formData.blog_title.trim())
  //     newErrors.blog_title = "Blog title is required";
  //   else if (formData.blog_title.length < 5)
  //     newErrors.blog_title = "Title must be at least 5 characters";

  //   if (!formData.description.trim())
  //     newErrors.description = "Description is required";
  //   else if (formData.description.length < 10)
  //     newErrors.description = "Description must be at least 10 characters";

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };


  // ----------------- Submit Handler -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "Please Sign In before publishing a post!",
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
        category: formData.category.split(",").map((t) => t.trim()).filter(Boolean),
        featured_image: imageUrl,
        extraFields,
        author_profession: userData.profession || "",
        author_image: userData.image || session.user?.image || "",
        isScheduled: schedulePost,
        scheduledAt: schedulePost ? new Date(scheduledTime).toISOString() : null,
        created_at: schedulePost
          ? new Date(scheduledTime).toISOString()
          : new Date().toISOString(),
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
          title: schedulePost ? "Post Scheduled!" : "Post Published!",
          text: schedulePost
            ? "Your post will be published automatically at the selected time."
            : "Your blog post has been published successfully.",
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
          share: 0,
          created_at: new Date().toISOString(),
          modified_at: null,
        });
        setExtraFields({});
        setFeaturedPreview(null);
        setSchedulePost(false);
        setScheduledTime("");
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



  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto md:px-6 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-[#0000FF] to-blue-600 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent leading-normal mb-3">
            Post Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create and manage your blog content with our intuitive form interface
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-2 lg:p-10 space-y-8">
            {/* Basic Info */}
            {
              !userData?.profession &&
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
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
                    className={`btn rounded-lg text-blue-600 hover:text-white font-bold border border-blue-500 hover:bg-indigo-500 ${isGenerating ? "opacity-50 cursor-not-allowed" : ""
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
            }

            {/* Extra Profession Fields */}
            {/* Extra Profession Fields */}
            {userData?.profession && professionFields[userData.profession]?.length > 0 && (
              <div className=" relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-[#f8faff] to-[#eef5ff] shadow-[0_10px_30px_rgba(0,0,255,0.08)] md:p-8 p-2 py-5 transition-all duration-500">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,255,0.06),transparent_50%)] pointer-events-none"></div>
                <h2 className="text-xl md:text-3xl font-bold text-[#1a1a40] mb-8 border-l-4 border-[#0000ff] pl-3 tracking-wide">
                  Hey {userData.profession} Share Your Activity
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {professionFields[userData.profession].map((field) => (
                    <div
                      key={field.name}
                      className="group relative bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-[#0000ff]/30 transition-all duration-300 p-5"
                    >
                      <label className="text-sm font-semibold text-gray-700 mb-2 block tracking-wide group-hover:text-[#0000ff] transition-colors">
                        {field.label}
                      </label>

                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          value={extraFields[field.name] || ""}
                          onChange={handleExtraFieldChange}
                          rows={4}
                          required
                          className="w-full p-4 rounded-xl border border-gray-200 bg-white/60 focus:border-[#0000ff] focus:ring-2 focus:ring-[#0000ff]/30 focus:outline-none transition-all resize-none placeholder:text-gray-400"
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                        />
                      ) : field.type === "file" ? (
                        <div className="flex items-center gap-4">
                          <input
                            type="file"
                            name={field.name}
                            required
                            onChange={(e) => handleExtraFieldChange(e, true)}
                            className="w-full text-sm p-3 border border-gray-200 rounded-xl bg-white/60 focus:border-[#0000ff] focus:ring-2 focus:ring-[#0000ff]/30 focus:outline-none transition-all file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#0000ff] file:text-white hover:file:bg-[#1a1aff]"
                          />
                          <MdOutlinePublishedWithChanges className="text-[#0000ff] w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          required
                          value={extraFields[field.name] || ""}
                          onChange={handleExtraFieldChange}
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                          className="w-full p-4 rounded-xl border border-gray-200 bg-white/60 focus:border-[#0000ff] focus:ring-2 focus:ring-[#0000ff]/30 focus:outline-none transition-all placeholder:text-gray-400"
                        />
                      )}
                    </div>
                  ))}
                </div>
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
                    <div className="w-16 h-16 bg-gradient-to-r from-[#0000FF] to-blue-600 rounded-full flex items-center justify-center mb-4">
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


            {/* Schedule Post Option */}
            <div className="pt-6 border-t border-gray-200 mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Schedule Post (optional)
              </h3>

              <div className="md:flex items-center gap-3 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={schedulePost}
                    onChange={(e) => setSchedulePost(e.target.checked)}
                    className="checkbox checkbox-primary"
                  />
                  <span className="text-gray-700 font-medium">Schedule for later</span>
                </label>

                {schedulePost && (
                  <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  />
                )}
              </div>
            </div>


            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#0000FF] cursor-pointer hover:bg-[#0000DD] text-white font-semibold rounded-xl shadow-lg transition-all duration-200"
              >
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </div>
        </form>
      </div >
    </div >
  );
}
