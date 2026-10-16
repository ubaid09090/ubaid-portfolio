// src/redux/slices/experienceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Load experiences from localStorage
const loadExperiences = () => {
  try {
    const data = localStorage.getItem('experiences');
    if (data) {
      const experiences = JSON.parse(data);
      const updatedExperiences = experiences.map((experience) =>
        experience.company === "QMH Technologies" &&
        ["Jan 2024 - Present", "Jan 2024 - Sep 2025"].includes(experience.period)
          ? { ...experience, period: "Sep 2025 - Present", current: true }
          : experience
      );
      if (updatedExperiences.some((experience, index) => experience !== experiences[index])) {
        saveExperiences(updatedExperiences);
      }
      return updatedExperiences;
    }
    
    const defaultData = [
      {
        id: 1,
        position: "Front-End Developer",
        company: "QMH Technologies",
        location: "Rawalpindi, Pakistan",
        period: "Sep 2025 - Present",
        current: true,
        description: [
          "Developed and maintained 5+ responsive web applications using React.js, JavaScript, Tailwind CSS, and RESTful APIs.",
          "Built reusable component library with 20+ components, reducing development time by 40% and ensuring UI consistency.",
          "Integrated RESTful APIs and implemented state management with Redux Toolkit for complex enterprise applications.",
          "Implemented JWT authentication and protected routes, enhancing security and user access control.",
          "Optimized application performance, achieving 30% faster load times and improved Core Web Vitals scores.",
          "Collaborated with cross-functional teams to deliver 10+ projects within agile sprint cycles.",
          "Wrote clean, maintainable code following industry best practices.",
          "Participated in code reviews and provided constructive feedback to peers.",
          "Contributed to the development of multiple client projects.",
          "Translated Figma designs into pixel-perfect, responsive, and user-friendly interfaces using React.js and Tailwind CSS.",
          "Followed Figma design specifications closely, ensuring accurate implementation of layouts, spacing, typography, colors, and component behavior across different devices and browsers."
        ],
      },
      {
        id: 2,
        position: "Front-End Developer Intern",
        company: "University Internship Program",
        location: "Rawalpindi, Pakistan",
        period: "Sep 2023 - Dec 2023",
        current: false,
        description: [
          "Developed and completed multiple mini front-end projects using HTML5, CSS3, JavaScript, and Tailwind CSS.",
          "Implemented responsive user interfaces and ensured compatibility across different screen sizes.",
          "Converted design requirements into functional web pages with clean and organized code.",
          "Uploaded and maintained project source code on GitHub for version control and portfolio purposes.",
          "Improved practical front-end development skills through hands-on project implementation and continuous learning.",
          "Participated in code reviews and provided constructive feedback to peers.",
        ],
      },
    ];
    
    localStorage.setItem('experiences', JSON.stringify(defaultData));
    return defaultData;
  } catch (error) {
    console.error('Error loading experiences:', error);
    return [];
  }
};

// ✅ Save experiences to localStorage
const saveExperiences = (experiences) => {
  try {
    localStorage.setItem('experiences', JSON.stringify(experiences));
  } catch (error) {
    console.error('Error saving experiences:', error);
  }
};

// ✅ Fetch all experiences
export const fetchExperiences = createAsyncThunk(
  "experiences/fetchExperiences",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return loadExperiences();
    } catch (error) {
      console.error('Fetch experiences error:', error);
      return rejectWithValue("Failed to fetch experiences");
    }
  }
);

// ✅ Create new experience
export const createExperience = createAsyncThunk(
  "experiences/createExperience",
  async (experienceData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const experiences = loadExperiences();
      const newExperience = {
        id: Date.now(),
        ...experienceData,
        createdAt: new Date().toISOString(),
      };
      experiences.unshift(newExperience);
      saveExperiences(experiences);
      return newExperience;
    } catch (error) {
      console.error('Create experience error:', error);
      return rejectWithValue("Failed to create experience");
    }
  }
);

// ✅ Update existing experience
export const updateExperience = createAsyncThunk(
  "experiences/updateExperience",
  async ({ id, experienceData }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const experiences = loadExperiences();
      const index = experiences.findIndex(e => e.id === id);
      if (index === -1) {
        return rejectWithValue("Experience not found");
      }
      const updatedExperience = {
        ...experiences[index],
        ...experienceData,
        updatedAt: new Date().toISOString(),
      };
      experiences[index] = updatedExperience;
      saveExperiences(experiences);
      return updatedExperience;
    } catch (error) {
      console.error('Update experience error:', error);
      return rejectWithValue("Failed to update experience");
    }
  }
);

// ✅ Delete experience
export const deleteExperience = createAsyncThunk(
  "experiences/deleteExperience",
  async (id, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const experiences = loadExperiences();
      const filtered = experiences.filter(e => e.id !== id);
      saveExperiences(filtered);
      return id;
    } catch (error) {
      console.error('Delete experience error:', error);
      return rejectWithValue("Failed to delete experience");
    }
  }
);

// ✅ Initial state
const initialState = {
  experiences: [],
  loading: false,
  error: null,
};

// ✅ Slice
const experienceSlice = createSlice({
  name: "experiences",
  initialState,
  reducers: {
    clearExperiences: (state) => {
      state.experiences = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = action.payload;
        state.error = null;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences.unshift(action.payload);
        state.error = null;
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.experiences.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.experiences[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = state.experiences.filter(e => e.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearExperiences } = experienceSlice.actions;
export default experienceSlice.reducer;