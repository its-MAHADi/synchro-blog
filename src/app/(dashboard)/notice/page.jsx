"use client";
import { useState, useEffect } from "react";
import { Bell, Send, Search, Filter, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const AdminNoticePage = () => {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("general");
  const [expiryDate, setExpiryDate] = useState("");
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");

  const fetchNotices = async () => {
    try {
      const res = await fetch("/api/notice");
      const data = await res.json();
      setNotices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);


  // notice submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/notice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          title,
          description,
          priority,
          category,
          expiryDate: expiryDate || null,
        }),
      });

      if (!res.ok) throw new Error("Failed to create notice");

      // SweetAlert success
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Notice sent successfully.",
        confirmButtonColor: "#3085d6",
      });

      // Clear form
      setEmail("");
      setTitle("");
      setDescription("");
      setPriority("medium");
      setCategory("general");
      setExpiryDate("");

      fetchNotices();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message,
        confirmButtonColor: "#d33",
      });
    }
  };


  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "all" || notice.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border-red-300";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "low": return "bg-green-100 text-green-700 border-green-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getCategoryIcon = (cat) => {
    const icons = {
      general: "📌",
      urgent: "🚨",
      update: "🔄",
      announcement: "📢",
      reminder: "⏰"
    };
    return icons[cat] || "📌";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Bell className="w-10 h-10 text-indigo-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Admin Notice Board</h1>
          </div>
          <p className="text-gray-600">Create and manage user notifications</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Send className="w-6 h-6 text-indigo-600" />
                Create Notice
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Email *
                  </label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notice Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter notice title"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority *
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="general">General</option>
                      <option value="urgent">Urgent</option>
                      <option value="update">Update</option>
                      <option value="announcement">Announcement</option>
                      <option value="reminder">Reminder</option>
                    </select>
                  </div>
                </div>



                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    placeholder="Enter notice description..."
                    rows="5"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Notice
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  All Notices ({filteredNotices.length})
                </h2>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search notices..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                    >
                      <option value="all">All Priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                {filteredNotices.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">No notices found</p>
                  </div>
                ) : (
                  filteredNotices.map((notice) => (
                    <div
                      key={notice._id}
                      className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all bg-gradient-to-r from-white to-gray-50"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-2xl">{getCategoryIcon(notice.category || "general")}</span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-1">{notice.title}</h3>
                              </div>
                              <div className="flex justify-end mt-3 gap-2">
                                <button
                                  onClick={async () => {
                                    const result = await Swal.fire({
                                      title: "Are you sure?",
                                      text: "You won't be able to revert this!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#d33",
                                      cancelButtonColor: "#3085d6",
                                      confirmButtonText: "Yes, delete it!",
                                      cancelButtonText: "Cancel",
                                    });

                                    if (result.isConfirmed) {
                                      try {
                                        const res = await fetch(`/api/notice/${notice._id}`, { method: "DELETE" });
                                        if (!res.ok) throw new Error("Failed to delete notice");

                                        Swal.fire("Deleted!", "Notice has been deleted.", "success");
                                        fetchNotices(); // refresh notices
                                      } catch (err) {
                                        Swal.fire("Error!", err.message, "error");
                                      }
                                    }
                                  }}
                                  className="px-2 cursor-pointer py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>

                            </div>

                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3 leading-relaxed">{notice.description}</p>

                      <div className="flex justify-between items-center gap-2 mb-2">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 border border-blue-300">
                          {notice.category || "general"}
                        </span>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(notice.priority || "medium")}`}>
                          {(notice.priority || "medium").toUpperCase()}
                        </span>

                      </div>
                      <div className="flex justify-between items-center gap-4 text-sm text-gray-500 border-t border-gray-300 pt-3 mt-3">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">To:</span> {notice.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Sent:</span> {new Date(notice.createdAt).toLocaleString()}
                        </span>

                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNoticePage;