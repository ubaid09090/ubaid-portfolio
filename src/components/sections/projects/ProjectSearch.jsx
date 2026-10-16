// src/components/sections/projects/ProjectSearch.jsx
// import React from "react";
import { FaSearch } from "react-icons/fa";

const ProjectSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative flex-1 max-w-md">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <FaSearch size={16} />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search projects..."
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
    </div>
  );
};

export default ProjectSearch;
