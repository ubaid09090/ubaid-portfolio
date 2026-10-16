// src/__tests__/utils/validation.test.js
import { describe, it, expect } from "vitest";
import {
  validateContactForm,
  validateLoginForm,
  validateRegisterForm,
  validateProjectForm,
  validateSkillForm,
  validateExperienceForm,
  validateEducationForm,
  VALIDATION_RULES,
} from "../../utils/formValidation";

describe("Validation Rules", () => {
  describe("required rule", () => {
    it("should return error when value is empty", () => {
      const result = VALIDATION_RULES.required("");
      expect(result).toBe("This field is required");
    });

    it("should return error when value is null", () => {
      const result = VALIDATION_RULES.required(null);
      expect(result).toBe("This field is required");
    });

    it("should return null when value is valid", () => {
      const result = VALIDATION_RULES.required("Hello");
      expect(result).toBeNull();
    });
  });

  describe("email rule", () => {
    it("should return error when email is invalid", () => {
      const result = VALIDATION_RULES.email("invalid-email");
      expect(result).toBe("Please enter a valid email address");
    });

    it("should return null when email is valid", () => {
      const result = VALIDATION_RULES.email("test@example.com");
      expect(result).toBeNull();
    });

    it("should return null when email is empty", () => {
      const result = VALIDATION_RULES.email("");
      expect(result).toBeNull();
    });
  });

  describe("minLength rule", () => {
    it("should return error when length is less than minimum", () => {
      const rule = VALIDATION_RULES.minLength(5);
      const result = rule("abc");
      expect(result).toBe("Must be at least 5 characters");
    });

    it("should return null when length meets minimum", () => {
      const rule = VALIDATION_RULES.minLength(5);
      const result = rule("abcde");
      expect(result).toBeNull();
    });
  });

  describe("maxLength rule", () => {
    it("should return error when length exceeds maximum", () => {
      const rule = VALIDATION_RULES.maxLength(5);
      const result = rule("abcdef");
      expect(result).toBe("Must be at most 5 characters");
    });

    it("should return null when length is within maximum", () => {
      const rule = VALIDATION_RULES.maxLength(5);
      const result = rule("abcde");
      expect(result).toBeNull();
    });
  });
});

describe("Form Validations", () => {
  describe("validateContactForm", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Project Inquiry",
      message: "This is a test message with more than 10 characters",
    };

    it("should return empty errors for valid data", () => {
      const errors = validateContactForm(validData);
      expect(errors).toEqual({});
    });

    it("should return error for missing name", () => {
      const data = { ...validData, name: "" };
      const errors = validateContactForm(data);
      expect(errors.name).toBe("This field is required");
    });

    it("should return error for invalid email", () => {
      const data = { ...validData, email: "invalid" };
      const errors = validateContactForm(data);
      expect(errors.email).toBe("Please enter a valid email address");
    });

    it("should return error for short message", () => {
      const data = { ...validData, message: "Short" };
      const errors = validateContactForm(data);
      expect(errors.message).toBe("Must be at least 3 characters");
    });
  });

  describe("validateLoginForm", () => {
    const validData = {
      email: "test@example.com",
      password: "password123",
    };

    it("should return empty errors for valid data", () => {
      const errors = validateLoginForm(validData);
      expect(errors).toEqual({});
    });

    it("should return error for missing email", () => {
      const data = { ...validData, email: "" };
      const errors = validateLoginForm(data);
      expect(errors.email).toBe("This field is required");
    });

    it("should return error for missing password", () => {
      const data = { ...validData, password: "" };
      const errors = validateLoginForm(data);
      expect(errors.password).toBe("This field is required");
    });
  });

  describe("validateRegisterForm", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      password: "Password123",
      confirmPassword: "Password123",
    };

    it("should return empty errors for valid data", () => {
      const errors = validateRegisterForm(validData);
      expect(errors).toEqual({});
    });

    it("should return error for short name", () => {
      const data = { ...validData, name: "J" };
      const errors = validateRegisterForm(data);
      expect(errors.name).toBe("Must be at least 2 characters");
    });

    it("should return error for mismatched passwords", () => {
      const data = { ...validData, confirmPassword: "Different123" };
      const errors = validateRegisterForm(data);
      expect(errors.confirmPassword).toBe("Passwords do not match");
    });
  });

  describe("validateProjectForm", () => {
    const validData = {
      title: "My Project",
      category: "Web Application",
    };

    it("should return empty errors for valid data", () => {
      const errors = validateProjectForm(validData);
      expect(errors).toEqual({});
    });

    it("should return error for missing title", () => {
      const data = { ...validData, title: "" };
      const errors = validateProjectForm(data);
      expect(errors.title).toBe("This field is required");
    });

    it("should return error for missing category", () => {
      const data = { ...validData, category: "" };
      const errors = validateProjectForm(data);
      expect(errors.category).toBe("This field is required");
    });
  });

  describe("validateSkillForm", () => {
    const validData = {
      name: "React",
      level: 80,
    };

    it("should return empty errors for valid data", () => {
      const errors = validateSkillForm(validData);
      expect(errors).toEqual({});
    });

    it("should return error for missing name", () => {
      const data = { ...validData, name: "" };
      const errors = validateSkillForm(data);
      expect(errors.name).toBe("This field is required");
    });

    it("should return error for level below 0", () => {
      const data = { ...validData, level: -10 };
      const errors = validateSkillForm(data);
      expect(errors.level).toBe("Must be at least 0");
    });

    it("should return error for level above 100", () => {
      const data = { ...validData, level: 150 };
      const errors = validateSkillForm(data);
      expect(errors.level).toBe("Must be at most 100");
    });
  });

  describe("validateExperienceForm", () => {
    const validData = {
      position: "Front-End Developer",
      company: "Tech Corp",
      period: "2024 - Present",
    };

    it("should return empty errors for valid data", () => {
      const errors = validateExperienceForm(validData);
      expect(errors).toEqual({});
    });

    it("should return error for missing position", () => {
      const data = { ...validData, position: "" };
      const errors = validateExperienceForm(data);
      expect(errors.position).toBe("This field is required");
    });
  });

  describe("validateEducationForm", () => {
    const validData = {
      degree: "BS Software Engineering",
      institution: "University",
      period: "2020 - 2024",
    };

    it("should return empty errors for valid data", () => {
      const errors = validateEducationForm(validData);
      expect(errors).toEqual({});
    });

    it("should return error for missing degree", () => {
      const data = { ...validData, degree: "" };
      const errors = validateEducationForm(data);
      expect(errors.degree).toBe("This field is required");
    });
  });
});
