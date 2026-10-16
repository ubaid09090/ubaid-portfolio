// src/constants/socialLinks.js
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";

export const SOCIAL_LINKS = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: FaGithub,
    color: "#333333",
    hoverColor: "hover:bg-gray-800",
    bgColor: "bg-gray-800",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: FaLinkedin,
    color: "#0077b5",
    hoverColor: "hover:bg-blue-700",
    bgColor: "bg-blue-600",
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: FaTwitter,
    color: "#1da1f2",
    hoverColor: "hover:bg-blue-400",
    bgColor: "bg-blue-400",
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com/@yourchannel",
    icon: FaYoutube,
    color: "#ff0000",
    hoverColor: "hover:bg-red-600",
    bgColor: "bg-red-600",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/yourusername",
    icon: FaInstagram,
    color: "#e4405f",
    hoverColor: "hover:bg-pink-600",
    bgColor: "bg-pink-600",
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://facebook.com/yourusername",
    icon: FaFacebook,
    color: "#1877f2",
    hoverColor: "hover:bg-blue-800",
    bgColor: "bg-blue-800",
  },
  {
    id: "website",
    name: "Website",
    url: "https://yourportfolio.com",
    icon: FaGlobe,
    color: "#8b5cf6",
    hoverColor: "hover:bg-purple-600",
    bgColor: "bg-purple-600",
  },
];

// Social links as object for easier access
export const SOCIAL_LINKS_OBJECT = SOCIAL_LINKS.reduce((acc, link) => {
  acc[link.id] = link;
  return acc;
}, {});

// Social links with names only
export const SOCIAL_LINK_NAMES = SOCIAL_LINKS.map((link) => ({
  id: link.id,
  name: link.name,
  url: link.url,
}));

export default SOCIAL_LINKS;
