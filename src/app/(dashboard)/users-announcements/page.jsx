"use client";
import { useEffect, useState } from "react";

const UserAnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("/api/announcements");
      const data = await res.json();
      setAnnouncements(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-lg font-medium">Loading announcements...</p>;

  return (
    <div className="md:p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center text-gray-800">Announcements</h1>

      {announcements.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No announcements yet.</p>
      ) : (
        <div className="space-y-6">
          {announcements.map((ann) => (
            <div
              key={ann._id}
              className="border border-gray-300 p-3 rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col"
            >
              {/* Image */}
              {ann.image ? (
                <img
                  src={ann.image}
                  alt={ann.title}
                  className="w-full md:h-[400px] rounded-lg object-contain bg-gray-100"
                />

              ) : (
                <h2></h2>
              )}

              {/* Content */}
              <div className="md:p-6 flex flex-col mt-2 flex-1 gap-2">
                <h3 className="text-2xl font-semibold text-gray-900">{ann.title}</h3>
                <p className="text-gray-700 line-clamp-5">{ann.description}</p>
                <div className="flex justify-between items-center mt-2">
                  {ann.tags && (
                    <span className="px-2 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full">
                      {ann.tags}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {new Date(ann.createdAt).toLocaleString()}
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

export default UserAnnouncementPage;
