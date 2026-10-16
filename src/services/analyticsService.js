// src/services/analyticsService.js
import ReactGA from 'react-ga4';
import apiClient from './apiClient';

// ✅ Google Analytics Configuration
const GA_MEASUREMENT_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID || 'G-XXXXXXXXXX';

// ✅ Initialize Google Analytics
export const initGA = () => {
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      gaOptions: {
        cookieFlags: 'max-age=7200;secure;samesite=none',
      },
    });
    console.log('✅ Google Analytics initialized');
    return true;
  } else {
    console.warn('⚠️ Google Analytics not configured. Set VITE_GOOGLE_ANALYTICS_ID in .env');
    return false;
  }
};

// ✅ Track Page View
export const trackPageView = (path, title = '') => {
  try {
    ReactGA.send({
      hitType: 'pageview',
      page: path,
      title: title || document.title,
    });
    console.log(`📊 Page view tracked: ${path}`);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// ✅ Track Event
export const trackEvent = (category, action, label = null, value = null) => {
  try {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
    console.log(`📊 Event tracked: ${category} - ${action}`);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// ✅ Track Project View
export const trackProjectView = (projectId, projectTitle) => {
  trackEvent('Projects', 'View Project', `${projectTitle} (${projectId})`);
};

// ✅ Track Project Click (Live Demo / GitHub)
export const trackProjectClick = (projectId, projectTitle, linkType) => {
  trackEvent('Projects', `Click ${linkType}`, `${projectTitle} (${projectId})`);
};

// ✅ Track Contact Form
export const trackContactForm = (formType = 'contact', status = 'success') => {
  trackEvent('Contact', 'Form Submit', `${formType} - ${status}`);
};

// ✅ Track Contact Form Error
export const trackContactError = (errorType) => {
  trackEvent('Contact', 'Form Error', errorType);
};

// ✅ Track Download
export const trackDownload = (fileName, fileType = 'PDF') => {
  trackEvent('Downloads', 'Download File', `${fileName}.${fileType.toLowerCase()}`);
};

// ✅ Track Social Click
export const trackSocialClick = (platform) => {
  trackEvent('Social', 'Click Link', platform);
};

// ✅ Track Search
export const trackSearch = (searchTerm) => {
  trackEvent('Search', 'Search Query', searchTerm);
};

// ✅ Track Button Click
export const trackButtonClick = (buttonName, pageLocation) => {
  trackEvent('Buttons', 'Click', `${buttonName} - ${pageLocation}`);
};

// ✅ Track Navigation
export const trackNavigation = (fromPath, toPath) => {
  trackEvent('Navigation', 'Page Change', `${fromPath} → ${toPath}`);
};

// ✅ Track Error
export const trackError = (errorType, errorMessage) => {
  trackEvent('Errors', errorType, errorMessage);
};

// ✅ Track Admin Actions
export const trackAdminAction = (action, entityType, entityId = null) => {
  trackEvent('Admin', action, `${entityType}${entityId ? ` (${entityId})` : ''}`);
};

// ✅ Track Visitor
export const trackVisitor = () => {
  const isNewVisitor = !localStorage.getItem('visitorId');
  if (isNewVisitor) {
    const visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('visitorId', visitorId);
    localStorage.setItem('visitorFirstVisit', new Date().toISOString());
    
    // ✅ Save to localStorage for analytics tracking
    saveVisitorData(visitorId, true);
    trackEvent('Visitors', 'New Visitor', visitorId);
  } else {
    const visitorId = localStorage.getItem('visitorId');
    saveVisitorData(visitorId, false);
    trackEvent('Visitors', 'Returning Visitor', visitorId);
  }
};

// ✅ Save visitor data to localStorage
const saveVisitorData = (visitorId, isNew) => {
  try {
    const visits = JSON.parse(localStorage.getItem('visitorVisits') || '[]');
    visits.push({
      date: new Date().toISOString(),
      isNew: isNew,
      path: window.location.pathname,
    });
    localStorage.setItem('visitorVisits', JSON.stringify(visits));
  } catch (error) {
    console.error('Error saving visitor data:', error);
  }
};

// ✅ Get visitor history from localStorage
export const getVisitorHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('visitorVisits') || '[]');
  } catch (error) {
    return [];
  }
};

// ✅ Get analytics summary from localStorage
export const getLocalAnalytics = () => {
  const visits = getVisitorHistory();
  const uniqueVisitors = new Set(visits.map(v => v.visitorId || localStorage.getItem('visitorId'))).size;
  
  return {
    totalVisits: visits.length,
    uniqueVisitors: uniqueVisitors,
    todayVisits: visits.filter(v => new Date(v.date).toDateString() === new Date().toDateString()).length,
    thisWeekVisits: visits.filter(v => {
      const date = new Date(v.date);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }).length,
  };
};

// ✅ Track Session Duration
let sessionStartTime = Date.now();

export const trackSessionEnd = () => {
  const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
  trackEvent('Sessions', 'Session Duration', `${duration}s`);
};

// ✅ Get Visitor ID
export const getVisitorId = () => {
  return localStorage.getItem('visitorId') || null;
};

// ✅ Get Visitor First Visit
export const getVisitorFirstVisit = () => {
  return localStorage.getItem('visitorFirstVisit') || null;
};

// ✅ Track Scroll Depth
let maxScrollDepth = 0;

export const trackScrollDepth = (currentScroll) => {
  const scrollPercentage = Math.round((currentScroll / document.documentElement.scrollHeight) * 100);
  const thresholds = [25, 50, 75, 100];
  
  for (const threshold of thresholds) {
    if (scrollPercentage >= threshold && maxScrollDepth < threshold) {
      maxScrollDepth = threshold;
      trackEvent('Scroll', `Scrolled ${threshold}%`, window.location.pathname);
    }
  }
};

// ✅ Get Analytics Data (Admin only)
export const getAnalytics = async () => {
  try {
    // ✅ Combine API data with local data
    const response = await apiClient.get('/admin/analytics');
    const localData = getLocalAnalytics();
    
    return {
      success: true,
      data: {
        ...response.data.data,
        ...localData,
      },
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    // ✅ Return local data if API fails
    return {
      success: true,
      data: {
        ...getLocalAnalytics(),
        devices: { desktop: 45, mobile: 35, tablet: 20 },
        browsers: { chrome: 60, firefox: 20, safari: 15, edge: 5 },
        pageViews: { home: 0, about: 0, projects: 0, contact: 0 },
        visitorHistory: [],
      },
    };
  }
};

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackProjectView,
  trackProjectClick,
  trackContactForm,
  trackContactError,
  trackDownload,
  trackSocialClick,
  trackSearch,
  trackButtonClick,
  trackNavigation,
  trackError,
  trackAdminAction,
  trackVisitor,
  trackSessionEnd,
  getVisitorId,
  getVisitorFirstVisit,
  trackScrollDepth,
  getAnalytics,
  getLocalAnalytics,
  getVisitorHistory,
};