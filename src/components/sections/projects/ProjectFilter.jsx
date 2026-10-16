// src/components/sections/projects/ProjectFilter.jsx
// import React from "react";
import { FaFilter } from "react-icons/fa";

const ProjectFilter = ({ categories, activeFilter, setFilter }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mr-2">
        <FaFilter size={14} />
        <span className="text-sm font-medium">Filter:</span>
      </div>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setFilter(category)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            activeFilter === category
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;
