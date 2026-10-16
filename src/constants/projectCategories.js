// src/constants/projectCategories.js

export const PROJECT_CATEGORIES = [
  {
    id: "web-application",
    name: "Web Application",
    description: "Full-featured web applications",
    icon: "FaGlobe",
    color: "#3b82f6",
  },
  {
    id: "e-commerce",
    name: "E-Commerce",
    description: "Online shopping platforms",
    icon: "FaShoppingCart",
    color: "#22c55e",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Personal portfolio websites",
    icon: "FaUser",
    color: "#8b5cf6",
  },
  {
    id: "landing-page",
    name: "Landing Page",
    description: "Marketing and landing pages",
    icon: "FaRocket",
    color: "#f59e0b",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Admin dashboards and analytics",
    icon: "FaChartBar",
    color: "#ec4899",
  },
  {
    id: "api-integration",
    name: "API Integration",
    description: "Projects with API integrations",
    icon: "FaPlug",
    color: "#14b8a6",
  },
];

// Category colors map
export const PROJECT_CATEGORY_COLORS = PROJECT_CATEGORIES.reduce((acc, cat) => {
  acc[cat.id] = cat.color;
  return acc;
}, {});

// Category names map
export const PROJECT_CATEGORY_NAMES = PROJECT_CATEGORIES.reduce((acc, cat) => {
  acc[cat.id] = cat.name;
  return acc;
}, {});

// Get category by id
export const getProjectCategory = (id) => {
  return PROJECT_CATEGORIES.find((cat) => cat.id === id);
};

// Get category color
export const getProjectCategoryColor = (id) => {
  return PROJECT_CATEGORY_COLORS[id] || "#6b7280";
};

// Get category name
export const getProjectCategoryName = (id) => {
  return PROJECT_CATEGORY_NAMES[id] || id;
};

// Filter projects by category
export const filterProjectsByCategory = (projects, categoryId) => {
  if (categoryId === "all") return projects;
  return projects.filter((project) => project.category === categoryId);
};

export default PROJECT_CATEGORIES;
