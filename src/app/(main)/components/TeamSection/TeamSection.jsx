import { Star, Users, Code, Palette, Heart, Sparkles, Github, Linkedin, Twitter } from "lucide-react";

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Md Mahadi Hasan",
      role: "Lead Developer",
      photo: "/images/manDeveloper.avif",
      bio: "Visionary leader with passion for community building and innovative web solutions.",
      skills: ["Leadership", "Full Stack", "Community"],
      gradient: "from-[#0000FF] to-[#e67045]"
    },
    {
      name: "Kazi Tahia",
      role: "Frontend Architect",
      photo: "/images/womanDeveloper.jpg",
      bio: "Creates beautiful, responsive interfaces that users love to interact with.",
      skills: ["React", "UI/UX", "Animation"],
      gradient: "from-[#213943] to-[#2a4a56]"
    },
    {
      name: "Nushrat Moumita",
      role: "UX/UI Designer",
      photo: "/images/womanDeveloper.jpg",
      bio: "Designs intuitive experiences that bridge the gap between users and technology.",
      skills: ["Design", "Figma", "Research"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Niloy Modak",
      role: "Backend Developer",
      photo: "/images/manDeveloper.avif",
      bio: "Builds robust server architectures that power seamless user experiences.",
      skills: ["Node.js", "Database", "API"],
      gradient: "from-green-500 to-teal-500"
    },
    {
      name: "Shuvro Goswami",
      role: "DevOps Engineer",
      photo: "/images/manDeveloper.avif",
      bio: "Ensures our platform runs smoothly with cutting-edge deployment strategies.",
      skills: ["Docker", "AWS", "CI/CD"],
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      name: "Sudipto Das",
      role: "Content Strategist",
      photo: "/images/manDeveloper.avif",
      bio: "Crafts compelling content strategies that engage and inspire our community.",
      skills: ["Writing", "SEO", "Strategy"],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-20">
        <div className="inline-flex items-center bg-[#0000FF]/10 text-[#0000FF] rounded-full px-6 py-3 mb-8 border border-[#0000FF]/20">
          <Star className="w-5 h-5 mr-2" />
          <span className="font-semibold text-lg">Meet The Builders</span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#213943] mb-6 leading-tight">
          Our Creative{" "}
          <span className="bg-gradient-to-r from-[#0000FF] to-[#e67045] bg-clip-text text-transparent">
            Dream Team
          </span>
        </h2>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Six passionate individuals who brought Synchro Blog to life. Together, we design, 
          code, and create amazing experiences that connect communities worldwide.
        </p>

        {/* Team Stats */}
        <div className="flex justify-center items-center gap-8 mt-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0000FF]">6</div>
            <div className="text-gray-600">Team Members</div>
          </div>
          <div className="w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0000FF]">1+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0000FF]">100%</div>
            <div className="text-gray-600">Dedication</div>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#0000FF]/20 hover:-translate-y-4"
            >
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
              
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className={`absolute -inset-3 bg-gradient-to-r ${member.gradient} rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-500`}></div>
                <div className="relative">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="rounded-full w-32 h-32 object-cover mx-auto shadow-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Online Status Indicator */}
                  <div className="absolute bottom-2 right-6 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center relative">
                <h3 className="text-2xl font-bold text-[#213943] mb-2 group-hover:text-[#0000FF] transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-[#0000FF] font-semibold mb-4 text-lg">
                  {member.role}
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {member.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium group-hover:bg-[#0000FF]/10 group-hover:text-[#0000FF] transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#0000FF] hover:text-white transition-colors duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#0000FF] hover:text-white transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#0000FF] hover:text-white transition-colors duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="w-6 h-6 text-[#0000FF]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Quote Section */}
      <div className="max-w-4xl mx-auto mt-20">
        <div className="bg-gradient-to-r from-[#213943] to-[#0000FF] rounded-xl p-12 text-white text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-300 rounded-full translate-x-24 translate-y-24"></div>
          </div>
          
          <div className="relative">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Heart className="w-8 h-8 text-orange-300" />
              </div>
            </div>
            
            <blockquote className="text-2xl lg:text-3xl font-bold mb-6 leading-relaxed">
              "Together, we don't just build websites—we craft digital experiences that inspire, 
              connect, and empower communities around the world."
            </blockquote>
            
            <div className="flex justify-center items-center">
              <div className="bg-white/20 px-6 py-3 rounded-full">
                <span className="font-semibold">— The Synchro Blog Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}