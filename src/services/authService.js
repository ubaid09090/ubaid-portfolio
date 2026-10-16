// src/services/authService.js
import apiClient from "./apiClient";

// Login API
export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    if (response.data.success) {
      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
      error: error.response?.data?.error || "Unknown error",
    };
  }
};

// Register API
export const register = async (name, email, password, confirmPassword) => {
  try {
    const response = await apiClient.post("/auth/register", {
      name,
      email,
      password,
      confirmPassword,
    });
    if (response.data.success) {
      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
      error: error.response?.data?.error || "Unknown error",
    };
  }
};

// Verify Token API
export const verifyToken = async () => {
  try {
    const response = await apiClient.get("/auth/verify");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Token verification failed",
    };
  }
};

// Logout API
export const logout = async () => {
  try {
    await apiClient.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Logout failed",
    };
  }
};

// Change Password API
export const changePassword = async (
  currentPassword,
  newPassword,
  confirmNewPassword,
) => {
  try {
    const response = await apiClient.put("/auth/change-password", {
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Password change failed",
    };
  }
};

export default {
  login,
  register,
  verifyToken,
  logout,
  changePassword,
};
