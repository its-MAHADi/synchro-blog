"use client"
import React, { useState } from 'react';
import { Users, Briefcase, MessageSquare, Send, CheckCircle, Sparkles } from 'lucide-react';
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';


export default function CommunityApplicationForm() {

  const { data: session } = useSession();


  const [formData, setFormData] = useState({
      profession: '',
      reason: '',
      hasRetaken: 'no'
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async () => {
      const newErrors = {};
      if (!formData.profession) newErrors.profession = "Please select a profession";
      if (!formData.reason.trim()) newErrors.reason = "Please tell us why you want to join";

      if (Object.keys(newErrors).length === 0) {
        try {
          const res = await fetch("/api/apply-to-community", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...formData,
              email: session?.user?.email,
            }),
          });

          const data = await res.json();

          if (data.success) {
            setSubmitted(true);
            setTimeout(() => {
              setSubmitted(false);
              setFormData({ profession: "", reason: "", hasRetaken: "no" });
              setErrors({});
            }, 4000);
          } else {
            toast.error(data.message || "Something went wrong. Please try again.");
          }
        } catch (err) {
          console.error("Error submitting form:", err);
          toast.error("An unexpected error occurred. Please try again later.");
        }
      } else {
        setErrors(newErrors);
      }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-3xl relative z-10">
        {/* Header Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl mb-6 p-8 border-4 border-blue-400">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-4 shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                Change your Profession
              </h1>
              <p className="text-blue-600 font-medium flex items-center gap-2 justify-center mt-1">
                <Sparkles className="w-4 h-4" />
                Failed multiple times? Don't worry, keep trying!
              </p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border-4 border-blue-400">
          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 animate-bounce">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-blue-900 mb-3">Application Submitted!</h2>
              <p className="text-blue-700 text-lg">We'll review your application and get back to you soon.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Profession Field */}
              <div>
                <label className="flex items-center gap-2 text-blue-900 font-bold text-lg mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Briefcase className="w-5 h-5 text-blue-700" />
                  </div>
                  What profession are you applying for?
                </label>
                <select
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full px-6 py-4 text-lg border-3 border-blue-300 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-200 transition-all bg-blue-50/50 text-blue-900 font-medium"
                >
                  <option value="" disabled>Select your profession</option>
                  <option value="developer">💻 Developer</option>
                  <option value="writer">✍️ Writer</option>
                  <option value="Blogger">📝 Blogger</option>
                  <option value="designer">🎨 Designer</option>
                  <option value="Photographer">📷 Photographer</option>
                  <option value="marketer">📊 Marketer</option>
                  <option value="Teacher/Educator">📚 Teacher/Educator</option>
                  <option value="Traveler">✈️ Traveler</option>
                  <option value="entrepreneur">🚀 Entrepreneur</option>
                  <option value="Foodie / Chef">🍳 Foodie / Chef</option>
                  <option value="Health & Fitness Expert">💪 Health & Fitness Expert</option>
                  <option value="ech Reviewer">⚡ Tech Reviewer</option>
                  <option value="Gamer">🎮 Gamer</option>
                  <option value="Motivational Speaker">🌟 Motivational Speaker</option>
                </select>
                {errors.profession && (
                  <p className="text-red-600 text-sm mt-2 ml-2 font-medium">{errors.profession}</p>
                )}
              </div>

              {/* Reason Field */}
              <div>
                <label className="flex items-center gap-2 text-blue-900 font-bold text-lg mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-blue-700" />
                  </div>
                  What was your reason of applying
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full px-6 py-4 text-lg border-3 border-blue-300 rounded-2xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-200 transition-all resize-none bg-blue-50/50 text-blue-900 h-40"
                  placeholder="Share your story and motivation..."
                />
              </div>

              {/* Retake Question */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-300">
                <label className="text-blue-900 font-bold text-lg mb-4 block">
                  Have you applied to our community more than 3 times before?
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="hasRetaken"
                      value="no"
                      checked={formData.hasRetaken === 'no'}
                      onChange={handleChange}
                      className="w-6 h-6 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-blue-900 font-semibold text-lg group-hover:text-blue-700 transition-colors">
                      No
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="hasRetaken"
                      value="yes"
                      checked={formData.hasRetaken === 'yes'}
                      onChange={handleChange}
                      className="w-6 h-6 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-blue-900 font-semibold text-lg group-hover:text-blue-700 transition-colors">
                      Yes
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-400 to-blue-400 hover:from-blue-700 hover:to-blue-900 text-white font-bold text-xl py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3 border-2 border-blue-900"
              >
                <Send className="w-6 h-6" />
                Submit Application
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}