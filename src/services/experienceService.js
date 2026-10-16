// src/services/experienceService.js
import apiClient from "./apiClient";

// Get all experiences
export const getExperiences = async () => {
  try {
    const response = await apiClient.get("/experiences");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch experiences",
    };
  }
};

// Create experience (Admin only)
export const createExperience = async (experienceData) => {
  try {
    const response = await apiClient.post("/admin/experiences", experienceData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create experience",
    };
  }
};

// Update experience (Admin only)
export const updateExperience = async (id, experienceData) => {
  try {
    const response = await apiClient.put(
      `/admin/experiences/${id}`,
      experienceData,
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update experience",
    };
  }
};

// Delete experience (Admin only)
export const deleteExperience = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/experiences/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete experience",
    };
  }
};

export default {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};
