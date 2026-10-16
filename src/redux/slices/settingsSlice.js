// src/redux/slices/settingsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Load settings from localStorage
const loadSettings = () => {
  try {
    const data = localStorage.getItem('settings');
    if (data) return JSON.parse(data);
    // Default settings
    const defaultSettings = {
      siteName: "Ubaid Ullah Portfolio",
      theme: "dark",
      socialLinks: {
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername",
        youtube: "https://youtube.com/@yourchannel",
        instagram: "https://instagram.com/yourusername",
      },
      seo: {
        title: "Ubaid Ullah - Front-End Developer Portfolio",
        description: "Portfolio of Ubaid Ullah, Front-End Developer",
        keywords: "React, JavaScript, Portfolio, Developer",
      },
    };
    localStorage.setItem('settings', JSON.stringify(defaultSettings));
    return defaultSettings;
  } catch (error) {
    console.error('Error loading settings:', error);
    return null;
  }
};

const saveSettings = (settings) => {
  try {
    localStorage.setItem('settings', JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

// ✅ Fetch settings
export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return loadSettings();
    } catch (error) {
      return rejectWithValue("Failed to fetch settings");
    }
  }
);

// ✅ Update settings
export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async (settingsData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const currentSettings = loadSettings() || {};
      const updatedSettings = {
        ...currentSettings,
        ...settingsData,
        updatedAt: new Date().toISOString(),
      };
      saveSettings(updatedSettings);
      return updatedSettings;
    } catch (error) {
      return rejectWithValue("Failed to update settings");
    }
  }
);

const initialState = {
  settings: null,
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    clearSettings: (state) => {
      state.settings = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        state.error = null;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        state.error = null;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSettings } = settingsSlice.actions;
export default settingsSlice.reducer;