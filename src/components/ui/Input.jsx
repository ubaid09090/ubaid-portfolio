// src/components/ui/Input.jsx
// import React, { forwardRef } from "react";
import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      className = "",
      icon: Icon,
      iconPosition = "left",
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
          {Icon && iconPosition === "left" && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon size={18} />
            </span>
          )}
          <input
            ref={ref}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200
            ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            }
            ${Icon && iconPosition === "left" ? "pl-10" : ""}
            ${Icon && iconPosition === "right" ? "pr-10" : ""}
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:ring-2 focus:outline-none
            ${className}`}
            {...props}
          />
          {Icon && iconPosition === "right" && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon size={18} />
            </span>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
