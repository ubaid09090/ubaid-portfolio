// src/components/common/BackToTop.jsx
// import React, { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-8 p-3 bg-gray-800 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 z-40 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
    >
      <FaChevronUp size={18} />
    </button>
  );
};

export default BackToTop;
