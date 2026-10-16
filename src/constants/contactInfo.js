// src/constants/contactInfo.js
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock } from "react-icons/fa";

export const CONTACT_INFO = {
  address: {
    label: "Location",
    value: "Islamabad, Pakistan",
    icon: FaMapMarkerAlt,
    fullAddress: "Islamabad, Pakistan",
    mapLink: "https://maps.google.com/maps?q=Islamabad,Pakistan",
  },
  email: {
    label: "Email",
    value: "uk2011768@gmail.com",
    icon: FaEnvelope,
    href: "mailto:uk2011768@gmail.com",
  },
  phone: {
    label: "Phone",
    value: "0319-7900803",
    icon: FaPhone,
    href: "tel:+923197900803",
  },
  workingHours: {
    label: "Working Hours",
    value: "Mon - Fri: 9:00 AM - 6:00 PM",
    icon: FaClock,
    details: [
      "Mon - Fri: 9:00 AM - 6:00 PM",
      "Sat - Sun: Available by appointment",
    ],
  },
};

export const CONTACT_FORM_CONFIG = {
  name: {
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    type: "email",
  },
  subject: {
    label: "Subject",
    placeholder: "Enter subject",
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  message: {
    label: "Message",
    placeholder: "Write your message here...",
    required: true,
    minLength: 10,
    maxLength: 1000,
    rows: 5,
  },
};

export const CONTACT_ALERT_MESSAGES = {
  success: {
    title: "Message Sent!",
    message: "Thank you for reaching out. I will get back to you soon.",
    type: "success",
  },
  error: {
    title: "Error!",
    message: "Something went wrong. Please try again later.",
    type: "error",
  },
  validation: {
    title: "Validation Error",
    message: "Please fill in all required fields correctly.",
    type: "warning",
  },
};

export default {
  CONTACT_INFO,
  CONTACT_FORM_CONFIG,
  CONTACT_ALERT_MESSAGES,
};
