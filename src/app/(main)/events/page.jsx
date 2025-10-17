"use client";
import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  Users,
  Star,
} from "lucide-react";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const events = [
    {
      id: 1,
      title: "Synchro Blogging Launch Meetup",
      date: "2025-10-05",
      time: "7:00 PM",
      location: "Online (Google Meet)",
      description:
        "Join us for the first community meetup of Synchro Blog. We'll talk about blogging trends, tips, and future plans.",
      link: "#",
      attendees: 45,
      category: "Launch Event",
      featured: true,
    },
    {
      id: 2,
      title: "Writers' Workshop",
      date: "2025-11-12",
      time: "6:30 PM",
      location: "Dhaka, Bangladesh",
      description:
        "An offline workshop for writers to learn SEO-friendly content writing and networking.",
      link: "#",
      attendees: 25,
      category: "Workshop",
      featured: false,
    },
    {
      id: 3,
      title: "Past Event Example",
      date: "2024-12-20",
      time: "5:00 PM",
      location: "Online (Zoom)",
      description:
        "A past event example to show filtering functionality in action.",
      link: "#",
      attendees: 32,
      category: "Meetup",
      featured: false,
    },
  ];

  // Filtering by search + upcoming/past
  const filteredEvents = events.filter((event) => {
    const isUpcoming = new Date(event.date) >= new Date();
    const isPast = new Date(event.date) < new Date();

    if (filter === "upcoming" && !isUpcoming) return false;
    if (filter === "past" && !isPast) return false;

    return (
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  const getStatus = (date) => {
    return new Date(date) >= new Date() ? "Upcoming" : "Past";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="mt-20 max-w-11/12 mx-auto bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#213943] via-[#2a4a56] to-[#c45627] py-10 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Calendar className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Events & <span className="text-orange-300">Meetups</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover amazing events, connect with like-minded people, and grow
              your network. Join our vibrant community of creators and
              innovators.
            </p>

            {/* Search and Filter Section */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search events, locations, categories..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-36 md:w-5 h-5" />
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="pl-10 pr-8 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm appearance-none cursor-pointer"
                    >
                      <option value="all" className="text-gray-800">
                        All Events
                      </option>
                      <option value="upcoming" className="text-gray-800">
                        Upcoming
                      </option>
                      <option value="past" className="text-gray-800">
                        Past Events
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-10 text-white">
              <div className="md:max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div className="md:p-6">
                    <div className="text-xl md:text-3xl font-bold text-[#c45627] mb-2">
                      {events.length}+
                    </div>
                    <div className="text-xs md:text-sm font-medium">
                      Total Events
                    </div>
                  </div>
                  <div className="md:p-6">
                    <div className="text-xl md:text-3xl font-bold text-[#c45627] mb-2">
                      {events.reduce((sum, event) => sum + event.attendees, 0)}+
                    </div>
                    <div className="text-xs  md:text-sm font-medium">
                      Community Members
                    </div>
                  </div>
                  <div className="md:p-6">
                    <div className="text-xl md:text-3xl font-bold text-[#c45627] mb-2">
                      {
                        events.filter(
                          (event) => new Date(event.date) >= new Date()
                        ).length
                      }
                    </div>
                    <div className="text-xs md:text-sm  font-medium">
                      Upcoming Events
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredEvents.length > 0 ? (
            <div className="space-y-8">
              {/* Featured Events */}
              {filteredEvents.some((event) => event.featured) && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-[#213943] mb-6 flex items-center">
                    <Star className="w-6 h-6 mr-2 text-[#c45627]" />
                    Featured Events
                  </h2>
                  <div className="grid gap-6">
                    {filteredEvents
                      .filter((event) => event.featured)
                      .map((event) => (
                        <div
                          key={event.id}
                          className="bg-gradient-to-r from-[#c45627] to-[#e67045] rounded-3xl p-8 text-white shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                        >
                          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-4">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                                  {event.category}
                                </span>
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    getStatus(event.date) === "Upcoming"
                                      ? "bg-green-500/20 text-green-100"
                                      : "bg-red-500/20 text-red-100"
                                  }`}
                                >
                                  {getStatus(event.date)}
                                </span>
                              </div>

                              <h3 className="text-2xl font-bold mb-4">
                                {event.title}
                              </h3>
                              <p className="text-white/90 mb-4 text-lg leading-relaxed">
                                {event.description}
                              </p>

                              <div className="flex flex-wrap gap-4 text-white/80">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-5 h-5" />
                                  <span>{formatDate(event.date)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-5 h-5" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-5 h-5" />
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="w-5 h-5" />
                                  <span>{event.attendees} attending</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex-shrink-0">
                              <a
                                href={event.link}
                                className="inline-flex items-center px-8 py-3 bg-white text-[#c45627] rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                              >
                                Register Now
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Regular Events */}
              <div>
                <h2 className="text-2xl font-bold text-[#213943] mb-6">
                  {filteredEvents.some((event) => event.featured)
                    ? "More Events"
                    : "All Events"}
                </h2>
                <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents
                    .filter((event) => !event.featured)
                    .map((event) => (
                      <div
                        key={event.id}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <span className="bg-[#c45627]/10 text-[#c45627] px-3 py-1 rounded-full text-sm font-medium">
                              {event.category}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                getStatus(event.date) === "Upcoming"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {getStatus(event.date)}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-[#213943] mb-3">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {event.description}
                          </p>

                          <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">
                                {formatDate(event.date)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <Users className="w-4 h-4" />
                              <span className="text-sm">
                                {event.attendees} attending
                              </span>
                            </div>
                          </div>

                          <a
                            href={event.link}
                            className="w-full bg-gradient-to-r from-[#c45627] to-[#e67045] text-white py-3 rounded-xl font-semibold hover:from-[#b5501f] hover:to-[#c45627] transition-all duration-300 text-center block"
                          >
                            Learn More
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full p-12 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <Search className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#213943] mb-4">
                No Events Found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters to find more
                events.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setFilter("all");
                }}
                className="bg-[#c45627] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#b5501f] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
