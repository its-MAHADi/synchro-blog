"use client";
import React from "react";
import {
  Code,
  Palette,
  PenTool,
  Camera,
  Plane
} from "lucide-react";

export default function AllProfessions() {
  const professions = [
    { id: "developer", name: "Developer", icon: Code, color: "indigo" },
    { id: "designer", name: "Designer", icon: Palette, color: "purple" },
    { id: "writer", name: "Writer", icon: PenTool, color: "pink" },
    { id: "photographer", name: "Photographer", icon: Camera, color: "cyan" },
    { id: "traveler", name: "Traveler", icon: Plane, color: "blue" },
  ];

  return (
    <section className="w-full py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-center mb-10">
          <div className="animate-fadeInUp">
            <h2 className="text-center text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Featured Professions of this week
            </h2>
            <p className="text-gray-600 flex items-center justify-center gap-2">
              Join our special community and get exclusive contents
            </p>
          </div>
        </div>

        {/* Profession Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {professions.map((prof, index) => {
            const Icon = prof.icon;

            return (
              <div
                key={prof.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className={`flex flex-col items-center text-center p-6 rounded-2xl shadow-md bg-white 
                  hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 
                  animate-fadeIn`}
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-full 
                    bg-gradient-to-r from-${prof.color}-500 to-${prof.color}-600 
                    hover:from-${prof.color}-600 hover:to-${prof.color}-700 
                    text-white mb-3 transition-all duration-300 shadow-md`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{prof.name}</h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simple animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
