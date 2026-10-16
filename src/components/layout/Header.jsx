// src/components/layout/Header.jsx
// import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Header = ({
  title,
  subtitle,
  showBackButton = false,
  backUrl = "/",
  rightComponent = null,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-6 px-4 md:px-8">
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between">
          <div>
            {showBackButton && (
              <Link
                to={backUrl}
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-2 transition-colors"
              >
                <FaArrowLeft size={14} />
                <span className="text-sm font-medium">Back</span>
              </Link>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {rightComponent && (
            <div className="flex items-center gap-4">{rightComponent}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
