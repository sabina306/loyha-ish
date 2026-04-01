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
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/30 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-secondary/20 rounded-full blur-[150px]"
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
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
                        className="inline-flex items-center px-4 py-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent mb-8 shadow-lg shadow-brand-accent/5"
                    >
                        <Sparkles size={16} className="mr-2 animate-pulse" />
                        <span className="text-sm font-bold tracking-wide uppercase">AI-Powered PHP Mastery</span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-8xl font-black leading-[1.1] mb-8 tracking-tighter"
                    >
                        Kodlashni <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent animate-gradient-x">
                            San'atga
                        </span> <br />
                        Aylantiring
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed"
                    >
                        Zamonaviy texnologiyalar va sun'iy intellekt yordamida PHP ni professional darajada o'rganing. Kelajak dasturchilari aynan shu yerdan boshlaydi.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-5"
                    >
                        <button
                            onClick={handleStartLearning}
                            className="group relative px-10 py-5 rounded-2xl bg-white text-brand-dark font-black text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center">
                                Bepul Boshlash
                                <Rocket className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <button
                            onClick={() => navigate('/about')}
                            className="px-10 py-5 rounded-2xl border-2 border-white/10 hover:border-white/30 hover:bg-white/5 transition-all backdrop-blur-md text-white font-bold flex items-center justify-center group"
                        >
                            Kurs Haqida
                            <Star size={18} className="ml-2 text-yellow-500 group-hover:rotate-45 transition-transform" />
                        </button>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-12 flex items-center space-x-8"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-dark bg-[#1e293b] flex items-center justify-center overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                </div>
                            ))}
                        </div>
                        <div className="text-sm">
                            <p className="text-white font-bold">1,200+ O'quvchilar</p>
                            <div className="flex text-yellow-500 mt-1">
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
                        <div className="relative bg-[#0b1120] border border-white/10 rounded-3xl shadow-2xl overflow-hidden transform group-hover:rotate-y-2 group-hover:rotate-x-2 transition-transform duration-700">
                            {/* Window Header */}
                            <div className="bg-[#1e293b]/50 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-lg shadow-red-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-lg shadow-green-500/20" />
                                </div>
                                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">ai_engine.php</div>
                                <div className="w-4 h-4 text-gray-600"><Code size={14} /></div>
                            </div>

                            {/* Code Body */}
                            <div className="p-8 font-mono text-sm leading-relaxed">
                                <div className="space-y-4">
                                    <div className="flex">
                                        <span className="text-pink-500">class</span>
                                        <span className="text-yellow-400 ml-2">FutureDeveloper</span>
                                        <span className="text-white ml-2">{"{"}</span>
                                    </div>
                                    <div className="pl-6 space-y-2">
                                        <div className="flex">
                                            <span className="text-pink-500">private</span>
                                            <span className="text-blue-400 ml-2">$skillLevel</span>
                                            <span className="text-gray-400 ml-2">=</span>
                                            <span className="text-green-400 ml-2">'Expert'</span>;
                                        </div>
                                        <div className="flex">
                                            <span className="text-pink-500">public function</span>
                                            <span className="text-yellow-400 ml-2">masterPHP</span>
                                            <span className="text-gray-400 ml-2">()</span>
                                            <span className="text-white ml-2">{"{"}</span>
                                        </div>
                                        <div className="pl-6 flex items-center">
                                            <span className="text-pink-500">return</span>
                                            <span className="text-green-400 ml-2">"Unlock Infinite Potential"</span>;
                                            <motion.div
                                                animate={{ opacity: [1, 0] }}
                                                transition={{ duration: 0.8, repeat: Infinity }}
                                                className="w-2 h-4 bg-brand-primary ml-1"
                                            />
                                        </div>
                                        <div className="text-white">{"}"}</div>
                                    </div>
                                    <div className="text-white">{"}"}</div>
                                </div>

                                {/* AI Analysis Overlay */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.5 }}
                                    className="mt-8 pt-6 border-t border-white/5 flex items-start space-x-3"
                                >
                                    <div className="p-2 bg-brand-primary/20 rounded-lg">
                                        <Bot size={16} className="text-brand-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[11px] text-gray-400 italic">"Sintaksis mukammal. OOP tamoyillari asosida yaratilgan. Davom etishga tayyor."</p>
                                        <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 2, delay: 2 }}
                                                className="h-full bg-brand-primary"
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
                            className="absolute -top-8 -right-8 p-5 bg-brand-dark/80 backdrop-blur-xl border border-brand-primary/30 rounded-2xl shadow-2xl z-20"
                        >
                            <Cpu className="text-brand-primary h-10 w-10 animate-pulse" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                            className="absolute -bottom-8 -left-8 p-4 bg-brand-dark/80 backdrop-blur-xl border border-brand-secondary/30 rounded-2xl shadow-2xl z-20"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                                    <Zap size={16} className="text-green-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500">Server Latency</p>
                                    <p className="text-xs text-white font-bold">12ms</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-dark to-transparent" />

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
