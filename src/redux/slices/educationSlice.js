// src/redux/slices/educationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Load education from localStorage
const loadEducations = () => {
  try {
    const data = localStorage.getItem('educations');
    if (data) {
      const educations = JSON.parse(data);
      const updatedEducations = educations.map((education) =>
        education.institution === "Hazara University, Mansehra" &&
        education.period === "2020 - 2024"
          ? { ...education, period: "2021 - 2025" }
          : education
      );
      if (updatedEducations.some((education, index) => education !== educations[index])) {
        saveEducations(updatedEducations);
      }
      return updatedEducations;
    }
    const defaultData = [
      {
        id: 1,
        degree: "BS Software Engineering",
        institution: "Hazara University, Mansehra",
        location: "Mansehra, Pakistan",
        period: "2021 - 2025",
        grade: "CGPA: 2.6/4.0",
        description: "Studied software engineering with focus on web development.",
      },
      {
        id: 2,
        degree: "F.Sc (Pre-Engineering)",
        institution: "GHSS Kabal, Swat",
        location: "Swat, Pakistan",
        period: "2019 - 2021",
        grade: "742/1100",
        description: "Completed intermediate education with focus on mathematics and physics.",
      },
      {
        id: 3,
        degree: "Matriculation",
        institution: "Hira High School",
        location: "Swat, Pakistan",
        period: "2019",
        grade: "682/1100",
        description: "Completed secondary education with strong foundation in science.",
      },
    ];
    localStorage.setItem('educations', JSON.stringify(defaultData));
    return defaultData;
  } catch (error) {
    console.error('Error loading educations:', error);
    return [];
  }
};

const saveEducations = (educations) => {
  try {
    localStorage.setItem('educations', JSON.stringify(educations));
  } catch (error) {
    console.error('Error saving educations:', error);
  }
};

// ✅ Async thunks
export const fetchEducations = createAsyncThunk(
  "educations/fetchEducations",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return loadEducations();
    } catch (error) {
      return rejectWithValue("Failed to fetch educations");
    }
  }
);

export const createEducation = createAsyncThunk(
  "educations/createEducation",
  async (educationData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const educations = loadEducations();
      const newEducation = {
        id: Date.now(),
        ...educationData,
        createdAt: new Date().toISOString(),
      };
      educations.unshift(newEducation);
      saveEducations(educations);
      return newEducation;
    } catch (error) {
      return rejectWithValue("Failed to create education");
    }
  }
);

export const updateEducation = createAsyncThunk(
  "educations/updateEducation",
  async ({ id, educationData }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const educations = loadEducations();
      const index = educations.findIndex(e => e.id === id);
      if (index === -1) {
        return rejectWithValue("Education not found");
      }
      const updatedEducation = {
        ...educations[index],
        ...educationData,
        updatedAt: new Date().toISOString(),
      };
      educations[index] = updatedEducation;
      saveEducations(educations);
      return updatedEducation;
    } catch (error) {
      return rejectWithValue("Failed to update education");
    }
  }
);

export const deleteEducation = createAsyncThunk(
  "educations/deleteEducation",
  async (id, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const educations = loadEducations();
      const filtered = educations.filter(e => e.id !== id);
      saveEducations(filtered);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to delete education");
    }
  }
);

const initialState = {
  educations: [],
  loading: false,
  error: null,
};

const educationSlice = createSlice({
  name: "educations",
  initialState,
  reducers: {
    clearEducations: (state) => {
      state.educations = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducations.fulfilled, (state, action) => {
        state.loading = false;
        state.educations = action.payload;
        state.error = null;
      })
      .addCase(fetchEducations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.educations.unshift(action.payload);
        state.error = null;
      })
      .addCase(createEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.educations.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.educations[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.educations = state.educations.filter(e => e.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEducations } = educationSlice.actions;
export default educationSlice.reducer;