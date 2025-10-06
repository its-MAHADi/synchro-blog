"use client"
import { useState, useEffect } from 'react';
import {
    FileText,
    Crown,
    Bell,
    TrendingUp,
    Eye,
    Heart,
    MessageCircle,
    Star,
    Calendar,
    Award,
    ChevronRight,
    Sparkles
} from 'lucide-react';

export default function UserDashboard() {
    const [stats, setStats] = useState({
        posts: 0,
        views: 0,
        likes: 0,
        comments: 0
    });

    // Animate numbers on load
    useEffect(() => {
        const animateValue = (start, end, duration, setter) => {
            const startTime = Date.now();
            const animate = () => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);
                const current = Math.floor(start + (end - start) * progress);
                setter(current);
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            animate();
        };

        setTimeout(() => {
            animateValue(0, 12, 1000, (val) => setStats(prev => ({ ...prev, posts: val })));
        }, 200);
        setTimeout(() => {
            animateValue(0, 1547, 1500, (val) => setStats(prev => ({ ...prev, views: val })));
        }, 400);
        setTimeout(() => {
            animateValue(0, 89, 1200, (val) => setStats(prev => ({ ...prev, likes: val })));
        }, 600);
        setTimeout(() => {
            animateValue(0, 23, 800, (val) => setStats(prev => ({ ...prev, comments: val })));
        }, 800);
    }, []);

    const cards = [
        {
            title: "My Posts",
            value: stats.posts,
            subtitle: "Published articles",
            icon: FileText,
            gradient: "from-yellow-500 via-yellow-600 to-yellow-600",
            shadowColor: "from-amber-500 to-amber-500",
            bgPattern: "from-amber-50/80 to-amber-50/80",
            iconBg: "from-amber-500 to-amber-600",
            trend: "+2 this week",
            trendIcon: TrendingUp,
            particles: [
                { delay: "0s", color: "bg-blue-400" },
                { delay: "0.5s", color: "bg-cyan-400" },
                { delay: "1s", color: "bg-blue-300" }
            ]
        },
        {
            title: "Membership",
            value: "Premium",
            subtitle: "Active subscription",
            icon: Crown,
            gradient: "from-yellow-500 via-yellow-600 to-yellow-600",
            shadowColor: "from-amber-500 to-amber-500",
            bgPattern: "from-amber-50 to-amber-50",
            iconBg: "from-gray-900 via-gray-500 to-gray-900",
            trend: "Expires in 30 days",
            trendIcon: Calendar,
            particles: [
                { delay: "0s", color: "bg-purple-400" },
                { delay: "0.7s", color: "bg-pink-400" },
                { delay: "1.4s", color: "bg-rose-400" }
            ]
        },
        {
            title: "Notifications",
            value: "3",
            subtitle: "Unread messages",
            icon: Bell,
            gradient: "from-yellow-500 via-yellow-600 to-yellow-600",
            shadowColor: "from-amber-500 to-amber-500",
            bgPattern: "from-amber-50/80 to-amber-50/80",
            iconBg: "from-amber-500 to-amber-600",
            trend: "2 new today",
            trendIcon: Sparkles,
            particles: [
                { delay: "0s", color: "bg-emerald-400" },
                { delay: "0.3s", color: "bg-teal-400" },
                { delay: "0.9s", color: "bg-green-400" }
            ]
        }
    ];

    const activityCards = [
        {
            icon: Eye,
            title: "Total Views",
            value: stats.views.toLocaleString(),
            gradient: "from-orange-500 to-red-600",
            bgGradient: "from-orange-50/80 to-red-50/80"
        },
        {
            icon: Heart,
            title: "Total Likes",
            value: stats.likes,
            gradient: "from-amber-500 to-amber-600",
            bgGradient: "from-rose-50/80 to-pink-50/80"
        },
        {
            icon: MessageCircle,
            title: "Comments",
            value: stats.comments,
            gradient: "from-amber-500 to-amber-600",
            bgGradient: "from-indigo-50/80 to-purple-50/80"
        },
        {
            icon: Star,
            title: "Rating",
            value: "4.8",
            gradient: "from-orange-500 to-red-600",
            bgGradient: "from-yellow-50/80 to-amber-50/80"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-4 md:p-6 lg:p-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-32 right-20 w-48 h-48 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-20 left-32 w-40 h-40 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 space-y-8">
                {/* Welcome Header with 3D Effect */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl mb-4"
                        style={{
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
                        }}>
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <Sparkles size={16} className="text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-600">Dashboard Overview</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-2 tracking-tight">
                        Welcome Back! 👋
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Here's what's happening with your content and community today
                    </p>
                </div>

                {/* Main Stats Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
                    {cards.map((card, index) => {
                        const Icon = card.icon;
                        const TrendIcon = card.trendIcon;

                        return (
                            <div
                                key={card.title}
                                className="group relative transform hover:scale-105 transition-all duration-500 hover:z-10"
                                style={{
                                    animation: `slideInUp 0.6s ease-out ${index * 0.2}s both`
                                }}
                            >
                                {/* 3D Card Container */}
                                <div
                                    className={`relative p-8 bg-gradient-to-br ${card.bgPattern} backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden`}
                                    style={{
                                        boxShadow: `0 25px 50px ${card.shadowColor}, inset 0 1px 0 `
                                    }}
                                >
                                    {/* Floating Particles */}
                                    {card.particles.map((particle, i) => (
                                        <div
                                            key={i}
                                            className={`absolute w-2 h-2 ${particle.color} rounded-full opacity-20 animate-bounce`}
                                            style={{
                                                top: `${20 + i * 15}%`,
                                                right: `${10 + i * 5}%`,
                                                animationDelay: particle.delay,
                                                animationDuration: '2s'
                                            }}
                                        />
                                    ))}

                                    {/* Background Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />

                                    {/* Header with Icon */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-br ${card.iconBg} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-all duration-300`}
                                            style={{
                                                boxShadow: `0 15px 30px ${card.shadowColor}`
                                            }}
                                        >
                                            <Icon size={28} className="text-white drop-shadow-lg" />
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full">
                                            <TrendIcon size={14} className="text-green-600" />
                                            <span className="text-xs font-medium text-gray-700">{card.trend}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2">
                                        <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
                                        <div className="flex items-baseline gap-2">
                                            <span className={`text-4xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                                                {card.value}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm font-medium">{card.subtitle}</p>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer">
                                        <span className="text-sm font-medium">View Details</span>
                                        <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>

                                    {/* Glow Effect */}
                                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Activity Overview */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                            <TrendingUp size={20} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Activity Overview</h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {activityCards.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="group relative transform hover:scale-105 transition-all duration-300"
                                    style={{
                                        animation: `slideInUp 0.4s ease-out ${index * 0.1 + 1}s both`
                                    }}
                                >
                                    <div
                                        className={`relative p-6 bg-gradient-to-br ${item.bgGradient} backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                                        style={{
                                            boxShadow: '0 15px 30px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)'
                                        }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-all duration-300`}>
                                                <Icon size={20} className="text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">{item.title}</p>
                                                <p className={`text-2xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Hover Glow */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Achievement Badge */}
                <div className="flex justify-center">
                    <div
                        className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30"
                        style={{
                            boxShadow: '0 20px 40px rgba(251, 191, 36, 0.2), inset 0 1px 0 rgba(255,255,255,0.4)',
                            animation: 'slideInUp 0.6s ease-out 1.5s both'
                        }}
                    >
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                            <Award size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Content Creator</h3>
                            <p className="text-sm text-gray-600">Keep up the great work! 🚀</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}