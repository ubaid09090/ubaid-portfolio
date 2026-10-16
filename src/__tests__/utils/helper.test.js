// src/__tests__/utils/helper.test.js
import { describe, it, expect, vi } from "vitest";
import {
  cn,
  truncateText,
  capitalize,
  capitalizeWords,
  slugify,
  generateId,
  getInitials,
  isEmpty,
  deepClone,
  sleep,
  copyToClipboard,
  formatFileSize,
  isValidEmail,
  isValidUrl,
  isValidPhone,
  isValidPassword,
  getBrowserInfo,
  getDeviceInfo,
} from "../../utils/helper";

describe("Helper Functions", () => {
  describe("cn (class name merger)", () => {
    it("should merge class names", () => {
      expect(cn("class1", "class2", "class3")).toBe("class1 class2 class3");
    });

    it("should filter out falsy values", () => {
      expect(cn("class1", null, "class2", undefined, false, "class3")).toBe(
        "class1 class2 class3",
      );
    });

    it("should handle empty inputs", () => {
      expect(cn()).toBe("");
    });
  });

  describe("truncateText", () => {
    it("should truncate text when longer than maxLength", () => {
      const text = "This is a long text that should be truncated";
      expect(truncateText(text, 20)).toBe("This is a long text...");
    });

    it("should not truncate text when shorter than maxLength", () => {
      const text = "Short text";
      expect(truncateText(text, 20)).toBe("Short text");
    });

    it("should use custom suffix", () => {
      const text = "This is a long text";
      expect(truncateText(text, 10, "***")).toBe("This is a ***");
    });

    it("should handle empty string", () => {
      expect(truncateText("")).toBe("");
    });
  });

  describe("capitalize", () => {
    it("should capitalize first letter", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("HELLO")).toBe("Hello");
    });

    it("should handle empty string", () => {
      expect(capitalize("")).toBe("");
    });

    it("should handle single character", () => {
      expect(capitalize("h")).toBe("H");
    });
  });

  describe("capitalizeWords", () => {
    it("should capitalize each word", () => {
      expect(capitalizeWords("hello world")).toBe("Hello World");
      expect(capitalizeWords("HELLO WORLD")).toBe("Hello World");
    });

    it("should handle empty string", () => {
      expect(capitalizeWords("")).toBe("");
    });
  });

  describe("slugify", () => {
    it("should convert string to slug", () => {
      expect(slugify("Hello World!")).toBe("hello-world");
      expect(slugify("This is a test")).toBe("this-is-a-test");
    });

    it("should handle special characters", () => {
      expect(slugify("Hello @ World # Test")).toBe("hello-world-test");
    });

    it("should handle empty string", () => {
      expect(slugify("")).toBe("");
    });
  });

  describe("generateId", () => {
    it("should generate a string", () => {
      const id = generateId();
      expect(typeof id).toBe("string");
    });

    it("should generate unique ids", () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });
  });

  describe("getInitials", () => {
    it("should get initials from name", () => {
      expect(getInitials("John Doe")).toBe("JD");
      expect(getInitials("Ubaid Ullah")).toBe("UU");
    });

    it("should handle single word", () => {
      expect(getInitials("John")).toBe("J");
    });

    it("should handle empty string", () => {
      expect(getInitials("")).toBe("");
    });
  });

  describe("isEmpty", () => {
    it("should return true for empty values", () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty("")).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    it("should return false for non-empty values", () => {
      expect(isEmpty("hello")).toBe(false);
      expect(isEmpty([1, 2])).toBe(false);
      expect(isEmpty({ key: "value" })).toBe(false);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(false)).toBe(false);
    });
  });

  describe("deepClone", () => {
    it("should deep clone an object", () => {
      const obj = { a: 1, b: { c: 2 } };
      const clone = deepClone(obj);
      expect(clone).toEqual(obj);
      expect(clone).not.toBe(obj);
      expect(clone.b).not.toBe(obj.b);
    });

    it("should handle primitive values", () => {
      expect(deepClone(5)).toBe(5);
      expect(deepClone("hello")).toBe("hello");
      expect(deepClone(null)).toBe(null);
    });
  });

  describe("sleep", () => {
    it("should resolve after specified time", async () => {
      const start = Date.now();
      await sleep(100);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(100);
    });
  });

  describe("copyToClipboard", () => {
    it("should copy text to clipboard", async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: { writeText: mockWriteText },
      });

      const result = await copyToClipboard("test text");
      expect(result.success).toBe(true);
      expect(mockWriteText).toHaveBeenCalledWith("test text");
    });
  });

  describe("formatFileSize", () => {
    it("should format file size correctly", () => {
      expect(formatFileSize(0)).toBe("0 Bytes");
      expect(formatFileSize(1024)).toBe("1 KB");
      expect(formatFileSize(1048576)).toBe("1 MB");
      expect(formatFileSize(1073741824)).toBe("1 GB");
    });
  });

  describe("Validation helpers", () => {
    it("should validate email", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("invalid")).toBe(false);
      expect(isValidEmail("test@")).toBe(false);
    });

    it("should validate URL", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://example.com")).toBe(true);
      expect(isValidUrl("invalid")).toBe(false);
    });

    it("should validate phone", () => {
      expect(isValidPhone("123-456-7890")).toBe(true);
      expect(isValidPhone("1234567890")).toBe(true);
      expect(isValidPhone("invalid")).toBe(false);
    });

    it("should validate password", () => {
      expect(isValidPassword("Password123")).toBe(true);
      expect(isValidPassword("pass")).toBe(false);
      expect(isValidPassword("password")).toBe(false);
    });
  });

  describe("getBrowserInfo", () => {
    it("should return browser info", () => {
      const info = getBrowserInfo();
      expect(info).toHaveProperty("browser");
      expect(info).toHaveProperty("version");
      expect(typeof info.browser).toBe("string");
    });
  });

  describe("getDeviceInfo", () => {
    it("should return device info", () => {
      const device = getDeviceInfo();
      expect(["Desktop", "Mobile", "Tablet"]).toContain(device);
    });
  });
});
