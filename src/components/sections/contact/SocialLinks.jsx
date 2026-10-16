// src/components/sections/contact/SocialLinks.jsx
// import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";

const SocialLinks = () => {
  const socialLinks = [
    {
      id: 1,
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/yourusername",
      color: "hover:bg-gray-800",
      bg: "bg-gray-800",
    },
    {
      id: 2,
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://linkedin.com/in/yourusername",
      color: "hover:bg-blue-700",
      bg: "bg-blue-600",
    },
    {
      id: 3,
      name: "Twitter",
      icon: FaTwitter,
      url: "https://twitter.com/yourusername",
      color: "hover:bg-blue-400",
      bg: "bg-blue-400",
    },
    {
      id: 4,
      name: "YouTube",
      icon: FaYoutube,
      url: "https://youtube.com/@yourchannel",
      color: "hover:bg-red-600",
      bg: "bg-red-600",
    },
    {
      id: 5,
      name: "Instagram",
      icon: FaInstagram,
      url: "https://instagram.com/yourusername",
      color: "hover:bg-pink-600",
      bg: "bg-pink-600",
    },
    {
      id: 6,
      name: "Facebook",
      icon: FaFacebook,
      url: "https://facebook.com/yourusername",
      color: "hover:bg-blue-800",
      bg: "bg-blue-800",
    },
    {
      id: 7,
      name: "Portfolio",
      icon: FaGlobe,
      url: "https://yourportfolio.com",
      color: "hover:bg-purple-600",
      bg: "bg-purple-600",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
        Connect With Me
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-6">
        Follow me on social media for updates and more
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative w-12 h-12 rounded-full ${link.bg} text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg`}
            title={link.name}
          >
            <link.icon size={20} />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs bg-gray-900 text-white px-2 py-1 rounded whitespace-nowrap">
              {link.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
