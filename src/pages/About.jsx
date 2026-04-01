import React from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Cpu, BookOpen, Zap, Award, Users, TrendingUp, Sparkles, CheckCircle } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: BookOpen,
            title: "60+ Video Darslar",
            description: "PHP asoslaridan murakkab mavzulargacha to'liq kurs. Har bir dars professional darajada tayyorlangan.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Code,
            title: "Interaktiv Kod Muharriri",
            description: "Professional kod muharriri bilan real vaqtda kod yozing, tahrirlang va natijalarni darhol ko'ring.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Terminal,
            title: "Real Vaqtda Bajarish",
            description: "Yozgan kodingizni to'g'ridan-to'g'ri platformada ishga tushiring va natijalarni terminalda ko'ring.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Cpu,
            title: "AI Yordamchi",
            description: "Sun'iy intellekt yordamida savollaringizga javob oling, xatolarni toping va yechimlar taklif eting.",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: TrendingUp,
            title: "Progress Tracking",
            description: "O'z muvaffaqiyatingizni kuzatib boring. Har bir modul bo'yicha o'sishingizni ko'ring.",
            color: "from-indigo-500 to-purple-500"
        },
        {
            icon: Award,
            title: "Certificates",
            description: "Kursni muvaffaqiyatli tugatganingizdan so'ng professional sertifikat oling.",
            color: "from-yellow-500 to-orange-500"
        }
    ];

    const stats = [
        { value: "60+", label: "Video Darslar" },
        { value: "5", label: "Modullar" },
        { value: "24/7", label: "AI Yordamchi" },
        { value: "100%", label: "Bepul" }
    ];

    return (
        <div className="min-h-screen bg-brand-dark pt-4 pb-16">
            {/* Hero Section */}
            <div className="relative overflow-hidden py-20">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center px-4 py-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent mb-6">
                            <Sparkles size={16} className="mr-2" />
                            <span className="text-sm font-medium">Platforma haqida</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                            Kelajakni Bugun <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
                                O'rganing
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            PHPMaster - bu zamonaviy texnologiyalar va sun'iy intellekt yordamida PHP dasturlashni o'rganish platformasi.
                            Biz sizga eng yaxshi ta'lim tajribasini taqdim etamiz.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-[#1e293b] border border-white/10 rounded-2xl p-6 text-center">
                                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="group relative bg-[#1e293b] border border-white/10 rounded-2xl p-8 hover:border-brand-primary/50 transition-all duration-300 overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />

                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 mb-6`}>
                                    <feature.icon className="text-white" size={28} />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Why Choose Us */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-20 bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 rounded-3xl p-12"
                    >
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">
                            Nima uchun bizni tanlaysiz?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                "Professional darajadagi video darslar",
                                "Real loyihalarda ishlash tajribasi",
                                "24/7 AI yordamchi bilan qo'llab-quvvatlash",
                                "Zamonaviy va interaktiv ta'lim usullari",
                                "Eng so'nggi PHP standartlari va best practices",
                                "Hamjamiyat va mentorlik dasturlari"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                                    <span className="text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
