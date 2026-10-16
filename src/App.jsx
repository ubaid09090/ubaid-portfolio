// src/App.jsx
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from './redux/slices/themeSlice';

// ✅ Import Analytics
import {
  initGA,
  trackPageView,
  trackVisitor,
  trackSessionEnd,
  trackScrollDepth
} from './services/analyticsService';

// ✅ Lazy Load Components
const Layout = lazy(() => import('./components/layout/Layout'));
const AdminLayout = lazy(() => import('./components/layout/AdminLayout'));

// ✅ Lazy Load Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// ✅ Lazy Load Admin Pages
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminProjectsPage = lazy(() => import('./pages/AdminProjectsPage'));
const AdminSkillsPage = lazy(() => import('./pages/AdminSkillsPage'));
const AdminExperiencePage = lazy(() => import('./pages/AdminExperiencePage'));
const AdminEducationPage = lazy(() => import('./pages/AdminEducationPage'));
const AdminMessagesPage = lazy(() => import('./pages/AdminMessagesPage'));
const AdminSettingsPage = lazy(() => import('./pages/AdminSettingsPage'));
const AdminProfilePage = lazy(() => import('./pages/AdminProfilePage'));
const AdminAnalyticsPage = lazy(() => import('./pages/AdminAnalyticsPage'));

// Protected Route Component
const ProtectedRoute = lazy(() => import('./components/common/ProtectedRoute'));

// ✅ Loading Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">Loading...</p>
    </div>
  </div>
);

// ✅ Analytics Tracker Component
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
};

// ✅ Scroll Tracker Component
const ScrollTracker = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      trackScrollDepth(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
};

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  // ✅ Initialize Analytics
  useEffect(() => {
    initGA();
    trackVisitor();

    const handleBeforeUnload = () => {
      trackSessionEnd();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // ✅ Apply theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    dispatch(setTheme(savedTheme));
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Router>
        <AnalyticsTracker />
        <ScrollTracker />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: theme === 'dark' ? '#1e293b' : '#ffffff',
              color: theme === 'dark' ? '#f8fafc' : '#0f172a',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:id" element={<ProjectDetailPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="resume" element={<ResumePage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

           

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboardPage />} />
                  <Route path="projects" element={<AdminProjectsPage />} />
                  <Route path="skills" element={<AdminSkillsPage />} />
                  <Route path="experience" element={<AdminExperiencePage />} />
                  <Route path="education" element={<AdminEducationPage />} />
                  <Route path="messages" element={<AdminMessagesPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                  <Route path="profile" element={<AdminProfilePage />} />
                  <Route path="analytics" element={<AdminAnalyticsPage />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </Suspense>
          </Router>
        </HelmetProvider>
        );
}

        export default App;