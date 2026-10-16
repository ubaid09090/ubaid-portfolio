// src/utils/stringUtils.js

// Truncate string
export const truncate = (str, maxLength = 100, suffix = "...") => {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + suffix;
};

// Capitalize first letter
export const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Capitalize each word
export const capitalizeWords = (str) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => capitalizeFirst(word))
    .join(" ");
};

// Convert to kebab case
export const toKebabCase = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
};

// Convert to snake case
export const toSnakeCase = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w_]/g, "");
};

// Convert to camel case
export const toCamelCase = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+(.)/g, (_, char) => char.toUpperCase());
};

// Convert to title case
export const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Count words
export const countWords = (str) => {
  if (!str) return 0;
  return str.trim().split(/\s+/).length;
};

// Count characters
export const countCharacters = (str, countSpaces = true) => {
  if (!str) return 0;
  if (countSpaces) return str.length;
  return str.replace(/\s/g, "").length;
};

// Extract hashtags
export const extractHashtags = (str) => {
  if (!str) return [];
  return str.match(/#\w+/g) || [];
};

// Extract mentions
export const extractMentions = (str) => {
  if (!str) return [];
  return str.match(/@\w+/g) || [];
};

// Remove HTML tags
export const stripHtml = (str) => {
  if (!str) return "";
  return str.replace(/<[^>]*>/g, "");
};

// Escape HTML
export const escapeHtml = (str) => {
  if (!str) return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return str.replace(/[&<>"']/g, (char) => map[char]);
};

// Unescape HTML
export const unescapeHtml = (str) => {
  if (!str) return "";
  const map = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
  };
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, (char) => map[char]);
};

// Generate random string
export const randomString = (length = 8) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Check if string is palindrome
export const isPalindrome = (str) => {
  if (!str) return false;
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === clean.split("").reverse().join("");
};

// Reverse string
export const reverseString = (str) => {
  if (!str) return "";
  return str.split("").reverse().join("");
};

export default {
  truncate,
  capitalizeFirst,
  capitalizeWords,
  toKebabCase,
  toSnakeCase,
  toCamelCase,
  toTitleCase,
  countWords,
  countCharacters,
  extractHashtags,
  extractMentions,
  stripHtml,
  escapeHtml,
  unescapeHtml,
  randomString,
  isPalindrome,
  reverseString,
};
