// src/redux/slices/skillSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Load skills from localStorage
const loadSkills = () => {
  try {
    const data = localStorage.getItem('skills');
    if (data) {
      return JSON.parse(data);
    }
    // Default data
    const defaultData = [
      { id: 1, name: "React.js", level: 90, category: "Frontend", color: "#61dafb" },
      { id: 2, name: "Redux", level: 85, category: "State Management", color: "#764abc" },
      { id: 3, name: "Tailwind CSS", level: 90, category: "Styling", color: "#38bdf8" },
      { id: 4, name: "JavaScript", level: 85, category: "Language", color: "#f7df1e" },
      { id: 5, name: "HTML5 & CSS3", level: 95, category: "Frontend", color: "#e34f26" },
      { id: 6, name: "Git & GitHub", level: 80, category: "Tools", color: "#f05033" },
    ];
    localStorage.setItem('skills', JSON.stringify(defaultData));
    return defaultData;
  } catch (error) {
    console.error('Error loading skills:', error);
    return [];
  }
};

const saveSkills = (skills) => {
  try {
    localStorage.setItem('skills', JSON.stringify(skills));
  } catch (error) {
    console.error('Error saving skills:', error);
  }
};

// ✅ Async thunks
export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return loadSkills();
    } catch (error) {
      return rejectWithValue(error ,"Failed to fetch skills");
    }
  }
);

export const createSkill = createAsyncThunk(
  "skills/createSkill",
  async (skillData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const skills = loadSkills();
      const newSkill = {
        id: Date.now(),
        ...skillData,
        createdAt: new Date().toISOString(),
      };
      skills.push(newSkill);
      saveSkills(skills);
      return newSkill;
    } catch (error) {
      return rejectWithValue(error ,"Failed to create skill");
    }
  }
);

export const updateSkill = createAsyncThunk(
  "skills/updateSkill",
  async ({ id, skillData }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const skills = loadSkills();
      const index = skills.findIndex(s => s.id === id);
      if (index === -1) {
        return rejectWithValue("Skill not found");
      }
      const updatedSkill = {
        ...skills[index],
        ...skillData,
        updatedAt: new Date().toISOString(),
      };
      skills[index] = updatedSkill;
      saveSkills(skills);
      return updatedSkill;
    } catch (error) {
      return rejectWithValue(error , "Failed to update skill");
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "skills/deleteSkill",
  async (id, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const skills = loadSkills();
      const filtered = skills.filter(s => s.id !== id);
      saveSkills(filtered);
      return id;
    } catch (error) {
      return rejectWithValue(error ,"Failed to delete skill");
    }
  }
);

// ✅ Slice
const initialState = {
  skills: [],
  loading: false,
  error: null,
};

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    clearSkills: (state) => {
      state.skills = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
        state.error = null;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
        state.error = null;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.skills.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.skills[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter(s => s.id !== action.payload);
        state.error = null;
      });
  },
});

export const { clearSkills } = skillSlice.actions;
export default skillSlice.reducer;