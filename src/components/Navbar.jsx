import React, { useState } from 'react';
import { BookOpen, Terminal, MessageSquare, User, LogOut, ChevronDown, Award, Menu, X, Home } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useSidebar } from '../context/SidebarContext';
import AuthModal from './AuthModal';

const Navbar = () => {
    const { isAuthenticated, user, login, logout } = useAuth();
    const { hasCertificate } = useProgress();
    const { collapsed, toggleCollapsed } = useSidebar();
    const [showAuthModal, setShowAuthModal] = useState(false);
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
        { to: '/', icon: <Home size={20} />, text: 'Bosh sahifa' },
        { to: '/courses', icon: <BookOpen size={20} />, text: 'Darslar' },
        { to: '/playground', icon: <Terminal size={20} />, text: 'Kod Yozish' },
        { to: '/ai-chat', icon: <MessageSquare size={20} />, text: 'AI Yordamchi' },
    ];

    return (
        <>
            {/* Desktop Vertical Sidebar */}
            <nav className={`hidden md:flex fixed left-0 top-0 h-full z-50 flex-col bg-[#0b1120]/95 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ${collapsed ? 'w-[70px]' : 'w-[220px]'}`}>
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 group px-4 py-5 border-b border-white/10">
                    <div className="p-2 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Terminal className="h-5 w-5 text-white" />
                    </div>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 whitespace-nowrap"
                        >
                            PHPMaster
                        </motion.span>
                    )}
                </Link>

                {/* Collapse Toggle */}
                <button
                    onClick={() => toggleCollapsed()}
                    className="absolute top-5 -right-3 w-6 h-6 bg-[#1e293b] border border-white/10 rounded-full flex items-center justify-center hover:bg-brand-primary/20 hover:border-brand-primary/50 transition-all z-10"
                    title={collapsed ? "Kengaytirish" : "Yig'ish"}
                >
                    <ChevronDown size={12} className={`text-gray-400 transition-transform duration-300 ${collapsed ? '-rotate-90' : 'rotate-90'}`} />
                </button>

                {/* Nav Links */}
                <div className="flex-1 flex flex-col py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                                location.pathname === link.to
                                    ? 'bg-brand-primary/15 text-white border border-brand-primary/30 shadow-lg shadow-brand-primary/10'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                            title={collapsed ? link.text : ''}
                        >
                            {/* Active indicator */}
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
                                    className="text-sm font-medium whitespace-nowrap"
                                >
                                    {link.text}
                                </motion.span>
                            )}
                        </Link>
                    ))}
                </div>

                {/* User / Auth Section */}
                <div className="px-3 py-4 border-t border-white/10">
                    {!isAuthenticated ? (
                        <button
                            onClick={handleLogin}
                            className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-medium text-sm hover:shadow-lg hover:shadow-brand-primary/30 transition-all hover:scale-[1.02] ${collapsed ? 'px-2' : 'px-4'}`}
                        >
                            <User size={18} />
                            {!collapsed && <span>Kirish</span>}
                        </button>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className={`w-full flex items-center space-x-2 py-2.5 rounded-xl bg-[#1e293b] border border-white/10 hover:border-brand-primary/50 transition-all ${collapsed ? 'justify-center px-2' : 'px-3'}`}
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center flex-shrink-0">
                                    <User size={14} className="text-white" />
                                </div>
                                {!collapsed && (
                                    <>
                                        <span className="text-xs text-gray-300 truncate flex-1 text-left">
                                            {user?.email}
                                        </span>
                                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
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
                                        className={`absolute bottom-full mb-2 w-48 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl overflow-hidden ${collapsed ? 'left-full ml-2' : 'left-0'}`}
                                    >
                                        <div className="p-3 border-b border-white/10">
                                            <p className="text-xs text-gray-500">Sizning accountingiz</p>
                                            <p className="text-sm text-white truncate">{user?.email}</p>
                                        </div>

                                        {hasCertificate && hasCertificate() && (
                                            <Link
                                                to="/certificate"
                                                onClick={() => setShowUserMenu(false)}
                                                className="w-full px-4 py-3 flex items-center space-x-2 text-yellow-400 hover:bg-yellow-500/10 transition-colors border-b border-white/10"
                                            >
                                                <Award size={16} />
                                                <span>Sertifikat</span>
                                            </Link>
                                        )}

                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-3 flex items-center space-x-2 text-red-400 hover:bg-red-500/10 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            <span>Chiqish</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Top Bar */}
            <nav className="md:hidden fixed w-full top-0 z-50 bg-[#0b1120]/95 backdrop-blur-xl border-b border-white/10">
                <div className="flex items-center justify-between h-14 px-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="p-1.5 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-lg">
                            <Terminal className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            PHPMaster
                        </span>
                    </Link>
                    <button
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border-t border-white/10 bg-[#0b1120]/95 backdrop-blur-lg overflow-hidden"
                        >
                            <div className="px-4 py-4 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${location.pathname === link.to
                                                ? 'bg-brand-primary/15 text-white border border-brand-primary/30'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {link.icon}
                                        <span className="font-medium">{link.text}</span>
                                    </Link>
                                ))}

                                <div className="pt-3 border-t border-white/10 mt-3">
                                    {!isAuthenticated ? (
                                        <button
                                            onClick={handleLogin}
                                            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold"
                                        >
                                            Kirish / Ro'yxatdan O'tish
                                        </button>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="px-4 py-2 bg-[#1e293b] rounded-xl">
                                                <p className="text-xs text-gray-500">Logged in as</p>
                                                <p className="text-sm text-white truncate">{user?.email}</p>
                                            </div>
                                            {hasCertificate && hasCertificate() && (
                                                <Link
                                                    to="/certificate"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="flex items-center space-x-2 px-4 py-3 rounded-xl text-yellow-400 hover:bg-yellow-500/10 transition-colors"
                                                >
                                                    <Award size={16} />
                                                    <span>Sertifikat</span>
                                                </Link>
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center space-x-2 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                                            >
                                                <LogOut size={16} />
                                                <span>Chiqish</span>
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
        </>
    );
};

export default Navbar;
