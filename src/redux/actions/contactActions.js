// src/redux/actions/contactActions.js
import {
  sendContactMessage,
  fetchMessages,
  deleteMessage,
  markMessageAsRead,
  clearContactSuccess,
  clearContactError,
  clearMessages,
} from "../slices/contactSlice";

// Contact action creators
export const contactActions = {
  sendContactMessage,
  fetchMessages,
  deleteMessage,
  markMessageAsRead,
  clearContactSuccess,
  clearContactError,
  clearMessages,
};

// Helper function to validate contact form
export const validateContactForm = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
};

// Helper function to get unread messages count
export const getUnreadCount = (messages) => {
  return messages.filter((msg) => msg.status === "unread").length;
};

// Helper function to format message date
export const formatMessageDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default contactActions;
