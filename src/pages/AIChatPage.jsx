import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, BookOpen, Lightbulb, Zap } from 'lucide-react';
import AIChat from '../components/AIChat';

const AIChatPage = () => {
    // We'll use the AIChat component instead of local state

    return (
        <div className="min-h-screen py-4 px-4 bg-transparent relative z-10">
            <div className="max-w-6xl mx-auto h-[calc(100vh-2rem)] flex flex-col gap-4">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-1 text-center"
                >
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-brand-primary/30 bg-white dark:bg-slate-800 text-brand-primary mb-3 shadow-sm">
                        <Sparkles size={14} className="mr-1.5 text-brand-accent" />
                        <span className="text-xs font-bold tracking-wide">AI Yordamchi</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white mb-2">
                        PHP o'rganishda sizga yordam beramiz
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base">Savollaringizni bering, biz darhol javob beramiz! 🚀</p>
                </motion.div>

                {/* Chat Container */}
                <div className="flex-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden flex flex-col shadow-2xl shadow-brand-primary/10">
                    <AIChat showHeader={false} isFullPage={true} showQuickQuestions={true} />
                </div>
            </div>
        </div>
    );
};

export default AIChatPage;
