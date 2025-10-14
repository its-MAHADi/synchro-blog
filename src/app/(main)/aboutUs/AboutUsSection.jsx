"use client"

import { Users, Pencil, Globe, Heart, Award, Target, Eye, Sparkles, ArrowRight, Quote, Star } from "lucide-react";
import TeamSection from "../components/TeamSection/TeamSection";

const AboutUsSection = () => {
    const stats = [
        { icon: Users, value: "500+", label: "Active Bloggers", color: "from-blue-500 to-purple-600" },
        { icon: Pencil, value: "1500+", label: "Published Articles", color: "from-green-500 to-teal-600" },
        { icon: Globe, value: "75+", label: "Countries Reached", color: "from-orange-500 to-red-600" },
        { icon: Heart, value: "10k+", label: "Happy Readers", color: "from-pink-500 to-rose-600" }
    ];

    const values = [
        {
            icon: Target,
            title: "Purpose-Driven",
            description: "Every content piece serves a meaningful purpose in our community"
        },
        {
            icon: Users,
            title: "Community First",
            description: "Building connections and fostering collaboration among creators"
        },
        {
            icon: Sparkles,
            title: "Innovation",
            description: "Embracing new technologies and creative approaches to storytelling"
        },
        {
            icon: Award,
            title: "Excellence",
            description: "Maintaining high standards in content quality and user experience"
        }
    ];
    return (
        <div className="bg-white max-w-11/12 mx-auto  overflow-hidden">
            {/* Hero Section */}
            <div className="relative rounded-xl bg-gradient-to-br from-[#213943] via-[#2a4a56] to-[#c45627] text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>

                <div className="relative py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20">
                                <Sparkles className="w-5 h-5 mr-2 text-orange-300" />
                                <span className="text-white/90 font-medium">Welcome to Our Story</span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                                About{" "}
                                <span className="bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
                                    Synchro Blog
                                </span>
                            </h1>

                            <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 leading-relaxed max-w-4xl mx-auto font-light">
                                Empowering creators, connecting readers, and building a community where
                                <span className="font-semibold text-orange-300"> ideas thrive</span>.
                                Discover our story, mission, and vision.
                            </p>
                        </div>

                        {/* Quick Stats in Hero */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300">
                                    <stat.icon className="w-8 h-8 text-orange-300 mx-auto mb-3" />
                                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-white/80 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#c45627]/20 to-[#213943]/20 rounded-3xl blur-xl"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
                                    alt="Blogging Community"
                                    className="relative rounded-3xl shadow-2xl w-full transform hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center bg-[#c45627]/10 text-[#c45627] rounded-full px-4 py-2 mb-6">
                                <Quote className="w-4 h-4 mr-2" />
                                <span className="font-semibold">Our Story</span>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold text-[#213943] mb-8 leading-tight">
                                Where Stories Come to Life
                            </h2>

                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Born from a passion for authentic storytelling and meaningful connections,
                                    Synchro Blog emerged as a sanctuary for writers, thinkers, and creators
                                    who believe in the power of shared experiences.
                                </p>

                                <p>
                                    What started as a simple idea to connect like-minded individuals has grown
                                    into a thriving ecosystem where creativity knows no bounds and every voice
                                    finds its rightful place in the digital landscape.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#213943] mb-6">
                            Our Purpose & Vision
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Driven by passion, guided by purpose, and inspired by the endless possibilities of human creativity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Mission */}
                        <div className="relative">
                            <div className="absolute -inset-6 bg-gradient-to-r from-[#c45627]/10 to-transparent rounded-3xl"></div>
                            <div className="relative bg-white border-2 border-[#c45627]/20 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-[320px]">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[#c45627] p-3 rounded-2xl mr-4">
                                        <Target className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-[#213943]">Our Mission</h3>
                                </div>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    To provide a platform for passionate bloggers and writers to share their stories,
                                    knowledge, and insights with a global audience. We believe every voice deserves to be heard,
                                    and every story has the power to inspire, educate, or transform lives.
                                </p>
                            </div>
                        </div>

                        {/* Vision */}
                        <div className="relative">
                            <div className="absolute -inset-6 bg-gradient-to-l from-[#213943]/10 to-transparent rounded-3xl"></div>
                            <div className="relative bg-white border-2 border-[#213943]/20 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-[320px]">
                                <div className="flex items-center mb-6">
                                    <div className="bg-[#213943] p-3 rounded-2xl mr-4">
                                        <Eye className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-[#213943]">Our Vision</h3>
                                </div>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    To create a thriving online community where content creators can connect, learn,
                                    and grow together, shaping the future of digital storytelling. We envision a world
                                    where creativity flourishes without boundaries.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#213943] mb-6">
                            Our Core Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The principles that guide our decisions and shape our community culture.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#c45627]/20 hover:-translate-y-2"
                            >
                                <div className="bg-gradient-to-br from-[#c45627] to-[#e67045] p-4 rounded-2xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <value.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-[#213943] mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

          <div>
            <TeamSection/>
          </div>


            {/* CTA Section */}
            {/* <div className="relative py-20 rounded-xl px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#213943] to-[#c45627] text-white overflow-hidden">
                Background Elements
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 bg-orange-300 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
                        <Heart className="w-5 h-5 mr-2 text-orange-300" />
                        <span className="font-medium">Join Our Movement</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                        Ready to Share Your Story?
                    </h2>

                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Start creating, connecting, and sharing your ideas with our vibrant blogging community.
                        Your voice can inspire, educate, and transform lives.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="/subscribe"
                            className="group inline-flex items-center bg-white text-[#c45627] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/25"
                        >
                            Subscribe Now
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href="/events"
                            className="group inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-[#c45627] transition-all duration-300"
                        >
                            Join Events
                            <Users className="w-5 h-5 ml-2" />
                        </a>
                    </div>
                </div>
            </div> */}


        </div>
    );
};

export default AboutUsSection;