// src/config/firebaseConfig.js

// Firebase Configuration
export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Firebase Services
export const FIREBASE_SERVICES = {
  auth: 'auth',
  firestore: 'firestore',
  storage: 'storage',
  analytics: 'analytics',
};

// Firebase Collections
export const FIREBASE_COLLECTIONS = {
  projects: 'projects',
  skills: 'skills',
  experiences: 'experiences',
  educations: 'educations',
  messages: 'messages',
  users: 'users',
  settings: 'settings',
};

// Initialize Firebase
export const initFirebase = () => {
  // Check if Firebase is available and configured
  if (!FIREBASE_CONFIG.apiKey) {
    console.warn('Firebase API key is missing. Firebase will not be initialized.');
    return null;
  }

  try {
    // Dynamic import to avoid loading Firebase if not needed
    const { initializeApp } = await import('firebase/app');
    const { getAuth } = await import('firebase/auth');
    const { getFirestore } = await import('firebase/firestore');
    const { getStorage } = await import('firebase/storage');
    const { getAnalytics } = await import('firebase/analytics');

    const app = initializeApp(FIREBASE_CONFIG);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const analytics = getAnalytics(app);

    return { app, auth, db, storage, analytics };
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    return null;
  }
};

export default {
  FIREBASE_CONFIG,
  FIREBASE_SERVICES,
  FIREBASE_COLLECTIONS,
  initFirebase,
};