// src/__tests__/redux/projectSlice.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import projectReducer, {
  fetchProjects,
  fetchProjectById,
  fetchFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
  clearCurrentProject,
  clearProjects,
} from "../../redux/slices/projectSlice";
import apiClient from "../../services/apiClient";

// Mock apiClient
vi.mock("../../services/apiClient", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("projectSlice", () => {
  let store;

  const mockProjects = [
    {
      id: 1,
      title: "Project 1",
      description: "Description 1",
      category: "Web Application",
      featured: true,
    },
    {
      id: 2,
      title: "Project 2",
      description: "Description 2",
      category: "E-Commerce",
      featured: false,
    },
  ];

  beforeEach(() => {
    store = configureStore({
      reducer: { projects: projectReducer },
    });
    vi.clearAllMocks();
  });

  it("should handle initial state", () => {
    const state = store.getState().projects;
    expect(state.projects).toEqual([]);
    expect(state.featuredProjects).toEqual([]);
    expect(state.currentProject).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  describe("fetchProjects thunk", () => {
    it("should handle fetchProjects pending", async () => {
      apiClient.get.mockImplementation(() => new Promise(() => {}));
      store.dispatch(fetchProjects());

      const state = store.getState().projects;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should handle fetchProjects fulfilled", async () => {
      apiClient.get.mockResolvedValue({ data: { data: mockProjects } });

      await store.dispatch(fetchProjects());

      const state = store.getState().projects;
      expect(state.loading).toBe(false);
      expect(state.projects).toEqual(mockProjects);
      expect(state.error).toBeNull();
    });

    it("should handle fetchProjects rejected", async () => {
      const errorMessage = "Failed to fetch projects";
      apiClient.get.mockRejectedValue({
        response: { data: { message: errorMessage } },
      });

      await store.dispatch(fetchProjects());

      const state = store.getState().projects;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe("fetchProjectById thunk", () => {
    it("should handle fetchProjectById fulfilled", async () => {
      const mockProject = mockProjects[0];
      apiClient.get.mockResolvedValue({ data: { data: mockProject } });

      await store.dispatch(fetchProjectById(1));

      const state = store.getState().projects;
      expect(state.loading).toBe(false);
      expect(state.currentProject).toEqual(mockProject);
      expect(state.error).toBeNull();
    });

    it("should handle fetchProjectById rejected", async () => {
      const errorMessage = "Project not found";
      apiClient.get.mockRejectedValue({
        response: { data: { message: errorMessage } },
      });

      await store.dispatch(fetchProjectById(999));

      const state = store.getState().projects;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.currentProject).toBeNull();
    });
  });

  describe("fetchFeaturedProjects thunk", () => {
    it("should handle fetchFeaturedProjects fulfilled", async () => {
      const featuredProjects = mockProjects.filter((p) => p.featured);
      apiClient.get.mockResolvedValue({ data: { data: featuredProjects } });

      await store.dispatch(fetchFeaturedProjects());

      const state = store.getState().projects;
      expect(state.featuredProjects).toEqual(featuredProjects);
    });
  });

  describe("createProject thunk", () => {
    const newProject = {
      title: "New Project",
      description: "New Description",
      category: "Web Application",
    };

    it("should handle createProject fulfilled", async () => {
      const createdProject = { ...newProject, id: 3 };
      apiClient.post.mockResolvedValue({ data: { data: createdProject } });

      // Add existing projects to store
      store = configureStore({
        reducer: { projects: projectReducer },
        preloadedState: {
          projects: {
            projects: mockProjects,
            featuredProjects: [],
            currentProject: null,
            loading: false,
            error: null,
          },
        },
      });

      await store.dispatch(createProject(newProject));

      const state = store.getState().projects;
      expect(state.projects).toHaveLength(3);
      expect(state.projects[0]).toEqual(createdProject);
    });

    it("should handle createProject rejected", async () => {
      const errorMessage = "Failed to create project";
      apiClient.post.mockRejectedValue({
        response: { data: { message: errorMessage } },
      });

      await store.dispatch(createProject(newProject));

      const state = store.getState().projects;
      expect(state.error).toBe(errorMessage);
    });
  });

  describe("updateProject thunk", () => {
    const updatedProject = { ...mockProjects[0], title: "Updated Title" };

    it("should handle updateProject fulfilled", async () => {
      apiClient.put.mockResolvedValue({ data: { data: updatedProject } });

      store = configureStore({
        reducer: { projects: projectReducer },
        preloadedState: {
          projects: {
            projects: mockProjects,
            featuredProjects: [],
            currentProject: null,
            loading: false,
            error: null,
          },
        },
      });

      await store.dispatch(
        updateProject({ id: 1, projectData: updatedProject }),
      );

      const state = store.getState().projects;
      expect(state.projects[0]).toEqual(updatedProject);
    });
  });

  describe("deleteProject thunk", () => {
    it("should handle deleteProject fulfilled", async () => {
      apiClient.delete.mockResolvedValue({ data: { success: true } });

      store = configureStore({
        reducer: { projects: projectReducer },
        preloadedState: {
          projects: {
            projects: mockProjects,
            featuredProjects: [],
            currentProject: null,
            loading: false,
            error: null,
          },
        },
      });

      await store.dispatch(deleteProject(1));

      const state = store.getState().projects;
      expect(state.projects).toHaveLength(1);
      expect(state.projects[0].id).toBe(2);
    });
  });

  describe("reducers", () => {
    it("should clear current project", () => {
      store = configureStore({
        reducer: { projects: projectReducer },
        preloadedState: {
          projects: {
            projects: [],
            featuredProjects: [],
            currentProject: mockProjects[0],
            loading: false,
            error: null,
          },
        },
      });

      store.dispatch(clearCurrentProject());

      const state = store.getState().projects;
      expect(state.currentProject).toBeNull();
    });

    it("should clear all projects", () => {
      store = configureStore({
        reducer: { projects: projectReducer },
        preloadedState: {
          projects: {
            projects: mockProjects,
            featuredProjects: mockProjects.filter((p) => p.featured),
            currentProject: null,
            loading: false,
            error: "Some error",
          },
        },
      });

      store.dispatch(clearProjects());

      const state = store.getState().projects;
      expect(state.projects).toEqual([]);
      expect(state.featuredProjects).toEqual([]);
      expect(state.error).toBeNull();
    });
  });
});
