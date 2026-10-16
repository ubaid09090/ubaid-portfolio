// src/data/experienceData.js

export const experienceData = [
  {
    id: 1,
    position: "Front-End Developer",
    company: "QMH Technologies",
    location: "Rawalpindi, Pakistan",
    period: "Sep 2025 - Present",
    startDate: "2025-09-01",
    endDate: null,
    current: true,
    description: [
      "Develop responsive and modern websites using React.js, JavaScript, Tailwind CSS, HTML, and CSS.",
      "Build reusable and scalable UI components for enterprise-level applications.",
      "Integrate RESTful APIs and handle dynamic data rendering efficiently.",
      "Implement secure authentication systems and protected routes for user management.",
      "Optimize website performance and enhance overall user experience.",
      "Debug, fix issues, and maintain existing codebases for long-term stability.",
      "Collaborate with cross-functional teams to deliver high-quality solutions.",
      "Write clean, maintainable code following industry best practices.",
    ],
    technologies: [
      "React.js",
      "Redux",
      "Tailwind CSS",
      "JavaScript",
      "API Integration",
    ],
  },
  {
    id: 2,
    position: "Front-End Developer Intern",
    company: "University Internship Program",
    location: "Rawalpindi, Pakistan",
    startDate: "2023-09-01",
    endDate: "2023-12-01",
    current: false,
    description: [
      "Assisted in front-end development tasks and user interface implementation.",
      "Worked extensively on responsive layouts and modern website styling techniques.",
      "Gained hands-on experience in real-world development workflows and agile practices.",
      "Collaborated effectively with senior developers and team members on web projects.",
      "Participated in code reviews and learned best practices.",
      "Contributed to the development of multiple client projects.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Git"],
  },
];

// Helper functions
export const getCurrentExperience = () => {
  return experienceData.find((exp) => exp.current);
};

export const getExperienceById = (id) => {
  return experienceData.find((exp) => exp.id === parseInt(id));
};

export const getTotalExperience = () => {
  // Calculate total experience in years
  const current = getCurrentExperience();
  if (current) {
    const start = new Date(current.startDate);
    const now = new Date();
    const diff = now - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  }
  return 0;
};

export default experienceData;
