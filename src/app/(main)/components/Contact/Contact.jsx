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
      className="md:pb-14 p-3 rounded-xl"  >
      <h2
        className="text-4xl md:text-5xl text-center font-bold bg-gradient-to-br from-[#853716] via-[#ed703b] to-[#853716] bg-clip-text text-transparent mt-30 mb-7"
        style={{ color: "" }}
      >
        Contact Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
        <div className=" w-full mx-auto p-6 rounded-2xl shadow-lg mb-8  md:mb-0"
        >


          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2"
              style={{ borderColor: "#0000FF" }}
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
              style={{ borderColor: "#0000FF" }}
              required
            />

            {/* Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-3 border rounded-xl h-32 focus:outline-none focus:ring-2"
              style={{ borderColor: "#0000FF" }}
              required
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold transition-all duration-200"
              style={{
                backgroundColor: "#0000FF",
                color: "white",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#a9441e")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#0000FF")}
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
        <div className="flex items-center pl-0 md:pl-8">
        <div>
          <h2 className="text-5xl font-bold text-text-[#213943]">Syn<span className="text-[#0000FF]">chro</span></h2>
          <p className="text-gray-600 mt-4">Have questions, feedback, or collaboration ideas? We’d love to hear from you!
            At SYNCHRO, we believe in building connections and growing together.
            Reach out to us anytime—we’re here to listen, support, and create meaningful conversations.</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
