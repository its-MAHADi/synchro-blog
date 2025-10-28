"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const professionFields = {
    Developer: [
        { name: "projectTitle", label: "Project Title", type: "text" },
        { name: "projectOverView", label: "Project OverView", type: "text" },
        { name: "techStack", label: "Tech Stack", type: "text" },

        { name: "projectDuration", label: "Project Duration", type: "number" },
        { name: "toolsUsed", label: "Tools Used ", type: "text" },
        { name: "keyFeatures", label: "Key Features", type: "textarea" },
        { name: "challenges", label: "Challenges Faced", type: "textarea" },
        { name: "futureImprovements", label: "Future Improvements", type: "textarea" },
        // { name: "projectImage", label: "Upload Project Image", type: "file" },
    ],

    Writer: [
        { name: "Title", label: "Article Title", type: "text" },
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

const formatFacebookDate = (dateString) => {
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
    if (diffDays === 1) {
        const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return `Yesterday at ${time}`;
    }
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `${day} ${month} at ${time}`;
};

export default function AdminPostsPage() {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);
    const postsPerPage = 10;

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/posts");
            const data = await res.json();
            setPosts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter((post) => {
        const query = (searchQuery || "").toLowerCase();
        if (!query) return true;
        return (
            (post.blog_title || post.title || "").toLowerCase().includes(query) ||
            (post.description || "").toLowerCase().includes(query) ||
            (post.author_name || "").toLowerCase().includes(query) ||
            (post.author_email || "").toLowerCase().includes(query) ||
            (post.author_profession || "").toLowerCase().includes(query)
        );
    });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
                if (!res.ok) throw new Error("Failed to delete post");
                Swal.fire("Deleted!", "Post has been deleted.", "success");
                fetchPosts();
            } catch (err) {
                Swal.fire("Error!", err.message, "error");
            }
        }
    };

    console.log(posts)

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Posts</h1>

            <input
                type="text"
                placeholder="Search by title, content, user name, email, profession..."
                className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {loading ? (
                <p className="text-gray-500">Loading posts...</p>
            ) : filteredPosts.length === 0 ? (
                <p className="text-gray-500">No posts found.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentPosts.map((post) => (
                            <div key={post._id} className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 flex flex-col">
                                {/* Author Info */}
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        className="w-12 h-12 rounded-full object-cover"
                                        src={post.author_image || "/default-avatar.png"}
                                        alt={post.author_name}
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {post.author_name}{" "}
                                            <small className="text-gray-500 text-xs">
                                                ({post.author_profession})
                                            </small>
                                        </p>
                                        <small className="text-gray-400">{formatFacebookDate(post.created_at)}</small>
                                    </div>
                                </div>

                                {post.featured_image && (
                                    <img
                                        src={post.featured_image}
                                        alt={post.blog_title || post.title}
                                        className="w-full h-40 object-cover rounded-xl mb-4"
                                    />
                                )}

                                {/* Profession Based Title & Description */}
                              
                                <div className="mb-4">
                                    {post.author_profession && professionFields[post.author_profession] ? (
                                        (() => {
                                            const fields = professionFields[post.author_profession];

                                            const titleField = fields.find(f => f.name.toLowerCase().includes("title"));
                                            const descField = fields.find(f =>
                                                f.name.toLowerCase().includes("description") ||
                                                f.name.toLowerCase().includes("overview") ||
                                                f.name.toLowerCase().includes("summary") ||
                                                f.name.toLowerCase().includes("content") ||
                                                f.name.toLowerCase().includes("process") ||
                                                f.name.toLowerCase().includes("story") ||
                                                f.name.toLowerCase().includes("cooking")
                                            );

                                            const titleValue = post.extraFields?.[titleField?.name];
                                            const descValue = post.extraFields?.[descField?.name];

                                            return (
                                                <>
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                                        {titleValue || post.blog_title || post.title || "Untitled Post"}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm line-clamp-3">
                                                        {descValue || post.short_description || post.description || "No description available."}
                                                    </p>
                                                </>
                                            );
                                        })()
                                    ) : (
                                        <>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                                {post.blog_title || post.title || "Untitled Post"}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-3">
                                                {post.short_description || post.description || "No description available."}
                                            </p>
                                        </>
                                    )}

                                </div>


                                <div className="mt-auto flex justify-between gap-2">
                                    <button
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => setSelectedPost(post)}
                                    >
                                        Details
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={() => handleDelete(post._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded border ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white border-gray-300"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Details Modal */}
                    {selectedPost && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
                                {/* Close Button */}
                                <button
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 font-bold text-xl"
                                    onClick={() => setSelectedPost(null)}
                                >
                                    ✕
                                </button>

                                {/* Author Info */}
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        className="w-12 h-12 rounded-full object-cover"
                                        src={selectedPost.author_image || "/default-avatar.png"}
                                        alt={selectedPost.author_name}
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {selectedPost.author_name}{" "}
                                            <small className="text-gray-500 text-xs">
                                                ({selectedPost.author_profession})
                                            </small>
                                        </p>
                                        <small className="text-gray-400">{formatFacebookDate(selectedPost.created_at)}</small>
                                    </div>
                                </div>

                                {/* Post Title */}
                                <h2 className="text-2xl font-bold mb-4">{selectedPost.blog_title || selectedPost.title}</h2>

                                {/* Featured Image */}

                                {selectedPost.featured_image && (
                                    <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-4 shadow-lg">
                                        <img
                                            src={selectedPost.featured_image}
                                            alt={selectedPost.blog_title || selectedPost.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                )}


                                {/* Description */}
                                {selectedPost.description && (
                                    <p className="mb-3 text-gray-700">
                                        <strong>Description:</strong> {selectedPost.description}
                                    </p>
                                )}

                                {/* Extra Fields */}
                                <div className="mb-3">
                                    {selectedPost.author_profession && professionFields[selectedPost.author_profession] ? (
                                        professionFields[selectedPost.author_profession].map((field) => (
                                            <p key={field.name} className="mb-2 text-gray-700">
                                                <strong>{field.label}:</strong> {selectedPost.extraFields?.[field.name] || "N/A"}
                                            </p>
                                        ))
                                    ) : (
                                        <p className="text-gray-400">No extra details available.</p>
                                    )}
                                </div>

                                {/* Links & Likes */}
                                <div className="flex flex-col gap-2 mt-4">
                                    <div className="flex items-center justify-between">
                                        <p><strong>Likes:</strong> {selectedPost.likes || 0}</p>
                                        <p><strong>Comments:</strong> {selectedPost.comment || 0}</p>
                                    </div>

                                    {selectedPost.author_profession === "Developer" && (
                                        <div className="flex items-center justify-between">
                                            <p>
                                                <strong>GitHub:</strong>{" "}
                                                {selectedPost.extraFields.githubRepo ? (
                                                    <a
                                                        href={selectedPost.extraFields.githubRepo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 underline"
                                                    >
                                                        Github Repo
                                                    </a>
                                                ) : "N/A"}
                                            </p>
                                            <p>
                                                <strong>Live Demo:</strong>{" "}
                                                {selectedPost.extraFields.liveDemo ? (
                                                    <a
                                                        href={selectedPost.extraFields.liveDemo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 underline"
                                                    >
                                                        Live Version
                                                    </a>
                                                ) : "N/A"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
