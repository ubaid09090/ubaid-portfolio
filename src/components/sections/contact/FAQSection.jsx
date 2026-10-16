// src/components/sections/contact/FAQSection.jsx
// import React, { useState } from "react";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What services do you offer?",
      answer:
        "I offer front-end development services including React.js development, responsive web design, UI/UX implementation, API integration, and website optimization. I can build anything from simple landing pages to complex web applications.",
    },
    {
      id: 2,
      question: "What is your availability for projects?",
      answer:
        "I am currently available for full-time, freelance, and remote opportunities. I can start immediately on most projects. For larger projects, I can adjust my schedule to meet your timeline requirements.",
    },
    {
      id: 3,
      question: "What is your development process?",
      answer:
        "My process typically includes: 1) Requirement gathering and planning, 2) UI/UX design and prototyping, 3) Development and implementation, 4) Testing and quality assurance, 5) Deployment and launch, 6) Maintenance and support.",
    },
    {
      id: 4,
      question: "What technologies do you specialize in?",
      answer:
        "I specialize in React.js, Redux, Tailwind CSS, JavaScript, HTML5, CSS3, Next.js, API integration, Firebase, Git, and responsive web design. I also have experience with TypeScript and various front-end tools.",
    },
    {
      id: 5,
      question: "How much do you charge for projects?",
      answer:
        "Pricing depends on the project scope, complexity, and timeline. I offer competitive rates and can provide a detailed quote after discussing your specific requirements. Contact me for a free consultation and estimate.",
    },
    {
      id: 6,
      question: "Do you provide maintenance and support?",
      answer:
        "Yes, I offer ongoing maintenance and support services for websites and applications. This includes bug fixes, updates, performance optimization, and feature enhancements. Custom maintenance packages are available based on your needs.",
    },
    {
      id: 7,
      question: "How do I get started with a project?",
      answer:
        "Simply fill out the contact form with your project details, or reach out via email or phone. We'll schedule a consultation to discuss your requirements, timeline, and budget. From there, I'll prepare a proposal and we can get started.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Frequently Asked Questions
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
        Find quick answers to common questions
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                {faq.question}
              </span>
              {openIndex === index ? (
                <FaChevronUp className="text-blue-600 dark:text-blue-400 flex-shrink-0 ml-4" />
              ) : (
                <FaChevronDown className="text-gray-400 flex-shrink-0 ml-4" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-5 pb-5">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
