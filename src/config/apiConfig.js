// src/config/apiConfig.js

// API Base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    VERIFY: "/auth/verify",
    CHANGE_PASSWORD: "/auth/change-password",
  },

  // Projects
  PROJECTS: {
    GET_ALL: "/projects",
    GET_BY_ID: "/projects/:id",
    GET_FEATURED: "/projects/featured",
    CREATE: "/admin/projects",
    UPDATE: "/admin/projects/:id",
    DELETE: "/admin/projects/:id",
  },

  // Skills
  SKILLS: {
    GET_ALL: "/skills",
    CREATE: "/admin/skills",
    UPDATE: "/admin/skills/:id",
    DELETE: "/admin/skills/:id",
  },

  // Experience
  EXPERIENCE: {
    GET_ALL: "/experiences",
    CREATE: "/admin/experiences",
    UPDATE: "/admin/experiences/:id",
    DELETE: "/admin/experiences/:id",
  },

  // Education
  EDUCATION: {
    GET_ALL: "/educations",
    CREATE: "/admin/educations",
    UPDATE: "/admin/educations/:id",
    DELETE: "/admin/educations/:id",
  },

  // Contact
  CONTACT: {
    SEND: "/contact/send",
    GET_ALL: "/admin/messages",
    DELETE: "/admin/messages/:id",
    MARK_READ: "/admin/messages/:id/read",
  },

  // Analytics
  ANALYTICS: {
    GET: "/admin/analytics",
  },

  // Profile
  PROFILE: {
    GET: "/profile",
    UPDATE: "/admin/profile",
    UPLOAD_AVATAR: "/admin/profile/avatar",
  },

  // Settings
  SETTINGS: {
    GET: "/admin/settings",
    UPDATE: "/admin/settings",
  },
};

// API Headers
export const API_HEADERS = {
  CONTENT_TYPE: "application/json",
  ACCEPT: "application/json",
};

// API Timeouts
export const API_TIMEOUT = 10000; // 10 seconds
export const API_TIMEOUT_UPLOAD = 30000; // 30 seconds for uploads

// API Status Codes
export const API_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  API_HEADERS,
  API_TIMEOUT,
  API_TIMEOUT_UPLOAD,
  API_STATUS,
};
