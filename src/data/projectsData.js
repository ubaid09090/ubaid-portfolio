// src/data/projectsData.js

export const projectsData = [
  {
    id: 1,
    title: "Britannia Airport Cars",
    description:
      "A comprehensive London airport taxi booking platform with responsive user interface and booking-focused design architecture.",
    shortDescription:
      "London airport taxi booking platform with responsive UI.",
    category: "Web Application",
    technologies: ["React.js", "Tailwind CSS", "JavaScript", "API Integration"],
    image: "/assets/images/projects/britannia-airport.png",
    liveUrl: "https://britanniaairportcars.co.uk",
    githubUrl: "https://github.com/yourusername/britannia-airport",
    featured: true,
    date: "2024",
    duration: "3 months",
    features: [
      "Responsive design",
      "Booking system",
      "Payment integration",
      "Admin dashboard",
      "Real-time availability",
      "Email notifications",
    ],
    images: [
      "/assets/images/projects/britannia-airport-1.png",
      "/assets/images/projects/britannia-airport-2.png",
    ],
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-03-20T15:30:00.000Z",
  },
  {
    id: 2,
    title: "KhanShop Ease",
    description:
      "Full-featured e-commerce platform with admin dashboard, cart, wishlist, and product management system.",
    shortDescription: "Complete e-commerce platform with admin dashboard.",
    category: "E-Commerce",
    technologies: ["React.js", "Redux", "Tailwind CSS", "Firebase"],
    image: "/assets/images/projects/khanshop-ease.png",
    liveUrl: "https://khanshopease.netlify.app",
    githubUrl: "https://github.com/yourusername/khanshop-ease",
    featured: true,
    date: "2024",
    duration: "4 months",
    features: [
      "User authentication",
      "Product management",
      "Shopping cart",
      "Wishlist",
      "Order tracking",
      "Admin dashboard",
      "Payment integration",
      "Search and filter",
    ],
    images: [
      "/assets/images/projects/khanshop-ease-1.png",
      "/assets/images/projects/khanshop-ease-2.png",
    ],
    createdAt: "2024-02-01T10:00:00.000Z",
    updatedAt: "2024-04-10T15:30:00.000Z",
  },
  {
    id: 3,
    title: "Hosting by Ubaid",
    description:
      "A personal practice hosting website project developed for learning modern design patterns and improving front-end skills.",
    shortDescription: "Hosting practice website with modern design.",
    category: "Web Application",
    technologies: ["React.js", "Tailwind CSS", "JavaScript"],
    image: "/assets/images/projects/hosting-by-ubaid.png",
    liveUrl: "https://hostingbyubaid.netlify.app",
    githubUrl: "https://github.com/yourusername/hosting-by-ubaid",
    featured: false,
    date: "2024",
    duration: "2 months",
    features: [
      "Responsive design",
      "Hosting plans",
      "Pricing tables",
      "Contact form",
      "Domain search",
      "Live chat",
    ],
    images: ["/assets/images/projects/hosting-by-ubaid-1.png"],
    createdAt: "2024-03-01T10:00:00.000Z",
    updatedAt: "2024-03-30T15:30:00.000Z",
  },
  {
    id: 4,
    title: "Gatwick London Airport Taxi",
    description:
      "A professional airport transfer website developed for business clients with modern layout and fully responsive design approach.",
    shortDescription: "Professional airport taxi booking service.",
    category: "Web Application",
    technologies: ["React.js", "Tailwind CSS", "JavaScript"],
    image: "/assets/images/projects/gatwick-taxi.png",
    liveUrl: "https://gatwicklondonairporttaxi.co.uk",
    githubUrl: "https://github.com/yourusername/gatwick-taxi",
    featured: false,
    date: "2024",
    duration: "2 months",
    features: [
      "Taxi booking",
      "Airport transfers",
      "Vehicle selection",
      "Contact form",
      "Quote calculator",
      "Driver tracking",
    ],
    images: ["/assets/images/projects/gatwick-taxi-1.png"],
    createdAt: "2024-03-15T10:00:00.000Z",
    updatedAt: "2024-04-05T15:30:00.000Z",
  },
  {
    id: 5,
    title: "QMH Technologies",
    description:
      "A practice company website created with modern user interface design and fully responsive cross-device compatibility.",
    shortDescription: "Company portfolio website with modern UI.",
    category: "Web Application",
    technologies: ["React.js", "Tailwind CSS", "JavaScript"],
    image: "/assets/images/projects/qmh-tech.png",
    liveUrl: "https://qhmhtechnolgies.netlify.app",
    githubUrl: "https://github.com/yourusername/qmh-tech",
    featured: false,
    date: "2024",
    duration: "1.5 months",
    features: [
      "Company profile",
      "Services showcase",
      "Team section",
      "Contact form",
      "Client testimonials",
      "Portfolio gallery",
    ],
    images: ["/assets/images/projects/qmh-tech-1.png"],
    createdAt: "2024-04-01T10:00:00.000Z",
    updatedAt: "2024-04-15T15:30:00.000Z",
  },
];

// Helper functions
export const getFeaturedProjects = () => {
  return projectsData.filter((project) => project.featured);
};

export const getProjectById = (id) => {
  return projectsData.find((project) => project.id === parseInt(id));
};

export const getProjectsByCategory = (category) => {
  if (category === "All") return projectsData;
  return projectsData.filter((project) => project.category === category);
};

export const getCategories = () => {
  const categories = projectsData.map((project) => project.category);
  return ["All", ...new Set(categories)];
};

export default projectsData;
