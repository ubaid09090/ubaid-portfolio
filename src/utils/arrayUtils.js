// src/utils/arrayUtils.js

// Check if array is empty
export const isEmpty = (arr) => {
  return !arr || arr.length === 0;
};

// Get first item
export const first = (arr) => {
  return arr && arr.length > 0 ? arr[0] : null;
};

// Get last item
export const last = (arr) => {
  return arr && arr.length > 0 ? arr[arr.length - 1] : null;
};

// Get random item
export const random = (arr) => {
  return arr && arr.length > 0
    ? arr[Math.floor(Math.random() * arr.length)]
    : null;
};

// Remove duplicates
export const unique = (arr) => {
  return [...new Set(arr)];
};

// Remove item by value
export const removeByValue = (arr, value) => {
  return arr.filter((item) => item !== value);
};

// Remove item by index
export const removeByIndex = (arr, index) => {
  if (index < 0 || index >= arr.length) return arr;
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

// Insert item at index
export const insert = (arr, index, item) => {
  if (index < 0) return [item, ...arr];
  if (index >= arr.length) return [...arr, item];
  return [...arr.slice(0, index), item, ...arr.slice(index)];
};

// Replace item at index
export const replace = (arr, index, item) => {
  if (index < 0 || index >= arr.length) return arr;
  return [...arr.slice(0, index), item, ...arr.slice(index + 1)];
};

// Move item from one index to another
export const move = (arr, fromIndex, toIndex) => {
  if (fromIndex < 0 || fromIndex >= arr.length) return arr;
  if (toIndex < 0 || toIndex >= arr.length) return arr;
  const item = arr[fromIndex];
  const newArr = removeByIndex(arr, fromIndex);
  return insert(newArr, toIndex, item);
};

// Group by key
export const groupBy = (arr, key) => {
  return arr.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

// Sort by key
export const sortBy = (arr, key, ascending = true) => {
  return [...arr].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return ascending ? -1 : 1;
    if (aVal > bVal) return ascending ? 1 : -1;
    return 0;
  });
};

// Filter by search term
export const filterBy = (arr, searchTerm, keys) => {
  if (!searchTerm) return arr;
  const term = searchTerm.toLowerCase();
  return arr.filter((item) => {
    return keys.some((key) => {
      const value = item[key];
      return value && value.toString().toLowerCase().includes(term);
    });
  });
};

// Paginate array
export const paginate = (arr, page, itemsPerPage) => {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return arr.slice(start, end);
};

// Chunk array
export const chunk = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

// Flatten array
export const flatten = (arr) => {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
};

// Intersection of two arrays
export const intersection = (arr1, arr2) => {
  return arr1.filter((item) => arr2.includes(item));
};

// Difference of two arrays
export const difference = (arr1, arr2) => {
  return arr1.filter((item) => !arr2.includes(item));
};

// Union of two arrays
export const union = (arr1, arr2) => {
  return [...new Set([...arr1, ...arr2])];
};

export default {
  isEmpty,
  first,
  last,
  random,
  unique,
  removeByValue,
  removeByIndex,
  insert,
  replace,
  move,
  groupBy,
  sortBy,
  filterBy,
  paginate,
  chunk,
  flatten,
  intersection,
  difference,
  union,
};
