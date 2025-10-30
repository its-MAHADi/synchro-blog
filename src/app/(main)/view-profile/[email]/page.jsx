"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ViewPostCard from "../components/ViewPostCard";
import { Briefcase, Globe, GraduationCap, Mail, MapPin } from "lucide-react";
import { FiPhone } from "react-icons/fi";
import { IoLanguageOutline } from "react-icons/io5";
import FollowButton from "../components/FollowButton";
import ViewProfileLoading from "./loading";

export default function ViewProfilePage() {
    const { email } = useParams();
    const { data: session, status: sessionStatus } = useSession();

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(true);

    // Determine if current user is following this profile
    const [isFollowing, setIsFollowing] = useState(false);

    // Utility to normalize follower value -> email string
    const followerToEmail = (f) => {
        if (!f) return null;
        if (typeof f === "string") return f;
        if (typeof f === "object" && f.email) return f.email;
        return null;
    };

    // Update isFollowing whenever user or session changes
    useEffect(() => {
        if (user && session?.user?.email) {
            const me = session.user.email;
            const following = (user.followers || []).some(
                (f) => followerToEmail(f) === me
            );
            setIsFollowing(!!following);
        } else {
            setIsFollowing(false);
        }
    }, [user, session]);

    // Fetch user info
    useEffect(() => {
        if (email) {
            const fetchUser = async () => {
                try {
                    const res = await fetch(`/api/view-user/${email}`);
                    if (!res.ok) throw new Error("Failed to load user");
                    const userData = await res.json();
                    setUser(userData);
                } catch (err) {
                    console.error("Error loading user:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [email]);

    // Fetch posts
    useEffect(() => {
        if (email) {
            const fetchPosts = async () => {
                try {
                    const res = await fetch(`/api/user-posts/${email}`);
                    if (!res.ok) throw new Error("Failed to load posts");
                    const postsData = await res.json();
                    setPosts(postsData);
                } catch (err) {
                    console.error("Error loading posts:", err);
                } finally {
                    setLoadingPosts(false);
                }
            };
            fetchPosts();
        }
    }, [email]);

    if (loading || sessionStatus === "loading") {
        return (
            <><ViewProfileLoading/></>
        );
    }

    if (!user) {
        return (
            <p className="text-center text-red-500 py-20 text-lg">User not found.</p>
        );
    }

    const isOwnProfile = session?.user?.email === user.email;

    // Handle live follow/unfollow updates from FollowButton
    const handleFollowChange = (following) => {
        setIsFollowing(following);

        const currentUserEmail = session?.user?.email;
        if (!currentUserEmail) return; // safety

        setUser((prev) => {
            if (!prev) return prev;
            const prevFollowers = prev.followers || [];

            // normalize: convert to array of strings for internal update
            const normalized = prevFollowers.map(f => followerToEmail(f)).filter(Boolean);

            let newFollowers;
            if (following) {
                // add if not exists
                newFollowers = Array.from(new Set([...normalized, currentUserEmail]));
            } else {
                // remove
                newFollowers = normalized.filter(e => e !== currentUserEmail);
            }

            return {
                ...prev,
                // keep same shape (strings) — if you want objects instead, adapt accordingly
                followers: newFollowers,
            };
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="mx-auto px-4 py-8 w-full">
                {/* HEADER */}
                <div className="relative bg-white rounded-2xl shadow-md overflow-hidden">
                    {/* Cover */}
                    <div className="h-38 md:h-72 bg-gray-200 relative">
                        {user.cover_image ? (
                            <img
                                src={user.cover_image}
                                alt="Cover"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-r from-blue-200 to-indigo-200 flex items-center justify-center text-gray-600 font-semibold text-lg">
                                No Cover Photo
                            </div>
                        )}

                        {/* Profile image */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2">
                            <img
                                src={user.image || "/default_profile.jpg"}
                                alt="Profile"
                                className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-white shadow-md object-cover bg-gray-100"
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="pt-20 md:pt-24 pb-6 text-center px-4">
                        <h1 className="text-3xl font-bold text-gray-800">{user.userName}</h1>
                        <p className="text-gray-500">{user.work || "No title set"}</p>

                        {/* Stats */}
                        <div className="flex justify-center gap-10 mt-6">
                            <div>
                                <p className="text-xl font-bold text-gray-800">
                                    {Array.isArray(user.followers) ? user.followers.length : 0}
                                </p>
                                <p className="text-sm text-gray-500">Followers</p>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-gray-800">
                                    {Array.isArray(user.following) ? user.following.length : 0}
                                </p>
                                <p className="text-sm text-gray-500">Following</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mb-4 md:mb-8">
                        {!isOwnProfile && (
                            <FollowButton
                                targetEmail={user.email}
                                initialIsFollowing={isFollowing}
                                onFollowChange={handleFollowChange}
                            />
                        )}

                        {isFollowing && (
                            <button
                                className="px-5 py-2 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-all"
                                onClick={() => console.log("Open message modal")}
                            >
                                Message
                            </button>
                        )}
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:h-[calc(100vh-12rem)]">
                    {/* About Section */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all md:sticky top-6 self-start">
                        <h3 className="text-lg font-semibold border-b pb-2 mb-3 text-[#0000FF]">
                            About
                        </h3>

                        {user.bio && (
                            <div className="text-gray-700 leading-relaxed mb-3 pb-2">{user.bio}</div>
                        )}

                        {user.work && (
                            <div className="flex items-center gap-3 mb-2 text-gray-700">
                                <Briefcase size={14} className="text-[#0000FF]" />
                                <span>{user.work}</span>
                            </div>
                        )}

                        {user.education && (
                            <div className="flex items-center gap-3 mb-2 text-gray-700">
                                <GraduationCap size={14} className="text-[#0000FF]" />
                                <span>{user.education}</span>
                            </div>
                        )}

                        {user.location && (
                            <div className="flex items-center gap-3 mb-2 text-gray-700">
                                <MapPin size={14} className="text-[#0000FF]" />
                                <span>{user.location}</span>
                            </div>
                        )}

                        {/* Skills */}
                        {(() => {
                            const skills = Array.isArray(user.skills)
                                ? user.skills
                                : typeof user.skills === "string"
                                    ? user.skills.split(",").map((s) => s.trim()).filter(Boolean)
                                    : [];
                            if (!skills.length) return null;
                            return (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold border-b pb-2 mb-3 text-[#0000FF]">
                                        Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-xs bg-orange-50 text-[#0000FF] rounded-full border border-orange-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}

                        {user.contact_email && (
                            <div className="flex items-center gap-3 mt-4 text-gray-700">
                                <Mail size={14} className="text-[#0000FF]" />
                                <span>{user.contact_email}</span>
                            </div>
                        )}

                        {user.contact_number && (
                            <div className="flex items-center gap-3 mt-2 text-gray-700">
                                <FiPhone size={14} className="text-[#0000FF]" />
                                <span>{user.contact_number}</span>
                            </div>
                        )}

                        {user.website && (
                            <div className="flex items-center gap-3 mt-2 text-gray-700">
                                <Globe size={14} className="text-[#0000FF]" />
                                <a
                                    href={user.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {user.website}
                                </a>
                            </div>
                        )}

                        {user.languages && user.languages.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className="text-[#0000FF]">
                                    <IoLanguageOutline size={16} />
                                </span>
                                {(Array.isArray(user.languages)
                                    ? user.languages
                                    : user.languages.split(",").map((s) => s.trim())
                                ).map((lang, i) => (
                                    <span key={i} className="text-gray-700">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Posts Section */}
                    <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all overflow-y-auto md:max-h-[calc(100vh-4rem)]">
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-[#0000FF] ">
                            Posts
                        </h3>

                        {loadingPosts ? (
                            <p className="text-gray-500 text-center">Loading posts...</p>
                        ) : posts.length === 0 ? (
                            <p className="text-gray-500 text-center italic">No posts yet.</p>
                        ) : (
                            <div className="space-y-6">
                                {posts.map((post) => (
                                    <ViewPostCard
                                        key={post._id}
                                        postData={post}
                                        usersData={user}
                                        onFollowUpdate={(email, following) => {
                                            setUser((prev) => ({
                                                ...prev,
                                                following: following
                                                    ? [...(prev.following || []), email]
                                                    : (prev.following || []).filter((e) => e !== email),
                                            }));
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
