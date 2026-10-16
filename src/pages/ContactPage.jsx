// src/pages/ContactPage.jsx
// import React from "react";
import ContactForm from "../components/sections/contact/ContactForm";
import ContactInfo from "../components/sections/contact/ContactInfo";
import SocialLinks from "../components/sections/contact/SocialLinks";
import MapSection from "../components/sections/contact/MapSection";
import FAQSection from "../components/sections/contact/FAQSection";

const ContactPage = () => {
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Get In{" "}
            <span className="text-blue-600 dark:text-blue-400">Touch</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <ContactInfo />
          <ContactForm />
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <SocialLinks />
          <FAQSection />
        </div>

        <div className="mt-12">
          <MapSection />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
