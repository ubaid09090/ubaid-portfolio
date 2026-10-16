// src/config/routes.js

// Public Routes
export const PUBLIC_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PROJECTS: "/projects",
  PROJECT_DETAIL: "/projects/:id",
  SERVICES: "/services",
  RESUME: "/resume",
  CONTACT: "/contact",
  BLOG: "/blog",
  BLOG_DETAIL: "/blog/:id",
};

// Admin Routes
export const ADMIN_ROUTES = {
  LOGIN: "/admin/login",
  DASHBOARD: "/admin/dashboard",
  PROJECTS: "/admin/projects",
  PROJECTS_ADD: "/admin/projects/add",
  PROJECTS_EDIT: "/admin/projects/edit/:id",
  SKILLS: "/admin/skills",
  EXPERIENCE: "/admin/experience",
  EDUCATION: "/admin/education",
  MESSAGES: "/admin/messages",
  ANALYTICS: "/admin/analytics",
  PROFILE: "/admin/profile",
  SETTINGS: "/admin/settings",
};

// All Routes
export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...ADMIN_ROUTES,
  NOT_FOUND: "*",
};

// Route Groups
export const ROUTE_GROUPS = {
  PUBLIC: Object.values(PUBLIC_ROUTES),
  ADMIN: Object.values(ADMIN_ROUTES),
  PROTECTED: Object.values(ADMIN_ROUTES).filter(
    (route) => route !== ADMIN_ROUTES.LOGIN,
  ),
};

// Route Titles
export const ROUTE_TITLES = {
  "/": "Home",
  "/about": "About",
  "/projects": "Projects",
  "/services": "Services",
  "/resume": "Resume",
  "/contact": "Contact",
  "/blog": "Blog",
  "/admin/login": "Admin Login",
  "/admin/dashboard": "Dashboard",
  "/admin/projects": "Manage Projects",
  "/admin/skills": "Manage Skills",
  "/admin/experience": "Manage Experience",
  "/admin/education": "Manage Education",
  "/admin/messages": "Messages",
  "/admin/analytics": "Analytics",
  "/admin/profile": "Profile",
  "/admin/settings": "Settings",
};

export default {
  PUBLIC_ROUTES,
  ADMIN_ROUTES,
  ROUTES,
  ROUTE_GROUPS,
  ROUTE_TITLES,
};
