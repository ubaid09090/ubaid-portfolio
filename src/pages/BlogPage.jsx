// src/pages/BlogPage.jsx
// import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";

const BlogPage = () => {
  // Mock blog posts - Replace with API data
  const posts = [
    {
      id: 1,
      title: "Getting Started with React.js",
      excerpt:
        "Learn the basics of React.js and how to build your first component.",
      date: "2024-06-15",
      author: "Ubaid Ullah",
      category: "React",
    },
    {
      id: 2,
      title: "Understanding Redux State Management",
      excerpt:
        "A comprehensive guide to managing state in React applications with Redux.",
      date: "2024-06-10",
      author: "Ubaid Ullah",
      category: "Redux",
    },
    {
      id: 3,
      title: "Mastering Tailwind CSS",
      excerpt:
        "Learn how to build beautiful interfaces quickly with Tailwind CSS.",
      date: "2024-06-05",
      author: "Ubaid Ullah",
      category: "CSS",
    },
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            My <span className="text-blue-600 dark:text-blue-400">Blog</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
            Thoughts, tutorials, and insights about web development
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6"
            >
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.excerpt}
              </p>
              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Read More <FaArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
