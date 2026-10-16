// src/data/educationData.js

export const educationData = [
  {
    id: 1,
    degree: "BS Software Engineering",
    institution: "Hazara University, Mansehra",
    location: "Mansehra, Pakistan",
    startDate: "2021-09-01",
    endDate: "2025-06-30",
    current: false,
    grade: "CGPA: 2.6/4.0",
    description:
      "Studied software engineering with focus on web development, algorithms, and software design patterns.",
    courses: [
      "Web Development",
      "Data Structures and Algorithms",
      "Database Management Systems",
      "Software Engineering",
      "Object-Oriented Programming",
      "Computer Networks",
    ],
  },
  {
    id: 2,
    degree: "F.Sc (Pre-Engineering)",
    institution: "GHSS Kabal, Swat",
    location: "Swat, Pakistan",
    startDate: "2019-08-01",
    endDate: "2021-07-31",
    current: false,
    grade: "Completed",
    description:
      "Completed intermediate education with focus on mathematics, physics, and chemistry.",
    courses: [
      "Mathematics",
      "Physics",
      "Chemistry",
      "English",
      "Islamic Studies",
    ],
  },
  {
    id: 3,
    degree: "Matriculation",
    institution: "Hira High School, Shareef Abad Kabal Swat",
    location: "Swat, Pakistan",
    startDate: "2018-04-01",
    endDate: "2019-03-31",
    current: false,
    grade: "682/1100",
    description:
      "Completed secondary education with strong foundation in science and mathematics.",
    courses: ["Mathematics", "Science", "English", "Urdu", "Social Studies"],
  },
];

// Helper functions
export const getCurrentEducation = () => {
  return educationData.find((edu) => edu.current);
};

export const getEducationById = (id) => {
  return educationData.find((edu) => edu.id === parseInt(id));
};

export const getLatestEducation = () => {
  return educationData.sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate),
  )[0];
};

export default educationData;
