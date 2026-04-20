import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle, Sparkles, Lock, AlertCircle } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [step, setStep] = useState('input');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!validateEmail(email)) {
            setErrorMessage('Noto\'g\'ri email formati');
            return;
        }

        if (!password || password.length < 6) {
            setErrorMessage('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
            return;
        }

        setStep('verifying');

        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('phpmaster_users') || '{}');

            if (isLogin) {
                if (!users[email]) {
                    setStep('input');
                    setErrorMessage('Bu email ro\'yxatdan o\'tmagan');
                    return;
                }
                if (users[email].password !== password) {
                    setStep('input');
                    setErrorMessage('Noto\'g\'ri parol');
                    return;
                }
            } else {
                if (users[email]) {
                    setStep('input');
                    setErrorMessage('Bu email allaqachon ro\'yxatdan o\'tgan');
                    return;
                }
                if (password !== confirmPassword) {
                    setStep('input');
                    setErrorMessage('Parollar mos kelmadi');
                    return;
                }
                users[email] = {
                    password,
                    registeredAt: new Date().toISOString()
                };
                localStorage.setItem('phpmaster_users', JSON.stringify(users));
            }

            setStep('success');
            setTimeout(() => {
                onSuccess(email);
                onClose();
                setTimeout(() => {
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setStep('input');
                    setIsLogin(true);
                    setErrorMessage('');
                }, 300);
            }, 1500);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -z-10" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-10" />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-brand-primary"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8">
                            {step === 'input' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="p-4 bg-brand-primary/10 rounded-2xl shadow-sm">
                                            <Mail className="text-brand-primary" size={32} />
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-black text-center mb-2 text-slate-800 dark:text-gray-200">
                                        {isLogin ? 'Tizimga kirish' : 'Ro\'yxatdan o\'tish'} 🎉
                                    </h2>
                                    <p className="text-center text-slate-500 dark:text-slate-400 font-medium mb-8">
                                        {isLogin ? 'Email va parolingizni kiriting' : 'Yangi akkaunt yaratish'}
                                    </p>

                                    {errorMessage && (
                                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-2">
                                            <AlertCircle size={16} className="text-red-400" />
                                            <span className="text-red-400 text-sm">{errorMessage}</span>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                                Email manzil
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="sizning@email.com"
                                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white dark:bg-slate-800 dark:focus:bg-slate-750 transition-all shadow-sm"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                                Parol
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="••••••••"
                                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white dark:bg-slate-800 transition-all shadow-sm"
                                                    required
                                                    minLength={6}
                                                />
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Kamida 6 ta belgi</p>
                                        </div>

                                        {!isLogin && (
                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                                    Parolni tasdiqlang
                                                </label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                                                    <input
                                                        type="password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        placeholder="••••••••"
                                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white dark:bg-slate-800 transition-all shadow-sm"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className="w-full py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white font-black rounded-xl hover:shadow-lg hover:shadow-brand-primary/30 transition-all transform hover:-translate-y-0.5 active:scale-95 text-lg"
                                        >
                                            {isLogin ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
                                        </button>
                                    </form>

                                    <div className="mt-6 text-center">
                                        <button
                                            onClick={() => {
                                                setIsLogin(!isLogin);
                                                setErrorMessage('');
                                                setPassword('');
                                                setConfirmPassword('');
                                            }}
                                            className="text-sm text-slate-500 dark:text-slate-400 font-bold hover:text-brand-primary transition-colors"
                                        >
                                            {isLogin ? 'Akkauntingiz yo\'qmi? Ro\'yxatdan o\'ting' : 'Allaqachon akkauntingiz bormi? Kiring'}
                                        </button>
                                    </div>

                                    <p className="text-center text-xs text-slate-400 font-medium mt-6">
                                        Davom etish orqali siz shaxsiy ma'lumotlaringizni saqlashga rozilik bildirasiz
                                    </p>
                                </motion.div>
                            )}

                            {step === 'verifying' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="flex justify-center mb-6">
                                        <div className="relative">
                                            <div className="w-16 h-16 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
                                            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-brand-primary" size={24} />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Tekshirilmoqda...</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">Iltimos, kuting</p>
                                </motion.div>
                            )}

                            {step === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', delay: 0.2 }}
                                        className="flex justify-center mb-6"
                                    >
                                        <div className="p-4 bg-green-50 rounded-full shadow-sm">
                                            <CheckCircle className="text-green-500" size={48} />
                                        </div>
                                    </motion.div>
                                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Muvaffaqiyatli! ✨</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">Platformaga xush kelibsiz</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
