// src/services/skillService.js
import apiClient from "./apiClient";

// Get all skills
export const getSkills = async () => {
  try {
    const response = await apiClient.get("/skills");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch skills",
    };
  }
};

// Create skill (Admin only)
export const createSkill = async (skillData) => {
  try {
    const response = await apiClient.post("/admin/skills", skillData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create skill",
    };
  }
};

// Update skill (Admin only)
export const updateSkill = async (id, skillData) => {
  try {
    const response = await apiClient.put(`/admin/skills/${id}`, skillData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update skill",
    };
  }
};

// Delete skill (Admin only)
export const deleteSkill = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/skills/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete skill",
    };
  }
};

export default {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
