"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const getPriorityColor = (priority) => {
    switch (priority) {
        case "high":
            return "bg-red-100 text-red-700";
        case "medium":
            return "bg-yellow-100 text-yellow-700";
        case "low":
            return "bg-green-100 text-green-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};
const getCategoryColor = (category) => {
    switch (category) {
        case "general":
            return "bg-blue-100 text-blue-700"; // calm info tone
        case "urgent":
            return "bg-red-100 text-red-700"; // alert tone
        case "update":
            return "bg-green-100 text-green-700"; // success/update tone
        case "announcement":
            return "bg-purple-100 text-purple-700"; // standout neutral tone
        case "reminder":
            return "bg-yellow-100 text-yellow-700"; // warm attention tone
        default:
            return "bg-gray-100 text-gray-700"; // fallback neutral
    }
};


const UserNoticePage = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();

    const fetchNotices = async () => {
        try {
            const res = await fetch("/api/notice");
            const data = await res.json();
            const userNotices = data.filter(
                (notice) => notice.email === session?.user?.email
            );
            setNotices(userNotices);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session?.user?.email) fetchNotices();
    }, [session?.user?.email]);

    if (loading)
        return (
            <p className="text-center mt-10 text-lg font-medium">
                Loading notices...
            </p>
        );

    return (
        <div className="md:p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center text-gray-800">
                Notices
            </h1>

            {notices.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                    No notices for you yet.
                </p>
            ) : (
                <div className="space-y-6">
                    {notices.map((notice) => (
                        <div
                            key={notice._id}
                            className="border border-gray-300 P-5 rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col"
                        >
                            <div className="md:p-6 p-3 flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <img className="w-10 h-10 rounded-full" src="/main_logo_v2.png" alt="Author_photo" />
                                    <div className="-space-y-1">
                                        <div className="flex items-center gap-2">

                                            <p className="text-gray-900 font-medium">SYNCHRO</p>
                                        </div>
                                        <small className="text-gray-500 text-xs">
                                            <span className="text-xs text-gray-400">
                                                {new Date(notice.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </small>
                                    </div>
                                </div>
                                <div>
                                    {notice.category && (
                                        <span
                                            className={`px-2 py-1 text-xs  font-medium rounded-4xl ${getCategoryColor(
                                                notice.category
                                            )}`}
                                        >
                                            {notice.category}
                                        </span>
                                    )}

                                </div>
                            </div>

                            {/* Content */}
                            <div className="md:px-7 px-4 pb-4 flex flex-col flex-1 gap-2">
                                <div className="">
                                    <div>
                                        <h3 className="text-2xl font-semibold text-gray-900">
                                            {notice.title}
                                        </h3>
                                    </div>

                                </div>
                                <p className="text-gray-700 line-clamp-5">{notice.description}</p>
                                <div className="flex justify-between items-center mt-2">
                                    {notice.priority && (
                                        <span
                                            className={`px-2 py-1 text-[10px] font-medium rounded-full ${getPriorityColor(
                                                notice.priority
                                            )}`}
                                        >
                                            {notice.priority.toUpperCase()}
                                        </span>
                                    )}
                                    <span className="text-xs text-gray-400">
                                        {new Date(notice.createdAt).toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserNoticePage;
