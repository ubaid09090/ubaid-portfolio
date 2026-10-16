// src/components/ui/Timeline.jsx
import React from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

const Timeline = ({
  items,
  orientation = "vertical",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`${orientation === "vertical" ? "space-y-6" : "flex space-x-8 overflow-x-auto pb-4"} ${className}`}
      {...props}
    >
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          item={item}
          index={index}
          isLast={index === items.length - 1}
          orientation={orientation}
        />
      ))}
    </div>
  );
};

const TimelineItem = ({ item, index, isLast, orientation }) => {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={`${isVertical ? "flex gap-4" : "flex-shrink-0 w-64 relative"}`}
    >
      {/* Timeline Line & Dot */}
      <div
        className={`${isVertical ? "flex flex-col items-center" : "flex flex-col items-center w-full"}`}
      >
        {/* Dot */}
        <div className="relative z-10">
          <div
            className={`
            w-10 h-10 rounded-full flex items-center justify-center
            ${item.completed ? "bg-green-500" : "bg-blue-500"}
            text-white shadow-lg
            ${item.completed ? "shadow-green-500/30" : "shadow-blue-500/30"}
          `}
          >
            {item.completed ? (
              <FaCheckCircle size={18} />
            ) : (
              <FaCircle size={18} />
            )}
          </div>
        </div>

        {/* Line */}
        {!isLast && (
          <div
            className={`
            ${isVertical ? "w-0.5 h-12 flex-1" : "w-12 h-0.5 flex-1"}
            ${item.completed ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}
          `}
          />
        )}
      </div>

      {/* Content */}
      <div className={`${isVertical ? "flex-1 pb-6" : "mt-4 text-center"}`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
          {/* Title */}
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {item.title}
          </h4>

          {/* Date/Time */}
          {item.date && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {item.date}
            </p>
          )}

          {/* Description */}
          {item.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {item.description}
            </p>
          )}

          {/* Extra Content */}
          {item.content && <div className="mt-3">{item.content}</div>}

          {/* Status Badge */}
          {item.status && (
            <span
              className={`
              inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium
              ${
                item.status === "completed"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : item.status === "in-progress"
                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                    : item.status === "pending"
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
              }
            `}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Vertical Timeline with Icons
export const IconTimeline = ({ items, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Vertical Line */}
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative pl-14">
            {/* Icon Circle */}
            <div
              className={`
              absolute left-0 w-10 h-10 rounded-full flex items-center justify-center
              ${item.color || "bg-blue-500"} text-white shadow-lg
            `}
            >
              {item.icon}
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.subtitle}
                    </p>
                  )}
                </div>
                {item.date && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.date}
                  </span>
                )}
              </div>

              {item.description && (
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {item.description}
                </p>
              )}

              {item.tags && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Horizontal Timeline
export const HorizontalTimeline = ({ items, className = "" }) => {
  return (
    <div className={`relative overflow-x-auto pb-8 ${className}`}>
      <div className="flex space-x-8 min-w-max">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center w-48">
            {/* Line */}
            <div className="relative w-full flex items-center">
              {index > 0 && (
                <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600" />
              )}
              <div
                className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${item.completed ? "bg-green-500" : "bg-blue-500"}
                text-white shadow-lg flex-shrink-0
              `}
              >
                {item.completed ? (
                  <FaCheckCircle size={14} />
                ) : (
                  <FaCircle size={14} />
                )}
              </div>
              {index < items.length - 1 && (
                <div
                  className={`flex-1 h-0.5 ${item.completed ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}
                />
              )}
            </div>

            {/* Content */}
            <div className="mt-4 text-center">
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                {item.title}
              </h4>
              {item.date && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.date}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
