// src/components/sections/admin/AdminAnalytics.jsx
import { useState, useEffect } from "react";
import {
  FaUsers,
  FaEye,
  FaDesktop,
  FaMobile,
  FaChrome,
  FaFirefox,
  FaSafari,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
} from "react-icons/fa";
import LoadingSpinner from "../../common/LoadingSpinner";
import { getAnalytics, getLocalAnalytics } from "../../../services/analyticsService";

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    totalViews: 0,
    uniqueVisitors: 0,
    devices: { desktop: 0, mobile: 0, tablet: 0 },
    browsers: { chrome: 0, firefox: 0, safari: 0, edge: 0 },
    pageViews: { home: 0, about: 0, projects: 0, contact: 0, services: 0, resume: 0 },
    visitorHistory: [],
    todayVisits: 0,
    thisWeekVisits: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // ✅ Get real analytics data
        const response = await getAnalytics();
        if (response.success) {
          setAnalytics(response.data);
        } else {
          // ✅ Fallback to local data
          const localData = getLocalAnalytics();
          setAnalytics({
            ...analytics,
            totalVisitors: localData.totalVisits || 0,
            uniqueVisitors: localData.uniqueVisitors || 0,
            todayVisits: localData.todayVisits || 0,
            thisWeekVisits: localData.thisWeekVisits || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        // ✅ Use local data as fallback
        const localData = getLocalAnalytics();
        setAnalytics({
          ...analytics,
          totalVisitors: localData.totalVisits || 0,
          uniqueVisitors: localData.uniqueVisitors || 0,
          todayVisits: localData.todayVisits || 0,
          thisWeekVisits: localData.thisWeekVisits || 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  const stats = [
    {
      id: 1,
      label: 'Total Visitors',
      value: analytics.totalVisitors?.toLocaleString() || '0',
      icon: FaUsers,
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      change: analytics.todayVisits > 0 ? `+${analytics.todayVisits} today` : 'No visitors today',
      trend: analytics.todayVisits > 0 ? 'up' : 'neutral',
    },
    {
      id: 2,
      label: 'Unique Visitors',
      value: analytics.uniqueVisitors?.toLocaleString() || '0',
      icon: FaUsers,
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      change: analytics.thisWeekVisits > 0 ? `${analytics.thisWeekVisits} this week` : 'No visitors this week',
      trend: analytics.thisWeekVisits > 0 ? 'up' : 'neutral',
    },
    {
      id: 3,
      label: 'Total Views',
      value: analytics.totalViews?.toLocaleString() || '0',
      icon: FaEye,
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/30',
      change: 'All time views',
      trend: 'neutral',
    },
  ];

  const maxVisits = Math.max(...(analytics.visitorHistory || []).map((d) => d.count || 0), 1);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your portfolio performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`text-2xl ${stat.color}`} />
              </div>
              <span className={`text-sm font-medium flex items-center gap-1 ${
                stat.trend === 'up' ? 'text-green-500' : 
                stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'
              }`}>
                {stat.trend === 'up' && <FaArrowUp size={12} />}
                {stat.trend === 'down' && <FaArrowDown size={12} />}
                {stat.trend === 'neutral' && <FaMinus size={12} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Visitor History Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Visitor History
        </h3>
        <div className="flex items-end justify-between h-48 gap-2">
          {(analytics.visitorHistory || []).length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center w-full">
              No visitor data available yet. Start getting visitors to see analytics!
            </p>
          ) : (
            (analytics.visitorHistory || []).map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-1000"
                  style={{
                    height: `${(day.count / maxVisits) * 100}%`,
                    minHeight: '4px',
                  }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {day.count}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Devices & Browsers */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Devices
          </h3>
          <div className="space-y-3">
            {[
              { key: 'desktop', label: 'Desktop', icon: FaDesktop, color: 'text-blue-600' },
              { key: 'mobile', label: 'Mobile', icon: FaMobile, color: 'text-green-600' },
              { key: 'tablet', label: 'Tablet', icon: FaDesktop, color: 'text-purple-600' },
            ].map((device) => (
              <div key={device.key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-2">
                    <device.icon className={device.color} />
                    {device.label}
                  </span>
                  <span className="font-medium">{analytics.devices?.[device.key] || 0}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${device.key === 'desktop' ? 'from-blue-500 to-blue-600' : device.key === 'mobile' ? 'from-green-500 to-green-600' : 'from-purple-500 to-purple-600'}`}
                    style={{ width: `${analytics.devices?.[device.key] || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Browsers
          </h3>
          <div className="space-y-3">
            {[
              { key: 'chrome', label: 'Chrome', icon: FaChrome, color: 'text-blue-600' },
              { key: 'firefox', label: 'Firefox', icon: FaFirefox, color: 'text-orange-600' },
              { key: 'safari', label: 'Safari', icon: FaSafari, color: 'text-blue-400' },
            ].map((browser) => (
              <div key={browser.key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-2">
                    <browser.icon className={browser.color} />
                    {browser.label}
                  </span>
                  <span className="font-medium">{analytics.browsers?.[browser.key] || 0}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${browser.key === 'chrome' ? 'from-blue-500 to-blue-600' : browser.key === 'firefox' ? 'from-orange-500 to-orange-600' : 'from-blue-400 to-blue-500'}`}
                    style={{ width: `${analytics.browsers?.[browser.key] || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page Views */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mt-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Page Views
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(analytics.pageViews || {}).map(([page, count]) => (
            <div key={page} className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(count || 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {page === 'home' ? 'Home' : 
                 page === 'about' ? 'About' : 
                 page === 'projects' ? 'Projects' : 
                 page === 'contact' ? 'Contact' : 
                 page === 'services' ? 'Services' : 
                 page === 'resume' ? 'Resume' : page}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;