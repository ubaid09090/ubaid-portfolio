// src/utils/dateUtils.js
import {
  format,
  formatDistance,
  formatRelative,
  parseISO,
  differenceInDays,
} from "date-fns";
import { DATE_FORMATS } from "./constants";

// Format date
export const formatDate = (date, formatStr = DATE_FORMATS.SHORT) => {
  if (!date) return "";
  try {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    return format(parsedDate, formatStr);
  } catch (err) {
    console.error("Error formatting date:", err);
    return "";
  }
};

// Format date with time
export const formatDateTime = (date) => {
  return formatDate(date, DATE_FORMATS.DATETIME);
};

// Format date with full format
export const formatFullDate = (date) => {
  return formatDate(date, DATE_FORMATS.FULL);
};

// Get time ago
export const timeAgo = (date) => {
  if (!date) return "";
  try {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    return formatDistance(parsedDate, new Date(), { addSuffix: true });
  } catch (err) {
    console.error("Error calculating time ago:", err);
    return "";
  }
};

// Get relative date
export const getRelativeDate = (date) => {
  if (!date) return "";
  try {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    return formatRelative(parsedDate, new Date());
  } catch (err) {
    console.error("Error getting relative date:", err);
    return "";
  }
};

// Check if date is today
export const isToday = (date) => {
  if (!date) return false;
  try {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    const today = new Date();
    return (
      parsedDate.getDate() === today.getDate() &&
      parsedDate.getMonth() === today.getMonth() &&
      parsedDate.getFullYear() === today.getFullYear()
    );
  } catch (err) {
    console.error("Error checking if date is today:", err);
    return false;
  }
};

// Check if date is in the past
export const isPast = (date) => {
  if (!date) return false;
  try {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    return parsedDate < new Date();
  } catch (err) {
    console.error("Error checking if date is in past:", err);
    return false;
  }
};

// Check if date is in the future
export const isFuture = (date) => {
  if (!date) return false;
  try {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    return parsedDate > new Date();
  } catch (err) {
    console.error("Error checking if date is in future:", err);
    return false;
  }
};

// Get days difference
export const getDaysDifference = (date1, date2 = new Date()) => {
  if (!date1) return 0;
  try {
    const parsedDate1 = typeof date1 === "string" ? parseISO(date1) : date1;
    const parsedDate2 = typeof date2 === "string" ? parseISO(date2) : date2;
    return differenceInDays(parsedDate2, parsedDate1);
  } catch (err) {
    console.error("Error calculating days difference:", err);
    return 0;
  }
};

// Get year from date
export const getYear = (date) => {
  if (!date) return "";
  try {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    return parsedDate.getFullYear();
  } catch (err) {
    console.error("Error getting year from date:", err);
    return "";
  }
};

// Get month from date
export const getMonth = (date) => {
  if (!date) return "";
  try {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    return parsedDate.getMonth() + 1;
  } catch (err) {
    console.error("Error getting month from date:", err);
    return "";
  }
};

// Get day from date
export const getDay = (date) => {
  if (!date) return "";
  try {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;
    return parsedDate.getDate();
  } catch (err) {
    console.error("Error getting day from date:", err);
    return "";
  }
};

// Format duration (for experience timeline)
export const formatDuration = (startDate, endDate = null) => {
  if (!startDate) return "";

  try {
    const start =
      typeof startDate === "string" ? parseISO(startDate) : startDate;
    const end = endDate
      ? typeof endDate === "string"
        ? parseISO(endDate)
        : endDate
      : new Date();

    const diff = differenceInDays(end, start);
    const years = Math.floor(diff / 365);
    const months = Math.floor((diff % 365) / 30);

    let result = "";
    if (years > 0) result += `${years} year${years > 1 ? "s" : ""}`;
    if (months > 0)
      result += `${result ? " " : ""}${months} month${months > 1 ? "s" : ""}`;

    return result || "Less than a month";
  } catch (err) {
    console.error("Error formatting duration:", err);
    return "";
  }
};

// Get month name
export const getMonthName = (monthNumber, short = false) => {
  const monthNames = short
    ? [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]
    : [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
  return monthNames[monthNumber - 1] || "";
};

// Get day name
export const getDayName = (dayNumber, short = false) => {
  const dayNames = short
    ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    : [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
  return dayNames[dayNumber] || "";
};

export default {
  formatDate,
  formatDateTime,
  formatFullDate,
  timeAgo,
  getRelativeDate,
  isToday,
  isPast,
  isFuture,
  getDaysDifference,
  getYear,
  getMonth,
  getDay,
  formatDuration,
  getMonthName,
  getDayName,
};
