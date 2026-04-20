import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Code, CheckCircle, Lock, MonitorPlay, Layers, Braces, Database, TrendingUp, Star, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

// We will map these "modules" to simply open the main course at different starting points in a real app,
// but for now, they all link to the same course view since we have one big playlist.
const courses = [
    {
        id: 1,
        title: "PHP Asoslari",
        description: "PHP o'rnatish, sintaksis va ilk qadamlar. Dasturlash dunyosiga PHP orqali kirasiz.",
        level: "Boshlang'ich",
        duration: "10 Dars",
        color: "from-blue-500 to-indigo-600",
        shadow: "shadow-blue-500/20",
        icon: <MonitorPlay size={24} />,
        badge: "Yangi",
        students: "420+"
    },
    {
        id: 2,
        title: "Ma'lumot Turlari",
        description: "String, Integer, Array va ularning metodlari. Ma'lumotlar bilan ishlash sirlari.",
        level: "Boshlang'ich",
        duration: "15 Dars",
        color: "from-purple-500 to-fuchsia-600",
        shadow: "shadow-purple-500/20",
        icon: <Code size={24} />,
        badge: "Mashhur",
        students: "850+"
    },
    {
        id: 3,
        title: "Nazorat Tuzilmalari",
        description: "If/Else, Switch, Loop (Tsikllar). Dastur mantiqini boshqarishni o'rganing.",
        level: "O'rta",
        duration: "12 Dars",
        color: "from-pink-500 to-rose-600",
        shadow: "shadow-pink-500/20",
        icon: <Layers size={24} />,
        students: "310+"
    },
    {
        id: 4,
        title: "Funksiyalar va OOP",
        description: "Funksiyalar yaratish va Obyektga Yo'naltirilgan Dasturlash. Professional kod yozing.",
        level: "Yuqori",
        duration: "15 Dars",
        color: "from-orange-500 to-amber-600",
        shadow: "shadow-orange-500/20",
        icon: <Braces size={24} />,
        badge: "Murakkab",
        students: "190+"
    },
    {
        id: 5,
        title: "Ma'lumotlar Bazasi",
        description: "MySQL bilan ishlash va ma'lumotlarni boshqarish. Real loyihalar uchun MB.",
        level: "Yuqori",
        duration: "8 Dars",
        color: "from-emerald-500 to-teal-600",
        shadow: "shadow-emerald-500/20",
        icon: <Database size={24} />,
        students: "150+"
    }
];

const Courses = () => {
    const navigate = useNavigate();
    const { isAuthenticated, login } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleCourseClick = (courseId) => {
        if (isAuthenticated) {
            navigate(`/course/${courseId}`);
        } else {
            setShowAuthModal(true);
        }
    };

    return (
        <div className="pt-8 pb-24 px-4 bg-transparent min-h-screen">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center px-4 py-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-sm"
                    >
                        <Star size={14} className="mr-2 fill-current" />
                        Premium Video Kurs (60 Dars)
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-800 dark:text-white tracking-tight">
                        Bilimingizni <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Keyingi Bosqichga</span> Olib Chiqing
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                        @ilmizla kanali tomonidan maxsus tayyorlangan 60 ta darsdan iborat mukammal video kurs. Nazariya va amaliyot bir joyda.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -12 }}
                            className="group relative"
                        >
                            {/* Glow Backdrop */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl blur-2xl`} />

                            <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-1 overflow-hidden h-full flex flex-col hover:border-brand-primary/30 transition-all hover:shadow-xl hover:shadow-brand-primary/10 group">
                                <div className="p-8 flex-1 flex flex-col bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${course.color} text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                            {course.icon}
                                        </div>
                                        {course.badge && (
                                            <span className="px-3 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm rounded-full text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                                                {course.badge}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white group-hover:text-brand-primary transition-colors">
                                        {course.title}
                                    </h3>

                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                                        {course.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="flex items-center space-x-2 text-slate-500 bg-white dark:bg-slate-700 px-3 py-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-600">
                                            <Clock size={14} className="text-brand-primary"/>
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{course.duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-slate-500 bg-white dark:bg-slate-700 px-3 py-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-600">
                                            <TrendingUp size={14} className="text-brand-secondary"/>
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{course.students}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <button
                                            onClick={() => handleCourseClick(course.id)}
                                            className={`w-full py-4 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 shadow-md bg-gradient-to-r ${course.color} text-white hover:shadow-lg group-hover:scale-[1.02] active:scale-95`}
                                        >
                                            <Play fill="currentColor" size={16} className="mr-2" />
                                            DARSLARNI BOSHLASH
                                        </button>
                                    </div>
                                </div>

                                {/* Hover Stats Overlay */}
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={8} fill="currentColor" className="text-yellow-500" />)}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="lg:col-span-3 mt-12 p-8 rounded-3xl bg-white dark:bg-slate-800 border border-brand-primary/20 dark:border-slate-700 shadow-2xl flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8 backdrop-blur-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -z-10" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -z-10" />
                            
                            <div className="flex items-center space-x-6 z-10">
                                <div className="p-5 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl shadow-lg">
                                    <TrendingUp className="text-white" size={32} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-slate-800 dark:text-white mb-1">Hali ham ikkilanyapsizmi?</h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">60 ta darsni tugatib, xalqaro darajadagi sertifikatga ega bo'ling.</p>
                                </div>
                            </div>
                        {isAuthenticated ? (
                            <Link
                                to="/course/1"
                                className="px-10 py-4 bg-gradient-to-r from-brand-primary to-brand-accent text-white font-black rounded-2xl hover:shadow-lg transition-all shadow-md whitespace-nowrap z-10"
                            >
                                DARSLARNI DAVOM ETTIRISH
                            </Link>
                        ) : (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="px-10 py-4 bg-gradient-to-r from-brand-primary to-brand-accent text-white font-black rounded-2xl hover:shadow-lg transition-all shadow-md whitespace-nowrap z-10"
                            >
                                RO'YXATDAN O'TISH
                            </button>
                        )}
                    </motion.div>
                </div>
            </div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={(email) => {
                    login(email);
                    setShowAuthModal(false);
                    navigate('/courses');
                }}
            />
        </div>
    );
};

export default Courses;
