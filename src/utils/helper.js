// src/utils/helper.js
import { PATTERNS } from "./constants";

// Class name merger (similar to clsx)
export const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Truncate text
export const truncateText = (text, maxLength = 100, suffix = "...") => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + suffix;
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Capitalize each word
export const capitalizeWords = (str) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

// Slugify string
export const slugify = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Generate random ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Check if value is empty
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};

// Deep clone object
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  return JSON.parse(JSON.stringify(obj));
};

// Sleep/delay function
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return { success: true };
  } catch (error) {
    console.error("Failed to copy:", error);
    return { success: false, error };
  }
};

// Download file
export const downloadFile = (content, filename, type = "text/plain") => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Validate email
export const isValidEmail = (email) => {
  return PATTERNS.EMAIL.test(email);
};

// Validate URL
export const isValidUrl = (url) => {
  return PATTERNS.URL.test(url);
};

// Validate phone
export const isValidPhone = (phone) => {
  return PATTERNS.PHONE.test(phone);
};

// Validate password
export const isValidPassword = (password) => {
  return PATTERNS.PASSWORD.test(password);
};

// Get browser info
export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browser = "Unknown";
  let version = "Unknown";

  if (ua.indexOf("Chrome") > -1) {
    browser = "Chrome";
    version = ua.match(/Chrome\/(\d+)/)?.[1] || "Unknown";
  } else if (ua.indexOf("Firefox") > -1) {
    browser = "Firefox";
    version = ua.match(/Firefox\/(\d+)/)?.[1] || "Unknown";
  } else if (ua.indexOf("Safari") > -1) {
    browser = "Safari";
    version = ua.match(/Version\/(\d+)/)?.[1] || "Unknown";
  } else if (ua.indexOf("Edge") > -1) {
    browser = "Edge";
    version = ua.match(/Edge\/(\d+)/)?.[1] || "Unknown";
  }

  return { browser, version };
};

// Get device info
export const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  let device = "Desktop";

  if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(ua)) {
    device = "Mobile";
  } else if (/Tablet|iPad/i.test(ua)) {
    device = "Tablet";
  }

  return device;
};

export default {
  cn,
  truncateText,
  capitalize,
  capitalizeWords,
  slugify,
  generateId,
  getInitials,
  isEmpty,
  deepClone,
  sleep,
  copyToClipboard,
  downloadFile,
  formatFileSize,
  isValidEmail,
  isValidUrl,
  isValidPhone,
  isValidPassword,
  getBrowserInfo,
  getDeviceInfo,
};
