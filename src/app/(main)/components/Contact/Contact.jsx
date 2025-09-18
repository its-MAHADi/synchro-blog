
"use client";

import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(" Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus(" Failed to send message.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "black" }}
    >
      <div className="max-w-lg w-full mx-auto p-6 rounded-2xl shadow-lg"
           style={{ backgroundColor: "#1f242d" }}>
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "" }}
        >
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
            style={{ borderColor: "#c45627" }}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
            style={{ borderColor: "#c45627" }}
            required
          />

          {/* Message */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full p-3 border rounded-xl h-32 focus:outline-none focus:ring-2"
            style={{ borderColor: "#c45627" }}
            required
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold transition-all duration-200"
            style={{
              backgroundColor: "#c45627",
              color: "white",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#a9441e")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#c45627")}
          >
            Send Message
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <p className="text-center mt-4 font-medium" style={{ color: "#213943" }}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
