export default function Services() {
    const services = [
      {
        icon: "🧠",
        title: "Adaptive Learning",
        description: "AI-driven personalized learning paths tailored to your pace, abilities, and preferences.",
        highlight: true
      },
      {
        icon: "🌍",
        title: "Multilingual Support",
        description: "Real-time translation and audio narration in multiple languages with sign language support.",
      },
      {
        icon: "♿",
        title: "Accessibility First",
        description: "Inclusive design with dyslexia-friendly fonts, voice commands, and braille-ready content.",
      },
      {
        icon: "🎮",
        title: "Gamified Learning",
        description: "Interactive storytelling, badges, and leaderboards to make learning engaging and fun.",
        highlight: true
      },
      {
        icon: "👥",
        title: "Peer Learning",
        description: "Collaborative spaces with real-time whiteboards and file sharing for group learning.",
      },
      {
        icon: "🎯",
        title: "Career Guidance",
        description: "AI-powered aptitude tests and step-by-step career pathways for your goals.",
      },
      {
        icon: "🤖",
        title: "AI Analytics",
        description: "Advanced analytics and machine learning to track and optimize your learning journey.",
      },
      {
        icon: "👤",
        title: "User Management",
        description: "Multi-profile support for learners, educators, institutions, and parents.",
      }
    ]
  
    return (
      <div id="features" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-16 dark:text-white">
          Our <span className="bg-[#FFD700] dark:bg-[#ADFF00] px-2 font-['Dancing_Script']">Core</span> Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`
                p-6 rounded-lg h-[280px] flex flex-col
                transform transition-all duration-300
                bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                hover:scale-105 hover:bg-[#FFD700] dark:hover:bg-[#ADFF00] hover:border-transparent
                group cursor-pointer
                ${service.highlight 
                  ? "hover:shadow-[0_0_20px_rgba(173,255,0,0.3)]" 
                  : "hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                }
              `}
            >
              <div className="text-3xl mb-4 transform transition-all duration-300 group-hover:scale-110">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-black">{service.title}</h3>
              <p className="flex-grow text-gray-600 dark:text-gray-300 group-hover:text-gray-800">
                {service.description}
              </p>
              {service.highlight && (
                <button 
                  className="
                    mt-4 font-medium 
                    transform transition-all duration-300
                    hover:translate-x-2 hover:underline
                    flex items-center gap-2
                    text-gray-800 group-hover:text-black
                  "
                >
                  Learn More 
                  <span className="text-xl">→</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    )
}
  
  