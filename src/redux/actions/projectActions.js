// src/redux/actions/projectActions.js
import {
  fetchProjects,
  fetchProjectById,
  fetchFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
  clearCurrentProject,
  clearProjects,
} from "../slices/projectSlice";

// Project action creators
export const projectActions = {
  fetchProjects,
  fetchProjectById,
  fetchFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
  clearCurrentProject,
  clearProjects,
};

// Helper function to get project by ID from local state
export const getProjectById = (projects, id) => {
  return projects.find((project) => project.id === parseInt(id));
};

// Helper function to filter projects by category
export const filterProjectsByCategory = (projects, category) => {
  if (category === "All") return projects;
  return projects.filter((project) => project.category === category);
};

// Helper function to search projects
export const searchProjects = (projects, searchTerm) => {
  if (!searchTerm) return projects;
  const term = searchTerm.toLowerCase();
  return projects.filter(
    (project) =>
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.technologies?.some((tech) => tech.toLowerCase().includes(term)),
  );
};

// Helper function to get featured projects
export const getFeaturedProjects = (projects) => {
  return projects.filter((project) => project.featured);
};

export default projectActions;
