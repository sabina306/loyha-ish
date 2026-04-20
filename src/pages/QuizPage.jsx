import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, BookOpen, ChevronLeft, Sparkles } from 'lucide-react';
import { quizData } from '../data/quizData';
import { useProgress } from '../context/ProgressContext';

const QuizPage = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const { markQuizPassed } = useProgress();
    const quiz = quizData[moduleId];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [quizFinished, setQuizFinished] = useState(false);

    if (!quiz) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-black text-slate-800 dark:text-gray-200 mb-4">Test topilmadi</h2>
                    <button onClick={() => navigate('/courses')} className="px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-xl shadow-md hover:shadow-lg transition-all font-bold">
                        Kurslarga qaytish
                    </button>
                </div>
            </div>
        );
    }

    const question = quiz.questions[currentQuestion];
    const totalQuestions = quiz.questions.length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    const handleSelectAnswer = (index) => {
        if (showExplanation) return;
        setSelectedAnswer(index);
    };

    const handleConfirm = () => {
        if (selectedAnswer === null) return;

        const isCorrect = selectedAnswer === question.correct;
        const newScore = isCorrect ? score + 1 : score;
        if (isCorrect) setScore(newScore);

        setAnswers(prev => [...prev, { 
            questionId: question.id, 
            selected: selectedAnswer, 
            correct: question.correct, 
            isCorrect 
        }]);
        setShowExplanation(true);

        // Agar bu oxirgi savol bo'lsa va o'tish ballini to'plagan bo'lsa
        if (currentQuestion === totalQuestions - 1) {
            const finalPercentage = Math.round((newScore / totalQuestions) * 100);
            if (finalPercentage >= quiz.passingScore) {
                markQuizPassed(moduleId);
            }
        }
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setQuizFinished(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setAnswers([]);
        setQuizFinished(false);
    };

    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= quiz.passingScore;

    // Natija sahifasi
    if (quizFinished) {
        return (
            <div className="min-h-[calc(100vh-56px)] md:min-h-screen bg-transparent py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -z-10" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-10" />
                        
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
                                passed 
                                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30' 
                                    : 'bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-red-500/30'
                            }`}
                        >
                            {passed ? <Trophy size={40} className="text-white" /> : <RotateCcw size={40} className="text-white" />}
                        </motion.div>

                        <h2 className="text-3xl font-black text-slate-800 dark:text-gray-200 mb-2">
                            {passed ? "Tabriklaymiz! 🎉" : "Qayta urinib ko'ring! 💪"}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 font-medium mb-8">
                            {passed 
                                ? `Siz "${quiz.title}" testini muvaffaqiyatli topshirdingiz! Endi keyingi darslarni davom ettirishingiz mumkin.` 
                                : `O'tish uchun kamida ${quiz.passingScore}% to'plash kerak.`
                            }
                        </p>

                        <div className="relative w-40 h-40 mx-auto mb-8">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="52" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                                <motion.circle 
                                    cx="60" cy="60" r="52" fill="none" 
                                    stroke={passed ? "#22c55e" : "#f97316"} 
                                    strokeWidth="8" 
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 52}`}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                                    animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - percentage / 100) }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.span 
                                    className="text-4xl font-black text-slate-800 dark:text-gray-200"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    {percentage}%
                                </motion.span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">{score}/{totalQuestions}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
                                <div className="text-2xl font-black text-green-600">{score}</div>
                                <div className="text-xs text-green-700 font-semibold">To'g'ri javoblar</div>
                            </div>
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
                                <div className="text-2xl font-black text-red-600">{totalQuestions - score}</div>
                                <div className="text-xs text-red-700 font-semibold">Noto'g'ri javoblar</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleRestart}
                                className="flex-1 py-3 px-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 hover:border-brand-primary/50 shadow-sm transition-all flex items-center justify-center space-x-2 font-bold"
                            >
                                <RotateCcw size={18} />
                                <span>Qayta topshirish</span>
                            </button>
                            <button
                                onClick={() => navigate('/courses')}
                                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold hover:shadow-lg hover:shadow-brand-primary/30 transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
                            >
                                <BookOpen size={18} />
                                <span>Darslarga qaytish</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-56px)] md:min-h-screen bg-transparent py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => navigate('/courses')} className="flex items-center text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors group font-semibold">
                        <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Kurslarga qaytish</span>
                    </button>
                    <div className="flex items-center space-x-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full shadow-sm">
                        <Sparkles size={16} className="text-brand-accent" />
                        <span className="text-slate-800 dark:text-gray-200 font-bold">{quiz.title}</span>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300 font-bold mb-2">
                        <span>Savol {currentQuestion + 1}/{totalQuestions}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-md font-black text-sm">
                                    {currentQuestion + 1}
                                </div>
                                <h3 className="text-lg md:text-xl font-black text-slate-800 dark:text-gray-200 leading-relaxed flex-1">
                                    {question.question}
                                </h3>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 space-y-3">
                            {question.options.map((option, index) => {
                                let borderColor = 'border-slate-200 dark:border-slate-700 hover:border-brand-primary/50 shadow-sm';
                                let bgColor = 'bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700';
                                let textColor = 'text-slate-700';
                                let icon = null;

                                if (showExplanation) {
                                    if (index === question.correct) {
                                        borderColor = 'border-green-500/50';
                                        bgColor = 'bg-green-500/10';
                                        textColor = 'text-green-700';
                                        icon = <CheckCircle size={20} className="text-green-500 flex-shrink-0" />;
                                    } else if (index === selectedAnswer && index !== question.correct) {
                                        borderColor = 'border-red-500/50';
                                        bgColor = 'bg-red-500/10';
                                        textColor = 'text-red-700';
                                        icon = <XCircle size={20} className="text-red-500 flex-shrink-0" />;
                                    }
                                } else if (selectedAnswer === index) {
                                    borderColor = 'border-brand-primary shadow-md shadow-brand-primary/10';
                                    bgColor = 'bg-brand-primary/5';
                                    textColor = 'text-brand-primary font-bold';
                                }

                                return (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleSelectAnswer(index)}
                                        whileHover={!showExplanation ? { scale: 1.01 } : {}}
                                        whileTap={!showExplanation ? { scale: 0.99 } : {}}
                                        className={`w-full text-left p-4 rounded-xl border-2 ${borderColor} ${bgColor} transition-all duration-200 flex items-center space-x-3`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                                            selectedAnswer === index && !showExplanation 
                                                ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-md' 
                                                : 'bg-slate-100 text-slate-500 dark:text-slate-400'
                                        }`}>
                                            {String.fromCharCode(65 + index)}
                                        </div>
                                        <span className={`${textColor} text-sm font-medium flex-1`}>{option}</span>
                                        {icon}
                                    </motion.button>
                                );
                            })}
                        </div>

                        <AnimatePresence>
                            {showExplanation && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="border-t border-slate-100"
                                >
                                    <div className={`p-6 md:p-8 ${selectedAnswer === question.correct ? 'bg-green-50' : 'bg-red-50'}`}>
                                        <div className="flex items-start space-x-3">
                                            <div className={`p-2 rounded-lg ${selectedAnswer === question.correct ? 'bg-green-100' : 'bg-red-100'} shadow-sm`}>
                                                {selectedAnswer === question.correct 
                                                    ? <CheckCircle size={18} className="text-green-600" /> 
                                                    : <XCircle size={18} className="text-red-500" />
                                                }
                                            </div>
                                            <div>
                                                <h4 className={`font-black text-sm mb-1 ${selectedAnswer === question.correct ? 'text-green-700' : 'text-red-600'}`}>
                                                    {selectedAnswer === question.correct ? "To'g'ri! ✨" : "Noto'g'ri 😕"}
                                                </h4>
                                                <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
                                                    {question.explanation}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-6 md:p-8 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div className="text-sm text-slate-500 dark:text-slate-400 font-bold">
                                Ball: <span className="text-brand-primary text-lg">{score}</span>/{currentQuestion + (showExplanation ? 1 : 0)}
                            </div>
                            {!showExplanation ? (
                                <button
                                    onClick={handleConfirm}
                                    disabled={selectedAnswer === null}
                                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center space-x-2 ${
                                        selectedAnswer !== null
                                            ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-lg hover:shadow-brand-primary/30 active:scale-95'
                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                                    }`}
                                >
                                    <span>Tekshirish</span>
                                    <CheckCircle size={16} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-sm hover:shadow-lg hover:shadow-brand-primary/30 transition-all active:scale-95 flex items-center space-x-2"
                                >
                                    <span>{currentQuestion < totalQuestions - 1 ? 'Keyingi savol' : 'Natijani ko\'rish'}</span>
                                    <ArrowRight size={16} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default QuizPage;
