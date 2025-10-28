"use client";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";

const AdminAnnouncementPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  

  // Notification function
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch announcements from API
  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("/api/announcements"); // GET request
      if (!res.ok) throw new Error("Failed to fetch announcements");
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Submit new announcement
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (scheduleTime) formData.append("scheduleTime", scheduleTime);
      if (image) formData.append("image", image);
      formData.append("tags", tags);

      const res = await fetch("/api/announcements", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create announcement");

      showNotification("success", "Announcement created successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      setTags("");

      // Refresh announcements
      fetchAnnouncements();
    } catch (err) {
      showNotification("error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-2xl shadow-2xl transform transition-all duration-300 ${notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}>
          <span className="font-semibold">{notification.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Admin Announcements
          </h1>
          <p className="text-gray-600 text-lg">Create and manage your announcements</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 ">
          {/* Create Announcement */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                Create New Announcement
              </h2>
              <div className="space-y-5">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Enter announcement title"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Write your announcement details..."
                    rows="5"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300 resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
                  {imagePreview && <img src={imagePreview} alt="Preview" className="h-40 w-full object-cover rounded-xl" />}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    placeholder="e.g., urgent, update, news"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Schedule Publish Time (optional)
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all duration-300"
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </div>


                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !title || !description}
                  className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  {isLoading ? "Creating..." : "Create Announcement"}
                </button>
              </div>
            </div>
          </div>

          {/* All Announcements */}
          <div className="lg:col-span-3 border border-gray-200 rounded-lg max-h-screen overflow-y-auto p-5">
            <div className="mt-10 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 flex-wrap">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                All Announcements
                <span className="ml-auto text-sm font-normal bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {announcements.length} total
                </span>
              </h2>
            </div>

            <div className="space-y-6 ">
              {announcements.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100">
                  <p className="text-gray-500 text-lg">No announcements yet</p>
                </div>
              ) : (

                announcements.map((ann) => (
                  <div key={ann._id} className=" rounded-3xl shadow-lg p-5 border border-gray-300">
                    {ann.image && <img src={ann.image} alt={ann.title} className="w-full h-64 object-cover rounded-xl mb-4" />}
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold mb-2">{ann.title}</h3>
                      {ann.tags && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {ann.tags.split(",").map((tag, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                              #{tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{ann.description}</p>

                    <div className="flex items-center justify-between">

                      {/* Delete Button */}
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
                              const res = await fetch(`/api/announcements/${ann._id}`, { method: "DELETE" });
                              if (!res.ok) throw new Error("Failed to delete announcement");

                              showNotification("success", "Announcement deleted successfully");
                              fetchAnnouncements(); // Refresh list

                              Swal.fire("Deleted!", "Your announcement has been deleted.", "success");
                            } catch (err) {
                              showNotification("error", err.message);
                              Swal.fire("Error!", err.message, "error");
                            }
                          }
                        }}

                        className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all duration-300"
                      >
                        <Trash2 size={14} />
                      </button>
                      <p className="text-gray-400 text-xs mb-4">
                        {new Date(ann.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                    </div>


                  </div>
                ))


              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnnouncementPage;
