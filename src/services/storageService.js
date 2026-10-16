// src/services/storageService.js

// Save data to localStorage
export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return false;
  }
};

// Get data from localStorage
export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return defaultValue;
  }
};

// Remove data from localStorage
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing from localStorage:", error);
    return false;
  }
};

// Clear all localStorage
export const clearAll = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
};

// Check if key exists in localStorage
export const hasItem = (key) => {
  return localStorage.getItem(key) !== null;
};

// Save user data
export const saveUser = (user) => {
  return setItem("user", user);
};

// Get user data
export const getUser = () => {
  return getItem("user", null);
};

// Save auth token
export const saveToken = (token) => {
  return setItem("token", token);
};

// Get auth token
export const getToken = () => {
  return getItem("token", null);
};

// Remove auth data
export const removeAuthData = () => {
  removeItem("token");
  removeItem("user");
};

// Save theme preference
export const saveTheme = (theme) => {
  return setItem("theme", theme);
};

// Get theme preference
export const getTheme = () => {
  return getItem("theme", "light");
};

export default {
  setItem,
  getItem,
  removeItem,
  clearAll,
  hasItem,
  saveUser,
  getUser,
  saveToken,
  getToken,
  removeAuthData,
  saveTheme,
  getTheme,
};
