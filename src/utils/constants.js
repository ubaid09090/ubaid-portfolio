// src/utils/constants.js

// API Constants
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// App Constants
export const APP_NAME = "Ubaid Ullah Portfolio";
export const APP_DESCRIPTION = "Front-End Developer Portfolio";
export const APP_KEYWORDS =
  "React, JavaScript, Portfolio, Developer, Front-End";

// User Roles
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  GUEST: "guest",
};

// Theme Constants
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1280,
  XLARGE: 1536,
};

// Status Codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// Messages
export const MESSAGES = {
  LOGIN_SUCCESS: "Login successful!",
  LOGIN_FAILED: "Login failed. Please try again.",
  LOGOUT_SUCCESS: "Logged out successfully.",
  REGISTER_SUCCESS: "Registration successful!",
  REGISTER_FAILED: "Registration failed. Please try again.",
  CONTACT_SUCCESS: "Message sent successfully!",
  CONTACT_FAILED: "Failed to send message. Please try again.",
  PROJECT_CREATED: "Project created successfully!",
  PROJECT_UPDATED: "Project updated successfully!",
  PROJECT_DELETED: "Project deleted successfully!",
  SKILL_CREATED: "Skill added successfully!",
  SKILL_UPDATED: "Skill updated successfully!",
  SKILL_DELETED: "Skill deleted successfully!",
  EXPERIENCE_CREATED: "Experience added successfully!",
  EXPERIENCE_UPDATED: "Experience updated successfully!",
  EXPERIENCE_DELETED: "Experience deleted successfully!",
  EDUCATION_CREATED: "Education added successfully!",
  EDUCATION_UPDATED: "Education updated successfully!",
  EDUCATION_DELETED: "Education deleted successfully!",
  SETTINGS_UPDATED: "Settings updated successfully!",
  PROFILE_UPDATED: "Profile updated successfully!",
  PASSWORD_CHANGED: "Password changed successfully!",
};

// Navigation Links
export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "Resume", path: "/resume" },
  { name: "Contact", path: "/contact" },
];

// Admin Navigation Links
export const ADMIN_NAV_LINKS = [
  { name: "Dashboard", path: "/admin/dashboard", icon: "FaHome" },
  { name: "Projects", path: "/admin/projects", icon: "FaProjectDiagram" },
  { name: "Skills", path: "/admin/skills", icon: "FaTools" },
  { name: "Experience", path: "/admin/experience", icon: "FaBriefcase" },
  { name: "Education", path: "/admin/education", icon: "FaGraduationCap" },
  { name: "Messages", path: "/admin/messages", icon: "FaEnvelope" },
  { name: "Analytics", path: "/admin/analytics", icon: "FaChartBar" },
  { name: "Profile", path: "/admin/profile", icon: "FaUser" },
  { name: "Settings", path: "/admin/settings", icon: "FaCog" },
];

// Social Links
export const SOCIAL_LINKS = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
  youtube: "https://youtube.com/@yourchannel",
  instagram: "https://instagram.com/yourusername",
  facebook: "https://facebook.com/yourusername",
};

// File Constants
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

// Pagination
export const ITEMS_PER_PAGE = 6;
export const ADMIN_ITEMS_PER_PAGE = 10;

// Date Formats
export const DATE_FORMATS = {
  SHORT: "MMM dd, yyyy",
  LONG: "MMMM dd, yyyy",
  FULL: "EEEE, MMMM dd, yyyy",
  TIME: "hh:mm A",
  DATETIME: "MMM dd, yyyy hh:mm A",
  ISO: "yyyy-MM-dd",
};

// Regex Patterns - All fixed
export const PATTERNS = {
  // Email pattern
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,

  // URL pattern - simplified
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,

  // Phone pattern - FIXED: removed unnecessary escapes
  // Matches: +123-456-7890, (123) 456-7890, 1234567890, etc.
  PHONE: /^\+?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,

  // Password pattern - at least 8 chars, one letter and one number
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

export default {
  API_BASE_URL,
  APP_NAME,
  APP_DESCRIPTION,
  APP_KEYWORDS,
  ROLES,
  THEMES,
  BREAKPOINTS,
  STATUS_CODES,
  MESSAGES,
  NAV_LINKS,
  ADMIN_NAV_LINKS,
  SOCIAL_LINKS,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
  MAX_IMAGE_SIZE,
  ITEMS_PER_PAGE,
  ADMIN_ITEMS_PER_PAGE,
  DATE_FORMATS,
  PATTERNS,
};
