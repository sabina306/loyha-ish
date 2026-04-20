import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Code, Info, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Groq from 'groq-sdk';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const groq = API_KEY ? new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true }) : null;
const SYSTEM_PROMPT = "Siz tajribali PHP, OOP va ma'lumotlar bazasi ustozisiz. Foydalanuvchi savollariga batafsil, tushunarli va professional tilda javob bering. Murakkab tushunchalarni oddiy misollar bilan tushuntiring. Savolga to'liq javob berish uchun kerak bo'lsa, kod misollaridan keng foydalaning. Javoblaringiz ham nazariy, ham amaliy jihatdan boy bo'lsin, lekin o'quvchini asosiy mavzudan chalg'itib yubormang.";

const AIChat = ({ showHeader = true, isFullPage = false, showQuickQuestions = false }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: 'Salom! Men PHP Ustoziman. PHP asoslari, OOP yoki ma\'lumotlar bazasi bo\'yicha savollaringiz bo\'lsa, bemalol so\'rang! 🚀'
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const isAutoScrollRef = useRef(true);

    const quickQuestions = [
        { icon: Code, text: "PHP da array qanday yaratiladi?", color: "from-blue-500 to-cyan-500" },
        { icon: BookOpen, text: "function va method farqi nima?", color: "from-purple-500 to-pink-500" },
        { icon: Info, text: "Ma'lumotlar bazasiga qanday ulanaman?", color: "from-green-500 to-emerald-500" },
        { icon: Sparkles, text: "OOP nima va nima uchun kerak?", color: "from-orange-500 to-red-500" }
    ];

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;
            isAutoScrollRef.current = isNearBottom;
        }
    };

    const scrollToBottom = () => {
        if (isAutoScrollRef.current && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleQuickQuestion = (text) => {
        if (isTyping) return;
        handleSend(text);
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    const handleSend = async (textToSend = input) => {
        const text = typeof textToSend === 'string' ? textToSend : input;
        if (!text.trim() || isTyping) return;

        const userMsg = { id: Date.now(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        if (!API_KEY || !groq) {
            setMessages(prev => [...prev, { 
                id: Date.now() + 1, 
                sender: 'ai', 
                text: "Groq API kaliti topilmadi! Iltimos, loyihangizdagi `.env` faylini ochib, `VITE_GROQ_API_KEY` ni yozing." 
            }]);
            setIsTyping(false);
            return;
        }

        const aiMsgId = Date.now() + 1;

        try {
            // Groq formatiga o'tkazish (OpenAI mos format)
            let chatHistory = messages.map(msg => ({
                role: msg.sender === 'ai' ? 'assistant' : 'user',
                content: msg.text
            }));

            // Tizim ko'rsatmasini qo'shish
            chatHistory.unshift({ role: 'system', content: SYSTEM_PROMPT });
            
            // Hozirgi xabarni qo'shish
            chatHistory.push({ role: 'user', content: text });

            // Bo'sh AI xabarini qo'shamiz — streaming bilan to'ldiriladi
            setMessages(prev => [...prev, { id: aiMsgId, sender: 'ai', text: '' }]);

            const stream = await groq.chat.completions.create({
                messages: chatHistory,
                model: "llama-3.3-70b-versatile",
                stream: true,
            });

            let fullText = '';
            for await (const chunk of stream) {
                const chunkText = chunk.choices[0]?.delta?.content || "";
                fullText += chunkText;
                setMessages(prev => prev.map(msg => 
                    msg.id === aiMsgId ? { ...msg, text: fullText } : msg
                ));
            }
        } catch (error) {
            console.error("Groq API Error:", error);
            setMessages(prev => {
                const hasEmptyAiMsg = prev.some(msg => msg.id === aiMsgId);
                if (hasEmptyAiMsg) {
                    return prev.map(msg => 
                        msg.id === aiMsgId ? { ...msg, text: "Kechirasiz, Groq API bilan xatolik yuz berdi. Iltimos, API kalitini va internetni tekshiring." } : msg
                    );
                }
                return [...prev, { 
                    id: aiMsgId, 
                    sender: 'ai', 
                    text: "Kechirasiz, Groq API bilan xatolik yuz berdi. Iltimos, API kalitini va internetni tekshiring." 
                }];
            });
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className={`flex flex-col h-full overflow-hidden ${isFullPage ? '' : 'bg-transparent'}`}>
            {/* Header */}
            {showHeader && (
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 flex items-center justify-between shadow-sm backdrop-blur-md">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="p-2 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl">
                                <Bot className="text-white" size={20} />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white text-sm">AI PHP Ustoz</h3>
                            <p className="text-[10px] text-emerald-600 font-bold animate-pulse">Online • Sizga yordamga tayyor</p>
                        </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-brand-primary transition-colors bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <Info size={18} />
                    </button>
                </div>
            )}

            {/* Chat Messages */}
            <div 
                ref={chatContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-transparent"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-auto shadow-md ${msg.sender === 'user'
                                    ? 'ml-2 bg-gradient-to-r from-brand-primary to-brand-accent'
                                    : 'mr-2 bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600'
                                    }`}>
                                    {msg.sender === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-brand-primary" />}
                                </div>
                                <div className={`relative px-4 py-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'user'
                                    ? 'bg-gradient-to-br from-brand-primary to-brand-accent text-white rounded-br-none border-none'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-bl-none border border-slate-100 dark:border-slate-700'
                                    }`}>
                                    <div className="whitespace-pre-wrap leading-relaxed">
                                        {msg.text.split('```').map((part, index) => {
                                            if (index % 2 === 1) {
                                                const lines = part.trim().split('\n');
                                                const lang = lines[0].trim();
                                                const code = lines.slice(1).join('\n');
                                                return (
                                                    <div key={index} className="my-3 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 shadow-inner font-mono text-[13px]">
                                                        {lang && <div className="px-3 py-1 bg-slate-200/50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-[10px] uppercase border-b border-slate-200 dark:border-slate-600">{lang}</div>}
                                                        <div className="p-3 text-brand-primary overflow-x-auto custom-scrollbar font-medium">
                                                            {code || part.trim()}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return <span key={index}>{part}</span>;
                                        })}
                                    </div>
                                    <div className={`absolute bottom-0 ${msg.sender === 'user' ? '-right-1' : '-left-1'} w-2 h-2 bg-inherit transform rotate-45`} />
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Quick Questions Grid */}
                    {showQuickQuestions && messages.length === 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4"
                        >
                            {quickQuestions.map((q, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleQuickQuestion(q.text)}
                                    className="group relative bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-left hover:border-brand-primary/50 hover:shadow-md transition-all overflow-hidden"
                                >
                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${q.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity`} />
                                    <div className="flex items-center space-x-3 relative z-10">
                                        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${q.color} shadow-sm`}>
                                            <q.icon size={16} className="text-white" />
                                        </div>
                                        <span className="text-slate-700 dark:text-slate-300 font-semibold text-xs">{q.text}</span>
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex justify-start"
                        >
                            <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-100 dark:border-slate-700 shadow-sm">
                                <div className="flex space-x-1">
                                    <motion.div
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                                        className="w-1.5 h-1.5 bg-brand-primary rounded-full"
                                    />
                                    <motion.div
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                        className="w-1.5 h-1.5 bg-brand-primary rounded-full opacity-60"
                                    />
                                    <motion.div
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                        className="w-1.5 h-1.5 bg-brand-primary rounded-full opacity-30"
                                    />
                                </div>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Ustoz yozmoqda...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-700">
                <div className="relative group">
                    <div className="absolute inset-0 bg-brand-primary opacity-0 group-focus-within:opacity-5 blur-lg transition-opacity duration-500 rounded-3xl" />
                    <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 px-4 py-3 focus-within:border-brand-primary/50 focus-within:shadow-md transition-all shadow-sm">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Savolingizni shu yerga yozing..."
                            className="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-slate-200 font-medium text-sm placeholder-slate-400"
                        />
                        <div className="flex items-center space-x-2">
                            {input.trim() && (
                                <motion.button
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    onClick={handleSend}
                                    className="p-2 text-white bg-gradient-to-r from-brand-primary to-brand-accent rounded-xl hover:shadow-lg hover:shadow-brand-primary/20 transition-all active:scale-95 flex items-center justify-center transform hover:-translate-y-0.5"
                                >
                                    <Send size={16} />
                                </motion.button>
                            )}
                            {!input.trim() && (
                                <div className="p-2 text-brand-primary/40 bg-brand-primary/5 rounded-xl">
                                    <Sparkles size={16} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-2 flex items-center justify-center space-x-4">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium flex items-center px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700">
                        <Code size={10} className="mr-1 text-brand-primary" /> PHP Syntax
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium flex items-center px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700">
                        <Info size={10} className="mr-1 text-brand-secondary" /> Quick Help
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AIChat;
