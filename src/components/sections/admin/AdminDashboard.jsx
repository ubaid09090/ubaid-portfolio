// src/components/sections/admin/AdminDashboard.jsx
// import React, { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import {
  FaProjectDiagram,
  FaTools,
  FaBriefcase,
  FaGraduationCap,
  FaEnvelope,
  FaUsers,
  FaEye,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [allStats, setAllStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
    educations: 0,
    messages: 0,
    visitors: 0,
    views: 0,
  });

  // Mock data - Replace with API calls
  useEffect(() => {
    // Simulate loading data
    setAllStats({
      projects: 5,
      skills: 10,
      experiences: 2,
      educations: 3,
      messages: 3,
      visitors: 1250,
      views: 5432,
    });
  }, []);

  const statCards = [
    {
      id: 1,
      title: "Total Projects",
      value: allStats.projects,
      icon: FaProjectDiagram,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      link: "/admin/projects",
      change: "+2",
      trend: "up",
    },
    {
      id: 2,
      title: "Skills",
      value: allStats.skills,
      icon: FaTools,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      link: "/admin/skills",
      change: "+1",
      trend: "up",
    },
    {
      id: 3,
      title: "Experience",
      value: allStats.experiences,
      icon: FaBriefcase,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
      link: "/admin/experience",
      change: "0",
      trend: "neutral",
    },
    {
      id: 4,
      title: "Education",
      value: allStats.educations,
      icon: FaGraduationCap,
      color: "text-yellow-600",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      link: "/admin/education",
      change: "0",
      trend: "neutral",
    },
    {
      id: 5,
      title: "Messages",
      value: allStats.messages,
      icon: FaEnvelope,
      color: "text-red-600",
      bg: "bg-red-100 dark:bg-red-900/30",
      link: "/admin/messages",
      change: "+2",
      trend: "up",
    },
    {
      id: 6,
      title: "Visitors",
      value: allStats.visitors,
      icon: FaUsers,
      color: "text-indigo-600",
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      link: "/admin/analytics",
      change: "+150",
      trend: "up",
    },
    {
      id: 7,
      title: "Page Views",
      value: allStats.views,
      icon: FaEye,
      color: "text-pink-600",
      bg: "bg-pink-100 dark:bg-pink-900/30",
      link: "/admin/analytics",
      change: "+432",
      trend: "up",
    },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name || "Admin"}! 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your portfolio today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.id}
            to={stat.link}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`text-2xl ${stat.color}`} />
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.trend === "up"
                    ? "text-green-500"
                    : stat.trend === "down"
                      ? "text-red-500"
                      : "text-gray-500"
                } flex items-center gap-1`}
              >
                {stat.trend === "up" && <FaArrowUp size={12} />}
                {stat.trend === "down" && <FaArrowDown size={12} />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.title}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/projects"
            className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <FaProjectDiagram className="text-2xl text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add Project
            </span>
          </Link>
          <Link
            to="/admin/skills"
            className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <FaTools className="text-2xl text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add Skill
            </span>
          </Link>
          <Link
            to="/admin/experience"
            className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <FaBriefcase className="text-2xl text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add Experience
            </span>
          </Link>
          <Link
            to="/admin/messages"
            className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl text-center hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <FaEnvelope className="text-2xl text-red-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              View Messages
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
