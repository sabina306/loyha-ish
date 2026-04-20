import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, PlayCircle, FileText, CheckCircle, Lock, Layout, Volume2, Settings, Maximize, Code, Play, RotateCcw, Terminal, Sparkles } from 'lucide-react';
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
    const { isLessonCompleted, isLessonAccessible, markLessonComplete, getProgressPercentage, isQuizPassed } = useProgress();
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
    // Map lesson ID to the module it belongs to (for quizzes)
    const moduleOfLesson = {
        5: 1, 10: 2, 17: 3, 59: 4
    };

    const moduleEndLessons = {
        4: 1, 9: 2, 16: 3, 58: 4, 60: 5
    };

    const course = phpCourseData;
    const currentLesson = course.lessons[currentLessonIndex];
    
    // Check if the current lesson is locked due to a missing quiz
    const requiredQuizId = moduleOfLesson[currentLesson?.id];
    const isLockedByQuiz = requiredQuizId && !isQuizPassed(requiredQuizId);

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
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
            {/* Sidebar - Lesson List */}
            <div className="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col z-20 hidden md:flex shadow-xl shadow-brand-primary/5">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <button onClick={() => navigate('/courses')} className="flex items-center text-slate-500 hover:text-brand-primary mb-6 transition-colors group font-semibold">
                        <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                        Kurslarga qaytish
                    </button>

                    <h2 className="text-xl font-black text-slate-800 dark:text-white">
                        {course.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium line-clamp-1">{course.description}</p>

                    <div className="mt-6">
                        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-bold mb-2">
                            <span>{course.lessons.filter((l) => isLessonCompleted(l.id)).length}/{course.lessons.length} dars tugatildi</span>
                            <span className="text-brand-primary font-black">
                                {course.lessons.length > 0
                                    ? Math.round((course.lessons.filter((l) => isLessonCompleted(l.id)).length / course.lessons.length) * 100)
                                    : 0}%
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden shadow-inner">
                            <div
                                className="bg-gradient-to-r from-brand-primary to-brand-accent h-full transition-all duration-700 ease-out rounded-full"
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
                                    ? 'bg-brand-primary/5 dark:bg-brand-primary/10 border-brand-primary shadow-sm shadow-brand-primary/10'
                                    : isAccessible
                                        ? 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'
                                        : 'border-transparent opacity-50 cursor-not-allowed'
                                    }`}
                            >
                                <div className="mr-3">
                                    {!isAccessible ? (
                                        <Lock size={18} className="text-slate-400" />
                                    ) : isCompleted ? (
                                        <CheckCircle size={18} className="text-green-500" />
                                    ) : isActive ? (
                                        <PlayCircle size={20} className="text-brand-primary animate-pulse" />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 shadow-sm">
                                            {index + 1}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`text-sm font-bold ${isActive ? 'text-brand-primary' : isAccessible ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'
                                        }`}>
                                        {lesson.title}
                                    </h4>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <span className="text-[10px] uppercase tracking-wider text-brand-primary font-black bg-brand-primary/10 px-1.5 py-0.5 rounded shadow-sm">
                                            {lesson.type}
                                        </span>
                                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{lesson.duration}</span>
                                        {!isAccessible && (
                                            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Yopiq</span>
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
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
                        <div className="text-center p-8 max-w-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl">
                            <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                                <Lock size={40} className="text-brand-primary" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-4">Kirish Ta'qiqlangan</h2>
                            <p className="text-slate-600 dark:text-slate-400 font-medium mb-8">
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
                <div className="flex-1 flex flex-col border-r border-slate-200 dark:border-slate-700 overflow-y-auto bg-transparent">
                    {currentLesson ? (
                        <>
                            {isLockedByQuiz ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 dark:bg-slate-900">
                                    <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                        <Lock size={40} className="text-orange-500" />
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-4">Avval Testdan O'ting</h2>
                                    <p className="max-w-md text-slate-600 dark:text-slate-400 font-medium mb-8">
                                        Keyingi modul darslariga kirish uchun avvalgi modul yakunidagi testdan kamida 70% ball to'plashingiz shart.
                                    </p>
                                    <button
                                        onClick={() => navigate(`/quiz/${requiredQuizId}`)}
                                        className="px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-accent text-white font-black rounded-2xl hover:shadow-xl hover:shadow-brand-primary/30 transition-all flex items-center space-x-3 active:scale-95"
                                    >
                                        <Sparkles size={20} />
                                        <span>TESTNI TOPSHIRISH</span>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* YouTube Video Player Container */}
                                    <div className="w-full bg-slate-900 relative aspect-video shadow-lg">
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
                                            <span className="px-3 py-1 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-lg text-xs font-black shadow-md shadow-brand-primary/25">
                                                MAVZU {currentLessonIndex + 1}
                                            </span>
                                            <span className="text-slate-500 dark:text-slate-400 font-bold text-sm border-l border-slate-300 dark:border-slate-600 pl-3">
                                                {course.title}
                                            </span>
                                        </div>

                                        <h1 className="text-3xl md:text-4xl font-black mb-6 text-slate-800 dark:text-white leading-tight">
                                            {currentLesson.title}
                                        </h1>

                                        <div className="prose max-w-none text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                                                Ushbu darsda siz <strong>{currentLesson.title}</strong> mavzusi bilan tanishasiz.
                                                Videoni diqqat bilan ko'ring va kod muharririda o'zingiz sinab ko'ring.
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                                                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-brand-primary/5">
                                                    <h3 className="text-slate-800 dark:text-white font-black mb-3 flex items-center">
                                                        <CheckCircle size={18} className="text-green-500 mr-2" />
                                                        Topshiriq
                                                    </h3>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                                        Videoda ko'rsatilgan kodni o'ng tomondagi muharrirda yozing va ishlatib ko'ring (hozircha natija konsolda chiqmaydi).
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mark Complete / Next Lesson Buttons / Quiz Button */}
                                        <div className="mt-8 flex items-center gap-3 flex-wrap">
                                            {!isLessonCompleted(currentLesson.id) ? (
                                                <button
                                                    onClick={() => {
                                                        markLessonComplete(currentLesson.id);
                                                        const isLastLesson = currentLesson.id === 60;
                                                        if (isLastLesson) {
                                                            // For last lesson, we check if Quiz 5 is done before certificate
                                                            // But usually they take quiz 5 first.
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

                                                    {/* Quiz Button if Module End */}
                                                    {moduleEndLessons[currentLesson.id] && (
                                                        <button
                                                            onClick={() => navigate(`/quiz/${moduleEndLessons[currentLesson.id]}`)}
                                                            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2 active:scale-95 ${
                                                                isQuizPassed(moduleEndLessons[currentLesson.id])
                                                                    ? 'bg-green-100 text-green-700 border border-green-200'
                                                                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25'
                                                            }`}
                                                        >
                                                            <Sparkles size={18} />
                                                            <span>{isQuizPassed(moduleEndLessons[currentLesson.id]) ? 'Test TOPSHIRILGAN' : 'TEST TOPSHIRISH'}</span>
                                                        </button>
                                                    )}

                                                    {/* Next Lesson Button - only if next lesson is accessible OR it's not a module end that needs quiz */}
                                                    {currentLessonIndex < course.lessons.length - 1 && (
                                                        <button
                                                            onClick={() => {
                                                                const nextLessonId = course.lessons[currentLessonIndex + 1].id;
                                                                if (isLessonAccessible(nextLessonId)) {
                                                                    setCurrentLessonIndex(currentLessonIndex + 1);
                                                                } else {
                                                                    setCurrentLessonIndex(currentLessonIndex + 1); // move there to show lock screen
                                                                }
                                                            }}
                                                            className="px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/30 transition-all flex items-center space-x-2 active:scale-95"
                                                        >
                                                            <span>Keyingi Dars</span>
                                                            <ChevronLeft size={18} className="rotate-180" />
                                                        </button>
                                                    )}

                                                    {/* Certificate Button if Course End and Final Quiz Done */}
                                                    {currentLesson.id === 60 && isQuizPassed(5) && (
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
                            )}
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 dark:bg-slate-900">
                            <Lock size={48} className="text-slate-400 mb-4" />
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Darslar topilmadi</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Tanlangan kurs uchun hozircha darslar yuklanmagan.</p>
                            <button onClick={() => navigate('/courses')} className="mt-6 px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-accent rounded-xl text-white font-bold shadow-md hover:shadow-lg transition-all">
                                Boshqa kursni tanlash
                            </button>
                        </div>
                    )}
                </div>

                {/* Right: Interactive Panel (Code/Chat) */}
                <div className="w-full md:w-[420px] lg:w-[480px] flex flex-col bg-white border-l border-slate-200 shadow-2xl z-10">
                    <div className="flex border-b border-slate-200 bg-slate-50">
                        <button
                            onClick={() => setActiveTab('code')}
                            className={`flex-1 py-4 text-sm font-bold border-b-2 transition-all hover:bg-white ${activeTab === 'code' ? 'border-brand-primary text-brand-primary bg-white shadow-sm' : 'border-transparent text-slate-500'
                                }`}
                        >
                            <div className="flex items-center justify-center">
                                <Code size={16} className="mr-2" />
                                Kod Yozish
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`flex-1 py-4 text-sm font-bold border-b-2 transition-all hover:bg-white ${activeTab === 'chat' ? 'border-brand-primary text-brand-primary bg-white shadow-sm' : 'border-transparent text-slate-500'
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
                            <div className="flex flex-col h-full bg-slate-50">
                                {/* Toolbar */}
                                <div className="flex items-center justify-between p-2 bg-slate-100 border-b border-slate-200">
                                    <span className="text-xs text-slate-500 font-mono ml-2 font-bold">main.php</span>
                                    <button
                                        onClick={handleRun}
                                        disabled={isRunning}
                                        className={`
                                            flex items-center px-4 py-1.5 rounded-lg font-bold text-xs text-white transition-all shadow-sm
                                            ${isRunning
                                                ? 'bg-slate-400 cursor-not-allowed opacity-70'
                                                : 'bg-green-500 hover:bg-green-600 hover:shadow-md'
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
                                <div className="h-1/3 min-h-[150px] bg-white flex flex-col border-t border-slate-200">
                                    <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200 shadow-sm">
                                        <div className="flex items-center space-x-2 text-slate-600">
                                            <Terminal size={12} />
                                            <span className="text-xs font-mono font-bold tracking-wider">Terminal Output</span>
                                        </div>
                                        {output && (
                                            <button
                                                onClick={() => setOutput('')}
                                                className="text-[10px] text-slate-400 hover:text-brand-primary transition-colors uppercase font-bold"
                                            >
                                                Tozalash
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex-1 p-3 font-mono text-xs overflow-auto custom-scrollbar">
                                        {output ? (
                                            <div className="text-slate-700 font-bold whitespace-pre-wrap">
                                                <span className="text-slate-400 select-none mr-2">$</span>
                                                {output}
                                            </div>
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center text-slate-400 font-medium">
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
