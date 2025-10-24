"use client"
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const PostCartOfMP = ({ post, session, handleEditPost, handleDeletePost, formatFacebookDate }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => setShowFullDescription(!showFullDescription);
 const [showFull, setShowFull] = useState(false);
    const description = post.description || "";
    const isLongDescription = description.length > 300;
    const shortText = isLongDescription ? description.slice(0, 300) + "..." : description;

    return (
        <article
            key={post._id}
            className="rounded-xl p-4 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all"
        >
            <div className="flex items-center gap-3">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={session?.user?.image || "/default_profile.jpg"}
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

            <div>
                {/*  */}
                <div>
                    {post?.author_profession === "" ? (

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{post?.blog_title}</h2>
                            <p className="text-gray-600 text-sm">
                                {showFull ? descText : isLong ? shortDesc : descText}
                                {isLong && (
                                    <button
                                        onClick={() => setShowFull(!showFull)}
                                        className="text-blue-600 font-medium ml-1 hover:underline"
                                    >
                                        {showFull ? "See less" : "See more"}
                                    </button>
                                )}
                            </p>
                        </div>
                    ) : null}
                </div>
                {/* Developer */}
                <div>
                    {post?.author_profession === "Developer" ? (
                        // 🔹 ডেভেলপার পোস্ট দেখাও
                        <div>
                            <div className="flex justify-between mb-2">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 line-clamp-2">
                                        {post?.extraFields?.projectTitle}
                                    </h2>
                                </div>
                                <div className="space-x-3 md:space-x-5">
                                    <a
                                        target="_blank"
                                        href={post?.extraFields?.liveDemo}
                                        className="btn border border-[#0000FF] text-[#0000FF] rounded-xl hover:bg-[#0000FF] hover:text-white"
                                    >
                                        Live
                                    </a>
                                    <a
                                        target="_blank"
                                        href={post?.extraFields?.githubRepo}
                                        className="btn border border-[#0000FF] text-[#0000FF] rounded-xl hover:bg-[#0000FF] hover:text-white"
                                    >
                                        Github
                                    </a>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mt-2">
                                {post?.extraFields?.projectOverView}
                            </p>
                            <div className="text-gray-600 text-sm mt-2">
                                <p className="font-bold text-black">Key Features:</p>
                                <p>{post?.extraFields?.keyFeatures}</p>
                            </div>
                            <div className="text-gray-600 text-sm mt-2">
                                <p className="font-bold text-black">Tech Stack:</p>
                                <p>{post?.extraFields?.techStack}</p>
                            </div>
                            <div className="text-gray-600 text-sm mt-2">
                                <p className="font-bold text-black">Tools:</p>
                                <p>{post?.extraFields?.toolsUsed}</p>
                            </div>
                            <div className="text-gray-600 text-sm mt-2">
                                <p className="font-bold text-black">Duration:</p>
                                <p>{post?.extraFields?.projectDuration} months</p>
                            </div>
                            <div className="text-gray-600 text-sm mt-2">
                                <p className="font-bold text-black">Challenges:</p>
                                <p>{post?.extraFields?.challenges}</p>
                            </div>
                            <div className="text-gray-600 text-sm mt-2">
                                <p className="font-bold text-black">Future Improvement:</p>
                                <p>{post?.extraFields?.futureImprovements}</p>
                            </div>
                        </div>
                    ) : null}
                </div>
                {/* Writer */}
                <div>
                    {post?.author_profession === "Writer" ? (
                        <div className="bg-white rounded-2xl shadow-md pb-5 px-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-2xl font-semibold text-gray-800 line-clamp-2">
                                    {post?.extraFields?.storyTitle || "Untitled Story"}
                                </h2>
                                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
                                    {post?.extraFields?.genre || "Story"}
                                </span>
                            </div>


                            {/* Summary */}
                            <div className="text-gray-700 text-sm mb-4">
                                <p className="leading-relaxed">
                                    {post?.extraFields?.summary}
                                </p>
                            </div>

                            {/* Full Content */}
                            <div>
                                <p className="leading-relaxed mb-4">
                                    {post?.extraFields?.fullContent?.length > 500 && !showFull
                                        ? post?.extraFields?.fullContent?.slice(0, 500) + "..."
                                        : post?.extraFields?.fullContent}
                                    {post?.extraFields?.fullContent?.length > 500 && (
                                        <button
                                            onClick={() => setShowFull(!showFull)}
                                            className="text-blue-600 font-medium ml-1 hover:underline"
                                        >
                                            {showFull ? "See less" : "Read more"}
                                        </button>
                                    )}
                                </p>
                            </div>


                            {/* Inspiration Source */}
                            {post?.extraFields?.inspiration && (
                                <div className="text-gray-700 text-sm mb-4">
                                    <p className="font-semibold text-gray-900 mb-1">Inspiration Source:</p>
                                    <p>{post?.extraFields?.inspiration}</p>
                                </div>
                            )}

                            {/* Writing Style */}
                            <p className="text-sm text-gray-500 italic mb-3">
                                ✍️ Writing Style: {post?.extraFields?.writingStyle || "N/A"}
                            </p>
                        </div>
                    ) : null}

                </div>
                {/* Blogger */}
                <div>
                    {post?.author_profession === "Blogger" ? (
                        <div className="bg-white rounded-2xl shadow-md pb-5 px-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-2xl font-semibold text-gray-800 line-clamp-2">
                                    {post?.extraFields?.blogTitle || "Untitled Blog"}
                                </h2>
                                <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
                                    {post?.extraFields?.topic || "General"}
                                </span>
                            </div>



                            {/* Blog Content */}
                            <div className="text-gray-700 text-sm mb-4 leading-relaxed">
                                {showFull
                                    ? post?.extraFields?.content
                                    : post?.extraFields?.content?.slice(0, 350)}
                                {post?.extraFields?.content?.length > 350 && (
                                    <button
                                        onClick={() => setShowFull(!showFull)}
                                        className="text-blue-600 font-medium ml-1 hover:underline"
                                    >
                                        {showFull ? "See less" : "Read more"}
                                    </button>
                                )}
                            </div>

                            {/* Keywords */}
                            {post?.extraFields?.keywords && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.extraFields.keywords
                                        .split(",")
                                        .map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                                            >
                                                #{tag.trim()}
                                            </span>
                                        ))}
                                </div>
                            )}

                            {/* References */}
                            {post?.extraFields?.references && (
                                <div className="text-gray-700 text-sm border-t pt-3">
                                    <p className="font-semibold text-gray-900 mb-1">References:</p>
                                    <a
                                        href={post.extraFields.references}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {post.extraFields.references}
                                    </a>
                                </div>
                            )}
                            {/* Mood */}
                            <p className="text-sm text-gray-500 italic mt-4">
                                📝 Mood: {post?.extraFields?.mood || "Neutral"}
                            </p>
                        </div>
                    ) : null}

                </div>
                {/* Designer */}
                <div>
                    {post?.author_profession === "Designer" ? (
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {post?.extraFields?.designTitle || "Untitled Design"}
                                </h2>
                                <span className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full">
                                    {post?.extraFields?.designCategory || "Design"}
                                </span>
                            </div>

                            {/* Tools */}
                            {post?.extraFields?.toolsUsed && (
                                <p className="text-sm text-gray-600 mb-3">
                                    🧰 <span className="font-medium">Tools Used:</span>{" "}
                                    {post.extraFields.toolsUsed}
                                </p>
                            )}

                            {/* Client / Project */}
                            {post?.extraFields?.clientProject && (
                                <p className="text-sm text-gray-600 mb-3">
                                    👥 <span className="font-medium">Client / Project:</span>{" "}
                                    {post.extraFields.clientProject}
                                </p>
                            )}

                            {/* Design Process */}
                            <div className="text-gray-700 text-sm leading-relaxed mb-4">
                                {showFull
                                    ? post?.extraFields?.designProcess
                                    : post?.extraFields?.designProcess?.slice(0, 300)}
                                {post?.extraFields?.designProcess?.length > 300 && (
                                    <button
                                        onClick={() => setShowFull(!showFull)}
                                        className="text-purple-600 font-medium ml-1 hover:underline"
                                    >
                                        {showFull ? "See less" : "Read more"}
                                    </button>
                                )}
                            </div>

                            {/* Inspiration */}
                            {post?.extraFields?.inspirationSource && (
                                <div className="border-t pt-3 text-sm text-gray-700">
                                    <p className="font-semibold text-gray-900 mb-1">🎨 Inspiration:</p>
                                    {post.extraFields.inspirationSource.startsWith("http") ? (
                                        <a
                                            href={post.extraFields.inspirationSource}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {post.extraFields.inspirationSource}
                                        </a>
                                    ) : (
                                        <p>{post.extraFields.inspirationSource}</p>
                                    )}
                                </div>
                            )}

                            {/* Feedback Note */}
                            {post?.extraFields?.feedbackNote && (
                                <div className="border-t mt-3 pt-3 text-sm text-gray-600 italic">
                                    💬 “{post.extraFields.feedbackNote}”
                                </div>
                            )}
                        </div>
                    ) : null}

                </div>
                {/* Photographer */}
                <div>
                    {post?.author_profession === "Photographer" ? (
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {post?.extraFields?.photoTitle || "Untitled Photo"}
                                </h2>
                                <span className="px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded-full">
                                    📸 Photographer
                                </span>
                            </div>

                            {/* Photo (optional preview if available) */}
                            {post?.photoURL && (
                                <img
                                    src={post.photoURL}
                                    alt={post?.extraFields?.photoTitle}
                                    className="w-full h-64 object-cover rounded-xl mb-4 border"
                                />
                            )}

                            {/* Location */}
                            {post?.extraFields?.location && (
                                <p className="text-sm text-gray-600 mb-2">
                                    📍 <span className="font-medium">Location:</span>{" "}
                                    {post.extraFields.location}
                                </p>
                            )}

                            {/* Camera Info */}
                            <p className="text-sm text-gray-600 mb-2">
                                📷 <span className="font-medium">Camera:</span>{" "}
                                {post?.extraFields?.cameraModel || "Unknown"}
                            </p>

                            {/* Lens */}
                            {post?.extraFields?.lensUsed && (
                                <p className="text-sm text-gray-600 mb-2">
                                    🔭 <span className="font-medium">Lens:</span>{" "}
                                    {post.extraFields.lensUsed}
                                </p>
                            )}

                            {/* Shooting Mode */}
                            {post?.extraFields?.shootingMode && (
                                <p className="text-sm text-gray-600 mb-3">
                                    ⚙️ <span className="font-medium">Mode:</span>{" "}
                                    {post.extraFields.shootingMode}
                                </p>
                            )}

                            {/* Story */}
                            <div className="text-gray-700 text-sm leading-relaxed mb-4">
                                {showFull
                                    ? post?.extraFields?.photoStory
                                    : post?.extraFields?.photoStory?.slice(0, 250)}
                                {post?.extraFields?.photoStory?.length > 250 && (
                                    <button
                                        onClick={() => setShowFull(!showFull)}
                                        className="text-amber-600 font-medium ml-1 hover:underline"
                                    >
                                        {showFull ? "See less" : "Read more"}
                                    </button>
                                )}
                            </div>

                            {/* Editing Software */}
                            {post?.extraFields?.editingSoftware && (
                                <div className="border-t pt-3 text-sm text-gray-600">
                                    🖌️ <span className="font-medium">Edited with:</span>{" "}
                                    {post.extraFields.editingSoftware}
                                </div>
                            )}
                        </div>
                    ) : null}

                </div>
                {/* Marketer */}
                <div>
                    {post?.author_profession === "Marketer" ? (
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {post?.extraFields?.blogTitle || "Untitled Marketing Blog"}
                                </h2>
                                <span className="px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-full">
                                    📊 Marketer
                                </span>
                            </div>

                            {/* Marketing Type */}
                            <p className="text-sm text-gray-600 mb-2">
                                🎯 <span className="font-medium">Marketing Type:</span>{" "}
                                {post?.extraFields?.marketingType || "General"}
                            </p>

                            {/* Target Audience */}
                            {post?.extraFields?.targetAudience && (
                                <p className="text-sm text-gray-600 mb-2">
                                    👥 <span className="font-medium">Target Audience:</span>{" "}
                                    {post.extraFields.targetAudience}
                                </p>
                            )}

                            {/* Strategy */}
                            <div className="text-gray-700 text-sm leading-relaxed mb-4">
                                <p className="font-semibold text-gray-800 mb-1">📈 Strategy:</p>
                                {showFull
                                    ? post?.extraFields?.strategyDescription
                                    : post?.extraFields?.strategyDescription?.slice(0, 250)}
                                {post?.extraFields?.strategyDescription?.length > 250 && (
                                    <button
                                        onClick={() => setShowFull(!showFull)}
                                        className="text-emerald-600 font-medium ml-1 hover:underline"
                                    >
                                        {showFull ? "See less" : "Read more"}
                                    </button>
                                )}
                            </div>

                            {/* Case Study */}
                            {post?.extraFields?.caseStudy && (
                                <div className="bg-gray-50 rounded-lg border border-gray-100 p-4 mb-4">
                                    <p className="font-semibold text-gray-800 mb-2">🧠 Case Study:</p>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {post.extraFields.caseStudy}
                                    </p>
                                </div>
                            )}

                            {/* Tools Used */}
                            {post?.extraFields?.toolsUsed && (
                                <p className="text-sm text-gray-600 mb-2">
                                    🧰 <span className="font-medium">Tools Used:</span>{" "}
                                    {post.extraFields.toolsUsed}
                                </p>
                            )}

                            {/* Key Result */}
                            {post?.extraFields?.keyResult && (
                                <div className="border-t pt-3 mt-3 text-sm text-gray-600">
                                    🏆 <span className="font-medium">Key Result:</span>{" "}
                                    {post.extraFields.keyResult}
                                </div>
                            )}
                        </div>
                    ) : null}

                </div>
                {/* Teacher */}
                <div>
                    {post?.author_profession === "Teacher" ? (
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg p-6 transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {post?.extraFields?.lessonTitle || "Untitled Lesson"}
                                </h2>
                                <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full">
                                    📘 Teacher
                                </span>
                            </div>

                            {/* Subject & Grade */}
                            <div className="text-sm text-gray-600 mb-3 space-y-1">
                                <p>📚 <span className="font-medium">Subject:</span> {post?.extraFields?.subject || "N/A"}</p>
                                <p>🎓 <span className="font-medium">Grade Level:</span> {post?.extraFields?.gradeLevel || "All Grades"}</p>
                            </div>

                            {/* Learning Objectives */}
                            <div className="mb-4">
                                <p className="font-semibold text-gray-800 mb-1">🎯 Learning Objectives:</p>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {post?.extraFields?.learningObjectives || "No objectives provided."}
                                </p>
                            </div>

                            {/* Lesson Content */}
                            <div className="text-gray-700 text-sm leading-relaxed mb-4">
                                <p className="font-semibold text-gray-800 mb-1">📝 Lesson Content:</p>
                                <p>
                                    {showFull
                                        ? post?.extraFields?.lessonContent
                                        : post?.extraFields?.lessonContent?.slice(0, 400)}
                                    {post?.extraFields?.lessonContent?.length > 400 && (
                                        <button
                                            onClick={() => setShowFull(!showFull)}
                                            className="text-blue-600 font-medium ml-1 hover:underline"
                                        >
                                            {showFull ? "See less" : "Read more"}
                                        </button>
                                    )}
                                </p>
                            </div>

                            {/* Resources */}
                            {post?.extraFields?.resourceLinks && (
                                <div className="mt-3 border-t border-gray-200 pt-3 text-sm">
                                    <p className="font-semibold text-gray-800 mb-1">🔗 Resource / Reference Links:</p>
                                    <a
                                        href={post.extraFields.resourceLinks}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline break-all"
                                    >
                                        {post.extraFields.resourceLinks}
                                    </a>
                                </div>
                            )}
                        </div>
                    ) : null}

                </div>
                {/* Traveler */}
                <div>
                    {post?.author_profession === "Traveler" ? (
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg p-6 transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {post?.extraFields?.tripTitle || "Untitled Trip"}
                                </h2>
                                <span className="px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-full">
                                    🌍 Traveler
                                </span>
                            </div>

                            {/* Destination Info */}
                            <div className="text-gray-700 text-sm mb-4 space-y-1">
                                <p>📍 <span className="font-medium">Destination:</span> {post?.extraFields?.destinationName || "Unknown"}</p>
                                <p>🗺️ <span className="font-medium">Location:</span> {post?.extraFields?.countryCity || "N/A"}</p>
                                <p>🕒 <span className="font-medium">Duration:</span> {post?.extraFields?.duration || "N/A"}</p>
                                <p>💰 <span className="font-medium">Budget:</span> {post?.extraFields?.budget || "N/A"}</p>
                                <p>🌤️ <span className="font-medium">Best Time to Visit:</span> {post?.extraFields?.bestTime || "Anytime"}</p>
                            </div>

                            {/* Travel Story */}
                            <div className="mb-4">
                                <p className="font-semibold text-gray-800 mb-1">✈️ Travel Story:</p>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {showFull
                                        ? post?.extraFields?.travelStory
                                        : post?.extraFields?.travelStory?.slice(0, 400)}
                                    {post?.extraFields?.travelStory?.length > 400 && (
                                        <button
                                            onClick={() => setShowFull(!showFull)}
                                            className="text-blue-600 font-medium ml-1 hover:underline"
                                        >
                                            {showFull ? "See less" : "Read more"}
                                        </button>
                                    )}
                                </p>
                            </div>

                            {/* Tips */}
                            {post?.extraFields?.tips && (
                                <div className="mt-3 border-t border-gray-200 pt-3 text-sm">
                                    <p className="font-semibold text-gray-800 mb-1">💡 Tips for Travelers:</p>
                                    <p className="text-gray-700">{post.extraFields.tips}</p>
                                </div>
                            )}
                        </div>
                    ) : null}

                </div>
                {/* Foodie */}
                <div>
                    {post?.author_profession === "Foodie" ? (
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg p-6 transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {post?.extraFields?.recipeName || "Unnamed Recipe"}
                                </h2>
                                <span className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-full">
                                    🍳 Foodie
                                </span>
                            </div>

                            {/* Basic Info */}
                            <div className="text-gray-700 text-sm mb-4 space-y-1">
                                <p>🍽️ <span className="font-medium">Cuisine:</span> {post?.extraFields?.cuisineType || "N/A"}</p>
                                <p>🕐 <span className="font-medium">Preparation Time:</span> {post?.extraFields?.prepTime || "N/A"}</p>
                                <p>🔥 <span className="font-medium">Cooking Time:</span> {post?.extraFields?.cookingTime || "N/A"}</p>
                                <p>🎯 <span className="font-medium">Difficulty:</span> {post?.extraFields?.difficultyLevel || "N/A"}</p>
                                <p>⭐ <span className="font-medium">Taste Rating:</span> {post?.extraFields?.tasteRating || "N/A"} / 5</p>
                            </div>

                            {/* Ingredients */}
                            <div className="mb-4">
                                <p className="font-semibold text-gray-800 mb-1">🥕 Ingredients:</p>
                                <ul className="list-disc ml-6 text-gray-700 text-sm">
                                    {post?.extraFields?.ingredients
                                        ?.split(",")
                                        .map((item, index) => (
                                            <li key={index}>{item.trim()}</li>
                                        ))}
                                </ul>
                            </div>

                            {/* Cooking Steps */}
                            <div>
                                <p className="font-semibold text-gray-800 mb-1">👨‍🍳 Cooking Steps:</p>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {showFull
                                        ? post?.extraFields?.cookingSteps
                                        : post?.extraFields?.cookingSteps?.slice(0, 400)}
                                    {post?.extraFields?.cookingSteps?.length > 400 && (
                                        <button
                                            onClick={() => setShowFull(!showFull)}
                                            className="text-orange-600 font-medium ml-1 hover:underline"
                                        >
                                            {showFull ? "See less" : "Read more"}
                                        </button>
                                    )}
                                </p>
                            </div>
                        </div>
                    ) : null}

                </div>
                {/* HealthFitnessExpert */}
                <div>
                    {post?.author_profession === "HealthFitnessExpert" ? (
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg p-6 transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {post?.extraFields?.postTitle || "Untitled Fitness Post"}
                                </h2>
                                <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                                    🏋️‍♂️ Health & Fitness
                                </span>
                            </div>

                            {/* Topic & Basic Info */}
                            <div className="text-gray-700 text-sm mb-4 space-y-1">
                                <p>💪 <span className="font-medium">Topic:</span> {post?.extraFields?.topic || "N/A"}</p>
                                <p>⏱️ <span className="font-medium">Duration / Frequency:</span> {post?.extraFields?.durationFrequency || "N/A"}</p>
                                {post?.extraFields?.equipmentNeeded && (
                                    <p>🏋️ <span className="font-medium">Equipment Needed:</span> {post?.extraFields?.equipmentNeeded}</p>
                                )}
                            </div>

                            {/* Routine Description */}
                            <div className="mb-4">
                                <p className="font-semibold text-gray-800 mb-1">📋 Routine Description:</p>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {showFull
                                        ? post?.extraFields?.routineDescription
                                        : post?.extraFields?.routineDescription?.slice(0, 350)}
                                    {post?.extraFields?.routineDescription?.length > 350 && (
                                        <button
                                            onClick={() => setShowFull(!showFull)}
                                            className="text-green-600 font-medium ml-1 hover:underline"
                                        >
                                            {showFull ? "See less" : "Read more"}
                                        </button>
                                    )}
                                </p>
                            </div>

                            {/* Nutrition Advice */}
                            <div>
                                <p className="font-semibold text-gray-800 mb-1">🥗 Nutrition Advice:</p>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {post?.extraFields?.nutritionAdvice || "No nutrition advice provided."}
                                </p>
                            </div>
                        </div>
                    ) : null}

                </div>
                {/* Entrepreneur */}
                <div>
                    {post?.author_profession === "Entrepreneur" ? (
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg p-6 transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {post?.extraFields?.startupName || "Unnamed Startup"}
                                </h2>
                                <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
                                    💼 Entrepreneur
                                </span>
                            </div>

                            {/* Basic Info */}
                            <div className="text-gray-700 text-sm mb-4 space-y-1">
                                <p>🏭 <span className="font-medium">Industry:</span> {post?.extraFields?.industryType || "N/A"}</p>
                                <p>👥 <span className="font-medium">Team Size:</span> {post?.extraFields?.teamSize || "N/A"}</p>
                                {post?.extraFields?.fundingInfo && (
                                    <p>💰 <span className="font-medium">Funding:</span> {post?.extraFields?.fundingInfo}</p>
                                )}
                            </div>

                            {/* Founding Story */}
                            <div className="mb-4">
                                <p className="font-semibold text-gray-800 mb-1">🚀 Founding Story:</p>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {showFull
                                        ? post?.extraFields?.foundingStory
                                        : post?.extraFields?.foundingStory?.slice(0, 300)}
                                    {post?.extraFields?.foundingStory?.length > 300 && (
                                        <button
                                            onClick={() => setShowFull(!showFull)}
                                            className="text-indigo-600 font-medium ml-1 hover:underline"
                                        >
                                            {showFull ? "See less" : "Read more"}
                                        </button>
                                    )}
                                </p>
                            </div>

                            {/* Challenges Faced */}
                            <div className="mb-4">
                                <p className="font-semibold text-gray-800 mb-1">⚡ Challenges Faced:</p>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {post?.extraFields?.challengesFaced || "No challenges described."}
                                </p>
                            </div>

                            {/* Achievements */}
                            <div className="mb-4">
                                <p className="font-semibold text-gray-800 mb-1">🏆 Achievements:</p>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {post?.extraFields?.achievements || "No achievements listed yet."}
                                </p>
                            </div>

                            {/* Links */}
                            {post?.extraFields?.websiteLinks && (
                                <div className="mt-4">
                                    <a
                                        href={post?.extraFields?.websiteLinks}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 font-medium hover:underline"
                                    >
                                        🔗 Visit Official Website
                                    </a>
                                </div>
                            )}
                        </div>
                    ) : null}

                </div>
                {/* Student */}
                <div>
                    {post?.author_profession === "Student" ? (
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg p-6 transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    🎓 {post?.extraFields?.projectTitle || "Untitled Project"}
                                </h2>
                                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                                    Student
                                </span>
                            </div>

                            {/* Basic Info */}
                            <div className="text-gray-700 text-sm mb-4 space-y-1">
                                <p>🏫 <span className="font-medium">Institution:</span> {post?.extraFields?.institutionName || "N/A"}</p>
                                <p>📚 <span className="font-medium">Course:</span> {post?.extraFields?.course || "N/A"}</p>
                                <p>🗓️ <span className="font-medium">Year / Semester:</span> {post?.extraFields?.yearSemester || "N/A"}</p>
                                {post?.extraFields?.mentorName && (
                                    <p>👨‍🏫 <span className="font-medium">Mentor:</span> {post?.extraFields?.mentorName}</p>
                                )}
                            </div>

                            {/* Project Description */}
                            <div className="mb-4">
                                <p className="font-semibold text-gray-800 mb-1">🧠 Project Description:</p>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {showFull
                                        ? post?.extraFields?.projectDescription
                                        : post?.extraFields?.projectDescription?.slice(0, 300)}
                                    {post?.extraFields?.projectDescription?.length > 300 && (
                                        <button
                                            onClick={() => setShowFull(!showFull)}
                                            className="text-blue-600 font-medium ml-1 hover:underline"
                                        >
                                            {showFull ? "See less" : "Read more"}
                                        </button>
                                    )}
                                </p>
                            </div>

                            {/* Key Learnings */}
                            <div>
                                <p className="font-semibold text-gray-800 mb-1">📖 Key Learnings:</p>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {post?.extraFields?.keyLearnings || "No key learnings provided."}
                                </p>
                            </div>
                        </div>
                    ) : null}

                </div>
                {/* Gamer */}
                <div>
                    {post?.author_profession === "Gamer" ? (
                        <div className="bg-gray-900 text-white border border-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-2xl font-bold">{post?.extraFields?.gameTitle || "Untitled Game"}</h2>
                                <span className="px-3 py-1 text-sm bg-green-600 text-white rounded-full">
                                    {post?.extraFields?.gameGenre || "Genre"}
                                </span>
                            </div>

                            {/* Platform & Rating */}
                            <div className="flex items-center gap-4 mb-3 text-sm text-gray-300">
                                <p>🎮 Platform: {post?.extraFields?.platform || "N/A"}</p>
                                <p>⭐ Rating: {post?.extraFields?.rating || "0"}/10</p>
                                <p>⏱ Duration: {post?.extraFields?.gameplayDuration || "N/A"}</p>
                            </div>

                            {/* Review / Experience */}
                            <div className="mb-3">
                                <p className="font-semibold mb-1">📝 Review / Experience:</p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {showFull
                                        ? post?.extraFields?.reviewExperience
                                        : post?.extraFields?.reviewExperience?.slice(0, 250)}
                                    {post?.extraFields?.reviewExperience?.length > 250 && (
                                        <button
                                            onClick={() => setShowFull(!showFull)}
                                            className="text-blue-400 font-medium ml-1 hover:underline"
                                        >
                                            {showFull ? "See less" : "Read more"}
                                        </button>
                                    )}
                                </p>
                            </div>

                            {/* Favorite Character */}
                            {post?.extraFields?.favoriteCharacter && (
                                <p className="text-gray-300 text-sm">
                                    🏆 Favorite: {post?.extraFields?.favoriteCharacter}
                                </p>
                            )}
                        </div>
                    ) : null}

                </div>
                {/* MotivationalSpeaker */}
                <div>
                    {post?.author_profession === "MotivationalSpeaker" ? (
                        <div className="bg-yellow-50 border border-yellow-400 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-2xl font-bold text-gray-900">{post?.extraFields?.speechTitle || "Untitled Speech"}</h2>
                                <span className="px-3 py-1 text-sm bg-yellow-200 text-yellow-800 rounded-full">
                                    {post?.extraFields?.topic || "Topic"}
                                </span>
                            </div>

                            {/* Story / Message */}
                            <div className="mb-3">
                                <p className="font-semibold mb-1">📝 Story / Message:</p>
                                <p className="text-gray-800 text-sm leading-relaxed">
                                    {showFull
                                        ? post?.extraFields?.storyMessage
                                        : post?.extraFields?.storyMessage?.slice(0, 250)}
                                    {post?.extraFields?.storyMessage?.length > 250 && (
                                        <button
                                            onClick={() => setShowFull(!showFull)}
                                            className="text-yellow-600 font-medium ml-1 hover:underline"
                                        >
                                            {showFull ? "See less" : "Read more"}
                                        </button>
                                    )}
                                </p>
                            </div>

                            {/* Key Takeaways */}
                            <div className="mb-3">
                                <p className="font-semibold mb-1">✅ Key Takeaways:</p>
                                <ul className="list-disc list-inside text-gray-800 text-sm">
                                    {post?.extraFields?.keyTakeaways?.split("\n").map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Optional Quote */}
                            {post?.extraFields?.quote && (
                                <p className="text-gray-700 italic text-sm mt-3">💬 "{post?.extraFields?.quote}"</p>
                            )}
                        </div>
                    ) : null}

                </div>
                {/* TechReviewer */}
                <div>
                    {post?.author_profession === "TechReviewer" && (
                        <div className="bg-gray-50 border border-gray-300 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">

                            {/* Header */}
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-2xl font-bold text-gray-900">{post?.extraFields?.productName || "Untitled Product"}</h2>
                                <span className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-full">
                                    {post?.extraFields?.brand || "Brand"}
                                </span>
                            </div>

                            {/* Review Summary */}
                            <p className="text-gray-800 mb-3">
                                <strong>Summary:</strong> {post?.extraFields?.reviewSummary}
                            </p>

                            {/* Pros & Cons */}
                            <div className="mb-3">
                                <p className="font-semibold mb-1">Pros & Cons:</p>
                                <ul className="list-disc list-inside text-gray-700 text-sm">
                                    {post?.extraFields?.prosCons?.split("\n").map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Rating & Recommendation */}
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-gray-800 font-semibold">Rating: {post?.extraFields?.overallRating} / 10</p>
                                <p className="text-gray-800 font-semibold">Recommended: {post?.extraFields?.recommendation}</p>
                            </div>

                        </div>
                    )}

                </div>
            </div>

            <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <FaHeart className="text-red-500" /> {post.likes || 0} Likes
                </div>
                <div>
                    {post.comment || 0} Comments · {post.shares || 0} Shares
                </div>
            </div>

            <div className="flex justify-between mt-5">

            </div>
        </article>
    );
};

export default PostCartOfMP;