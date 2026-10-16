// src/data/servicesData.js

import {
  FaReact,
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
  FaServer,
  FaShieldAlt,
  FaRocket,
  FaDatabase,
} from "react-icons/fa";

export const servicesData = [
  {
    id: 1,
    icon: FaReact,
    title: "React Development",
    description:
      "Building modern, responsive web applications using React.js and Redux with best practices and optimal performance.",
    features: [
      "Component-based architecture",
      "State management with Redux",
      "React Hooks",
      "Performance optimization",
    ],
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    price: "Custom",
    delivery: "2-4 weeks",
  },
  {
    id: 2,
    icon: FaCode,
    title: "Front-End Development",
    description:
      "Creating clean, semantic, and accessible HTML/CSS code with modern styling and responsive design.",
    features: [
      "Semantic HTML5",
      "Modern CSS3",
      "Cross-browser compatibility",
      "Accessibility (WCAG)",
    ],
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-900/30",
    price: "Custom",
    delivery: "1-3 weeks",
  },
  {
    id: 3,
    icon: FaMobileAlt,
    title: "Responsive Design",
    description:
      "Ensuring websites look great on all devices and screen sizes with mobile-first design approach.",
    features: [
      "Mobile-first design",
      "Fluid layouts",
      "Responsive images",
      "Touch interactions",
    ],
    color: "text-green-500",
    bg: "bg-green-100 dark:bg-green-900/30",
    price: "Custom",
    delivery: "1-2 weeks",
  },
  {
    id: 4,
    icon: FaPaintBrush,
    title: "UI/UX Design",
    description:
      "Designing intuitive and beautiful user interfaces with focus on user experience and usability.",
    features: ["User research", "Wireframing", "Prototyping", "User testing"],
    color: "text-pink-500",
    bg: "bg-pink-100 dark:bg-pink-900/30",
    price: "Custom",
    delivery: "2-3 weeks",
  },
  {
    id: 5,
    icon: FaServer,
    title: "API Integration",
    description:
      "Connecting frontend applications with RESTful APIs and handling data efficiently.",
    features: [
      "REST API integration",
      "Data fetching",
      "Error handling",
      "Caching strategies",
    ],
    color: "text-yellow-500",
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    price: "Custom",
    delivery: "1-2 weeks",
  },
  {
    id: 6,
    icon: FaShieldAlt,
    title: "Authentication & Security",
    description:
      "Implementing secure authentication and authorization systems for web applications.",
    features: [
      "JWT authentication",
      "Protected routes",
      "Role-based access",
      "Security best practices",
    ],
    color: "text-red-500",
    bg: "bg-red-100 dark:bg-red-900/30",
    price: "Custom",
    delivery: "1-2 weeks",
  },
  {
    id: 7,
    icon: FaRocket,
    title: "Performance Optimization",
    description:
      "Optimizing website performance for faster loading times and better user experience.",
    features: [
      "Lazy loading",
      "Code splitting",
      "Image optimization",
      "Performance auditing",
    ],
    color: "text-indigo-500",
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    price: "Custom",
    delivery: "1-2 weeks",
  },
  {
    id: 8,
    icon: FaDatabase,
    title: "Firebase Integration",
    description:
      "Integrating Firebase services for authentication, database, and hosting.",
    features: ["Firebase Auth", "Firestore database", "Storage", "Hosting"],
    color: "text-orange-500",
    bg: "bg-orange-100 dark:bg-orange-900/30",
    price: "Custom",
    delivery: "1-2 weeks",
  },
];

// Helper functions
export const getServiceById = (id) => {
  return servicesData.find((service) => service.id === parseInt(id));
};

export const getFeaturedServices = (limit = 4) => {
  return servicesData.slice(0, limit);
};

export default servicesData;
