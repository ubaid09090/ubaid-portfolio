// src/utils/apiUtils.js
import { STATUS_CODES } from "./constants";

// Handle API response
export const handleApiResponse = (response) => {
  if (response.success) {
    return {
      success: true,
      data: response.data,
      message: response.message || "Success",
    };
  }
  return {
    success: false,
    error: response.message || "Something went wrong",
    data: null,
  };
};

// Handle API error
export const handleApiError = (error) => {
  console.error("API Error:", error);

  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;
    return {
      success: false,
      status,
      message: data?.message || "Server error occurred",
      data: data,
    };
  } else if (error.request) {
    // No response from server
    return {
      success: false,
      status: STATUS_CODES.SERVER_ERROR,
      message: "Network error. Please check your connection.",
    };
  } else {
    // Request error
    return {
      success: false,
      message: error.message || "An error occurred",
    };
  }
};

// Check if request was successful
export const isSuccess = (response) => {
  return response && response.success === true;
};

// Check if request failed
export const isFailed = (response) => {
  return !response || response.success === false;
};

// Get error message
export const getErrorMessage = (error) => {
  if (typeof error === "string") return error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return "An unknown error occurred";
};

// Build query string - FIXED: removed unused _ parameter
export const buildQueryString = (params) => {
  if (!params) return "";
  const query = Object.entries(params)
    .filter((entry) => {
      const value = entry[1];
      return value !== undefined && value !== null && value !== "";
    })
    .map((entry) => {
      const key = entry[0];
      const value = entry[1];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");
  return query ? `?${query}` : "";
};

// Parse query string
export const parseQueryString = (queryString) => {
  if (!queryString) return {};
  const params = {};
  const search = queryString.startsWith("?")
    ? queryString.slice(1)
    : queryString;
  search.split("&").forEach((param) => {
    const [key, value] = param.split("=");
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    }
  });
  return params;
};

// Get API URL with query params
export const buildApiUrl = (baseUrl, params) => {
  return `${baseUrl}${buildQueryString(params)}`;
};

// Request wrapper with retry
export const requestWithRetry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return requestWithRetry(fn, retries - 1, delay * 2);
  }
};

export default {
  handleApiResponse,
  handleApiError,
  isSuccess,
  isFailed,
  getErrorMessage,
  buildQueryString,
  parseQueryString,
  buildApiUrl,
  requestWithRetry,
};
