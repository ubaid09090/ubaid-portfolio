// src/components/sections/home/StatsSection.jsx
// import React, { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import { FaCode, FaProjectDiagram, FaUsers, FaAward } from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: FaCode,
      value: 2,
      suffix: "+",
      label: "Years Experience",
      color: "text-blue-500",
    },
    {
      id: 2,
      icon: FaProjectDiagram,
      value: 10,
      suffix: "+",
      label: "Projects Completed",
      color: "text-purple-500",
    },
    {
      id: 3,
      icon: FaUsers,
      value: 5,
      suffix: "+",
      label: "Happy Clients",
      color: "text-green-500",
    },
    {
      id: 4,
      icon: FaAward,
      value: 4,
      suffix: "",
      label: "Live Websites",
      color: "text-yellow-500",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = stat.value;
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 50);
    return () => clearInterval(timer);
  }, [stat.value]);

  return (
    <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex justify-center mb-3">
        <stat.icon className={`text-4xl ${stat.color}`} />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {count}
        {stat.suffix}
      </div>
      <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
        {stat.label}
      </p>
    </div>
  );
};

export default StatsSection;
