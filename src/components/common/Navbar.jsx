// src/components/common/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { fetchSettings } from "../../redux/slices/settingsSlice";
import { logout } from "../../redux/slices/authSlice";
import { toast } from "react-hot-toast";
import {
    FaBars,
    FaTimes,
    FaMoon,
    FaSun,
    FaHome,
    FaUser,
    FaProjectDiagram,
    FaServicestack,
    FaFileAlt,
    FaEnvelope,
    FaShieldAlt,
    FaCode,
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaYoutube,
    FaInstagram,
    FaSignOutAlt,
    FaUserCircle
} from "react-icons/fa";
import profileImg from "../../assets/images/profile/logo.png";
import profileImgWebp from "../../assets/images/profile/logo.png";

const navLinks = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "About", path: "/about", icon: FaUser },
    { name: "Projects", path: "/projects", icon: FaProjectDiagram },
    { name: "Services", path: "/services", icon: FaServicestack },
    { name: "Resume", path: "/resume", icon: FaFileAlt },
    { name: "Contact", path: "/contact", icon: FaEnvelope },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const { theme } = useSelector((state) => state.theme);
    const { settings } = useSelector((state) => state.settings || {});
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // ✅ Load settings
    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Apply theme
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    // Set active index based on current path
    useEffect(() => {
        const index = navLinks.findIndex(link => link.path === location.pathname);
        if (index !== -1) setActiveIndex(index);
    }, [location.pathname]);

    // ✅ Get social links from settings
    const socialLinks = settings?.socialLinks || {
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername",
        youtube: "https://youtube.com/@yourchannel",
        instagram: "https://instagram.com/yourusername",
    };

    // ✅ Handle logout
    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/');
        setIsOpen(false);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled
                        ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-gray-200/30 dark:shadow-gray-900/50 border-b border-gray-200/30 dark:border-gray-700/30"
                        : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md"
                    }`}
            >
                <div className="max-w-[1620px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link to="/" onClick={handleLinkClick} className="flex items-center gap-3 group relative flex-shrink-0">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-indigo-500/30 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-500 group-hover:scale-110">
                                    <picture>
                                        <source srcSet={profileImgWebp} type="image/webp" />
                                        <img src={profileImg} alt="Ubaid Ullah" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    </picture>
                                </div>
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

                        {/* ✅ Desktop Navigation - Fixed Spacing */}
                        <div className="hidden md:flex items-center gap-4 lg:gap-6">
                            {/* Nav Links */}
                            <div className="flex items-center gap-1 lg:gap-2">
                                {navLinks.map((link) => {
                                    const Icon = link.icon;
                                    const isActive = location.pathname === link.path;
                                    return (
                                        <NavLink
                                            key={link.path}
                                            to={link.path}
                                            onClick={handleLinkClick}
                                            className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group whitespace-nowrap ${isActive
                                                    ? "text-indigo-600 dark:text-indigo-400"
                                                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                                                }`}
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                <Icon className={`text-sm transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-indigo-600 dark:text-indigo-400" : ""}`} />
                                                <span className="hidden lg:inline">{link.name}</span>
                                            </span>
                                            {isActive && <span className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg -z-0"></span>}
                                            <span className={`absolute inset-0 rounded-lg -z-0 transition-all duration-300 ${isActive ? "" : "bg-gray-100 dark:bg-gray-800/50 opacity-0 group-hover:opacity-100"}`}></span>
                                            <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ${isActive ? "w-1/2" : "w-0 group-hover:w-1/3"}`}></span>
                                        </NavLink>
                                    );
                                })}
                            </div>

                            {/* ✅ Admin / Logout Section - Fixed Spacing */}
                            <div className="flex items-center gap-2 lg:gap-3 ml-2 pl-3 border-l border-gray-200 dark:border-gray-700">
                                {isAuthenticated ? (
                                    <>
                                        {/* User Info */}
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg whitespace-nowrap">
                                            <FaUserCircle className="text-indigo-600 dark:text-indigo-400" size={16} />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {user?.name || 'Admin'}
                                            </span>
                                        </div>

                                        {/* Dashboard Link */}
                                        <NavLink
                                            to="/admin/dashboard"
                                            onClick={handleLinkClick}
                                            className={({ isActive }) =>
                                                `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${isActive
                                                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                                                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                                                }`
                                            }
                                        >
                                            Dashboard
                                        </NavLink>

                                        {/* Logout Button */}
                                        <button
                                            onClick={handleLogout}
                                            className="px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 flex items-center gap-1 whitespace-nowrap"
                                        >
                                            <FaSignOutAlt size={14} />
                                            <span className="hidden lg:inline">Logout</span>
                                        </button>
                                    </>
                                ) : (
                                    <NavLink
                                        to="/admin/login"
                                        onClick={handleLinkClick}
                                        className={({ isActive }) =>
                                            `px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1 ${isActive
                                                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                                                : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                                            }`
                                        }
                                    >
                                        <FaShieldAlt size={14} />
                                        <span>Admin</span>
                                    </NavLink>
                                )}
                            </div>

                            {/* Theme Toggle */}
                            <div className="flex-shrink-0">
                                <button
                                    onClick={() => dispatch(toggleTheme())}
                                    className="relative p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group overflow-hidden"
                                    aria-label="Toggle theme"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                                    <div className="relative">
                                        {theme === "light" ? (
                                            <FaMoon className="text-gray-700 dark:text-gray-300 group-hover:rotate-12 transition-transform duration-500" size={18} />
                                        ) : (
                                            <FaSun className="text-yellow-500 group-hover:rotate-90 transition-transform duration-500" size={18} />
                                        )}
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Controls */}
                        <div className="flex items-center gap-2 md:hidden">
                            <button onClick={() => dispatch(toggleTheme())} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300" aria-label="Toggle theme">
                                {theme === "light" ? <FaMoon className="text-gray-700" size={16} /> : <FaSun className="text-yellow-500" size={16} />}
                            </button>
                            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300" aria-label="Toggle menu">
                                {isOpen ? <FaTimes className="text-gray-700 dark:text-gray-300" size={20} /> : <FaBars className="text-gray-700 dark:text-gray-300" size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full z-50 transition-all duration-400 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-400 ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsOpen(false)} />
                <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-400 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <Link to="/" onClick={handleLinkClick} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500">
                                <picture><source srcSet={profileImgWebp} type="image/webp" /><img src={profileImg} alt="Ubaid Ullah" className="w-full h-full object-cover" /></picture>
                            </div>
                            <div>
                                <div className="flex items-baseline">
                                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">Ubaid</span>
                                    <span className="text-lg font-bold text-gray-800 dark:text-white ml-1">Ullah</span>
                                </div>
                                <div className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500">Front End Developer</div>
                            </div>
                        </Link>
                        <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                            <FaTimes className="text-gray-600 dark:text-gray-300" size={20} />
                        </button>
                    </div>

                    {/* Drawer Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-1">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const isActive = location.pathname === link.path;
                                return (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        onClick={handleLinkClick}
                                        className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                                ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-400 shadow-lg shadow-indigo-500/10"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                                            }`}
                                    >
                                        <Icon className={`text-lg ${isActive ? "text-indigo-600 dark:text-indigo-400" : ""}`} />
                                        <span>{link.name}</span>
                                        {isActive && <span className="ml-auto text-xs text-indigo-600 dark:text-indigo-400"><FaCode /></span>}
                                    </NavLink>
                                );
                            })}

                            {/* ✅ Mobile Admin / Logout */}
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                {isAuthenticated ? (
                                    <>
                                        <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                            <FaUserCircle className="text-indigo-600" />
                                            <span className="font-medium text-gray-700 dark:text-gray-300">{user?.name || 'Admin'}</span>
                                        </div>
                                        <NavLink
                                            to="/admin/dashboard"
                                            onClick={handleLinkClick}
                                            className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300"
                                        >
                                            <FaShieldAlt className="text-lg" />
                                            <span>Dashboard</span>
                                        </NavLink>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                                        >
                                            <FaSignOutAlt className="text-lg" />
                                            <span>Logout</span>
                                        </button>
                                    </>
                                ) : (
                                    <NavLink
                                        to="/admin/login"
                                        onClick={handleLinkClick}
                                        className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300"
                                    >
                                        <FaShieldAlt className="text-lg" />
                                        <span>Admin Login</span>
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-4 px-4">
                                Connect With Me
                            </p>
                            <div className="flex flex-wrap gap-3 px-4">
                                {socialLinks.github && (
                                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
                                        <FaGithub className="text-gray-700 dark:text-gray-300" size={18} />
                                    </a>
                                )}
                                {socialLinks.linkedin && (
                                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
                                        <FaLinkedin className="text-gray-700 dark:text-gray-300" size={18} />
                                    </a>
                                )}
                                {socialLinks.twitter && (
                                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
                                        <FaTwitter className="text-gray-700 dark:text-gray-300" size={18} />
                                    </a>
                                )}
                                {socialLinks.youtube && (
                                    <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
                                        <FaYoutube className="text-gray-700 dark:text-gray-300" size={18} />
                                    </a>
                                )}
                                {socialLinks.instagram && (
                                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
                                        <FaInstagram className="text-gray-700 dark:text-gray-300" size={18} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 px-4">
                            <p className="text-xs text-center text-gray-400 dark:text-gray-500">© {new Date().getFullYear()} Ubaid Ullah. All rights reserved.</p>
                        </div>
                    </nav>
                </div>
            </div>

            <div className="h-16 md:h-20"></div>
        </>
    );
};

export default Navbar;