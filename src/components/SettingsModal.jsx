import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, User, Globe, Moon, Sun, Check, Camera,
    Mail, ChevronDown, Palette, Save, LogOut
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const SettingsModal = ({ isOpen, onClose }) => {
    const { isDark, toggleTheme } = useTheme();
    const { lang, setLanguage, t } = useLanguage();
    const { user, isAuthenticated, updateProfile, logout } = useAuth();

    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (user?.displayName) setDisplayName(user.displayName);
    }, [user]);

    const handleSaveName = () => {
        if (displayName.trim()) {
            updateProfile({ displayName: displayName.trim() });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }
    };

    const languages = [
        { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
        { code: 'ru', label: 'Русский', flag: '🇷🇺' },
        { code: 'en', label: 'English', flag: '🇬🇧' },
    ];

    const tabs = [
        { id: 'profile', icon: User, label: t('settings_profile') },
        { id: 'language', icon: Globe, label: t('settings_language') },
        { id: 'theme', icon: Palette, label: t('settings_theme') },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)' }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.85, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.85, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Decorative gradient */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent" />

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <h2 className="text-xl font-black text-slate-800 dark:text-white">{t('settings_title')}</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                                    {user?.email || 'Guest'}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-brand-primary"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Tab bar */}
                        <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 pt-4 gap-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all mb-[-1px] border-b-2 ${
                                        activeTab === tab.id
                                            ? 'border-brand-primary text-brand-primary bg-brand-primary/5'
                                            : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                                >
                                    <tab.icon size={16} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-6 min-h-[280px]">
                            <AnimatePresence mode="wait">

                                {/* Profile Tab */}
                                {activeTab === 'profile' && (
                                    <motion.div
                                        key="profile"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-5"
                                    >
                                        {/* Avatar */}
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center shadow-lg shadow-brand-primary/30 text-3xl font-black text-white">
                                                    {(user?.displayName || user?.email || 'G')[0].toUpperCase()}
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 dark:text-white text-lg">
                                                    {user?.displayName || user?.email?.split('@')[0] || 'Foydalanuvchi'}
                                                </p>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{user?.email}</p>
                                            </div>
                                        </div>

                                        {/* Name input */}
                                        <div>
                                            <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2">
                                                    {t('settings_display_name')}
                                                </label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={displayName}
                                                        onChange={e => setDisplayName(e.target.value)}
                                                        onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                                                        placeholder={t('settings_display_name_placeholder')}
                                                        className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white dark:focus:bg-slate-750 transition-all font-medium"
                                                    />
                                                    <motion.button
                                                        onClick={handleSaveName}
                                                        whileTap={{ scale: 0.95 }}
                                                        className={`px-4 py-3 rounded-xl font-black text-sm text-white transition-all shadow-md flex items-center gap-2 ${
                                                            saved
                                                                ? 'bg-green-500 shadow-green-400/30'
                                                                : 'bg-gradient-to-r from-brand-primary to-brand-accent shadow-brand-primary/30 hover:shadow-lg'
                                                        }`}
                                                    >
                                                        {saved ? <><Check size={16} /> {t('settings_saved')}</> : <><Save size={16} /> {t('settings_save')}</>}
                                                    </motion.button>
                                                </div>
                                            </div>

                                        {/* Account info */}
                                        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 space-y-2">
                                            <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('settings_account')}</p>
                                            <div className="flex items-center gap-3">
                                                <Mail size={16} className="text-brand-primary" />
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{user?.email || '—'}</span>
                                            </div>
                                        </div>

                                        {isAuthenticated && (
                                            <button
                                                onClick={() => { logout(); onClose(); }}
                                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold text-sm transition-all"
                                            >
                                                <LogOut size={16} />
                                                {t('nav_logout')}
                                            </button>
                                        )}
                                    </motion.div>
                                )}

                                {/* Language Tab */}
                                {activeTab === 'language' && (
                                    <motion.div
                                        key="language"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-3"
                                    >
                                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4">{t('settings_language')}</p>
                                        {languages.map(language => (
                                            <motion.button
                                                key={language.code}
                                                onClick={() => setLanguage(language.code)}
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                                                    lang === language.code
                                                        ? 'border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10'
                                                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">{language.flag}</span>
                                                    <span className={`font-black ${lang === language.code ? 'text-brand-primary' : 'text-slate-700 dark:text-slate-300'}`}>
                                                        {language.label}
                                                    </span>
                                                </div>
                                                {lang === language.code && (
                                                    <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center">
                                                        <Check size={14} className="text-white" />
                                                    </div>
                                                )}
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}

                                {/* Theme Tab */}
                                {activeTab === 'theme' && (
                                    <motion.div
                                        key="theme"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="space-y-4"
                                    >
                                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4">{t('settings_theme')}</p>

                                        {/* Theme toggle cards */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <motion.button
                                                onClick={() => !isDark && toggleTheme()}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.97 }}
                                                className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                                                    isDark
                                                        ? 'border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10'
                                                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-slate-300'
                                                }`}
                                            >
                                                {/* Dark preview */}
                                                <div className="w-full h-16 rounded-xl bg-slate-900 flex items-center justify-center shadow-inner">
                                                    <Moon size={24} className="text-brand-accent" />
                                                </div>
                                                <div className="text-center">
                                                    <p className={`font-black text-sm ${isDark ? 'text-brand-primary' : 'text-slate-600 dark:text-slate-400'}`}>
                                                        {t('settings_dark_mode')}
                                                    </p>
                                                </div>
                                                {isDark && (
                                                    <div className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center">
                                                        <Check size={12} className="text-white" />
                                                    </div>
                                                )}
                                            </motion.button>

                                            <motion.button
                                                onClick={() => isDark && toggleTheme()}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.97 }}
                                                className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                                                    !isDark
                                                        ? 'border-brand-primary bg-brand-primary/5'
                                                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-slate-300'
                                                }`}
                                            >
                                                {/* Light preview */}
                                                <div className="w-full h-16 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center shadow-inner">
                                                    <Sun size={24} className="text-yellow-500" />
                                                </div>
                                                <div className="text-center">
                                                    <p className={`font-black text-sm ${!isDark ? 'text-brand-primary' : 'text-slate-600 dark:text-slate-400'}`}>
                                                        {t('settings_light_mode')}
                                                    </p>
                                                </div>
                                                {!isDark && (
                                                    <div className="w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center">
                                                        <Check size={12} className="text-white" />
                                                    </div>
                                                )}
                                            </motion.button>
                                        </div>

                                        {/* Quick toggle */}
                                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                            <div className="flex items-center gap-3">
                                                {isDark ? <Moon size={18} className="text-brand-accent" /> : <Sun size={18} className="text-yellow-500" />}
                                                <span className="font-bold text-slate-700 dark:text-slate-300">
                                                    {isDark ? t('settings_dark_mode') : t('settings_light_mode')}
                                                </span>
                                            </div>
                                            <motion.button
                                                onClick={toggleTheme}
                                                className={`relative w-14 h-7 rounded-full transition-colors shadow-inner ${isDark ? 'bg-brand-primary' : 'bg-slate-200'}`}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <motion.div
                                                    className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                                                    animate={{ left: isDark ? '30px' : '4px' }}
                                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}

                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SettingsModal;
