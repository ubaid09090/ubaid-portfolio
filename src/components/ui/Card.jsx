// src/components/ui/Card.jsx
// import React from "react";

const Card = ({
  children,
  className = "",
  hover = false,
  padding = "md",
  shadow = "md",
  border = false,
  ...props
}) => {
  const paddings = {
    none: "p-0",
    sm: "p-3",
    md: "p-5",
    lg: "p-8",
  };

  const shadows = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-lg",
    lg: "shadow-2xl",
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl transition-all duration-300
        ${paddings[padding]} 
        ${shadows[shadow]}
        ${border ? "border border-gray-200 dark:border-gray-700" : ""}
        ${hover ? "hover:shadow-2xl hover:transform hover:scale-[1.02]" : ""}
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
