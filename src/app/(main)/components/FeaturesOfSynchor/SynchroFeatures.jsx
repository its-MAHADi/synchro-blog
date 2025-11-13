"use client";
import React, { useState } from "react";
import {
  PenLine,
  TrendingUp,
  Users,
  Trophy,
  Sparkles,
  ArrowRight,
  Check
} from "lucide-react";

export default function SynchroFeatures() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      id: 1,
      icon: PenLine,
      title: "Share Your Expertise",
      description: "Create and publish content that showcases your skills and knowledge to a global audience",
      color: "blue",
      benefits: ["Easy publishing tools", "Rich media support", "SEO optimized"],
      gradient: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      darkBg: "bg-blue-100",
    },
    {
      id: 2,
      icon: TrendingUp,
      title: "Grow Your Audience",
      description: "Build a loyal following and establish yourself as a thought leader in your industry",
      color: "blue",
      benefits: ["Built-in analytics", "Social sharing", "Email notifications"],
      gradient: "from-blue-600 to-blue-700",
      lightBg: "bg-blue-100",
      darkBg: "bg-blue-200",
    },
    {
      id: 3,
      icon: Users,
      title: "Learn From Peers",
      description: "Connect with like-minded professionals and exchange ideas in our vibrant community",
      color: "blue",
      benefits: ["Discussion forums", "Direct messaging", "Collaborative projects"],
      gradient: "from-blue-400 to-blue-500",
      lightBg: "bg-blue-50",
      darkBg: "bg-blue-100",
    },
    {
      id: 4,
      icon: Trophy,
      title: "Join the community",
      description: "Join the community and get more benefits that makes your writing more effective",
      color: "blue",
      benefits: ["Filter out content", "See only what matters for you", "Choose your profession with AI for better assessment"],
      gradient: "from-blue-700 to-blue-800",
      lightBg: "bg-blue-100",
      darkBg: "bg-blue-200",
    },
  ];


  return (
    <section className="w-full -mt-10 py-24 px-4 relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold mb-6 border border-indigo-200 shadow-sm">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Why Join Our Community</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Unlock Your Full Potential
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who are already sharing knowledge, building connections, and advancing their careers
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredCard === feature.id;

            return (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative animate-fadeInUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700 scale-95 group-hover:scale-100`}></div>

                {/* Card */}
                <div className="relative h-full bg-white rounded-3xl p-8 border-2 border-gray-200 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 overflow-hidden">
                  {/* Background pattern */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full opacity-5 group-hover:opacity-10 transform translate-x-20 -translate-y-20 group-hover:scale-150 transition-all duration-700`}></div>

                  {/* Icon container */}
                  <div className="relative mb-6 cursor-pointer">
                    {/* <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-md opacity-50 animate-pulse`}></div> */}
                    <div className={`relative w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Icon className={`w-8 h-8 ${isHovered ? 'animate-bounce' : ''}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Benefits list */}
                  <div className={`space-y-2 overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {feature.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-700 animate-slideIn"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating number badge */}
                <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br ${feature.gradient} text-white font-bold text-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 ring-4 ring-white`}>
                  {feature.id}
                </div>
              </div>
            );
          })}
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
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
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