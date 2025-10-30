"use client";
import React, { useState } from 'react';
import { Sparkles, Zap, Target, Brain, PenTool, Users } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// #0000FF 
// (// from-blue-600 to-indigo-800) 

export default function AIBlogBanner() {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const professions = [
    { icon: Brain, label: 'Tech Writer', color: 'from-blue-400 to-cyan-400' },
    { icon: Target, label: 'Marketer', color: 'from-purple-400 to-pink-400' },
    { icon: PenTool, label: 'Content Creator', color: 'from-blue-500 to-indigo-500' },
    { icon: Users, label: 'Business Owner', color: 'from-cyan-400 to-blue-500' }
  ];

  return (
    <div className="mt-20 border-t-2 border-[#443EB3] border-b-2  rounded-4xl relative min-h-screen  overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        ></div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Robot Writing Animation */}
        <div className="mb-8 inline-block">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50 transform hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-12 h-12 text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#D5B2EC] rounded-full flex items-center justify-center animate-bounce">
              <Zap className="w-4 h-4 text-slate-900" />
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-[#0000FF] bg-clip-text text-transparent leading-tight">
          Write Smarter with AI
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-[#0000FF] mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform your ideas into professional blog posts in minutes. 
          <span className="text-[#0000FF] font-semibold"> Choose your profession, let AI do the rest.</span>
        </p>

        {/* Profession Icons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {professions.map((prof, idx) => {
            const Icon = prof.icon;
            return (
              <div
                key={idx}
                className="group relative"
                onMouseEnter={() => setHoveredIcon(idx)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${prof.color} rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 ${hoveredIcon === idx ? 'scale-110 shadow-2xl' : 'hover:scale-105'}`}
                  style={{
                    animation: `floatIcon ${3 + idx * 0.5}s ease-in-out infinite`,
                    animationDelay: `${idx * 0.2}s`
                  }}
                >
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <p className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-slate-400 whitespace-nowrap transition-opacity duration-300 ${hoveredIcon === idx ? 'opacity-100' : 'opacity-0'}`}>
                  {prof.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
       <Link
        href="/ProfessionalsTest"
        className="cursor-pointer group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full shadow-2xl shadow-blue-500/50 hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

        <span className="relative">Take a writing test now</span>

        <Sparkles className="relative w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
      </Link>

        {/* Feature Highlights */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-xl text-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#9B0050] rounded-full animate-pulse"></div>
            <span>AI-Powered Writing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
            <span>Profession-Specific Content</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-700"></div>
            <span>Smart Analysis</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }
        @keyframes floatIcon {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  );
}
