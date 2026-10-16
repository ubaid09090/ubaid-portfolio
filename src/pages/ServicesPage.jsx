// src/pages/ServicesPage.jsx
// import React from "react";
import { Link } from "react-router-dom";
import {
  FaReact,
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
  FaServer,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      icon: FaReact,
      title: "React Development",
      description:
        "Building modern, responsive web applications using React.js and Redux with best practices.",
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      icon: FaCode,
      title: "Front-End Development",
      description:
        "Creating clean, semantic, and accessible HTML/CSS code with modern styling.",
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 3,
      icon: FaMobileAlt,
      title: "Responsive Design",
      description:
        "Ensuring websites look great on all devices and screen sizes.",
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 4,
      icon: FaPaintBrush,
      title: "UI/UX Design",
      description:
        "Designing intuitive and beautiful user interfaces with focus on user experience.",
      color: "text-pink-500",
      bg: "bg-pink-100 dark:bg-pink-900/30",
    },
    {
      id: 5,
      icon: FaServer,
      title: "API Integration",
      description:
        "Connecting frontend applications with RESTful APIs and handling data efficiently.",
      color: "text-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      id: 6,
      icon: FaShieldAlt,
      title: "Authentication & Security",
      description:
        "Implementing secure authentication and authorization systems.",
      color: "text-red-500",
      bg: "bg-red-100 dark:bg-red-900/30",
    },
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            My{" "}
            <span className="text-blue-600 dark:text-blue-400">Services</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
            What I can do for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${service.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className={`text-3xl ${service.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
          >
            Get in Touch <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
