import React, { useState } from 'react';
import { BookOpen, Terminal, MessageSquare, User, LogOut, ChevronDown, Award, Menu, X, Home, Settings, Moon, Sun } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useSidebar } from '../context/SidebarContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import AuthModal from './AuthModal';
import SettingsModal from './SettingsModal';

const Navbar = () => {
    const { isAuthenticated, user, login, logout } = useAuth();
    const { hasCertificate } = useProgress();
    const { collapsed, toggleCollapsed } = useSidebar();
    const { isDark, toggleTheme } = useTheme();
    const { t } = useLanguage();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = () => {
        setShowAuthModal(true);
        setMobileMenuOpen(false);
    };

    const handleAuthSuccess = (email) => {
        login(email);
        navigate('/courses');
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        setMobileMenuOpen(false);
        navigate('/');
    };

    const navLinks = [
        { to: '/', icon: <Home size={20} />, textKey: 'nav_home' },
        { to: '/courses', icon: <BookOpen size={20} />, textKey: 'nav_courses' },
        { to: '/playground', icon: <Terminal size={20} />, textKey: 'nav_playground' },
        { to: '/ai-chat', icon: <MessageSquare size={20} />, textKey: 'nav_ai' },
    ];

    return (
        <>
            {/* Desktop Vertical Sidebar */}
            <nav className={`hidden md:flex fixed left-0 top-0 h-full z-50 flex-col bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-r border-slate-200 dark:border-slate-700 shadow-xl shadow-brand-primary/5 transition-all duration-300 ${collapsed ? 'w-[70px]' : 'w-[220px]'}`}>
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 group px-4 py-5 border-b border-slate-200 dark:border-slate-700">
                    <div className="p-2 bg-gradient-to-tr from-brand-primary to-brand-accent rounded-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 shadow-lg shadow-brand-primary/20">
                        <Terminal className="h-5 w-5 text-white" />
                    </div>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent whitespace-nowrap"
                        >
                            PHPMaster
                        </motion.span>
                    )}
                </Link>

                {/* Collapse Toggle */}
                <button
                    onClick={() => toggleCollapsed()}
                    className="absolute top-5 -right-3 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-md rounded-full flex items-center justify-center hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 hover:border-brand-primary/50 transition-all z-10"
                    title={collapsed ? "Kengaytirish" : "Yig'ish"}
                >
                    <ChevronDown size={12} className={`text-slate-500 dark:text-slate-400 transition-transform duration-300 ${collapsed ? '-rotate-90' : 'rotate-90'}`} />
                </button>

                {/* Nav Links */}
                <div className="flex-1 flex flex-col py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                                location.pathname === link.to
                                    ? 'bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary border border-brand-primary/20 shadow-md shadow-brand-primary/5'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10'
                            }`}
                            title={collapsed ? t(link.textKey) : ''}
                        >
                            {location.pathname === link.to && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-primary rounded-r-full"
                                    style={{ left: '-12px' }}
                                />
                            )}
                            <span className="flex-shrink-0">{link.icon}</span>
                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-sm font-semibold whitespace-nowrap"
                                >
                                    {t(link.textKey)}
                                </motion.span>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Bottom section: Theme toggle + Settings + User */}
                <div className="px-3 py-4 border-t border-slate-200 dark:border-slate-700 space-y-2">

                    {/* Quick theme toggle */}
                    <button
                        onClick={toggleTheme}
                        title={isDark ? 'Kunduzgi rejim' : 'Tungi rejim'}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all ${collapsed ? 'justify-center' : ''} text-slate-500 dark:text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10`}
                    >
                        <span className="flex-shrink-0">
                            {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
                        </span>
                        {!collapsed && (
                            <span className="text-sm font-semibold whitespace-nowrap">
                                {isDark ? 'Yorug\' rejim' : 'Tungi rejim'}
                            </span>
                        )}
                    </button>

                    {/* Settings button */}
                    <button
                        onClick={() => setShowSettingsModal(true)}
                        title={t('nav_settings')}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all ${collapsed ? 'justify-center' : ''} text-slate-500 dark:text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10`}
                    >
                        <Settings size={18} className="flex-shrink-0" />
                        {!collapsed && (
                            <span className="text-sm font-semibold whitespace-nowrap">{t('nav_settings')}</span>
                        )}
                    </button>

                    {/* User / Auth */}
                    {!isAuthenticated ? (
                        <button
                            onClick={handleLogin}
                            className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold text-sm shadow-md hover:shadow-lg hover:shadow-brand-primary/30 transition-all hover:-translate-y-0.5 ${collapsed ? 'px-2' : 'px-4'}`}
                        >
                            <User size={18} />
                            {!collapsed && <span>{t('nav_login')}</span>}
                        </button>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className={`w-full flex items-center space-x-2 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-sm hover:border-brand-primary/50 transition-all ${collapsed ? 'justify-center px-2' : 'px-3'}`}
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent flex items-center justify-center flex-shrink-0 shadow-inner text-white font-black text-sm">
                                    {(user?.displayName || user?.email || 'G')[0].toUpperCase()}
                                </div>
                                {!collapsed && (
                                    <>
                                        <span className="text-xs text-slate-700 dark:text-slate-300 truncate flex-1 text-left font-bold">
                                            {user?.displayName || user?.email?.split('@')[0]}
                                        </span>
                                        <ChevronDown size={14} className={`text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                                    </>
                                )}
                            </button>

                            <AnimatePresence>
                                {showUserMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className={`absolute bottom-full mb-2 w-52 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden ${collapsed ? 'left-full ml-2' : 'left-0'}`}
                                    >
                                        <div className="p-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sizning accountingiz</p>
                                            <p className="text-sm text-slate-800 dark:text-white truncate font-black">{user?.displayName || user?.email?.split('@')[0]}</p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                                        </div>

                                        <button
                                            onClick={() => { setShowUserMenu(false); setShowSettingsModal(true); }}
                                            className="w-full px-4 py-3 flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 hover:text-brand-primary transition-colors font-medium border-b border-slate-100 dark:border-slate-700"
                                        >
                                            <Settings size={16} />
                                            <span>{t('nav_settings')}</span>
                                        </button>

                                        {hasCertificate && hasCertificate() && (
                                            <Link
                                                to="/certificate"
                                                onClick={() => setShowUserMenu(false)}
                                                className="w-full px-4 py-3 flex items-center space-x-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors border-b border-slate-100 dark:border-slate-700 font-medium"
                                            >
                                                <Award size={16} />
                                                <span>Sertifikat</span>
                                            </Link>
                                        )}

                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-3 flex items-center space-x-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
                                        >
                                            <LogOut size={16} />
                                            <span>{t('nav_logout')}</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Top Bar */}
            <nav className="md:hidden fixed w-full top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center justify-between h-14 px-4">
                    <Link to="/" className="flex items-center space-x-2">
                         <div className="p-1.5 bg-gradient-to-tr from-brand-primary to-brand-accent rounded-lg shadow-md hover:scale-105 transition-transform">
                            <Terminal className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent">
                            PHPMaster
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        {/* Mobile theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
                        >
                            {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
                        </button>
                        {/* Mobile settings */}
                        <button
                            onClick={() => setShowSettingsModal(true)}
                            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
                        >
                            <Settings size={20} />
                        </button>
                        <button
                            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl overflow-hidden shadow-2xl"
                        >
                            <div className="px-4 py-4 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${location.pathname === link.to
                                                ? 'bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary border border-brand-primary/20 shadow-sm'
                                                : 'text-slate-600 dark:text-slate-400 hover:text-brand-primary hover:bg-brand-primary/5'
                                            }`}
                                    >
                                        {link.icon}
                                        <span className="font-semibold">{t(link.textKey)}</span>
                                    </Link>
                                ))}

                                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 mt-4">
                                    {!isAuthenticated ? (
                                        <button
                                            onClick={handleLogin}
                                            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold shadow-md hover:shadow-lg transition-shadow"
                                        >
                                            {t('auth_login')} / {t('auth_register')}
                                        </button>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Accountingiz</p>
                                                <p className="text-sm text-slate-800 dark:text-white truncate font-black">{user?.displayName || user?.email?.split('@')[0]}</p>
                                            </div>
                                            <button
                                                onClick={() => { setMobileMenuOpen(false); setShowSettingsModal(true); }}
                                                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary font-bold"
                                            >
                                                <Settings size={16} />
                                                <span>{t('nav_settings')}</span>
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 transition-colors font-bold"
                                            >
                                                <LogOut size={16} />
                                                <span>{t('nav_logout')}</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={handleAuthSuccess}
            />

            {/* Settings Modal */}
            <SettingsModal
                isOpen={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
            />
        </>
    );
};

export default Navbar;
