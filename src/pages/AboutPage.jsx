// src/pages/AboutPage.jsx
// import React from "react";
import AboutSection from "../components/sections/about/AboutSection";
import SkillsSection from "../components/sections/about/SkillsSection";
import ExperienceSection from "../components/sections/about/ExperienceSection";
import EducationSection from "../components/sections/about/EducationSection";
import AchievementsSection from "../components/sections/about/AchievementsSection";
import HobbiesSection from "../components/sections/about/HobbiesSection";

const AboutPage = () => {
  return (
    <div className="pt-20">
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <AchievementsSection />
      <HobbiesSection />
    </div>
  );
};

export default AboutPage;
