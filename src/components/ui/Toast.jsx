// src/components/ui/Toast.jsx
import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
  FaTimes,
} from "react-icons/fa";

const Toast = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
  position = "top-right",
  title,
  className = "",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  const types = {
    success: {
      icon: FaCheckCircle,
      bg: "bg-green-50 dark:bg-green-900/30",
      border: "border-green-500",
      text: "text-green-800 dark:text-green-300",
      iconColor: "text-green-500",
    },
    error: {
      icon: FaTimesCircle,
      bg: "bg-red-50 dark:bg-red-900/30",
      border: "border-red-500",
      text: "text-red-800 dark:text-red-300",
      iconColor: "text-red-500",
    },
    warning: {
      icon: FaExclamationCircle,
      bg: "bg-yellow-50 dark:bg-yellow-900/30",
      border: "border-yellow-500",
      text: "text-yellow-800 dark:text-yellow-300",
      iconColor: "text-yellow-500",
    },
    info: {
      icon: FaInfoCircle,
      bg: "bg-blue-50 dark:bg-blue-900/30",
      border: "border-blue-500",
      text: "text-blue-800 dark:text-blue-300",
      iconColor: "text-blue-500",
    },
  };

  const positions = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  const Icon = types[type].icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);

      // Progress bar animation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - 100 / (duration / 10);
          return Math.max(0, newProgress);
        });
      }, 10);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed z-50 max-w-sm w-full ${positions[position]} animate-slide-up ${className}`}
      {...props}
    >
      <div
        className={`relative rounded-xl shadow-2xl border-l-4 ${types[type].border} ${types[type].bg} overflow-hidden`}
      >
        <div className="flex items-start gap-3 p-4">
          {/* Icon */}
          <div className={`flex-shrink-0 mt-0.5 ${types[type].iconColor}`}>
            <Icon size={22} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className={`font-semibold ${types[type].text}`}>{title}</h4>
            )}
            <p className={`text-sm ${types[type].text}`}>{message}</p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              if (onClose) onClose();
            }}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
            <div
              className={`h-full transition-all duration-100 ease-linear ${
                type === "success"
                  ? "bg-green-500"
                  : type === "error"
                    ? "bg-red-500"
                    : type === "warning"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Toast Container Component
export const ToastContainer = ({ toasts = [], removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          title={toast.title}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Toast Hook
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000, title = "") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration, title }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration + 500);
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const success = (message, duration = 3000, title = "Success") => {
    addToast(message, "success", duration, title);
  };

  const error = (message, duration = 4000, title = "Error") => {
    addToast(message, "error", duration, title);
  };

  const warning = (message, duration = 3000, title = "Warning") => {
    addToast(message, "warning", duration, title);
  };

  const info = (message, duration = 3000, title = "Info") => {
    addToast(message, "info", duration, title);
  };

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
};

export default Toast;
