"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Users,
  Award,
  TrendingUp,
  Star,
  CheckCircle2,
  Zap
} from "lucide-react";

export default function JoinCommunity() {
  const [email, setEmail] = useState("");

  const benefits = [
    "Free professional assessment test",
    "Personalized content recommendations",
    "Connect with industry experts",
    "Exclusive community resources",
  ];

  return (
    <section className="w-full py-24 px-4 -mt-30 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        {/* Animated overlay patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2),transparent_50%)]"></div>
        </div>
        
        {/* Floating animated circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl opacity-25 animate-float animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fadeInUp">
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-[#0000FF] text-sm font-semibold mb-8 border border-white/20 shadow-xl">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Join our Professionals</span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>

          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl md:text-6xl font-bold text-[#0000FF] mb-6 leading-tight animate-fadeInUp" style={{ animationDelay: "100ms" }}>
            Your Knowledge Deserves
            <br />
            <span className="bg-gradient-to-r from-blue-600  to-indigo-800 bg-clip-text text-transparent animate-shimmer inline-block">
              An Audience
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-purple-800 mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: "200ms" }}>
            Start by taking your profession test today and unlock your potential
          </p>

          {/* Benefits list */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fadeInUp" style={{ animationDelay: "300ms" }}>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-indigo-800 text-sm font-medium animate-slideIn"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <CheckCircle2 className="w-4 h-4 text-blue-900" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Form/Buttons */}
          <div className="max-w-2xl mx-auto mb-12 animate-fadeInUp" style={{ animationDelay: "500ms" }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Email input */}
              <div className="relative w-full sm:flex-1 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 border-2 border-white/50 focus:border-white focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 font-medium shadow-xl"
                />
              </div>

              {/* Primary CTA Button */}
              <button className="group relative px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden whitespace-nowrap">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  Take Profession Test
                  <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>

            <p className="mt-4 text-sm text-blue-900">
              Free forever · No credit card required · Get results instantly
            </p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}