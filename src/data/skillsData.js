// src/data/skillsData.js

export const skillsData = [
  {
    id: 1,
    name: "React.js",
    icon: "/assets/images/icons/react.svg",
    level: 90,
    category: "Frontend",
    color: "#61dafb",
    description: "Building modern, responsive web applications",
  },
  {
    id: 2,
    name: "Redux",
    icon: "/assets/images/icons/redux.svg",
    level: 85,
    category: "State Management",
    color: "#764abc",
    description: "State management for complex applications",
  },
  {
    id: 3,
    name: "Tailwind CSS",
    icon: "/assets/images/icons/tailwind.svg",
    level: 90,
    category: "Styling",
    color: "#38bdf8",
    description: "Utility-first CSS framework",
  },
  {
    id: 4,
    name: "JavaScript",
    icon: "/assets/images/icons/javascript.svg",
    level: 85,
    category: "Language",
    color: "#f7df1e",
    description: "Modern JavaScript (ES6+)",
  },
  {
    id: 5,
    name: "HTML5 & CSS3",
    icon: "/assets/images/icons/html-css.svg",
    level: 95,
    category: "Frontend",
    color: "#e34f26",
    description: "Semantic HTML and modern CSS",
  },
  {
    id: 6,
    name: "Git & GitHub",
    icon: "/assets/images/icons/git.svg",
    level: 80,
    category: "Tools",
    color: "#f05033",
    description: "Version control and collaboration",
  },
  {
    id: 7,
    name: "Next.js",
    icon: "/assets/images/icons/nextjs.svg",
    level: 70,
    category: "Framework",
    color: "#000000",
    description: "React framework for production",
  },
  {
    id: 8,
    name: "API Integration",
    icon: "/assets/images/icons/api.svg",
    level: 85,
    category: "Backend",
    color: "#3b82f6",
    description: "RESTful API integration",
  },
  {
    id: 9,
    name: "TypeScript",
    icon: "/assets/images/icons/typescript.svg",
    level: 65,
    category: "Language",
    color: "#3178c6",
    description: "Type-safe JavaScript",
  },
  {
    id: 10,
    name: "Firebase",
    icon: "/assets/images/icons/firebase.svg",
    level: 75,
    category: "Backend",
    color: "#ffca28",
    description: "Backend-as-a-Service",
  },
];

// Helper functions
export const getSkillsByCategory = (category) => {
  if (category === "All") return skillsData;
  return skillsData.filter((skill) => skill.category === category);
};

export const getCategories = () => {
  const categories = skillsData.map((skill) => skill.category);
  return ["All", ...new Set(categories)];
};

export const getTopSkills = (limit = 6) => {
  return [...skillsData].sort((a, b) => b.level - a.level).slice(0, limit);
};

export default skillsData;
