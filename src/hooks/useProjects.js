// src/hooks/useProjects.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  fetchProjectById,
  fetchFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
  clearCurrentProject,
} from "../redux/slices/projectSlice";

export const useProjects = () => {
  const dispatch = useDispatch();
  const { projects, featuredProjects, currentProject, loading, error } =
    useSelector((state) => state.projects);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get all categories
  const categories = [
    "All",
    ...new Set(projects.map((p) => p.category)),
  ].filter(Boolean);

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getAllProjects = () => {
    dispatch(fetchProjects());
  };

  const getProject = (id) => {
    dispatch(fetchProjectById(id));
  };

  const getFeatured = () => {
    dispatch(fetchFeaturedProjects());
  };

  const createNewProject = (data) => {
    return dispatch(createProject(data)).unwrap();
  };

  const updateExistingProject = (id, data) => {
    return dispatch(updateProject({ id, projectData: data })).unwrap();
  };

  const deleteExistingProject = (id) => {
    return dispatch(deleteProject(id)).unwrap();
  };

  const clearProject = () => {
    dispatch(clearCurrentProject());
  };

  // Load projects on mount
  useEffect(() => {
    if (projects.length === 0) {
      getAllProjects();
    }
  }, []);

  return {
    projects,
    featuredProjects,
    currentProject,
    filteredProjects,
    loading,
    error,
    categories,
    searchTerm,
    selectedCategory,
    setSearchTerm,
    setSelectedCategory,
    getAllProjects,
    getProject,
    getFeatured,
    createProject: createNewProject,
    updateProject: updateExistingProject,
    deleteProject: deleteExistingProject,
    clearProject,
  };
};

export default useProjects;
