// src/utils/objectUtils.js

// Check if object is empty
export const isEmpty = (obj) => {
  return !obj || Object.keys(obj).length === 0;
};

// Get nested value using dot notation
export const get = (obj, path, defaultValue = undefined) => {
  const keys = path.split(".");
  let result = obj;
  for (const key of keys) {
    if (result === undefined || result === null) {
      return defaultValue;
    }
    result = result[key];
  }
  return result !== undefined ? result : defaultValue;
};

// Set nested value using dot notation
export const set = (obj, path, value) => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const target = keys.reduce((acc, key) => {
    if (!acc[key]) acc[key] = {};
    return acc[key];
  }, obj);
  target[lastKey] = value;
  return obj;
};

// Deep clone object
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  return JSON.parse(JSON.stringify(obj));
};

// Deep merge objects
export const deepMerge = (target, source) => {
  if (!source) return target;
  const result = deepClone(target);
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      if (!result[key]) result[key] = {};
      result[key] = deepMerge(result[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};

// Pick specific keys from object - FIXED: using Object.hasOwn
export const pick = (obj, keys) => {
  return keys.reduce((result, key) => {
    if (obj && Object.hasOwn(obj, key)) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

// Omit specific keys from object
export const omit = (obj, keys) => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
};

// Invert key-value pairs
export const invert = (obj) => {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[value] = key;
    return result;
  }, {});
};

// Map object values
export const mapValues = (obj, callback) => {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key] = callback(value, key);
    return result;
  }, {});
};

// Filter object by predicate
export const filterObject = (obj, predicate) => {
  return Object.entries(obj).reduce((result, [key, value]) => {
    if (predicate(value, key)) {
      result[key] = value;
    }
    return result;
  }, {});
};

// Check if object has key - FIXED: using Object.hasOwn
export const hasKey = (obj, key) => {
  return obj && Object.hasOwn(obj, key);
};

// Get object keys
export const keys = (obj) => {
  return obj ? Object.keys(obj) : [];
};

// Get object values
export const values = (obj) => {
  return obj ? Object.values(obj) : [];
};

// Get object entries
export const entries = (obj) => {
  return obj ? Object.entries(obj) : [];
};

// Convert object to FormData
export const toFormData = (obj) => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item instanceof File) {
            formData.append(key, item);
          } else {
            formData.append(key, item);
          }
        });
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }
  });
  return formData;
};

export default {
  isEmpty,
  get,
  set,
  deepClone,
  deepMerge,
  pick,
  omit,
  invert,
  mapValues,
  filterObject,
  hasKey,
  keys,
  values,
  entries,
  toFormData,
};
