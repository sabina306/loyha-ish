import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Code, Info, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: "Siz PHP, OOP va ma'lumotlar bazasi ustozisiz. O'zbek tilida, tushunarli, aniq javob bering. Dasturlashga oid savollarda kod misollari bilan tushuntiring."
}) : null;

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

    const quickQuestions = [
        { icon: Code, text: "PHP da array qanday yaratiladi?", color: "from-blue-500 to-cyan-500" },
        { icon: BookOpen, text: "function va method farqi nima?", color: "from-purple-500 to-pink-500" },
        { icon: Info, text: "Ma'lumotlar bazasiga qanday ulanaman?", color: "from-green-500 to-emerald-500" },
        { icon: Sparkles, text: "OOP nima va nima uchun kerak?", color: "from-orange-500 to-red-500" }
    ];

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
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

        if (!API_KEY || !model) {
            setMessages(prev => [...prev, { 
                id: Date.now() + 1, 
                sender: 'ai', 
                text: "API kalit topilmadi! Iltimos, loyihangizdagi `.env` faylini ochib, API kalitingizni yozing." 
            }]);
            setIsTyping(false);
            return;
        }

        const aiMsgId = Date.now() + 1;

        try {
            let chatHistory = messages.map(msg => ({
                role: msg.sender === 'ai' ? 'model' : 'user',
                parts: [{ text: msg.text }]
            }));

            if (chatHistory.length > 0 && chatHistory[0].role === 'model') {
                chatHistory.shift();
            }

            const chat = model.startChat({ history: chatHistory });

            // Bo'sh AI xabarini qo'shamiz — streaming bilan to'ldiriladi
            setMessages(prev => [...prev, { id: aiMsgId, sender: 'ai', text: '' }]);

            const result = await chat.sendMessageStream(text);
            let fullText = '';

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullText += chunkText;
                setMessages(prev => prev.map(msg => 
                    msg.id === aiMsgId ? { ...msg, text: fullText } : msg
                ));
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => {
                const hasEmptyAiMsg = prev.some(msg => msg.id === aiMsgId);
                if (hasEmptyAiMsg) {
                    return prev.map(msg => 
                        msg.id === aiMsgId ? { ...msg, text: "Kechirasiz, xatolik yuz berdi. Internetga ulanishingizni yoki API kalitingiz to'g'riligini tekshiring." } : msg
                    );
                }
                return [...prev, { 
                    id: aiMsgId, 
                    sender: 'ai', 
                    text: "Kechirasiz, xatolik yuz berdi. Internetga ulanishingizni yoki API kalitingiz to'g'riligini tekshiring." 
                }];
            });
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className={`flex flex-col h-full overflow-hidden ${isFullPage ? '' : 'bg-[#0f172a]'}`}>
            {/* Header */}
            {showHeader && (
                <div className="p-4 border-b border-white/10 bg-[#1e293b]/50 flex items-center justify-between shadow-lg backdrop-blur-md">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="p-2 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl">
                                <Bot className="text-white" size={20} />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#1e293b] rounded-full" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">AI PHP Ustoz</h3>
                            <p className="text-[10px] text-green-400 font-medium animate-pulse">Online • Sizga yordamga tayyor</p>
                        </div>
                    </div>
                    <button className="p-2 text-gray-500 hover:text-white transition-colors">
                        <Info size={18} />
                    </button>
                </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-opacity-5">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-auto shadow-lg ${msg.sender === 'user'
                                    ? 'ml-2 bg-brand-secondary'
                                    : 'mr-2 bg-[#1e293b] border border-white/10'
                                    }`}>
                                    {msg.sender === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-brand-primary" />}
                                </div>
                                <div className={`relative px-4 py-3 rounded-2xl text-sm shadow-xl ${msg.sender === 'user'
                                    ? 'bg-gradient-to-br from-brand-primary to-brand-secondary text-white rounded-br-none'
                                    : 'bg-[#1e293b] text-gray-200 border border-white/5 rounded-bl-none'
                                    }`}>
                                    <div className="whitespace-pre-wrap leading-relaxed">
                                        {msg.text.split('```').map((part, index) => {
                                            if (index % 2 === 1) {
                                                const lines = part.trim().split('\n');
                                                const lang = lines[0].trim();
                                                const code = lines.slice(1).join('\n');
                                                return (
                                                    <div key={index} className="my-3 rounded-lg overflow-hidden border border-white/10 bg-[#0f172a] shadow-inner font-mono text-[13px]">
                                                        {lang && <div className="px-3 py-1 bg-[#1e293b] text-gray-400 text-[10px] uppercase border-b border-white/5">{lang}</div>}
                                                        <div className="p-3 text-brand-primary overflow-x-auto custom-scrollbar">
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
                                    className="group relative bg-[#1e293b] border border-white/10 rounded-xl p-3 text-left hover:border-brand-primary/50 transition-all overflow-hidden"
                                >
                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${q.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity`} />
                                    <div className="flex items-center space-x-3 relative z-10">
                                        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${q.color} bg-opacity-10`}>
                                            <q.icon size={16} className="text-white" />
                                        </div>
                                        <span className="text-gray-300 text-xs font-medium">{q.text}</span>
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
                            <div className="flex items-center space-x-2 bg-[#1e293b] px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 shadow-lg">
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
                                <span className="text-[10px] text-gray-500 font-medium">Ustoz yozmoqda...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-[#0b1120]/80 backdrop-blur-md">
                <div className="relative group">
                    <div className="absolute inset-0 bg-brand-primary opacity-0 group-focus-within:opacity-10 blur-xl transition-opacity duration-500" />
                    <div className="relative flex items-center bg-[#0f172a] rounded-2xl border border-white/10 px-4 py-3 focus-within:border-brand-primary/50 transition-all shadow-inner">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Savolingizni shu yerga yozing..."
                            className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-gray-600"
                        />
                        <div className="flex items-center space-x-2">
                            {input.trim() && (
                                <motion.button
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    onClick={handleSend}
                                    className="p-2 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl text-white hover:shadow-lg hover:shadow-brand-primary/30 transition-all active:scale-95 flex items-center justify-center"
                                >
                                    <Send size={16} />
                                </motion.button>
                            )}
                            {!input.trim() && (
                                <div className="p-2 text-gray-700">
                                    <Sparkles size={16} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-2 flex items-center justify-center space-x-4">
                    <span className="text-[10px] text-gray-600 flex items-center">
                        <Code size={10} className="mr-1" /> PHP Syntax
                    </span>
                    <span className="text-[10px] text-gray-600 flex items-center">
                        <Info size={10} className="mr-1" /> Quick Help
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AIChat;
