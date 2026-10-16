// src/constants/skillCategories.js

export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    name: "Frontend",
    description: "Front-end development technologies",
    icon: "FaCode",
    color: "#3b82f6",
  },
  {
    id: "styling",
    name: "Styling",
    description: "CSS frameworks and styling tools",
    icon: "FaPaintBrush",
    color: "#38bdf8",
  },
  {
    id: "state-management",
    name: "State Management",
    description: "State management libraries and tools",
    icon: "FaDatabase",
    color: "#764abc",
  },
  {
    id: "language",
    name: "Languages",
    description: "Programming languages",
    icon: "FaJs",
    color: "#f7df1e",
  },
  {
    id: "framework",
    name: "Frameworks",
    description: "JavaScript frameworks",
    icon: "FaReact",
    color: "#61dafb",
  },
  {
    id: "tools",
    name: "Tools",
    description: "Development tools and utilities",
    icon: "FaTools",
    color: "#f05033",
  },
  {
    id: "backend",
    name: "Backend",
    description: "Backend technologies",
    icon: "FaServer",
    color: "#3b82f6",
  },
];

// Category colors map
export const SKILL_CATEGORY_COLORS = SKILL_CATEGORIES.reduce((acc, cat) => {
  acc[cat.id] = cat.color;
  return acc;
}, {});

// Category names map
export const SKILL_CATEGORY_NAMES = SKILL_CATEGORIES.reduce((acc, cat) => {
  acc[cat.id] = cat.name;
  return acc;
}, {});

// Get category by id
export const getSkillCategory = (id) => {
  return SKILL_CATEGORIES.find((cat) => cat.id === id);
};

// Get category color
export const getSkillCategoryColor = (id) => {
  return SKILL_CATEGORY_COLORS[id] || "#6b7280";
};

export default SKILL_CATEGORIES;
