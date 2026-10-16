// src/components/common/Footer.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaYoutube,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";
import { fetchSettings } from "../../redux/slices/settingsSlice";

// ✅ Import profile image for logo
import profileImg from "../../assets/images/profile/logo.png";
import profileImgWebp from "../../assets/images/profile/logo.webp";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings || {});

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const socialLinks = settings?.socialLinks || {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    Facebook: "https://Facebook.com/yourusername",
    youtube: "https://youtube.com/@yourchannel",
    instagram: "https://instagram.com/yourusername",
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Resume", path: "/resume" },
    { name: "Contact", path: "/contact" },
  ];

  const socialIcons = [
    { icon: FaGithub, url: socialLinks.github, label: "GitHub" },
    { icon: FaLinkedin, url: socialLinks.linkedin, label: "LinkedIn" },
    { icon: FaFacebook, url: socialLinks.Facebook, label: "Facebook" },
    { icon: FaYoutube, url: socialLinks.youtube, label: "YouTube" },
    { icon: FaInstagram, url: socialLinks.instagram, label: "Instagram" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Brand Section with Logo */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              {/* ✅ Logo Image - Small Circle */}
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/30 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-110">
                <picture>
                  <source srcSet={profileImgWebp} type="image/webp" />
                  <img 
                    src={profileImg} 
                    alt="Ubaid Ullah" 
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
              <div className="hidden sm:block">
                                <div className="flex items-baseline">
                                    <span className="text-lg md:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                                        Ubaid
                                    </span>
                                    <span className="text-lg md:text-2xl font-extrabold text-gray-800 dark:text-white ml-1">
                                        Ullah
                                    </span>
                                </div>
                                <div className="hidden lg:block text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 -mt-0.5">
                                    Front End Developer
                                </div>
                            </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 max-w-sm">
              Front-End Developer passionate about creating responsive, user-friendly web applications with modern technologies.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((item, index) => (
                item.url && (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
                    aria-label={item.label}
                  >
                    <item.icon className="text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300" size={18} />
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" size={10} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0" size={16} />
                <span>Commercial Market Satellite Town Rawalpindi</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <FaEnvelope className="text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0" size={16} />
                <a href="mailto:uk2011768@gmail.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  uk2011768@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <FaPhone className="text-indigo-500 dark:text-indigo-400 mt-0.5 flex-shrink-0" size={16} />
                <a href="tel:+923197900803" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  0319-7900803
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Let's Connect
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Have a project in mind? Let's work together!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              Get in Touch
              <FaArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {currentYear} Ubaid Ullah. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Terms of Service
              </Link>
              <span className="text-gray-600 dark:text-gray-400">
                Made with ❤️
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;