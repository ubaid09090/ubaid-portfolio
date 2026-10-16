// src/pages/HomePage.jsx
// import React from "react";
import HeroSection from "../components/sections/home/HeroSection";
import StatsSection from "../components/sections/home/StatsSection";
import FeaturedProjects from "../components/sections/home/FeaturedProjects";
import ServicesSection from "../components/sections/home/ServicesSection";
import TestimonialsSection from "../components/sections/home/TestimonialsSection";
import CTASection from "../components/sections/home/CTASection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProjects />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default HomePage;
