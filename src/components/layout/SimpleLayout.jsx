// src/components/layout/SimpleLayout.jsx
// import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';

const SimpleLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default SimpleLayout;