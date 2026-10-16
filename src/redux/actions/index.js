// src/redux/actions/index.js
import authActions from "./authActions";
import projectActions from "./projectActions";
import contactActions from "./contactActions";
import themeActions from "./themeActions";

// Combined actions for easy import
export const actions = {
  auth: authActions,
  projects: projectActions,
  contact: contactActions,
  theme: themeActions,
};

// Export individual action creators
export { authActions, projectActions, contactActions, themeActions };

// Helper function to create action dispatcher
export const createActionDispatcher = (dispatch) => {
  return {
    auth: {
      login: (credentials) => dispatch(authActions.login(credentials)),
      register: (userData) => dispatch(authActions.register(userData)),
      logout: () => dispatch(authActions.logout()),
      clearError: () => dispatch(authActions.clearError()),
    },
    projects: {
      fetchAll: () => dispatch(projectActions.fetchProjects()),
      fetchById: (id) => dispatch(projectActions.fetchProjectById(id)),
      create: (data) => dispatch(projectActions.createProject(data)),
      update: (id, data) =>
        dispatch(projectActions.updateProject({ id, projectData: data })),
      delete: (id) => dispatch(projectActions.deleteProject(id)),
      clear: () => dispatch(projectActions.clearProjects()),
    },
    contact: {
      send: (data) => dispatch(contactActions.sendContactMessage(data)),
      fetchAll: () => dispatch(contactActions.fetchMessages()),
      delete: (id) => dispatch(contactActions.deleteMessage(id)),
      markRead: (id) => dispatch(contactActions.markMessageAsRead(id)),
    },
    theme: {
      toggle: () => dispatch(themeActions.toggleTheme()),
      set: (theme) => dispatch(themeActions.setTheme(theme)),
    },
  };
};

export default actions;
