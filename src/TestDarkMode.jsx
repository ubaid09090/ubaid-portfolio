// src/TestDarkMode.jsx
import { useSelector } from "react-redux";

const TestDarkMode = () => {
  const { theme } = useSelector((state) => state.theme);
  
  return (
    <div className="p-4">
      <p>Current Theme: {theme}</p>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <p className="text-gray-900 dark:text-white">This box changes with theme</p>
        <p className="text-gray-600 dark:text-gray-400">This text changes with theme</p>
      </div>
    </div>
  );
};

export default TestDarkMode;