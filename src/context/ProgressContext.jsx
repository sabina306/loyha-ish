import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProgressContext = createContext();

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within ProgressProvider');
    }
    return context;
};

export const ProgressProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const [completedLessons, setCompletedLessons] = useState([]);
    const [passedQuizzes, setPassedQuizzes] = useState([]);

    // Load progress from localStorage when user logs in
    useEffect(() => {
        if (isAuthenticated && user?.email) {
            const progressKey = `phpmaster_progress_${user.email}`;
            const quizKey = `phpmaster_quizzes_${user.email}`;
            
            const storedProgress = localStorage.getItem(progressKey);
            const storedQuizzes = localStorage.getItem(quizKey);

            if (storedProgress) {
                try {
                    setCompletedLessons(JSON.parse(storedProgress));
                } catch (e) {
                    setCompletedLessons([]);
                }
            } else {
                setCompletedLessons([]);
            }

            if (storedQuizzes) {
                try {
                    setPassedQuizzes(JSON.parse(storedQuizzes));
                } catch (e) {
                    setPassedQuizzes([]);
                }
            } else {
                setPassedQuizzes([]);
            }
        } else {
            setCompletedLessons([]);
            setPassedQuizzes([]);
        }
    }, [user?.email, isAuthenticated]);

    // Save progress to localStorage whenever it changes
    useEffect(() => {
        if (isAuthenticated && user?.email) {
            const progressKey = `phpmaster_progress_${user.email}`;
            const quizKey = `phpmaster_quizzes_${user.email}`;
            
            localStorage.setItem(progressKey, JSON.stringify(completedLessons));
            localStorage.setItem(quizKey, JSON.stringify(passedQuizzes));
        }
    }, [completedLessons, passedQuizzes, user?.email, isAuthenticated]);

    const markLessonComplete = (lessonId) => {
        if (!completedLessons.includes(lessonId)) {
            setCompletedLessons([...completedLessons, lessonId]);
        }
    };

    const markQuizPassed = (quizId) => {
        const id = parseInt(quizId);
        if (!passedQuizzes.includes(id)) {
            setPassedQuizzes([...passedQuizzes, id]);
        }
    };

    const isLessonCompleted = (lessonId) => {
        return completedLessons.includes(lessonId);
    };

    const isQuizPassed = (quizId) => {
        return passedQuizzes.includes(parseInt(quizId));
    };

    const isLessonAccessible = (lessonId) => {
        // Lesson 1 is always accessible
        if (lessonId === 1) return true;

        // A lesson is accessible if the previous lesson is completed
        const prevCompleted = isLessonCompleted(lessonId - 1);
        if (!prevCompleted) return false;

        // Mandatory Quizzes at module boundaries
        // Module 1: 1-4, needs Quiz 1 for Lesson 5
        if (lessonId === 5 && !isQuizPassed(1)) return false;
        // Module 2: 5-9, needs Quiz 2 for Lesson 10
        if (lessonId === 10 && !isQuizPassed(2)) return false;
        // Module 3: 10-16, needs Quiz 3 for Lesson 17
        if (lessonId === 17 && !isQuizPassed(3)) return false;
        // Module 4: 17-58, needs Quiz 4 for Lesson 59
        if (lessonId === 59 && !isQuizPassed(4)) return false;

        return true;
    };

    const getProgressPercentage = (totalLessons) => {
        if (totalLessons === 0) return 0;
        return Math.round((completedLessons.length / totalLessons) * 100);
    };

    const resetProgress = () => {
        setCompletedLessons([]);
        setPassedQuizzes([]);
        if (user?.email) {
            localStorage.removeItem(`phpmaster_progress_${user.email}`);
            localStorage.removeItem(`phpmaster_quizzes_${user.email}`);
        }
    };

    const hasCertificate = () => {
        return completedLessons.length >= 60 && isQuizPassed(5);
    };

    const getCertificateData = () => {
        if (!hasCertificate()) return null;

        const baseId = user?.email ? user.email.split('@')[0].toUpperCase() : 'USER';
        const certificateId = `${baseId}-${completedLessons.length}-${Date.now().toString().slice(-6)}`;

        const completionDate = new Date().toLocaleDateString('uz-UZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return {
            certificateId,
            completionDate,
            userName: user?.email?.split('@')[0] || 'Foydalanuvchi',
            totalLessons: 60
        };
    };

    const value = {
        completedLessons,
        passedQuizzes,
        markLessonComplete,
        markQuizPassed,
        isLessonCompleted,
        isQuizPassed,
        isLessonAccessible,
        getProgressPercentage,
        resetProgress,
        hasCertificate,
        getCertificateData
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};
