// src/components/ui/Select.jsx
// import React, { forwardRef } from 'react';
import { forwardRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const Select = forwardRef(
  (
    {
      label,
      error,
      options = [],
      className = "",
      placeholder = "Select an option",
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`w-full px-4 py-3 rounded-lg border appearance-none transition-all duration-200
            ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            }
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:ring-2 focus:outline-none
            pr-10
            ${className}`}
            {...props}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
