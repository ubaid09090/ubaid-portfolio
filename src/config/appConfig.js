// src/config/appConfig.js

// App Info
export const APP_CONFIG = {
  name: "Ubaid Ullah Portfolio",
  shortName: "Portfolio",
  description: "Front-End Developer Portfolio",
  version: "1.0.0",
  author: "Ubaid Ullah",
  email: "uk2011768@gmail.com",
  phone: "0319-7900803",
  location: "Islamabad, Pakistan",
  website: "https://yourportfolio.com",
};

// Meta Tags
export const META_CONFIG = {
  title: "Ubaid Ullah - Front-End Developer Portfolio",
  description:
    "Portfolio of Ubaid Ullah, Front-End Developer specializing in React.js, Redux, and Tailwind CSS.",
  keywords:
    "React, JavaScript, Portfolio, Developer, Front-End, UI/UX, Web Development",
  ogImage: "/assets/images/og-image.jpg",
  ogType: "website",
  twitterCard: "summary_large_image",
};

// Features
export const FEATURES = {
  darkMode: true,
  adminPanel: true,
  blog: false, // Set to true to enable blog
  analytics: true,
  contactForm: true,
  testimonials: true,
  services: true,
};

// Pagination
export const PAGINATION = {
  projectsPerPage: 6,
  adminItemsPerPage: 10,
  blogPostsPerPage: 9,
};

// File Upload
export const UPLOAD_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxImageSize: 2 * 1024 * 1024, // 2MB
  allowedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/jpg"],
  allowedFileTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    "application/pdf",
  ],
};

// Social Links
export const SOCIAL_CONFIG = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
  youtube: "https://youtube.com/@yourchannel",
  instagram: "https://instagram.com/yourusername",
  facebook: "https://facebook.com/yourusername",
};

export default {
  APP_CONFIG,
  META_CONFIG,
  FEATURES,
  PAGINATION,
  UPLOAD_CONFIG,
  SOCIAL_CONFIG,
};
