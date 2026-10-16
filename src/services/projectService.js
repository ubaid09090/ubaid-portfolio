// src/services/projectService.js
import apiClient from "./apiClient";

// Get all projects
export const getProjects = async () => {
  try {
    const response = await apiClient.get("/projects");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch projects",
    };
  }
};

// Get single project by ID
export const getProjectById = async (id) => {
  try {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch project",
    };
  }
};

// Get featured projects
export const getFeaturedProjects = async () => {
  try {
    const response = await apiClient.get("/projects/featured");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to fetch featured projects",
    };
  }
};

// Create project (Admin only)
export const createProject = async (projectData) => {
  try {
    const response = await apiClient.post("/admin/projects", projectData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create project",
    };
  }
};

// Update project (Admin only)
export const updateProject = async (id, projectData) => {
  try {
    const response = await apiClient.put(`/admin/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update project",
    };
  }
};

// Delete project (Admin only)
export const deleteProject = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/projects/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete project",
    };
  }
};

export default {
  getProjects,
  getProjectById,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
};
