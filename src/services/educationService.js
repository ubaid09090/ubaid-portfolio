// src/services/educationService.js
import apiClient from "./apiClient";

// Get all educations
export const getEducations = async () => {
  try {
    const response = await apiClient.get("/educations");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch educations",
    };
  }
};

// Create education (Admin only)
export const createEducation = async (educationData) => {
  try {
    const response = await apiClient.post("/admin/educations", educationData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create education",
    };
  }
};

// Update education (Admin only)
export const updateEducation = async (id, educationData) => {
  try {
    const response = await apiClient.put(
      `/admin/educations/${id}`,
      educationData,
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update education",
    };
  }
};

// Delete education (Admin only)
export const deleteEducation = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/educations/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete education",
    };
  }
};

export default {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
};
