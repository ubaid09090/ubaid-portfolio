// src/components/layout/Sidebar.jsx
// import React, { useState } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import {
  FaHome,
  FaProjectDiagram,
  FaTools,
  FaBriefcase,
  FaGraduationCap,
  FaEnvelope,
  FaCog,
  FaUser,
  FaChartBar,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: FaHome },
    { name: "Projects", path: "/admin/projects", icon: FaProjectDiagram },
    { name: "Skills", path: "/admin/skills", icon: FaTools },
    { name: "Experience", path: "/admin/experience", icon: FaBriefcase },
    { name: "Education", path: "/admin/education", icon: FaGraduationCap },
    { name: "Messages", path: "/admin/messages", icon: FaEnvelope },
    { name: "Analytics", path: "/admin/analytics", icon: FaChartBar },
    { name: "Profile", path: "/admin/profile", icon: FaUser },
    { name: "Settings", path: "/admin/settings", icon: FaCog },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        <FaBars size={20} />
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 ${
          isOpen ? "w-64" : "w-20"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span
              className={`text-xl font-bold text-blue-600 dark:text-blue-400 ${!isOpen && "hidden"}`}
            >
              Admin
            </span>
            <span
              className={`text-xl font-bold text-gray-900 dark:text-white ${!isOpen && "hidden"}`}
            >
              Panel
            </span>
            <span
              className={`text-xl font-bold text-blue-600 dark:text-blue-400 ${isOpen && "hidden"}`}
            >
              A
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isOpen ? <FaBars size={18} /> : <FaTimes size={18} />}
          </button>
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                } ${!isOpen && "justify-center"}`
              }
              onClick={() => setIsMobileOpen(false)}
            >
              <item.icon size={20} className="flex-shrink-0" />
              <span className={`${!isOpen && "hidden"}`}>{item.name}</span>
            </NavLink>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200 mt-4 ${
              !isOpen && "justify-center"
            }`}
          >
            <FaSignOutAlt size={20} className="flex-shrink-0" />
            <span className={`${!isOpen && "hidden"}`}>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
