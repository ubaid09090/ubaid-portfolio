// src/utils/themeUtils.js
import { THEMES } from "./constants";

// Get current theme
export const getCurrentTheme = () => {
  return localStorage.getItem("theme") || THEMES.LIGHT;
};

// Check if dark mode is enabled
export const isDarkMode = () => {
  return getCurrentTheme() === THEMES.DARK;
};

// Apply theme
export const applyTheme = (theme) => {
  if (theme === THEMES.DARK) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("theme", theme);
};

// Toggle theme
export const toggleTheme = () => {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
  applyTheme(newTheme);
  return newTheme;
};

// Set theme
export const setTheme = (theme) => {
  applyTheme(theme);
  return theme;
};

// Get theme colors
export const getThemeColors = (theme = getCurrentTheme()) => {
  return {
    background: theme === THEMES.DARK ? "#0f172a" : "#f8fafc",
    surface: theme === THEMES.DARK ? "#1e293b" : "#ffffff",
    text: theme === THEMES.DARK ? "#f8fafc" : "#0f172a",
    textSecondary: theme === THEMES.DARK ? "#94a3b8" : "#64748b",
    border: theme === THEMES.DARK ? "#334155" : "#e2e8f0",
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    secondary: "#8b5cf6",
  };
};

// Get theme-specific class names
export const getThemeClasses = (theme = getCurrentTheme()) => {
  return {
    bg: theme === THEMES.DARK ? "bg-gray-900" : "bg-gray-50",
    text: theme === THEMES.DARK ? "text-white" : "text-gray-900",
    card: theme === THEMES.DARK ? "bg-gray-800" : "bg-white",
    border: theme === THEMES.DARK ? "border-gray-700" : "border-gray-200",
  };
};

// Check system preference
export const getSystemTheme = () => {
  if (typeof window === "undefined") return THEMES.LIGHT;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.DARK
    : THEMES.LIGHT;
};

// Listen to system theme changes
export const listenToSystemTheme = (callback) => {
  if (typeof window === "undefined") return () => {};

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = (e) => {
    callback(e.matches ? THEMES.DARK : THEMES.LIGHT);
  };

  mediaQuery.addEventListener("change", handler);
  return () => mediaQuery.removeEventListener("change", handler);
};

export default {
  getCurrentTheme,
  isDarkMode,
  applyTheme,
  toggleTheme,
  setTheme,
  getThemeColors,
  getThemeClasses,
  getSystemTheme,
  listenToSystemTheme,
};
