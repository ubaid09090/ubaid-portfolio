// src/pages/BlogDetailPage.jsx
// import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaUser } from "react-icons/fa";

const BlogDetailPage = () => {
  const { id } = useParams();

  // Mock blog post - Replace with API data
  const post = {
    id: 1,
    title: "Getting Started with React.js",
    content: `
      React.js is a powerful JavaScript library for building user interfaces. 
      In this post, we'll explore the basics of React and how to get started.
      
      React allows you to build reusable components that manage their own state.
      This makes it easy to build complex UIs that are maintainable and scalable.
      
      The key concepts to understand are:
      - Components
      - Props
      - State
      - Hooks
      - JSX
      
      Let's dive in and build our first React component!
    `,
    date: "2024-06-15",
    author: "Ubaid Ullah",
    category: "React",
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors"
        >
          <FaArrowLeft size={14} />
          Back to Blog
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                <FaCalendarAlt size={14} />
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <FaUser size={14} />
                {post.author}
              </span>
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>
            <div className="prose prose-blue dark:prose-invert max-w-none">
              {post.content.split("\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
