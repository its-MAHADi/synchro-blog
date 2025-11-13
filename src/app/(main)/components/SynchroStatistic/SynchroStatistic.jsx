"use client"; // Client component in Next.js 13+
import React, { useEffect, useState } from 'react';
import { Users, Award, BookOpen } from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const StatItem = ({ icon: Icon, value, label, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`flex flex-col items-center gap-2 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
        <div className="relative bg-white p-3 rounded-full">
          <Icon className="w-6 h-6 text-[#0000FF]" />
        </div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-white mb-1">
          {isVisible ? value : '0'}
        </div>
        <div className="text-xl text-gray-300">{label}</div>
      </div>
    </div>
  );
};

export default function SynchroStatistic() {
  const stats = [
    { icon: Users, value: <><AnimatedCounter end={18} />+</>, label: 'Registered writers', delay: 0 },
    { icon: BookOpen, value: <><AnimatedCounter end={12} />+</>, label: 'Posts Made', delay: 200 },
    { icon: Award, value: <><AnimatedCounter end={15} />+</>, label: 'Professions to choose from', delay: 400 }
  ];

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles only on client
    const newParticles = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${3 + Math.random() * 4}s`,
      delay: `${Math.random() * 2}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="mt-30 relative w-full bg-gradient-to-br from-[#3333ff] via-[#000099] to-[#3333ff] py-16 px-4 overflow-hidden rounded-tl-4xl rounded-br-4xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-white to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            Join a Growing Network of Professionals
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-white to-white mx-auto rounded-full"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={stat.delay}
            />
          ))}
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              style={{
                left: p.left,
                top: p.top,
                animation: `float ${p.duration} ease-in-out infinite`,
                animationDelay: p.delay
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
}
