// src/components/sections/home/CTASection.jsx
// import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowRight } from "react-icons/fa";

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Let's work together to create something amazing. I'm always open to
            new opportunities and collaborations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-full font-medium transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center gap-2"
            >
              Contact Me <FaArrowRight />
            </Link>
            <a
              href="mailto:uk2011768@gmail.com"
              className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full font-medium transition-all duration-300 flex items-center gap-2"
            >
              <FaEnvelope /> Email Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
