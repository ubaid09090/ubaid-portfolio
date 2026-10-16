// src/pages/ResumePage.jsx
// import React from "react";
import { FaDownload, FaFilePdf } from "react-icons/fa";
import resumePdf from "../assets/docs/resume.pdf";

const ResumePage = () => {
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            My <span className="text-blue-600 dark:text-blue-400">Resume</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
            Download the complete portfolio PDF, including projects, services,
            skills, experience, education, testimonials, and contact details.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaFilePdf className="text-4xl text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Ubaid Ullah - Complete Portfolio
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Front-End Developer | Projects, services, skills, experience, and more
            </p>
            <a
              href={resumePdf}
              download="Ubaid-Ullah-Complete-Portfolio.pdf"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
            >
              <FaDownload />
              Download Complete Portfolio (PDF)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
