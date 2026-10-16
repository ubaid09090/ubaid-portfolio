// src/utils/formValidation.js
import { PATTERNS } from "./constants";

// Validation Rules
export const VALIDATION_RULES = {
  required: (value) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return "This field is required";
    }
    return null;
  },

  email: (value) => {
    if (value && !PATTERNS.EMAIL.test(value)) {
      return "Please enter a valid email address";
    }
    return null;
  },

  password: (value) => {
    if (value && !PATTERNS.PASSWORD.test(value)) {
      return "Password must be at least 8 characters with at least one letter and one number";
    }
    return null;
  },

  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Must be at most ${max} characters`;
    }
    return null;
  },

  min: (min) => (value) => {
    if (value !== undefined && value !== null && value < min) {
      return `Must be at least ${min}`;
    }
    return null;
  },

  max: (max) => (value) => {
    if (value !== undefined && value !== null && value > max) {
      return `Must be at most ${max}`;
    }
    return null;
  },

  url: (value) => {
    if (value && !PATTERNS.URL.test(value)) {
      return "Please enter a valid URL";
    }
    return null;
  },

  phone: (value) => {
    if (value && !PATTERNS.PHONE.test(value)) {
      return "Please enter a valid phone number";
    }
    return null;
  },

  confirmPassword: (password) => (value) => {
    if (value !== password) {
      return "Passwords do not match";
    }
    return null;
  },
};

// Contact form validation
export const validateContactForm = (data) => {
  const errors = {};

  const required = VALIDATION_RULES.required;
  const email = VALIDATION_RULES.email;
  const minLength = VALIDATION_RULES.minLength(3);
  const maxLength = VALIDATION_RULES.maxLength(1000);

  const nameError = required(data.name);
  if (nameError) errors.name = nameError;

  const emailError = required(data.email) || email(data.email);
  if (emailError) errors.email = emailError;

  const subjectError = required(data.subject) || minLength(data.subject);
  if (subjectError) errors.subject = subjectError;

  const messageError =
    required(data.message) ||
    minLength(data.message) ||
    maxLength(data.message);
  if (messageError) errors.message = messageError;

  return errors;
};

// Login form validation
export const validateLoginForm = (data) => {
  const errors = {};

  const required = VALIDATION_RULES.required;
  const email = VALIDATION_RULES.email;

  const emailError = required(data.email) || email(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = required(data.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

// Register form validation
export const validateRegisterForm = (data) => {
  const errors = {};

  const required = VALIDATION_RULES.required;
  const email = VALIDATION_RULES.email;
  const password = VALIDATION_RULES.password;
  const confirmPassword = VALIDATION_RULES.confirmPassword(data.password);

  const nameError =
    required(data.name) || VALIDATION_RULES.minLength(2)(data.name);
  if (nameError) errors.name = nameError;

  const emailError = required(data.email) || email(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = required(data.password) || password(data.password);
  if (passwordError) errors.password = passwordError;

  const confirmError =
    required(data.confirmPassword) || confirmPassword(data.confirmPassword);
  if (confirmError) errors.confirmPassword = confirmError;

  return errors;
};

// Project form validation
export const validateProjectForm = (data) => {
  const errors = {};

  const required = VALIDATION_RULES.required;
  const url = VALIDATION_RULES.url;

  const titleError =
    required(data.title) || VALIDATION_RULES.minLength(3)(data.title);
  if (titleError) errors.title = titleError;

  const categoryError = required(data.category);
  if (categoryError) errors.category = categoryError;

  if (data.liveUrl && url(data.liveUrl)) {
    errors.liveUrl = url(data.liveUrl);
  }

  if (data.githubUrl && url(data.githubUrl)) {
    errors.githubUrl = url(data.githubUrl);
  }

  return errors;
};

// Skill form validation
export const validateSkillForm = (data) => {
  const errors = {};

  const required = VALIDATION_RULES.required;
  const min = VALIDATION_RULES.min(0);
  const max = VALIDATION_RULES.max(100);

  const nameError =
    required(data.name) || VALIDATION_RULES.minLength(2)(data.name);
  if (nameError) errors.name = nameError;

  const levelError = required(data.level) || min(data.level) || max(data.level);
  if (levelError) errors.level = levelError;

  return errors;
};

// Experience form validation
export const validateExperienceForm = (data) => {
  const errors = {};

  const required = VALIDATION_RULES.required;

  const positionError =
    required(data.position) || VALIDATION_RULES.minLength(2)(data.position);
  if (positionError) errors.position = positionError;

  const companyError =
    required(data.company) || VALIDATION_RULES.minLength(2)(data.company);
  if (companyError) errors.company = companyError;

  const periodError = required(data.period);
  if (periodError) errors.period = periodError;

  return errors;
};

// Education form validation
export const validateEducationForm = (data) => {
  const errors = {};

  const required = VALIDATION_RULES.required;

  const degreeError =
    required(data.degree) || VALIDATION_RULES.minLength(2)(data.degree);
  if (degreeError) errors.degree = degreeError;

  const institutionError =
    required(data.institution) ||
    VALIDATION_RULES.minLength(2)(data.institution);
  if (institutionError) errors.institution = institutionError;

  const periodError = required(data.period);
  if (periodError) errors.period = periodError;

  return errors;
};

export default {
  VALIDATION_RULES,
  validateContactForm,
  validateLoginForm,
  validateRegisterForm,
  validateProjectForm,
  validateSkillForm,
  validateExperienceForm,
  validateEducationForm,
};
