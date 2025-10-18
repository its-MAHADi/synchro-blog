"use client"
import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Brain, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingElements = [
    { icon: Brain, delay: 0, x: 20, y: 20 },
    { icon: Zap, delay: 1, x: 80, y: 30 },
    { icon: Globe, delay: 2, x: 15, y: 70 },
    { icon: Search, delay: 1.5, x: 85, y: 80 }
  ];

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    // In a real Next.js app, you'd navigate to search results
    console.log('Searching for:', searchQuery);
  };

  const handleGoHome = () => {
    // In a real Next.js app, you'd use Next.js router
    console.log('Navigating home...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#213943] via-yellow-900 to-yellow-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <div
            key={index}
            className="absolute opacity-10 pointer-events-none"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animation: `float 6s ease-in-out infinite ${element.delay}s`,
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          >
            <Icon size={64} className="text-yellow-300" />
          </div>
        );
      })}

      {/* Main Content */}
      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Glowing 404 */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-400 bg-clip-text text-transparent">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-yellow-400 opacity-20 blur-sm">
            404
          </div>
        </div>

        {/* AI Brain Animation */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-[#0000FF] rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-yellow-300 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          AI Neural Network Error
        </h2>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          The content you&apos;re looking for seems to have been lost in the digital void. 
          Our AI is working to reconstruct the data pathways.
        </p>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search our AI blog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
              className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 transition-all duration-300"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-2 p-2 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full hover:from-yellow-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/"
            onClick={handleGoHome}
            className="cursor-pointer group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-pink-500 text-white font-semibold rounded-full hover:from-yellow-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Return Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="cursor-pointer px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
          >
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-gray-400 mb-4">Popular AI Topics:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Machine Learning', 'Neural Networks', 'Deep Learning', 'AI Ethics', 'Automation'].map((topic) => (
              <button
                key={topic}
                className="px-4 py-2 bg-white/10 text-gray-300 rounded-full hover:bg-white/20 hover:text-white transition-all duration-300 text-sm backdrop-blur-sm"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}