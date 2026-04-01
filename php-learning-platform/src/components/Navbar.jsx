import React, { useState } from 'react';
import { BookOpen, Terminal, MessageSquare, User, LogOut, ChevronDown, Award, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import AuthModal from './AuthModal';

const Navbar = () => {
    const { isAuthenticated, user, login, logout } = useAuth();
    const { hasCertificate } = useProgress();
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
        { to: '/courses', icon: <BookOpen size={18} />, text: 'Darslar' },
        { to: '/playground', icon: <Terminal size={18} />, text: 'Kod Yozish' },
        { to: '/ai-chat', icon: <MessageSquare size={18} />, text: 'AI Yordamchi' },
    ];

    return (
        <>
            <nav className="fixed w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="p-2 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-lg group-hover:scale-110 transition-transform duration-300">
                                <Terminal className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                PHPMaster
                            </span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    icon={link.icon}
                                    text={link.text}
                                    isActive={location.pathname === link.to}
                                />
                            ))}
                        </div>

                        {/* Desktop Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            {!isAuthenticated ? (
                                <>
                                    <button
                                        onClick={handleLogin}
                                        className="px-5 py-2 rounded-full border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300"
                                    >
                                        Kirish
                                    </button>
                                    <button
                                        onClick={handleLogin}
                                        className="px-5 py-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/50 transition-all duration-300 hover:scale-105"
                                    >
                                        Boshlash
                                    </button>
                                </>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1e293b] border border-white/10 hover:border-brand-primary/50 transition-all"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
                                            <User size={16} className="text-white" />
                                        </div>
                                        <span className="text-sm text-gray-300 max-w-[150px] truncate">
                                            {user?.email}
                                        </span>
                                        <ChevronDown size={16} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {showUserMenu && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-2 w-48 bg-[#1e293b] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
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

                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
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
                            className="md:hidden border-t border-white/10 bg-[#0b1120]/95 backdrop-blur-lg overflow-hidden"
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

const NavLink = ({ to, icon, text, isActive }) => (
    <Link
        to={to}
        className={`relative flex items-center space-x-1.5 pb-1 transition-colors duration-200 group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
    >
        {icon}
        <span className="text-sm font-medium">{text}</span>
        <span
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary rounded-full transition-all duration-300 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100'
                }`}
        />
    </Link>
);

export default Navbar;
