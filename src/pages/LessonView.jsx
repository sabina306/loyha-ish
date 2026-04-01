import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, PlayCircle, FileText, CheckCircle, Lock, Layout, Volume2, Settings, Maximize, Code, Play, RotateCcw, Terminal } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import AIChat from '../components/AIChat';
import CertificateNameModal from '../components/CertificateNameModal';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';

import { phpCourseData } from '../data/courseData';

// Real YouTube Video IDs from @ilmizla channel (PHP Darslari)
// Playlist: https://www.youtube.com/watch?v=yEg7b4tgSMk&list=PL... (Assuming IDs based on typical structure)

const LessonView = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated, login } = useAuth();
    const { isLessonCompleted, isLessonAccessible, markLessonComplete, getProgressPercentage } = useProgress();
    const [activeTab, setActiveTab] = useState('code');
    const [code, setCode] = useState('<?php\n\n// Kodingizni shu yerga yozing\n\n?>');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showCertificateNameModal, setShowCertificateNameModal] = useState(false);


    const handleRun = () => {
        setIsRunning(true);
        setOutput(''); // Clear previous output

        // Simulating server execution time
        setTimeout(() => {
            // Simple mock output generator based on code content
            let mockOutput = "";
            if (code.includes("echo")) {
                // Extract rudimentary strings (very basic parsing for demo)
                const echoMatches = code.match(/echo\s+['"](.+?)['"]/g);
                if (echoMatches) {
                    mockOutput = echoMatches.map(m => m.replace(/echo\s+['"]|['"]/g, '')).join('\n');
                } else if (code.includes("Salom")) {
                    mockOutput = "Salom, Dunyo!\nMen Dasturchi man!";
                } else {
                    mockOutput = "Kod muvaffaqiyatli ishga tushdi (Simulyatsiya).\nNatija: 1";
                }
            } else {
                mockOutput = "Kod bajarildi. Ekranga hech narsa chiqmadi.";
            }

            setOutput(mockOutput);
            setIsRunning(false);
        }, 800);
    };

    // Map "courseId" (which are actually modules) to their starting lesson index
    // 1: Asoslar (Lesson 1, index 0)
    // 2: Ma'lumot Turlari (Lesson 5, index 4)
    // 3: Nazorat Tuzilmalari (Lesson 10, index 9)
    // 4: Funksiyalar va OOP (Lesson 17, index 16)
    // 5: Ma'lumotlar Bazasi (Lesson 59, index 58)
    const startingLessons = {
        '1': 0,
        '2': 4,
        '3': 9,
        '4': 16,
        '5': 58
    };

    const initialIndex = startingLessons[courseId] || 0;
    const [currentLessonIndex, setCurrentLessonIndex] = useState(initialIndex);


    // Update lesson index if courseId changes
    useEffect(() => {
        const newIndex = startingLessons[courseId];
        if (newIndex !== undefined) {
            setCurrentLessonIndex(newIndex);
        }
    }, [courseId]);

    // For this demo, we treat the single big course as "courseId 1" or just use it directly.
    const course = phpCourseData;
    const currentLesson = course.lessons[currentLessonIndex];

    // Handle certificate name submission
    const handleCertificateNameSubmit = (fullName) => {
        // Store the certificate name in localStorage
        if (user?.email) {
            const certificateKey = `phpmaster_certificate_${user.email}`;
            localStorage.setItem(certificateKey, JSON.stringify({
                fullName,
                issuedDate: new Date().toISOString(),
                courseCompleted: 'PHP Dasturlash Tili - To\'liq Kurs'
            }));
        }

        // Close modal and navigate to certificate page
        setShowCertificateNameModal(false);
        navigate('/certificate');
    };

    return (
        <div className="flex h-screen bg-brand-dark overflow-hidden">
            {/* Sidebar - Lesson List */}
            <div className="w-80 bg-[#0f172a] border-r border-white/10 flex flex-col z-20 hidden md:flex">
                <div className="p-6 border-b border-white/10">
                    <button onClick={() => navigate('/courses')} className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors group">
                        <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                        Kurslarga qaytish
                    </button>

                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        {course.title}
                    </h2>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-1">{course.description}</p>

                    <div className="mt-6">
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                            <span>{course.lessons.filter((l) => isLessonCompleted(l.id)).length}/{course.lessons.length} dars tugatildi</span>
                            <span className="text-brand-primary font-bold">
                                {course.lessons.length > 0
                                    ? Math.round((course.lessons.filter((l) => isLessonCompleted(l.id)).length / course.lessons.length) * 100)
                                    : 0}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-brand-primary to-brand-secondary h-full transition-all duration-700 ease-out rounded-full"
                                style={{ width: `${course.lessons.length > 0 ? (course.lessons.filter((l) => isLessonCompleted(l.id)).length / course.lessons.length) * 100 : 0}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {course.lessons.map((lesson, index) => {
                        const isAccessible = isLessonAccessible(lesson.id);
                        const isCompleted = isLessonCompleted(lesson.id);
                        const isActive = index === currentLessonIndex;

                        return (
                            <button
                                key={lesson.id}
                                onClick={() => isAccessible && setCurrentLessonIndex(index)}
                                disabled={!isAccessible}
                                className={`w-full text-left p-4 flex items-center transition-all border-l-2 ${isActive
                                    ? 'bg-brand-primary/10 border-brand-primary'
                                    : isAccessible
                                        ? 'border-transparent hover:bg-white/5'
                                        : 'border-transparent opacity-50 cursor-not-allowed'
                                    }`}
                            >
                                <div className="mr-3">
                                    {!isAccessible ? (
                                        <Lock size={18} className="text-gray-600" />
                                    ) : isCompleted ? (
                                        <CheckCircle size={18} className="text-green-500" />
                                    ) : isActive ? (
                                        <PlayCircle size={20} className="text-brand-primary animate-pulse" />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border-2 border-gray-600/50 flex items-center justify-center text-[10px] text-gray-500">
                                            {index + 1}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`text-sm font-medium ${isActive ? 'text-white' : isAccessible ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                        {lesson.title}
                                    </h4>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold bg-white/5 px-1.5 py-0.5 rounded">
                                            {lesson.type}
                                        </span>
                                        <span className="text-[10px] text-gray-600">{lesson.duration}</span>
                                        {!isAccessible && (
                                            <span className="text-[10px] text-red-400">Yopiq</span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:flex-row relative">
                {!isAuthenticated && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0b1120]/95 backdrop-blur-md">
                        <div className="text-center p-8 max-w-md">
                            <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock size={40} className="text-brand-primary" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Kirish Ta'qiqlangan</h2>
                            <p className="text-gray-400 mb-8">
                                Ushbu darsni ko'rish va topshiriqlarni bajarish uchun tizimga kirishingiz kerak.
                            </p>
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20"
                            >
                                KIRISH YOKI RO'YXATDAN O'TISH
                            </button>
                        </div>
                    </div>
                )}

                {/* Left: Content & Video Player */}
                <div className="flex-1 flex flex-col border-r border-white/10 overflow-y-auto bg-[#0b1120]">
                    {currentLesson ? (
                        <>
                            {/* YouTube Video Player Container */}
                            <div className="w-full bg-black relative aspect-video shadow-2xl">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${currentLesson.videoId}?rel=0`}
                                    title={currentLesson.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0"
                                ></iframe>
                            </div>

                            {/* Lesson Description */}
                            <div className="p-8 max-w-4xl mx-auto w-full">
                                <div className="flex items-center space-x-3 mb-6">
                                    <span className="px-3 py-1 bg-brand-primary text-white rounded-lg text-xs font-bold shadow-lg shadow-brand-primary/25">
                                        MAVZU {currentLessonIndex + 1}
                                    </span>
                                    <span className="text-gray-500 text-sm border-l border-white/10 pl-3">
                                        {course.title}
                                    </span>
                                </div>

                                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
                                    {currentLesson.title}
                                </h1>

                                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                                    <p className="text-lg text-gray-400 mb-8">
                                        Ushbu darsda siz <strong>{currentLesson.title}</strong> mavzusi bilan tanishasiz.
                                        Videoni diqqat bilan ko'ring va kod muharririda o'zingiz sinab ko'ring.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                                        <div className="bg-[#1e293b] p-6 rounded-2xl border border-white/5">
                                            <h3 className="text-white font-bold mb-3 flex items-center">
                                                <CheckCircle size={18} className="text-green-500 mr-2" />
                                                Topshiriq
                                            </h3>
                                            <p className="text-sm text-gray-400">
                                                Videoda ko'rsatilgan kodni o'ng tomondagi muharrirda yozing va ishlatib ko'ring (hozircha natija konsolda chiqmaydi).
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Mark Complete / Next Lesson Buttons */}
                                <div className="mt-8 flex items-center gap-3 flex-wrap">
                                    {!isLessonCompleted(currentLesson.id) ? (
                                        <button
                                            onClick={() => {
                                                markLessonComplete(currentLesson.id);
                                                const isLastLesson = currentLesson.id === 60;
                                                if (isLastLesson) {
                                                    setTimeout(() => setShowCertificateNameModal(true), 500);
                                                }
                                            }}
                                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center space-x-2 active:scale-95"
                                        >
                                            <CheckCircle size={20} />
                                            <span>Darsni Tugatish</span>
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <div className="flex items-center space-x-2 text-green-500 bg-green-500/10 border border-green-500/30 px-4 py-3 rounded-xl">
                                                <CheckCircle size={18} />
                                                <span className="font-medium text-sm">Dars tugatildi!</span>
                                            </div>
                                            {currentLessonIndex < course.lessons.length - 1 && (
                                                <button
                                                    onClick={() => setCurrentLessonIndex(currentLessonIndex + 1)}
                                                    className="px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/30 transition-all flex items-center space-x-2 active:scale-95"
                                                >
                                                    <span>Keyingi Dars</span>
                                                    <ChevronLeft size={18} className="rotate-180" />
                                                </button>
                                            )}
                                            {currentLesson.id === 60 && (
                                                <button
                                                    onClick={() => setShowCertificateNameModal(true)}
                                                    className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-yellow-500/30 transition-all flex items-center space-x-2 active:scale-95"
                                                >
                                                    <span>Sertifikat Olish 🎓</span>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                            <Lock size={48} className="text-gray-600 mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-2">Darslar topilmadi</h2>
                            <p className="text-gray-400">Tanlangan kurs uchun hozircha darslar yuklanmagan.</p>
                            <button onClick={() => navigate('/courses')} className="mt-6 px-6 py-2 bg-brand-primary rounded-lg text-white">
                                Boshqa kursni tanlash
                            </button>
                        </div>
                    )}
                </div>

                {/* Right: Interactive Panel (Code/Chat) */}
                <div className="w-full md:w-[420px] lg:w-[480px] flex flex-col bg-[#0f172a] border-l border-white/10 shadow-2xl z-10">
                    <div className="flex border-b border-white/10 bg-[#0b1120]">
                        <button
                            onClick={() => setActiveTab('code')}
                            className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all hover:bg-white/5 ${activeTab === 'code' ? 'border-brand-primary text-white bg-white/5' : 'border-transparent text-gray-400'
                                }`}
                        >
                            <div className="flex items-center justify-center">
                                <Code size={16} className="mr-2" />
                                Kod Yozish
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all hover:bg-white/5 ${activeTab === 'chat' ? 'border-brand-primary text-white bg-white/5' : 'border-transparent text-gray-400'
                                }`}
                        >
                            <div className="flex items-center justify-center">
                                <AIChatIcon size={16} className="mr-2" />
                                AI Yordamchi
                            </div>
                        </button>
                    </div>

                    <div className="flex-1 overflow-hidden relative">
                        {activeTab === 'code' ? (
                            <div className="flex flex-col h-full">
                                {/* Toolbar */}
                                <div className="flex items-center justify-between p-2 bg-[#0b1120] border-b border-white/5">
                                    <span className="text-xs text-gray-400 font-mono ml-2">main.php</span>
                                    <button
                                        onClick={handleRun}
                                        disabled={isRunning}
                                        className={`
                                            flex items-center px-4 py-1.5 rounded-lg font-bold text-xs text-white transition-all
                                            ${isRunning
                                                ? 'bg-gray-600 cursor-not-allowed opacity-70'
                                                : 'bg-green-600 hover:bg-green-500'
                                            }
                                        `}
                                    >
                                        {isRunning ? (
                                            <>
                                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                                Running...
                                            </>
                                        ) : (
                                            <>
                                                <Play size={12} className="mr-1.5 fill-current" />
                                                Run
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Editor */}
                                <div className="flex-1 overflow-hidden">
                                    <CodeEditor code={code} onChange={setCode} />
                                </div>

                                {/* Terminal Output */}
                                <div className="h-1/3 min-h-[150px] bg-[#0f172a] border-t border-white/10 flex flex-col">
                                    <div className="flex items-center justify-between px-4 py-2 bg-[#1e293b] border-b border-white/5">
                                        <div className="flex items-center space-x-2 text-gray-400">
                                            <Terminal size={12} />
                                            <span className="text-xs font-mono font-bold">Terminal</span>
                                        </div>
                                        {output && (
                                            <button
                                                onClick={() => setOutput('')}
                                                className="text-[10px] text-gray-500 hover:text-white transition-colors"
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex-1 p-3 font-mono text-xs overflow-auto custom-scrollbar">
                                        {output ? (
                                            <div className="text-green-400 whitespace-pre-wrap">
                                                <span className="text-gray-500 select-none mr-2">$</span>
                                                {output}
                                            </div>
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center text-gray-600">
                                                <p>Natijani ko'rish uchun "Run" tugmasini bosing</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <AIChat />
                        )}
                    </div>
                </div>

            </div>

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={(email) => {
                    login(email);
                    setShowAuthModal(false);
                    navigate('/courses');
                }}
            />
            {/* Certificate Name Modal */}
            <CertificateNameModal
                isOpen={showCertificateNameModal}
                onClose={() => setShowCertificateNameModal(false)}
                onSubmit={handleCertificateNameSubmit}
            />
        </div>
    );
};

const AIChatIcon = ({ size, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7H11V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
        <path d="M9 12h.01" />
        <path d="M15 12h.01" />
    </svg>
);

export default LessonView;
