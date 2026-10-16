// src/redux/slices/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper functions for localStorage
const loadProjects = () => {
  try {
    const data = localStorage.getItem('projects');
    if (data) {
      return JSON.parse(data);
    }
    // Default data if nothing in localStorage
    const defaultData = [
      {
        id: 1,
        title: "Britannia Airport Cars",
        description: "Comprehensive London airport taxi booking platform with responsive UI.",
        shortDescription: "London airport taxi booking platform with responsive UI.",
        category: "Web Application",
        technologies: ["React.js", "Tailwind CSS", "JavaScript", "API Integration"],
        image: "/assets/images/projects/britannia-airport.png",
        liveUrl: "https://britanniaairportcars.co.uk",
        githubUrl: "#",
        featured: true,
        date: "2024",
        duration: "3 months",
        features: ["Responsive design", "Booking system", "Payment integration"],
        createdAt: "2024-01-15T10:00:00.000Z",
      },
      {
        id: 2,
        title: "KhanShop Ease",
        description: "Full-featured e-commerce platform with admin dashboard.",
        shortDescription: "Complete e-commerce platform.",
        category: "E-Commerce",
        technologies: ["React.js", "Redux", "Tailwind CSS", "Firebase"],
        image: "/assets/images/projects/khanshop-ease.png",
        liveUrl: "https://khanshopease.netlify.app",
        githubUrl: "#",
        featured: true,
        date: "2024",
        duration: "4 months",
        features: ["User authentication", "Product management", "Shopping cart"],
        createdAt: "2024-02-01T10:00:00.000Z",
      },
      {
        id: 3,
        title: "Hosting by Ubaid",
        description: "Hosting practice website with modern design.",
        shortDescription: "Hosting practice website.",
        category: "Web Application",
        technologies: ["React.js", "Tailwind CSS", "JavaScript"],
        image: "/assets/images/projects/hosting-by-ubaid.png",
        liveUrl: "https://hostingbyubaid.netlify.app",
        githubUrl: "#",
        featured: false,
        date: "2024",
        duration: "2 months",
        features: ["Responsive design", "Hosting plans", "Pricing tables"],
        createdAt: "2024-03-01T10:00:00.000Z",
      },
      {
        id: 4,
        title: "Gatwick London Airport Taxi",
        description: "Professional airport transfer website.",
        shortDescription: "Professional airport taxi booking.",
        category: "Web Application",
        technologies: ["React.js", "Tailwind CSS", "JavaScript"],
        image: "/assets/images/projects/gatwick-taxi.png",
        liveUrl: "https://gatwicklondonairporttaxi.co.uk",
        githubUrl: "#",
        featured: false,
        date: "2024",
        duration: "2 months",
        features: ["Taxi booking", "Airport transfers", "Vehicle selection"],
        createdAt: "2024-03-15T10:00:00.000Z",
      },
      {
        id: 5,
        title: "QMH Technologies",
        description: "Company portfolio website with modern UI.",
        shortDescription: "Company portfolio website.",
        category: "Web Application",
        technologies: ["React.js", "Tailwind CSS", "JavaScript"],
        image: "/assets/images/projects/qmh-tech.png",
        liveUrl: "https://qhmhtechnolgies.netlify.app",
        githubUrl: "#",
        featured: false,
        date: "2024",
        duration: "1.5 months",
        features: ["Company profile", "Services showcase", "Team section"],
        createdAt: "2024-04-01T10:00:00.000Z",
      },
    ];
    localStorage.setItem('projects', JSON.stringify(defaultData));
    return defaultData;
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
};

const saveProjects = (projects) => {
  try {
    localStorage.setItem('projects', JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects:', error);
  }
};

// ✅ Async Thunks with localStorage
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const data = loadProjects();
      return data;
    } catch (error) {
      return rejectWithValue(error ,"Failed to fetch projects");
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      const projects = loadProjects();
      const project = projects.find(p => p.id === parseInt(id));
      if (!project) {
        return rejectWithValue("Project not found");
      }
      return project;
    } catch (error) {
      return rejectWithValue(error ,"Failed to fetch project");
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const projects = loadProjects();
      const newProject = {
        id: Date.now(),
        ...projectData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      projects.unshift(newProject);
      saveProjects(projects);
      return newProject;
    } catch (error) {
      return rejectWithValue(error ,"Failed to create project");
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, projectData }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const projects = loadProjects();
      const index = projects.findIndex(p => p.id === parseInt(id));
      if (index === -1) {
        return rejectWithValue("Project not found");
      }
      const updatedProject = {
        ...projects[index],
        ...projectData,
        updatedAt: new Date().toISOString(),
      };
      projects[index] = updatedProject;
      saveProjects(projects);
      return updatedProject;
    } catch (error) {
      return rejectWithValue(error ,"Failed to update project");
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const projects = loadProjects();
      const filtered = projects.filter(p => p.id !== parseInt(id));
      saveProjects(filtered);
      return parseInt(id);
    } catch (error) {
      return rejectWithValue(error ,"Failed to delete project");
    }
  }
);

// ✅ Initial State
const initialState = {
  projects: [],
  featuredProjects: [],
  currentProject: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    clearProjects: (state) => {
      state.projects = [];
      state.featuredProjects = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.featuredProjects = action.payload.filter(p => p.featured);
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
        state.error = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
        if (action.payload.featured) {
          state.featuredProjects.unshift(action.payload);
        }
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        // Update featured projects
        const featuredIndex = state.featuredProjects.findIndex(
          (p) => p.id === action.payload.id
        );
        if (featuredIndex !== -1) {
          state.featuredProjects[featuredIndex] = action.payload;
        } else if (action.payload.featured) {
          state.featuredProjects.unshift(action.payload);
        }
        if (state.currentProject?.id === action.payload.id) {
          state.currentProject = action.payload;
        }
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload);
        state.featuredProjects = state.featuredProjects.filter(
          (p) => p.id !== action.payload
        );
        if (state.currentProject?.id === action.payload) {
          state.currentProject = null;
        }
        state.error = null;
      });
  },
});

export const { clearCurrentProject, clearProjects } = projectSlice.actions;
export default projectSlice.reducer;