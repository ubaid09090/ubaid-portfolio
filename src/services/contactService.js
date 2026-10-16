// src/services/contactService.js
import apiClient from "./apiClient";
import emailjs from "@emailjs/browser";

// Send contact message via EmailJS
export const sendContactEmail = async (data) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey =
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY ||
      import.meta.env.VITE_EMAILJS_USER_ID;

    if (
      !serviceId ||
      !templateId ||
      !publicKey ||
      serviceId.startsWith("your_") ||
      templateId.startsWith("your_") ||
      publicKey.startsWith("your_")
    ) {
      throw new Error(
        "EmailJS service ID, template ID, and public key must be configured."
      );
    }

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      to_name: "Ubaid Ullah",
      reply_to: data.email,
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      { publicKey }
    );

    return {
      success: true,
      message: "Email sent successfully",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.text || error?.message || "Failed to send email",
    };
  }
};

// Send contact message via API
export const sendContactMessage = async (messageData) => {
  try {
    const response = await apiClient.post("/contact/send", messageData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send message",
    };
  }
};

// Get all messages (Admin only)
export const getMessages = async () => {
  try {
    const response = await apiClient.get("/admin/messages");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch messages",
    };
  }
};

// Delete message (Admin only)
export const deleteMessage = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/messages/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete message",
    };
  }
};

// Mark message as read (Admin only)
export const markMessageAsRead = async (id) => {
  try {
    const response = await apiClient.put(`/admin/messages/${id}/read`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to mark message as read",
    };
  }
};

export default {
  sendContactEmail,
  sendContactMessage,
  getMessages,
  deleteMessage,
  markMessageAsRead,
};
