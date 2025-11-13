"use client";   // 👈 this makes it a Client Component

import { useState } from "react";

export default function EventForm() {
  const [locationType, setLocationType] = useState("online");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      title: form.title.value,
      description: form.description.value,
      image: form.image.files[0] || null,
      time: form.time.value,
      hostBy: form.hostBy.value,
      hostEmail: form.hostEmail.value,
      hostName: form.hostName.value,
      publishDate: form.publishDate.value,
      locationType,
      location: locationType === "physical" ? form.location.value : "Online",
    };
    console.log(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create New Event
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Title */}
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Event Description"
          required
          rows="4"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
        ></textarea>

        {/* Image (Optional) */}
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full px-4 py-2 border rounded-lg"
        />

        {/* Event Time */}
        <input
          type="datetime-local"
          name="time"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
        />

        {/* Host Info */}
        <input
          type="text"
          name="hostBy"
          placeholder="Event Hosted By (Organization)"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
        />
        <input
          type="email"
          name="hostEmail"
          placeholder="Host Email"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
        />
        <input
          type="text"
          name="hostName"
          placeholder="Host Name"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
        />

        {/* Publish Date */}
        <input
          type="date"
          name="publishDate"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
        />

        {/* Event Location Type */}
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="locationType"
              value="online"
              checked={locationType === "online"}
              onChange={() => setLocationType("online")}
            />
            Online
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="locationType"
              value="physical"
              checked={locationType === "physical"}
              onChange={() => setLocationType("physical")}
            />
            Physical
          </label>
        </div>

        {/* Physical Location Input */}
        {locationType === "physical" && (
          <input
            type="text"
            name="location"
            placeholder="Enter Physical Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-500"
          />
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
