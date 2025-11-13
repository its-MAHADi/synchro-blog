"use client";
import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Star } from "lucide-react";

export default function MyEvents() {
  const [events] = useState(myEvents);

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
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#213943] mb-10">
        🎉 My Events
      </h1>

      {/* Featured Events */}
      {events.some((e) => e.featured) && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#213943] mb-6 flex items-center">
            <Star className="w-6 h-6 mr-2 text-[#0000FF]" />
            Featured Events
          </h2>
          <div className="grid gap-6">
            {events
              .filter((e) => e.featured)
              .map((event) => (
                <div
                  key={event.id}
                  className="bg-gradient-to-r from-[#0000FF] to-[#e67045] rounded-3xl p-8 text-white shadow-2xl hover:scale-[1.02] transition-all duration-300"
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
                      <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
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
                        href="#"
                        className="inline-flex items-center px-8 py-3 bg-white text-[#0000FF] rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                      >
                        View Details
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
          {events.some((e) => e.featured) ? "More Events" : "All Events"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events
            .filter((e) => !e.featured)
            .map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-[#0000FF]/10 text-[#0000FF] px-3 py-1 rounded-full text-sm font-medium">
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
                    href="#"
                    className="w-full bg-gradient-to-r from-[#0000FF] to-[#e67045] text-white py-3 rounded-xl font-semibold hover:from-[#b5501f] hover:to-[#0000FF] transition-all duration-300 text-center block"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

const myEvents = [
  {
    id: 101,
    title: "AI & Blogging Future",
    date: "2025-12-01",
    time: "8:00 PM",
    location: "Online (Zoom)",
    description:
      "An exclusive session on how AI is shaping the future of blogging and content creation.",
    attendees: 120,
    category: "Webinar",
    featured: true,
  },
  {
    id: 102,
    title: "Writers' Networking Night",
    date: "2025-11-18",
    time: "6:00 PM",
    location: "Chittagong, Bangladesh",
    description:
      "An offline networking night for bloggers and writers to connect and collaborate.",
    attendees: 40,
    category: "Meetup",
    featured: false,
  },
  {
    id: 103,
    title: "Content Strategy Workshop",
    date: "2025-09-25",
    time: "4:00 PM",
    location: "Dhaka, Bangladesh",
    description:
      "Hands-on workshop for content creators to build strategies that actually work.",
    attendees: 60,
    category: "Workshop",
    featured: false,
  },
  {
    id: 104,
    title: "Past Event Example",
    date: "2024-11-15",
    time: "5:00 PM",
    location: "Online (Google Meet)",
    description:
      "A past event example to demonstrate past event rendering.",
    attendees: 25,
    category: "Webinar",
    featured: false,
  },
  {
    id: 105,
    title: "Blog Monetization Bootcamp",
    date: "2025-12-20",
    time: "7:00 PM",
    location: "Online (Google Meet)",
    description:
      "Learn how to monetize your blog with ads, affiliate marketing, and sponsorships.",
    attendees: 75,
    category: "Bootcamp",
    featured: true,
  },
];
