// src/constants/navItems.js
import {
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaBriefcase,
  FaFileAlt,
  FaEnvelope,
} from "react-icons/fa";

export const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    path: "/",
    icon: FaHome,
    requireAuth: false,
  },
  {
    id: "about",
    label: "About",
    path: "/about",
    icon: FaUser,
    requireAuth: false,
  },
  {
    id: "projects",
    label: "Projects",
    path: "/projects",
    icon: FaProjectDiagram,
    requireAuth: false,
  },
  {
    id: "services",
    label: "Services",
    path: "/services",
    icon: FaBriefcase,
    requireAuth: false,
  },
  {
    id: "resume",
    label: "Resume",
    path: "/resume",
    icon: FaFileAlt,
    requireAuth: false,
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
    icon: FaEnvelope,
    requireAuth: false,
  },
];

export const ADMIN_NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: FaHome,
  },
  {
    id: "projects",
    label: "Projects",
    path: "/admin/projects",
    icon: FaProjectDiagram,
  },
  {
    id: "skills",
    label: "Skills",
    path: "/admin/skills",
    icon: FaBriefcase,
  },
  {
    id: "experience",
    label: "Experience",
    path: "/admin/experience",
    icon: FaBriefcase,
  },
  {
    id: "education",
    label: "Education",
    path: "/admin/education",
    icon: FaUser,
  },
  {
    id: "messages",
    label: "Messages",
    path: "/admin/messages",
    icon: FaEnvelope,
  },
  {
    id: "analytics",
    label: "Analytics",
    path: "/admin/analytics",
    icon: FaProjectDiagram,
  },
  {
    id: "profile",
    label: "Profile",
    path: "/admin/profile",
    icon: FaUser,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/admin/settings",
    icon: FaBriefcase,
  },
];

export const FOOTER_NAV_ITEMS = {
  quickLinks: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ],
  resources: [
    { label: "Blog", path: "/blog" },
    { label: "Resume", path: "/resume" },
    { label: "FAQ", path: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
  ],
};

export default {
  NAV_ITEMS,
  ADMIN_NAV_ITEMS,
  FOOTER_NAV_ITEMS,
};
