import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Code, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChat = () => {
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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim() || isTyping) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Show typing indicator
        setIsTyping(true);

        // Simulated AI Logic based on keywords
        setTimeout(() => {
            let response = "";
            const text = input.toLowerCase();

            if (text.includes("salom") || text.includes("assalom")) {
                response = "Assalomu alaykum! PHP o'rganishda yordam berishga tayyorman. Kursning qaysi qismida to'xtadingiz?";
            } else if (text.includes("php nima")) {
                response = "PHP - bu asosan veb-ishlanmalar uchun mo'ljallangan va HTMLga kiritilishi mumkin bo'lgan keng tarqalgan ochiq kodli skript tilidir.";
            } else if (text.includes("o'zgaruvchi") || text.includes("variable")) {
                response = "PHPda o'zgaruvchilar har doim $ belgisi bilan boshlanadi. Masalan: $ism = 'Ali';";
            } else if (text.includes("echo") || text.includes("print")) {
                response = "Echo va print ekranga ma'lumot chiqarish uchun ishlatiladi. Echo biroz tezroq va bir nechta parametrlarni qabul qila oladi.";
            } else if (text.includes("xato") || text.includes("error")) {
                response = "Xatolikni tushuntirib bera olasizmi? Ko'pincha nuqta-vergul (;) yoki qavslar esdan chiqishi xatolikka sabab bo'ladi.";
            } else {
                const aiResponses = [
                    "Ajoyib savol! PHP da bu juda oddiy hal qilinadi. Keling, buni misol bilan ko'rib chiqamiz.",
                    "Tushunarli. Kodni yana bir bor tekshirib ko'ring, sintaksisda xatolik yo'qligiga ishonchingiz komilmi?",
                    "Bu mavzu bo'yicha kursimizning 46-darsida (OOP) batafsilroq ma'lumot berilgan.",
                    "PHP masteri bo'lish uchun ko'proq amaliyot qilish muhim. Kod yozing va Run tugmasini bosing!",
                    "Savolingiz tushunarli. PHPda massivlar yoki funksiyalar bilan ishlayotganingizda bunga tez-tez duch kelasiz."
                ];
                response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: response }]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000); // Random delay to feel more natural
    };

    return (
        <div className="flex flex-col h-full bg-[#0f172a] overflow-hidden">
            {/* Header */}
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
                                    {msg.text}
                                    <div className={`absolute bottom-0 ${msg.sender === 'user' ? '-right-1' : '-left-1'} w-2 h-2 bg-inherit transform rotate-45`} />
                                </div>
                            </div>
                        </motion.div>
                    ))}

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
