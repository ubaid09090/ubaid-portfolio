// src/components/ui/Avatar.jsx
// import React from "react";

const Avatar = ({
  src,
  alt = "Avatar",
  size = "md",
  className = "",
  status,
  ...props
}) => {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-yellow-500",
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src={
          src ||
          `https://ui-avatars.com/api/?name=${alt}&background=3b82f6&color=fff&size=128`
        }
        alt={alt}
        className={`rounded-full object-cover ${sizes[size]}`}
        {...props}
      />
      {status && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${statusColors[status]}`}
        />
      )}
    </div>
  );
};

export default Avatar;
