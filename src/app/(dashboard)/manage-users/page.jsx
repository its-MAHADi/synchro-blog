"use client";
import { useEffect, useState } from "react";
import { MapPin, Briefcase, BookOpen, Users, Globe } from "lucide-react";
import Swal from "sweetalert2";

const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null); // For modal
    const [search, setSearch] = useState(""); // Search input

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/users");
            const data = await res.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error loading users:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(); 
    }, []);

    // Delete user function
    const handleDelete = async (userId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, want to fire!",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });
            const data = await res.json();

            if (!res.ok) {
                Swal.fire("Error", data.message || "Failed to delete user", "error");
                return;
            }

            setUsers(users.filter((u) => u.userId !== userId));

            if (selectedUser?.userId === userId) setSelectedUser(null);

            Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to delete user", "error");
        }
    };

    // Filtered users based on search
    const filteredUsers = users.filter((user) => {
        const keyword = search.toLowerCase();
        return (
            (user.userName?.toLowerCase().includes(keyword)) ||
            (user.email?.toLowerCase().includes(keyword)) ||
            (user.profession?.toLowerCase().includes(keyword)) ||
            (user.userId?.toLowerCase().includes(keyword))
        );
    });

    if (loading)
        return <p className="text-center mt-10 text-lg font-medium">Loading users...</p>;

    return (
        <div className="p-6">

            <div className="md:flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-6 text-center">Users</h1>
                </div>

                <div className="md:w-96 mb-6">
                    <input
                        type="text"
                        placeholder="Search by name, email, profession, or user ID..."
                        className="w-full md:max-w-md p-2 border md:text-sm text-xs border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            {/* Search input */}

            {filteredUsers.length === 0 ? (
                <p className="text-center text-gray-500">No users found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredUsers.map((user, idx) => (
                        <div
                            key={user._id || idx}
                            className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center text-center border border-gray-300 hover:shadow-lg transition duration-200"
                        >
                            <img
                                src={user.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                alt={user.userName}
                                className="w-20 h-20 rounded-full object-cover mb-3 border"
                            />

                            <h2 className="text-lg font-semibold text-gray-800">
                                {user.userName || "Unnamed User"}
                            </h2>
                            <p className="text-sm text-gray-500">{user.email}</p>

                            <div className="mt-2 flex justify-center items-center gap-5">
                                <span
                                    className={`text-xs px-3 py-1 rounded-full ${user.userRole === "admin"
                                        ? "bg-red-100 text-red-600"
                                        : "bg-blue-100 text-blue-600"
                                        }`}
                                >
                                    {user.userRole}
                                </span>

                                {user.profession ? (
                                    <p className="flex px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs items-center justify-center gap-1">
                                        <Briefcase size={12} /> {user.profession}
                                    </p>
                                )
                                    :
                                    (
                                        <p className="flex px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs items-center justify-center gap-1">
                                            <Briefcase size={12} /> No Profession
                                        </p>
                                    )
                                }
                            </div>

                            <div className="flex justify-center gap-4 mt-3 text-xs text-gray-500">
                                <p className="flex items-center gap-1">
                                    <Users size={14} /> Followers: {user.followers?.length || 0}
                                </p>
                                <p className="flex items-center gap-1">
                                    <Users size={14} /> Following: {user.following?.length || 0}
                                </p>
                            </div>

                            <p className="text-xs text-gray-400 mt-3">
                                Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                            </p>

                            <div className="mt-4 flex justify-center items-center gap-5">
                                <button
                                    onClick={() => handleDelete(user.userId)}
                                    className="px-3 py-1 cursor-pointer text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Fire user
                                </button>
                                <button
                                    onClick={() => setSelectedUser(user)}
                                    className="px-3 py-1 cursor-pointer text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal code stays the same */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl relative overflow-y-auto max-h-[90vh]">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                        >
                            ✕
                        </button>

                        {/* Header */}
                        <div className="flex flex-col items-center text-center mb-5">
                            <img
                                src={selectedUser.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                alt={selectedUser.userName}
                                className="w-28 h-28 rounded-full border-2 border-gray-200 object-cover mb-3 shadow-sm"
                            />
                            <h2 className="text-2xl font-semibold text-gray-900">{selectedUser.userName || "Unnamed User"}</h2>
                            <p className="text-gray-500 text-sm">{selectedUser.email}</p>
                        </div>

                        {/* Table for all info */}
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto  border border-gray-300 text-sm text-gray-700">
                                <tbody>
                                    {/* Table rows (same as before) */}
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2 w-1/2">User ID</td>
                                        <td className="px-3 py-2">{selectedUser.userId || "N/A"}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Role</td>
                                        <td className="px-3 py-2">{selectedUser.userRole}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Member Status</td>
                                        <td className="px-3 py-2">{selectedUser.memberStatus ? "Premium Member" : "Free Member"}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Bio</td>
                                        <td className="px-3 py-2">{selectedUser.bio || "N/A"}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Profession</td>
                                        <td className="px-3 py-2">{selectedUser.profession || "N/A"}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Education</td>
                                        <td className="px-3 py-2">{selectedUser.education || "N/A"}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Location</td>
                                        <td className="px-3 py-2">{selectedUser.location || "N/A"}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Contact Email</td>
                                        <td className="px-3 py-2">{selectedUser.contact_email || "N/A"}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Contact Number</td>
                                        <td className="px-3 py-2">{selectedUser.contact_number || "N/A"}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Website</td>
                                        <td className="px-3 py-2">{selectedUser.website || "N/A"}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Language</td>
                                        <td className="px-3 py-2">
                                            {Array.isArray(selectedUser.language) && selectedUser.language.length > 0
                                                ? selectedUser.language.join(", ")
                                                : "N/A"}
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Skills</td>
                                        <td className="px-3 py-2">
                                            {Array.isArray(selectedUser.skills) && selectedUser.skills.length > 0
                                                ? selectedUser.skills.join(", ")
                                                : "N/A"}
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Followers</td>
                                        <td className="px-3 py-2">{selectedUser.followers?.length || 0}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Following</td>
                                        <td className="px-3 py-2">{selectedUser.following?.length || 0}</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Created At</td>
                                        <td className="px-3 py-2">
                                            {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : "N/A"}
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Last Log In</td>
                                        <td className="px-3 py-2">
                                            {selectedUser.last_log_in ? new Date(selectedUser.last_log_in).toLocaleString() : "N/A"}
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="font-medium px-3 py-2">Failed Sign In Attempts</td>
                                        <td className="px-3 py-2">{selectedUser.failedLoginAttempts}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium px-3 py-2">Lock Until</td>
                                        <td className="px-3 py-2">{selectedUser.lockUntil || "N/A"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsersPage;
