// src/components/ui/Skeleton.jsx
// import React from "react";

const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${className}`}
      {...props}
    />
  );
};

export const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg">
      <Skeleton className="w-full h-48 rounded-xl mb-4" />
      <Skeleton className="w-3/4 h-6 mb-2" />
      <Skeleton className="w-1/2 h-4 mb-2" />
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-2/3 h-4" />
    </div>
  );
};

export const SkeletonText = ({ lines = 3 }) => {
  return (
    <div className="space-y-2">
      {[...Array(lines)].map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i === 0 ? "w-3/4" : "w-full"}`} />
      ))}
    </div>
  );
};

export const SkeletonAvatar = () => {
  return <Skeleton className="w-16 h-16 rounded-full" />;
};

export default Skeleton;
