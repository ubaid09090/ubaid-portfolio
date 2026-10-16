// src/components/sections/about/HobbiesSection.jsx
// import React from 'react';
import { 
  FaGamepad, 
  FaCode, 
  FaBook, 
  FaMusic, 
  FaCamera,
  FaTrophy,        // ✅ Use Trophy instead of Cricket
  FaRunning,       // ✅ Alternative for sports
  FaFutbol,        // ✅ Football/Soccer
  FaBaseballBall,  // ✅ Baseball
} from 'react-icons/fa';

const HobbiesSection = () => {
  const hobbies = [
    {
      id: 1,
      icon: FaTrophy,  // ✅ Trophy for cricket
      title: 'Playing Cricket',
      description: 'Enjoy playing cricket with friends on weekends.',
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      id: 2,
      icon: FaGamepad,
      title: 'PC Gaming',
      description: 'Passionate about gaming and exploring new game worlds.',
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      id: 3,
      icon: FaCode,
      title: 'Coding Projects',
      description: 'Love building side projects and learning new technologies.',
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      id: 4,
      icon: FaBook,
      title: 'Reading Books',
      description: 'Enjoy reading tech blogs, articles, and self-improvement books.',
      color: 'text-yellow-600',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      id: 5,
      icon: FaMusic,
      title: 'Listening to Music',
      description: 'Love listening to music while coding and relaxing.',
      color: 'text-red-600',
      bg: 'bg-red-100 dark:bg-red-900/30',
    },
    {
      id: 6,
      icon: FaCamera,
      title: 'Photography',
      description: 'Enjoy capturing moments and beautiful scenery.',
      color: 'text-indigo-600',
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Interests & <span className="text-blue-600 dark:text-blue-400">Hobbies</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
            Things I enjoy doing in my free time
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 text-center group"
            >
              <div className={`w-16 h-16 rounded-full ${item.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`text-3xl ${item.color}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HobbiesSection;