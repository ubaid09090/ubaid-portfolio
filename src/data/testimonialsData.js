// src/data/testimonialsData.js

export const testimonialsData = [
  {
    id: 1,
    name: "John Doe",
    position: "CEO, Tech Company",
    image:
      "https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff&size=128",
    text: "Ubaid is an exceptional developer who delivered our project on time and exceeded our expectations. His attention to detail and problem-solving skills are remarkable. I would highly recommend him for any front-end development project.",
    rating: 5,
    date: "2024-03-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Project Manager, Digital Agency",
    image:
      "https://ui-avatars.com/api/?name=Jane+Smith&background=8b5cf6&color=fff&size=128",
    text: "Working with Ubaid was a pleasure. He understood our requirements perfectly and implemented a beautiful, responsive website that our clients love. His communication skills are excellent and he delivers on time.",
    rating: 5,
    date: "2024-02-20",
  },
  {
    id: 3,
    name: "Mike Johnson",
    position: "Founder, Startup",
    image:
      "https://ui-avatars.com/api/?name=Mike+Johnson&background=22c55e&color=fff&size=128",
    text: "Ubaid helped us build our e-commerce platform from scratch. His expertise in React and Redux made the process smooth and efficient. He provided valuable insights and suggestions that improved our product significantly.",
    rating: 5,
    date: "2024-01-10",
  },
  {
    id: 4,
    name: "Sarah Ahmed",
    position: "CTO, Tech Solutions",
    image:
      "https://ui-avatars.com/api/?name=Sarah+Ahmed&background=e34f26&color=fff&size=128",
    text: "Ubaid is a talented developer with a great eye for design. He created a modern, responsive website that perfectly represents our brand. His code is clean, well-organized, and easy to maintain.",
    rating: 4,
    date: "2023-12-05",
  },
  {
    id: 5,
    name: "Ali Khan",
    position: "Product Manager, E-Commerce",
    image:
      "https://ui-avatars.com/api/?name=Ali+Khan&background=f59e0b&color=fff&size=128",
    text: "I was impressed by Ubaid's ability to understand complex requirements and translate them into a functional, user-friendly interface. His work on our admin dashboard was outstanding.",
    rating: 5,
    date: "2023-11-15",
  },
];

// Helper functions
export const getTopTestimonials = (limit = 3) => {
  return testimonialsData.filter((t) => t.rating >= 4).slice(0, limit);
};

export const getAverageRating = () => {
  const total = testimonialsData.reduce((sum, t) => sum + t.rating, 0);
  return (total / testimonialsData.length).toFixed(1);
};

export const getTestimonialById = (id) => {
  return testimonialsData.find((t) => t.id === parseInt(id));
};

export default testimonialsData;
