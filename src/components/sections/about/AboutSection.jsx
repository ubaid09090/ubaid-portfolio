// src/components/sections/about/AboutSection.jsx
// import React from "react";
import { FaUser, FaCode, FaLaptopCode, FaRocket } from "react-icons/fa";

import profileImg from "../../../assets/images/profile/ubaid-profile.jpg";

const AboutSection = () => {
  return (
    <section className=" bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl rotate-6 opacity-20"></div>
            <div className="relative z-10 bg-gray-100 dark:bg-gray-800 rounded-3xl p-4 shadow-2xl">
              <img
                src={profileImg}
                alt="Ubaid Ullah"
                className="w-full rounded-2xl object-cover"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                About Me
              </span>
              <span className="w-10 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              I'm{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Ubaid Ullah
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
              A passionate Front-End Developer with 1+ year of experience in
              building modern web applications. I specialize in creating
              responsive, user-friendly interfaces using React.js, Redux, and
              Tailwind CSS.
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
              Currently working at QMH Technologies, I develop enterprise-level
              applications with a focus on clean code, performance optimization,
              and exceptional user experiences.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
                <FaCode className="text-blue-600 text-2xl mx-auto mb-2" />
                <p className="font-bold text-gray-900 dark:text-white">
                  1+ Year
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Experience
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
                <FaLaptopCode className="text-purple-600 text-2xl mx-auto mb-2" />
                <p className="font-bold text-gray-900 dark:text-white">10+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Projects
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
                <FaRocket className="text-green-600 text-2xl mx-auto mb-2" />
                <p className="font-bold text-gray-900 dark:text-white">4</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Live Sites
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center">
                <FaUser className="text-yellow-600 text-2xl mx-auto mb-2" />
                <p className="font-bold text-gray-900 dark:text-white">5+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
