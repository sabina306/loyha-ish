import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Zap, Sparkles, Star, Rocket, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Hero = () => {
    const navigate = useNavigate();
    const { isAuthenticated, login } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleStartLearning = () => {
        navigate('/courses');
    };

    const handleAuthSuccess = (email) => {
        login(email);
        navigate('/courses');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="relative min-h-[calc(100vh-56px)] md:min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 45, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        rotate: [0, -45, 0],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-[120px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">

                {/* Text Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center px-4 py-2 rounded-full border border-brand-primary/30 bg-white dark:bg-slate-800 shadow-xl shadow-brand-primary/10 text-brand-primary mb-8"
                    >
                        <Sparkles size={16} className="mr-2 animate-pulse text-brand-accent" />
                        <span className="text-sm font-bold tracking-wide uppercase">Yangi Vizual Tajriba</span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-8xl font-black leading-[1.1] mb-8 tracking-tighter text-slate-900 dark:text-white"
                    >
                        Kodlashni <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary animate-gradient-x drop-shadow-sm">
                            San'atga
                        </span> <br />
                        Aylantiring
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed font-medium"
                    >
                        Zamonaviy texnologiyalar va sun'iy intellekt yordamida PHP ni professional darajada o'rganing. Kelajak dasturchilari aynan shu yerdan boshlaydi.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-5"
                    >
                        <button
                            onClick={handleStartLearning}
                            className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-black text-lg shadow-xl shadow-brand-primary/30 hover:shadow-2xl hover:-translate-y-1 hover:shadow-brand-primary/40 transition-all flex items-center justify-center overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center">
                                Boshlash
                                <Rocket className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                        </button>

                        <button
                            onClick={() => navigate('/about')}
                            className="px-10 py-5 rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-brand-primary/50 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center group"
                        >
                            Kurs Haqida
                            <Star size={18} className="ml-2 text-amber-500 group-hover:rotate-45 transition-transform" />
                        </button>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-12 flex items-center space-x-8"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-md">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                </div>
                            ))}
                        </div>
                        <div className="text-sm">
                            <p className="text-slate-800 dark:text-slate-200 font-bold">1,200+ O'quvchilar</p>
                            <div className="flex text-amber-500 mt-1">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Visual Content - Interactive Code Window */}
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative perspective-1000 hidden lg:block"
                >
                    <div className="relative group">
                        {/* Glow Effects */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-[32px] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-1000" />

                        {/* Main Code Window */}
                        <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
                            {/* Window Header */}
                            <div className="bg-slate-50/80 dark:bg-slate-900/80 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm" />
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest font-bold">ai_engine.php</div>
                                <div className="w-4 h-4 text-slate-400"><Code size={14} /></div>
                            </div>

                            {/* Code Body */}
                            <div className="p-8 font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-300">
                                <div className="space-y-4">
                                    <div className="flex">
                                        <span className="text-brand-primary">class</span>
                                        <span className="text-amber-500 font-semibold ml-2">FutureDeveloper</span>
                                        <span className="text-slate-500 ml-2">{"{"}</span>
                                    </div>
                                    <div className="pl-6 space-y-2">
                                        <div className="flex">
                                            <span className="text-brand-primary">private</span>
                                            <span className="text-blue-500 ml-2">$skillLevel</span>
                                            <span className="text-slate-400 ml-2">=</span>
                                            <span className="text-emerald-600 ml-2">'Expert'</span>;
                                        </div>
                                        <div className="flex">
                                            <span className="text-brand-primary">public function</span>
                                            <span className="text-amber-500 ml-2">masterPHP</span>
                                            <span className="text-slate-400 ml-2">()</span>
                                            <span className="text-slate-500 ml-2">{"{"}</span>
                                        </div>
                                        <div className="pl-6 flex items-center">
                                            <span className="text-brand-primary">return</span>
                                            <span className="text-emerald-600 ml-2">"Unlock Infinite Potential"</span>;
                                            <motion.div
                                                animate={{ opacity: [1, 0] }}
                                                transition={{ duration: 0.8, repeat: Infinity }}
                                                className="w-2 h-4 bg-brand-primary ml-1"
                                            />
                                        </div>
                                        <div className="text-slate-500">{"}"}</div>
                                    </div>
                                    <div className="text-slate-500">{"}"}</div>
                                </div>

                                {/* AI Analysis Overlay */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.5 }}
                                    className="mt-8 pt-6 border-t border-slate-200 flex items-start space-x-3"
                                >
                                    <div className="p-2 bg-brand-primary/10 rounded-lg">
                                        <Bot size={16} className="text-brand-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[12px] text-slate-600 italic font-medium">"Sintaksis mukammal. OOP tamoyillari asosida yaratilgan. Davom etishga tayyor."</p>
                                        <div className="mt-2 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 2, delay: 2 }}
                                                className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Floating Tech Badges */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute -top-8 -right-8 p-5 bg-white backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl z-20"
                        >
                            <Cpu className="text-brand-primary h-10 w-10 animate-pulse" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                            className="absolute -bottom-8 -left-8 p-4 bg-white backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl z-20"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                    <Zap size={16} className="text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-medium">Server Latency</p>
                                    <p className="text-xs text-slate-800 font-bold">12ms</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={handleAuthSuccess}
            />
        </div>
    );
};

export default Hero;
