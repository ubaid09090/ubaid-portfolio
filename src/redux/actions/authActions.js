// src/redux/actions/authActions.js
import {
  login,
  register,
  verifyToken,
  logoutUser,
  logout,
  clearError,
} from "../slices/authSlice";

// Auth action creators
export const authActions = {
  login,
  register,
  verifyToken,
  logoutUser,
  logout,
  clearError,
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Helper function to get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Helper function to get auth token
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export default authActions;
