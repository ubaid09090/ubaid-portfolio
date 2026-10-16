// src/components/ui/ProgressBar.jsx
// import React from "react";

const ProgressBar = ({
  value,
  max = 100,
  label,
  showValue = true,
  color = "blue",
  height = "h-2",
  className = "",
  ...props
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-500",
    purple: "bg-purple-600",
    gradient: "bg-gradient-to-r from-blue-500 to-purple-600",
  };

  return (
    <div className={`w-full ${className}`} {...props}>
      {(label || showValue) && (
        <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div
        className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${height}`}
      >
        <div
          className={`${colors[color]} transition-all duration-1000 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
