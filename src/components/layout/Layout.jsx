// src/components/layout/Layout.jsx
// import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import ScrollToTop from "../common/ScrollToTop";
import BackToTop from "../common/BackToTop";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
  
        <Outlet />
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
