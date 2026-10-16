// src/components/sections/contact/ContactInfo.jsx
// import React from "react";
// import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock } from "react-icons/fa";

const ContactInfo = () => {
  const infoItems = [
    {
      id: 1,
      icon: FaMapMarkerAlt,
      title: "Location",
      details: ["Commercial Market Satellite Town Rawalpindi"],
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      icon: FaEnvelope,
      title: "Email",
      details: ["uk2011768@gmail.com"],
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 3,
      icon: FaPhone,
      title: "Phone",
      details: ["0319-7900803"],
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 4,
      icon: FaClock,
      title: "Working Hours",
      details: [
        "Mon - Fri: 9:00 AM - 6:00 PM",
        "Sat - Sun: Available by appointment",
      ],
      color: "text-orange-500",
      bg: "bg-orange-100 dark:bg-orange-900/30",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
          >
            <div
              className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center mb-4`}
            >
              <item.icon className={`text-2xl ${item.color}`} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {item.title}
            </h3>
            {item.details.map((detail, index) => (
              <p
                key={index}
                className="text-gray-600 dark:text-gray-400 text-sm"
              >
                {detail}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Availability Badge */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <div>
            <p className="font-semibold text-green-700 dark:text-green-400">
              Available for Work
            </p>
            <p className="text-sm text-green-600 dark:text-green-500">
              Open to full-time, freelance, and remote opportunities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
