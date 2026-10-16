// src/redux/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";
import skillReducer from "./slices/skillSlice";
import experienceReducer from "./slices/experienceSlice";
import educationReducer from "./slices/educationSlice";
import contactReducer from "./slices/contactSlice";
import themeReducer from "./slices/themeSlice";
import uiReducer from "./slices/uiSlice";
import analyticsReducer from "./slices/analyticsSlice";
import notificationReducer from "./slices/notificationSlice";

const rootReducer = combineReducers({
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
});

export default rootReducer;
