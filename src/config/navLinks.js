// src/config/navLinks.js
import {
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaBriefcase,
  FaEnvelope,
  FaCog,
} from "react-icons/fa";
import { ROUTES } from "./routes";

// Main Navigation Links
export const NAV_LINKS = [
  {
    id: "home",
    name: "Home",
    path: ROUTES.HOME,
    icon: FaHome,
  },
  {
    id: "about",
    name: "About",
    path: ROUTES.ABOUT,
    icon: FaUser,
  },
  {
    id: "projects",
    name: "Projects",
    path: ROUTES.PROJECTS,
    icon: FaProjectDiagram,
  },
  {
    id: "services",
    name: "Services",
    path: ROUTES.SERVICES,
    icon: FaBriefcase,
  },
  {
    id: "resume",
    name: "Resume",
    path: ROUTES.RESUME,
    icon: FaBriefcase,
  },
  {
    id: "contact",
    name: "Contact",
    path: ROUTES.CONTACT,
    icon: FaEnvelope,
  },
];

// Footer Navigation Links
export const FOOTER_LINKS = {
  quickLinks: [
    { name: "Home", path: ROUTES.HOME },
    { name: "About", path: ROUTES.ABOUT },
    { name: "Projects", path: ROUTES.PROJECTS },
    { name: "Services", path: ROUTES.SERVICES },
    { name: "Contact", path: ROUTES.CONTACT },
  ],
  services: [
    { name: "React Development", path: ROUTES.SERVICES },
    { name: "Front-End Development", path: ROUTES.SERVICES },
    { name: "Responsive Design", path: ROUTES.SERVICES },
    { name: "UI/UX Design", path: ROUTES.SERVICES },
  ],
  support: [
    { name: "FAQ", path: "/faq" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ],
};

// Admin Navigation Links
export const ADMIN_NAV_LINKS = [
  {
    id: "dashboard",
    name: "Dashboard",
    path: ROUTES.ADMIN.DASHBOARD,
    icon: FaHome,
  },
  {
    id: "projects",
    name: "Projects",
    path: ROUTES.ADMIN.PROJECTS,
    icon: FaProjectDiagram,
  },
  {
    id: "skills",
    name: "Skills",
    path: ROUTES.ADMIN.SKILLS,
    icon: FaCog,
  },
  {
    id: "experience",
    name: "Experience",
    path: ROUTES.ADMIN.EXPERIENCE,
    icon: FaBriefcase,
  },
  {
    id: "education",
    name: "Education",
    path: ROUTES.ADMIN.EDUCATION,
    icon: FaUser,
  },
  {
    id: "messages",
    name: "Messages",
    path: ROUTES.ADMIN.MESSAGES,
    icon: FaEnvelope,
  },
  {
    id: "analytics",
    name: "Analytics",
    path: ROUTES.ADMIN.ANALYTICS,
    icon: FaCog,
  },
  {
    id: "profile",
    name: "Profile",
    path: ROUTES.ADMIN.PROFILE,
    icon: FaUser,
  },
  {
    id: "settings",
    name: "Settings",
    path: ROUTES.ADMIN.SETTINGS,
    icon: FaCog,
  },
];

// Social Media Links
export const SOCIAL_LINKS = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: "FaGithub",
    color: "hover:bg-gray-800",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: "FaLinkedin",
    color: "hover:bg-blue-700",
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: "FaTwitter",
    color: "hover:bg-blue-400",
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com/@yourchannel",
    icon: "FaYoutube",
    color: "hover:bg-red-600",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/yourusername",
    icon: "FaInstagram",
    color: "hover:bg-pink-600",
  },
];

export default {
  NAV_LINKS,
  FOOTER_LINKS,
  ADMIN_NAV_LINKS,
  SOCIAL_LINKS,
};
