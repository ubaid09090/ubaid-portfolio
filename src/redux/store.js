// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import skillReducer from './slices/skillSlice';
import experienceReducer from './slices/experienceSlice';
import educationReducer from './slices/educationSlice';
import contactReducer from './slices/contactSlice';
import themeReducer from './slices/themeSlice';
import uiReducer from './slices/uiSlice';
import analyticsReducer from './slices/analyticsSlice';
import profileReducer from './slices/profileSlice';
import notificationReducer from './slices/notificationSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    skills: skillReducer,
    experiences: experienceReducer,
    educations: educationReducer,
    contact: contactReducer,
    theme: themeReducer,
    ui: uiReducer,
    analytics: analyticsReducer,
    notifications: notificationReducer,
    profile: profileReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// ❌ REMOVE these TypeScript lines
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// ✅ Instead, use JSDoc comments (optional)
/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 * @typedef {typeof store.dispatch} AppDispatch
 */