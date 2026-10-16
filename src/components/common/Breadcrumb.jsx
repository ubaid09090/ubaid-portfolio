// src/components/common/Breadcrumb.jsx
// import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="text-sm text-gray-600 dark:text-gray-400 mb-4">
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
          >
            <FaHome size={14} /> Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={name} className="flex items-center gap-2">
              <span className="text-gray-400">/</span>
              {isLast ? (
                <span className="text-blue-600 dark:text-blue-400 font-medium capitalize">
                  {name.replace(/-/g, " ")}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:text-blue-600 dark:hover:text-blue-400 capitalize"
                >
                  {name.replace(/-/g, " ")}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
