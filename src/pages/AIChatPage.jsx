import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, BookOpen, Lightbulb, Zap } from 'lucide-react';
import AIChat from '../components/AIChat';

const AIChatPage = () => {
    // We'll use the AIChat component instead of local state

    return (
        <div className="min-h-screen bg-brand-dark py-4 px-4">
            <div className="max-w-6xl mx-auto h-[calc(100vh-2rem)] flex flex-col">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3 text-center"
                >
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent mb-2">
                        <Sparkles size={14} className="mr-1.5" />
                        <span className="text-xs font-medium">AI Yordamchi</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                        PHP o'rganishda sizga yordam beramiz
                    </h1>
                    <p className="text-gray-400 text-sm">Savollaringizni bering, biz javob beramiz! 🚀</p>
                </motion.div>

                {/* Chat Container */}
                <div className="flex-1 bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
                    <AIChat showHeader={false} isFullPage={true} showQuickQuestions={true} />
                </div>
            </div>
        </div>
    );
};

export default AIChatPage;
