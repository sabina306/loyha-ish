import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, BookOpen, ChevronLeft, Sparkles, Timer } from 'lucide-react';
import { quizData } from '../data/quizData';

const QuizPage = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const quiz = quizData[moduleId];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [quizFinished, setQuizFinished] = useState(false);

    if (!quiz) {
        return (
            <div className="min-h-screen bg-brand-dark flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Test topilmadi</h2>
                    <button onClick={() => navigate('/courses')} className="px-6 py-3 bg-brand-primary text-white rounded-xl">
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
        if (isCorrect) setScore(prev => prev + 1);

        setAnswers(prev => [...prev, { 
            questionId: question.id, 
            selected: selectedAnswer, 
            correct: question.correct, 
            isCorrect 
        }]);
        setShowExplanation(true);
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
            <div className="min-h-screen bg-brand-dark py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1e293b] border border-white/10 rounded-3xl p-8 md:p-12 text-center"
                    >
                        {/* Natija ikonkasi */}
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

                        <h2 className="text-3xl font-bold text-white mb-2">
                            {passed ? "Tabriklaymiz! 🎉" : "Qayta urinib ko'ring! 💪"}
                        </h2>
                        <p className="text-gray-400 mb-8">
                            {passed 
                                ? `Siz "${quiz.title}" testini muvaffaqiyatli topshirdingiz!` 
                                : `O'tish uchun kamida ${quiz.passingScore}% to'plash kerak.`
                            }
                        </p>

                        {/* Ball */}
                        <div className="relative w-40 h-40 mx-auto mb-8">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="52" fill="none" stroke="#1e293b" strokeWidth="8" />
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
                                    className="text-4xl font-black text-white"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    {percentage}%
                                </motion.span>
                                <span className="text-xs text-gray-500">{score}/{totalQuestions}</span>
                            </div>
                        </div>

                        {/* Batafsil natijalar */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                                <div className="text-2xl font-bold text-green-400">{score}</div>
                                <div className="text-xs text-gray-400">To'g'ri javoblar</div>
                            </div>
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                                <div className="text-2xl font-bold text-red-400">{totalQuestions - score}</div>
                                <div className="text-xs text-gray-400">Noto'g'ri javoblar</div>
                            </div>
                        </div>

                        {/* Tugmalar */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleRestart}
                                className="flex-1 py-3 px-6 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all flex items-center justify-center space-x-2"
                            >
                                <RotateCcw size={18} />
                                <span>Qayta topshirish</span>
                            </button>
                            <button
                                onClick={() => navigate('/courses')}
                                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold hover:shadow-lg hover:shadow-brand-primary/30 transition-all flex items-center justify-center space-x-2"
                            >
                                <BookOpen size={18} />
                                <span>Kurslarga qaytish</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-dark py-8 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Sarlavha */}
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => navigate('/courses')} className="flex items-center text-gray-400 hover:text-white transition-colors group">
                        <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Kurslarga qaytish</span>
                    </button>
                    <div className="flex items-center space-x-2 text-sm">
                        <Sparkles size={16} className="text-brand-primary" />
                        <span className="text-gray-400">{quiz.title}</span>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Savol {currentQuestion + 1}/{totalQuestions}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#1e293b] rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                {/* Savol kartochkasi */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {/* Savol */}
                        <div className="p-6 md:p-8 border-b border-white/10">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-sm">
                                    {currentQuestion + 1}
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed flex-1">
                                    {question.question}
                                </h3>
                            </div>
                        </div>

                        {/* Variantlar */}
                        <div className="p-6 md:p-8 space-y-3">
                            {question.options.map((option, index) => {
                                let borderColor = 'border-white/10 hover:border-brand-primary/50';
                                let bgColor = 'bg-transparent hover:bg-white/5';
                                let textColor = 'text-gray-300';
                                let icon = null;

                                if (showExplanation) {
                                    if (index === question.correct) {
                                        borderColor = 'border-green-500/50';
                                        bgColor = 'bg-green-500/10';
                                        textColor = 'text-green-300';
                                        icon = <CheckCircle size={20} className="text-green-500 flex-shrink-0" />;
                                    } else if (index === selectedAnswer && index !== question.correct) {
                                        borderColor = 'border-red-500/50';
                                        bgColor = 'bg-red-500/10';
                                        textColor = 'text-red-300';
                                        icon = <XCircle size={20} className="text-red-500 flex-shrink-0" />;
                                    }
                                } else if (selectedAnswer === index) {
                                    borderColor = 'border-brand-primary/70';
                                    bgColor = 'bg-brand-primary/10';
                                    textColor = 'text-white';
                                }

                                return (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleSelectAnswer(index)}
                                        whileHover={!showExplanation ? { scale: 1.01 } : {}}
                                        whileTap={!showExplanation ? { scale: 0.99 } : {}}
                                        className={`w-full text-left p-4 rounded-xl border ${borderColor} ${bgColor} transition-all duration-200 flex items-center space-x-3`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                                            selectedAnswer === index && !showExplanation 
                                                ? 'bg-brand-primary text-white' 
                                                : 'bg-white/5 text-gray-500'
                                        }`}>
                                            {String.fromCharCode(65 + index)}
                                        </div>
                                        <span className={`${textColor} text-sm font-medium flex-1`}>{option}</span>
                                        {icon}
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Tushuntirish */}
                        <AnimatePresence>
                            {showExplanation && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="border-t border-white/10"
                                >
                                    <div className={`p-6 md:p-8 ${selectedAnswer === question.correct ? 'bg-green-500/5' : 'bg-orange-500/5'}`}>
                                        <div className="flex items-start space-x-3">
                                            <div className={`p-2 rounded-lg ${selectedAnswer === question.correct ? 'bg-green-500/20' : 'bg-orange-500/20'}`}>
                                                {selectedAnswer === question.correct 
                                                    ? <CheckCircle size={18} className="text-green-400" /> 
                                                    : <XCircle size={18} className="text-orange-400" />
                                                }
                                            </div>
                                            <div>
                                                <h4 className={`font-bold text-sm mb-1 ${selectedAnswer === question.correct ? 'text-green-400' : 'text-orange-400'}`}>
                                                    {selectedAnswer === question.correct ? "To'g'ri! ✨" : "Noto'g'ri 😕"}
                                                </h4>
                                                <p className="text-gray-400 text-sm leading-relaxed">
                                                    {question.explanation}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Tugmalar */}
                        <div className="p-6 md:p-8 border-t border-white/10 flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                                Ball: <span className="text-brand-primary font-bold">{score}</span>/{currentQuestion + (showExplanation ? 1 : 0)}
                            </div>
                            {!showExplanation ? (
                                <button
                                    onClick={handleConfirm}
                                    disabled={selectedAnswer === null}
                                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center space-x-2 ${
                                        selectedAnswer !== null
                                            ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg hover:shadow-brand-primary/30 active:scale-95'
                                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
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
