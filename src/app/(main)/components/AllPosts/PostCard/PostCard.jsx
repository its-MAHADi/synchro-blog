"use client";
import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, Share2, TrashIcon, Edit } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import Link from "next/link";

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

const PostCard = ({ postData, usersData, onFollowUpdate }) => {
  const [showFull, setShowFull] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  const { data: session } = useSession();

  const [likes, setLikes] = useState(postData?.likes || 0);
  const [liked, setLiked] = useState(false);
  const [totalComments, setTotalComments] = useState(postData?.comment || 0);
  const shares = postData?.shares || 4;
  const [isFollowing, setIsFollowing] = useState(false);

  const titleText = postData?.blog_title || "Untitled Post";
  const descText = postData?.description || "";
  const image = postData?.featured_image || null;
  const authorName = postData?.author_name || "Unknown Author";
  const authorAvatar = postData?.author_image ? postData.author_image : "/default_profile.jpg";

  const fbTime = formatFacebookDate(postData?.created_at || new Date().toISOString());
  const limit = 300; // show See more only if desc > 300 chars
  const isLong = descText.length > limit;
  const shortDesc = descText.slice(0, limit) + "...";
console.log(postData)
  // Fetch comments
  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const res = await fetch(
        `/api/single-post-comments/${postData?._id}?email=${postData?.author_email}`
      );
      const data = await res.json();
      if (data.success) {
        setComments(data.comments.map(c => ({ ...c, id: c._id || c.id })));
      } else console.error("Failed to load comments:", data.message);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    if (modalOpen && postData?._id) fetchComments();
  }, [modalOpen]);

  // Handle Like
  const handleLike = async () => {
    if (!session) {
      Swal.fire({ icon: "warning", title: "You must be logged in to like!", toast: true, position: "top-end", showConfirmButton: false, timer: 2000 });
      return;
    }

    try {
      const res = await fetch("/api/add-likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId: postData?._id }),
      });
      const data = await res.json();

      if (data.success) {
        setLikes(data.likes);
        setLiked(data.liked);

        // 🔔 Send notification
        await fetch("/api/notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderEmail: session.user.email,
            receiverEmail: postData.author_email,
            type: "like",
            message: `${session.user.name} liked your post`,
            postId: postData._id,
          }),
        });
      }
    } catch (err) { console.error(err); }
  };

  // Handle Comment
  const handleAddComment = async () => {
    if (!session) {
      Swal.fire({ icon: "warning", title: "You must be logged in to comment!", toast: true, position: "top-end", showConfirmButton: false, timer: 2000 });
      return;
    }
    if (newComment.trim() === "") return;

    const commentObj = {
      post_id: postData?._id,
      post_author_email: postData?.author_email,
      text: newComment,
      comment_author_name: session?.user?.name,
      comment_author_email: session?.user?.email,
      comment_author_image: session?.user?.image || null,
      created_at: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/add-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentObj),
      });
      const data = await res.json();

      if (data.success) {
        const savedComment = { ...commentObj, id: data.data._id || Date.now() };
        setComments((prev) => [savedComment, ...prev]);
        setNewComment("");
        setTotalComments((prev) => prev + 1);

        // 🔔 Send notification
        await fetch("/api/notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderEmail: session.user.email,
            receiverEmail: postData.author_email,
            type: "comment",
            message: `${session.user.name} commented: ${newComment}`,
            postId: postData._id,
          }),
        });
      } else {
        Swal.fire({ icon: "error", title: data.message || "Failed to add comment", toast: true, position: "top-end", showConfirmButton: false, timer: 2000 });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Something went wrong. Please try again.", toast: true, position: "top-end", showConfirmButton: false, timer: 2000 });
    }
  };

  // Handle Follow
  const handleFollow = async () => {
    if (!session) return;
    try {
      const res = await fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetEmail: postData.author_email }),
      });
      const data = await res.json();
      if (data.success) {
        setIsFollowing(data.following);
        onFollowUpdate(postData.author_email, data.following);

        // 🔔 Send notification
        await fetch("/api/notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderEmail: session.user.email,
            receiverEmail: postData.author_email,
            type: "follow",
            message: `${session.user.name} started following you`,
          }),
        });
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (session?.user?.email) setLiked(postData?.likedUsers?.includes(session.user.email));
  }, [session, postData?.likedUsers]);

  useEffect(() => {
    if (session?.user?.email && postData?.author_email) {
      const followingStatus = usersData.following?.some(
        (email) => email.toLowerCase() === postData.author_email.toLowerCase()
      );
      setIsFollowing(followingStatus);
    }
  }, [session, postData?.author_email, usersData.following]);

  const CardContent = () => (
    <article className="rounded-xl p-4 flex flex-col gap-4 border border-gray-200 h-full bg-white">
      <div className="flex items-center gap-3">
        <Link href={session?.user ? `/view-profile/${postData.author_email}` : "/sign-in"}>
          <img className="w-10 h-10 rounded-full" src={authorAvatar} alt="Author_photo" />
        </Link>
        <div className="-space-y-1">
          <div className="flex items-center gap-2">
            <Link href={session?.user ? `/view-profile/${postData.author_email}` : "/sign-in"}>
              <p className="text-gray-900 font-medium">{authorName}</p>
            </Link>
            {session?.user?.email !== postData.author_email && (
              <button onClick={handleFollow} className={`text-xs cursor-pointer font-bold ${isFollowing ? "text-gray-500" : "text-blue-600"}`}>
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <small className="text-gray-500 text-xs">{fbTime}</small>
        </div>
      </div>

      {image && (
        <img src={image} alt={titleText} className="w-full h-auto max-h-[500px] object-contain rounded-lg" />
      )}

      <div>
        {/*  */}
        <div>
          {postData?.author_profession === "" ? (

            <div>
              <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{postData?.blog_title}</h2>
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
          {postData?.author_profession === "Developer" ? (
            // 🔹 ডেভেলপার পোস্ট দেখাও
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 line-clamp-2">
                    {postData?.extraFields?.projectTitle}
                  </h2>
                </div>
                <div className="space-x-3 md:space-x-5">
                  <a
                    target="_blank"
                    href={postData?.extraFields?.liveDemo}
                    className="btn border border-[#0000FF] text-[#0000FF] rounded-xl hover:bg-[#0000FF] hover:text-white"
                  >
                    Live
                  </a>
                  <a
                    target="_blank"
                    href={postData?.extraFields?.githubRepo}
                    className="btn border border-[#0000FF] text-[#0000FF] rounded-xl hover:bg-[#0000FF] hover:text-white"
                  >
                    Github
                  </a>
                </div>
              </div>

              <p className="text-gray-600 text-sm mt-2">
                {postData?.extraFields?.projectOverView}
              </p>
              <div className="text-gray-600 text-sm mt-2">
                <p className="font-bold text-black">Key Features:</p>
                <p>{postData?.extraFields?.keyFeatures}</p>
              </div>
              <div className="text-gray-600 text-sm mt-2">
                <p className="font-bold text-black">Tech Stack:</p>
                <p>{postData?.extraFields?.techStack}</p>
              </div>
              <div className="text-gray-600 text-sm mt-2">
                <p className="font-bold text-black">Tools:</p>
                <p>{postData?.extraFields?.toolsUsed}</p>
              </div>
              <div className="text-gray-600 text-sm mt-2">
                <p className="font-bold text-black">Duration:</p>
                <p>{postData?.extraFields?.projectDuration} months</p>
              </div>
              <div className="text-gray-600 text-sm mt-2">
                <p className="font-bold text-black">Challenges:</p>
                <p>{postData?.extraFields?.challenges}</p>
              </div>
              <div className="text-gray-600 text-sm mt-2">
                <p className="font-bold text-black">Future Improvement:</p>
                <p>{postData?.extraFields?.futureImprovements}</p>
              </div>
            </div>
          ) : null}
        </div>
        {/* Writer */}
        <div>
          {postData?.author_profession === "Writer" ? (
            <div className="bg-white rounded-2xl shadow-md pb-5 px-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-semibold text-gray-800 line-clamp-2">
                  {postData?.extraFields?.storyTitle || "Untitled Story"}
                </h2>
                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
                  {postData?.extraFields?.genre || "Story"}
                </span>
              </div>


              {/* Summary */}
              <div className="text-gray-700 text-sm mb-4">
                <p className="leading-relaxed">
                  {postData?.extraFields?.summary}
                </p>
              </div>

              {/* Full Content */}
              <div>
                <p className="leading-relaxed mb-4">
                  {postData?.extraFields?.fullContent?.length > 500 && !showFull
                    ? postData?.extraFields?.fullContent?.slice(0, 500) + "..."
                    : postData?.extraFields?.fullContent}
                  {postData?.extraFields?.fullContent?.length > 500 && (
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
              {postData?.extraFields?.inspiration && (
                <div className="text-gray-700 text-sm mb-4">
                  <p className="font-semibold text-gray-900 mb-1">Inspiration Source:</p>
                  <p>{postData?.extraFields?.inspiration}</p>
                </div>
              )}

              {/* Writing Style */}
              <p className="text-sm text-gray-500 italic mb-3">
                ✍️ Writing Style: {postData?.extraFields?.writingStyle || "N/A"}
              </p>
            </div>
          ) : null}

        </div>
        {/* Blogger */}
        <div>
          {postData?.author_profession === "Blogger" ? (
            <div className="bg-white rounded-2xl shadow-md pb-5 px-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-semibold text-gray-800 line-clamp-2">
                  {postData?.extraFields?.blogTitle || "Untitled Blog"}
                </h2>
                <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
                  {postData?.extraFields?.topic || "General"}
                </span>
              </div>



              {/* Blog Content */}
              <div className="text-gray-700 text-sm mb-4 leading-relaxed">
                {showFull
                  ? postData?.extraFields?.content
                  : postData?.extraFields?.content?.slice(0, 350)}
                {postData?.extraFields?.content?.length > 350 && (
                  <button
                    onClick={() => setShowFull(!showFull)}
                    className="text-blue-600 font-medium ml-1 hover:underline"
                  >
                    {showFull ? "See less" : "Read more"}
                  </button>
                )}
              </div>

              {/* Keywords */}
              {postData?.extraFields?.keywords && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {postData.extraFields.keywords
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
              {postData?.extraFields?.references && (
                <div className="text-gray-700 text-sm border-t pt-3">
                  <p className="font-semibold text-gray-900 mb-1">References:</p>
                  <a
                    href={postData.extraFields.references}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {postData.extraFields.references}
                  </a>
                </div>
              )}
              {/* Mood */}
              <p className="text-sm text-gray-500 italic mt-4">
                📝 Mood: {postData?.extraFields?.mood || "Neutral"}
              </p>
            </div>
          ) : null}

        </div>
        {/* Designer */}
        <div>
          {postData?.author_profession === "Designer" ? (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {postData?.extraFields?.designTitle || "Untitled Design"}
                </h2>
                <span className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full">
                  {postData?.extraFields?.designCategory || "Design"}
                </span>
              </div>

              {/* Tools */}
              {postData?.extraFields?.toolsUsed && (
                <p className="text-sm text-gray-600 mb-3">
                  🧰 <span className="font-medium">Tools Used:</span>{" "}
                  {postData.extraFields.toolsUsed}
                </p>
              )}

              {/* Client / Project */}
              {postData?.extraFields?.clientProject && (
                <p className="text-sm text-gray-600 mb-3">
                  👥 <span className="font-medium">Client / Project:</span>{" "}
                  {postData.extraFields.clientProject}
                </p>
              )}

              {/* Design Process */}
              <div className="text-gray-700 text-sm leading-relaxed mb-4">
                {showFull
                  ? postData?.extraFields?.designProcess
                  : postData?.extraFields?.designProcess?.slice(0, 300)}
                {postData?.extraFields?.designProcess?.length > 300 && (
                  <button
                    onClick={() => setShowFull(!showFull)}
                    className="text-purple-600 font-medium ml-1 hover:underline"
                  >
                    {showFull ? "See less" : "Read more"}
                  </button>
                )}
              </div>

              {/* Inspiration */}
              {postData?.extraFields?.inspirationSource && (
                <div className="border-t pt-3 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900 mb-1">🎨 Inspiration:</p>
                  {postData.extraFields.inspirationSource.startsWith("http") ? (
                    <a
                      href={postData.extraFields.inspirationSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {postData.extraFields.inspirationSource}
                    </a>
                  ) : (
                    <p>{postData.extraFields.inspirationSource}</p>
                  )}
                </div>
              )}

              {/* Feedback Note */}
              {postData?.extraFields?.feedbackNote && (
                <div className="border-t mt-3 pt-3 text-sm text-gray-600 italic">
                  💬 “{postData.extraFields.feedbackNote}”
                </div>
              )}
            </div>
          ) : null}

        </div>
        {/* Photographer */}
        <div>
          {postData?.author_profession === "Photographer" ? (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {postData?.extraFields?.photoTitle || "Untitled Photo"}
                </h2>
                <span className="px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded-full">
                  📸 Photographer
                </span>
              </div>

              {/* Photo (optional preview if available) */}
              {postData?.photoURL && (
                <img
                  src={postData.photoURL}
                  alt={postData?.extraFields?.photoTitle}
                  className="w-full h-64 object-cover rounded-xl mb-4 border"
                />
              )}

              {/* Location */}
              {postData?.extraFields?.location && (
                <p className="text-sm text-gray-600 mb-2">
                  📍 <span className="font-medium">Location:</span>{" "}
                  {postData.extraFields.location}
                </p>
              )}

              {/* Camera Info */}
              <p className="text-sm text-gray-600 mb-2">
                📷 <span className="font-medium">Camera:</span>{" "}
                {postData?.extraFields?.cameraModel || "Unknown"}
              </p>

              {/* Lens */}
              {postData?.extraFields?.lensUsed && (
                <p className="text-sm text-gray-600 mb-2">
                  🔭 <span className="font-medium">Lens:</span>{" "}
                  {postData.extraFields.lensUsed}
                </p>
              )}

              {/* Shooting Mode */}
              {postData?.extraFields?.shootingMode && (
                <p className="text-sm text-gray-600 mb-3">
                  ⚙️ <span className="font-medium">Mode:</span>{" "}
                  {postData.extraFields.shootingMode}
                </p>
              )}

              {/* Story */}
              <div className="text-gray-700 text-sm leading-relaxed mb-4">
                {showFull
                  ? postData?.extraFields?.photoStory
                  : postData?.extraFields?.photoStory?.slice(0, 250)}
                {postData?.extraFields?.photoStory?.length > 250 && (
                  <button
                    onClick={() => setShowFull(!showFull)}
                    className="text-amber-600 font-medium ml-1 hover:underline"
                  >
                    {showFull ? "See less" : "Read more"}
                  </button>
                )}
              </div>

              {/* Editing Software */}
              {postData?.extraFields?.editingSoftware && (
                <div className="border-t pt-3 text-sm text-gray-600">
                  🖌️ <span className="font-medium">Edited with:</span>{" "}
                  {postData.extraFields.editingSoftware}
                </div>
              )}
            </div>
          ) : null}

        </div>
        {/* Marketer */}
        <div>
          {postData?.author_profession === "Marketer" ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {postData?.extraFields?.blogTitle || "Untitled Marketing Blog"}
                </h2>
                <span className="px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-full">
                  📊 Marketer
                </span>
              </div>

              {/* Marketing Type */}
              <p className="text-sm text-gray-600 mb-2">
                🎯 <span className="font-medium">Marketing Type:</span>{" "}
                {postData?.extraFields?.marketingType || "General"}
              </p>

              {/* Target Audience */}
              {postData?.extraFields?.targetAudience && (
                <p className="text-sm text-gray-600 mb-2">
                  👥 <span className="font-medium">Target Audience:</span>{" "}
                  {postData.extraFields.targetAudience}
                </p>
              )}

              {/* Strategy */}
              <div className="text-gray-700 text-sm leading-relaxed mb-4">
                <p className="font-semibold text-gray-800 mb-1">📈 Strategy:</p>
                {showFull
                  ? postData?.extraFields?.strategyDescription
                  : postData?.extraFields?.strategyDescription?.slice(0, 250)}
                {postData?.extraFields?.strategyDescription?.length > 250 && (
                  <button
                    onClick={() => setShowFull(!showFull)}
                    className="text-emerald-600 font-medium ml-1 hover:underline"
                  >
                    {showFull ? "See less" : "Read more"}
                  </button>
                )}
              </div>

              {/* Case Study */}
              {postData?.extraFields?.caseStudy && (
                <div className="bg-gray-50 rounded-lg border border-gray-100 p-4 mb-4">
                  <p className="font-semibold text-gray-800 mb-2">🧠 Case Study:</p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {postData.extraFields.caseStudy}
                  </p>
                </div>
              )}

              {/* Tools Used */}
              {postData?.extraFields?.toolsUsed && (
                <p className="text-sm text-gray-600 mb-2">
                  🧰 <span className="font-medium">Tools Used:</span>{" "}
                  {postData.extraFields.toolsUsed}
                </p>
              )}

              {/* Key Result */}
              {postData?.extraFields?.keyResult && (
                <div className="border-t pt-3 mt-3 text-sm text-gray-600">
                  🏆 <span className="font-medium">Key Result:</span>{" "}
                  {postData.extraFields.keyResult}
                </div>
              )}
            </div>
          ) : null}

        </div>
        {/* Teacher */}
        <div>
          {postData?.author_profession === "Teacher" ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg p-6 transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {postData?.extraFields?.lessonTitle || "Untitled Lesson"}
                </h2>
                <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full">
                  📘 Teacher
                </span>
              </div>

              {/* Subject & Grade */}
              <div className="text-sm text-gray-600 mb-3 space-y-1">
                <p>📚 <span className="font-medium">Subject:</span> {postData?.extraFields?.subject || "N/A"}</p>
                <p>🎓 <span className="font-medium">Grade Level:</span> {postData?.extraFields?.gradeLevel || "All Grades"}</p>
              </div>

              {/* Learning Objectives */}
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-1">🎯 Learning Objectives:</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {postData?.extraFields?.learningObjectives || "No objectives provided."}
                </p>
              </div>

              {/* Lesson Content */}
              <div className="text-gray-700 text-sm leading-relaxed mb-4">
                <p className="font-semibold text-gray-800 mb-1">📝 Lesson Content:</p>
                <p>
                  {showFull
                    ? postData?.extraFields?.lessonContent
                    : postData?.extraFields?.lessonContent?.slice(0, 400)}
                  {postData?.extraFields?.lessonContent?.length > 400 && (
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
              {postData?.extraFields?.resourceLinks && (
                <div className="mt-3 border-t border-gray-200 pt-3 text-sm">
                  <p className="font-semibold text-gray-800 mb-1">🔗 Resource / Reference Links:</p>
                  <a
                    href={postData.extraFields.resourceLinks}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {postData.extraFields.resourceLinks}
                  </a>
                </div>
              )}
            </div>
          ) : null}

        </div>
        {/* Traveler */}
        <div>
          {postData?.author_profession === "Traveler" ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg p-6 transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {postData?.extraFields?.tripTitle || "Untitled Trip"}
                </h2>
                <span className="px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-full">
                  🌍 Traveler
                </span>
              </div>

              {/* Destination Info */}
              <div className="text-gray-700 text-sm mb-4 space-y-1">
                <p>📍 <span className="font-medium">Destination:</span> {postData?.extraFields?.destinationName || "Unknown"}</p>
                <p>🗺️ <span className="font-medium">Location:</span> {postData?.extraFields?.countryCity || "N/A"}</p>
                <p>🕒 <span className="font-medium">Duration:</span> {postData?.extraFields?.duration || "N/A"}</p>
                <p>💰 <span className="font-medium">Budget:</span> {postData?.extraFields?.budget || "N/A"}</p>
                <p>🌤️ <span className="font-medium">Best Time to Visit:</span> {postData?.extraFields?.bestTime || "Anytime"}</p>
              </div>

              {/* Travel Story */}
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-1">✈️ Travel Story:</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {showFull
                    ? postData?.extraFields?.travelStory
                    : postData?.extraFields?.travelStory?.slice(0, 400)}
                  {postData?.extraFields?.travelStory?.length > 400 && (
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
              {postData?.extraFields?.tips && (
                <div className="mt-3 border-t border-gray-200 pt-3 text-sm">
                  <p className="font-semibold text-gray-800 mb-1">💡 Tips for Travelers:</p>
                  <p className="text-gray-700">{postData.extraFields.tips}</p>
                </div>
              )}
            </div>
          ) : null}

        </div>
        {/* Foodie */}
        <div>
          {postData?.author_profession === "Foodie" ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg px-6 pb-5 transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {postData?.extraFields?.recipeName || "Unnamed Recipe"}
                </h2>
                <span className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-full">
                  🍳 Foodie
                </span>
              </div>

              {/* Basic Info */}
              <div className="text-gray-700 text-sm mb-4 space-y-1">
                <p>🍽️ <span className="font-medium">Cuisine:</span> {postData?.extraFields?.cuisineType || "N/A"}</p>
                <p>🕐 <span className="font-medium">Preparation Time:</span> {postData?.extraFields?.prepTime || "N/A"}</p>
                <p>🔥 <span className="font-medium">Cooking Time:</span> {postData?.extraFields?.cookingTime || "N/A"}</p>
                <p>🎯 <span className="font-medium">Difficulty:</span> {postData?.extraFields?.difficultyLevel || "N/A"}</p>
                <p>⭐ <span className="font-medium">Taste Rating:</span> {postData?.extraFields?.tasteRating || "N/A"} / 5</p>
              </div>

              {/* Ingredients */}
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-1">🥕 Ingredients:</p>
                <ul className="list-disc ml-6 text-gray-700 text-sm">
                  {postData?.extraFields?.ingredients
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
                    ? postData?.extraFields?.cookingSteps
                    : postData?.extraFields?.cookingSteps?.slice(0, 400)}
                  {postData?.extraFields?.cookingSteps?.length > 400 && (
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
          {postData?.author_profession === "HealthFitnessExpert" ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg px-6 pb-5 transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {postData?.extraFields?.postTitle || "Untitled Fitness Post"}
                </h2>
                <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                  🏋️‍♂️ Health & Fitness
                </span>
              </div>

              {/* Topic & Basic Info */}
              <div className="text-gray-700 text-sm mb-4 space-y-1">
                <p>💪 <span className="font-medium">Topic:</span> {postData?.extraFields?.topic || "N/A"}</p>
                <p>⏱️ <span className="font-medium">Duration / Frequency:</span> {postData?.extraFields?.durationFrequency || "N/A"}</p>
                {postData?.extraFields?.equipmentNeeded && (
                  <p>🏋️ <span className="font-medium">Equipment Needed:</span> {postData?.extraFields?.equipmentNeeded}</p>
                )}
              </div>

              {/* Routine Description */}
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-1">📋 Routine Description:</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {showFull
                    ? postData?.extraFields?.routineDescription
                    : postData?.extraFields?.routineDescription?.slice(0, 350)}
                  {postData?.extraFields?.routineDescription?.length > 350 && (
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
                  {postData?.extraFields?.nutritionAdvice || "No nutrition advice provided."}
                </p>
              </div>
            </div>
          ) : null}

        </div>
        {/* Entrepreneur */}
        <div>
          {postData?.author_profession === "Entrepreneur" ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg px-6 pb-5 transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {postData?.extraFields?.startupName || "Unnamed Startup"}
                </h2>
                <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
                  💼 Entrepreneur
                </span>
              </div>

              {/* Basic Info */}
              <div className="text-gray-700 text-sm mb-4 space-y-1">
                <p>🏭 <span className="font-medium">Industry:</span> {postData?.extraFields?.industryType || "N/A"}</p>
                <p>👥 <span className="font-medium">Team Size:</span> {postData?.extraFields?.teamSize || "N/A"}</p>
                {postData?.extraFields?.fundingInfo && (
                  <p>💰 <span className="font-medium">Funding:</span> {postData?.extraFields?.fundingInfo}</p>
                )}
              </div>

              {/* Founding Story */}
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-1">🚀 Founding Story:</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {showFull
                    ? postData?.extraFields?.foundingStory
                    : postData?.extraFields?.foundingStory?.slice(0, 300)}
                  {postData?.extraFields?.foundingStory?.length > 300 && (
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
                  {postData?.extraFields?.challengesFaced || "No challenges described."}
                </p>
              </div>

              {/* Achievements */}
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-1">🏆 Achievements:</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {postData?.extraFields?.achievements || "No achievements listed yet."}
                </p>
              </div>

              {/* Links */}
              {postData?.extraFields?.websiteLinks && (
                <div className="mt-4">
                  <a
                    href={postData?.extraFields?.websiteLinks}
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
          {postData?.author_profession === "Student" ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg px-6 pb-5 transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  🎓 {postData?.extraFields?.projectTitle || "Untitled Project"}
                </h2>
                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                  Student
                </span>
              </div>

              {/* Basic Info */}
              <div className="text-gray-700 text-sm mb-4 space-y-1">
                <p>🏫 <span className="font-medium">Institution:</span> {postData?.extraFields?.institutionName || "N/A"}</p>
                <p>📚 <span className="font-medium">Course:</span> {postData?.extraFields?.course || "N/A"}</p>
                <p>🗓️ <span className="font-medium">Year / Semester:</span> {postData?.extraFields?.yearSemester || "N/A"}</p>
                {postData?.extraFields?.mentorName && (
                  <p>👨‍🏫 <span className="font-medium">Mentor:</span> {postData?.extraFields?.mentorName}</p>
                )}
              </div>

              {/* Project Description */}
              <div className="mb-4">
                <p className="font-semibold text-gray-800 mb-1">🧠 Project Description:</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {showFull
                    ? postData?.extraFields?.projectDescription
                    : postData?.extraFields?.projectDescription?.slice(0, 300)}
                  {postData?.extraFields?.projectDescription?.length > 300 && (
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
                  {postData?.extraFields?.keyLearnings || "No key learnings provided."}
                </p>
              </div>
            </div>
          ) : null}

        </div>
        {/* Gamer */}
        <div>
          {postData?.author_profession === "Gamer" ? (
            <div className="bg-gray-900 text-white border border-gray-700 rounded-2xl shadow-lg px-6 pb-5 hover:shadow-2xl transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-bold">{postData?.extraFields?.gameTitle || "Untitled Game"}</h2>
                <span className="px-3 py-1 text-sm bg-green-600 text-white rounded-full">
                  {postData?.extraFields?.gameGenre || "Genre"}
                </span>
              </div>

              {/* Platform & Rating */}
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-300">
                <p>🎮 Platform: {postData?.extraFields?.platform || "N/A"}</p>
                <p>⭐ Rating: {postData?.extraFields?.rating || "0"}/10</p>
                <p>⏱ Duration: {postData?.extraFields?.gameplayDuration || "N/A"}</p>
              </div>

              {/* Review / Experience */}
              <div className="mb-3">
                <p className="font-semibold mb-1">📝 Review / Experience:</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {showFull
                    ? postData?.extraFields?.reviewExperience
                    : postData?.extraFields?.reviewExperience?.slice(0, 250)}
                  {postData?.extraFields?.reviewExperience?.length > 250 && (
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
              {postData?.extraFields?.favoriteCharacter && (
                <p className="text-gray-300 text-sm">
                  🏆 Favorite: {postData?.extraFields?.favoriteCharacter}
                </p>
              )}
            </div>
          ) : null}

        </div>
        {/* MotivationalSpeaker */}
        <div>
          {postData?.author_profession === "MotivationalSpeaker" ? (
            <div className="bg-yellow-50 border border-yellow-400 rounded-2xl shadow-md px-6 pb-5 hover:shadow-lg transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-bold text-gray-900">{postData?.extraFields?.speechTitle || "Untitled Speech"}</h2>
                <span className="px-3 py-1 text-sm bg-yellow-200 text-yellow-800 rounded-full">
                  {postData?.extraFields?.topic || "Topic"}
                </span>
              </div>

              {/* Story / Message */}
              <div className="mb-3">
                <p className="font-semibold mb-1">📝 Story / Message:</p>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {showFull
                    ? postData?.extraFields?.storyMessage
                    : postData?.extraFields?.storyMessage?.slice(0, 250)}
                  {postData?.extraFields?.storyMessage?.length > 250 && (
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
                  {postData?.extraFields?.keyTakeaways?.split("\n").map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Optional Quote */}
              {postData?.extraFields?.quote && (
                <p className="text-gray-700 italic text-sm mt-3">💬 "{postData?.extraFields?.quote}"</p>
              )}
            </div>
          ) : null}

        </div>
        {/* TechReviewer */}
        <div>
          {postData?.author_profession === "TechReviewer" && (
            <div className="bg-gray-50 border border-gray-300 rounded-2xl shadow-md px-6 pb-5 hover:shadow-lg transition-all duration-300">

              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-bold text-gray-900">{postData?.extraFields?.productName || "Untitled Product"}</h2>
                <span className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-full">
                  {postData?.extraFields?.brand || "Brand"}
                </span>
              </div>

              {/* Review Summary */}
              <p className="text-gray-800 mb-3">
                <strong>Summary:</strong> {postData?.extraFields?.reviewSummary}
              </p>

              {/* Pros & Cons */}
              <div className="mb-3">
                <p className="font-semibold mb-1">Pros & Cons:</p>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {postData?.extraFields?.prosCons?.split("\n").map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Rating & Recommendation */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-800 font-semibold">Rating: {postData?.extraFields?.overallRating} / 10</p>
                <p className="text-gray-800 font-semibold">Recommended: {postData?.extraFields?.recommendation}</p>
              </div>

            </div>
          )}

        </div>
      </div>





      <div className="flex justify-between items-end text-sm text-gray-500 mt-1">
        <div className="flex items-center cursor-pointer gap-1">
          <FaHeart size={14} color="red" />
          <span>{likes} Likes</span>
        </div>
        <div className="flex items-center gap-5">
          <span>{totalComments} Comments</span>
          <span>{shares} Shares</span>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div className="flex justify-around items-center text-gray-600">
        <button onClick={handleLike} className={`flex items-center gap-1 cursor-pointer transition ${liked ? "text-red-500" : "hover:text-[#0000FF]"}`}>
          <Heart size={18} fill={liked ? "red" : "none"} /> {liked ? "Liked" : "Like"}
        </button>

        <button onClick={() => setModalOpen(true)} className="flex items-center cursor-pointer gap-1 hover:text-[#0000FF] transition">
          <MessageCircle size={18} /> Comment
        </button>

        <button className="flex cursor-pointer items-center gap-1 hover:text-[#0000FF] transition">
          <Share2 size={18} /> Share
        </button>
      </div>
    </article>
  );

  return (
    <>
      <CardContent />

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative flex flex-col">
            <button onClick={() => setModalOpen(false)} className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl">✖</button>
            <div className="p-4">
              <CardContent />
            </div>

            {/* Comment Input */}
            <div className="flex gap-2 border-t border-gray-200 p-3 bg-white">
              <img src={session?.user?.image || "/default_profile.jpg"} alt="user" className="w-10 h-10 rounded-full" />
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 border border-gray-200 rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              />
              <button onClick={handleAddComment} className="text-blue-600 font-semibold px-2">Post</button>
            </div>

            {/* Comments List */}
            <div className="space-y-3 p-4">
              {loadingComments ? (
                <p className="text-gray-400 text-sm text-center">Loading comments...</p>
              ) : comments.length === 0 ? (
                <p className="text-gray-400 text-sm text-center">No comments yet</p>
              ) : (
                comments.map((comment) => {
                  const isAuthor = session?.user?.email === comment.comment_author_email;
                  const isEditing = editingCommentId === comment.id;

                  return (
                    <div key={comment.id} className="flex gap-2">
                      <img src={comment.comment_author_image || "/default_profile.jpg"} alt="" className="w-8 h-8 rounded-full" />
                      <div className="bg-gray-100 p-2 rounded-xl flex-1 relative">
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-gray-800 font-semibold">{comment.comment_author_name}</p>
                          {isAuthor && (
                            <div className="flex gap-1 -mt-1 -mr-1">
                              <button className={`text-gray-400 hover:text-blue-500 transition duration-150 p-1 rounded-full ${isEditing ? 'text-blue-500' : ''}`} onClick={() => isEditing ? setEditingCommentId(null) : setEditingCommentId(comment.id)}>
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-gray-400 hover:text-red-500 transition duration-150 p-1 rounded-full" onClick={() => handleDeleteComment(comment.id)}>
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        {isEditing ? (
                          <div className="flex flex-col gap-1 mt-1">
                            <textarea
                              value={editingCommentText}
                              onChange={(e) => setEditingCommentText(e.target.value)}
                              className="w-full text-sm text-gray-700 p-1 border border-blue-300 rounded resize-none focus:outline-none"
                              rows="2"
                            />
                            <button
                              onClick={async () => {
                                // Update comment API + notification
                                if (!editingCommentText.trim()) return;
                                try {
                                  const res = await fetch("/api/add-comment", {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ commentId: comment.id, newText: editingCommentText.trim() }),
                                  });
                                  const data = await res.json();
                                  if (data.success) {
                                    setComments((prev) =>
                                      prev.map((c) => (c.id === comment.id ? { ...c, text: editingCommentText.trim() } : c))
                                    );
                                    setEditingCommentId(null);
                                    setEditingCommentText("");
                                    // 🔔 Notification for edited comment (optional)
                                  }
                                } catch (err) { console.error(err); }
                              }}
                              className="self-end text-xs text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded font-medium"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm text-gray-700">{comment.text}</p>
                            <small className="text-gray-400 text-xs">{formatFacebookDate(comment.created_at)}</small>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;