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

    // Load progress from localStorage when user logs in
    useEffect(() => {
        if (isAuthenticated && user?.email) {
            const storageKey = `phpmaster_progress_${user.email}`;
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                try {
                    setCompletedLessons(JSON.parse(stored));
                } catch (e) {
                    setCompletedLessons([]);
                }
            } else {
                setCompletedLessons([]);
            }
        } else {
            setCompletedLessons([]);
        }
    }, [user?.email, isAuthenticated]);

    // Save progress to localStorage whenever it changes
    useEffect(() => {
        if (isAuthenticated && user?.email && completedLessons.length >= 0) {
            const storageKey = `phpmaster_progress_${user.email}`;
            localStorage.setItem(storageKey, JSON.stringify(completedLessons));
        }
    }, [completedLessons, user?.email, isAuthenticated]);

    const markLessonComplete = (lessonId) => {
        if (!completedLessons.includes(lessonId)) {
            setCompletedLessons([...completedLessons, lessonId]);
        }
    };

    const isLessonCompleted = (lessonId) => {
        return completedLessons.includes(lessonId);
    };

    const isLessonAccessible = (lessonId) => {
        // Lesson 1 is always accessible
        if (lessonId === 1) return true;

        // A lesson is accessible if the previous lesson is completed
        return isLessonCompleted(lessonId - 1);
    };

    const getProgressPercentage = (totalLessons) => {
        if (totalLessons === 0) return 0;
        return Math.round((completedLessons.length / totalLessons) * 100);
    };

    const resetProgress = () => {
        setCompletedLessons([]);
        if (user?.email) {
            const storageKey = `phpmaster_progress_${user.email}`;
            localStorage.removeItem(storageKey);
        }
    };

    const hasCertificate = () => {
        return completedLessons.length >= 60;
    };

    const getCertificateData = () => {
        if (!hasCertificate()) return null;

        // Generate certificate ID from user email and completion count
        const baseId = user?.email ? user.email.split('@')[0].toUpperCase() : 'USER';
        const certificateId = `${baseId}-${completedLessons.length}-${Date.now().toString().slice(-6)}`;

        // Get completion date (current date or use last lesson completion)
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
        markLessonComplete,
        isLessonCompleted,
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
