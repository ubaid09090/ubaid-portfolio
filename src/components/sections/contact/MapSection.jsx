// src/components/sections/contact/ContactForm.jsx
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { sendContactEmail } from "../../../services/contactService";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const recaptchaSiteKey = import.meta.env.VITE_GOOGLE_RECAPTCHA_KEY;
  const requiresRecaptcha =
    Boolean(recaptchaSiteKey) &&
    recaptchaSiteKey !== "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" &&
    !recaptchaSiteKey.startsWith("your_");

  // Handle reCAPTCHA change
  const onRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  // Handle reCAPTCHA expiry
  const onRecaptchaExpired = () => {
    setRecaptchaValue(null);
    toast.warning("reCAPTCHA expired. Please verify again.");
  };

  const onSubmit = async (data) => {
    if (requiresRecaptcha && !recaptchaValue) {
      toast.error("Please complete the reCAPTCHA verification", {
        duration: 4000,
        icon: "🤖",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(data);
      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success("✅ Message sent successfully! I'll get back to you soon.", {
        duration: 5000,
      });

      // Reset form
      reset();
      setRecaptchaValue(null);
      
      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }

    } catch (error) {
      console.error("Error sending email:", error);
      
      // Better error messages
      if (error.text) {
        toast.error(`❌ ${error.text}`);
      } else if (error.message) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error("❌ Failed to send message. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          type="text"
          placeholder="John Doe"
          className={`w-full px-4 py-3 rounded-lg border transition-all duration-200
            ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            }
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:ring-2 focus:outline-none`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          type="email"
          placeholder="john@example.com"
          className={`w-full px-4 py-3 rounded-lg border transition-all duration-200
            ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            }
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:ring-2 focus:outline-none`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          {...register("subject", {
            required: "Subject is required",
            minLength: {
              value: 3,
              message: "Subject must be at least 3 characters",
            },
          })}
          type="text"
          placeholder="Project Inquiry"
          className={`w-full px-4 py-3 rounded-lg border transition-all duration-200
            ${
              errors.subject
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            }
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:ring-2 focus:outline-none`}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters",
            },
          })}
          rows="5"
          placeholder="Tell me about your project..."
          className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 resize-none
            ${
              errors.message
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            }
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:ring-2 focus:outline-none`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {requiresRecaptcha && (
        <div className="flex flex-col items-center gap-2">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={recaptchaSiteKey}
            onChange={onRecaptchaChange}
            onExpired={onRecaptchaExpired}
            theme="light"
          />
          {!recaptchaValue && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Please verify you're human
            </p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="animate-spin" size={18} />
            Sending...
          </>
        ) : (
          <>
            <FaPaperPlane />
            Send Message
          </>
        )}
      </button>

      {/* Debug Info - Remove in production */}
      {import.meta.env.DEV && (
        <div className="text-xs text-gray-400 dark:text-gray-600 mt-4 p-2 border border-dashed border-gray-300 rounded">
          <p>Debug: reCAPTCHA Value: {recaptchaValue ? "✅ Set" : "❌ Not Set"}</p>
          <p>Service ID: {import.meta.env.VITE_EMAILJS_SERVICE_ID ? "✅" : "❌"}</p>
          <p>Template ID: {import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? "✅" : "❌"}</p>
          <p>Public Key: {import.meta.env.VITE_EMAILJS_PUBLIC_KEY || import.meta.env.VITE_EMAILJS_USER_ID ? "✅" : "❌"}</p>
          <p>reCAPTCHA: {requiresRecaptcha ? "Enabled" : "Not configured (optional)"}</p>
        </div>
      )}
    </form>
  );
};

export default ContactForm;