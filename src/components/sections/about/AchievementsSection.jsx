// src/components/sections/about/AchievementsSection.jsx
// import React from "react";
import {
  FaTrophy,
  FaAward,
  FaMedal,
  FaStar,
  FaCertificate,
  FaRocket,
} from "react-icons/fa";

const AchievementsSection = () => {
  const achievements = [
    {
      id: 1,
      icon: FaTrophy,
      title: "Best Intern Performance",
      description:
        "Recognized for outstanding performance during internship at University Internship Program.",
      color: "text-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      id: 2,
      icon: FaAward,
      title: "Bachelor's Degree in Software Engineering",
      description:
        "Completed BS Software Engineering from Hazara University, Mansehra.",
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 3,
      icon: FaMedal,
      title: "Front-End Developer Certification",
      description:
        "Completed professional certification in Front-End Development.",
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 4,
      icon: FaStar,
      title: "5+ Successful Projects",
      description:
        "Successfully delivered more than 5 projects for clients with high satisfaction.",
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 5,
      icon: FaCertificate,
      title: "Experience Letter",
      description:
        "Expected experience letter from QMH Technologies for outstanding contribution.",
      color: "text-red-600",
      bg: "bg-red-100 dark:bg-red-900/30",
    },
    {
      id: 6,
      icon: FaRocket,
      title: "4 Live Websites Launched",
      description:
        "Successfully launched and maintained 4 live websites for clients.",
      color: "text-indigo-600",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            My{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Achievements
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
            Awards, certifications, and milestones
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <item.icon className={`text-3xl ${item.color}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
