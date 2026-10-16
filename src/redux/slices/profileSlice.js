// src/redux/slices/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Load profile from localStorage
const loadProfile = () => {
  try {
    const data = localStorage.getItem('profile');
    if (data) return JSON.parse(data);
    const defaultData = {
      name: "Ubaid Ullah",
      title: "Front-End Developer",
      email: "uk2011768@gmail.com",
      phone: "0319-7900803",
      location: "Islamabad, Pakistan",
      bio: "Motivated and detail-oriented Front-End Developer with 1+ year of professional experience in building responsive, user-friendly, and modern web applications.",
      avatar: "/assets/images/profile/ubaid-profile.jpg",
      social: {
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername",
      },
    };
    localStorage.setItem('profile', JSON.stringify(defaultData));
    return defaultData;
  } catch (error) {
    console.error('Error loading profile:', error);
    return null;
  }
};

const saveProfile = (profile) => {
  try {
    localStorage.setItem('profile', JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving profile:', error);
  }
};

// ✅ Async thunks
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return loadProfile();
    } catch (error) {
      return rejectWithValue("Failed to fetch profile");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const currentProfile = loadProfile() || {};
      const updatedProfile = {
        ...currentProfile,
        ...profileData,
        updatedAt: new Date().toISOString(),
      };
      saveProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      return rejectWithValue("Failed to update profile");
    }
  }
);

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;