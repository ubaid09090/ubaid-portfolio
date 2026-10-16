// src/components/sections/admin/AdminSettings.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Button from "../../ui/Button";
import { fetchSettings, updateSettings } from "../../../redux/slices/settingsSlice";
import { setTheme } from "../../../redux/slices/themeSlice";
import LoadingSpinner from "../../common/LoadingSpinner";

const AdminSettings = () => {
  const dispatch = useDispatch();
  const { settings, loading } = useSelector((state) => state.settings);
  const { theme } = useSelector((state) => state.theme);
  
  const [formData, setFormData] = useState({
    siteName: "",
    theme: "dark",
    socialLinks: {
      github: "",
      linkedin: "",
      Facebook: "",
      youtube: "",
      instagram: "",
    },
    seo: {
      title: "",
      description: "",
      keywords: "",
    },
  });

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setFormData({
        siteName: settings.siteName || "",
        socialLinks: {
          github: settings.socialLinks?.github || "",
          linkedin: settings.socialLinks?.linkedin || "",
          Facebook: settings.socialLinks?.Facebook || "",
          youtube: settings.socialLinks?.youtube || "",
          instagram: settings.socialLinks?.instagram || "",
        },
        seo: {
          title: settings.seo?.title || "",
          description: settings.seo?.description || "",
          keywords: settings.seo?.keywords || "",
        },
      });
    }
  }, [settings]);

  useEffect(() => {
    setFormData((currentFormData) => ({ ...currentFormData, theme }));
  }, [theme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateSettings(formData)).unwrap();
      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error(error || "Failed to update settings");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "theme") {
      dispatch(setTheme(value));
    }
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [name]: value,
      },
    });
  };

  const handleSEOChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      seo: {
        ...formData.seo,
        [name]: value,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Site Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your portfolio settings
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            General Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Social Links
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            These links will appear in Navbar, Footer, Hero Section, and Contact Page
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub
              </label>
              <input
                type="url"
                name="github"
                value={formData.socialLinks.github}
                onChange={handleSocialChange}
                placeholder="https://github.com/yourusername"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleSocialChange}
                placeholder="https://linkedin.com/in/yourusername"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Facebook
              </label>
              <input
                type="url"
                name="Facebook"
                value={formData.socialLinks.Facebook}
                onChange={handleSocialChange}
                placeholder="https://Facebook.com/yourusername"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                YouTube
              </label>
              <input
                type="url"
                name="youtube"
                value={formData.socialLinks.youtube}
                onChange={handleSocialChange}
                placeholder="https://youtube.com/@yourchannel"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instagram
              </label>
              <input
                type="url"
                name="instagram"
                value={formData.socialLinks.instagram}
                onChange={handleSocialChange}
                placeholder="https://instagram.com/yourusername"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            SEO Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Page Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.seo.title}
                onChange={handleSEOChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Meta Description
              </label>
              <textarea
                name="description"
                value={formData.seo.description}
                onChange={handleSEOChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Keywords
              </label>
              <input
                type="text"
                name="keywords"
                value={formData.seo.keywords}
                onChange={handleSEOChange}
                placeholder="React, JavaScript, Portfolio"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <Button type="submit" size="lg">
          Save Settings
        </Button>
      </form>
    </div>
  );
};

export default AdminSettings;