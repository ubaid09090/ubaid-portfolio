// src/components/sections/home/TestimonialsSection.jsx
// import React, { useState } from "react";
import { useState } from "react";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO, Tech Company",
      image:
        "https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff&size=128",
      text: "Ubaid is an exceptional developer who delivered our project on time and exceeded our expectations. His attention to detail and problem-solving skills are remarkable.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Project Manager, Digital Agency",
      image:
        "https://ui-avatars.com/api/?name=Jane+Smith&background=8b5cf6&color=fff&size=128",
      text: "Working with Ubaid was a pleasure. He understood our requirements perfectly and implemented a beautiful, responsive website that our clients love.",
      rating: 5,
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Founder, Startup",
      image:
        "https://ui-avatars.com/api/?name=Mike+Johnson&background=22c55e&color=fff&size=128",
      text: "Ubaid helped us build our e-commerce platform from scratch. His expertise in React and Redux made the process smooth and efficient. Highly recommended!",
      rating: 5,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            What People{" "}
            <span className="text-blue-600 dark:text-blue-400">Say</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
            Testimonials from clients and colleagues
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-xl">
            <FaQuoteLeft className="text-blue-600 dark:text-blue-400 text-4xl mb-6 opacity-50" />

            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-600/20"
              />

              <div className="flex-1">
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </p>

                <div className="flex items-center gap-2 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${i < testimonials[currentIndex].rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                    />
                  ))}
                </div>

                <h4 className="font-bold text-gray-900 dark:text-white mt-3">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {testimonials[currentIndex].position}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 hover:text-white transition-colors"
            >
              <FaChevronLeft />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-blue-600 w-6"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 hover:text-white transition-colors"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
